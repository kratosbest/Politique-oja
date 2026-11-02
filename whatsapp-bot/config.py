"""Réglages de l'assistant, lus dans les variables d'environnement.

Aucune clé n'est écrite dans le code : elles se règlent chez l'hébergeur
(ou dans un fichier .env local qui n'est jamais envoyé sur GitHub).
"""

import os
from pathlib import Path

DOSSIER = Path(__file__).resolve().parent


def env(nom: str, defaut: str = "") -> str:
    return os.environ.get(nom, defaut).strip()


def env_obligatoire(nom: str) -> str:
    valeur = env(nom)
    if not valeur:
        raise RuntimeError(f"Variable d'environnement manquante : {nom} (voir README.md)")
    return valeur


def env_nombre(nom: str, defaut: float) -> float:
    valeur = env(nom)
    return float(valeur) if valeur else defaut


# Claude (la clé ANTHROPIC_API_KEY est lue directement par le SDK Anthropic)
CLAUDE_MODEL = env("OJA_CLAUDE_MODEL", "claude-opus-5-5")
CLAUDE_EFFORT = env("OJA_CLAUDE_EFFORT", "low")  # low | medium | high

# WhatsApp Cloud API
GRAPH_API_VERSION = env("GRAPH_API_VERSION", "v24.0")

# Comportement
DB_PATH = env("DB_PATH", str(DOSSIER / "data" / "oja_bot.sqlite3"))
SESSION_HEURES = env_nombre("SESSION_HEURES", 24)  # après ce délai sans message, la conversation repart de zéro
PAUSE_HEURES = env_nombre("PAUSE_HEURES", 12)  # silence de l'assistant après un transfert à un conseiller
MAX_MESSAGES_PAR_JOUR = int(env_nombre("MAX_MESSAGES_PAR_JOUR", 60))  # garde-fou contre les abus
REGROUPEMENT_SECONDES = env_nombre("REGROUPEMENT_SECONDES", 3)  # attend la fin d'une rafale de messages
MAX_MESSAGES_HISTORIQUE = int(env_nombre("MAX_MESSAGES_HISTORIQUE", 60))
