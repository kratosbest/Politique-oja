"""Mémoire de l'assistant : conversations, candidatures et transferts (SQLite)."""

import json
import sqlite3
import threading
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

HEURE_BENIN = timezone(timedelta(hours=1))

SCHEMA = """
CREATE TABLE IF NOT EXISTS conversations (
    wa_id TEXT PRIMARY KEY,
    nom TEXT NOT NULL DEFAULT '',
    messages TEXT NOT NULL DEFAULT '[]',
    maj REAL NOT NULL DEFAULT 0,
    pause_jusqua REAL NOT NULL DEFAULT 0,
    jour TEXT NOT NULL DEFAULT '',
    nb_jour INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS messages_traites (
    id TEXT PRIMARY KEY,
    recu REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS candidatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    wa_id TEXT NOT NULL,
    nom_whatsapp TEXT NOT NULL,
    profil TEXT NOT NULL,
    nom TEXT NOT NULL,
    ville TEXT NOT NULL,
    quartier TEXT NOT NULL,
    details TEXT NOT NULL,
    disponibilites TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS transferts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    wa_id TEXT NOT NULL,
    nom_whatsapp TEXT NOT NULL,
    motif TEXT NOT NULL,
    resume TEXT NOT NULL
);
"""


def maintenant_texte() -> str:
    return datetime.now(HEURE_BENIN).strftime("%Y-%m-%d %H:%M")


class Stockage:
    def __init__(self, chemin: str):
        Path(chemin).parent.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(chemin, check_same_thread=False, timeout=10)
        self.db.row_factory = sqlite3.Row
        self.verrou = threading.Lock()
        with self.verrou, self.db:
            self.db.execute("PRAGMA journal_mode=WAL")
            self.db.executescript(SCHEMA)

    # --- Messages déjà reçus (Meta peut renvoyer deux fois le même) ---
    def deja_traite(self, message_id: str) -> bool:
        with self.verrou, self.db:
            cur = self.db.execute(
                "INSERT OR IGNORE INTO messages_traites (id, recu) VALUES (?, ?)",
                (message_id, time.time()),
            )
            if cur.rowcount and hash(message_id) % 200 == 0:
                self.db.execute("DELETE FROM messages_traites WHERE recu < ?", (time.time() - 7 * 86400,))
            return cur.rowcount == 0

    # --- Conversations ---
    def _ligne(self, wa_id: str) -> sqlite3.Row | None:
        return self.db.execute("SELECT * FROM conversations WHERE wa_id = ?", (wa_id,)).fetchone()

    def _assurer(self, wa_id: str) -> None:
        self.db.execute("INSERT OR IGNORE INTO conversations (wa_id) VALUES (?)", (wa_id,))

    def historique(self, wa_id: str, session_heures: float) -> list:
        """Renvoie l'historique, ou une liste vide si la dernière discussion est trop ancienne."""
        with self.verrou:
            ligne = self._ligne(wa_id)
        if not ligne or time.time() - ligne["maj"] > session_heures * 3600:
            return []
        return json.loads(ligne["messages"])

    def sauver_historique(self, wa_id: str, nom: str, messages: list) -> None:
        with self.verrou, self.db:
            self._assurer(wa_id)
            self.db.execute(
                "UPDATE conversations SET nom = ?, messages = ?, maj = ? WHERE wa_id = ?",
                (nom, json.dumps(messages, ensure_ascii=False), time.time(), wa_id),
            )

    def compter_messages(self, wa_id: str, nombre: int) -> int:
        """Ajoute `nombre` au compteur du jour et renvoie le total du jour."""
        jour = datetime.now(HEURE_BENIN).strftime("%Y-%m-%d")
        with self.verrou, self.db:
            self._assurer(wa_id)
            ligne = self._ligne(wa_id)
            total = (ligne["nb_jour"] if ligne["jour"] == jour else 0) + nombre
            self.db.execute("UPDATE conversations SET jour = ?, nb_jour = ? WHERE wa_id = ?", (jour, total, wa_id))
            return total

    # --- Pause après transfert à un conseiller ---
    def mettre_en_pause(self, wa_id: str, heures: float) -> None:
        with self.verrou, self.db:
            self._assurer(wa_id)
            self.db.execute(
                "UPDATE conversations SET pause_jusqua = ? WHERE wa_id = ?", (time.time() + heures * 3600, wa_id)
            )

    def reprendre(self, wa_id: str) -> None:
        with self.verrou, self.db:
            self.db.execute("UPDATE conversations SET pause_jusqua = 0 WHERE wa_id = ?", (wa_id,))

    def en_pause(self, wa_id: str) -> bool:
        with self.verrou:
            ligne = self._ligne(wa_id)
        return bool(ligne) and ligne["pause_jusqua"] > time.time()

    def en_pause_liste(self) -> list[sqlite3.Row]:
        with self.verrou:
            return self.db.execute(
                "SELECT wa_id, nom, pause_jusqua FROM conversations WHERE pause_jusqua > ? ORDER BY pause_jusqua",
                (time.time(),),
            ).fetchall()

    # --- Candidatures et transferts ---
    def ajouter_candidature(self, wa_id: str, nom_whatsapp: str, champs: dict) -> int:
        with self.verrou, self.db:
            cur = self.db.execute(
                "INSERT INTO candidatures (date, wa_id, nom_whatsapp, profil, nom, ville, quartier, details, disponibilites)"
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    maintenant_texte(), wa_id, nom_whatsapp,
                    *(str(champs.get(c, "")) for c in ("profil", "nom", "ville", "quartier", "details", "disponibilites")),
                ),
            )
            return cur.lastrowid

    def ajouter_transfert(self, wa_id: str, nom_whatsapp: str, motif: str, resume: str) -> int:
        with self.verrou, self.db:
            cur = self.db.execute(
                "INSERT INTO transferts (date, wa_id, nom_whatsapp, motif, resume) VALUES (?, ?, ?, ?, ?)",
                (maintenant_texte(), wa_id, nom_whatsapp, motif, resume),
            )
            return cur.lastrowid

    def lister(self, table: str) -> list[sqlite3.Row]:
        if table not in ("candidatures", "transferts"):
            raise ValueError(table)
        with self.verrou:
            return self.db.execute(f"SELECT * FROM {table} ORDER BY id").fetchall()
