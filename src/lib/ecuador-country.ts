import type { CountryTrendActivity } from "@/lib/country-trend-activities";

/** Ecuador · culture · food · games · activities — shared across arena surfaces */
export const ecuadorCountryHighlights = {
  culture: [
    "Pasillo · Sanjuanito · Andes folklore",
    "Otavalo market · Quito Old Town · Mitad del Mundo",
    "Spanish + Kichwa pride · fiestas de pueblo"
  ],
  food: [
    "Encebollado · llapingachos · hornado",
    "Ceviche costeño · bolón · empanadas de viento",
    "Chocolate fino de aroma · café Loja · guayusa"
  ],
  games: [
    "Ecuavoley · cancha de barrio",
    "Dominoes · Yo Nunca talk-show",
    "LigaPro banter · FIFA nights"
  ],
  activities: [
    "Galápagos live chat · Amazon river stories",
    "Cuenca craft walks · Guayaquil malecón nights",
    "Cumbia · salsa · festejo on the dance floor"
  ]
} as const;

/** Ecuador · dual lane · trend activity */
export const ecuadorDualLanePanel = {
  kicker: "Doble pista",
  title: "Ecuador · doble pista",
  detail: "Quito · Guayaquil · Andes–Pacífico abierto"
} as const;

export const ecuadorTrendActivities: CountryTrendActivity[] = [
  {
    id: "ec-dual-lane",
    kicker: {
      en: ecuadorDualLanePanel.kicker,
      es: ecuadorDualLanePanel.kicker,
      esEC: ecuadorDualLanePanel.kicker
    },
    label: {
      en: ecuadorDualLanePanel.title,
      es: ecuadorDualLanePanel.title,
      esEC: ecuadorDualLanePanel.title
    },
    vibe: {
      en: ecuadorDualLanePanel.detail,
      es: ecuadorDualLanePanel.detail,
      esEC: ecuadorDualLanePanel.detail
    }
  },
  {
    id: "ec-encebollado-morning",
    label: {
      en: "Encebollado morning",
      es: "Encebollado mañanero",
      esEC: "Encebollado mañanero",
      zh: "恩塞博利亚多清晨"
    },
    vibe: {
      en: "Fish stew · yuca · coastal buzz",
      es: "Caldo de pescado · yuca · costa viva",
      esEC: "Caldo de pescado · yuca · costa viva",
      zh: "鱼汤 · 木薯 · 海岸热闹"
    }
  },
  {
    id: "ec-otavalo-market",
    label: {
      en: "Otavalo market day",
      es: "Mercado de Otavalo",
      esEC: "Mercado de Otavalo",
      zh: "奥塔瓦洛集市日"
    },
    vibe: {
      en: "Textiles · Andes crafts · barter chat",
      es: "Textiles · artesanía · charla andina",
      esEC: "Textiles · artesanía · charla andina",
      zh: "纺织品 · 安第斯手工艺 · 议价闲聊"
    }
  },
  {
    id: "ec-pasillo-night",
    label: {
      en: "Pasillo & Sanjuanito night",
      es: "Noche de pasillo y sanjuanito",
      esEC: "Noche de pasillo y sanjuanito",
      zh: "帕西约与圣胡安尼托之夜"
    },
    vibe: {
      en: "Live band · couples dance · Quito plaza",
      es: "Banda en vivo · baile · plaza Quito",
      esEC: "Banda en vivo · baile · plaza Quito",
      zh: "现场乐队 · 双人舞 · 基多广场"
    }
  },
  {
    id: "ec-ecuavoley-sunday",
    label: {
      en: "Ecuavoley Sunday",
      es: "Ecuavoley domingo",
      esEC: "Ecuavoley domingo",
      zh: "周日厄瓜多尔排球"
    },
    vibe: {
      en: "Three-player volleyball · family court",
      es: "Vóley a tres · cancha familiar",
      esEC: "Vóley a tres · cancha familiar",
      zh: "三人排球 · 家庭球场"
    }
  },
  {
    id: "ec-galapagos-stories",
    label: {
      en: "Galápagos & coast stories",
      es: "Historias Galápagos y costa",
      esEC: "Historias Galápagos y costa",
      zh: "加拉帕戈斯与海岸故事"
    },
    vibe: {
      en: "Sea lions · islands · Guayaquil malecón",
      es: "Lobos marinos · islas · malecón",
      esEC: "Lobos marinos · islas · malecón",
      zh: "海狮 · 群岛 · 瓜亚基尔海滨"
    }
  }
];

export const ecuadorIntlTagline = {
  en: "Ecuadorian food · Andes culture · dance · games",
  es: "Comida ecuatoriana · cultura andina · baile · juegos"
};

export const ecuadorIntlRegion = {
  en: "South America · Andes · Pacific coast · Amazon",
  es: "Sudamérica · Andes · costa pacífica · Amazonía"
};

export const ecuadorFront12SlotDescription = {
  en: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · Galápagos stories · Front 12 slot.",
  es: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · historias Galápagos · slot Front 12."
};

/** Ecuador room · live lanes */
export type EcuadorRoomLane = "live";

