export type IslandTab = {
  label: string;
  flag: string;
};

export type ArenaCreatorSlot = {
  id: number;
  rank: number;
  name: string;
  flag: string;
  islandCode: string;
  category: string;
  categoryIcon: string;
  avatarIcon: string;
  avatarGradient: string;
  votes: number;
  trend: string;
  trendTone?: "up" | "down" | "hot";
  progress: number;
  isOnFire?: boolean;
};

export type BoostPack = {
  votes: number;
  price: number;
  label: string;
  icon: string;
};

export const islandTabs: IslandTab[] = [
  { label: "All Islands", flag: "🌴" },
  { label: "Trinidad & Tobago", flag: "🇹🇹" },
  { label: "Jamaica", flag: "🇯🇲" },
  { label: "Barbados", flag: "🇧🇧" },
  { label: "Guyana", flag: "🇬🇾" },
  { label: "St. Lucia", flag: "🇱🇨" },
  { label: "Grenada", flag: "🇬🇩" },
  { label: "St. Vincent", flag: "🇻🇨" },
  { label: "Antigua", flag: "🇦🇬" },
  { label: "Dominica", flag: "🇩🇲" },
  { label: "St. Kitts", flag: "🇰🇳" },
  { label: "Belize", flag: "🇧🇿" },
  { label: "Suriname", flag: "🇸🇷" }
];

export const tickerItems = [
  "🔥 Soca Monarch 2026 — voting open now",
  "⚡ Nadia Baptiste just got fired up — +500 votes",
  "🇯🇲 Jamaica Top 10 — updated hourly",
  "🔥 Shanelle Thomas rising fast — up 34% today",
  "🎵 Music category — 2,847 new votes this hour",
  "💥 Boss Battle ends soon — who is claiming the throne?"
];

export const arenaCreators: ArenaCreatorSlot[] = [
  {
    id: 1,
    rank: 1,
    name: "Nadia Baptiste",
    flag: "🇹🇹",
    islandCode: "T&T",
    category: "Soca",
    categoryIcon: "🎵",
    avatarIcon: "👑",
    avatarGradient: "linear-gradient(160deg,#1a0f3d,#2d1665)",
    votes: 102847,
    trend: "↑12%",
    progress: 95,
    isOnFire: true
  },
  {
    id: 2,
    rank: 2,
    name: "Kezia Clarke",
    flag: "🇯🇲",
    islandCode: "JM",
    category: "Dancehall",
    categoryIcon: "🎵",
    avatarIcon: "🎤",
    avatarGradient: "linear-gradient(160deg,#0a2010,#1a5020)",
    votes: 84201,
    trend: "↑8%",
    progress: 78
  },
  {
    id: 3,
    rank: 3,
    name: "Alicia Greaves",
    flag: "🇧🇧",
    islandCode: "BB",
    category: "Carnival",
    categoryIcon: "💃",
    avatarIcon: "🌺",
    avatarGradient: "linear-gradient(160deg,#2e0a0a,#6b1515)",
    votes: 71504,
    trend: "↑21%",
    progress: 66
  },
  {
    id: 4,
    rank: 4,
    name: "Priya Ramkissoon",
    flag: "🇬🇾",
    islandCode: "GY",
    category: "Comedy",
    categoryIcon: "😂",
    avatarIcon: "🎭",
    avatarGradient: "linear-gradient(160deg,#0a1e2e,#103050)",
    votes: 58110,
    trend: "↓3%",
    trendTone: "down",
    progress: 54
  },
  {
    id: 5,
    rank: 5,
    name: "Monique Joseph",
    flag: "🇱🇨",
    islandCode: "LC",
    category: "Fashion",
    categoryIcon: "👗",
    avatarIcon: "👗",
    avatarGradient: "linear-gradient(160deg,#1a0e2e,#3d1a60)",
    votes: 44892,
    trend: "↑5%",
    progress: 42
  },
  {
    id: 6,
    rank: 6,
    name: "Shanelle Thomas",
    flag: "🇬🇩",
    islandCode: "GD",
    category: "Photo",
    categoryIcon: "📸",
    avatarIcon: "📸",
    avatarGradient: "linear-gradient(160deg,#0e2010,#1e4020)",
    votes: 39045,
    trend: "↑34% 🔥",
    trendTone: "hot",
    progress: 36
  },
  {
    id: 7,
    rank: 7,
    name: "Rielle Providence",
    flag: "🇻🇨",
    islandCode: "VC",
    category: "Art",
    categoryIcon: "🎨",
    avatarIcon: "🎨",
    avatarGradient: "linear-gradient(160deg,#1e1a0a,#4a3a10)",
    votes: 31720,
    trend: "↑11%",
    progress: 29
  },
  {
    id: 8,
    rank: 8,
    name: "Tamara John",
    flag: "🇦🇬",
    islandCode: "AG",
    category: "Beauty",
    categoryIcon: "💄",
    avatarIcon: "💄",
    avatarGradient: "linear-gradient(160deg,#10101e,#252050)",
    votes: 27481,
    trend: "↑7%",
    progress: 25
  },
  {
    id: 9,
    rank: 9,
    name: "Cherisse Larocque",
    flag: "🇩🇲",
    islandCode: "DM",
    category: "Food",
    categoryIcon: "🍽️",
    avatarIcon: "🍽️",
    avatarGradient: "linear-gradient(160deg,#0a1a10,#104020)",
    votes: 22914,
    trend: "↑19%",
    progress: 21
  },
  {
    id: 10,
    rank: 10,
    name: "Destiny Warner",
    flag: "🇰🇳",
    islandCode: "KN",
    category: "Sports",
    categoryIcon: "⚽",
    avatarIcon: "⚽",
    avatarGradient: "linear-gradient(160deg,#1a100a,#402510)",
    votes: 18302,
    trend: "↑4%",
    progress: 17
  },
  {
    id: 11,
    rank: 11,
    name: "Amara Vasquez",
    flag: "🇧🇿",
    islandCode: "BZ",
    category: "Content",
    categoryIcon: "🎬",
    avatarIcon: "🎬",
    avatarGradient: "linear-gradient(160deg,#0a0e1a,#151a35)",
    votes: 14567,
    trend: "↑2%",
    progress: 13
  },
  {
    id: 12,
    rank: 12,
    name: "Liana Fernandez",
    flag: "🇸🇷",
    islandCode: "SR",
    category: "Lifestyle",
    categoryIcon: "🌿",
    avatarIcon: "🌿",
    avatarGradient: "linear-gradient(160deg,#10180a,#253510)",
    votes: 9841,
    trend: "↑26% 🔥",
    trendTone: "hot",
    progress: 9
  }
];

export const boostPacks: BoostPack[] = [
  { votes: 50, price: 3, label: "Quick spark", icon: "🔥" },
  { votes: 200, price: 9, label: "Fire burst", icon: "🔥🔥" },
  { votes: 500, price: 18, label: "Inferno blast", icon: "🔥🔥🔥" },
  { votes: 2000, price: 60, label: "Total domination", icon: "💥 NUKE" }
];
