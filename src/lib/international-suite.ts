import { arenaCreators } from "@/lib/arena-experience";
import { getArenaCountrySlotMeta } from "@/lib/arena-country-slot-meta";
import { ecuadorCountryHighlights, ecuadorFront12SlotDescription } from "@/lib/ecuador-country";

export type InternationalSuiteRoom = {
  id: string;
  roomSlug: string;
  roomLabel: string;
  description: string;
  status: "open" | "soon";
  /** When set, links here instead of /rooms/[slug] (e.g. Front 12 slots on homepage). */
  href?: string;
};

export type InternationalSuiteCountry = {
  id: string;
  islandCode: string;
  name: string;
  flag: string;
  region: string;
  tagline: string;
  highlights?: {
    culture: readonly string[];
    food: readonly string[];
    games: readonly string[];
    activities: readonly string[];
  };
  rooms: InternationalSuiteRoom[];
};

export const internationalSuiteMeta = {
  slug: "international-suite",
  name: "International SUITE",
  description:
    "Slide through countries — Colombia · UK · Ecuador · Japan · China rooms open inside. Pick your room and enter."
} as const;

type CountryProfile = {
  id: string;
  name: string;
  region: string;
  tagline: string;
  highlights?: InternationalSuiteCountry["highlights"];
};

const countryProfilesByCode: Record<string, CountryProfile> = {
  CO: {
    id: "colombia",
    name: "Colombia",
    region: "South America · Andes & Caribbean coast",
    tagline: "Colombian food · cities · music · culture"
  },
  UK: {
    id: "uk",
    name: "United Kingdom",
    region: "Europe · British Isles",
    tagline: "UK parks · football · British games"
  },
  LT: {
    id: "lithuania",
    name: "Lithuania",
    region: "Europe · Baltic",
    tagline: "Vilnius · art · Baltic culture"
  },
  EC: {
    id: "ecuador",
    name: "Ecuador",
    region: "South America · Andes · Pacific coast · Amazon",
    tagline: "Ecuadorian food · Andes culture · dance · games · ecuavoley",
    highlights: ecuadorCountryHighlights
  },
  TT: {
    id: "trinidad",
    name: "Trinidad & Tobago",
    region: "Caribbean · Southern Caribbean",
    tagline: "Soca · Port of Spain · Carnival energy"
  },
  JM: {
    id: "jamaica",
    name: "Jamaica",
    region: "Caribbean · Greater Antilles",
    tagline: "Dancehall · Kingston · island vibes"
  },
  VE: {
    id: "venezuela",
    name: "Venezuela",
    region: "South America · Caribbean coast",
    tagline: "Caracas · music · Latin fire"
  },
  PL: {
    id: "poland",
    name: "Poland",
    region: "Europe · Central Europe",
    tagline: "Warsaw · fashion · Polish style"
  },
  TN: {
    id: "tunisia",
    name: "Tunisia",
    region: "North Africa · Mediterranean",
    tagline: "Tunis · culture · Arabic · French"
  },
  GY: {
    id: "guyana",
    name: "Guyana",
    region: "South America · Caribbean Guyana",
    tagline: "Georgetown · comedy · Caribbean mix"
  },
  CN: {
    id: "china",
    name: "China",
    region: "East Asia",
    tagline: "Shanghai · content · Mandarin live"
  },
  JP: {
    id: "japan",
    name: "Japan",
    region: "East Asia",
    tagline: "JAPAN · lifestyle · Japanese culture"
  }
};

