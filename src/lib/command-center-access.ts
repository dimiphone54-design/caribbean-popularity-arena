/**
 * Command Center · MASTER / owner only
 *
 * 1. Set NEXT_PUBLIC_COMMAND_CENTER_ENABLED=true in YOUR local .env.local only.
 * 2. Nav + page also require primary MASTER recognition on this device
 *    (Charlie / trusted device / master key / localhost auto-trust).
 *
 * Public / production / clean zips keep the flag false so fans never see:
 *   · /command-center route (redirects home)
 *   · Nav link · registry APIs · master key unlock · owner bypass badges
 *
 * .env.local is excluded from clean deliverable zips.
 */

/** Owner operator shell — local .env.local only · never true on public fan builds */
export const isCommandCenterEnabled =
  process.env.NEXT_PUBLIC_COMMAND_CENTER_ENABLED === "true";

/** Alias for server routes and owner-only UI gates */
export function isOwnerOperatorModeEnabled() {
  return isCommandCenterEnabled;
}

/**
 * Client-only · Command Center UI (nav + /command-center page).
 * Must be MASTER recognized on this device — not just the env flag.
 * Import master helpers lazily via callers to avoid circular init issues.
 */
export function canShowCommandCenterUi(isMasterRecognized: boolean) {
  return isCommandCenterEnabled && isMasterRecognized;
}
