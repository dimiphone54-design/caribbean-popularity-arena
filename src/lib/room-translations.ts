import type { RoomLocaleId, ContentLocaleId } from "@/lib/room-locale";
import { isSpanishContentLocale, resolveContentLocale } from "@/lib/room-locale";

type TopicCopy = { label: string; blurb: string };

export type RoomTranslationBundle = {
  localePickerLabel: string;
  localePickerHint: string;
  intlSuiteName: string;
  intlSuiteDescription: string;
  countriesOwnRooms: string;
  intlSuiteOpenBadge: string;
  intlSuiteMenuHint: string;
  intlSuiteHoverRooms: string;
  intlSuiteClickCountry: string;
  intlSuiteOpenFull: string;
  intlSuiteScrollTitle: string;
  intlSuiteScrollHint: string;
  intlSuiteEnterRoom: string;
  intlSuiteEnterRoomOneClick: string;
  intlSuiteRoomOpen: string;
  intlSuiteComingSoon: string;
  gateOpening: string;
  gateLiveUnlocked: string;
  gateEnterLive: string;
  gateSingleStream: string;
  gateActivityPrice: string;
  gateButtonSuffix: string;
  gateDefaultFootnote: string;
  gateTimeLeft: string;
  colombia: {
    eyebrow: string;
    title: string;
    tagline: string;
    subtitle: string;
    accessLive: string;
    topicsEyebrow: string;
    topicsSubline: string;
    eliteBadge: string;
    choose: string;
    chosen: string;
    tonightTopicKicker: string;
    tonightTopicSession: string;
    liveOnAir: string;
    venuesEyebrow: string;
    venuesSubline: string;
    slotTopicTitle: string;
    slotVenueTitle: string;
    slotTopicCaption: string;
    slotVenueCaption: string;
    gatePassion: string;
    gateTitle: string;
    gatePrice: string;
    gateButton: string;
    gateFootnote: string;
    topics: Record<string, TopicCopy>;
    venues: Record<string, TopicCopy>;
  };
  uk: {
    cotswoldsTagline: string;
    cotswoldsDescription: string;
    cotswoldsMuseumLabel: string;
    cotswoldsSeasonsLive: string;
    footballLadsTagline: string;
    footballLadsDescription: string;
    footballMatchDay: string;
    footballSquadLabel: string;
  };
  intlRooms: Record<string, { description: string }>;
  intlCountryTaglines: Record<string, string>;
};

const intlRoomDescriptionsEs: Record<string, { description: string }> = {
  "uk-flag-cotswolds": {
    description: "Película en cuatro parques · bienvenida museo · nieve · drones · reloj UK en vivo."
  },
  "football-lads": {
    description: "Domingo · banter de pub · prompts de partido · energía fútbol UK."
  },
  "colombia-room": {
    description: "Arepas · empanadas · Medellín · Bogotá · reggaeton · salsa · vallenato."
  },
  "ecuador-room": {
    description: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · historias Galápagos · actividades en vivo."
  },
  "ecuador-front12-slot": {
    description: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · historias Galápagos · slot Front 12."
  },
  "japan-room": {
    description: "Tokio · duelo kendo en vivo · dos luchadores · espada · ráfaga de llama · juegos de variedades."
  },
  "china-room": {
    description: "Shanghái · Wushu Duilian · dos artistas marciales · espada y bastón coreografiados · noche talk-show mandarín."
  }
};

const intlRoomDescriptionsEn: Record<string, { description: string }> = {
  "uk-flag-cotswolds": {
    description: "Four-quarter park movie slide · museum welcome · snow · drones · live UK clock."
  },
  "football-lads": {
    description: "Sunday league squad · pub banter · men's match-day prompts · UK football energy."
  },
  "colombia-room": {
    description: "Arepas · empanadas · Medellín · Bogotá · reggaeton · salsa · vallenato."
  },
  "ecuador-room": {
    description: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · Galápagos stories · live activities."
  },
  "ecuador-front12-slot": {
    description: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · Galápagos stories · Front 12 slot."
  },
  "japan-room": {
    description: "JAPAN live stage · two kendoka duel · sword clash · flame burst · variety talk-show games lane."
  },
  "china-room": {
    description: "上海直播舞台 · 武术对练 · 两位武者 · 编排剑棍对练 · 普通话脱口秀游戏之夜"
  }
};

