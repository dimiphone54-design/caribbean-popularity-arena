/**
 * UK Best Makeup Look · Bella · Hyde Park Edition
 * Public face = free watch / apply / queue (money catalog → Command Center FREEZE COMING SOON)
 */

export const ukBestMakeupLookEdition = {
  kicker: "🇬🇧 Best Makeup Look",
  title: "Bella · Hyde Park Edition",
  sessionBadge: "💄 Live 1-Hour Glam Session · 18+",
  hostFirstName: "Bella",
  hostFullName: "Bella Soho",
  area: "Hyde Park",
  flag: "🇬🇧",
  lead:
    "Bella creates her signature summer look live — from Hyde Park, her room, or a London beauty store.",
  /** Shown on go-live apply form · free public rules */
  howItWorksHeading: "How It Works",
  howItWorks: [
    "60-minute live session",
    "Watch free · chat free · no paid gifts on public panel",
    "At the end of the hour, the next verified creator in the auto queue goes live"
  ] as const,
  /** Command Center freeze catalog only (not public panel) */
  earningsHeading: "Platform Earnings (Fair UK Rates)",
  earnings: [
    "Viewers pay £3 – £5 for full voting access during the live hour (standard UK rate)",
    "Gifts & tips: Platform takes 30% commission (Bella keeps 70%) — common industry rate",
    "Premium Boosts available for participants who want more visibility"
  ] as const,
  queueHeading: "Auto Live Queue System",
  premiumHeading: "Session features (free)",
  premium: [
    "Watch free during the live hour (18+)",
    "Auto-queue · next verified creator goes live after 60 minutes",
    "Apply free to go live makeup",
    "Chat & watch UI ready for testing"
  ]
} as const;

/** Owner freeze detail · FREEZE COMING SOON panel */
export const UK_BEST_MAKEUP_FREEZE_CATALOG = {
  panelTitle: "🇬🇧 Best Makeup Look · Bella · Hyde Park Edition",
  publicStatus: "LIVE for public · free watch/apply/queue · money removed",
  room: "/rooms/uk-flag-cotswolds#uk-best-makeup-look",
  freePublic: [
    "Public Best Makeup Look panel · Bella / auto host handoff",
    "18+ age gate · free watch live · apply to go live form",
    "Auto live queue · 60-minute sessions · next creator goes live",
    "End session · handoff controls (no charge)",
    "Cotswolds watch simulator when live"
  ],
  frozenMoney: [
    "Viewer vote unlock £3 / £5 during live hour",
    "Live gifts Lipstick £1 → Gold Trophy £50",
    "Platform 30% / creator 70% gift split (when money returns)",
    "Premium boosts Glow £5 · Spotlight £12 · Prime £25",
    "startPlatformCheckout gift / vote / boost path",
    "Secure Arena checkout · paid features on public panel",
    "Platform Earnings live console stays Command Center only"
  ],
  voteTiersNote: "Vote access tiers catalog below · not charged on public.",
  giftTiersNote: "Gift tiers catalog below · not charged on public.",
  boostsNote: "Premium boosts catalog below · removed from public go-live form.",
  reopenNote:
    "When ready: restore vote unlock / gifts / boosts on public + Command Center economy console with NEXT_PUBLIC_REAL_MONEY_ENABLED=true."
} as const;

/* ─── Auto live queue · real session handoff ─── */

/** Full live hour (matches product copy) */
export const MAKEUP_AUTO_SESSION_MS = 60 * 60 * 1000;

export type UkMakeupLiveHost = {
  id: string;
  fullName: string;
  firstName: string;
  makeupStyle: string;
  liveFrom: string;
  /** Seed host · Bella Hyde Park Edition */
  isSeedHost: boolean;
};

export function createBellaLiveHost(): UkMakeupLiveHost {
  return {
    id: "host-bella",
    fullName: ukBestMakeupLookEdition.hostFullName,
    firstName: ukBestMakeupLookEdition.hostFirstName,
    makeupStyle: "Signature summer glam",
    liveFrom: ukBestMakeupLookEdition.area,
    isSeedHost: true
  };
}

export function queueEntryToLiveHost(entry: UkMakeupLiveQueueEntry): UkMakeupLiveHost {
  const firstName = entry.fullName.trim().split(/\s+/)[0] || entry.fullName;
  return {
    id: entry.id,
    fullName: entry.fullName,
    firstName,
    makeupStyle: entry.makeupStyle,
    liveFrom: entry.liveFrom,
    isSeedHost: false
  };
}

