"""Échanges avec la WhatsApp Cloud API de Meta : lire les webhooks, envoyer les réponses."""

import hashlib
import hmac
import logging
from dataclasses import dataclass

import httpx

log = logging.getLogger("oja.whatsapp")

LIMITE_TEXTE = 4000  # WhatsApp accepte 4 096 caractères par message


@dataclass
class Entrant:
    id: str
    wa_id: str
    nom: str
    texte: str


def signature_valide(secret: str, corps: bytes, entete: str | None) -> bool:
    """Vérifie l'en-tête X-Hub-Signature-256 envoyé par Meta (HMAC SHA-256 avec la clé secrète de l'app)."""
    if not entete or not entete.startswith("sha256="):
        return False
    attendu = hmac.new(secret.encode(), corps, hashlib.sha256).hexdigest()
    return hmac.compare_digest(attendu, entete[len("sha256="):])


def _texte_du_message(m: dict) -> str | None:
    """Transforme un message WhatsApp en texte pour l'assistant (None = à ignorer)."""
    genre = m.get("type")
    if genre == "text":
        return m.get("text", {}).get("body", "")
    if genre == "interactive":
        inter = m.get("interactive", {})
        choix = inter.get("button_reply") or inter.get("list_reply") or {}
        return choix.get("title", "")
    if genre == "button":
        return m.get("button", {}).get("text", "")
    if genre in ("image", "video", "document"):
        legende = (m.get(genre) or {}).get("caption", "")
        quoi = {"image": "une image", "video": "une vidéo", "document": "un document"}[genre]
        note = f"[La personne a envoyé {quoi}, que l'assistant ne peut pas voir]"
        return f"{note}\n{legende}" if legende else note
    if genre == "audio":
        return "[Note vocale reçue : l'assistant ne peut pas l'écouter]"
    if genre == "sticker":
        return "[Autocollant reçu]"
    if genre == "location":
        lieu = m.get("location", {})
        nom = " ".join(x for x in (lieu.get("name"), lieu.get("address")) if x)
        return f"[Position partagée : {nom or 'sans nom'} ({lieu.get('latitude')}, {lieu.get('longitude')})]"
    if genre == "contacts":
        return "[La personne a partagé une fiche contact]"
    if genre == "request_welcome":
        return "[La personne vient d'ouvrir la discussion]"
    if genre in ("reaction", "system", "ephemeral"):
        return None
    return "[Message d'un type que l'assistant ne sait pas lire]"


def extraire(payload: dict, phone_number_id: str) -> tuple[list[Entrant], list[str]]:
    """Renvoie les messages reçus, et les numéros auxquels l'équipe a répondu depuis l'appli WhatsApp Business."""
    entrants: list[Entrant] = []
    reponses_equipe: list[str] = []
    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            valeur = change.get("value", {})
            if valeur.get("metadata", {}).get("phone_number_id") not in (None, phone_number_id):
                continue
            # Coexistence : un membre de l'équipe a écrit depuis l'appli WhatsApp Business
            for echo in valeur.get("message_echoes", []):
                if echo.get("to"):
                    reponses_equipe.append(echo["to"])
            noms = {c.get("wa_id"): c.get("profile", {}).get("name", "") for c in valeur.get("contacts", [])}
            for m in valeur.get("messages", []):
                texte = _texte_du_message(m)
                if texte is None or not m.get("from") or not m.get("id"):
                    continue
                entrants.append(Entrant(id=m["id"], wa_id=m["from"], nom=noms.get(m["from"], ""), texte=texte[:3000]))
    return entrants, reponses_equipe


def decouper(texte: str, limite: int = LIMITE_TEXTE) -> list[str]:
    """Coupe un long texte en plusieurs messages, de préférence entre deux paragraphes."""
    morceaux = []
    while len(texte) > limite:
        coupe = texte.rfind("\n", 0, limite)
        if coupe < limite // 2:
            coupe = texte.rfind(" ", 0, limite)
        if coupe <= 0:
            coupe = limite
        morceaux.append(texte[:coupe].rstrip())
        texte = texte[coupe:].lstrip()
    if texte:
        morceaux.append(texte)
    return morceaux


class WhatsApp:
    def __init__(self, token: str, phone_number_id: str, version: str):
        self.url = f"https://graph.facebook.com/{version}/{phone_number_id}/messages"
        self.client = httpx.AsyncClient(timeout=20, headers={"Authorization": f"Bearer {token}"})

    async def _poster(self, corps: dict) -> bool:
        try:
            rep = await self.client.post(self.url, json=corps)
        except httpx.HTTPError as err:
            log.error("WhatsApp injoignable : %s", err)
            return False
        if rep.status_code >= 400:
            log.error("WhatsApp a refusé l'envoi (%s) : %s", rep.status_code, rep.text[:500])
            return False
        return True

    async def envoyer_texte(self, wa_id: str, texte: str) -> bool:
        ok = True
        for morceau in decouper(texte):
            ok = await self._poster(
                {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": wa_id,
                    "type": "text",
                    "text": {"body": morceau, "preview_url": False},
                }
            ) and ok
        return ok

    async def marquer_lu(self, message_id: str) -> None:
        """Coches bleues + « en train d'écrire… » (dure environ 25 s ou jusqu'à la réponse)."""
        await self._poster(
            {
                "messaging_product": "whatsapp",
                "status": "read",
                "message_id": message_id,
                "typing_indicator": {"type": "text"},
            }
        )

    async def fermer(self) -> None:
        await self.client.aclose()
