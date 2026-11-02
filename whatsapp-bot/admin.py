"""Outils de l'équipe OJA, à lancer sur le serveur de l'assistant.

    python admin.py candidatures [fichier.csv]   liste (ou exporte) les candidatures
    python admin.py transferts [fichier.csv]     liste (ou exporte) les demandes de conseiller
    python admin.py pauses                       numéros où l'assistant se tait en ce moment
    python admin.py reprendre 22997000000        l'assistant répond de nouveau à ce numéro
    python admin.py pause 22997000000 [heures]   l'assistant se tait pour ce numéro
"""

import csv
import sys
from datetime import datetime

import config
from stockage import HEURE_BENIN, Stockage


def afficher_ou_exporter(lignes, fichier: str | None) -> None:
    if not lignes:
        print("Rien pour l'instant.")
        return
    colonnes = lignes[0].keys()
    if fichier:
        with open(fichier, "w", newline="", encoding="utf-8-sig") as f:  # utf-8-sig : s'ouvre bien dans Excel
            ecrivain = csv.writer(f, delimiter=";")
            ecrivain.writerow(colonnes)
            ecrivain.writerows([tuple(l) for l in lignes])
        print(f"{len(lignes)} lignes exportées dans {fichier}")
        return
    for ligne in lignes:
        print(" | ".join(f"{c}: {ligne[c]}" for c in colonnes))


def main(args: list[str]) -> None:
    if not args:
        print(__doc__)
        return
    stockage = Stockage(config.DB_PATH)
    commande = args[0]
    if commande in ("candidatures", "transferts"):
        afficher_ou_exporter(stockage.lister(commande), args[1] if len(args) > 1 else None)
    elif commande == "pauses":
        for ligne in stockage.en_pause_liste():
            fin = datetime.fromtimestamp(ligne["pause_jusqua"], HEURE_BENIN).strftime("%d/%m %H:%M")
            print(f"{ligne['wa_id']} ({ligne['nom']}) : en pause jusqu'au {fin}")
    elif commande == "reprendre" and len(args) == 2:
        stockage.reprendre(args[1])
        print(f"L'assistant répond de nouveau au {args[1]}.")
    elif commande == "pause" and len(args) in (2, 3):
        heures = float(args[2]) if len(args) == 3 else config.PAUSE_HEURES
        stockage.mettre_en_pause(args[1], heures)
        print(f"L'assistant se tait pour le {args[1]} pendant {heures:g} h.")
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv[1:])
