import { findColombiaLiveVenue } from "@/lib/colombia-live-venues";

export type ColombiaCultureItem = {
  id: string;
  title: string;
  vibe: string;
  image: string;
};

export type ColombiaFoodItem = {
  id: string;
  name: string;
  vibe: string;
  image: string;
};

export const colombiaCulturePanelItems: ColombiaCultureItem[] = [
  {
    id: "medellin",
    title: "Noche de Medellín",
    vibe: "Luces de rooftop · reggaeton · ciudad de la eterna primavera",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=280&fit=crop"
  },
  {
    id: "bogota",
    title: "Vibra de Bogotá",
    vibe: "Skyline andino · cafés · cultura de madrugada",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=400&h=280&fit=crop"
  },
  {
    id: "cali",
    title: "Cultura salsa de Cali",
    vibe: "Pistas de baile · vientos · capital de la salsa",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=280&fit=crop"
  },
  {
    id: "music",
    title: "Música colombiana",
    vibe: "Salsa · reggaeton · vallenato",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=280&fit=crop"
  }
];

export const colombiaFoodPanelItems: ColombiaFoodItem[] = [
  {
    id: "arepas",
    name: "Arepas",
    vibe: "Maíz dorado · de la calle a la mesa",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=280&fit=crop"
  },
  {
    id: "empanadas",
    name: "Empanadas",
    vibe: "Crujientes · ají al lado",
    image: "/colombia-food-cali-empanadas.png"
  },
  {
    id: "bandeja",
    name: "Bandeja paisa",
    vibe: "Plato contundente · alma de montaña",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=280&fit=crop"
  },
  {
    id: "ajiaco",
    name: "Ajiaco",
    vibe: "Sopa bogotana · alcaparras · crema",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=280&fit=crop"
  },
  {
    id: "street",
    name: "Comida de calle colombiana",
    vibe: "Mercados de noche · buñuelos · arepas calientes",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=280&fit=crop"
  }
];

export type ColombiaLiveCreator = {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  previewImage: string;
  viewers: number;
  lane: string;
};

export type ColombiaLiveGift = {
  id: string;
  emoji: string;
  label: string;
};

export type ColombiaLiveChatMessage = {
  id: string;
  user: string;
  text: string;
  tone?: "system" | "user";
};

export const colombiaRoomLiveMeta = {
  title: "Colombia Room",
  badge: "EN VIVO",
  subtitle: "Romance al máximo · salsa lenta · mar caribe · comida con amor · un live por corazón"
};

export const colombiaRoomRomanticTagline =
  "Aquí el amor suena fuerte — como serenata bajo la luna, con sabor a café y sal de mar.";

export const colombiaRomanticLivePolicy = {
  headline: "Live romántico colombiano · respeto y pasión",
  giftsNote: "Rosa, serenata, bachata — regalos con cariño. Sin rankings, sin competencia."
} as const;

export type ColombiaRoomSlideCategory =
  | "nightlife"
  | "food"
  | "beach"
  | "park"
  | "horses"
  | "coffee"
  | "cartagena-umbrellas"
  | "cartagena-church"
  | "medellin-metro";

export type ColombiaRegionalFoodScene = {
  id: string;
  region: string;
  city: string;
  dish: string;
  image: string;
};

export type ColombiaNightlifeSlide = {
  category: "nightlife";
  title: string;
  desc: string;
  img: string;
  hotspots: { place: string; city: string; vibe: string }[];
};

export type ColombiaFoodSlide = {
  category: "food";
  title: string;
  desc: string;
  scenes: ColombiaRegionalFoodScene[];
};

export type ColombiaBeachSlide = {
  category: "beach";
  title: string;
  desc: string;
  img: string;
  beaches: { name: string; colour: string }[];
};

export type ColombiaParkSlide = {
  category: "park";
  title: string;
  desc: string;
  img: string;
  activities: string[];
};

export type ColombiaSpotlightSlide = {
  category:
    | "horses"
    | "coffee"
    | "cartagena-umbrellas"
    | "cartagena-church"
    | "medellin-metro";
  title: string;
  desc: string;
  img: string;
  highlights: { label: string; detail: string }[];
};

