/**
 * Command Center · owner operator mode
 *
 * Set NEXT_PUBLIC_COMMAND_CENTER_ENABLED=true in YOUR local .env.local only.
 * Public / production builds keep this false so fans never see:
 *   · /command-center route (redirects home)
 *   · Nav link · registry APIs · master key unlock · owner bypass badges
 *
 * Registry + engine preview files live in .data/ (gitignored · excluded from deliverable zip).
 */

/** Owner operator shell — local .env.local only · never true on public fan builds */
export const isCommandCenterEnabled =
  process.env.NEXT_PUBLIC_COMMAND_CENTER_ENABLED === "true";

/** Alias for server routes and owner-only UI gates */
export function isOwnerOperatorModeEnabled() {
  return isCommandCenterEnabled;
}
