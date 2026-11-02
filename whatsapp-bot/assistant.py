"""Le cerveau de l'assistant : Claude (Anthropic) avec la base de connaissances OJA et deux outils."""

import logging
from dataclasses import dataclass

import anthropic

import config
from stockage import Stockage

log = logging.getLogger("oja.assistant")

MAX_TOURS_OUTILS = 5

MESSAGE_SOUCI = (
    "Désolé, j'ai un petit souci technique. Réessayez dans quelques minutes, "
    "ou écrivez « conseiller » pour qu'un membre de l'équipe OJA vous réponde."
)
MESSAGE_TRANSFERT = "C'est noté : un conseiller de l'équipe OJA va vous répondre ici même."
MESSAGE_HORS_CADRE = (
    "Je ne peux pas vous aider sur ce point. Je suis l'assistant d'OJA : posez-moi vos questions "
    "sur l'appli, ou écrivez « conseiller » pour parler à un membre de l'équipe."
)

# Bêtas utilisées :
# - server-side-fallback-2026-07-01 : si Claude refuse une demande, l'API la rejoue automatiquement
#   sur le modèle de secours recommandé par Anthropic (fallbacks="default").
# - thinking-binding-controls-2026-08-01 : quand on raccourcit un long historique, les anciens blocs
#   de réflexion sont écartés proprement au lieu de provoquer une erreur.
BETAS = ["server-side-fallback-2026-07-01", "thinking-binding-controls-2026-08-01"]

OUTILS = [
    {
        "name": "enregistrer_candidature",
        "description": (
            "Enregistre la candidature d'une personne qui veut devenir ambassadeur OJA, chauffeur OJA, "
            "vendre sur OJA (commerçant, restaurant, boutique, vendeuse en ligne) ou proposer un partenariat. "
            "À appeler une fois les informations recueillies auprès de la personne. Écrire « non précisé » "
            "pour une information qu'elle n'a pas donnée. Le numéro WhatsApp est ajouté automatiquement."
        ),
        "strict": True,
        "input_schema": {
            "type": "object",
            "properties": {
                "profil": {"type": "string", "enum": ["ambassadeur", "chauffeur", "commercant", "partenaire"]},
                "nom": {"type": "string", "description": "Nom et prénom donnés par la personne."},
                "ville": {"type": "string", "description": "Par exemple Cotonou, Abomey-Calavi ou Porto-Novo."},
                "quartier": {"type": "string"},
                "details": {
                    "type": "string",
                    "description": (
                        "Ambassadeur : réseaux, pseudos et nombre approximatif d'abonnés ou de contacts. "
                        "Chauffeur : type de véhicule. Commerçant : nom et type du commerce. "
                        "Partenaire : la proposition en une ou deux phrases."
                    ),
                },
                "disponibilites": {"type": "string", "description": "Quand la personne est disponible ou joignable."},
            },
            "required": ["profil", "nom", "ville", "quartier", "details", "disponibilites"],
            "additionalProperties": False,
        },
    },
    {
        "name": "transferer_a_un_conseiller",
        "description": (
            "Passe la conversation à un conseiller humain de l'équipe OJA, qui répondra sur ce même numéro "
            "WhatsApp. Ensuite, l'assistant ne répond plus à cette personne pendant quelques heures."
        ),
        "strict": True,
        "input_schema": {
            "type": "object",
            "properties": {
                "motif": {
                    "type": "string",
                    "enum": [
                        "demande_de_la_personne",
                        "paiement_ou_remboursement",
                        "commande_ou_livraison",
                        "course",
                        "compte",
                        "securite",
                        "plainte_ou_litige",
                        "autre",
                    ],
                },
                "resume": {
                    "type": "string",
                    "description": (
                        "Résumé pour le conseiller en une à trois phrases : le problème, ce que la personne "
                        "attend, et le numéro de commande s'il a été donné."
                    ),
                },
            },
            "required": ["motif", "resume"],
            "additionalProperties": False,
        },
    },
]


def charger_consignes() -> str:
    consignes = (config.DOSSIER / "consignes.md").read_text(encoding="utf-8").strip()
    connaissances = (config.DOSSIER / "connaissances.md").read_text(encoding="utf-8").strip()
    return f"{consignes}\n\n---\n\n{connaissances}\n"