export type ColombiaRoomSlide =
  | ColombiaNightlifeSlide
  | ColombiaFoodSlide
  | ColombiaBeachSlide
  | ColombiaParkSlide
  | ColombiaSpotlightSlide;

export const colombiaRoomSlideCategoryLabels: Record<ColombiaRoomSlideCategory, string> = {
  nightlife: "Noches de pasión",
  food: "Favourite food",
  beach: "Beach",
  park: "Park life",
  horses: "Horse show",
  coffee: "#1 Coffee spot",
  "cartagena-umbrellas": "Cartagena · umbrellas",
  "cartagena-church": "Cartagena · church",
  "medellin-metro": "Medellín · metro"
};

/** Cartagena · young woman with friends · horses on the beach — live lane photo. */
export const colombiaHorseShowSpotlightImage = "/colombia-bg-horse-cartagena-friends.png";

/** Outdoor café · people dining with fresh coffee cups. */
export const colombiaCoffeeSpotlightImage = "/colombia-bg-coffee-couple.png";

export const colombiaCartagenaUmbrellasImage = "/colombia-slide-cartagena-umbrellas.png";
export const colombiaCartagenaChurchImage = "/colombia-slide-cartagena-church.png";
export const colombiaMedellinMetroImage = "/colombia-slide-medellin-metro.png";
export const colombiaComuna13PartyImage = "/colombia-slide-comuna13-party.png";