export const ecuadorRoomBrand = {
  welcomeTitle: "Bienvenidos a Ecuador",
  tagline:
    "¡Dale pues, pilas! · ecuavoley en la cancha · fútbol de barrio · dominó ecuatoriano · Yo Nunca con la cuadra.",
  liveKicker: "Pistas en vivo — toca para abrir",
  cultureKicker: "Ecuador · ciudades y cultura",
  foodKicker: "Combustible ecuatoriano"
} as const;

/** Ecuador · culture panel items */
export type EcuadorCulturePanelItem = {
  label: string;
  imageUrl?: string;
};

export const ecuadorCulturePanel = {
  title: "Ecuador · ciudades y cultura",
  items: [
    {
      label: "Quito · centro histórico UNESCO",
      // Real Quito historic center photo (also used in Coast & City)
      imageUrl: "/ecuador-coast-city-3.jpg"
    },
    {
      label: "Guayaquil · puerto del Pacífico",
      imageUrl: "/ecuador-culture-guayaquil-pacific-port.png"
    },
    {
      label: "Cuenca · colonial andina",
      imageUrl: "/ecuador-culture-cuenca-andean-colonial.png"
    },
    {
      label: "Galápagos · naturaleza en vivo",
      imageUrl: "/ecuador-culture-galapagos-live-nature.png"
    },
    {
      label: "Otavalo · mercado artesanal",
      imageUrl: "/ecuador-culture-otavalo-artisan-market.png"
    },
    {
      label: "Amazonía · selva del Oriente",
      imageUrl: "/ecuador-culture-amazon-oriente-rainforest.png"
    }
  ] satisfies ReadonlyArray<EcuadorCulturePanelItem>
} as const;

export type EcuadorFoodPanelItem = {
  label: string;
  imageUrl: string;
};

export const ecuadorFoodPanel = {
  title: "Combustible ecuatoriano",
  items: [
    {
      label: "Encebollado — la sopa nacional",
      imageUrl: "/ecuador-food-encebollado.png"
    },
    {
      label: "Ceviche de camarón",
      imageUrl: "/ecuador-food-ceviche-camaron.png"
    },
    {
      label: "Llapingachos — tortillas de papa",
      imageUrl: "/ecuador-food-llapingachos.png"
    },
    {
      label: "Hornado — chancho asado con mote",
      imageUrl: "/ecuador-food-hornado.png"
    },
    {
      label: "Empanadas de viento",
      imageUrl: "/ecuador-food-empanadas-viento.png"
    },
    {
      label: "Bolón de verde",
      imageUrl: "/ecuador-food-bolon-verde.png"
    }
  ] satisfies ReadonlyArray<EcuadorFoodPanelItem>
} as const;

export type EcuadorRoomPlayableGame = "Ecuavoley" | "Dominó Ecuatoriano";
export type EcuadorRoomGameSelection = EcuadorRoomPlayableGame;

export type EcuadorIronFangStatPanel = {
  kicker: string;
  title: string;
  detail: string;
  cta?: string;
  statusLabel?: string;
  gameId?: EcuadorRoomPlayableGame;
  footballLane?: boolean;
  videoSrc?: string;
  posterSrc?: string;
};

export const ecuadorIronFangStatPanels: ReadonlyArray<EcuadorIronFangStatPanel> = [
  {
    kicker: "Deportes en vivo",
    title: "Fútbol LigaPro",
    detail: "Día de partido · clip real de La Tri · fixtures · chat de la sala",
    cta: "Abrir pista de deportes",
    statusLabel: "En vivo",
    footballLane: true,
    // Real Ecuador football (Enner Valencia goal · Qatar 2022 · Wikimedia CC-BY 4.0)
    videoSrc: "/ecuador-ligapro-football-live.mp4",
    posterSrc: "/ecuador-ligapro-football-poster.jpg"
  },
  {
    kicker: "Juego nacional",
    title: "Ecuavoley",
    detail: "Vóley a tres clásico · cancha real · simulador en vivo",
    cta: "Entrar a Ecuavoley",
    statusLabel: "En vivo",
    gameId: "Ecuavoley",
    // Real Ecuavoley match clip (trimmed from Ecuador court play)
    videoSrc: "/ecuador-ecuavoley-live.mp4",
    posterSrc: "/ecuador-ecuavoley-poster.jpg"
  },
  {
    kicker: "Original CFA",
    title: "Dominó Ecuatoriano",
    detail: "Reglas de bloque · doble seis · mesa real · juega vs IA",
    cta: "Abrir mesa de dominó",
    statusLabel: "En vivo",
    gameId: "Dominó Ecuatoriano",
    // Real domino table play clip for the panel loop
    videoSrc: "/ecuador-domino-live.mp4",
    posterSrc: "/ecuador-domino-poster.jpg"
  }
];

export type EcuadorLiveActivity = {
  id: string;
  lane: EcuadorRoomLane;
  emoji: string;
  title: string;
  city: string;
  blurb: string;
};

export const ecuadorLiveActivities: EcuadorLiveActivity[] = [
  {
    id: "quito-strike",
    lane: "live",
    emoji: "⚔️",
    title: "Quito strike",
    city: "Quito · Pichincha",
    blurb: "Andes arena duel · blade clash under Quito lights · crowd roar on every hit."
  },
  {
    id: "galapagos-clash",
    lane: "live",
    emoji: "🐢",
    title: "Galápagos island clash",
    city: "Santa Cruz · Galápagos",
    blurb: "Island stage duel · nature backdrop · crew vs the tide."
  }
];
