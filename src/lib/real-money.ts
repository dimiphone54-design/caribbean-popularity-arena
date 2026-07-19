/**
 * Real-money freeze switch.
 *
 * Default: FROZEN unless NEXT_PUBLIC_REAL_MONEY_ENABLED is exactly "true".
 * Keeps browse / live / chat / free UI testing on while blocking charges,
 * PayPal orders, dropship purchases, paid gifts, vote-unlock fees, and tips.
 *
 * Public dropship panels default HIDDEN — owner tools stay in Command Center.
 * Set NEXT_PUBLIC_SHOW_DROPSHIP_PANELS=true to show country-room dropship again.
 */

export const REAL_MONEY_FREEZE_MESSAGE =
  "Real-money payments are temporarily frozen while we finish the next plan. Live rooms, profiles, and free testing stay on — no charges right now.";

export const DROPSHIP_PURCHASE_FREEZE_MESSAGE =
  "Product purchases are temporarily disabled. Dropship is private in Command Center until the new plan is ready.";

export const DROPSHIP_PUBLIC_HIDDEN_MESSAGE =
  "Dropshipping is temporarily hidden on public rooms. Owner tools remain in Command Center.";

/** Must be explicitly "true" to allow any real charge path. */
export function isRealMoneyEnabled(): boolean {
  return process.env.NEXT_PUBLIC_REAL_MONEY_ENABLED === "true";
}

/**
 * Public country-room / market dropship panels.
 * Default hidden — Command Center keeps full dropship ops privately.
 */
export function isPublicDropshipVisible(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_DROPSHIP_PANELS === "true";
}

/** Dropship buy / product checkout (needs public panels + real money + explicit purchase flag). */
export function isDropshipPurchaseEnabled(): boolean {
  if (!isPublicDropshipVisible()) return false;
  if (!isRealMoneyEnabled()) return false;
  return process.env.NEXT_PUBLIC_ENABLE_DROPSHIP_PURCHASES === "true";
}

export function getRealMoneyPublicStatus() {
  return {
    realMoneyEnabled: isRealMoneyEnabled(),
    publicDropshipVisible: isPublicDropshipVisible(),
    dropshipPurchaseEnabled: isDropshipPurchaseEnabled(),
    frozen: !isRealMoneyEnabled(),
    message: isRealMoneyEnabled() ? null : REAL_MONEY_FREEZE_MESSAGE
  } as const;
}
