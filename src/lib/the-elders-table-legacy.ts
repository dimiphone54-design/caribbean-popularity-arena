export type EldersTableLegacyGroup =
  | "antigua-women"
  | "gym-men"
  | "morocco-rich-men"
  | "japan-women"
  | "curvy-elder";

export type EldersTableLegacyMember = {
  id: number;
  name: string;
  age: number;
  flag: string;
  origin: string;
  group: EldersTableLegacyGroup;
  role: string;
  backgroundImage: string;
  gridColumn?: string;
};

export const eldersTableLegacyGroups: Record<
  EldersTableLegacyGroup,
  { label: string; rowLabel: string }
> = {
  "antigua-women": {
    label: "Antigua women",
    rowLabel: "🇦🇬 Antigua · 6 women"
  },
  "gym-men": {
    label: "Gym elders",
    rowLabel: "💪 Dark gym-built men · age 45"
  },
  "morocco-rich-men": {
    label: "Morocco hosts",
    rowLabel: "🇲🇦 Sugar-rich Morocco men · age 45"
  },
  "japan-women": {
    label: "Japan guests",
    rowLabel: "🇯🇵 Japan · 2 women"
  },
  "curvy-elder": {
    label: "Far seat",
    rowLabel: "👑 Curvy elder · far seat"
  }
};

const legacyImages = [
  "/cotswolds-park-feed-1.png",
  "/cotswolds-park-feed-2.png",
  "/cotswolds-park-feed-3.png",
  "/cotswolds-park-feed-4.png",
  "/cotswolds-park-feed-games-night.png",
  "/cotswolds-park-feed-uk-dish.png",
  "/cotswolds-elite-snow-indoor-1.png",
  "/cotswolds-elite-snow-indoor-2.png",
  "/cotswolds-elite-snow-indoor-3.png",
  "/cotswolds-elite-snow-indoor-4.png",
  "/cotswolds-london-park-girls-3.png",
  "/cotswolds-everyone-unified.png"
] as const;

export const eldersTableLegacyMembersClassic: EldersTableLegacyMember[] = [
  { id: 1, name: "Marlene Joseph", age: 44, flag: "🇦🇬", origin: "St. John's", group: "antigua-women", role: "Table elder", backgroundImage: legacyImages[0] },
  { id: 2, name: "Cheryl Peters", age: 41, flag: "🇦🇬", origin: "English Harbour", group: "antigua-women", role: "Story keeper", backgroundImage: legacyImages[1] },
  { id: 3, name: "Denise Samuel", age: 46, flag: "🇦🇬", origin: "Liberta", group: "antigua-women", role: "Proverb voice", backgroundImage: legacyImages[2] },
  { id: 4, name: "Gloria Williams", age: 43, flag: "🇦🇬", origin: "All Saints", group: "antigua-women", role: "Riddim anchor", backgroundImage: legacyImages[3] },
  { id: 5, name: "Sandra Lewis", age: 45, flag: "🇦🇬", origin: "Bolans", group: "antigua-women", role: "Arena memory", backgroundImage: legacyImages[4] },
  { id: 6, name: "Veronica James", age: 42, flag: "🇦🇬", origin: "Parham", group: "antigua-women", role: "Long table host", backgroundImage: legacyImages[5] },
  { id: 7, name: "Marcus Cole", age: 45, flag: "💪", origin: "Gym built", group: "gym-men", role: "Strength seat", backgroundImage: legacyImages[6], gridColumn: "1" },
  { id: 8, name: "Devon Reid", age: 45, flag: "💪", origin: "Gym built", group: "gym-men", role: "Discipline seat", backgroundImage: legacyImages[7], gridColumn: "2" },
  { id: 9, name: "Yuki Tanaka", age: 38, flag: "🇯🇵", origin: "Tokyo", group: "japan-women", role: "Guest elder", backgroundImage: legacyImages[8], gridColumn: "3" },
  { id: 10, name: "Hana Mori", age: 36, flag: "🇯🇵", origin: "Osaka", group: "japan-women", role: "Guest elder", backgroundImage: legacyImages[9], gridColumn: "4" },
  { id: 11, name: "Andre Blake", age: 45, flag: "💪", origin: "Gym built", group: "gym-men", role: "Power seat", backgroundImage: legacyImages[10], gridColumn: "5" },
  { id: 12, name: "Monique Grant", age: 47, flag: "👑", origin: "Far seat", group: "curvy-elder", role: "Curvy queen", backgroundImage: legacyImages[11], gridColumn: "6" }
];

export const eldersTableLegacyMembersMorocco: EldersTableLegacyMember[] = eldersTableLegacyMembersClassic.map((member) => {
  if (member.group !== "gym-men") {
    return member;
  }

  const moroccoNames = ["Hassan Alami", "Karim Benali", "Youssef Idrissi"];
  const moroccoIndex = member.id === 7 ? 0 : member.id === 8 ? 1 : 2;

  return {
    ...member,
    name: moroccoNames[moroccoIndex],
    flag: "🇲🇦",
    origin: "Marrakech",
    group: "morocco-rich-men",
    role: "Sugar-rich host"
  };
});

export const eldersTableLegacyPrompts = [
  {
    id: "wisdom",
    label: "Which proverb opens the table tonight?",
    answer: "Respect the chair before the crown — the elders table listens first, then answers."
  },
  {
    id: "riddim",
    label: "Old riddim or new riddim for the room?",
    answer: "Start with golden-era riddims, then let the room breathe into a modern Caribbean pulse."
  },
  {
    id: "seat",
    label: "Who holds the far seat when the table fills?",
    answer: "The curvy queen keeps the far seat — wide welcome, sharp wit, and the last word when needed."
  }
] as const;

export const eldersTableLegacyRegions =
  "Antigua · Japan · gym elders · curvy seat · long table gathering";

export const eldersTableLegacyMoroccoRegions =
  "Antigua · Japan · Morocco riad · curvy seat · long table gathering";

export const eldersTableLegacyRoomDescription =
  "The Elders Table — Antigua sisters, Japan guests, gym-built elders at forty-five, and one curvy queen holding the far seat. Wisdom, proverbs, riddims, and respect around one long arena table. Adults only.";

export const eldersTableLegacyMoroccoRoomDescription =
  "The Elders Table — Le Marrakech × Zellige. Same twelve-seat mosaic with Morocco sugar-rich hosts replacing the gym elders. Mint tea, gold tiles, and riad counsel. Adults only.";
