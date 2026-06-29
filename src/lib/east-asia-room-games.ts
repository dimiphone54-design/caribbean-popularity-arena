/** Japan + China built rooms · live on-stage game lanes */
export type EastAsiaRoomGameLane = {
  islandCode: "JP" | "CN";
  countryId: "japan" | "china";
  roomSlug: string;
  countryName: string;
  flag: string;
  title: string;
  description: string;
  hostLabel: string;
  primaryGameName: string;
  primaryGameTag: string;
  roomKicker: string;
  /** Japan room · title kicker + live badge · Japanese copy */
  titleKickerJa?: string;
  descriptionJa?: string;
  /** China room · title kicker + live badge · Chinese copy */
  titleKickerZh?: string;
  /** China room · hero description · Chinese copy */
  descriptionZh?: string;
  backdropImage: string;
  panelClass: string;
  chipClass: string;
  rowClass: string;
};

export const japanRoomGameLane: EastAsiaRoomGameLane = {
  islandCode: "JP",
  countryId: "japan",
  roomSlug: "japan-room",
  countryName: "Japan",
  flag: "🇯🇵",
  title: "JAPAN ROOM",
  description:
    "JAPAN live stage · two kendoka duel under arena lights · sword clash · flame burst · variety talk-show games lane.",
  descriptionJa:
    "日本ライブステージ · 二つの剣道家 · 剣の衝突 · 炎 · バラエティトークショーゲーム",
  hostLabel: "JAPAN Stage · 日本",
  primaryGameName: "Kendo Stage Duel",
  primaryGameTag: "Live on stage · two men · sword clash",
  roomKicker: "Japan (JP) · kendo stage · live duel",
  titleKickerJa: "日本 · ジャパン · ライブステージ",
  backdropImage: "/japan-room-fuji-pagoda-bg.png",
  panelClass: "east-asia-game-panel east-asia-game-panel--japan",
  chipClass: "east-asia-game-chip east-asia-game-chip--japan",
  rowClass: "east-asia-game-row east-asia-game-row--japan"
};

export const chinaRoomGameLane: EastAsiaRoomGameLane = {
  islandCode: "CN",
  countryId: "china",
  roomSlug: "china-room",
  countryName: "China",
  flag: "🇨🇳",
  title: "CHINA ROOM",
  description:
    "Shanghai live stage · Wushu Duilian · two martial artists · choreographed sword + staff sparring · Mandarin talk-show game night.",
  descriptionZh:
    "上海直播舞台 · 武术对练 · 两位武者 · 编排剑棍对练 · 普通话脱口秀游戏之夜",
  hostLabel: "Shanghai Stage · 上海",
  primaryGameName: "Wushu Duilian",
  primaryGameTag: "武术对练 · live duo sparring · sword + staff clash",
  roomKicker: "China (CN) · Wushu Duilian · live stage duel",
  titleKickerZh: "中国 · 上海 · 直播舞台",
  backdropImage: "/china-room-shanghai-cyberpunk-bg.png",
  panelClass: "east-asia-game-panel east-asia-game-panel--china",
  chipClass: "east-asia-game-chip east-asia-game-chip--china",
  rowClass: "east-asia-game-row east-asia-game-row--china"
};
