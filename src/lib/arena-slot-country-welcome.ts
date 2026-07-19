/** Front 12 slot · white welcome line under country tabs (UK pattern) */
export type ArenaSlotCountryWelcome = {
  islandCode: string;
  welcome: string;
};

export const arenaSlotCountryWelcomes: ArenaSlotCountryWelcome[] = [
  {
    islandCode: "UK",
    welcome:
      "Welcome to the United Kingdom — nestled off the northwest coast of mainland Europe, where rolling countryside, iconic cities, and rich heritage welcome you home."
  },
  {
    islandCode: "CN",
    welcome:
      "欢迎来到中国 — 从上海霓虹天际线到古老文脉街巷，横跨东亚。武术、茶文化与生直播舞台，在此迎你回家。"
  },
  {
    islandCode: "JP",
    welcome:
      "日本へようこそ — 東アジアに根ざし、伝統とアリーナのライトが交わる国。剣道の対決、抹茶レーン、ライブステージへとつながるストリートファッションがあなたを迎えます。"
  },
  {
    islandCode: "CO",
    welcome:
      "Bienvenidos a Colombia — entre los Andes y la costa caribeña, donde las ciudades de salsa, las cocinas de arepa y la vida nocturna en azoteas te reciben en casa."
  },
  {
    islandCode: "EC",
    welcome:
      "Bienvenidos a Ecuador — entre los Andes, la costa del Pacífico y el Amazonas, donde el ecuavóley, el ceviche costero y la cultura festiva te reciben en casa."
  },
  {
    islandCode: "PL",
    welcome:
      "Witamy w Polsce — od Warszawy po polskie dziedzictwo, gdzie moda uliczna, kultura i arena na żywo witają cię jak w domu."
  },
  {
    islandCode: "LT",
    welcome:
      "Sveiki atvykę į Lietuvą — nuo Vilniaus senamiesčio iki gyvos arenos, kur baltų kraštų kultūra ir stilius jus pasitinka namuose."
  },
  {
    islandCode: "TT",
    welcome:
      "Welcome to Trinidad & Tobago — twin islands of carnival rhythm, doubles, and steelpan, where the Caribbean spirit lives in every street party."
  }
];

const welcomeByCode = Object.fromEntries(
  arenaSlotCountryWelcomes.map((entry) => [entry.islandCode, entry.welcome])
) as Record<string, string>;

export function getArenaSlotTabWelcome(islandCode: string) {
  return welcomeByCode[islandCode] ?? null;
}

/** Front 12 countries with full Dropshipping · Games · Fashion · Food · Study Hub tabs */
export const ARENA_FRONT_SLOT_TAB_CODES = new Set(["UK", "CN", "JP", "CO", "EC", "TT"]);