const intlCountryTaglinesEs: Record<string, string> = {
  uk: "Parques UK · fútbol · juegos británicos",
  colombia: "Comida colombiana · ciudades · música · cultura",
  lithuania: "Vilnius · arte · cultura báltica",
  ecuador: "Comida ecuatoriana · cultura andina · baile · juegos · ecuavoley",
  trinidad: "Soca · Puerto España · energía Carnival",
  jamaica: "Dancehall · Kingston · vibras isleñas",
  venezuela: "Caracas · música · fuego latino",
  poland: "Varsovia · moda · estilo polaco",
  tunisia: "Túnez · cultura · árabe · francés",
  guyana: "Georgetown · comedia · mezcla caribeña",
  china: "Shanghái · contenido · mandarín en vivo",
  japan: "Tokio · estilo de vida · cultura japonesa"
};

const intlCountryTaglinesEn: Record<string, string> = {
  uk: "UK parks · football · British games",
  colombia: "Colombian food · cities · music · culture",
  lithuania: "Vilnius · art · Baltic culture",
  ecuador: "Ecuadorian food · Andes culture · dance · games · ecuavoley",
  trinidad: "Soca · Port of Spain · Carnival energy",
  jamaica: "Dancehall · Kingston · island vibes",
  venezuela: "Caracas · music · Latin fire",
  poland: "Warsaw · fashion · Polish style",
  tunisia: "Tunis · culture · Arabic · French",
  guyana: "Georgetown · comedy · Caribbean mix",
  china: "Shanghai · content · Mandarin live",
  japan: "JAPAN · lifestyle · Japanese culture"
};

const colombiaTopicsEsCO: Record<string, TopicCopy> = {
  "co-talk-country": {
    label: "Habla de tu país",
    blurb: "De dónde eres · qué extrañas · orgullo · historias de casa"
  },
  "co-talk-football": {
    label: "Tu equipo de fútbol favorito",
    blurb: "Nacional · Millonarios · tu club · banter · a quién apoyas"
  },
  "co-talk-menu": {
    label: "Menú de esta noche",
    blurb: "Qué se cocina · arepas · bandeja · cena · comida con amor"
  },
  "co-talk-university": {
    label: "Universidad · vida campus",
    blurb: "Clases · amigos · campus · estudio · temas de asistente"
  },
  "co-talk-music": {
    label: "Música esta noche",
    blurb: "Reggaeton · salsa · vallenato · tu playlist"
  },
  "co-talk-city": {
    label: "Mi ciudad · historia local",
    blurb: "Bogotá · Medellín · Cali · tu barrio · joyas escondidas"
  },
  "co-talk-qa": {
    label: "Pregúntame lo que quieras",
    blurb: "Q&A abierto · charla con la sala · simple · sin guion"
  }
};