export const colombiaRoomSlides: ColombiaRoomSlide[] = [
  {
    category: "horses",
    title: "Feria de Manizales · el gran show ecuestre del país",
    desc: "El gran show ecuestre del país · caballos de paso · arenas llenas · pasión por el caballo",
    img: colombiaHorseShowSpotlightImage,
    highlights: [
      {
        label: "Manizales · Caldas",
        detail: "Feria de Manizales — el show ecuestre más grande de Colombia"
      },
      {
        label: "Caballo de paso fino",
        detail: "Concurso nacional de paso fino · elegancia · orgullo colombiano"
      },
      {
        label: "Energía de arena en vivo",
        detail: "Graderías llenas · música · desfile de caballos bajo las luces"
      },
      {
        label: "Amor por los caballos",
        detail: "Finca · pista · patio · Colombia ama sus caballos"
      }
    ]
  },
  {
    category: "coffee",
    title: "El #1 del café · Eje Cafetero",
    desc: "Gente comiendo con café · la taza número uno · aroma de montaña · café con amor",
    img: colombiaCoffeeSpotlightImage,
    highlights: [
      {
        label: "Salento · Pereira",
        detail: "El #1 del café · vista de finca · mesas llenas de gente"
      },
      {
        label: "Comiendo con café",
        detail: "Familias · parejas · charla lenta sobre tazas frescas"
      },
      {
        label: "Tinto premium",
        detail: "Recién servido · aroma caliente · el mejor café de Colombia"
      },
      {
        label: "Paisaje Cultural Cafetero",
        detail: "UNESCO Eje Cafetero · corazón de la cultura cafetera colombiana"
      }
    ]
  },
  {
    category: "cartagena-umbrellas",
    title: "Calle de las Sombrillas · Getsemaní",
    desc: "La ciudad de sombrillas de Cartagena · toldo arcoíris · callejón colorido",
    img: colombiaCartagenaUmbrellasImage,
    highlights: [
      {
        label: "Getsemaní · Callejón Angosto",
        detail: "La famosa calle de las sombrillas · sombra · color · foto obligada"
      },
      {
        label: "Ciudad de sombrillas",
        detail: "Cientos de sombrillas flotando · encanto caribeño"
      },
      {
        label: "Arte urbano y cafés",
        detail: "Murales de alas · banderas · bares · casco viejo a minutos"
      },
      {
        label: "Magia de Cartagena",
        detail: "Murallas coloniales · calor tropical · el paseo más colorido"
      }
    ]
  },
  {
    category: "cartagena-church",
    title: "Catedral de Santa Catalina · Cartagena",
    desc: "Iglesia histórica · torre amarilla · fe colonial en la ciudad vieja",
    img: colombiaCartagenaChurchImage,
    highlights: [
      {
        label: "Cartagena de Indias",
        detail: "Catedral de Santa Catalina de Alejandría · corazón de la ciudad amurallada"
      },
      {
        label: "Iglesia colonial",
        detail: "Fachada amarilla · campanario · siglos de historia caribeña"
      },
      {
        label: "Plaza y calles viejas",
        detail: "Adoquines · balcones · atardecer sobre el centro histórico"
      },
      {
        label: "Fe y cultura",
        detail: "Procesiones · arquitectura · alma caribeña de Colombia"
      }
    ]
  },
  {
    category: "medellin-metro",
    title: "Metro de Medellín · tren de la ciudad",
    desc: "Tren afuera · gente en el andén · blanco y verde · Línea B",
    img: colombiaMedellinMetroImage,
    highlights: [
      {
        label: "Afuera del tren",
        detail: "Exterior completo · gente esperando · Estadio · orgullo paisa"
      },
      {
        label: "Medellín · Antioquia",
        detail: "El único metro de Colombia · limpio · rápido · orgullo de ciudad"
      },
      {
        label: "Línea elevada",
        detail: "Corre sobre las calles · conecta barrios · vistas del valle"
      },
      {
        label: "Enlace Metrocable",
        detail: "Tren + cables · lomas · Comuna 13 · innovación"
      }
    ]
  },
  {
    category: "nightlife",
    title: "Colombia de noche",
    desc: "Noches de pasión — lo que Colombia vive cuando cae el sol",
    img: "/colombia-nightlife-real.png",
    hotspots: [
      { place: "Parque Lleras & terrazas", city: "Medellín", vibe: "Reggaeton romántico · luces · brindis en pareja" },
      { place: "Zona Rosa & jazz bars", city: "Bogotá", vibe: "Café con aroma · conversación lenta · skyline íntimo" },
      { place: "Juanchito · salsa en pareja", city: "Cali", vibe: "Abrazo cerrado · brass · sudor y sonrisa" },
      { place: "Getsemaní · champeta bajo luna", city: "Cartagena", vibe: "Calles de colores · tambores · manos unidas" },
      { place: "La 70 · rumba con alma", city: "Barranquilla", vibe: "Cumbia caliente · risa · corazón contento" }
    ]
  },
  {
    category: "food",
    title: "Platos que pegan en Colombia",
    desc: "Gente comiendo con alegría — cada plato con su nombre y su región",
    scenes: [
      {
        id: "medellin",
        region: "Antioquia",
        city: "Medellín",
        dish: "Bandeja Paisa",
        image: "/colombia-food-medellin-bandeja.png"
      },
      {
        id: "bogota",
        region: "Cundinamarca",
        city: "Bogotá",
        dish: "Ajiaco",
        image: "/colombia-food-bogota-ajiaco.png"
      },
      {
        id: "cali",
        region: "Valle del Cauca",
        city: "Cali",
        dish: "Empanadas",
        image: "/colombia-food-cali-empanadas.png"
      },
      {
        id: "cartagena",
        region: "Bolívar",
        city: "Cartagena",
        dish: "Arepa de Huevo",
        image: "/colombia-food-cartagena-arepa.png"
      },
      {
        id: "bucaramanga",
        region: "Santander",
        city: "Bucaramanga",
        dish: "Chicharrón Santandereano",
        image: "/colombia-food-bucaramanga-chicharron.png"
      },
      {
        id: "pereira",
        region: "Eje Cafetero",
        city: "Pereira",
        dish: "Trucha del Eje",
        image: "/colombia-food-pereira-trucha.png"
      }
    ]
  },
  {
    category: "beach",
    title: "Playas de color caribeño",
    desc: "Mar de colores · gente feliz · sol · amor a la orilla — todo con respeto",
    img: "/colombia-beach-happy.png",
    beaches: [
      { name: "Bocagrande · Cartagena", colour: "Arena coral · brisa de ciudad" },
      { name: "San Andrés · Johnny Cay", colour: "Mar de siete colores · sombra de palma" },
      { name: "Taganga · Santa Marta", colour: "Bahía de pescadores · botes al atardecer" },
      { name: "Palomino · La Guajira", colour: "Dunas doradas · oleaje suave" },
      { name: "Playa Blanca · Barú", colour: "Arena blanca · agua de cristal · paseos en lancha" }
    ]
  },
  {
    category: "park",
    title: "Vida de parque en Bogotá",
    desc: "Gente bailando · voleibol · picnic · círculos con parlante en el verde",
    img: "/colombia-park-people.png",
    activities: ["Salsa en el césped", "Voleibol y fútbol", "Mantas de picnic y buñuelos", "Ciclismo y paseos con perro"]
  }
];

