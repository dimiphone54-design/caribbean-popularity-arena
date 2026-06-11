from __future__ import annotations

import argparse
import os
import time
from dataclasses import dataclass

from db import list_slots, list_waiting_slots, rotate_waiting_slots_to_front, should_rotate


@dataclass(frozen=True)
class BotSettings:
    api_key: str
    webhook_secret: str
    legal_mode: bool
    interval_seconds: int


def load_settings() -> BotSettings:
    return BotSettings(
        api_key=os.environ.get("CARIBBEAN_SLOTS_BOT_API_KEY", "fake_caribbean_slots_bot_key"),
        webhook_secret=os.environ.get(
            "CARIBBEAN_SLOTS_BOT_WEBHOOK_SECRET",
            "fake_caribbean_slots_webhook_secret",
        ),
        legal_mode=os.environ.get("CARIBBEAN_SLOTS_BOT_LEGAL_MODE", "true") == "true",
        interval_seconds=int(os.environ.get("CARIBBEAN_SLOTS_BOT_POLL_SECONDS", "60")),
    )


def assert_legal_mode(settings: BotSettings) -> None:
    if not settings.legal_mode:
        raise RuntimeError("Bot refused to start: CARIBBEAN_SLOTS_BOT_LEGAL_MODE must be true")
    if not settings.api_key.startswith("fake_") or not settings.webhook_secret.startswith("fake_"):
        print("Warning: non-fake bot keys detected. Keep production secrets in environment variables only.")


def run_once(force: bool = False) -> dict[str, object]:
    settings = load_settings()
    assert_legal_mode(settings)

    if force or should_rotate():
        return rotate_waiting_slots_to_front(source="legal_placeholder_bot")

    return {
        "rotated": False,
        "front_count": len(list_slots()),
        "waiting_count": len(list_waiting_slots()),
        "source": "legal_placeholder_bot",
    }


def run_forever() -> None:
    settings = load_settings()
    assert_legal_mode(settings)
    print("Legal placeholder bot running with fake keys only")
    print(f"Polling every {settings.interval_seconds}s; rotating 12 waiting slots every 12 hours")

    while True:
        result = run_once()
        print(result)
        time.sleep(settings.interval_seconds)


def main() -> None:
    parser = argparse.ArgumentParser(description="Legal placeholder bot for Caribbean slot rotations")
    parser.add_argument("--once", action="store_true", help="Run one rotation check and exit")
    parser.add_argument("--force", action="store_true", help="Force waiting slots into front slots now")
    args = parser.parse_args()

    if args.once or args.force:
        print(run_once(force=args.force))
        return

    run_forever()


if __name__ == "__main__":
    main()
