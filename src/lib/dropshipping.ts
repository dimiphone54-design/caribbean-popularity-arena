import { getArenaCountrySlotMeta } from "@/lib/arena-country-slot-meta";
import { getDropshipCountryConfig } from "@/lib/dropship-country-config";
import { formatDropshipDualPrice } from "@/lib/dropship-fx";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { chinaDropshipPeoplePhotos } from "@/lib/china-dropship-people-photos";
import { ecuadorDropshipPeoplePhotos } from "@/lib/ecuador-dropship-people-photos";
import { ukDropshipWomenPhotos } from "@/lib/uk-dropship-women-photos";

export type DropshipProduct = {
  id: string;
  countryId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  shipsFrom: string;
  flag: string;
  imageUrl: string;
  supplierNote: string;
  /** Wholesale + fulfilment cost in USD · used in 50/50 margin calculator */
  supplierCostUsd?: number;
  lane?: DropshipLaneId;
};

export type DropshipOrderStatus = "pending_payment" | "ordered" | "shipped" | "delivered";

export type DropshipBuyer = {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  countryCode: string;
};

export type DropshipOrder = {
  id: string;
  productId: string;
  productName: string;
  countryId: string;
  countryName: string;
  flag: string;
  amount: number;
  currency: string;
  status: DropshipOrderStatus;
  orderedAt: string;
  trackingNote?: string;
  customReference: string;
  buyerEmail?: string;
};

export const dropshipMarketMeta = {
  title: "Dropship Market",
  subtitle: "Browse · buy on arena · supplier ships direct to you",
  slug: "dropship-market",
  legalNote:
    "Orders ship from the listed country. Delivery times vary. Returns handled per supplier policy · Terms apply."
} as const;

export function getDropshipMarketHref(countryId?: string) {
  const base = `/rooms/${dropshipMarketMeta.slug}`;
  return countryId ? `${base}?country=${countryId}` : base;
}

/** Validated lane id for market page + room clock · defaults to colombia */
export function resolveDropshipCountryId(requested: string | null | undefined) {
  const id = (requested ?? "colombia").trim().toLowerCase();
  if (internationalSuiteCountries.some((entry) => entry.id === id)) return id;
  return "colombia";
}

export function getDropshipCountryById(countryId: string) {
  const resolved = resolveDropshipCountryId(countryId);
  return (
    internationalSuiteCountries.find((entry) => entry.id === resolved) ?? internationalSuiteCountries[0]
  );
}

/** Active International SUITE countries with full dropship lanes today */
export function getDropshipEnabledCountryIds() {
  return internationalSuiteCountries.map((country) => country.id);
}

/** @deprecated use getDropshipEnabledCountryIds */
export const dropshipActiveCountryIds = getDropshipEnabledCountryIds();

export const dropshipCategoryOptions = [
  { id: "tech", label: "📱 Tech & Gadgets" },
  { id: "automotive", label: "🚗 Automotive & Car Accessories" }
] as const;

export type DropshipLaneId = (typeof dropshipCategoryOptions)[number]["id"];

/** @deprecated use dropshipCategoryOptions */
export const dropshipCategoryLanes = dropshipCategoryOptions.map((option) => option.label);

const islandCodeByCountryId: Record<string, string> = {
  colombia: "CO",
  uk: "UK",
  lithuania: "LT",
  ecuador: "EC",
  trinidad: "TT",
  jamaica: "JM",
  venezuela: "VE",
  poland: "PL",
  tunisia: "TN",
  guyana: "GY",
  china: "CN",
  japan: "JP"
};

function shipsFrom(countryId: string, city?: string) {
  const code = islandCodeByCountryId[countryId];
  const capital = code ? getArenaCountrySlotMeta({ islandCode: code }).capital : city ?? "Local hub";
  const country = internationalSuiteCountries.find((c) => c.id === countryId);
  return `${country?.flag ?? ""} ${city ?? capital} · ${country?.name ?? countryId}`;
}

