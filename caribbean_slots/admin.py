from __future__ import annotations

import argparse
import json

from db import (
    create_mens_entry,
    initialize_database,
    list_slots,
    list_waiting_slots,
    reset_expired_countdowns,
    rotate_waiting_slots_to_front,
)


def print_json(payload: object) -> None:
    print(json.dumps(payload, indent=2, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description="Admin tools for Caribbean slots")
    subcommands = parser.add_subparsers(dest="command", required=True)

    subcommands.add_parser("init-db", help="Create and seed slots.db")
    subcommands.add_parser("list-slots", help="List seeded creator slots")
    subcommands.add_parser("list-waiting", help="List 12 waiting/back slots")
    subcommands.add_parser("reset-countdowns", help="Reset expired 12-hour countdowns")
    subcommands.add_parser("rotate-now", help="Move 12 waiting slots into the 12 front slots")

    entry_parser = subcommands.add_parser("create-men-entry", help="Create a pending $6 WiPay men entry")
    entry_parser.add_argument("slot_id", type=int)

    args = parser.parse_args()

    if args.command == "init-db":
        initialize_database()
        print("slots.db initialized")
    elif args.command == "list-slots":
        print_json(list_slots())
    elif args.command == "list-waiting":
        print_json(list_waiting_slots())
    elif args.command == "reset-countdowns":
        reset_count = reset_expired_countdowns()
        print(f"Reset {reset_count} expired countdown(s)")
    elif args.command == "rotate-now":
        print_json(rotate_waiting_slots_to_front(source="admin"))
    elif args.command == "create-men-entry":
        print_json(create_mens_entry(args.slot_id))


if __name__ == "__main__":
    main()