const colombiaVenuesEsCO: Record<string, TopicCopy> = {
  "co-day-coffee": {
    label: "Café mañanero · Eje Cafetero",
    blurb: "Tour finca · taza fresca · vista montaña · charla a la sombra"
  },
  "co-day-ciclovia": {
    label: "Ciclovía domingo · Bogotá",
    blurb: "Bicis en calles cerradas · parques · fruta · energía de ciudad"
  },
  "co-day-beach": {
    label: "Día de playa · Cartagena / Barú",
    blurb: "Arena blanca · mar tibio · lancha · coco y risas"
  },
  "co-day-salsa": {
    label: "Clase de salsa · Cali",
    blurb: "Piso de baile de día · sudor · sonrisas · capital de la salsa"
  },
  "co-day-food": {
    label: "Ruta de comida callejera",
    blurb: "Arepas · empanadas · ajiaco · sabores de cada barrio"
  },
  "co-day-cerro": {
    label: "Subida al cerro · Monserrate / Medellín",
    blurb: "Caminata · teleférico · gran vista · café arriba"
  },
  "co-day-cartagena": {
    label: "Paseo ciudad vieja · Cartagena",
    blurb: "Muros de colores · balcones · helado · historia al sol"
  },
  "co-day-flowers": {
    label: "Mercado de flores · Paloquemao",
    blurb: "Fruta fresca · flores · aromas · Bogotá real de mañana"
  },
  "co-day-guatape": {
    label: "Excursión Guatapé",
    blurb: "Pueblo colorido · lago · Piedra del Peñol · lancha y fotos"
  },
  "co-day-rosario": {
    label: "Lancha Islas del Rosario",
    blurb: "Snorkel · agua turquesa · almuerzo de pescado · escape caribe"
  },
  "co-day-horse": {
    label: "Caballos · amor por los caballos",
    blurb: "En vivo desde su patio · su caballo en la pista · mostrar su caballo · tiempo real"
  },
  "co-day-museum": {
    label: "Museo del Oro · cultura Bogotá",
    blurb: "Oro precolombino · arte · mañana fresca · cultura de ciudad"
  }
};

const colombiaTopicsEn: Record<string, TopicCopy> = {
  "co-talk-country": {
    label: "Talk about your country",
    blurb: "Where you're from · what you miss · proud moments · home stories"
  },
  "co-talk-football": {
    label: "Favourite football team",
    blurb: "Nacional · Millonarios · your club · match-day banter · who you support"
  },
  "co-talk-menu": {
    label: "Tonight's menu",
    blurb: "What's cooking · arepas · bandeja · dinner plans · food with love"
  },
  "co-talk-university": {
    label: "University · campus chat",
    blurb: "Classes · friends · campus life · study tips · assistant topics"
  },
  "co-talk-music": {
    label: "Music tonight",
    blurb: "Reggaeton · salsa · vallenato · what's on your playlist"
  },
  "co-talk-city": {
    label: "My city · local story",
    blurb: "Bogotá · Medellín · Cali · your barrio · hidden gems"
  },
  "co-talk-qa": {
    label: "Ask me anything",
    blurb: "Open Q&A · chat with the room · simple talk · no script"
  }
};

const colombiaVenuesEn: Record<string, TopicCopy> = {
  "co-day-coffee": {
    label: "Coffee morning · Eje Cafetero",
    blurb: "Farm tour · fresh cup · mountain views · slow talk in the shade"
  },
  "co-day-ciclovia": {
    label: "Sunday ciclovía · Bogotá",
    blurb: "Bikes on closed streets · parks · fruit stands · city energy in the sun"
  },
  "co-day-beach": {
    label: "Beach day · Cartagena / Barú",
    blurb: "White sand · warm sea · boat ride · coconut and laughter"
  },
  "co-day-salsa": {
    label: "Salsa class · Cali",
    blurb: "Daytime dance floor · sweat · smiles · Colombia's salsa capital"
  },
  "co-day-food": {
    label: "Street food crawl",
    blurb: "Arepas · empanadas · ajiaco · tasting every barrio flavour"
  },
  "co-day-cerro": {
    label: "Cerro hike · Monserrate / Medellín",
    blurb: "Hill climb · cable car · big view · coffee at the top"
  },
  "co-day-cartagena": {
    label: "Old city walk · Cartagena",
    blurb: "Colourful walls · balconies · ice cream · history in the heat"
  },
  "co-day-flowers": {
    label: "Flower market · Paloquemao",
    blurb: "Fresh fruit · flowers · smells · real Bogotá morning life"
  },
  "co-day-guatape": {
    label: "Guatapé day trip",
    blurb: "Colourful town · lake · Piedra del Peñol · boat and photos"
  },
  "co-day-rosario": {
    label: "Rosario Islands boat",
    blurb: "Snorkel · turquoise water · fish lunch · Caribbean day escape"
  },
  "co-day-horse": {
    label: "Horses · they love horses",
    blurb: "Live from her backyard · horse on the track · show your horse · real time"
  },
  "co-day-museum": {
    label: "Gold Museum · Bogotá culture",
    blurb: "Pre-Colombian gold · art · cool morning · city culture"
  }
};

