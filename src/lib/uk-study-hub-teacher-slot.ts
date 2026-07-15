/**
 * UK Study Hub · Teacher Live Slot config
 * First month: platform takes 0% — teacher keeps 100% of all gifts.
 */

export const PLATFORM_GIFT_CUT_PERCENT = 0;   // first month · free
export const TEACHER_GIFT_PAYOUT_PERCENT = 100; // teacher keeps everything

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
  /** Payment — card to receive gifts */
  cardholderName: string;
  cardNumber: string;       // masked on submission, stored via payment processor
  cardExpiry: string;
  cardCvc: string;
  payoutEmail: string;      // email tied to payout (Stripe Connect / PayPal)
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
  cardholderName:       "",
  cardNumber:           "",
  cardExpiry:           "",
  cardCvc:              "",
  payoutEmail:          "",
};

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
  kicker:       "UK Study Hub · Creator Tutor Slots",
  title:        "Teach Live · Free to Go Live",
  description:
    "Caribbean Freedom Arena partners with qualified UK educators to deliver live study sessions " +
    "directly to students. Teachers broadcast at no cost. Student gifts are processed through platform checkout and teacher payouts are handled by the platform.",
  hostFreeNote: "✅ Free to go live — no cost to teachers",
  giftNote:     "🎁 Student gifts use platform checkout and approved teacher payouts are handled by the platform",
  applyLabel:   "Apply to teach here →",
  applyHint:    "Fill in your profile and payout details. We review and add you to the hub.",
} as const;
