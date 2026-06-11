from __future__ import annotations

import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

from db import (
    create_mens_entry,
    get_slot,
    initialize_database,
    list_slots,
    list_waiting_slots,
    rotate_waiting_slots_to_front,
)


HOST = "0.0.0.0"
PORT = 8088


class CaribbeanSlotsHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload: object, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_error(self, message: str, status: HTTPStatus) -> None:
        self._send_json({"error": message}, status)

    def do_GET(self) -> None:  # noqa: N802 - stdlib handler API
        path = urlparse(self.path).path.rstrip("/") or "/"

        if path == "/health":
            self._send_json({"status": "ok", "service": "caribbean_slots"})
            return

        if path == "/slots":
            self._send_json({"slots": list_slots()})
            return

        if path == "/waiting-slots":
            self._send_json({"waiting_slots": list_waiting_slots()})
            return

        if path.startswith("/slots/"):
            try:
                slot_id = int(path.split("/")[2])
            except (IndexError, ValueError):
                self._send_error("Invalid slot id", HTTPStatus.BAD_REQUEST)
                return

            slot = get_slot(slot_id)
            if not slot:
                self._send_error("Slot not found", HTTPStatus.NOT_FOUND)
                return

            self._send_json({"slot": slot})
            return

        self._send_error("Route not found", HTTPStatus.NOT_FOUND)

    def do_POST(self) -> None:  # noqa: N802 - stdlib handler API
        path = urlparse(self.path).path.rstrip("/") or "/"

        if path.startswith("/slots/") and path.endswith("/men-entry"):
            try:
                slot_id = int(path.split("/")[2])
                entry = create_mens_entry(slot_id)
            except ValueError as exc:
                self._send_error(str(exc), HTTPStatus.NOT_FOUND)
                return

            self._send_json(
                {
                    "entry": entry,
                    "message": "Men's $6 USD entry created. Redirect to WiPay when checkout_url is configured.",
                },
                HTTPStatus.CREATED,
            )
            return

        if path == "/bot/rotate":
            try:
                result = rotate_waiting_slots_to_front(source="api")
            except ValueError as exc:
                self._send_error(str(exc), HTTPStatus.CONFLICT)
                return

            self._send_json({"rotation": result}, HTTPStatus.CREATED)
            return

        self._send_error("Route not found", HTTPStatus.NOT_FOUND)

    def log_message(self, format: str, *args: object) -> None:
        print(f"[caribbean_slots] {self.address_string()} - {format % args}")


def run() -> None:
    initialize_database()
    server = ThreadingHTTPServer((HOST, PORT), CaribbeanSlotsHandler)
    print(f"Caribbean slots API running at http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    run()