const dedicatedRoomsByCode: Record<string, InternationalSuiteRoom[]> = {
  UK: [
    {
      id: "uk-cotswold",
      roomSlug: "uk-flag-cotswolds",
      roomLabel: "United Kingdom",
      description: "Four-quarter park movie slide · museum welcome · snow · drones · live UK clock.",
      status: "open"
    },
    {
      id: "uk-football-lads",
      roomSlug: "football-lads",
      roomLabel: "FOOTBALL LADS",
      description: "Sunday league squad · pub banter · men's match-day prompts · UK football energy.",
      status: "open"
    }
  ],
  CO: [
    {
      id: "colombia-room",
      roomSlug: "colombia-room",
      roomLabel: "Colombia",
      description: "Arepas · empanadas · Medellín · Bogotá · reggaeton · salsa · vallenato.",
      status: "open"
    }
  ],
  EC: [
    {
      id: "ecuador-room",
      roomSlug: "ecuador-room",
      roomLabel: "Ecuador",
      description: "Quito · Guayaquil · encebollado · pasillo · ecuavoley · Galápagos · live activities.",
      status: "open"
    }
  ],
  CN: [
    {
      id: "china-room",
      roomSlug: "china-room",
      roomLabel: "China",
      description: "上海直播舞台 · 武术对练 · 两位武者 · 编排剑棍对练 · 普通话脱口秀游戏之夜",
      status: "open"
    }
  ],
  JP: [
    {
      id: "japan-room",
      roomSlug: "japan-room",
      roomLabel: "Japan",
      description: "JAPAN kendo stage duel · two fighters · sword clash · flame burst · variety games.",
      status: "open"
    }
  ]
};

function buildFront12SlotRoom(
  islandCode: string,
  profile: CountryProfile,
  rank: number,
  category: string,
  categoryIcon: string
): InternationalSuiteRoom {
  const meta = getArenaCountrySlotMeta({ islandCode });
  const description =
    profile.id === "ecuador"
      ? ecuadorFront12SlotDescription.en
      : `${meta.capital} · ${categoryIcon} ${category} · Front 12 nation slot · sign in on homepage.`;

  return {
    id: `${profile.id}-front12-slot`,
    roomSlug: `${profile.id}-front12-slot`,
    roomLabel: `SLOT ${rank} · ${profile.name.toUpperCase()}`,
    description,
    status: "open",
    href: "/#home"
  };
}

function buildInternationalSuiteCountries(): InternationalSuiteCountry[] {
  return arenaCreators.map((slot) => {
    const profile = countryProfilesByCode[slot.islandCode];
    if (!profile) {
      throw new Error(`Missing International SUITE profile for ${slot.islandCode}`);
    }

    const dedicated = dedicatedRoomsByCode[slot.islandCode];
    const rooms =
      dedicated ??
      [buildFront12SlotRoom(slot.islandCode, profile, slot.rank, slot.category, slot.categoryIcon)];

    return {
      id: profile.id,
      islandCode: slot.islandCode,
      name: profile.name,
      flag: slot.flag,
      region: profile.region,
      tagline: profile.tagline,
      highlights: profile.highlights,
      rooms
    };
  });
}

/** International SUITE only · frozen in nav dropdown + country scroll */
const internationalSuiteFrozenCountryIds = new Set(["trinidad"]);

export function isInternationalSuiteCountryFrozen(country: InternationalSuiteCountry) {
  if (countryHasBuiltSuiteRooms(country)) return false;
  if (internationalSuiteFrozenCountryIds.has(country.id)) return true;
  return true;
}

/** Front 12 + arena engine · same active lane as International SUITE nav */
export function isInternationalSuiteCountryActiveByIslandCode(islandCode: string) {
  const country = internationalSuiteCountries.find((entry) => entry.islandCode === islandCode);
  if (!country) return false;
  return !isInternationalSuiteCountryFrozen(country);
}

export function getInternationalSuiteActiveIslandCodes() {
  return internationalSuiteCountries
    .filter((country) => !isInternationalSuiteCountryFrozen(country))
    .map((country) => country.islandCode);
}

export function getInternationalSuiteActiveCountryLabel(options?: { short?: boolean }) {
  const active = internationalSuiteCountries.filter((country) => !isInternationalSuiteCountryFrozen(country));
  if (options?.short) {
    return active.map((country) => country.islandCode).join(" · ");
  }
  return active.map((country) => country.name.split(" ")[0]).join(" · ");
}

export const internationalSuiteCountries: InternationalSuiteCountry[] = buildInternationalSuiteCountries();

