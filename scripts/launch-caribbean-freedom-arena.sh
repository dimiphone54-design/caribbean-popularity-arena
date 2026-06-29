#!/usr/bin/env bash
# Launch CaribbeanFreedomArena from Desktop save (or repo fallback).
set -euo pipefail

DESKTOP_DATA="$HOME/Desktop/CARIBBEANLOVEAPP (DATA BASE)"
REPO="$(cd "$(dirname "$0")/.." && pwd)"

ROOT=""
for candidate in \
  "$HOME/Desktop/CaribbeanFreedomArena" \
  "$DESKTOP_DATA/caribbean-freedom-arena-website" \
  "$DESKTOP_DATA/CaribbeanFreedomArena" \
  "$REPO"; do
  if [[ -f "$candidate/package.json" ]]; then
    ROOT="$candidate"
    break
  fi
done

if [[ -z "$ROOT" ]]; then
  echo "CaribbeanFreedomArena not found."
  echo "Unzip caribbean-freedom-arena-website-*.zip to:"
  echo "  ~/Desktop/CaribbeanFreedomArena"
  echo "  or \"$DESKTOP_DATA/caribbean-freedom-arena-website\""
  exit 1
fi

cd "$ROOT"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies…"
  npm install
fi

if ! lsof -nP -iTCP:3004 -sTCP:LISTEN >/dev/null 2>&1; then
  :
else
  echo "Port 3004 busy — stopping existing process…"
  lsof -ti:3004 2>/dev/null | xargs kill -9 2>/dev/null || true
fi

echo "Launching from: $ROOT"
echo "Preview: http://localhost:3004/#home"
exec npm run dev:arena
