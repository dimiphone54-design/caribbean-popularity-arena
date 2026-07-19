export type ArenaSlotDisplayLabels = {
  country: string;
  capital: string;
  liveBadge: string;
  pendingBadge: string;
  languageLabel?: string;
  clockLocale?: string;
  votesLiveLabel: string;
  metaLiveLabel: string;
};

const chinaSlotDisplay: ArenaSlotDisplayLabels = {
  country: "中国",
  capital: "上海",
  liveBadge: "直播",
  pendingBadge: "待定",
  languageLabel: "中文（普通话）",
  clockLocale: "zh-CN",
  votesLiveLabel: "直播",
  metaLiveLabel: "直播"
};

const colombiaSlotDisplay: ArenaSlotDisplayLabels = {
  country: "Colombia",
  capital: "Bogotá",
  liveBadge: "EN VIVO",
  pendingBadge: "Pendiente",
  languageLabel: "Español colombiano",
  clockLocale: "es-CO",
  votesLiveLabel: "EN VIVO",
  metaLiveLabel: "En vivo"
};

const ecuadorSlotDisplay: ArenaSlotDisplayLabels = {
  country: "Ecuador",
  capital: "Quito",
  liveBadge: "EN VIVO",
  pendingBadge: "Pendiente",
  languageLabel: "Español (Ecuador)",
  clockLocale: "es-EC",
  votesLiveLabel: "EN VIVO",
  metaLiveLabel: "En vivo"
};

const polandSlotDisplay: ArenaSlotDisplayLabels = {
  country: "Poland",
  capital: "Warszawa",
  liveBadge: "NA ŻYWO",
  pendingBadge: "Oczekuje",
  languageLabel: "Polski",
  clockLocale: "pl",
  votesLiveLabel: "NA ŻYWO",
  metaLiveLabel: "Na żywo"
};

const lithuaniaSlotDisplay: ArenaSlotDisplayLabels = {
  country: "Lithuania",
  capital: "Vilnius",
  liveBadge: "TIESIOGIAI",
  pendingBadge: "Laukiama",
  languageLabel: "Lietuvių",
  clockLocale: "lt",
  votesLiveLabel: "TIESIOGIAI",
  metaLiveLabel: "Tiesiogiai"
};

export type ArenaSlotTabLabels = {
  dropshipping: string;
  games: string;
  fashion: string;
  food: string;
  studyHub: string;
  aiPowerhouse: string;
};

const spanishTabLabels: ArenaSlotTabLabels = {
  dropshipping: "Envío directo",
  games: "Juegos",
  fashion: "Moda",
  food: "Comida",
  studyHub: "Centro de estudio",
  aiPowerhouse: "AI Powerhouse"
};

const polishTabLabels: ArenaSlotTabLabels = {
  dropshipping: "Wysyłka bezpośrednia",
  games: "Gry",
  fashion: "Moda",
  food: "Jedzenie",
  studyHub: "Centrum nauki",
  aiPowerhouse: "AI Powerhouse"
};

const lithuanianTabLabels: ArenaSlotTabLabels = {
  dropshipping: "Tiesioginis siuntimas",
  games: "Žaidimai",
  fashion: "Mada",
  food: "Maistas",
  studyHub: "Mokymosi centras",
  aiPowerhouse: "AI Powerhouse"
};

const chinaTabLabels: ArenaSlotTabLabels = {
  dropshipping: "代发货",
  games: "游戏",
  fashion: "时尚",
  food: "美食",
  studyHub: "学习中心",
  aiPowerhouse: "AI POWERHOUSE"
};

const japanTabLabels: ArenaSlotTabLabels = {
  dropshipping: "ドロップシップ",
  games: "ゲーム",
  fashion: "ファッション",
  food: "グルメ",
  studyHub: "学習ハブ",
  aiPowerhouse: "AI POWERHOUSE"
};

const trinidadTabLabels: ArenaSlotTabLabels = {
  dropshipping: "Dropship",
  games: "Games",
  fashion: "Culture",
  food: "Food",
  studyHub: "Study Hub",
  aiPowerhouse: "AI Powerhouse"
};

const japanSlotDisplay: ArenaSlotDisplayLabels = {
  country: "Japan",
  capital: "東京",
  liveBadge: "ライブ",
  pendingBadge: "待機中",
  languageLabel: "日本語",
  clockLocale: "ja",
  votesLiveLabel: "ライブ",
  metaLiveLabel: "ライブ"
};

const displayByIslandCode: Partial<Record<string, ArenaSlotDisplayLabels>> = {
  JP: japanSlotDisplay,
  CN: chinaSlotDisplay,
  CO: colombiaSlotDisplay,
  EC: ecuadorSlotDisplay,
  PL: polandSlotDisplay,
  LT: lithuaniaSlotDisplay
};

const tabLabelsByIslandCode: Partial<Record<string, ArenaSlotTabLabels>> = {
  CN: chinaTabLabels,
  JP: japanTabLabels,
  TT: trinidadTabLabels,
  CO: spanishTabLabels,
  EC: spanishTabLabels,
  PL: polishTabLabels,
  LT: lithuanianTabLabels
};

const defaultTabLabels: ArenaSlotTabLabels = {
  dropshipping: "Dropshipping",
  games: "Games",
  fashion: "Fashion",
  food: "Food",
  studyHub: "Study Hub",
  aiPowerhouse: "AI Powerhouse"
};

export function getArenaSlotTabLabels(islandCode: string, options?: { english?: boolean }) {
  // MASTER / English UI · default English tab labels even on CO / EC rooms.
  if (options?.english) return defaultTabLabels;
  return tabLabelsByIslandCode[islandCode] ?? defaultTabLabels;
}

export function getArenaSlotDisplayLabels(
  islandCode: string,
  defaults: { country: string; capital: string; languageLabel?: string }
): ArenaSlotDisplayLabels {
  const localized = displayByIslandCode[islandCode];
  if (localized) return localized;

  return {
    country: defaults.country,
    capital: defaults.capital,
    liveBadge: "LIVE",
    pendingBadge: "Pending",
    languageLabel: defaults.languageLabel,
    votesLiveLabel: "LIVE",
    metaLiveLabel: "Live"
  };
}