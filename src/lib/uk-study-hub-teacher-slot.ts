/**
 * UK Study Hub · Teacher Live Slot config
 * Public room = free campus (apply · teach · join) — no charges.
 * Gift tiers / cut % kept for Command Center FREEZE COMING SOON only (not public UI).
 */

/** Command Center freeze catalog only — not shown on public UK Study Hub */
export const PLATFORM_GIFT_CUT_PERCENT = 0;   // first month plan · 0% cut when money returns
export const TEACHER_GIFT_PAYOUT_PERCENT = 100;

export type UKTeacherSubject = {
  id: string;
  emoji: string;
  label: string;
  tag: string;
};

export const UK_TEACHER_SUBJECTS: UKTeacherSubject[] = [
  { id: "gcse-maths",      emoji: "📐", label: "GCSE Maths",        tag: "Algebra · equations · past papers" },
  { id: "gcse-english",    emoji: "📝", label: "GCSE English",      tag: "Literature · language · essays" },
  { id: "a-level-bio",     emoji: "🧬", label: "A-Level Biology",   tag: "Cell biology · genetics · revision" },
  { id: "a-level-chem",    emoji: "⚗️", label: "A-Level Chemistry", tag: "Organic · inorganic · titration" },
  { id: "a-level-physics", emoji: "🔭", label: "A-Level Physics",   tag: "Mechanics · waves · electricity" },
  { id: "uni-prep",        emoji: "🎓", label: "University Prep",   tag: "UCAS · personal statement · interviews" },
  { id: "english-esl",     emoji: "🗣️", label: "English ESL",       tag: "Pronunciation · grammar · speaking circle" },
  { id: "coding-intro",    emoji: "💻", label: "Coding Intro",      tag: "Python · HTML · beginner friendly" },
];

export const UK_PROFESSOR_LEVELS = [
  "Student Teacher",
  "Graduate Teacher",
  "Qualified Teacher (QTS)",
  "Senior Teacher",
  "Head of Department",
  "Lecturer",
  "Senior Lecturer",
  "Associate Professor",
  "Professor",
] as const;

export type UKProfessorLevel = typeof UK_PROFESSOR_LEVELS[number];

export type UKTeacherApplicationForm = {
  /** Personal */
  fullName: string;
  email: string;
  /** Academic */
  university: string;
  degreeSubject: string;
  yearsOfStudy: string;
  isCurrentlyStudying: boolean;
  professorLevel: UKProfessorLevel | "";
  /** Teaching */
  subjectToTeach: string;
  yearsTeaching: string;
  availability: string;
  shortBio: string;
};

export const EMPTY_TEACHER_APPLICATION: UKTeacherApplicationForm = {
  fullName:             "",
  email:                "",
  university:           "",
  degreeSubject:        "",
  yearsOfStudy:         "",
  isCurrentlyStudying:  false,
  professorLevel:       "",
  subjectToTeach:       "",
  yearsTeaching:        "",
  availability:         "",
  shortBio:             "",
};

/** Command Center FREEZE COMING SOON · not rendered on public UK Study Hub */
export type UKTeacherGiftTier = {
  id: string;
  emoji: string;
  label: string;
  amountGbp: number;
  teacherReceivesGbp: number;
  platformCutGbp: number;
  effect: string;
};

function makeGiftTier(
  id: string,
  emoji: string,
  label: string,
  amountGbp: number,
  effect: string
): UKTeacherGiftTier {
  const platformCutGbp = parseFloat((amountGbp * (PLATFORM_GIFT_CUT_PERCENT / 100)).toFixed(2));
  const teacherReceivesGbp = parseFloat((amountGbp - platformCutGbp).toFixed(2));
  return { id, emoji, label, amountGbp, teacherReceivesGbp, platformCutGbp, effect };
}

/** Frozen money catalog · Command Center only */
export const UK_TEACHER_GIFT_TIERS: UKTeacherGiftTier[] = [
  makeGiftTier("pencil",     "✏️",  "Pencil",         1,  "Chat highlight · name flash"),
  makeGiftTier("book",       "📚",  "Book",           3,  "Book animation · name in chat"),
  makeGiftTier("graduation", "🎓",  "Graduation Cap", 5,  "Cap drop animation · crowd cheer"),
  makeGiftTier("trophy",     "🏆",  "Gold Trophy",    10, "Trophy burst · teacher shoutout"),
  makeGiftTier("rocket",     "🚀",  "Rocket",         25, "Rocket launch · full-screen flash"),
  makeGiftTier("diamond",    "💎",  "Diamond",        50, "Diamond storm · super shoutout"),
];

export type UKTeacherProfile = {
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
  totalGiftsGbp: number;
};

/** Placeholder teacher slots — replace with real DB/Firebase data */
export const UK_TEACHER_SLOTS: UKTeacherProfile[] = [
  {
    id:               "teacher-slot-1",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇬🇧",
    avatarInitials:   "+",
    bio:              "This slot is open. UK teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsGbp:    0,
  },
  {
    id:               "teacher-slot-2",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇬🇧",
    avatarInitials:   "+",
    bio:              "This slot is open. UK teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsGbp:    0,
  },
  {
    id:               "teacher-slot-3",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇬🇧",
    avatarInitials:   "+",
    bio:              "This slot is open. UK teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsGbp:    0,
  },
  {
    id:               "teacher-slot-4",
    name:             "Apply to teach",
    title:            "Your subject here",
    subject:          "Open slot",
    subjectId:        "",
    flag:             "🇬🇧",
    avatarInitials:   "+",
    bio:              "This slot is open. UK teachers apply to go live free in the Study Hub.",
    isLive:           false,
    viewers:          0,
    totalGiftsGbp:    0,
  },
];

export const ukTeacherSlotMeta = {
  kicker:       "UK Study Hub · Creator Tutor Slots · London",
  title:        "Teach Live · Free to Go Live",
  description:
    "Caribbean Freedom Arena partners with UK educators for live study sessions. " +
    "Teachers apply free · go live free · students join free. Campus lane is open for public testing — no payments on this panel.",
  hostFreeNote: "✅ Free to go live — no cost to teachers",
  giftNote:     "", // money path frozen · Command Center FREEZE COMING SOON holds gift catalog
  applyLabel:   "Apply to teach here →",
  applyHint:    "Free · no card · no payout form on public Study Hub",
} as const;

/** Owner freeze detail for Command Center FREEZE COMING SOON panel */
export const UK_STUDY_HUB_FREEZE_CATALOG = {
  panelTitle: "📚 UK Study Hub · London · campus lane",
  publicStatus: "LIVE for public · money removed",
  room: "/rooms/uk-flag-cotswolds",
  freePublic: [
    "Browse UK Study Hub campus panel",
    "4 open teacher live slots (apply placeholders)",
    "Apply to teach — Personal · Academic · Teaching only",
    "Join live session button (UI ready)",
    "GCSE · A-Level · Uni prep · ESL · coding subjects"
  ],
  frozenMoney: [
    "Student gifts (Pencil £1 → Diamond £50)",
    "Platform gift checkout / PayPal charge path",
    "Teacher payout form (card · CVC · PayPal email)",
    "Gift session totals on teacher cards",
    "Platform cut % when gifts return (catalog keeps 0% first-month plan)"
  ],
  giftTiersNote: "Gift tier table lives only in Command Center (this freeze panel + Gift ops).",
  reopenNote:
    "When ready: restore gift UI + payout step from Command Center freeze catalog; set NEXT_PUBLIC_REAL_MONEY_ENABLED=true."
} as const;
