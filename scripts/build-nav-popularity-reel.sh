#!/usr/bin/env bash
# Build exact 5.00s MP4 clips for the Popularity nav preview reel.
set -euo pipefail

FF="${FF:-$(cd "$(dirname "$0")/.." && pwd)/node_modules/ffmpeg-static/ffmpeg}"
REEL="$(cd "$(dirname "$0")/.." && pwd)/public/nav-popularity-reel"
PUB="$(cd "$(dirname "$0")/.." && pwd)/public"
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
  "$FF" -y -i "$input" -t 5 \
    -vf "$SCALE" \
    "${ENCODE[@]}" "$out"
  echo "trimmed $id"
}

# Multi-photo montage: each still gets subtle motion, hard-cut every 1s → exact 5s reel.
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

  "$FF" -y -f concat -safe 0 -i "$list" -t 5 \
    -vf "$SCALE" \
    "${ENCODE[@]}" "$REEL/${id}.mp4"
  echo "montage $id (${#images[@]} shots)"
}

trim_real_clip "arena-flash" "$PUB/ecuador-arena-flash-live-clip.mp4"
trim_real_clip "games-live" "$PUB/ecuador-live-free-fire-trend.mp4"

PHONE_CLIP="/Users/dimiphone/Desktop/PICTURES & VIDS MAC M1/20260607_041447040.mp4"
if [[ -f "$PHONE_CLIP" ]]; then
  trim_real_clip "snow-games" "$PHONE_CLIP"
else
  montage_clip "snow-games" \
    "cotswolds-park-drones-play-snow.png" \
    "cotswolds-park-feed-1.png" \
    "cotswolds-park-feed-games-night.png" \
    "cotswolds-park-feed-3.png" \
    "cotswolds-park-feed-4.png"
fi

montage_clip "swiss-flash" \
  "cotswolds-elite-snow-indoor-1.png" \
  "cotswolds-elite-snow-indoor-2.png" \
  "cotswolds-elite-snow-indoor-3.png" \
  "cotswolds-elite-snow-indoor-4.png" \
  "cotswolds-park-happy-snow-1.png"

montage_clip "tokyo" \
  "japan-room-fuji-pagoda-bg.png" \
  "japan-room-kimono-sakura.png" \
  "japan-dropship-host-portrait.png" \
  "china-room-shanghai-cyberpunk-bg.png" \
  "japan-dropship-host-desk.png"

montage_clip "dropship" \
  "japan-dropship-creator-live-slot.png" \
  "japan-dropship-host-desk.png" \
  "ecuador-dropship-people-banco-guayaquil.png" \
  "ecuador-dropship-people-volunteers.png" \
  "china-dropship-people-team-meeting.png"

rm -rf "$TMP"

echo "--- durations ---"
for f in "$REEL"/*.mp4; do
  "$FF" -i "$f" 2>&1 | awk -v n="$(basename "$f")" '/Duration:/ {print n, $2, $3}' || true
done