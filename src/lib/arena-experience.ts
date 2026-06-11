export type IslandTab = {
  label: string;
  flag: string;
};

export type ArenaCreatorSlot = {
  id: number;
  rank: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  islandCode: string;
  category: string;
  categoryIcon: string;
  quote: string;
  language: string;
  likes: number;
  comments: number;
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
  { label: "Suriname", flag: "🇸🇷" },
  { label: "Bahamas", flag: "🇧🇸" },
  { label: "Cuba", flag: "🇨🇺" },
  { label: "Dominican Republic", flag: "🇩🇴" },
  { label: "Haiti", flag: "🇭🇹" },
  { label: "Puerto Rico", flag: "🇵🇷" },
  { label: "Aruba", flag: "🇦🇼" },
  { label: "Curacao", flag: "🇨🇼" },
  { label: "Bermuda", flag: "🇧🇲" },
  { label: "Cayman Islands", flag: "🇰🇾" },
  { label: "Turks & Caicos", flag: "🇹🇨" },
  { label: "British Virgin Islands", flag: "🇻🇬" },
  { label: "U.S. Virgin Islands", flag: "🇻🇮" },
  { label: "Anguilla", flag: "🇦🇮" },
  { label: "Montserrat", flag: "🇲🇸" },
  { label: "Guadeloupe", flag: "🇬🇵" },
  { label: "Martinique", flag: "🇲🇶" },
  { label: "Saint Martin", flag: "🇲🇫" },
  { label: "Sint Maarten", flag: "🇸🇽" },
  { label: "Saint Barthelemy", flag: "🇧🇱" },
  { label: "Bonaire", flag: "🇧🇶" },
  { label: "Saba", flag: "🇧🇶" },
  { label: "Sint Eustatius", flag: "🇧🇶" }
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
    age: 24,
    country: "Trinidad & Tobago",
    flag: "🇹🇹",
    islandCode: "T&T",
    category: "Soca",
    categoryIcon: "🎵",
    quote: "We reach, and we ready to mash up de stage.",
    language: "Trini Creole",
    likes: 0,
    comments: 0,
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
    age: 22,
    country: "Jamaica",
    flag: "🇯🇲",
    islandCode: "JM",
    category: "Dancehall",
    categoryIcon: "🎵",
    quote: "Mi deh yah fi shine bright every day.",
    language: "Jamaican Patois",
    likes: 0,
    comments: 0,
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
    age: 25,
    country: "Barbados",
    flag: "🇧🇧",
    islandCode: "BB",
    category: "Carnival",
    categoryIcon: "💃",
    quote: "Wuhloss, I gine bring de whole island wid me.",
    language: "Bajan",
    likes: 0,
    comments: 0,
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
    age: 23,
    country: "Guyana",
    flag: "🇬🇾",
    islandCode: "GY",
    category: "Comedy",
    categoryIcon: "😂",
    quote: "Me nah backing down; dis crown is we own.",
    language: "Guyanese Creolese",
    likes: 0,
    comments: 0,
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
    age: 21,
    country: "Saint Lucia",
    flag: "🇱🇨",
    islandCode: "LC",
    category: "Fashion",
    categoryIcon: "👗",
    quote: "Nou ka leve ansanm, with love and style.",
    language: "Saint Lucian Kweyol",
    likes: 0,
    comments: 0,
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
    age: 26,
    country: "Grenada",
    flag: "🇬🇩",
    islandCode: "GD",
    category: "Photo",
    categoryIcon: "📸",
    quote: "Ah bringing pure spice and heart to de arena.",
    language: "Grenadian Creole",
    likes: 0,
    comments: 0,
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
    age: 20,
    country: "St. Vincent",
    flag: "🇻🇨",
    islandCode: "VC",
    category: "Art",
    categoryIcon: "🎨",
    quote: "Vincy love does lift me higher every round.",
    language: "Vincentian Creole",
    likes: 0,
    comments: 0,
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
    age: 24,
    country: "Antigua",
    flag: "🇦🇬",
    islandCode: "AG",
    category: "Beauty",
    categoryIcon: "💄",
    quote: "Me nah play small; Antigua energy loud.",
    language: "Antiguan Creole",
    likes: 0,
    comments: 0,
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
    age: 27,
    country: "Dominica",
    flag: "🇩🇲",
    islandCode: "DM",
    category: "Food",
    categoryIcon: "🍽️",
    quote: "Mwen ka klere pou Dominica.",
    language: "Dominican Kweyol",
    likes: 0,
    comments: 0,
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
    age: 22,
    country: "St. Kitts",
    flag: "🇰🇳",
    islandCode: "KN",
    category: "Sports",
    categoryIcon: "⚽",
    quote: "Sugar City spirit, we moving strong.",
    language: "Kittitian Creole",
    likes: 0,
    comments: 0,
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
    age: 25,
    country: "Belize",
    flag: "🇧🇿",
    islandCode: "BZ",
    category: "Content",
    categoryIcon: "🎬",
    quote: "Dis da fi we moment, bright and bold.",
    language: "Belizean Kriol",
    likes: 0,
    comments: 0,
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
    age: 23,
    country: "Suriname",
    flag: "🇸🇷",
    islandCode: "SR",
    category: "Lifestyle",
    categoryIcon: "🌿",
    quote: "Mi e lobi den fans, wi e wini tide.",
    language: "Sranan Tongo",
    likes: 0,
    comments: 0,
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