const catalog: DropshipProduct[] = [
  {
    id: "uk-football-scarf",
    countryId: "uk",
    name: "UK Stadium Football Scarf",
    description: "Knit scarf · ships from Manchester supplier",
    price: 24,
    currency: "USD",
    category: "Football merch",
    shipsFrom: shipsFrom("uk", "Manchester"),
    flag: "🇬🇧",
    imageUrl: ukDropshipWomenPhotos.gamesNight,
    supplierNote: "Dropship · UK warehouse lane"
  },
  {
    id: "uk-park-games-kit",
    countryId: "uk",
    name: "Hyde Park Outdoor Games Kit",
    description: "Rounders · frisbee · relay markers · park picnic bundle",
    price: 38,
    currency: "USD",
    category: "Outdoor games",
    shipsFrom: shipsFrom("uk", "London"),
    flag: "🇬🇧",
    imageUrl: ukDropshipWomenPhotos.parkGamesSix,
    supplierNote: "Dropship · outdoor lane"
  },
  {
    id: "uk-fish-chips-box",
    countryId: "uk",
    name: "British Fish & Chips Gift Box",
    description: "Classic UK national dish hamper · park lunch set",
    price: 32,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("uk"),
    flag: "🇬🇧",
    imageUrl: ukDropshipWomenPhotos.fishChips,
    supplierNote: "Dropship · food partner"
  },
  {
    id: "co-arepa-kit",
    countryId: "colombia",
    name: "Cartagena Arepa Starter Kit",
    description: "Precooked arepa flour · coastal cheese · Cartagena recipe card · ships fresh lane",
    price: 28,
    currency: "USD",
    category: "Food kit · trending",
    shipsFrom: shipsFrom("colombia", "Cartagena"),
    flag: "🇨🇴",
    imageUrl: "/colombia-food-cartagena-arepa.png",
    supplierNote: "Dropship · #1 nostalgia export · arepa flour lane"
  },
  {
    id: "co-bandeja-box",
    countryId: "colombia",
    name: "Medellín Bandeja Paisa Box",
    description: "Bandeja paisa ingredients · chicharrón · beans · rice · Antioquia supplier",
    price: 35,
    currency: "USD",
    category: "Food kit · trending",
    shipsFrom: shipsFrom("colombia", "Medellín"),
    flag: "🇨🇴",
    imageUrl: "/colombia-food-medellin-bandeja.png",
    supplierNote: "Dropship · Medellín paisa lane"
  },
  {
    id: "co-coffee-gift",
    countryId: "colombia",
    name: "Huila Specialty Coffee Box",
    description: "Specialty grade Huila Excelso · caramel notes · Bogotá roast · top export lane",
    price: 32,
    currency: "USD",
    category: "Coffee · trending",
    shipsFrom: shipsFrom("colombia", "Bogotá"),
    flag: "🇨🇴",
    imageUrl: "/colombia-bg-coffee-couple.png",
    supplierNote: "Dropship · specialty coffee lane"
  },
  {
    id: "ec-ceviche-kit",
    countryId: "ecuador",
    name: "Guayaquil Ceviche Kit",
    description: "Coastal ceviche prep · lime · plantain chips",
    price: 27,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("ecuador", "Guayaquil"),
    flag: "🇪🇨",
    imageUrl: ecuadorDropshipPeoplePhotos.bancoGuayaquil,
    supplierNote: "Dropship · coast lane"
  },
  {
    id: "ec-quito-craft",
    countryId: "ecuador",
    name: "Quito Andes Craft Pack",
    description: "Woven textiles · marimba culture booklet",
    price: 31,
    currency: "USD",
    category: "Crafts",
    shipsFrom: shipsFrom("ecuador"),
    flag: "🇪🇨",
    imageUrl: ecuadorDropshipPeoplePhotos.hatsTeam,
    supplierNote: "Dropship · Quito artisan"
  },
  {
    id: "ec-carnival-wear",
    countryId: "ecuador",
    name: "Ecuador Carnival Accessories",
    description: "Festival colors · parade-ready kit",
    price: 22,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("ecuador", "Quito"),
    flag: "🇪🇨",
    imageUrl: ecuadorDropshipPeoplePhotos.volunteers,
    supplierNote: "Dropship · festival lane"
  },
  {
    id: "jm-dancehall-tee",
    countryId: "jamaica",
    name: "Kingston Dancehall Tee",
    description: "Island street style · Kingston print",
    price: 26,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("jamaica"),
    flag: "🇯🇲",
    imageUrl: "/arena-real-people/jm.jpg",
    supplierNote: "Dropship · Kingston supplier"
  },
  {
    id: "jm-island-bundle",
    countryId: "jamaica",
    name: "Jamaica Island Vibes Bundle",
    description: "Flag · stickers · reggae lane accessories",
    price: 24,
    currency: "USD",
    category: "Merch",
    shipsFrom: shipsFrom("jamaica", "Kingston"),
    flag: "🇯🇲",
    imageUrl: "/arena-real-people/jm2.jpg",
    supplierNote: "Dropship · island merch"
  },
  {
    id: "jm-sound-kit",
    countryId: "jamaica",
    name: "Sound System Mini Kit",
    description: "Portable speaker skin · dancehall playlist card",
    price: 45,
    currency: "USD",
    category: "Electronics",
    shipsFrom: shipsFrom("jamaica"),
    flag: "🇯🇲",
    imageUrl: "/arena-real-people/slot-03.jpg",
    supplierNote: "Dropship · audio partner"
  },
  {
    id: "tt-carnival-pack",
    countryId: "trinidad",
    name: "Port of Spain Carnival Pack",
    description: "Soca colors · feather accent kit",
    price: 34,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("trinidad"),
    flag: "🇹🇹",
    imageUrl: "/arena-real-people/tt.jpg",
    supplierNote: "Dropship · Carnival lane"
  },
  {
    id: "tt-flag-merch",
    countryId: "trinidad",
    name: "Trinidad & Tobago Flag Merch",
    description: "Flag map print · island pride set",
    price: 22,
    currency: "USD",
    category: "Merch",
    shipsFrom: shipsFrom("trinidad", "Port of Spain"),
    flag: "🇹🇹",
    imageUrl: "/trinidad-tobago-flag-map.png",
    supplierNote: "Dropship · local stall"
  },
  {
    id: "tt-soca-mix",
    countryId: "trinidad",
    name: "Soca Party Mix Box",
    description: "Snacks · flags · party starter",
    price: 30,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("trinidad"),
    flag: "🇹🇹",
    imageUrl: "/arena-real-people/slot-02.jpg",
    supplierNote: "Dropship · party lane"
  },
  {
    id: "ve-music-merch",
    countryId: "venezuela",
    name: "Caracas Latin Fire Merch",
    description: "Music culture tee · Caracas print",
    price: 25,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("venezuela"),
    flag: "🇻🇪",
    imageUrl: "/arena-real-people/ve.jpg",
    supplierNote: "Dropship · Caracas lane"
  },
  {
    id: "ve-beach-kit",
    countryId: "venezuela",
    name: "Caribbean Coast Beach Kit",
    description: "Towel · tote · coastal colors",
    price: 33,
    currency: "USD",
    category: "Outdoor",
    shipsFrom: shipsFrom("venezuela", "Caracas"),
    flag: "🇻🇪",
    imageUrl: "/arena-real-people/ve.jpg",
    supplierNote: "Dropship · coast supplier"
  },
  {
    id: "ve-flag-set",
    countryId: "venezuela",
    name: "Venezuela Pride Set",
    description: "Flag · pin · sticker bundle",
    price: 19,
    currency: "USD",
    category: "Merch",
    shipsFrom: shipsFrom("venezuela"),
    flag: "🇻🇪",
    imageUrl: "/arena-real-people/slot-04.jpg",
    supplierNote: "Dropship · merch lane"
  },
  {
    id: "pl-fashion-scarf",
    countryId: "poland",
    name: "Warsaw Fashion Scarf",
    description: "Polish style · Warsaw winter lane",
    price: 27,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("poland"),
    flag: "🇵🇱",
    imageUrl: "/arena-real-people/pl.jpg",
    supplierNote: "Dropship · Warsaw boutique"
  },
  {
    id: "pl-craft-box",
    countryId: "poland",
    name: "Polish Craft Gift Box",
    description: "Amber accent · folk pattern card",
    price: 29,
    currency: "USD",
    category: "Crafts",
    shipsFrom: shipsFrom("poland", "Warsaw"),
    flag: "🇵🇱",
    imageUrl: "/arena-real-people/slot-05.png",
    supplierNote: "Dropship · artisan lane"
  },
  {
    id: "pl-city-tee",
    countryId: "poland",
    name: "Warsaw City Tee",
    description: "Central Europe street style",
    price: 23,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("poland"),
    flag: "🇵🇱",
    imageUrl: "/arena-real-people/slot-06.png",
    supplierNote: "Dropship · city merch"
  },
  {
    id: "lt-art-print",
    countryId: "lithuania",
    name: "Vilnius Art Print",
    description: "Baltic gallery lane · framed option",
    price: 28,
    currency: "USD",
    category: "Art",
    shipsFrom: shipsFrom("lithuania"),
    flag: "🇱🇹",
    imageUrl: "/arena-real-people/lt.jpg",
    supplierNote: "Dropship · Vilnius studio"
  },
  {
    id: "lt-baltic-kit",
    countryId: "lithuania",
    name: "Baltic Culture Kit",
    description: "Culture booklet · amber keychain",
    price: 24,
    currency: "USD",
    category: "Crafts",
    shipsFrom: shipsFrom("lithuania", "Vilnius"),
    flag: "🇱🇹",
    imageUrl: "/arena-real-people/slot-07.png",
    supplierNote: "Dropship · Baltic lane"
  },
  {
    id: "lt-winter-wear",
    countryId: "lithuania",
    name: "Vilnius Winter Beanie",
    description: "Baltic knit · cold-weather lane",
    price: 21,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("lithuania"),
    flag: "🇱🇹",
    imageUrl: "/arena-real-people/slot-08.png",
    supplierNote: "Dropship · knit supplier"
  },
  {
    id: "tn-medina-craft",
    countryId: "tunisia",
    name: "Tunis Medina Craft Pack",
    description: "Arabic · French culture blend · souk pick",
    price: 30,
    currency: "USD",
    category: "Crafts",
    shipsFrom: shipsFrom("tunisia"),
    flag: "🇹🇳",
    imageUrl: "/arena-real-people/tn.jpg",
    supplierNote: "Dropship · Tunis souk"
  },
  {
    id: "tn-spice-box",
    countryId: "tunisia",
    name: "Mediterranean Spice Box",
    description: "North Africa spice lane · recipe cards",
    price: 26,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("tunisia", "Tunis"),
    flag: "🇹🇳",
    imageUrl: "/arena-real-people/slot-09.png",
    supplierNote: "Dropship · spice partner"
  },
  {
    id: "tn-tile-art",
    countryId: "tunisia",
    name: "Tunis Tile Art Tile",
    description: "Mediterranean pattern decor",
    price: 32,
    currency: "USD",
    category: "Home",
    shipsFrom: shipsFrom("tunisia"),
    flag: "🇹🇳",
    imageUrl: "/arena-real-people/slot-10.png",
    supplierNote: "Dropship · decor lane"
  },
  {
    id: "gy-comedy-merch",
    countryId: "guyana",
    name: "Georgetown Comedy Merch",
    description: "Caribbean mix humor tee",
    price: 23,
    currency: "USD",
    category: "Merch",
    shipsFrom: shipsFrom("guyana"),
    flag: "🇬🇾",
    imageUrl: "/arena-real-people/gy.jpg",
    supplierNote: "Dropship · Georgetown lane"
  },
  {
    id: "gy-caribbean-mix",
    countryId: "guyana",
    name: "Caribbean Guyana Mix Box",
    description: "Snacks · flags · island blend",
    price: 29,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("guyana", "Georgetown"),
    flag: "🇬🇾",
    imageUrl: "/arena-real-people/gy-test-15245043.jpg",
    supplierNote: "Dropship · mix partner"
  },
  {
    id: "gy-river-kit",
    countryId: "guyana",
    name: "Demerara River Gift Kit",
    description: "River culture · postcard set",
    price: 22,
    currency: "USD",
    category: "Merch",
    shipsFrom: shipsFrom("guyana"),
    flag: "🇬🇾",
    imageUrl: "/arena-real-people/slot-11.png",
    supplierNote: "Dropship · river lane"
  },
  {
    id: "cn-shanghai-style",
    countryId: "china",
    name: "Shanghai Street Style Tee",
    description: "East Asia content lane merch",
    price: 27,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("china"),
    flag: "🇨🇳",
    imageUrl: chinaDropshipPeoplePhotos.tsinghuaBoardroom,
    supplierNote: "Dropship · Shanghai supplier"
  },
  {
    id: "cn-tea-set",
    countryId: "china",
    name: "Chinese Tea Ceremony Set",
    description: "Loose leaf · cups · Mandarin card",
    price: 36,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("china", "Shanghai"),
    flag: "🇨🇳",
    imageUrl: chinaDropshipPeoplePhotos.teamMeeting,
    supplierNote: "Dropship · tea partner"
  },
  {
    id: "cn-tech-skin",
    countryId: "china",
    name: "Shanghai Tech Skin Pack",
    description: "Phone skin · neon city print",
    price: 18,
    currency: "USD",
    category: "Electronics",
    shipsFrom: shipsFrom("china"),
    flag: "🇨🇳",
    imageUrl: chinaDropshipPeoplePhotos.tableMeeting,
    supplierNote: "Dropship · tech lane"
  },
  {
    id: "jp-lifestyle-box",
    countryId: "japan",
    name: "JAPAN Lifestyle Box",
    description: "Minimalist goods · JAPAN pick",
    price: 38,
    currency: "USD",
    category: "Lifestyle",
    shipsFrom: shipsFrom("japan"),
    flag: "🇯🇵",
    imageUrl: "/japan-dropship-host-desk.png",
    supplierNote: "Dropship · JAPAN lane"
  },
  {
    id: "jp-street-fashion",
    countryId: "japan",
    name: "JAPAN Street Fashion Tee",
    description: "Japanese culture street print",
    price: 29,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "/japan-dropship-host-portrait.png",
    supplierNote: "Dropship · street supplier"
  },
  {
    id: "jp-matcha-kit",
    countryId: "japan",
    name: "JAPAN Matcha Starter Kit",
    description: "Matcha · whisk · bowl mini set",
    price: 34,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("japan"),
    flag: "🇯🇵",
    imageUrl: "/japan-dropship-host-kimono.png",
    supplierNote: "Dropship · matcha partner"
  }
];

