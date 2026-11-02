"""Discuter avec l'assistant dans le terminal, sans WhatsApp, pour le tester.

    python discuter.py

Il faut seulement ANTHROPIC_API_KEY dans l'environnement. Les candidatures et
transferts de test sont enregistrés dans data/test.sqlite3 (pas dans la vraie base).
"""

import asyncio

import config
from assistant import Assistant, Contact, elaguer
from stockage import Stockage


async def main() -> None:
    config.env_obligatoire("ANTHROPIC_API_KEY")
    stockage = Stockage(str(config.DOSSIER / "data" / "test.sqlite3"))
    assistant = Assistant(stockage, pause_heures=0)
    contact = Contact(wa_id="test", nom="Test")
    historique: list = []
    print(f"Assistant OJA ({config.CLAUDE_MODEL}). Écrivez votre message, ou « quitter ».\n")
    while True:
        try:
            texte = input("Vous : ").strip()
        except (EOFError, KeyboardInterrupt):
            break
        if texte.lower() in ("quitter", "exit", "q"):
            break
        if not texte:
            continue
        reponse = await assistant.repondre(contact, historique, texte)
        print(f"\nOJA : {reponse.texte}\n")
        if reponse.historique is not None:
            historique = elaguer(reponse.historique, config.MAX_MESSAGES_HISTORIQUE)


if __name__ == "__main__":
    asyncio.run(main())
