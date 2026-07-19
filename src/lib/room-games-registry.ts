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
  image?: string;
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
    panelKicker: "Juegos en vivo",
    panelTitle: "CO · JUEGOS",
    panelSubtitle: "",
    host: "Sala CO",
    roomKicker: "Colombia (CO) · juegos en la sala",
    panelClass: "colombia-game-room-panel w-full p-3 sm:p-4",
    rowClass: "colombia-game-room-row",
    chipClass: "colombia-game-room-chip inline-flex items-center gap-1 rounded-full border border-[#fb7185]/20 px-2 py-1 text-[9px] font-semibold text-[#fecdd3]",
    games: [
      {
        id: "co-futbol",
        set: "01",
        tag: "Liga · noche de partido",
        emoji: "⚽",
        name: "Fútbol",
        host: "Sala CO · Bogotá · Medellín",
        hint: "Predicciones · charla · LigaPro",
        ready: 90,
        launch: { type: "simulator", gameName: "Fútbol" },
        image: "https://images.unsplash.com/photo-1780548545759-434981c7c46e?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "co-volleyball",
        set: "02",
        tag: "Parque abierto · red al aire libre",
        emoji: "🏐",
        name: "Voleibol",
        host: "Sala CO · parque · picnic",
        hint: "Voleibol en el césped · equipo mixto",
        ready: 86,
        launch: { type: "simulator", gameName: "Volleyball" },
        image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-salsa",
        set: "03",
        tag: "Cali · pista en vivo",
        emoji: "💃",
        name: "Salsa",
        host: "Sala CO · Cali · Bogotá",
        hint: "Duelo de pasos · pista de talk-show",
        ready: 84,
        launch: { type: "simulator", gameName: "Salsa" },
        image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&q=80&fit=crop&crop=center"
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
        launch: { type: "simulator", gameName: "Surf" },
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-cycling",
        set: "05",
        tag: "Bogotá · ciclovía",
        emoji: "🚴",
        name: "Ciclismo",
        host: "Sala CO · ciclovía dominical",
        hint: "Sprint en el parque · ritmo de equipo",
        ready: 88,
        launch: { type: "simulator", gameName: "Cycling" },
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-puerto-chisme",
        set: "06",
        tag: "Merge · historia viral · puzzle storytelling",
        emoji: "🏘️",
        name: "Puerto Chisme: Fusiona y Cuenta",
        host: "Sala CO · Bogotá · Medellín",
        hint: "Fusiona piezas de historia · cuenta chismes virales",
        ready: 94,
        launch: { type: "simulator", gameName: "Puerto Chisme: Fusiona y Cuenta" },
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-gatodoku",
        set: "07",
        tag: "Brain puzzle · acertijos mentales · gatos",
        emoji: "🐱",
        name: "Gatodoku: Puzzle Mental",
        host: "Sala CO · Cali · Cartagena",
        hint: "Puzzles de lógica con gatos · retos diarios",
        ready: 92,
        launch: { type: "simulator", gameName: "Gatodoku: Puzzle Mental" },
        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-mundolibre",
        set: "08",
        tag: "Sandbox · mundos creativos · UGC viral",
        emoji: "🌍",
        name: "MundoLibre",
        host: "Sala CO · Medellín · Bucaramanga",
        hint: "Crea mundos · explora · construye con amigos",
        ready: 96,
        launch: { type: "simulator", gameName: "MundoLibre" },
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-liga-futbol",
        set: "09",
        tag: "Fútbol · LaLiga · simulador móvil",
        emoji: "⚽",
        name: "Liga Fútbol Móvil 26",
        host: "Sala CO · Bogotá · Cali",
        hint: "LaLiga en tu bolsillo · partidos en vivo",
        ready: 98,
        launch: { type: "simulator", gameName: "Liga Fútbol Móvil 26" },
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-rey-disparo",
        set: "10",
        tag: "Shooter · acción · rey del campo",
        emoji: "👑",
        name: "Rey Disparo",
        host: "Sala CO · Bogotá gaming zone",
        hint: "Acción en primera persona · modo rey",
        ready: 90,
        launch: { type: "simulator", gameName: "Rey Disparo" },
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-explosion-bloques",
        set: "11",
        tag: "Block puzzle · explosión de colores",
        emoji: "🧱",
        name: "Explosión de Bloques",
        host: "Sala CO · Barranquilla · Santa Marta",
        hint: "Rompe bloques · combina · puntuación alta",
        ready: 88,
        launch: { type: "simulator", gameName: "Explosión de Bloques" },
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-campeones-criaturas",
        set: "12",
        tag: "Monster battle · colecciona · evoluciona",
        emoji: "🐉",
        name: "Campeones de Criaturas",
        host: "Sala CO · Medellín gaming",
        hint: "Captura criaturas · evoluciona · compite",
        ready: 91,
        launch: { type: "simulator", gameName: "Campeones de Criaturas" },
        image: "https://images.unsplash.com/photo-1613771404721-1f92b5c2f027?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-estrellas-pelea",
        set: "13",
        tag: "Brawler · arena multijugador · estrellas",
        emoji: "⭐",
        name: "Estrellas de Pelea",
        host: "Sala CO · Cali arena",
        hint: "3v3 brawler · colecciona estrellas · victoria",
        ready: 93,
        launch: { type: "simulator", gameName: "Estrellas de Pelea" },
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-monopolio-va",
        set: "14",
        tag: "Board game · monopolio · propiedades",
        emoji: "🎲",
        name: "Monopolio VA!",
        host: "Sala CO · Bogotá · Cartagena",
        hint: "Compra propiedades · construye · domina",
        ready: 87,
        launch: { type: "simulator", gameName: "Monopolio VA!" },
        image: "https://images.unsplash.com/photo-1611891480027-9b5e9b5fd0e6?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "co-partida-real",
        set: "15",
        tag: "Match-3 · rompecabezas real · puzzle",
        emoji: "👑",
        name: "Partida Real",
        host: "Sala CO · Medellín · Cali",
        hint: "Match tres joyas · rescata el castillo",
        ready: 89,
        launch: { type: "simulator", gameName: "Partida Real" },
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&fit=crop&crop=center"
      }
    ]
  },
  "ecuador-room": {
    roomSlug: "ecuador-room",
    countryId: "ecuador",
    countryName: "Ecuador",
    flag: "🇪🇨",
    islandCode: "EC",
    panelKicker: "La Fosa · en vivo",
    panelTitle: "🇪🇨 ECUADOR · DEPORTES",
    panelSubtitle: "Ecuavoley · cancha de barrio",
    host: "Sala EC",
    roomKicker: "Ecuador (EC) · La Fosa · en vivo",
    panelClass:
      "ecuador-game-room-panel ecuador-game-room-panel--badass w-full rounded-2xl border border-[#fcd116]/50 bg-[radial-gradient(circle_at_top,rgba(252,209,22,0.12),transparent_50%),linear-gradient(155deg,rgba(8,4,4,0.96),rgba(12,8,4,0.94))] p-4 backdrop-blur-md sm:p-5 shadow-[0_0_32px_rgba(206,17,38,0.18),0_0_20px_rgba(252,209,22,0.1)]",
    rowClass: "ecuador-game-room-row",
    chipClass:
      "ecuador-game-room-chip inline-flex items-center gap-1.5 rounded-full border border-[#fcd116]/40 bg-[#1a1004]/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#fef08a]",
    games: [
      {
        id: "ec-ecuavoley",
        set: "01",
        tag: "Vóley a tres · cancha de barrio · a full",
        emoji: "🏐",
        name: "Ecuavoley",
        host: "Sala EC · Quito · Guayaquil",
        hint: "Clásico ecuatoriano · tres jugadores · ¡dale!",
        ready: 88,
        launch: { type: "simulator", gameName: "Ecuavoley" },
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-puerto-chisme",
        set: "02",
        tag: "Merge · historia viral · puzzle storytelling",
        emoji: "🏘️",
        name: "Puerto Chisme: Fusiona y Cuenta",
        host: "Sala EC · Quito · Guayaquil",
        hint: "Fusiona piezas de historia · cuenta chismes virales",
        ready: 94,
        launch: { type: "simulator", gameName: "Puerto Chisme: Fusiona y Cuenta" },
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-gatodoku",
        set: "03",
        tag: "Brain puzzle · acertijos mentales · gatos",
        emoji: "🐱",
        name: "Gatodoku: Puzzle Mental",
        host: "Sala EC · Cuenca · Ambato",
        hint: "Puzzles de lógica con gatos · retos diarios",
        ready: 92,
        launch: { type: "simulator", gameName: "Gatodoku: Puzzle Mental" },
        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-mundolibre",
        set: "04",
        tag: "Sandbox · mundos creativos · UGC viral",
        emoji: "🌍",
        name: "MundoLibre",
        host: "Sala EC · Quito · Loja",
        hint: "Crea mundos · explora · construye con amigos",
        ready: 96,
        launch: { type: "simulator", gameName: "MundoLibre" },
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-liga-futbol",
        set: "05",
        tag: "Fútbol · LaLiga · simulador móvil",
        emoji: "⚽",
        name: "Liga Fútbol Móvil 26",
        host: "Sala EC · Guayaquil · Quito",
        hint: "LaLiga en tu bolsillo · partidos en vivo",
        ready: 98,
        launch: { type: "simulator", gameName: "Liga Fútbol Móvil 26" },
        image: "https://images.unsplash.com/photo-1780548545759-434981c7c46e?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-rey-disparo",
        set: "06",
        tag: "Shooter · acción · rey del campo",
        emoji: "👑",
        name: "Rey Disparo",
        host: "Sala EC · Quito gaming zone",
        hint: "Acción en primera persona · modo rey",
        ready: 90,
        launch: { type: "simulator", gameName: "Rey Disparo" },
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-explosion-bloques",
        set: "07",
        tag: "Block puzzle · explosión de colores",
        emoji: "🧱",
        name: "Explosión de Bloques",
        host: "Sala EC · Guayaquil · Manta",
        hint: "Rompe bloques · combina · puntuación alta",
        ready: 88,
        launch: { type: "simulator", gameName: "Explosión de Bloques" },
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-campeones-criaturas",
        set: "08",
        tag: "Monster battle · colecciona · evoluciona",
        emoji: "🐉",
        name: "Campeones de Criaturas",
        host: "Sala EC · Cuenca gaming",
        hint: "Captura criaturas · evoluciona · compite",
        ready: 91,
        launch: { type: "simulator", gameName: "Campeones de Criaturas" },
        image: "https://images.unsplash.com/photo-1613771404721-1f92b5c2f027?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-estrellas-pelea",
        set: "09",
        tag: "Brawler · arena multijugador · estrellas",
        emoji: "⭐",
        name: "Estrellas de Pelea",
        host: "Sala EC · Quito arena",
        hint: "3v3 brawler · colecciona estrellas · victoria",
        ready: 93,
        launch: { type: "simulator", gameName: "Estrellas de Pelea" },
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-monopolio-va",
        set: "10",
        tag: "Board game · monopolio · propiedades",
        emoji: "🎲",
        name: "Monopolio VA!",
        host: "Sala EC · Guayaquil · Quito",
        hint: "Compra propiedades · construye · domina",
        ready: 87,
        launch: { type: "simulator", gameName: "Monopolio VA!" },
        image: "https://images.unsplash.com/photo-1611891480027-9b5e9b5fd0e6?w=600&q=80&fit=crop&crop=center"
      },
      {
        id: "ec-partida-real",
        set: "11",
        tag: "Match-3 · rompecabezas real · puzzle",
        emoji: "👑",
        name: "Partida Real",
        host: "Sala EC · Quito · Cuenca",
        hint: "Match tres joyas · rescata el castillo",
        ready: 89,
        launch: { type: "simulator", gameName: "Partida Real" },
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&fit=crop&crop=center"
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
    panelTitle: "🇯🇵 日本 · スポーツ",
    panelSubtitle: "",
    host: "JAPAN Stage · 日本",
    roomKicker: "日本 (JP) · 剣道ステージ · ライブデュエル",
    panelClass: "east-asia-game-panel east-asia-game-panel--japan w-full rounded-2xl border p-4 backdrop-blur-md sm:p-5",
    rowClass: "east-asia-game-row east-asia-game-row--japan",
    chipClass: "east-asia-game-chip east-asia-game-chip--japan inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold",
    games: [
      {
        id: "jp-kendo",
        set: "01",
        tag: "ステージライブ · 二人の剣士 · 剣の衝突",
        emoji: "⚔️",
        name: "剣道ステージデュエル",
        host: "JAPAN Stage · 日本",
        hint: "剣道ステージ · 炎のバースト · 五本勝負",
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
    panelTitle: "🇨🇳 中国 · 体育",
    panelSubtitle: "武术对练 · 武术散打 · 直播舞台",
    host: "上海舞台",
    roomKicker: "中国 (CN) · 武术 · 直播舞台",
    panelClass: "east-asia-game-panel east-asia-game-panel--china w-full rounded-2xl border p-4 backdrop-blur-md sm:p-5",
    rowClass: "east-asia-game-row east-asia-game-row--china",
    chipClass: "east-asia-game-chip east-asia-game-chip--china inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold",
    games: [
      {
        id: "cn-duilian",
        set: "01",
        tag: "武术对练 · 双人对练",
        emoji: "🥋",
        name: "武术对练",
        host: "上海舞台",
        hint: "编排剑棍对练 · 剑与棍交锋",
        ready: 90,
        launch: { type: "east-asia-stage", gameName: "Wushu Duilian" }
      },
      {
        id: "cn-sanda",
        set: "02",
        tag: "国际武联散打 · 八角形全接触",
        emoji: "🥋",
        name: "武术散打",
        host: "上海八角笼",
        hint: "散打 · 男子70公斤决赛赛道",
        ready: 92,
        launch: { type: "simulator", gameName: "Wushu Sanda" }
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
  },
  "spain-room": {
    roomSlug: "spain-room",
    countryId: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    islandCode: "ES",
    panelKicker: "Top 10 España · móvil free-to-play",
    panelTitle: "<span class='panel-flag-glow'>🇪🇸</span> ESPAÑA · JUEGOS TOP",
    panelSubtitle: "Merge · Puzzle · Sandbox · Fútbol · Shooter · Brawler · Board · Match-3",
    host: "Sala ES · Madrid",
    roomKicker: "España (ES) · juegos virales · Madrid · Barcelona",
    panelClass: "spain-game-panel w-full rounded-2xl border border-yellow-500/25 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.1),transparent_50%),linear-gradient(155deg,rgba(10,4,8,0.97),rgba(20,8,4,0.95))] p-4 backdrop-blur-md sm:p-5",
    rowClass: "spain-game-row",
    chipClass: "spain-game-chip inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-900/20 px-3 py-1.5 text-[10px] font-semibold text-yellow-300",
    games: [
      {
        id: "es-puerto-chisme",
        set: "01",
        tag: "Merge · historia viral · puzzle storytelling",
        emoji: "🏘️",
        name: "Puerto Chisme: Fusiona y Cuenta",
        host: "Sala ES · Madrid · Barcelona",
        hint: "Fusiona piezas de historia · cuenta chismes virales",
        ready: 94,
        launch: { type: "simulator", gameName: "Puerto Chisme: Fusiona y Cuenta" },
        image: "https://images.unsplash.com/photo-1743192033279-57a6fa72585a?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-gatodoku",
        set: "02",
        tag: "Brain puzzle · acertijos mentales · gatos",
        emoji: "🐱",
        name: "Gatodoku: Puzzle Mental",
        host: "Sala ES · Valencia · Sevilla",
        hint: "Puzzles de lógica con gatos · retos diarios",
        ready: 92,
        launch: { type: "simulator", gameName: "Gatodoku: Puzzle Mental" },
        image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-mundolibre",
        set: "03",
        tag: "Sandbox · mundos creativos · UGC viral",
        emoji: "🌍",
        name: "MundoLibre",
        host: "Sala ES · Bilbao · Zaragoza",
        hint: "Crea mundos · explora · construye con amigos",
        ready: 96,
        launch: { type: "simulator", gameName: "MundoLibre" },
        image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-liga-futbol",
        set: "04",
        tag: "Fútbol · LaLiga · simulador móvil",
        emoji: "⚽",
        name: "Liga Fútbol Móvil 26",
        host: "Sala ES · Camp Nou · Bernabéu",
        hint: "LaLiga en tu bolsillo · partidos en vivo",
        ready: 98,
        launch: { type: "simulator", gameName: "Liga Fútbol Móvil 26" },
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-rey-disparo",
        set: "05",
        tag: "Shooter · acción · rey del campo",
        emoji: "👑",
        name: "Rey Disparo",
        host: "Sala ES · Madrid gaming zone",
        hint: "Acción en primera persona · modo rey",
        ready: 90,
        launch: { type: "simulator", gameName: "Rey Disparo" },
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-explosion-bloques",
        set: "06",
        tag: "Block puzzle · explosión de colores",
        emoji: "🧱",
        name: "Explosión de Bloques",
        host: "Sala ES · Málaga · Granada",
        hint: "Rompe bloques · combina · puntuación alta",
        ready: 88,
        launch: { type: "simulator", gameName: "Explosión de Bloques" },
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-campeones-criaturas",
        set: "07",
        tag: "Monster battle · colecciona · evoluciona",
        emoji: "🐉",
        name: "Campeones de Criaturas",
        host: "Sala ES · Barcelona gaming",
        hint: "Captura criaturas · evoluciona · compite",
        ready: 91,
        launch: { type: "simulator", gameName: "Campeones de Criaturas" },
        image: "https://images.unsplash.com/photo-1758998427360-c48fa238ad4d?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-estrellas-pelea",
        set: "08",
        tag: "Brawler · arena multijugador · estrellas",
        emoji: "⭐",
        name: "Estrellas de Pelea",
        host: "Sala ES · Valencia arena",
        hint: "3v3 brawler · colecciona estrellas · victoria",
        ready: 93,
        launch: { type: "simulator", gameName: "Estrellas de Pelea" },
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-monopolio-va",
        set: "09",
        tag: "Board game · monopolio · propiedades",
        emoji: "🎲",
        name: "Monopolio VA!",
        host: "Sala ES · Madrid · Sevilla",
        hint: "Compra propiedades · construye · domina",
        ready: 87,
        launch: { type: "simulator", gameName: "Monopolio VA!" },
        image: "https://images.unsplash.com/photo-1611891480027-9b5e9b5fd0e6?w=800&q=90&fit=crop&crop=center"
      },
      {
        id: "es-partida-real",
        set: "10",
        tag: "Match-3 · rompecabezas real · puzzle",
        emoji: "👑",
        name: "Partida Real",
        host: "Sala ES · Barcelona · Valencia",
        hint: "Match tres joyas · rescata el castillo",
        ready: 89,
        launch: { type: "simulator", gameName: "Partida Real" },
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=90&fit=crop&crop=center"
      }
    ]
  },
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
  "uk-flag-cotswolds": { countryId: "uk", countryName: "United Kingdom", flag: "🇬🇧" },
  "trinidad-room": { countryId: "trinidad", countryName: "Trinidad & Tobago", flag: "🇹🇹" },
  "spain-room": { countryId: "spain", countryName: "Spain", flag: "🇪🇸" }
};