const laneImageByCountryId: Record<string, string> = {
  colombia: "/arena-real-people/co.jpg",
  uk: ukDropshipWomenPhotos.hollandParkFour,
  lithuania: "/arena-real-people/lt.jpg",
  ecuador: ecuadorDropshipPeoplePhotos.bancoGuayaquil,
  trinidad: "/arena-real-people/tt.jpg",
  jamaica: "/arena-real-people/jm.jpg",
  venezuela: "/arena-real-people/ve.jpg",
  poland: "/arena-real-people/pl.jpg",
  tunisia: "/arena-real-people/tn.jpg",
  guyana: "/arena-real-people/gy.jpg",
  china: chinaDropshipPeoplePhotos.tsinghuaBoardroom,
  japan: "/japan-dropship-host-kimono.png"
};

const laneImageByCountryLane: Partial<
  Record<string, Partial<Record<DropshipLaneId, string>>>
> = {
  china: {
    tech: chinaDropshipPeoplePhotos.hkTeam,
    automotive: chinaDropshipPeoplePhotos.handshake
  },
  japan: {
    tech: "/japan-dropship-host-desk.png",
    automotive: "/japan-dropship-host-portrait.png"
  },
  ecuador: {
    tech: ecuadorDropshipPeoplePhotos.hatsTeam,
    automotive: ecuadorDropshipPeoplePhotos.volunteers
  },
  uk: {
    tech: ukDropshipWomenPhotos.londonSummerFive,
    automotive: ukDropshipWomenPhotos.londonParkGirls
  }
};