export const colombiaRoomSlideMs = 5500;

export const colombiaLiveDurationSeconds = 3 * 60 * 60;

export const colombiaLiveCreators: ColombiaLiveCreator[] = [
  {
    id: "valentina",
    name: "Valentina R.",
    username: "@valentina.med",
    profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    previewImage: "/colombia-nightlife-real.png",
    viewers: 1842,
    lane: "Reggaeton · Medellín"
  },
  {
    id: "camila",
    name: "Camila S.",
    username: "@camila.bogota",
    profileImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    previewImage: "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=1200&h=675&fit=crop",
    viewers: 956,
    lane: "Salsa · Bogotá"
  },
  {
    id: "isabella",
    name: "Isabella Morales",
    username: "@isa.bogota",
    profileImage: "/colombia-live-isabella-morales-stream-v2.jpg",
    /** Live stream portrait · Live 1 talk topic only (different from Lucia Live 2) */
    previewImage: "/colombia-live-isabella-morales-stream-v2.jpg",
    viewers: 1204,
    lane: "Reggaeton · Bogotá"
  },
  {
    id: "mariana",
    name: "Mariana L.",
    username: "@mariana.cartagena",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    previewImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=675&fit=crop",
    viewers: 673,
    lane: "Champeta · Cartagena"
  },
  {
    id: "sofia",
    name: "Sofia P.",
    username: "@sofia.park",
    profileImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    previewImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=675&fit=crop",
    viewers: 2110,
    lane: "Live DJ · Barranquilla"
  },
  {
    id: "lucia",
    name: "Lucia T.",
    username: "@lucia.night",
    profileImage: "/colombia-live-lucia-t-stream.jpg",
    /** Live stream portrait · used on Live 2 real-time venue slot */
    previewImage: "/colombia-live-lucia-t-stream.jpg",
    viewers: 488,
    lane: "Cumbia · Pereira"
  }
];

export const colombiaLiveGifts: ColombiaLiveGift[] = [
  { id: "rose", emoji: "🌹", label: "Rosa" },
  { id: "kiss", emoji: "💋", label: "Beso" },
  { id: "serenade", emoji: "🎶", label: "Serenata" },
  { id: "dance", emoji: "💃", label: "Bachata" },
  { id: "amor", emoji: "💕", label: "Amor" }
];

export const colombiaLiveSeedChat: ColombiaLiveChatMessage[] = [
  { id: "m1", user: "Guest_482", text: "Mi corazón — Medellín romántico esta noche 🌹", tone: "user" },
  { id: "m2", user: "Guest_109", text: "Qué vibra tan bella, puro amor colombiano", tone: "user" },
  { id: "m3", user: "System", text: "Bienvenido · Colombia Room · pasión y respeto.", tone: "system" },
  { id: "m4", user: "Guest_771", text: "Serenata mode ON 💕", tone: "user" }
];

export function formatLiveCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return String(value);
}

