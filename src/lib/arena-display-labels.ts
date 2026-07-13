/** Display labels only — no payments on platform. */
export function formatFreeLabel(amountUsd?: number | string): string {
  void amountUsd;
  return "Free";
}

export const arenaDisplayCopy = {
  sendGift: "Enter room",
  noGiftRequired: "No purchase required",
  complimentary: "Free · open access"
} as const;
