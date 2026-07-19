/**
 * Japan Study Hub · Teacher Live Slot config
 * Public = free campus (apply · teach · join). Gift ¥ catalog → Command Center FREEZE COMING SOON.
 */

/** Command Center freeze catalog only — not public UI */
export const PLATFORM_GIFT_CUT_PERCENT = 0;
export const TEACHER_GIFT_PAYOUT_PERCENT = 100;

export type JapanTeacherSubject = {
  id: string;
  emoji: string;
  label: string;
  tag: string;
};

export const JAPAN_TEACHER_SUBJECTS: JapanTeacherSubject[] = [
  { id: "jlpt-n5",     emoji: "🟢", label: "JLPT N5",     tag: "ひらがな · カタカナ · 基本漢字" },
  { id: "jlpt-n4",     emoji: "🔵", label: "JLPT N4",     tag: "基礎文法 · 漢字 · 読解" },
  { id: "jlpt-n3",     emoji: "🟡", label: "JLPT N3",     tag: "中級文法 · 漢字 · 聴解" },
  { id: "jlpt-n2",     emoji: "🟠", label: "JLPT N2",     tag: "上級文法 · 新聞読解" },
  { id: "jlpt-n1",     emoji: "🔴", label: "JLPT N1",     tag: "ビジネス日本語 · 学術文章" },
  { id: "hiragana",    emoji: "あ", label: "ひらがな",     tag: "読み · 書き · 筆順" },
  { id: "katakana",    emoji: "ア", label: "カタカナ",     tag: "読み · 書き · 外来語" },
  { id: "kanji",       emoji: "漢", label: "漢字",         tag: "筆順 · 読み · 部首" },
  { id: "conversation", emoji: "💬", label: "会話",         tag: "スピーキング · 日常対話" },
  { id: "anime-jp",    emoji: "🎌", label: "アニメ日本語", tag: "ポップカルチャー語彙 · スラング · 名台詞" },
];

export const JAPAN_TEACHER_LEVELS = [
  "JLPT N5",
  "JLPT N4",
  "JLPT N3",
  "JLPT N2",
  "JLPT N1",
  "ネイティブスピーカー",
  "認定講師",
  "大学講師",
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
    name:             "講師応募",
    title:            "担当科目をここに",
    subject:          "オープンスロット",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "この枠は空いています。日本人の先生は学習ハブで無料でライブ配信に応募できます。",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
  {
    id:               "japan-slot-2",
    name:             "講師応募",
    title:            "担当科目をここに",
    subject:          "オープンスロット",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "この枠は空いています。日本人の先生は学習ハブで無料でライブ配信に応募できます。",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
  {
    id:               "japan-slot-3",
    name:             "講師応募",
    title:            "担当科目をここに",
    subject:          "オープンスロット",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "この枠は空いています。日本人の先生は学習ハブで無料でライブ配信に応募できます。",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
  {
    id:               "japan-slot-4",
    name:             "講師応募",
    title:            "担当科目をここに",
    subject:          "オープンスロット",
    subjectId:        "",
    flag:             "🇯🇵",
    avatarInitials:   "+",
    bio:              "この枠は空いています。日本人の先生は学習ハブで無料でライブ配信に応募できます。",
    isLive:           false,
    viewers:          0,
    totalGiftsYen:    0,
  },
];

export const japanTeacherSlotMeta = {
  kicker:       "日本学習ハブ · 講師ライブ枠 · 東京",
  title:        "ライブ授業 · 無料で配信開始",
  description:
    "Caribbean Freedom Arena は日本人教育者とライブ学習セッションで提携しています。" +
    "講師は無料応募 · 無料配信 · 生徒も無料参加。この公開キャンパスレーンではお支払いはありません。",
  hostFreeNote: "✅ 無料で配信開始 — 講師費用なし",
  giftNote:     "",
  applyLabel:   "ここで講師応募 →",
  applyHint:    "無料 · カード不要 · 公開学習ハブに振込フォームなし",
} as const;

/** Owner freeze detail · FREEZE COMING SOON */
export const JAPAN_STUDY_HUB_FREEZE_CATALOG = {
  panelTitle: "🇯🇵 Japan Study Hub · teacher live · gifts",
  publicStatus: "LIVE free campus · money removed",
  room: "/rooms/japan-room · Study Hub",
  freePublic: [
    "JLPT / conversation teacher slots · free apply",
    "Personal · Academic · Teaching form only",
    "Free go-live · free join session UI"
  ],
  frozenMoney: [
    "Student gifts Fude-pen ¥100 → Dragon ¥10,000",
    "Platform gift checkout / payout forms",
    "Gift session totals on teacher cards"
  ],
  reopenNote: "Restore gift UI + payout step when NEXT_PUBLIC_REAL_MONEY_ENABLED=true."
} as const;