export function formatLiveTimer(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function findColombiaLiveCreator(id: string) {
  return colombiaLiveCreators.find((creator) => creator.id === id) ?? null;
}

export const colombiaLiveFeaturedCreator =
  colombiaLiveCreators.find((creator) => creator.id === "isabella") ?? colombiaLiveCreators[0]!;

const colombiaTopicSlotCreators: Record<string, string> = {
  "co-talk-country": "isabella",
  "co-talk-football": "sofia",
  "co-talk-menu": "camila",
  "co-talk-university": "isabella",
  "co-talk-music": "mariana",
  "co-talk-city": "lucia",
  "co-talk-qa": "isabella"
};

const colombiaTopicPreviewImages: Record<string, string> = {
  // Isabella Morales Live 1 talk topics · her stream portrait only
  "co-talk-country": "/colombia-live-isabella-morales-stream-v2.jpg",
  "co-talk-football": "/colombia-bg-football-match.png",
  "co-talk-menu": "/colombia-food-medellin-bandeja.png",
  "co-talk-university": "/colombia-live-isabella-morales-stream-v2.jpg",
  "co-talk-music": "/colombia-nightlife-real.png",
  "co-talk-city": "/colombia-bg-coffee-couple.png",
  "co-talk-qa": "/colombia-live-isabella-morales-stream-v2.jpg"
};

const colombiaVenueSlotCreators: Record<string, string> = {
  "co-day-coffee": "lucia",
  "co-day-ciclovia": "sofia",
  "co-day-beach": "mariana",
  "co-day-salsa": "isabella",
  "co-day-food": "camila",
  "co-day-cerro": "isabella",
  "co-day-cartagena": "mariana",
  "co-day-flowers": "camila",
  "co-day-guatape": "isabella",
  "co-day-rosario": "mariana",
  "co-day-horse": "lucia",
  "co-day-museum": "isabella"
};

export function getColombiaTopicLiveSlot(topicId: string): ColombiaLiveCreator {
  const creatorId = colombiaTopicSlotCreators[topicId] ?? "isabella";
  const creator = colombiaLiveCreators.find((entry) => entry.id === creatorId) ?? colombiaLiveCreators[0]!;
  // Isabella Live 1 always shows her live-stream portrait (not scenic stock)
  const preview =
    creatorId === "isabella"
      ? creator.previewImage
      : (colombiaTopicPreviewImages[topicId] ?? creator.previewImage);

  return {
    ...creator,
    previewImage: preview
  };
}

export function getColombiaVenueLiveSlot(venueId: string): ColombiaLiveCreator {
  const venue = findColombiaLiveVenue(venueId);
  const creatorId = colombiaVenueSlotCreators[venueId] ?? "camila";
  const creator = colombiaLiveCreators.find((entry) => entry.id === creatorId) ?? colombiaLiveCreators[1]!;
  // Lucia Live 2 always shows her live-stream portrait (not scenic venue stock)
  const preview =
    creatorId === "lucia" ? creator.previewImage : venue.previewImage;

  return {
    ...creator,
    previewImage: preview
  };
}

/** @deprecated Use getColombiaTopicLiveSlot + getColombiaVenueLiveSlot */
export function getColombiaTopicLiveSlotCreators(topicId: string) {
  return [getColombiaTopicLiveSlot(topicId), getColombiaVenueLiveSlot("co-day-coffee")];
}

export type ColombiaRoomBackgroundSlide = {
  id: string;
  label: string;
  image: string;
  focus?: string;
};

/** Full-bleed background — horse, coffee, Cartagena & Medellín landmarks, plus original room scenes. */
export const colombiaRoomBackgroundSlides: ColombiaRoomBackgroundSlide[] = [
  {
    id: "horse-backyard-live",
    label: "Cartagena · girl & friends · horses on the beach",
    image: colombiaHorseShowSpotlightImage,
    focus: "center 42%"
  },
  {
    id: "coffee-spot-number-one",
    label: "#1 coffee spot · people dining",
    image: colombiaCoffeeSpotlightImage,
    focus: "center 38%"
  },
  {
    id: "cartagena-umbrellas",
    label: "Cartagena · Calle de las Sombrillas",
    image: colombiaCartagenaUmbrellasImage,
    focus: "center 40%"
  },
  {
    id: "cartagena-church",
    label: "Cartagena · Catedral de Santa Catalina",
    image: colombiaCartagenaChurchImage,
    focus: "center 45%"
  },
  {
    id: "medellin-metro",
    label: "Medellín · metro · crowd & train outside",
    image: colombiaMedellinMetroImage,
    focus: "center 45%"
  },
  {
    id: "comuna-13-party",
    label: "",
    image: colombiaComuna13PartyImage,
    focus: "62% 45%"
  },
  {
    id: "chess-waterfalls",
    label: "",
    image: "/colombia-bg-chess-waterfalls.png",
    focus: "center 40%"
  },
  {
    id: "paragliding-city",
    label: "",
    image: "/colombia-bg-paragliding-crowd.png",
    focus: "center 38%"
  },
  {
    id: "football-match",
    label: "",
    image: "/colombia-bg-football-match.png",
    focus: "center 35%"
  }
];