export function formatMakeupSessionCountdown(remainingMs: number) {
  const totalSec = Math.max(0, Math.floor(remainingMs / 1000));
  const mins = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const secs = String(totalSec % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

/* ─── Live money engine · Fair UK Rates ─── */

/** Gifts & tips · platform 30% · creator keeps 70% */
export const MAKEUP_PLATFORM_CUT_PERCENT = 30;
export const MAKEUP_CREATOR_KEEP_PERCENT = 70;

/** Viewer voting access during live hour (£) */
export const MAKEUP_VOTE_ACCESS_TIERS = [
  {
    id: "vote-3",
    amountGbp: 3,
    label: "Standard vote",
    description: "Full voting access for this live hour"
  },
  {
    id: "vote-5",
    amountGbp: 5,
    label: "Power vote",
    description: "Full voting + double vote weight this hour"
  }
] as const;

export type MakeupVoteTierId = (typeof MAKEUP_VOTE_ACCESS_TIERS)[number]["id"];

/** Premium boosts · participants pay for visibility in queue / on board */
export const MAKEUP_PREMIUM_BOOSTS = [
  {
    id: "boost-glow",
    label: "Glow boost",
    amountGbp: 5,
    visibilityPoints: 10,
    description: "Highlight your queue card · +10 visibility"
  },
  {
    id: "boost-spotlight",
    label: "Spotlight boost",
    amountGbp: 12,
    visibilityPoints: 30,
    description: "Move up the board · +30 visibility"
  },
  {
    id: "boost-lockout",
    label: "Prime boost",
    amountGbp: 25,
    visibilityPoints: 75,
    description: "Top of next auto-queue · +75 visibility"
  }
] as const;

export type MakeupBoostId = (typeof MAKEUP_PREMIUM_BOOSTS)[number]["id"];

/** Gift tiers · viewer tips during live hour */
export const MAKEUP_LIVE_GIFT_TIERS = [
  { id: "lipstick", emoji: "💄", label: "Lipstick", amountGbp: 1 },
  { id: "mirror", emoji: "🪞", label: "Mirror", amountGbp: 2 },
  { id: "heart", emoji: "💗", label: "Pink Heart", amountGbp: 5 },
  { id: "crown", emoji: "👑", label: "Crown", amountGbp: 10 },
  { id: "diamond", emoji: "💎", label: "Diamond", amountGbp: 25 },
  { id: "trophy", emoji: "🏆", label: "Gold Trophy", amountGbp: 50 }
] as const;

export type MakeupLiveGiftId = (typeof MAKEUP_LIVE_GIFT_TIERS)[number]["id"];

export function splitMakeupGiftGbp(amountGbp: number) {
  const platformGbp = Math.round(amountGbp * (MAKEUP_PLATFORM_CUT_PERCENT / 100) * 100) / 100;
  const creatorGbp = Math.round((amountGbp - platformGbp) * 100) / 100;
  return {
    grossGbp: amountGbp,
    platformGbp,
    creatorGbp,
    platformPercent: MAKEUP_PLATFORM_CUT_PERCENT,
    creatorPercent: MAKEUP_CREATOR_KEEP_PERCENT
  };
}

export function formatMakeupGbp(amount: number) {
  return `£${amount.toFixed(2)}`;
}

export const ukMakeupGoLiveLocations = [
  "Hyde Park",
  "My room / home studio",
  "London beauty store",
  "Other London location"
] as const;

export type UkMakeupGoLiveForm = {
  fullName: string;
  email: string;
  country: string;
  instagramHandle: string;
  makeupStyle: string;
  liveFrom: string;
  /** Optional premium boost at apply time */
  boostId: MakeupBoostId | "";
  confirmHowItWorks: boolean;
  confirmAdult: boolean;
};

export const EMPTY_UK_MAKEUP_GO_LIVE: UkMakeupGoLiveForm = {
  fullName: "",
  email: "",
  country: "",
  instagramHandle: "",
  makeupStyle: "",
  liveFrom: "",
  boostId: "",
  confirmHowItWorks: false,
  confirmAdult: false
};

/** Queue entry · boosts raise visibility so they sort higher */
export type UkMakeupLiveQueueEntry = {
  id: string;
  fullName: string;
  makeupStyle: string;
  liveFrom: string;
  joinedAtLabel: string;
  /** Higher = more visible / earlier auto-live */
  visibilityPoints: number;
  boostsPurchased: number;
  boostSpendGbp: number;
};

export type MakeupGiftLogItem = {
  id: string;
  giftId: string;
  emoji: string;
  label: string;
  amountGbp: number;
  platformGbp: number;
  creatorGbp: number;
  tsLabel: string;
};

export type MakeupVoteLogItem = {
  id: string;
  tierId: string;
  amountGbp: number;
  weight: number;
  tsLabel: string;
};

export function sortMakeupQueueByVisibility(entries: UkMakeupLiveQueueEntry[]) {
  return [...entries].sort((a, b) => {
    if (b.visibilityPoints !== a.visibilityPoints) return b.visibilityPoints - a.visibilityPoints;
    return a.joinedAtLabel.localeCompare(b.joinedAtLabel);
  });
}

export function getBoostById(boostId: string) {
  return MAKEUP_PREMIUM_BOOSTS.find((b) => b.id === boostId) ?? null;
}
