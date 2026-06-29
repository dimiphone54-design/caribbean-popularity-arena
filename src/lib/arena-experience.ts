import { arenaSlotRealPeoplePhotos } from "@/lib/arena-slot-real-people";

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
  portrait: {
    skin: string;
    hair: string;
    outfit: string;
    accent: string;
  };
  avatarIcon: string;
  avatarGradient: string;
  /** Real person photo · internet URL for 4K broadcast slot */
  portraitImage: string;
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

export type WaitingSlot = {
  queuePosition: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  category: string;
  quote: string;
  language: string;
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

export const tickerItems: string[] = [];

export const arenaFeaturedQuote = "We reach, and we ready to mash up de stage.";

export const arenaCreators: ArenaCreatorSlot[] = [
  {
    id: 1,
    rank: 1,
    name: "Valentina Reyes",
    age: 24,
    country: "Colombia",
    flag: "🇨🇴",
    islandCode: "CO",
    category: "Reggaeton",
    categoryIcon: "🎵",
    quote: "Yo vengo con flow y corazón desde Bogotá.",
    language: "",
    likes: 0,
    comments: 0,
    portrait: { skin: "#9b5b3c", hair: "#191016", outfit: "#fbbf24", accent: "#ef4444" },
    avatarIcon: "🎤",
    avatarGradient: "linear-gradient(160deg,#1a0a0a,#4a1515)",
    portraitImage: arenaSlotRealPeoplePhotos[1],
    votes: 102847,
    trend: "↑14%",
    progress: 95,
    isOnFire: true
  },
  {
    id: 2,
    rank: 2,
    name: "Amara Kensington",
    age: 23,
    country: "London, UK",
    flag: "🇬🇧",
    islandCode: "UK",
    category: "Fashion",
    categoryIcon: "👗",
    quote: "London energy, global stage — we live for the lights.",
    language: "English · London",
    likes: 0,
    comments: 0,
    portrait: { skin: "#d4a574", hair: "#2b1411", outfit: "#ef4444", accent: "#1f6feb" },
    avatarIcon: "👑",
    avatarGradient: "linear-gradient(160deg,#0a0e1a,#1a2040)",
    portraitImage: arenaSlotRealPeoplePhotos[2],
    votes: 92104,
    trend: "↑9%",
    progress: 82
  },
  {
    id: 3,
    rank: 3,
    name: "Gabija Kazlauskaitė",
    age: 22,
    country: "Lithuania",
    flag: "🇱🇹",
    islandCode: "LT",
    category: "Art",
    categoryIcon: "🎨",
    quote: "Vilnius šviečia — aš čia dėl visų jūsų.",
    language: "Lithuanian",
    likes: 0,
    comments: 0,
    portrait: { skin: "#e8c4a0", hair: "#d4a574", outfit: "#22c55e", accent: "#facc15" },
    avatarIcon: "🎨",
    avatarGradient: "linear-gradient(160deg,#0a1a10,#104020)",
    portraitImage: arenaSlotRealPeoplePhotos[3],
    votes: 78450,
    trend: "↑18%",
    progress: 71
  },
  {
    id: 4,
    rank: 4,
    name: "Camila Mendoza",
    age: 25,
    country: "Ecuador",
    flag: "🇪🇨",
    islandCode: "EC",
    category: "Dance",
    categoryIcon: "💃",
    quote: "Desde Quito con amor — vamos con todo.",
    language: "Ecuadorian Spanish",
    likes: 0,
    comments: 0,
    portrait: { skin: "#a66845", hair: "#2b1411", outfit: "#facc15", accent: "#ef4444" },
    avatarIcon: "💃",
    avatarGradient: "linear-gradient(160deg,#1a100a,#402510)",
    portraitImage: arenaSlotRealPeoplePhotos[4],
    votes: 65820,
    trend: "↑11%",
    progress: 63
  },
  {
    id: 5,
    rank: 5,
    name: "Nadia Baptiste",
    age: 24,
    country: "Trinidad & Tobago",
    flag: "🇹🇹",
    islandCode: "TT",
    category: "Soca",
    categoryIcon: "🎵",
    quote: "We reach, and we ready to mash up de stage.",
    language: "Trini Creole",
    likes: 0,
    comments: 0,
    portrait: { skin: "#9b5b3c", hair: "#191016", outfit: "#f5c842", accent: "#ff5c2b" },
    avatarIcon: "👑",
    avatarGradient: "linear-gradient(160deg,#1a0f3d,#2d1665)",
    portraitImage: arenaSlotRealPeoplePhotos[5],
    votes: 58110,
    trend: "↑12%",
    progress: 58
  },
  {
    id: 6,
    rank: 6,
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
    portrait: { skin: "#7a432d", hair: "#120b0b", outfit: "#00c853", accent: "#f5c842" },
    avatarIcon: "🎤",
    avatarGradient: "linear-gradient(160deg,#0a2010,#1a5020)",
    portraitImage: arenaSlotRealPeoplePhotos[6],
    votes: 51204,
    trend: "↑8%",
    progress: 52
  },
  {
    id: 7,
    rank: 7,
    name: "Isabella Márquez",
    age: 23,
    country: "Venezuela",
    flag: "🇻🇪",
    islandCode: "VE",
    category: "Music",
    categoryIcon: "🎶",
    quote: "Desde Caracas — mi gente, vamos con alegría.",
    language: "Venezuelan Spanish",
    likes: 0,
    comments: 0,
    portrait: { skin: "#b16e4a", hair: "#1d0f0d", outfit: "#fbbf24", accent: "#ef4444" },
    avatarIcon: "🎶",
    avatarGradient: "linear-gradient(160deg,#2e0a0a,#6b1515)",
    portraitImage: arenaSlotRealPeoplePhotos[7],
    votes: 44780,
    trend: "↑15%",
    progress: 46
  },
  {
    id: 8,
    rank: 8,
    name: "Zofia Nowak",
    age: 21,
    country: "Poland",
    flag: "🇵🇱",
    islandCode: "PL",
    category: "Fashion",
    categoryIcon: "👗",
    quote: "Warszawa świeci — jestem tu dla was.",
    language: "Polish",
    likes: 0,
    comments: 0,
    portrait: { skin: "#e8c4a0", hair: "#25120f", outfit: "#dc2626", accent: "#f5c842" },
    avatarIcon: "👗",
    avatarGradient: "linear-gradient(160deg,#1a0e2e,#3d1a60)",
    portraitImage: arenaSlotRealPeoplePhotos[8],
    votes: 38492,
    trend: "↑6%",
    progress: 40
  },
  {
    id: 9,
    rank: 9,
    name: "Amira Benali",
    age: 26,
    country: "Tunisia",
    flag: "🇹🇳",
    islandCode: "TN",
    category: "Culture",
    categoryIcon: "🕌",
    quote: "من تونس بالحب — نحن هنا للتألق.",
    language: "Arabic · French",
    likes: 0,
    comments: 0,
    portrait: { skin: "#8d5036", hair: "#160d0b", outfit: "#c084fc", accent: "#f5c842" },
    avatarIcon: "✨",
    avatarGradient: "linear-gradient(160deg,#1a0e2e,#3d1a60)",
    portraitImage: arenaSlotRealPeoplePhotos[9],
    votes: 31920,
    trend: "↑22%",
    trendTone: "hot",
    progress: 34
  },
  {
    id: 10,
    rank: 10,
    name: "Priya Ramkissoon",
    age: 23,
    country: "Guyana",
    flag: "🇬🇾",
    islandCode: "GY",
    category: "Comedy",
    categoryIcon: "😂",
    quote: "Me nah backing down; dis crown is we own.",
    language: "",
    likes: 0,
    comments: 0,
    portrait: { skin: "#8d5036", hair: "#160d0b", outfit: "#e83030", accent: "#00c9a7" },
    avatarIcon: "🎭",
    avatarGradient: "linear-gradient(160deg,#0a1e2e,#103050)",
    portraitImage: arenaSlotRealPeoplePhotos[10],
    votes: 27481,
    trend: "↓3%",
    trendTone: "down",
    progress: 28
  },
  {
    id: 11,
    rank: 11,
    name: "Mei Lin Zhang",
    age: 24,
    country: "China",
    flag: "🇨🇳",
    islandCode: "CN",
    category: "Content",
    categoryIcon: "🎬",
    quote: "从上海到世界 — 我们准备好了。",
    language: "Mandarin Chinese",
    likes: 0,
    comments: 0,
    portrait: { skin: "#e8c4a0", hair: "#1a0e0c", outfit: "#ef4444", accent: "#fbbf24" },
    avatarIcon: "🎬",
    avatarGradient: "linear-gradient(160deg,#1a0208,#4a0818)",
    portraitImage: arenaSlotRealPeoplePhotos[11],
    votes: 21567,
    trend: "↑19%",
    progress: 22
  },
  {
    id: 12,
    rank: 12,
    name: "Yuki Tanaka",
    age: 22,
    country: "Japan",
    flag: "🇯🇵",
    islandCode: "JP",
    category: "Lifestyle",
    categoryIcon: "🌸",
    quote: "東京から — ファンの皆さん、一緒に輝こう。",
    language: "Japanese",
    likes: 0,
    comments: 0,
    portrait: { skin: "#e8c4a0", hair: "#0f0908", outfit: "#f472b6", accent: "#ef4444" },
    avatarIcon: "🌸",
    avatarGradient: "linear-gradient(160deg,#1a0818,#402040)",
    portraitImage: arenaSlotRealPeoplePhotos[12],
    votes: 18441,
    trend: "↑26% 🔥",
    trendTone: "hot",
    progress: 16
  }
];

export const boostPacks: BoostPack[] = [
  { votes: 50, price: 0, label: "Quick spark", icon: "🔥" },
  { votes: 200, price: 0, label: "Fire burst", icon: "🔥🔥" },
  { votes: 500, price: 0, label: "Inferno blast", icon: "🔥🔥🔥" },
  { votes: 2000, price: 0, label: "Total domination", icon: "💥 NUKE" }
];

export const waitingSlots: WaitingSlot[] = [
  {
    queuePosition: 1,
    name: "Valentina Cruz",
    age: 24,
    country: "Puerto Rico",
    flag: "🇵🇷",
    category: "Dance",
    quote: "Boricua fire, corazón primero.",
    language: "Puerto Rican Spanish"
  },
  {
    queuePosition: 2,
    name: "Camila Reyes",
    age: 23,
    country: "Dominican Republic",
    flag: "🇩🇴",
    category: "Music",
    quote: "Yo vengo con flow y corazón.",
    language: "Dominican Spanish"
  },
  {
    queuePosition: 3,
    name: "Marisol Vega",
    age: 25,
    country: "Cuba",
    flag: "🇨🇺",
    category: "Lifestyle",
    quote: "Mi gente, vamos con alegría.",
    language: "Cuban Spanish"
  },
  {
    queuePosition: 4,
    name: "Anaya Pierre",
    age: 22,
    country: "Haiti",
    flag: "🇭🇹",
    category: "Fashion",
    quote: "Mwen la pou klere ak fòs.",
    language: "Haitian Creole"
  },
  {
    queuePosition: 5,
    name: "Kaya Rolle",
    age: 21,
    country: "Bahamas",
    flag: "🇧🇸",
    category: "Beauty",
    quote: "Big island glow, straight from Nassau.",
    language: "Bahamian Creole"
  },
  {
    queuePosition: 6,
    name: "Isabella Maduro",
    age: 24,
    country: "Aruba",
    flag: "🇦🇼",
    category: "Travel",
    quote: "Mi ta bria cu amor di isla.",
    language: "Papiamento"
  },
  {
    queuePosition: 7,
    name: "Sofia Martina",
    age: 26,
    country: "Curacao",
    flag: "🇨🇼",
    category: "Art",
    quote: "Nos kultura ta subi den lus.",
    language: "Papiamentu"
  },
  {
    queuePosition: 8,
    name: "Brielle Bean",
    age: 23,
    country: "Bermuda",
    flag: "🇧🇲",
    category: "Content",
    quote: "Bermy style, calm waves, big dreams.",
    language: "Bermudian English"
  },
  {
    queuePosition: 9,
    name: "Alana Ebanks",
    age: 22,
    country: "Cayman Islands",
    flag: "🇰🇾",
    category: "Food",
    quote: "Cayman flavor with a champion heart.",
    language: "Caymanian English"
  },
  {
    queuePosition: 10,
    name: "Sienna Missick",
    age: 25,
    country: "Turks & Caicos",
    flag: "🇹🇨",
    category: "Photo",
    quote: "Blue water, bold spirit, full grace.",
    language: "TCI English"
  },
  {
    queuePosition: 11,
    name: "Jasmine Hodge",
    age: 24,
    country: "British Virgin Islands",
    flag: "🇻🇬",
    category: "Sailing",
    quote: "BVI breeze, but I moving strong.",
    language: "BVI English"
  },
  {
    queuePosition: 12,
    name: "Leah Francis",
    age: 23,
    country: "U.S. Virgin Islands",
    flag: "🇻🇮",
    category: "Culture",
    quote: "VI pride, all heart, all shine.",
    language: "Virgin Islands English"
  }
];

export const legalBotConfig = {
  mode: "Legal placeholder",
  fakeApiKey: "fake_caribbean_slots_bot_key",
  fakeWebhookSecret: "fake_caribbean_slots_webhook_secret",
  rotationInterval: "12 hours",
  frontSlots: 12,
  waitingSlots: 12
} as const;