const bundles: Record<ContentLocaleId, RoomTranslationBundle> = {
  "es-CO": {
    localePickerLabel: "Tu idioma · país",
    localePickerHint: "Auto · cambia cuando quieras",
    intlSuiteName: "International SUITE",
    intlSuiteDescription:
      "Desliza por países — salas Colombia · UK · Japón · China abiertas adentro. Elige tu sala y entra.",
    countriesOwnRooms: "Países · salas propias adentro",
    intlSuiteOpenBadge: "Internacional · abierto",
    intlSuiteMenuHint:
      "Salas Colombia · UK · Japón · China aquí · otros países son slots Front 12 en inicio",
    intlSuiteHoverRooms: "Pasa el cursor · ver salas",
    intlSuiteClickCountry: "Clic · abrir país",
    intlSuiteOpenFull: "Abrir International SUITE completo →",
    intlSuiteScrollTitle: "Deslizador de países · un clic abre cada país",
    intlSuiteScrollHint: "Desliza · haz clic en un país para ver cultura, comida, juegos y salas.",
    intlSuiteEnterRoom: "Entrar sala",
    intlSuiteEnterRoomOneClick: "ENTRAR SALA",
    intlSuiteRoomOpen: "Sala abierta",
    intlSuiteComingSoon: "Pronto",
    gateOpening: "Abriendo regalo…",
    gateLiveUnlocked: "juegos y talk-show desbloqueados",
    gateEnterLive: "Entra · juegos y actividades en vivo",
    gateSingleStream: "juegos · talk-show · charla divertida",
    gateActivityPrice:
      "Regalo worldwide · 3 horas · juegos · talk-show · una lane por país",
    gateButtonSuffix: "juegos y talk-show",
    gateDefaultFootnote:
      "Abajo ves preview gratis. Juegos, talk-show y actividades se abren después del regalo (demo aquí · WiPay pronto).",
    gateTimeLeft: "restante",
    colombia: {
      eyebrow: "Pasión colombiana · amor en vivo",
      title: "Colombia Room",
      tagline:
        "Aquí el amor suena fuerte — como serenata bajo la luna, con sabor a café y sal de mar.",
      subtitle: "Romance al máximo · salsa lenta · mar caribe · comida con amor · un live por corazón",
      accessLive: "· en vivo con amor ·",
      topicsEyebrow: "Live 1 · temas simples de charla",
      topicsSubline: "Desliza · país · fútbol · menú · universidad · elige uno bajo su slot.",
      eliteBadge: "Elite · 2028",
      choose: "Elegir",
      chosen: "Elegido",
      tonightTopicKicker: "Esta noche en vivo",
      tonightTopicSession: "3 horas · ella eligió · todos ven estos dos lives",
      liveOnAir: "En vivo ahora",
      venuesEyebrow: "Live 2 · Colombia de día",
      venuesSubline: "Desliza · 12 planes favoritos de día · dónde está en vivo.",
      slotTopicTitle: "Live 1 · tema de charla",
      slotVenueTitle: "Live 2 · en vivo en tiempo real",
      slotTopicCaption: "Charla simple · país · fútbol · menú · universidad",
      slotVenueCaption: "En vivo desde este plan favorito de día",
      gatePassion: "· un solo live · con pasión",
      gateTitle: "Entra al live",
      gatePrice: "Regalo worldwide · 3 horas · un live por país en nuestra plataforma.",
      gateButton: "entrar con amor",
      gateFootnote:
        "Abajo puedes ver las slides con amor — el live se abre después del regalo (demo aquí · WiPay pronto).",
      topics: colombiaTopicsEsCO,
      venues: colombiaVenuesEsCO
    },
    uk: {
      cotswoldsTagline: "Parques UK · nieve · drones · reloj en vivo",
      cotswoldsDescription:
        "¡Eh, ven! No te quedes en la puerta — entra y mira todo con calma. Preparamos algo bonito para ti y nos alegra que hayas pasado. Ponte cómodo y disfruta la vista.",
      cotswoldsMuseumLabel: "🪵 ¿Todo bien, mi pato? Pasa adentro.",
      cotswoldsSeasonsLive: "🌸 Primavera · ☀️ Verano · 🍁 Otoño · ❄️ Invierno · En vivo",
      footballLadsTagline: "Domingo · banter · fútbol · energía UK",
      footballLadsDescription:
        "Salón de football lads — banter de domingo, energía de cinco contra cinco, táctica de pub y vibes de partido UK conectadas al arena.",
      footballMatchDay: "Día de partido · En vivo",
      footballSquadLabel: "Plantilla // lads // regiones UK"
    },
    intlRooms: intlRoomDescriptionsEs,
    intlCountryTaglines: intlCountryTaglinesEs
  },
  es: {
    localePickerLabel: "Tu idioma · país",
    localePickerHint: "Auto · cambia cuando quieras",
    intlSuiteName: "International SUITE",
    intlSuiteDescription:
      "Recorre países — salas Colombia · UK · Japón · China abiertas adentro. Elige tu sala y entra.",
    countriesOwnRooms: "Países · salas propias",
    intlSuiteOpenBadge: "Internacional · abierto",
    intlSuiteMenuHint:
      "Salas Colombia · UK · Japón · China aquí · otros países son slots Front 12 en inicio",
    intlSuiteHoverRooms: "Pasa el cursor · ver salas",
    intlSuiteClickCountry: "Clic · abrir país",
    intlSuiteOpenFull: "Abrir International SUITE completo →",
    intlSuiteScrollTitle: "Deslizador de países · un clic abre cada país",
    intlSuiteScrollHint: "Desliza · haz clic en un país para ver cultura, comida, juegos y salas.",
    intlSuiteEnterRoom: "Entrar sala",
    intlSuiteEnterRoomOneClick: "ENTRAR SALA",
    intlSuiteRoomOpen: "Sala abierta",
    intlSuiteComingSoon: "Pronto",
    gateOpening: "Abriendo regalo…",
    gateLiveUnlocked: "juegos y talk-show desbloqueados",
    gateEnterLive: "Entra · juegos y actividades en vivo",
    gateSingleStream: "juegos · talk-show · charla divertida",
    gateActivityPrice:
      "Regalo worldwide · 3 horas · juegos · talk-show · una lane por país",
    gateButtonSuffix: "juegos y talk-show",
    gateDefaultFootnote:
      "Abajo ves preview gratis. Juegos, talk-show y actividades se abren después del regalo (demo aquí · WiPay pronto).",
    gateTimeLeft: "restante",
    colombia: {
      eyebrow: "Pasión colombiana · amor en vivo",
      title: "Sala Colombia",
      tagline:
        "Aquí el amor suena fuerte — como serenata bajo la luna, con sabor a café y sal de mar.",
      subtitle: "Romance al máximo · salsa · mar caribe · comida con amor · un live por corazón",
      accessLive: "· en vivo con amor ·",
      topicsEyebrow: "Live 1 · temas simples de charla",
      topicsSubline: "Desliza · país · fútbol · menú · universidad · elige uno bajo su slot.",
      eliteBadge: "Elite · 2028",
      choose: "Elegir",
      chosen: "Elegida",
      tonightTopicKicker: "Esta noche en vivo",
      tonightTopicSession: "3 horas · ella eligió · todos ven estos dos lives",
      liveOnAir: "En vivo ahora",
      venuesEyebrow: "Live 2 · Colombia de día",
      venuesSubline: "Desliza · 12 planes favoritos de día · dónde está en vivo.",
      slotTopicTitle: "Live 1 · tema de charla",
      slotVenueTitle: "Live 2 · en vivo en tiempo real",
      slotTopicCaption: "Charla simple · país · fútbol · menú · universidad",
      slotVenueCaption: "En vivo desde este plan favorito de día",
      gatePassion: "· un solo live · con pasión",
      gateTitle: "Entra al live",
      gatePrice: "Regalo worldwide · 3 horas · un live por país en nuestra plataforma.",
      gateButton: "entrar con amor",
      gateFootnote:
        "Abajo puedes ver las slides — el live se abre después del regalo (demo · WiPay pronto).",
      topics: colombiaTopicsEsCO,
      venues: colombiaVenuesEsCO
    },
    uk: {
      cotswoldsTagline: "Parques UK · nieve · drones · reloj en vivo",
      cotswoldsDescription:
        "¡Eh, ven! No te quedes en la puerta — entra y mira todo. Preparamos algo bonito para ti. Ponte cómodo y disfruta la vista.",
      cotswoldsMuseumLabel: "🪵 ¿Todo bien? Pasa adentro.",
      cotswoldsSeasonsLive: "🌸 Primavera · ☀️ Verano · 🍁 Otoño · ❄️ Invierno · En vivo",
      footballLadsTagline: "Domingo · banter · fútbol · energía UK",
      footballLadsDescription:
        "Salón de football lads — banter de domingo, cinco contra cinco, táctica de pub y vibes de partido UK.",
      footballMatchDay: "Día de partido · En vivo",
      footballSquadLabel: "Plantilla // lads // regiones UK"
    },
    intlRooms: intlRoomDescriptionsEs,
    intlCountryTaglines: intlCountryTaglinesEs
  },
  en: {
    localePickerLabel: "Your language · country",
    localePickerHint: "Auto-detected · change anytime",
    intlSuiteName: "International SUITE",
    intlSuiteDescription:
      "Slide through countries — Colombia · UK · Japan · China rooms open inside. Pick your room and enter.",
    countriesOwnRooms: "Choose a Country. Live the Culture",
    intlSuiteOpenBadge: "International open",
    intlSuiteMenuHint:
      "Colombia + UK + Japan + China rooms open here · other countries are Front 12 slots on homepage",
    intlSuiteHoverRooms: "Hover · see rooms",
    intlSuiteClickCountry: "Click · open country",
    intlSuiteOpenFull: "Open full International SUITE →",
    intlSuiteScrollTitle: "Country scroll · one click opens each country",
    intlSuiteScrollHint: "Swipe sideways · click a country for culture, food, games, and rooms.",
    intlSuiteEnterRoom: "Enter room",
    intlSuiteEnterRoomOneClick: "ENTER ROOM · 1 click enter",
    intlSuiteRoomOpen: "Room open",
    intlSuiteComingSoon: "Coming soon",
    gateOpening: "Opening gift…",
    gateLiveUnlocked: "games & talk-show unlocked",
    gateEnterLive: "Join live games & activities",
    gateSingleStream: "games · talk-show · funny banter",
    gateActivityPrice:
      "Gift worldwide · 3 hours · games · talk-show · one lane per country",
    gateButtonSuffix: "games & talk-show",
    gateDefaultFootnote:
      "Browse preview lanes below free. Games, talk-show & activities open after your gift (demo here — WiPay when keys are live).",
    gateTimeLeft: "left",
    colombia: {
      eyebrow: "Colombian passion · love live",
      title: "Colombia Room",
      tagline:
        "Here love sounds loud — like a serenade under the moon, with coffee taste and sea salt.",
      subtitle: "Maximum romance · slow salsa · Caribbean sea · food with love · one live per heart",
      accessLive: "· live with love ·",
      topicsEyebrow: "Live 1 · simple talk topics",
      topicsSubline: "Scroll · country · football · menu · university · pick one under her slot.",
      eliteBadge: "Elite · 2028",
      choose: "Choose",
      chosen: "Chosen",
      tonightTopicKicker: "Live tonight",
      tonightTopicSession: "3 hours · she chose · everyone watches both lanes",
      liveOnAir: "Live now",
      venuesEyebrow: "Live 2 · Colombia by day",
      venuesSubline: "Scroll · 12 favourite day plans · where she is live.",
      slotTopicTitle: "Live 1 · talk topic",
      slotVenueTitle: "Live 2 · being live in real time",
      slotTopicCaption: "Simple chat · country · football · menu · university",
      slotVenueCaption: "Live from this favourite Colombia day plan",
      gatePassion: "· single live · with passion",
      gateTitle: "Enter the live",
      gatePrice: "Gift worldwide · 3 hours · one live per country on our platform.",
      gateButton: "enter with love",
      gateFootnote:
        "Browse the slides below free — live opens after your gift (demo here · WiPay soon).",
      topics: colombiaTopicsEn,
      venues: colombiaVenuesEn
    },
    uk: {
      cotswoldsTagline: "UK parks · snow · drones · live clock",
      cotswoldsDescription:
        "Eh up, bab! Don't just stand in the doorway—get stuck in and have a proper look about. We've put on a mint display for you, and we're absolutely chuffed you've dropped by. Make yourself comfortable and enjoy the view!",
      cotswoldsMuseumLabel: "🪵 ORITE, MI DUCK? GET YOURSELF IN.",
      cotswoldsSeasonsLive: "🌸 Spring · ☀️ Summer · 🍁 Autumn · ❄️ Winter · Live",
      footballLadsTagline: "Sunday league · banter · football · UK energy",
      footballLadsDescription:
        "Proper football lads lounge — Sunday league banter, five-a-side energy, pub-debate tactics, and UK match-day vibes wired for the arena.",
      footballMatchDay: "Match day · Live",
      footballSquadLabel: "Squad // lads // UK regions"
    },
    intlRooms: intlRoomDescriptionsEn,
    intlCountryTaglines: intlCountryTaglinesEn
  },
  "en-GB": {
    localePickerLabel: "Your language · country",
    localePickerHint: "Auto-detected · change anytime",
    intlSuiteName: "International SUITE",
    intlSuiteDescription:
      "Slide through countries — Colombia · UK · Japan · China rooms open inside. Pick your room and enter.",
    countriesOwnRooms: "Choose a Country. Live the Culture",
    intlSuiteOpenBadge: "International open",
    intlSuiteMenuHint:
      "Colombia + UK + Japan + China rooms open here · other countries are Front 12 slots on homepage",
    intlSuiteHoverRooms: "Hover · see rooms",
    intlSuiteClickCountry: "Click · open country",
    intlSuiteOpenFull: "Open full International SUITE →",
    intlSuiteScrollTitle: "Country scroll · one click opens each country",
    intlSuiteScrollHint: "Swipe sideways · click a country for culture, food, games, and rooms.",
    intlSuiteEnterRoom: "Enter room",
    intlSuiteEnterRoomOneClick: "ENTER ROOM · 1 click enter",
    intlSuiteRoomOpen: "Room open",
    intlSuiteComingSoon: "Coming soon",
    gateOpening: "Opening gift…",
    gateLiveUnlocked: "games & talk-show unlocked",
    gateEnterLive: "Join live games & activities",
    gateSingleStream: "games · talk-show · funny banter",
    gateActivityPrice:
      "Gift worldwide · 3 hours · games · talk-show · one lane per country",
    gateButtonSuffix: "games & talk-show",
    gateDefaultFootnote:
      "Browse preview lanes below free. Games, talk-show & activities open after your gift (demo here — WiPay when keys are live).",
    gateTimeLeft: "left",
    colombia: {
      eyebrow: "Colombian passion · love live",
      title: "Colombia Room",
      tagline:
        "Here love sounds loud — like a serenade under the moon, with coffee and sea salt.",
      subtitle: "Maximum romance · slow salsa · Caribbean sea · food with love · one live per heart",
      accessLive: "· live with love ·",
      topicsEyebrow: "Live 1 · simple talk topics",
      topicsSubline: "Scroll · country · football · menu · university · pick one under her slot.",
      eliteBadge: "Elite · 2028",
      choose: "Choose",
      chosen: "Chosen",
      tonightTopicKicker: "Live tonight",
      tonightTopicSession: "3 hours · she chose · everyone watches both lanes",
      liveOnAir: "Live now",
      venuesEyebrow: "Live 2 · Colombia by day",
      venuesSubline: "Scroll · 12 favourite day plans · where she is live.",
      slotTopicTitle: "Live 1 · talk topic",
      slotVenueTitle: "Live 2 · being live in real time",
      slotTopicCaption: "Simple chat · country · football · menu · university",
      slotVenueCaption: "Live from this favourite Colombia day plan",
      gatePassion: "· single live · with passion",
      gateTitle: "Enter the live",
      gatePrice: "Gift worldwide · 3 hours · one live per country on our platform.",
      gateButton: "enter with love",
      gateFootnote:
        "Browse the slides below free — live opens after your gift (demo here · WiPay soon).",
      topics: colombiaTopicsEn,
      venues: colombiaVenuesEn
    },
    uk: {
      cotswoldsTagline: "UK parks · snow · drones · live UK clock",
      cotswoldsDescription:
        "Eh up, bab! Don't just stand in the doorway—get stuck in and have a proper look about. We've put on a mint display for you, and we're absolutely chuffed you've dropped by. Make yourself comfortable and enjoy the view!",
      cotswoldsMuseumLabel: "🪵 ORITE, MI DUCK? GET YOURSELF IN.",
      cotswoldsSeasonsLive: "🌸 Spring · ☀️ Summer · 🍁 Autumn · ❄️ Winter · Live",
      footballLadsTagline: "Sunday league · pub banter · football · UK match-day",
      footballLadsDescription:
        "Proper football lads lounge — Sunday league banter, five-a-side energy, pub-debate tactics, and UK match-day vibes wired for the arena.",
      footballMatchDay: "Match day · Live",
      footballSquadLabel: "Squad // lads // UK regions"
    },
    intlRooms: intlRoomDescriptionsEn,
    intlCountryTaglines: intlCountryTaglinesEn
  }
};

