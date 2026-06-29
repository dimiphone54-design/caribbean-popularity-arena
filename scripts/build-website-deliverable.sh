#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATE="$(date +%Y%m%d)"
ZIP_NAME="caribbean-freedom-arena-website-${DATE}.zip"
OUT="$ROOT/deliverables/$ZIP_NAME"
DESKTOP_DIR="$HOME/Desktop/CARIBBEANLOVEAPP (DATA BASE)"
DESKTOP_ZIP="$DESKTOP_DIR/$ZIP_NAME"

cd "$ROOT"

# Drop older website zips in repo deliverables — keep only the fresh save
find "$ROOT/deliverables" -maxdepth 1 -type f -name 'caribbean-freedom-arena-website-*.zip' -delete 2>/dev/null || true

zip -r "$OUT" . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x ".git/*" \
  -x ".cursor/*" \
  -x "incoming/*" \
  -x "preview-4k/*" \
  -x "legacy/*" \
  -x "caribbean_slots/*" \
  -x ".data/*" \
  -x ".env" \
  -x ".env.*" \
  -x "*.zip" \
  -x "deliverables/*.zip" \
  -x "**/.DS_Store" \
  -x "tsconfig.tsbuildinfo" \
  -x "LOVABLE.md"

mkdir -p "$DESKTOP_DIR"

# Drop older website zips on Desktop — keep only today's save
find "$DESKTOP_DIR" -maxdepth 1 -type f -name 'caribbean-freedom-arena-website-*.zip' -delete 2>/dev/null || true

cp "$OUT" "$DESKTOP_ZIP"

echo "Saved (repo):    $OUT"
echo "Saved (Desktop): $DESKTOP_ZIP"

# Always reveal the Desktop folder in Finder
open "$DESKTOP_DIR"