const laneCatalog: DropshipProduct[] = internationalSuiteCountries.flatMap((country) => {
  const defaultImage = laneImageByCountryId[country.id] ?? "/arena-real-people/slot-01.jpg";
  const laneImages = laneImageByCountryLane[country.id];

  return [
    {
      id: `${country.id}-lane-tech`,
      countryId: country.id,
      name: `${country.name} Tech & Gadgets Pack`,
      description: "Phone accessories · cables · gadget bundle · local supplier ships direct",
      price: 29,
      currency: "USD",
      category: "📱 Tech & Gadgets",
      shipsFrom: shipsFrom(country.id),
      flag: country.flag,
      imageUrl: laneImages?.tech ?? defaultImage,
      supplierNote: "Dropship · tech lane",
      lane: "tech"
    },
    {
      id: `${country.id}-lane-automotive`,
      countryId: country.id,
      name: `${country.name} Car Accessories Kit`,
      description: "Interior accessories · care kit · local supplier ships direct",
      price: 35,
      currency: "USD",
      category: "🚗 Automotive & Car Accessories",
      shipsFrom: shipsFrom(country.id),
      flag: country.flag,
      imageUrl: laneImages?.automotive ?? defaultImage,
      supplierNote: "Dropship · automotive lane",
      lane: "automotive"
    }
  ];
});