export function getRoomTranslations(locale: RoomLocaleId): RoomTranslationBundle {
  return bundles[resolveContentLocale(locale)] ?? bundles.en;
}

export function translateColombiaTopic(locale: RoomLocaleId, topicId: string, fallback: TopicCopy): TopicCopy {
  const copy = getRoomTranslations(locale).colombia.topics[topicId];
  return copy ?? fallback;
}

export function translateColombiaVenue(locale: RoomLocaleId, venueId: string, fallback: TopicCopy): TopicCopy {
  const copy = getRoomTranslations(locale).colombia.venues[venueId];
  return copy ?? fallback;
}

export function translateIntlRoomDescription(locale: RoomLocaleId, roomSlug: string, fallback: string): string {
  return getRoomTranslations(locale).intlRooms[roomSlug]?.description ?? fallback;
}

export function translateIntlCountryTagline(locale: RoomLocaleId, countryId: string, fallback: string): string {
  return getRoomTranslations(locale).intlCountryTaglines[countryId] ?? fallback;
}

export function formatIntlSuiteRoomCount(locale: RoomLocaleId, countries: number, rooms: number): string {
  if (isSpanishContentLocale(locale)) {
    return `${countries} países · ${rooms} salas`;
  }
  return `${countries} countries · ${rooms} rooms`;
}
