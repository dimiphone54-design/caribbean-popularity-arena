#!/usr/bin/env bash
# Safely import a ZIP without deleting or overwriting existing project files.
# Usage:
#   ./scripts/safe-import-zip.sh /path/to/archive.zip
#   ./scripts/safe-import-zip.sh                    # uses newest .zip in incoming/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ZIP="${1:-}"

if [[ -z "$ZIP" ]]; then
  ZIP="$(find "$ROOT/incoming" -maxdepth 1 -type f -iname '*.zip' -print 2>/dev/null | sort | tail -1)"
fi

if [[ -z "$ZIP" || ! -f "$ZIP" ]]; then
  echo "Usage: $0 [/path/to/archive.zip]"
  echo "Or drop a .zip into: $ROOT/incoming/"
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
STAGING="$ROOT/_import-staging-$STAMP"
ARCHIVE="$ROOT/_archives"
CONFLICTS="$ROOT/_import-conflicts-$STAMP"

mkdir -p "$STAGING" "$ARCHIVE" "$CONFLICTS"
cp -p "$ZIP" "$ARCHIVE/$(basename "$ZIP")"

echo "Extracting to staging (existing files untouched): $STAGING"
unzip -q "$ZIP" -d "$STAGING"

echo ""
echo "Merging new files only (--ignore-existing keeps all current files)..."
rsync -av --ignore-existing "$STAGING/" "$ROOT/"

echo ""
echo "Checking for path conflicts (same path, different content)..."
while IFS= read -r -d '' file; do
  rel="${file#$STAGING/}"
  target="$ROOT/$rel"
  if [[ -f "$target" && -f "$file" ]] && ! cmp -s "$file" "$target"; then
    mkdir -p "$(dirname "$CONFLICTS/$rel")"
    cp -p "$file" "$CONFLICTS/$rel"
    echo "  conflict saved: $CONFLICTS/$rel"
  fi
done < <(find "$STAGING" -type f -print0)

echo ""
echo "Import complete."
echo "  ZIP archive: $ARCHIVE/$(basename "$ZIP")"
echo "  Staging copy: $STAGING"
if [[ -n "$(find "$CONFLICTS" -type f 2>/dev/null | head -1)" ]]; then
  echo "  Conflicts (ZIP version): $CONFLICTS"
  echo "  Your original files were NOT overwritten."
else
  rmdir "$CONFLICTS" 2>/dev/null || true
  echo "  No conflicts — all merged cleanly."
fi
