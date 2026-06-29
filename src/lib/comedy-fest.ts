type ComedyPortrait = {
  skin: string;
  hair: string;
  outfit: string;
  accent: string;
};

export type ComedyFestPlayer = {
  id: number;
  name: string;
  age: number;
  country: string;
  flag: string;
  game: string;
  portrait: ComedyPortrait;
  avatarIcon: string;
  avatarGradient: string;
};

export const comedyFestGames: ComedyFestPlayer[] = [
  {
    id: 1,
    name: "Nadia Baptiste",
    age: 24,
    country: "Trinidad & Tobago",
    flag: "🇹🇹",
    game: "Laugh Battle",
    portrait: { skin: "#9b5b3c", hair: "#191016", outfit: "#f5c842", accent: "#ff5c2b" },
    avatarIcon: "😂",
    avatarGradient: "linear-gradient(160deg,#1a0f3d,#2d1665)"
  },
  {
    id: 2,
    name: "Priya Ramkissoon",
    age: 23,
    country: "Guyana",
    flag: "🇬🇾",
    game: "Character Charades",
    portrait: { skin: "#8d5036", hair: "#160d0b", outfit: "#e83030", accent: "#00c9a7" },
    avatarIcon: "🎭",
    avatarGradient: "linear-gradient(160deg,#0a1e2e,#103050)"
  },
  {
    id: 3,
    name: "Kaya Rolle",
    age: 21,
    country: "Bahamas",
    flag: "🇧🇸",
    game: "Joke Swap Circle",
    portrait: { skin: "#a66845", hair: "#1a100c", outfit: "#00bcd4", accent: "#f5c842" },
    avatarIcon: "🌊",
    avatarGradient: "linear-gradient(160deg,#0a2030,#104868)"
  },
  {
    id: 4,
    name: "Sienna Missick",
    age: 25,
    country: "Turks & Caicos",
    flag: "🇹🇨",
    game: "Punchline Race",
    portrait: { skin: "#b16e4a", hair: "#201510", outfit: "#38bdf8", accent: "#f5c842" },
    avatarIcon: "📸",
    avatarGradient: "linear-gradient(160deg,#0a1828,#123456)"
  },
  {
    id: 5,
    name: "Anaya Pierre",
    age: 22,
    country: "Haiti",
    flag: "🇭🇹",
    game: "Story Roast",
    portrait: { skin: "#6f3d2b", hair: "#100808", outfit: "#dc2626", accent: "#f5c842" },
    avatarIcon: "✨",
    avatarGradient: "linear-gradient(160deg,#1a0a0a,#401010)"
  },
  {
    id: 6,
    name: "Liana Fernandez",
    age: 23,
    country: "Suriname",
    flag: "🇸🇷",
    game: "Accent Challenge",
    portrait: { skin: "#7b4630", hair: "#0f0908", outfit: "#f5c842", accent: "#15803d" },
    avatarIcon: "🌿",
    avatarGradient: "linear-gradient(160deg,#10180a,#253510)"
  },
  {
    id: 7,
    name: "Aaliyah Brooks",
    age: 22,
    country: "United Kingdom",
    flag: "🇬🇧",
    game: "Meme Reenact",
    portrait: { skin: "#8f5639", hair: "#1a0e0c", outfit: "#7c3aed", accent: "#f5c842" },
    avatarIcon: "👑",
    avatarGradient: "linear-gradient(160deg,#120a1e,#2a1050)"
  },
  {
    id: 8,
    name: "Zara Mitchell",
    age: 24,
    country: "United Kingdom",
    flag: "🇬🇧",
    game: "Family Joke Relay",
    portrait: { skin: "#9f6040", hair: "#20100d", outfit: "#ec4899", accent: "#3b82f6" },
    avatarIcon: "💋",
    avatarGradient: "linear-gradient(160deg,#1a1020,#3a1848)"
  },
  {
    id: 9,
    name: "Imani Clarke",
    age: 20,
    country: "United Kingdom",
    flag: "🇬🇧",
    game: "Bad Day Spin",
    portrait: { skin: "#7a432d", hair: "#120b0b", outfit: "#2563eb", accent: "#ff5c2b" },
    avatarIcon: "🎤",
    avatarGradient: "linear-gradient(160deg,#0a1420,#152840)"
  },
  {
    id: 10,
    name: "Sienna Graham",
    age: 23,
    country: "United Kingdom",
    flag: "🇬🇧",
    game: "Character Showdown",
    portrait: { skin: "#b77752", hair: "#25120f", outfit: "#059669", accent: "#f5c842" },
    avatarIcon: "🎬",
    avatarGradient: "linear-gradient(160deg,#0a1810,#143820)"
  }
];

export const comedyFestRegions =
  "Guyana · Trinidad · Bahamas · Turks & Caicos · Haiti · Suriname · UK";

export const comedyMenPrompts = [
  {
    id: "characters-laugh",
    label: "Do you want to play characters and laugh loud?"
  },
  {
    id: "funny-joke",
    label: "Let's talk our funnys joke"
  },
  {
    id: "worst-thing",
    label: "What's the worst thing ever happen in your life?"
  },
  {
    id: "embarrassing-island",
    label: "What's your most embarrassing island moment?"
  },
  {
    id: "grandma-said",
    label: "Tell us the funniest thing your grandmother ever said"
  },
  {
    id: "roast-yourself",
    label: "Can you roast yourself for 30 seconds straight?"
  },
  {
    id: "crazy-for-laugh",
    label: "What's the craziest thing you did just to make someone laugh?"
  }
] as const;

export type ComedyMenPromptId = (typeof comedyMenPrompts)[number]["id"];

export const comedyPromptResponses: Record<ComedyMenPromptId, string> = {
  "characters-laugh":
    "Pick a character — auntie, pastor, taxi man, or carnival queen — and let the room vote who had the loudest laugh.",
  "funny-joke":
    "Drop one clean joke, one wild joke, and one island joke. The women score you on timing and delivery.",
  "worst-thing":
    "Share the story, then flip it with a punchline. Comedy Fest turns pain into punchlines — keep it real, keep it respectful.",
  "embarrassing-island":
    "Beach fail, carnival fail, or family WhatsApp fail — tell it short and let the room react live.",
  "grandma-said":
    "Repeat the line in her voice. Bonus points if the whole backdrop crew cracks up.",
  "roast-yourself":
    "Thirty seconds on the clock. Roast your driving, your cooking, or your dance moves — no mercy on yourself.",
  "crazy-for-laugh":
    "Confess the stunt, the prank, or the voice note that had the whole block screaming."
};
