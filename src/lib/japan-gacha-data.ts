export type GachaRarity = "common" | "uncommon" | "rare" | "super-rare" | "legendary";

export type GachaItem = {
  id: string;
  name: string;
  emoji: string;
  rarity: GachaRarity;
  description: string;
};

export type GachaRarityConfig = {
  label: string;
  color: string;
  glow: string;
  dropRate: number;
  pullCost: number;
};

export const GACHA_RARITIES: Record<GachaRarity, GachaRarityConfig> = {
  common: {
    label: "Common",
    color: "#94a3b8",
    glow: "rgba(148, 163, 184, 0.3)",
    dropRate: 0.50,
    pullCost: 100,
  },
  uncommon: {
    label: "Uncommon",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.3)",
    dropRate: 0.25,
    pullCost: 100,
  },
  rare: {
    label: "Rare",
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.3)",
    dropRate: 0.15,
    pullCost: 100,
  },
  "super-rare": {
    label: "Super Rare",
    color: "#c084fc",
    glow: "rgba(192, 132, 252, 0.4)",
    dropRate: 0.08,
    pullCost: 100,
  },
  legendary: {
    label: "Legendary",
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.5)",
    dropRate: 0.02,
    pullCost: 100,
  },
};

export const GACHA_ITEMS: GachaItem[] = [
  // Common (8 items) — 50%
  { id: "g-sakura-eraser", name: "Sakura Eraser Set", emoji: "🌸", rarity: "common", description: "Cherry blossom scented erasers · 3-pack" },
  { id: "g-maneki-neko-mini", name: "Maneki-neko Mini", emoji: "🐱", rarity: "common", description: "Lucky招き猫 desk figurine · 5cm" },
  { id: "g-matcha-sticker", name: "Matcha Sticker Sheet", emoji: "🍵", rarity: "common", description: "Green tea themed stickers · 12pcs" },
  { id: "g-tape-roll", name: "Washi Tape Roll", emoji: "🎀", rarity: "common", description: "Patterned masking tape · 15mm" },
  { id: "g-pencil-topper", name: "Kawaii Pencil Topper", emoji: "✏️", rarity: "common", description: "Animal character pencil cap · random" },
  { id: "g-origami-paper", name: "Origami Paper Pack", emoji: "🦢", rarity: "common", description: "Traditional patterns · 20 sheets" },
  { id: "g-magnet-cat", name: "Neko Fridge Magnet", emoji: "🧲", rarity: "common", description: "Cat pose magnet · resin" },
  { id: "g-bookmark-sakura", name: "Sakura Bookmark", emoji: "📖", rarity: "common", description: "Metal cherry blossom bookmark" },

  // Uncommon (6 items) — 25%
  { id: "g-ramen-pin", name: "Ramen Pin Badge", emoji: "🍜", rarity: "uncommon", description: " enamel ramen bowl pin · Japan exclusive" },
  { id: "g-washi-set", name: "Kawaii Washi Tape Set", emoji: "🎨", rarity: "uncommon", description: "5-roll decorative tape set" },
  { id: "g-keychain-totoro", name: "Forest Spirit Keychain", emoji: "🌿", rarity: "uncommon", description: "Glow-in-the-dark keychain" },
  { id: "g-tenugui-cloth", name: "Tenugui Hand Towel", emoji: "🧣", rarity: "uncommon", description: "Traditional printed cotton cloth" },
  { id: "g-chopstick-set", name: "Bamboo Chopstick Set", emoji: "🥢", rarity: "uncommon", description: " Lacquered pair · travel pouch" },
  { id: "g-sake-cup", name: "Mini Sake Cup", emoji: "🍶", rarity: "uncommon", description: "Ceramic ochoko · hand-glazed" },

  // Rare (3 items) — 15%
  { id: "g-torii-pin", name: "Enamel Torii Pin", emoji: "⛩️", rarity: "rare", description: "Gold-plated torii gate pin · limited" },
  { id: "g-furoshiki", name: "Furoshiki Wrap Cloth", emoji: "🎁", rarity: "rare", description: "Silk blend wrapping cloth · 70cm" },
  { id: "g-ceramic-cup", name: "Handmade Tea Cup", emoji: "🏺", rarity: "rare", description: "Wabi-sabi ceramic · each unique" },

  // Super Rare (2 items) — 8%
  { id: "g-daruma", name: "Hand-painted Daruma", emoji: "🎯", rarity: "super-rare", description: "Fukusuke daruma · hand-painted gold" },
  { id: "g-ukiyoe-print", name: "Ukiyo-e Mini Print", emoji: "🖼️", rarity: "super-rare", description: "Woodblock-style art print · A6" },

  // Legendary (1 item) — 2%
  { id: "g-shikishi", name: "Signed Shikishi Board", emoji: "✨", rarity: "legendary", description: "Gold-foil art board · hand-signed · 1 of 100" },
];

export const GACHA_COIN_CONFIG = {
  initialBalance: 500,
  dailyBonus: 100,
  pullCost: 100,
  tenPullBonus: 100,
  tenPullCost: 1100,
} as const;

const STORAGE_KEY = "japan_gacha_balance";
const COLLECTION_KEY = "japan_gacha_collection";
const DAILY_KEY = "japan_gacha_last_daily";

export function getGachaBalance(): number {
  if (typeof window === "undefined") return GACHA_COIN_CONFIG.initialBalance;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    localStorage.setItem(STORAGE_KEY, String(GACHA_COIN_CONFIG.initialBalance));
    return GACHA_COIN_CONFIG.initialBalance;
  }
  return Number(stored) || 0;
}

export function setGachaBalance(balance: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, String(balance));
}

export function claimDailyBonus(): { bonus: number; newBalance: number } {
  const now = Date.now();
  const lastClaim = Number(localStorage.getItem(DAILY_KEY) || "0");
  const oneDayMs = 86_400_000;
  if (now - lastClaim < oneDayMs) return { bonus: 0, newBalance: getGachaBalance() };
  const balance = getGachaBalance() + GACHA_COIN_CONFIG.dailyBonus;
  setGachaBalance(balance);
  localStorage.setItem(DAILY_KEY, String(now));
  return { bonus: GACHA_COIN_CONFIG.dailyBonus, newBalance: balance };
}

export function getGachaCollection(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(COLLECTION_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToGachaCollection(itemId: string): string[] {
  const collection = getGachaCollection();
  if (!collection.includes(itemId)) {
    collection.push(itemId);
    if (typeof window !== "undefined") {
      localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
    }
  }
  return collection;
}

export function rollGacha(): GachaItem {
  const roll = Math.random();
  let cumulative = 0;
  for (const [rarity, config] of Object.entries(GACHA_RARITIES)) {
    cumulative += config.dropRate;
    if (roll <= cumulative) {
      const itemsOfRarity = GACHA_ITEMS.filter((item) => item.rarity === rarity);
      return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
    }
  }
  return GACHA_ITEMS[0];
}

export function rollGachaBatch(count: number): GachaItem[] {
  return Array.from({ length: count }, () => rollGacha());
}
