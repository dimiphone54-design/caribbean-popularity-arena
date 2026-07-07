#!/usr/bin/env bash
# Build exact 5.00s MP4 clips for the Sports nav video panel.
set -euo pipefail

FF="${FF:-$(cd "$(dirname "$0")/.." && pwd)/node_modules/ffmpeg-static/ffmpeg}"
REEL="$(cd "$(dirname "$0")/.." && pwd)/public/nav-sports-reel"
PUB="$(cd "$(dirname "$0")/.." && pwd)/public"
POP_REEL="$(cd "$(dirname "$0")/.." && pwd)/public/nav-popularity-reel"
TMP="$(mktemp -d)"

SCALE="scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720"
ENCODE=(-c:v libx264 -pix_fmt yuv420p -r 25 -movflags +faststart -an)

if [[ ! -x "$FF" ]]; then
  echo "ffmpeg-static not found. Run: npm install ffmpeg-static --no-save && npm approve-scripts ffmpeg-static"
  exit 1
fi

mkdir -p "$REEL"

trim_real_clip() {
  local id="$1"
  local input="$2"
  local out="$REEL/${id}.mp4"
  "$FF" -y -i "$input" -t 5 -vf "$SCALE" "${ENCODE[@]}" "$out"
  echo "trimmed $id"
}

montage_clip() {
  local id="$1"
  shift
  local images=("$@")
  local list="$TMP/${id}-concat.txt"
  : >"$list"

  local i=0
  for img in "${images[@]}"; do
    local seg="$TMP/${id}-seg${i}.mp4"
    "$FF" -y -loop 1 -i "$PUB/$img" \
      -vf "$SCALE,zoompan=z='min(zoom+0.0018,1.1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=25:s=1280x720:fps=25" \
      -t 1 "${ENCODE[@]}" "$seg"
    printf "file '%s'\n" "$seg" >>"$list"
    i=$((i + 1))
  done

  "$FF" -y -f concat -safe 0 -i "$list" -t 5 -vf "$SCALE" "${ENCODE[@]}" "$REEL/${id}.mp4"
  echo "montage $id (${#images[@]} shots)"
}

copy_if_exists() {
  local src="$1"
  local dest="$2"
  if [[ -f "$src" ]]; then
    cp "$src" "$dest"
    echo "copied $(basename "$dest")"
  fi
}

trim_real_clip "arena-flash" "$PUB/ecuador-arena-flash-live-clip.mp4"
trim_real_clip "games-live" "$PUB/ecuador-live-free-fire-trend.mp4"

montage_clip "football-live" \
  "colombia-bg-football-match.png" \
  "manchester-united-live-action.png" \
  "colombia-beach-happy.png" \
  "colombia-bg-paragliding-crowd.png" \
  "international-suite-flags-hero.png"

montage_clip "man-utd-action" \
  "manchester-united-live-action.png" \
  "colombia-bg-football-match.png" \
  "colombia-food-bogota-ajiaco.png" \
  "colombia-nightlife-real.png" \
  "colombia-slide-comuna13-party.png"

montage_clip "colombia-sports" \
  "colombia-nightlife-real.png" \
  "colombia-bg-football-match.png" \
  "colombia-slide-medellin-metro.png" \
  "colombia-beach-baru.png" \
  "colombia-bg-coffee-couple.png"

montage_clip "park-games" \
  "cotswolds-park-feed-games-night.png" \
  "cotswolds-london-park-games-six.png" \
  "cotswolds-park-drones-play-snow.png" \
  "cotswolds-park-feed-3.png" \
  "cotswolds-park-feed-4.png"

rm -rf "$TMP"

echo "--- durations ---"
for f in "$REEL"/*.mp4; do
  "$FF" -i "$f" 2>&1 | awk -v n="$(basename "$f")" '/Duration:/ {print n, $2, $3}' || true
done