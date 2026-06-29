/** Front 12 · each active slot runs a 3-hour countdown from player sign-in */
export const ARENA_SLOT_COUNTDOWN_SECONDS = 3 * 60 * 60;

export function formatArenaSlotCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function getOccupiedArenaSlotCountdownLabel(remainingSeconds: number) {
  return formatArenaSlotCountdown(remainingSeconds);
}
