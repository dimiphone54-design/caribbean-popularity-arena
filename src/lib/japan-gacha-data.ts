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
    label: "コモン",
    color: "#94a3b8",
    glow: "rgba(148, 163, 184, 0.3)",
    dropRate: 0.50,
    pullCost: 100,
  },
  uncommon: {
    label: "アンコモン",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.3)",
    dropRate: 0.25,
    pullCost: 100,
  },
  rare: {
    label: "レア",
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.3)",
    dropRate: 0.15,
    pullCost: 100,
  },
  "super-rare": {
    label: "スーパーレア",
    color: "#c084fc",
    glow: "rgba(192, 132, 252, 0.4)",
    dropRate: 0.08,
    pullCost: 100,
  },
  legendary: {
    label: "レジェンド",
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.5)",
    dropRate: 0.02,
    pullCost: 100,
  },
};

export const GACHA_ITEMS: GachaItem[] = [
  // Common (8 items) — 50%
  { id: "g-sakura-eraser", name: "さくら消しゴムセット", emoji: "🌸", rarity: "common", description: "桜の香り消しゴム · 3個入り" },
  { id: "g-maneki-neko-mini", name: "招き猫ミニ", emoji: "🐱", rarity: "common", description: "開運デスクフィギュア · 5cm" },
  { id: "g-matcha-sticker", name: "抹茶ステッカーシート", emoji: "🍵", rarity: "common", description: "緑茶モチーフシール · 12枚" },
  { id: "g-tape-roll", name: "マスキングテープ", emoji: "🎀", rarity: "common", description: "和柄マスキングテープ · 15mm" },
  { id: "g-pencil-topper", name: "かわいい鉛筆キャップ", emoji: "✏️", rarity: "common", description: "動物キャラ鉛筆キャップ · ランダム" },
  { id: "g-origami-paper", name: "折り紙パック", emoji: "🦢", rarity: "common", description: "伝統模様 · 20枚" },
  { id: "g-magnet-cat", name: "ねこマグネット", emoji: "🧲", rarity: "common", description: "猫ポーズマグネット · 樹脂" },
  { id: "g-bookmark-sakura", name: "さくらブックマーク", emoji: "📖", rarity: "common", description: "メタル桜しおり" },

  // Uncommon (6 items) — 25%
  { id: "g-ramen-pin", name: "ラーメンピンバッジ", emoji: "🍜", rarity: "uncommon", description: "ラーメン丼ピン · 日本限定" },
  { id: "g-washi-set", name: "かわいい和紙テープセット", emoji: "🎨", rarity: "uncommon", description: "デコテープ5本セット" },
  { id: "g-keychain-totoro", name: "森の精霊キーホルダー", emoji: "🌿", rarity: "uncommon", description: "蓄光キーホルダー" },
  { id: "g-tenugui-cloth", name: "手ぬぐい", emoji: "🧣", rarity: "uncommon", description: "伝統プリント綿手ぬぐい" },
  { id: "g-chopstick-set", name: "竹箸セット", emoji: "🥢", rarity: "uncommon", description: "漆塗りペア · 携帯ポーチ付" },
  { id: "g-sake-cup", name: "ミニお猪口", emoji: "🍶", rarity: "uncommon", description: "陶器お猪口 · 手塗り釉薬" },

  // Rare (3 items) — 15%
  { id: "g-torii-pin", name: "鳥居ピン", emoji: "⛩️", rarity: "rare", description: "金メッキ鳥居ピン · 限定" },
  { id: "g-furoshiki", name: "風呂敷", emoji: "🎁", rarity: "rare", description: "シルク混ラッピングクロス · 70cm" },
  { id: "g-ceramic-cup", name: "手づくり湯のみ", emoji: "🏺", rarity: "rare", description: "わびさび陶器 · 一点もの" },

  // Super Rare (2 items) — 8%
  { id: "g-daruma", name: "手描きだるま", emoji: "🎯", rarity: "super-rare", description: "福助だるま · 金彩手描き" },
  { id: "g-ukiyoe-print", name: "浮世絵ミニプリント", emoji: "🖼️", rarity: "super-rare", description: "木版風アート · A6" },

  // Legendary (1 item) — 2%
  { id: "g-shikishi", name: "サイン入り色紙", emoji: "✨", rarity: "legendary", description: "金箔アートボード · 直筆サイン · 100枚限定" },
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
