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
    "Free Fire · Ecuatorian FIFA nights",
    "Ecuavoley · dominoes · Yo Nunca talk-show",
    "Roblox viral challenges · LigaPro banter"
  ],
  activities: [
    "Galápagos live chat · Amazon river stories",
    "Cuenca craft walks · Guayaquil malecón nights",
    "Cumbia · salsa · festejo on the dance floor"
  ]
} as const;

/** Ecuador · dual lane · trend activity */
export const ecuadorDualLanePanel = {
  kicker: "Dual lane",
  title: "Ecuador · dual lane",
  detail: "Quito · Guayaquil · Andes-Pacific open"
} as const;

export const ecuadorTrendActivities: CountryTrendActivity[] = [
  {
    id: "ec-dual-lane",
    kicker: { en: ecuadorDualLanePanel.kicker },
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
      esEC: "Encebollado mañanero costeño",
      zh: "恩塞博利亚多清晨"
    },
    vibe: {
      en: "Fish stew · yuca · coastal buzz",
      es: "Caldo de pescado · yuca · costa viva",
      esEC: "Caldo de pescado · yuca · malecón activo",
      zh: "鱼汤 · 木薯 · 海岸热闹"
    }
  },
  {
    id: "ec-otavalo-market",
    label: {
      en: "Otavalo market day",
      es: "Mercado de Otavalo",
      esEC: "Día de mercado en Otavalo",
      zh: "奥塔瓦洛集市日"
    },
    vibe: {
      en: "Textiles · Andes crafts · barter chat",
      es: "Textiles · artesanía · charla andina",
      esEC: "Textiles · artesanía andina · regateo en plaza",
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
      esEC: "Banda en vivo · parejas bailando · plaza de Quito",
      zh: "现场乐队 · 双人舞 · 基多广场"
    }
  },
  {
    id: "ec-ecuavoley-sunday",
    label: {
      en: "Ecuavoley Sunday",
      es: "Ecuavoley domingo",
      esEC: "Ecuavoley dominical",
      zh: "周日厄瓜多尔排球"
    },
    vibe: {
      en: "Three-player volleyball · family court",
      es: "Vóley a tres · cancha familiar",
      esEC: "Vóley a tres · cancha de barrio · familia reunida",
      zh: "三人排球 · 家庭球场"
    }
  },
  {
    id: "ec-galapagos-stories",
    label: {
      en: "Galápagos & coast stories",
      es: "Historias Galápagos y costa",
      esEC: "Historias de Galápagos y la costa",
      zh: "加拉帕戈斯与海岸故事"
    },
    vibe: {
      en: "Sea lions · islands · Guayaquil malecón",
      es: "Lobos marinos · islas · malecón",
      esEC: "Lobos marinos · islas · malecón de Guayaquil",
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
  liveKicker: "Live lanes — tap to open",
  cultureKicker: "Ecuador · cities & culture",
  foodKicker: "Ecuadorian fuel"
} as const;

/** Ecuador · culture panel items */
export type EcuadorCulturePanelItem = {
  label: string;
  imageUrl?: string;
};

export const ecuadorCulturePanel = {
  title: "Ecuador · cities & culture",
  items: [
    {
      label: "Quito · UNESCO old town",
      imageUrl: "/ecuador-culture-quito-old-town.png"
    },
    {
      label: "Guayaquil · Pacific port",
      imageUrl: "/ecuador-culture-guayaquil-pacific-port.png"
    },
    {
      label: "Cuenca · Andean colonial",
      imageUrl: "/ecuador-culture-cuenca-andean-colonial.png"
    },
    {
      label: "Galápagos · live nature",
      imageUrl: "/ecuador-culture-galapagos-live-nature.png"
    },
    {
      label: "Otavalo · artisan market",
      imageUrl: "/ecuador-culture-otavalo-artisan-market.png"
    },
    {
      label: "Amazon · Oriente rainforest",
      imageUrl: "/ecuador-culture-amazon-oriente-rainforest.png"
    }
  ] satisfies ReadonlyArray<EcuadorCulturePanelItem>
} as const;

export type EcuadorFoodPanelItem = {
  label: string;
  imageUrl: string;
};

export const ecuadorFoodPanel = {
  title: "Ecuadorian fuel",
  items: [
    {
      label: "Encebollado — the national fish soup",
      imageUrl: "/ecuador-food-encebollado.png"
    },
    {
      label: "Ceviche de camarón",
      imageUrl: "/ecuador-food-ceviche-camaron.png"
    },
    {
      label: "Llapingachos — potato patties",
      imageUrl: "/ecuador-food-llapingachos.png"
    },
    {
      label: "Hornado — roast pork & mote",
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

export type EcuadorRoomPlayableGame = "Ecuavoley" | "Free Fire EC";
export type EcuadorRoomGameSelection = EcuadorRoomPlayableGame | "Ecuador Drive";

export type EcuadorIronFangStatPanel = {
  kicker: string;
  title: string;
  detail: string;
  gameId?: EcuadorRoomPlayableGame;
  freedomDrive?: boolean;
  videoSrc?: string;
  posterSrc?: string;
};

export const ecuadorIronFangStatPanels: ReadonlyArray<EcuadorIronFangStatPanel> = [
  {
    kicker: "Tendencia en vivo",
    title: "Ecuavoley dominical",
    detail: "Vóley a tres · cancha de barrio · familia reunida",
    gameId: "Ecuavoley",
    videoSrc: "/ecuador-arena-flash-live-clip.mp4",
    posterSrc: "/ecuador-room-indurama-team.png"
  },
  {
    kicker: "Tendencia en vivo",
    title: "Free Fire · sala ecuatoriana",
    detail: "El shooter móvil más viral de la región",
    gameId: "Free Fire EC",
    videoSrc: "/ecuador-live-free-fire-trend.mp4",
    posterSrc: "/ecuador-room-gaming-party.png"
  },
  {
    kicker: "Tendencia en vivo",
    title: "Ecuador Drive Simulator",
    detail: "Arena Ecuador Drive · Quito · Guayaquil · mundo abierto",
    freedomDrive: true,
    posterSrc: "/ecuador-room-gaming-party.png"
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