def elaguer(messages: list, maximum: int) -> list:
    """Raccourcit un historique trop long en repartant d'un message écrit par la personne."""
    if len(messages) <= maximum:
        return messages
    for i in range(len(messages) - maximum // 2, len(messages)):
        m = messages[i]
        if m["role"] == "user" and isinstance(m["content"], str):
            return messages[i:]
    return []


@dataclass
class Contact:
    wa_id: str
    nom: str


@dataclass
class Reponse:
    texte: str
    historique: list | None  # None : ne rien enregistrer (erreur technique, la personne peut réessayer)


class Assistant:
    def __init__(self, stockage: Stockage, pause_heures: float):
        self.client = anthropic.AsyncAnthropic(max_retries=3)  # lit ANTHROPIC_API_KEY
        self.stockage = stockage
        self.pause_heures = pause_heures
        # Bloc système fixe, commun à tous les clients : mis en cache une fois pour tous.
        self.systeme = [{"type": "text", "text": charger_consignes(), "cache_control": {"type": "ephemeral"}}]

    def _executer(self, contact: Contact, nom_outil: str, entree: dict) -> str:
        if nom_outil == "enregistrer_candidature":
            numero = self.stockage.ajouter_candidature(contact.wa_id, contact.nom, entree)
            log.info("Candidature n°%s (%s) de %s", numero, entree.get("profil"), contact.wa_id)
            return f"Candidature n°{numero} enregistrée. L'équipe OJA recontactera la personne sur ce numéro."
        if nom_outil == "transferer_a_un_conseiller":
            numero = self.stockage.ajouter_transfert(
                contact.wa_id, contact.nom, str(entree.get("motif", "")), str(entree.get("resume", ""))
            )
            self.stockage.mettre_en_pause(contact.wa_id, self.pause_heures)
            log.info("Transfert n°%s (%s) pour %s", numero, entree.get("motif"), contact.wa_id)
            return (
                "Transfert enregistré. Dis à la personne, en une ou deux phrases, qu'un conseiller de l'équipe OJA "
                "va lui répondre ici même, sans promettre de délai. Tu ne pourras plus lui répondre ensuite."
            )
        raise ValueError(f"outil inconnu : {nom_outil}")

    async def repondre(self, contact: Contact, historique: list, texte: str) -> Reponse:
        messages = historique + [{"role": "user", "content": texte}]
        transfere = False
        for _ in range(MAX_TOURS_OUTILS):
            try:
                rep = await self.client.beta.messages.create(
                    model=config.CLAUDE_MODEL,
                    max_tokens=16000,
                    system=self.systeme,
                    cache_control={"type": "ephemeral"},  # met aussi en cache la conversation en cours
                    tools=OUTILS,
                    messages=messages,
                    thinking={"type": "adaptive", "block_binding": {"prefix_mismatch_behavior": "drop_block"}},
                    output_config={"effort": config.CLAUDE_EFFORT},
                    betas=BETAS,
                    fallbacks="default",
                )
            except anthropic.APIConnectionError as err:
                log.error("Claude injoignable : %s", err)
                return Reponse(MESSAGE_SOUCI, None)
            except anthropic.APIStatusError as err:
                log.error("Erreur de l'API Claude (%s) : %s", err.status_code, err.message)
                return Reponse(MESSAGE_SOUCI, None)

            if rep.stop_reason == "refusal":
                details = rep.stop_details
                log.warning("Refus pour %s (catégorie : %s)", contact.wa_id, getattr(details, "category", None))
                return Reponse(MESSAGE_HORS_CADRE, messages + [{"role": "assistant", "content": MESSAGE_HORS_CADRE}])

            if rep.stop_reason == "max_tokens":
                log.warning("Réponse trop longue pour %s", contact.wa_id)
                return Reponse(MESSAGE_SOUCI, messages + [{"role": "assistant", "content": MESSAGE_SOUCI}])

            # On garde toute la réponse (réflexion, texte, appels d'outils) dans l'historique.
            # Le bloc « fallback » n'est qu'un repère d'audit : on peut l'omettre.
            messages.append({"role": "assistant", "content": [b.to_dict() for b in rep.content if b.type != "fallback"]})

            if rep.stop_reason == "tool_use":
                resultats = []
                for bloc in rep.content:
                    if bloc.type != "tool_use":
                        continue
                    try:
                        contenu = self._executer(contact, bloc.name, dict(bloc.input))
                        transfere = transfere or bloc.name == "transferer_a_un_conseiller"
                        resultats.append({"type": "tool_result", "tool_use_id": bloc.id, "content": contenu})
                    except Exception as err:  # l'outil a échoué : Claude le saura et pourra s'excuser
                        log.exception("Échec de l'outil %s", bloc.name)
                        resultats.append(
                            {"type": "tool_result", "tool_use_id": bloc.id, "content": f"Erreur : {err}", "is_error": True}
                        )
                messages.append({"role": "user", "content": resultats})
                continue

            if rep.stop_reason == "pause_turn":
                continue

            texte_final = "\n\n".join(b.text for b in rep.content if b.type == "text").strip()
            return Reponse(texte_final or (MESSAGE_TRANSFERT if transfere else MESSAGE_SOUCI), messages)

        log.error("Trop d'appels d'outils pour %s", contact.wa_id)
        return Reponse(MESSAGE_SOUCI, None)
