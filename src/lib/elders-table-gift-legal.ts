import { arenaGiftLegalCopy, formatArenaGiftAmount } from "@/lib/arena-gifts";

/** Elders Table · $100 Gift — copy aligned with Terms §12 and Refund Policy §3. */
export const eldersTableGiftAmountUsd = 100;

export const eldersTableGiftAmountLabel = formatArenaGiftAmount(eldersTableGiftAmountUsd);

export const eldersTableGiftLegal = {
  productName: "The Elders Table",
  digitalAccessLine:
    "Digital Elders Table room access — platform features, creator showcase viewing, and live engagement tools where enabled.",
  membershipDescription:
    "Send a $100 Gift for digital Elders Table room access on Caribbean Popularity Arena — culture sessions, creator showcase, and community engagement features.",
  membershipFeatures: [
    "Digital Elders Table room entry · platform access",
    "Creator showcase & culture engagement · where enabled on the Platform",
    "Community games, riddims, and culture exchange topics",
    "Arena voting and lounge tools · where enabled"
  ],
  sectionIntro:
    "Digital premium room access on the Platform. All amounts are voluntary Gifts for software and community features — not purchases of personal access or time with any individual.",
  checkoutLabel: (roomLabel: string) =>
    `${roomLabel} · digital platform access · ${eldersTableGiftAmountLabel}`,
  giftButtonLabel: (amountLabel: string) => `Send Gift · digital room access · ${amountLabel}`,
  widgetDetail:
    "Creator showcase live stream · digital Elders Room · platform engagement only",
  widgetDisclaimer: arenaGiftLegalCopy.noIndividualAccess,
  tickerItems: [
    "● LIVE DATA",
    `${eldersTableGiftAmountLabel} · digital Elders Table room access`,
    "Platform features · creator showcase · community engagement",
    arenaGiftLegalCopy.noIndividualAccess,
    "Terms · Refund Policy apply at checkout"
  ] as const
} as const;
