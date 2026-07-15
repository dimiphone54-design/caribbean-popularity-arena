/**
 * UK Fashion · Makeup Live Slots
 * - 2 concurrent slots · 1 hour each
 * - Girls sign up, go live, receive gifts
 * - Most gifts = champion · stays in tournament table
 * - After 1hr slot ends: email sent with earnings · slot opens again
 * - Platform cut: 0% first month (creator keeps 100%)
 */

export const MAKEUP_SLOT_DURATION_MS = 60 * 60 * 1000; // 1 hour
export const MAKEUP_SLOT_COUNT = 2;
export const PLATFORM_MAKEUP_CUT_PERCENT = 0; // first month free
export const CREATOR_MAKEUP_PAYOUT_PERCENT = 100;

/* ─── Gift tiers ─────────────────────────────────────── */
export type MakeupGiftTier = {
  id: string;
  emoji: string;
  label: string;
  amountGbp: number;
  effect: string;
};

export const MAKEUP_GIFT_TIERS: MakeupGiftTier[] = [
  { id: "lipstick",  emoji: "💄", label: "Lipstick",     amountGbp: 1,  effect: "Lipstick pop · name flash" },
  { id: "mirror",    emoji: "🪞", label: "Mirror",       amountGbp: 2,  effect: "Mirror shine · chat glow" },
  { id: "heart",     emoji: "💗", label: "Pink Heart",   amountGbp: 5,  effect: "Heart burst · crowd cheer" },
  { id: "crown",     emoji: "👑", label: "Crown",        amountGbp: 10, effect: "Crown drop · leaderboard highlight" },
  { id: "diamond",   emoji: "💎", label: "Diamond",      amountGbp: 25, effect: "Diamond storm · spotlight flash" },
  { id: "trophy",    emoji: "🏆", label: "Gold Trophy",  amountGbp: 50, effect: "Trophy burst · champion alert" },
];

/* ─── Slot signup form ───────────────────────────────── */
export type MakeupSlotSignupForm = {
  /** Personal */
  fullName: string;
  email: string;
  country: string;
  /** Payout — how she receives her money */
  payoutMethod: "paypal" | "bank" | "card" | "";
  paypalEmail: string;
  bankIban: string;
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  /** Profile */
  instagramHandle: string;
  makeupStyle: string;
};

export const EMPTY_MAKEUP_SIGNUP: MakeupSlotSignupForm = {
  fullName:        "",
  email:           "",
  country:         "",
  payoutMethod:    "",
  paypalEmail:     "",
  bankIban:        "",
  cardholderName:  "",
  cardNumber:      "",
  cardExpiry:      "",
  cardCvc:         "",
  instagramHandle: "",
  makeupStyle:     "",
};

export const MAKEUP_PAYOUT_METHODS = [
  { id: "paypal", label: "PayPal",       emoji: "💙" },
  { id: "bank",   label: "Bank / IBAN",  emoji: "🏦" },
  { id: "card",   label: "Debit card",   emoji: "💳" },
] as const;

export const MAKEUP_STYLES = [
  "Natural glam",
  "Bold editorial",
  "Soft glam",
  "Avant-garde",
  "Bridal",
  "Smokey eye",
  "No-makeup makeup",
  "Colourful / artistic",
] as const;

/* ─── Live slot state ────────────────────────────────── */
export type MakeupSlotStatus = "open" | "live" | "ended";

export type MakeupLiveSlot = {
  slotNumber: 1 | 2;
  status: MakeupSlotStatus;
  /** Null = open slot */
  creator: {
    fullName: string;
    instagramHandle: string;
    makeupStyle: string;
    country: string;
    email: string;
    payoutMethod: string;
  } | null;
  startedAt: number | null; // Date.now() when they went live
  totalGiftsGbp: number;
  giftLog: { emoji: string; label: string; amountGbp: number; senderName: string; ts: number }[];
};

/* ─── Tournament table ───────────────────────────────── */
export type MakeupTournamentEntry = {
  id: string;
  rank: number;
  fullName: string;
  instagramHandle: string;
  makeupStyle: string;
  country: string;
  totalGiftsGbp: number;
  sessionDate: string; // e.g. "14 Jul 2026"
  isChampion: boolean;
};

/** Seeded tournament data so the table looks alive on launch */
export const MAKEUP_TOURNAMENT_SEED: MakeupTournamentEntry[] = [
  {
    id: "t1", rank: 1, fullName: "Jade Monroe",    instagramHandle: "@jademonroe_glam",
    makeupStyle: "Bold editorial", country: "🇬🇧 UK",
    totalGiftsGbp: 184, sessionDate: "13 Jul 2026", isChampion: true,
  },
  {
    id: "t2", rank: 2, fullName: "Sienna Clarke",  instagramHandle: "@siennafacebeat",
    makeupStyle: "Soft glam", country: "🇬🇧 UK",
    totalGiftsGbp: 112, sessionDate: "13 Jul 2026", isChampion: false,
  },
  {
    id: "t3", rank: 3, fullName: "Aaliyah Grant",  instagramHandle: "@aaliyah.artistry",
    makeupStyle: "Smokey eye", country: "🇯🇲 Jamaica",
    totalGiftsGbp: 87,  sessionDate: "12 Jul 2026", isChampion: false,
  },
  {
    id: "t4", rank: 4, fullName: "Priya Sharma",   instagramHandle: "@priya_beautyroom",
    makeupStyle: "Natural glam", country: "🇬🇧 UK",
    totalGiftsGbp: 63,  sessionDate: "12 Jul 2026", isChampion: false,
  },
  {
    id: "t5", rank: 5, fullName: "Leila Dupont",   instagramHandle: "@leiladupont_bybrow",
    makeupStyle: "Bridal", country: "🇫🇷 France",
    totalGiftsGbp: 41,  sessionDate: "11 Jul 2026", isChampion: false,
  },
];

export const makeupSlotMeta = {
  kicker:       "UK Fashion · Makeup Live · 1hr Slots",
  title:        "Go Live · Show Your Makeup · Get Gifted",
  description:
    "Two live slots. Each girl goes live for exactly 1 hour showing her makeup look. " +
    "Fans send gifts through platform checkout — most gifted stays champion. After 1hr the slot opens for the next creator. " +
    "Approved creator payouts are sent by the platform worldwide.",
  slotRules: [
    "🕐 Exactly 1 hour per live session",
    "🎁 Fans gift through platform checkout — creator payout handled by the platform",
    "👑 Most gifted = Champion of the session",
    "📧 Email sent after session with your total earnings",
    "🏆 Your name stays in the tournament table forever",
    "🌍 Platform payout sent worldwide — PayPal, bank, or card",
  ],
} as const;
