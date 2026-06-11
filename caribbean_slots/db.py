from __future__ import annotations

import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterator


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("CARIBBEAN_SLOTS_DB", BASE_DIR / "slots.db"))
ENTRY_AMOUNT_USD = int(os.environ.get("WIPAY_MENS_ENTRY_AMOUNT_USD", "6"))


SEED_SLOTS = [
    (1, "Nadia Baptiste", 24, "Trinidad & Tobago", "🇹🇹", "Soca", "We reach, and we ready to mash up de stage.", "Trini Creole", 102847),
    (2, "Kezia Clarke", 22, "Jamaica", "🇯🇲", "Dancehall", "Mi deh yah fi shine bright every day.", "Jamaican Patois", 84201),
    (3, "Alicia Greaves", 25, "Barbados", "🇧🇧", "Carnival", "Wuhloss, I gine bring de whole island wid me.", "Bajan", 71504),
    (4, "Priya Ramkissoon", 23, "Guyana", "🇬🇾", "Comedy", "Me nah backing down; dis crown is we own.", "Guyanese Creolese", 58110),
    (5, "Monique Joseph", 21, "Saint Lucia", "🇱🇨", "Fashion", "Nou ka leve ansanm, with love and style.", "Saint Lucian Kweyol", 44892),
    (6, "Shanelle Thomas", 26, "Grenada", "🇬🇩", "Photo", "Ah bringing pure spice and heart to de arena.", "Grenadian Creole", 39045),
    (7, "Rielle Providence", 20, "St. Vincent", "🇻🇨", "Art", "Vincy love does lift me higher every round.", "Vincentian Creole", 31720),
    (8, "Tamara John", 24, "Antigua", "🇦🇬", "Beauty", "Me nah play small; Antigua energy loud.", "Antiguan Creole", 27481),
    (9, "Cherisse Larocque", 27, "Dominica", "🇩🇲", "Food", "Mwen ka klere pou Dominica.", "Dominican Kweyol", 22914),
    (10, "Destiny Warner", 22, "St. Kitts", "🇰🇳", "Sports", "Sugar City spirit, we moving strong.", "Kittitian Creole", 18302),
    (11, "Amara Vasquez", 25, "Belize", "🇧🇿", "Content", "Dis da fi we moment, bright and bold.", "Belizean Kriol", 14567),
    (12, "Liana Fernandez", 23, "Suriname", "🇸🇷", "Lifestyle", "Mi e lobi den fans, wi e wini tide.", "Sranan Tongo", 9841),
]


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def iso(value: datetime) -> str:
    return value.isoformat(timespec="seconds")


@contextmanager
def connect(db_path: Path | str = DB_PATH) -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def row_to_dict(row: sqlite3.Row) -> dict[str, Any]:
    return {key: row[key] for key in row.keys()}


def initialize_database(db_path: Path | str = DB_PATH) -> None:
    with connect(db_path) as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS slots (
                id INTEGER PRIMARY KEY,
                rank INTEGER NOT NULL,
                name TEXT NOT NULL,
                age INTEGER NOT NULL,
                country TEXT NOT NULL,
                flag TEXT NOT NULL,
                category TEXT NOT NULL,
                quote TEXT NOT NULL,
                language TEXT NOT NULL,
                likes INTEGER NOT NULL DEFAULT 0,
                comments INTEGER NOT NULL DEFAULT 0,
                votes INTEGER NOT NULL DEFAULT 0,
                countdown_ends_at TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS men_entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                slot_id INTEGER NOT NULL,
                amount_usd INTEGER NOT NULL,
                provider TEXT NOT NULL DEFAULT 'wipay',
                status TEXT NOT NULL DEFAULT 'pending',
                checkout_url TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY(slot_id) REFERENCES slots(id)
            );
            """
        )
        seed_slots(conn)


def seed_slots(conn: sqlite3.Connection) -> None:
    existing_count = conn.execute("SELECT COUNT(*) AS count FROM slots").fetchone()["count"]
    if existing_count:
        return

    now = utc_now()
    countdown_end = now + timedelta(hours=12)
    for rank, name, age, country, flag, category, quote, language, votes in SEED_SLOTS:
        conn.execute(
            """
            INSERT INTO slots (
                id, rank, name, age, country, flag, category, quote, language,
                likes, comments, votes, countdown_ends_at, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?)
            """,
            (
                rank,
                rank,
                name,
                age,
                country,
                flag,
                category,
                quote,
                language,
                votes,
                iso(countdown_end),
                iso(now),
                iso(now),
            ),
        )


def list_slots(db_path: Path | str = DB_PATH) -> list[dict[str, Any]]:
    initialize_database(db_path)
    with connect(db_path) as conn:
        rows = conn.execute("SELECT * FROM slots ORDER BY rank ASC").fetchall()
        return [row_to_dict(row) for row in rows]


def get_slot(slot_id: int, db_path: Path | str = DB_PATH) -> dict[str, Any] | None:
    initialize_database(db_path)
    with connect(db_path) as conn:
        row = conn.execute("SELECT * FROM slots WHERE id = ?", (slot_id,)).fetchone()
        return row_to_dict(row) if row else None


def create_mens_entry(slot_id: int, db_path: Path | str = DB_PATH) -> dict[str, Any]:
    initialize_database(db_path)
    checkout_url = os.environ.get("NEXT_PUBLIC_WIPAY_CHECKOUT_URL", "placeholder")
    now = iso(utc_now())
    with connect(db_path) as conn:
        slot = conn.execute("SELECT id FROM slots WHERE id = ?", (slot_id,)).fetchone()
        if slot is None:
            raise ValueError(f"Slot {slot_id} does not exist")

        cursor = conn.execute(
            """
            INSERT INTO men_entries (slot_id, amount_usd, checkout_url, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (slot_id, ENTRY_AMOUNT_USD, checkout_url, now),
        )
        return {
            "entry_id": cursor.lastrowid,
            "slot_id": slot_id,
            "amount_usd": ENTRY_AMOUNT_USD,
            "provider": "wipay",
            "status": "pending",
            "checkout_url": checkout_url,
            "created_at": now,
        }


def reset_expired_countdowns(db_path: Path | str = DB_PATH) -> int:
    initialize_database(db_path)
    now = utc_now()
    next_end = now + timedelta(hours=12)
    with connect(db_path) as conn:
        cursor = conn.execute(
            """
            UPDATE slots
            SET countdown_ends_at = ?, updated_at = ?
            WHERE countdown_ends_at <= ?
            """,
            (iso(next_end), iso(now), iso(now)),
        )
        return cursor.rowcount


if __name__ == "__main__":
    initialize_database()
    print(f"Initialized {DB_PATH}")
