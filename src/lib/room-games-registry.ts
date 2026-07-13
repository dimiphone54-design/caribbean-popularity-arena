/** Runtime wiring · sports per room · football in every room via RoomFootballStrip */

export type RoomGameLaunch =
  | { type: "simulator"; gameName: string }
  | { type: "east-asia-stage"; gameName: string };

export type RoomCountryGameRow = {
  id: string;
  set: string;
  tag: string;
  emoji: string;
  name: string;
  host: string;
  hint: string;
  ready: number;
  launch: RoomGameLaunch;
};

export type RoomGamesConfig = {
  roomSlug: string;
  countryId: string;
  countryName: string;
  flag: string;
  islandCode: string;
  panelTitle: string;
  panelSubtitle: string;
  panelKicker: string;
  host: string;
  roomKicker: string;
  panelClass: string;
  rowClass: string;
  chipClass: string;
  games: RoomCountryGameRow[];
};

export const ROOM_GAMES_BY_SLUG: Record<string, RoomGamesConfig> = {
  "colombia-room": {
    roomSlug: "colombia-room",
    countryId: "colombia",
    countryName: "Colombia",
    flag: "🇨🇴",
    islandCode: "CO",
    panelKicker: "Deportes · juegos en vivo",
    panelTitle: "Colombia (CO) · deportes",
    panelSubtitle: "Fútbol · voleibol · salsa · surf · ciclismo · Free Fire",
    host: "Sala CO",
    roomKicker: "Colombia (CO) · deportes en la sala",
    panelClass: "colombia-game-room-panel w-full rounded-2xl border border-[#fb7185]/35 bg-[#1a0208]/55 p-4 backdrop-blur-md sm:p-5",
    rowClass: "colombia-game-room-row",
    chipClass: "colombia-game-room-chip inline-flex items-center gap-1.5 rounded-full border border-[#fb7185]/30 px-3 py-1.5 text-[10px] font-semibold text-[#fecdd3]",
    games: [
      {
        id: "co-futbol",
        set: "01",
        tag: "Liga · noche de partido",
        emoji: "⚽",
        name: "Fútbol",
        host: "Sala CO · Bogotá · Medellín",
        hint: "Predicciones · banter · LigaPro",
        ready: 90,
        launch: { type: "simulator", gameName: "Fútbol" }
      },
      {
        id: "co-volleyball",
        set: "02",
        tag: "Parque abierto · red al aire libre",
        emoji: "🏐",
        name: "Volleyball",
        host: "Sala CO · parque · picnic",
        hint: "Voleibol en el césped · equipo mixto",
        ready: 86,
        launch: { type: "simulator", gameName: "Volleyball" }
      },
      {
        id: "co-salsa",
        set: "03",
        tag: "Cali · pista en vivo",
        emoji: "💃",
        name: "Salsa",
        host: "Sala CO · Cali · Bogotá",
        hint: "Duelo de pasos · talk-show lane",
        ready: 84,
        launch: { type: "simulator", gameName: "Salsa" }
      },
      {
        id: "co-surf",
        set: "04",
        tag: "Palomino · Costa Caribe",
        emoji: "🌊",
        name: "Surf",
        host: "Sala CO · La Guajira",
        hint: "Ola perfecta · timing en la tabla",
        ready: 82,
        launch: { type: "simulator", gameName: "Surf" }
      },
      {
        id: "co-cycling",
        set: "05",
        tag: "Bogotá · ciclovía",
        emoji: "🚴",
        name: "Cycling",
        host: "Sala CO · ciclovía dominical",
        hint: "Sprint en el parque · ritmo de equipo",
        ready: 88,
        launch: { type: "simulator", gameName: "Cycling" }
      },
      {
        id: "co-free-fire",
        set: "06",
        tag: "Ranked con la sala",
        emoji: "🔫",
        name: "Free Fire",
        host: "Sala CO · ranked BR",
        hint: "Battle royale móvil · sala en vivo",
        ready: 92,
        launch: { type: "simulator", gameName: "Free Fire" }
      }
    ]
  },
  "ecuador-room": {
    roomSlug: "ecuador-room",
    countryId: "ecuador",
    countryName: "Ecuador",
    flag: "🇪🇨",
    islandCode: "EC",
    panelKicker: "Juegos virales · talk-show · en vivo",
    panelTitle: "🇪🇨 Ecuador · deportes",
    panelSubtitle: "Ecuavoley · Free Fire",
    host: "Sala EC",
    roomKicker: "Ecuador (EC) · juegos en la sala",
    panelClass: "ecuador-game-room-panel w-full rounded-2xl border border-[#fcd116]/35 bg-[#040a08]/65 p-4 backdrop-blur-md sm:p-5",
    rowClass: "ecuador-game-room-row",
    chipClass: "ecuador-game-room-chip inline-flex items-center gap-1.5 rounded-full border border-[#fcd116]/30 px-3 py-1.5 text-[10px] font-semibold text-[#fef08a]",
    games: [
      {
        id: "ec-ecuavoley",
        set: "01",
        tag: "Vóley a tres · cancha de barrio",
        emoji: "🏐",
        name: "Ecuavoley",
        host: "Sala EC · Quito · Guayaquil",
        hint: "Clásico ecuatoriano · tres jugadores",
        ready: 88,
        launch: { type: "simulator", gameName: "Ecuavoley" }
      },
      {
        id: "ec-free-fire",
        set: "02",
        tag: "Sala ecuatoriana · ranked BR",
        emoji: "🔫",
        name: "Free Fire EC",
        host: "Sala EC · ranked · squad live",
        hint: "Shooter móvil viral en la región",
        ready: 94,
        launch: { type: "simulator", gameName: "Free Fire EC" }
      }
    ]
  },
  "japan-room": {
    roomSlug: "japan-room",
    countryId: "japan",
    countryName: "Japan",
    flag: "🇯🇵",
    islandCode: "JP",
    panelKicker: "バイラルゲーム · ライブステージ",
    panelTitle: "🇯🇵 Japan · sports",
    panelSubtitle: "Kendo stage duel · live on stage",
    host: "JAPAN Stage · 日本",
    roomKicker: "Japan (JP) · kendo stage · live duel",
    panelClass: "east-asia-game-panel east-asia-game-panel--japan w-full rounded-2xl border p-4 backdrop-blur-md sm:p-5",
    rowClass: "east-asia-game-row east-asia-game-row--japan",
    chipClass: "east-asia-game-chip east-asia-game-chip--japan inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold",
    games: [
      {
        id: "jp-kendo",
        set: "01",
        tag: "Live on stage · two men · sword clash",
        emoji: "⚔️",
        name: "Kendo Stage Duel",
        host: "JAPAN Stage · 日本",
        hint: "剣道ステージ · flame burst · best of five",
        ready: 88,
        launch: { type: "east-asia-stage", gameName: "Kendo Stage Duel" }
      }
    ]
  },
  "china-room": {
    roomSlug: "china-room",
    countryId: "china",
    countryName: "China",
    flag: "🇨🇳",
    islandCode: "CN",
    panelKicker: "热门游戏 · 直播舞台",
    panelTitle: "🇨🇳 China · sports",
    panelSubtitle: "武术对练 · Wushu Sanda · live stage",
    host: "Shanghai Stage · 上海",
    roomKicker: "China (CN) · Wushu · live stage",
    panelClass: "east-asia-game-panel east-asia-game-panel--china w-full rounded-2xl border p-4 backdrop-blur-md sm:p-5",
    rowClass: "east-asia-game-row east-asia-game-row--china",
    chipClass: "east-asia-game-chip east-asia-game-chip--china inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold",
    games: [
      {
        id: "cn-duilian",
        set: "01",
        tag: "武术对练 · live duo sparring",
        emoji: "🥋",
        name: "Wushu Duilian",
        host: "Shanghai Stage · 上海",
        hint: "编排剑棍对练 · sword + staff clash",
        ready: 90,
        launch: { type: "east-asia-stage", gameName: "Wushu Duilian" }
      },
      {
        id: "cn-sanda",
        set: "02",
        tag: "IWUF Sanda · full contact octagon",
        emoji: "🥋",
        name: "Wushu Sanda",
        host: "Shanghai Octagon · 上海",
        hint: "散打 · men's 70kg final lane",
        ready: 92,
        launch: { type: "simulator", gameName: "Wushu Sanda" }
      }
    ]
  },
  "football-lads": {
    roomSlug: "football-lads",
    countryId: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    islandCode: "UK",
    panelKicker: "Sunday league · pub cup",
    panelTitle: "FOOTBALL LADS · five-a-side",
    panelSubtitle: "Five-a-side golden boot · pub energy",
    host: "Sunday League · UK",
    roomKicker: "Football Lads · five-a-side live",
    panelClass: "uk-football-lads-games-panel w-full rounded-2xl border border-[#38bdf8]/25 bg-[#020814]/80 p-4 backdrop-blur-md sm:p-5",
    rowClass: "uk-football-lads-game-row",
    chipClass: "uk-football-lads-game-chip inline-flex items-center gap-1.5 rounded-full border border-[#38bdf8]/25 px-3 py-1.5 text-[10px] font-semibold text-[#bae6fd]",
    games: [
      {
        id: "uk-five-a-side",
        set: "01",
        tag: "Sunday league · pub cup final",
        emoji: "⚽",
        name: "Five-a-side",
        host: "Football Lads · UK regions",
        hint: "5-a-side golden boot · pub pitch",
        ready: 94,
        launch: { type: "simulator", gameName: "Five-a-side" }
      },
      {
        id: "uk-park-football",
        set: "02",
        tag: "Hyde Park · mixed kickabout",
        emoji: "⚽",
        name: "Park football",
        host: "Hyde Park Crew · UK",
        hint: "Mixed squad kickabout · park lane",
        ready: 88,
        launch: { type: "simulator", gameName: "Park football" }
      }
    ]
  },
  "uk-flag-cotswolds": {
    roomSlug: "uk-flag-cotswolds",
    countryId: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    islandCode: "UK",
    panelKicker: "UK park games · wired",
    panelTitle: "United Kingdom · extra park lanes",
    panelSubtitle: "Volleyball · Snooker · Indoor bowls · Indoor Curling · Park football",
    host: "UK Park · Cotswolds",
    roomKicker: "UK Cotswolds · park games",
    panelClass: "cotswolds-extra-games-panel w-full rounded-2xl border border-[#94a3b8]/25 bg-[#0f172a]/70 p-4 backdrop-blur-md sm:p-5",
    rowClass: "cotswolds-extra-game-row",
    chipClass: "cotswolds-extra-game-chip inline-flex items-center gap-1.5 rounded-full border border-[#94a3b8]/25 px-3 py-1.5 text-[10px] font-semibold text-[#cbd5e1]",
    games: [
      {
        id: "uk-volleyball",
        set: "01",
        tag: "Hyde Park · mixed net",
        emoji: "🏐",
        name: "Volleyball",
        host: "Notting Hill · UK",
        hint: "Volleyball pair · park net",
        ready: 86,
        launch: { type: "simulator", gameName: "Volleyball" }
      },
      {
        id: "uk-snooker",
        set: "02",
        tag: "Indoor hall · safety frame",
        emoji: "🎱",
        name: "Snooker",
        host: "UK pub hall",
        hint: "Open break or safety frame",
        ready: 84,
        launch: { type: "simulator", gameName: "Snooker" }
      },
      {
        id: "uk-indoor-bowls",
        set: "03",
        tag: "Indoor rink · tie-break end",
        emoji: "🟢",
        name: "Indoor bowls",
        host: "UK indoor green",
        hint: "Tie-break or sudden death",
        ready: 82,
        launch: { type: "simulator", gameName: "Indoor bowls" }
      },
      {
        id: "uk-curling",
        set: "04",
        tag: "Elite snow indoor lane",
        emoji: "🥌",
        name: "Indoor Curling",
        host: "Knightsbridge · UK",
        hint: "Snow billiards pavilion lane",
        ready: 80,
        launch: { type: "simulator", gameName: "Indoor Curling" }
      },
      {
        id: "uk-park-football-cw",
        set: "05",
        tag: "Hyde Park · mixed squad",
        emoji: "⚽",
        name: "Park football",
        host: "Hyde Park · UK",
        hint: "Mixed kickabout · team pts",
        ready: 90,
        launch: { type: "simulator", gameName: "Park football" }
      }
    ]
  }
};

export function getRoomGamesConfig(roomSlug: string): RoomGamesConfig | null {
  return ROOM_GAMES_BY_SLUG[roomSlug] ?? null;
}

/** Football strip metadata for every built country room */
export const ROOM_FOOTBALL_BY_SLUG: Record<
  string,
  { countryId: string; countryName: string; flag: string }
> = {
  "colombia-room": { countryId: "colombia", countryName: "Colombia", flag: "🇨🇴" },
  "ecuador-room": { countryId: "ecuador", countryName: "Ecuador", flag: "🇪🇨" },
  "japan-room": { countryId: "japan", countryName: "Japan", flag: "🇯🇵" },
  "china-room": { countryId: "china", countryName: "China", flag: "🇨🇳" },
  "football-lads": { countryId: "uk", countryName: "United Kingdom", flag: "🇬🇧" },
  "uk-flag-cotswolds": { countryId: "uk", countryName: "United Kingdom", flag: "🇬🇧" }
};