export function getInternationalSuiteRoomHref(room: InternationalSuiteRoom) {
  return room.href ?? `/rooms/${room.roomSlug}`;
}

/** First built room lane for one-click entry from International SUITE chips */
export function getInternationalSuitePrimaryRoomHref(country: InternationalSuiteCountry) {
  const room = country.rooms.find((entry) => entry.status === "open" && !entry.href);
  return room ? getInternationalSuiteRoomHref(room) : null;
}

export function findInternationalSuiteRoomBySlug(roomSlug: string) {
  for (const country of internationalSuiteCountries) {
    const room = country.rooms.find((entry) => entry.roomSlug === roomSlug);
    if (room) {
      return { country, room };
    }
  }

  return null;
}

export function isInternationalSuiteRoomSlug(roomSlug: string) {
  return findInternationalSuiteRoomBySlug(roomSlug) !== null;
}

export function getInternationalSuiteNavHint() {
  return getInternationalSuiteNavCountries()
    .map((country) => `${country.flag} ${country.name.split(" ")[0]}`)
    .join(" · ");
}

export function getOpenInternationalCountries() {
  return internationalSuiteCountries.filter((country) =>
    country.rooms.some((room) => room.status === "open")
  );
}

/** Built-room lanes pinned at top of International SUITE nav · matches Front 12 active ranks */
export const internationalSuiteBuiltRoomCountryIds = [
  "colombia",
  "uk",
  "ecuador",
  "china",
  "japan"
] as const;

export function getInternationalSuiteBuiltRoomCountries() {
  return internationalSuiteBuiltRoomCountryIds
    .map((countryId) => internationalSuiteCountries.find((entry) => entry.id === countryId))
    .filter((country): country is InternationalSuiteCountry => Boolean(country));
}

/** Homepage nav + suite scroll · Colombia · UK · Ecuador · China · Japan first, then frost lanes */
export function getInternationalSuiteNavCountries() {
  const pinned = new Set<string>(internationalSuiteBuiltRoomCountryIds);
  const featured = getInternationalSuiteBuiltRoomCountries();
  const rest = internationalSuiteCountries.filter(
    (country) =>
      country.rooms.some((room) => room.status === "open") && !pinned.has(country.id)
  );
  return [...featured, ...rest];
}

/** Room slug for country live-gift checkout on International SUITE cards */
export function getInternationalSuiteCountryLiveRoomSlug(countryId: string) {
  const country = internationalSuiteCountries.find((entry) => entry.id === countryId);
  if (!country) return `${countryId}-intl-lane`;
  const built = country.rooms.find((room) => room.status === "open" && !room.href);
  return built?.roomSlug ?? `${countryId}-intl-lane`;
}

/** Full suite rooms (not homepage slot links) — Colombia · UK · Japan · China + more. */
export function countryHasBuiltSuiteRooms(country: InternationalSuiteCountry) {
  return country.rooms.some((room) => room.status === "open" && !room.href);
}

export function getOpenRoomsForCountry(countryId: string) {
  const country = internationalSuiteCountries.find((entry) => entry.id === countryId);
  if (!country) return [];
  return country.rooms.filter((room) => room.status === "open");
}

export function findInternationalSuiteRoom(countryId: string, roomId: string) {
  const country = internationalSuiteCountries.find((entry) => entry.id === countryId);
  return country?.rooms.find((room) => room.id === roomId);
}

export function parseInternationalSuiteSelection(value: string) {
  const [countryId, roomId] = value.split(":");
  if (!countryId || !roomId) return null;
  const room = findInternationalSuiteRoom(countryId, roomId);
  if (!room || room.status !== "open") return null;
  const country = internationalSuiteCountries.find((entry) => entry.id === countryId);
  if (!country) return null;
  return { country, room };
}

export function formatInternationalSuiteSelection(countryId: string, roomId: string) {
  return `${countryId}:${roomId}`;
}

export const defaultInternationalSuiteSelection = formatInternationalSuiteSelection("uk", "uk-cotswold");
