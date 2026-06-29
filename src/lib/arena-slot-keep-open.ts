/** Dev / preview · keep signed-in Front 12 slots live · no 3h expiry */
export function shouldKeepArenaActiveSlotsOpen() {
  return (
    process.env.NEXT_PUBLIC_ARENA_KEEP_ACTIVE_SLOTS_OPEN === "true" ||
    process.env.NEXT_PUBLIC_APP_ENV === "development"
  );
}
