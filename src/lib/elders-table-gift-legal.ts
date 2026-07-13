import { arenaGiftLegalCopy, formatArenaGiftAmount } from "@/lib/arena-gifts";

/** Elders Table gift amount (checkout only — not shown as $100 on UI). */
export const eldersTableGiftAmountUsd = 100;

/** Kept for checkout/API; public UI uses gift labels without a dollar amount. */
export const eldersTableGiftAmountLabel = formatArenaGiftAmount(eldersTableGiftAmountUsd);

/** Public-facing price line — no $100 on plans / cards. */
export const eldersTableGiftPublicPriceLabel = "Gift";

export const eldersTableGiftLegal = {
  productName: "The Elders Table",
  digitalAccessLine:
    "Digital Elders Table room access — platform features, creator showcase viewing, and live engagement tools where enabled.",
  membershipDescription:
    "Send a Gift for digital Elders Table room access on Caribbean Popularity Arena — culture sessions, creator showcase, and community engagement features.",
  membershipFeatures: [
    "Digital Elders Table room entry · platform access",
    "Creator showcase & culture engagement · where enabled on the Platform",
    "Community games, riddims, and culture exchange topics",
    "Arena voting and lounge tools · where enabled"
  ],
  sectionIntro:
    "Digital premium room access on the Platform. All amounts are voluntary Gifts for software and community features — not purchases of personal access or time with any individual.",
  checkoutLabel: (roomLabel: string) => `${roomLabel} · digital platform access · Gift`,
  giftButtonLabel: (_amountLabel?: string) => `Send Gift · digital room access`,
  widgetDetail:
    "Creator showcase live stream · digital Elders Room · platform engagement only",
  widgetDisclaimer: arenaGiftLegalCopy.noIndividualAccess,
  tickerItems: [
    "● LIVE DATA",
    "Gift · digital Elders Table room access",
    "Platform features · creator showcase · community engagement",
    arenaGiftLegalCopy.noIndividualAccess,
    "Terms · Refund Policy apply at checkout"
  ] as const
} as const;
