/** Arena · all monetary amounts are framed as Gifts (not payments or purchases). */

export function formatArenaGiftAmount(amountUsd: number | string): string {
  const amount = typeof amountUsd === "string" ? Number(amountUsd) : amountUsd;
  if (!Number.isFinite(amount) || amount <= 0) return "$0 Gift";
  return `$${amount} Gift`;
}

/** Shared gift disclosures — matches Terms §12 and Refund Policy §3. */
export const arenaGiftLegalCopy = {
  digitalServicesOnly:
    "Gifts are voluntary contributions for digital platform access, software features, and community participation — not direct purchases.",
  noIndividualAccess:
    "Gifts do not purchase access to any specific individual and do not guarantee communication, responses, meetings, matches, introductions, or personal outcomes.",
  refundPolicyRef: "See Refund and Payment Policy and Terms for full disclosures."
} as const;

export const arenaGiftCopy = {
  complimentary: "Complimentary Gift",
  sendGift: "Send Gift",
  openingGift: "Opening gift…",
  giftUnavailable: "Gift unavailable right now — try again shortly.",
  giftQueued: "Demo gift queued — Fygaro goes live with your keys.",
  giftNetworkError: "Network error — gift will retry when you are back online.",
  noGiftRequired: "No gift required",
  memberGiftPreview: "$6 Gift · Member sign-in preview",
  redirectingGift: (amountUsd: number, processor = "Fygaro") =>
    `Redirecting to ${processor} for your ${formatArenaGiftAmount(amountUsd)}.`,
  demoGiftReady: (amountUsd: number, processor = "Fygaro") =>
    `Demo gift ready — ${processor} keys will automate your ${formatArenaGiftAmount(amountUsd)} once your Fygaro + Scotiabank pipeline is live.`,
  giftConfirmed: (amountUsd: number) =>
    `Gift confirmed — your ${formatArenaGiftAmount(amountUsd)} is on its way to settlement.`,
  giftReturnPending: "Payment received — finishing your arena unlock…"
} as const;
