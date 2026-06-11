from __future__ import annotations

import argparse
import time

from db import reset_expired_countdowns


def run_scheduler(interval_seconds: int = 60) -> None:
    print(f"Countdown scheduler running every {interval_seconds}s")
    while True:
        reset_count = reset_expired_countdowns()
        if reset_count:
            print(f"Reset {reset_count} expired slot countdown(s)")
        time.sleep(interval_seconds)


def main() -> None:
    parser = argparse.ArgumentParser(description="Caribbean slots countdown scheduler")
    parser.add_argument("--interval", type=int, default=60, help="Polling interval in seconds")
    parser.add_argument("--once", action="store_true", help="Run one reset pass and exit")
    args = parser.parse_args()

    if args.once:
        reset_count = reset_expired_countdowns()
        print(f"Reset {reset_count} expired slot countdown(s)")
        return

    run_scheduler(args.interval)


if __name__ == "__main__":
    main()