catalog.push(...laneCatalog);

/** Colombia dropship panel · 3 trending picks (2025 nostalgia + coffee export data) */
export const colombiaDropshipPanelProductIds = [
  "co-arepa-kit",
  "co-bandeja-box",
  "co-coffee-gift"
] as const;

export function getDropshipProductsForCountry(countryId: string, lane?: DropshipLaneId | null) {
  if (lane) {
    return catalog.filter((product) => product.countryId === countryId && product.lane === lane);
  }

  if (countryId === "colombia") {
    return colombiaDropshipPanelProductIds
      .map((id) => catalog.find((product) => product.id === id))
      .filter((product): product is DropshipProduct => Boolean(product));
  }

  return catalog.filter((product) => product.countryId === countryId && !product.lane);
}

/** All dropship SKUs for a country (featured + lane options) · split calculator */
export function getAllDropshipProductsForCountry(countryId: string) {
  return catalog.filter((product) => product.countryId === countryId);
}

/** 📱 Tech & 🚗 Automotive lane products · every country */
export function getDropshipOptionProductsForCountry(countryId: string) {
  return dropshipCategoryOptions.flatMap((option) =>
    catalog.filter((product) => product.countryId === countryId && product.lane === option.id)
  );
}

export function countryHasDropshipLaneOptions(countryId: string) {
  return getDropshipOptionProductsForCountry(countryId).length > 0;
}

export function getDropshipProduct(productId: string) {
  return catalog.find((product) => product.id === productId);
}

export function formatDropshipPrice(amount: number, currency: string, countryId?: string) {
  if (countryId && currency === "USD") {
    return formatDropshipDualPrice(amount, countryId);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function getDropshipCountryLegal(countryId: string) {
  const config = getDropshipCountryConfig(countryId);
  return {
    short: config?.legalShort ?? dropshipMarketMeta.legalNote,
    full: config?.legalDropship ?? dropshipMarketMeta.legalNote
  };
}
