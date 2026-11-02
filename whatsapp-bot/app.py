"""Serveur web de l'assistant WhatsApp OJA.

Meta envoie chaque message reçu sur /webhook ; l'assistant répond avec Claude.
Lancement : uvicorn app:app --host 0.0.0.0 --port 8000
"""

import asyncio
import hmac
import json
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import PlainTextResponse

import config
from assistant import Assistant, Contact, elaguer
from stockage import Stockage
from whatsapp import Entrant, WhatsApp, extraire, signature_valide

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s : %(message)s")
log = logging.getLogger("oja")

MESSAGE_LIMITE = (
    "Vous avez envoyé beaucoup de messages aujourd'hui. Je reprends demain ; "
    "en attendant, l'équipe OJA lira vos messages ici."
)


class Service:
    """Reçoit les messages, les regroupe par personne et répond dans l'ordre."""

    def __init__(self):
        config.env_obligatoire("ANTHROPIC_API_KEY")
        self.verify_token = config.env_obligatoire("WHATSAPP_VERIFY_TOKEN")
        self.app_secret = config.env_obligatoire("WHATSAPP_APP_SECRET")
        self.phone_number_id = config.env_obligatoire("WHATSAPP_PHONE_NUMBER_ID")
        self.stockage = Stockage(config.DB_PATH)
        self.wa = WhatsApp(config.env_obligatoire("WHATSAPP_TOKEN"), self.phone_number_id, config.GRAPH_API_VERSION)
        self.assistant = Assistant(self.stockage, config.PAUSE_HEURES)
        self.en_attente: dict[str, list[Entrant]] = {}
        self.travailleurs: dict[str, asyncio.Task] = {}

    def recevoir(self, message: Entrant) -> None:
        self.en_attente.setdefault(message.wa_id, []).append(message)
        if message.wa_id not in self.travailleurs:
            self.travailleurs[message.wa_id] = asyncio.create_task(self._travailler(message.wa_id))

    async def _travailler(self, wa_id: str) -> None:
        try:
            while self.en_attente.get(wa_id):
                # Les gens envoient souvent plusieurs messages d'affilée : on attend la fin de la rafale.
                await asyncio.sleep(config.REGROUPEMENT_SECONDES)
                lot = self.en_attente.pop(wa_id, [])
                if lot:
                    try:
                        await self._traiter(wa_id, lot)
                    except Exception:
                        log.exception("Échec du traitement pour %s", wa_id)
        finally:
            self.travailleurs.pop(wa_id, None)

    async def _traiter(self, wa_id: str, lot: list[Entrant]) -> None:
        nom = next((m.nom for m in reversed(lot) if m.nom), "")
        if self.stockage.en_pause(wa_id):
            log.info("%s : conversation suivie par un conseiller, l'assistant ne répond pas", wa_id)
            return
        total = self.stockage.compter_messages(wa_id, len(lot))
        if total > config.MAX_MESSAGES_PAR_JOUR:
            if total - len(lot) <= config.MAX_MESSAGES_PAR_JOUR:
                await self.wa.envoyer_texte(wa_id, MESSAGE_LIMITE)
            return

        saisie = asyncio.create_task(self._montrer_saisie(lot[-1].id))
        try:
            historique = self.stockage.historique(wa_id, config.SESSION_HEURES)
            texte = "\n".join(m.texte for m in lot)
            if not historique and nom:
                texte = f"[Nom WhatsApp de la personne : {nom}]\n{texte}"
            reponse = await self.assistant.repondre(Contact(wa_id, nom), historique, texte)
        finally:
            saisie.cancel()
        await self.wa.envoyer_texte(wa_id, reponse.texte)
        if reponse.historique is not None:
            self.stockage.sauver_historique(wa_id, nom, elaguer(reponse.historique, config.MAX_MESSAGES_HISTORIQUE))

    async def _montrer_saisie(self, message_id: str) -> None:
        """Affiche « en train d'écrire… » tant que Claude prépare la réponse."""
        while True:
            await self.wa.marquer_lu(message_id)
            await asyncio.sleep(20)


@asynccontextmanager
async def cycle_de_vie(app: FastAPI):
    app.state.service = Service()
    log.info("Assistant OJA prêt (modèle %s)", config.CLAUDE_MODEL)
    yield
    await app.state.service.wa.fermer()


app = FastAPI(lifespan=cycle_de_vie, docs_url=None, redoc_url=None, openapi_url=None)


@app.get("/")
def sante() -> dict:
    return {"statut": "ok"}


@app.get("/webhook")
def verifier_webhook(
    request: Request,
    mode: str = Query("", alias="hub.mode"),
    jeton: str = Query("", alias="hub.verify_token"),
    defi: str = Query("", alias="hub.challenge"),
):
    """Meta appelle cette adresse une fois, quand on enregistre le webhook."""
    attendu = request.app.state.service.verify_token
    if mode == "subscribe" and hmac.compare_digest(jeton.encode(), attendu.encode()):
        return PlainTextResponse(defi)
    raise HTTPException(status_code=403)


@app.post("/webhook")
async def recevoir_webhook(request: Request) -> dict:
    service: Service = request.app.state.service
    corps = await request.body()
    if not signature_valide(service.app_secret, corps, request.headers.get("x-hub-signature-256")):
        log.warning("Webhook refusé : signature invalide")
        raise HTTPException(status_code=401)
    try:
        payload = json.loads(corps)
    except ValueError:
        raise HTTPException(status_code=400)

    entrants, reponses_equipe = extraire(payload, service.phone_number_id)
    for wa_id in reponses_equipe:
        # Un membre de l'équipe a répondu depuis l'appli WhatsApp Business : l'assistant s'efface.
        service.stockage.mettre_en_pause(wa_id, config.PAUSE_HEURES)
        log.info("%s : réponse de l'équipe détectée, assistant en pause", wa_id)
    for message in entrants:
        if not service.stockage.deja_traite(message.id):
            service.recevoir(message)
    # Réponse immédiate à Meta ; Claude travaille en arrière-plan.
    return {"ok": True}
