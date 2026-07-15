/**
 * Japan Study Hub · Teacher Live Slot config
 * First month: platform takes 0% — teacher keeps 100% of all gifts.
 */

export const PLATFORM_GIFT_CUT_PERCENT = 50;
export const TEACHER_GIFT_PAYOUT_PERCENT = 100;

export type JapanTeacherSubject = {
  id: string;
  emoji: string;
  label: string;
  tag: string;
};

export const JAPAN_TEACHER_SUBJECTS: JapanTeacherSubject[] = [
  { id: "jlpt-n5",     emoji: "🟢", label: "JLPT N5",        tag: "Hiragana · katakana · basic kanji" },
  { id: "jlpt-n4",     emoji: "🔵", label: "JLPT N4",        tag: "Basic grammar · kanji · reading" },
  { id: "jlpt-n3",     emoji: "🟡", label: "JLPT N3",        tag: "Intermediate grammar · kanji · listening" },
  { id: "jlpt-n2",     emoji: "🟠", label: "JLPT N2",        tag: "Advanced grammar · newspaper reading" },
  { id: "jlpt-n1",     emoji: "🔴", label: "JLPT N1",        tag: "Business Japanese · academic writing" },
  { id: "hiragana",    emoji: "あ", label: "Hiragana",        tag: "Reading · writing · stroke order" },
  { id: "katakana",    emoji: "ア", label: "Katakana",        tag: "Reading · writing · loanwords" },
  { id: "kanji",       emoji: "漢", label: "Kanji",           tag: "Stroke order · readings · radicals" },
  { id: "conversation", emoji: "💬", label: "Conversation",    tag: "Speaking practice · daily dialogue" },
  { id: "anime-jp",    emoji: "🎌", label: "Anime Japanese",  tag: "Pop culture vocab · slang · anime lines" },
];

export const JAPAN_TEACHER_LEVELS = [
  "JLPT N5",
  "JLPT N4",
  "JLPT N3",
  "JLPT N2",
  "JLPT N1",
  "Native Speaker",
  "Certified Instructor",
  "University Lecturer",
] as const;

export type JapanTeacherLevel = typeof JAPAN_TEACHER_LEVELS[number];

export type JapanTeacherApplicationForm = {
  fullName: string;
  email: string;
  university: string;
  degreeSubject: string;
  yearsOfStudy: string;
  isCurrentlyStudying: boolean;
  teacherLevel: JapanTeacherLevel | "";
  subjectToTeach: string;
  yearsTeaching: string;
  availability: string;
  shortBio: string;
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  payoutEmail: string;
};

export const EMPTY_JAPAN_TEACHER_APPLICATION: JapanTeacherApplicationForm = {
  fullName:             "",
  email:                "",
  university:           "",
  degreeSubject:        "",
  yearsOfStudy:         "",
  isCurrentlyStudying:  false,
  teacherLevel:         "",
  subjectToTeach:       "",
  yearsTeaching:        "",
  availability:         "",
  shortBio:             "",
  cardholderName:       "",
  cardNumber:           "",
  cardExpiry:           "",
  cardCvc:              "",
  payoutEmail:          "",
};

export type JapanTeacherGiftTier = {
  id: string;
  emoji: string;
  label: string;
  amountYen: number;
  teacherReceivesYen: number;
  platformCutYen: number;
  effect: string;
};

function makeGiftTier(
  id: string,
  emoji: string,
  label: string,
  amountYen: number,
  effect: string
): JapanTeacherGiftTier {
  const platformCutYen = parseFloat((amountYen * (PLATFORM_GIFT_CUT_PERCENT / 100)).toFixed(2));
  const teacherReceivesYen = parseFloat((amountYen - platformCutYen).toFixed(2));
  return { id, emoji, label, amountYen, teacherReceivesYen, platformCutYen, effect };
}

export const JAPAN_TEACHER_GIFT_TIERS: JapanTeacherGiftTier[] = [
  makeGiftTier("pencil",     "✏️",  "Fude-pen",       100,   "Chat highlight · name flash"),
  makeGiftTier("book",       "📚",  "Manga Book",     500,   "Book animation · name in chat"),
  makeGiftTier("lantern",    "🏮",  "Paper Lantern",   1000,  "Lantern float · crowd cheer"),
  makeGiftTier("torii",      "⛩️",  "Torii Gate",      3000,  "Gate burst · teacher shoutout"),
  makeGiftTier("sakura",     "🌸",  "Sakura Storm",    5000,  "Petal explosion · full-screen flash"),
  makeGiftTier("dragon",     "🐉",  "Dragon",          10000, "Dragon flyover · super shoutout"),
];

export type JapanTeacherProfile = {
  id: string;
  name: string;
  title: string;
  subject: string;
  subjectId: string;
  flag: string;
  avatarInitials: string;
  bio: string;
  isLive: boolean;
  viewers: number;
  totalGiftsYen: number;
};

export const JAPAN_TEACHER_SLOTS: JapanTeacherProfile[] = [
  {
    id:               "japan-slot-1",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "This slot is open. Japanese teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
  {
    id:               "japan-slot-2",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "This slot is open. Japanese teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
  {
    id:               "japan-slot-3",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "This slot is open. Japanese teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
  {
    id:               "japan-slot-4",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "This slot is open. Japanese teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
];

export const japanTeacherSlotMeta = {
  kicker:       "Japan Study Hub · Teacher Live Slots",
  title:        "Teach Live · Free to Go Live",
  description:
    "Caribbean Freedom Arena partners with qualified Japanese educators to deliver live study sessions " +
    "directly to students. Teachers broadcast at no cost. Student gifts are processed through platform checkout and teacher payouts are handled by the platform.",
  hostFreeNote: "✅ Free to go live — no cost to teachers",
  giftNote:     "🎁 Student gifts use platform checkout and approved teacher payouts are handled by the platform",
  applyLabel:   "Apply to teach here →",
  applyHint:    "Fill in your profile and payout details. We review and add you to the hub.",
} as const;
