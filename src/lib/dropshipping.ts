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
  /** Optional direct seller contact (mailto / https / wa.me) */
  sellerContact?: string;
  storeUrl?: string;
  sellerEmail?: string;
  /** Link‑out only: external payment URL the seller controls. Platform NEVER touches payments. */
  sellerPaymentUrl?: string;
  lane?: DropshipLaneId;
};

export const dropshipMarketMeta = {
  title: "Dropship Market",
  subtitle: "Browse · platform checkout · platform-managed supplier payout",
  slug: "dropship-market",
  legalNote:
    "Arena operates platform checkout for listed supplier lanes. Customer payment is collected by the platform and supplier payout is managed by the platform. Delivery and returns remain subject to supplier fulfillment terms."
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
  spain: "ES",
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
    id: "uk-football-fan-pack",
    countryId: "uk",
    name: "Premium Football Fan Pack",
    description:
      "Official team scarf, phone case, keychain & car air freshener (Arsenal, Man United, Liverpool, etc.)",
    price: 27,
    currency: "USD",
    category: "Football merch",
    shipsFrom: shipsFrom("uk", "Manchester"),
    flag: "🇬🇧",
    imageUrl: "/uk-football-scarf.png",
    supplierNote: "Dropship · Manchester football merch · supplier ships direct"
  },
  {
    id: "uk-british-heritage-travel",
    countryId: "uk",
    name: "British Heritage Travel Kit",
    description:
      "Portable power bank, travel adapter, noise-cancelling earbuds & UK travel essentials",
    price: 42,
    currency: "USD",
    category: "Travel essentials",
    shipsFrom: shipsFrom("uk", "Manchester"),
    flag: "🇬🇧",
    imageUrl: "/uk-british-heritage-travel-kit.jpg",
    supplierNote: "Dropship · Manchester travel · supplier ships direct"
  },
  {
    id: "uk-smart-home-gadgets",
    countryId: "uk",
    name: "Smart Home Gadgets Bundle",
    description: "LED lighting strips, wireless charger, mini projector & smart plugs",
    price: 38,
    currency: "USD",
    category: "Smart home",
    shipsFrom: shipsFrom("uk", "London"),
    flag: "🇬🇧",
    imageUrl: "/uk-tech-gadgets-pack.png",
    supplierNote: "Dropship · London smart home · supplier ships direct"
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
    imageUrl: "/uk-park-games-kit.png",
    supplierNote: "Dropship · outdoor lane"
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
    id: "ec-tech-gadgets",
    countryId: "ecuador",
    name: "Tech & Gadgets Bundle",
    description: "Phone accessories, chargers & cables",
    price: 29,
    currency: "USD",
    category: "Tech & Gadgets",
    shipsFrom: shipsFrom("ecuador", "Quito"),
    flag: "🇪🇨",
    imageUrl: ecuadorDropshipPeoplePhotos.hatsTeam,
    supplierNote: "Dropship · Quito tech · supplier ships direct"
  },
  {
    id: "ec-auto-care",
    countryId: "ecuador",
    name: "Auto Interior Care Kit",
    description: "Complete vehicle detailing set",
    price: 35,
    currency: "USD",
    category: "Automotive",
    shipsFrom: shipsFrom("ecuador", "Quito"),
    flag: "🇪🇨",
    imageUrl: ecuadorDropshipPeoplePhotos.volunteers,
    supplierNote: "Dropship · Quito auto · supplier ships direct"
  },
  {
    id: "ec-ceviche-kit",
    countryId: "ecuador",
    name: "Guayaquil Ceviche Kit",
    description: "Authentic coastal recipe + ingredients",
    price: 27,
    currency: "USD",
    category: "Food kit",
    shipsFrom: shipsFrom("ecuador", "Guayaquil"),
    flag: "🇪🇨",
    imageUrl: ecuadorDropshipPeoplePhotos.bancoGuayaquil,
    supplierNote: "Dropship · Guayaquil coast · supplier ships direct"
  },
  {
    id: "ec-quito-craft",
    countryId: "ecuador",
    name: "Andes Artisan Collection",
    description: "Beautiful handwoven textiles · traditional Otavalo patterns · authentic cultural fashion",
    price: 31,
    currency: "USD",
    category: "Crafts",
    shipsFrom: shipsFrom("ecuador", "Quito"),
    flag: "🇪🇨",
    imageUrl: "/ecuador-andes-artisan-1.jpg",
    supplierNote: "Dropship · Otavalo Andes artisan · supplier ships direct"
  },
  {
    id: "ec-carnival-wear",
    countryId: "ecuador",
    name: "Carnival Ready Pack",
    description: "Explosive festival colors · parade-ready looks · street energy",
    price: 22,
    currency: "USD",
    category: "Fashion",
    shipsFrom: shipsFrom("ecuador", "Quito"),
    flag: "🇪🇨",
    imageUrl: "/ecuador-carnival-ready-1.jpg",
    supplierNote: "Dropship · festival lane · real Ambato / carnival energy · supplier ships direct"
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
    id: "es-flamenco-merch",
    countryId: "spain",
    name: "Barcelona Flamenco Tee",
    description: "Flamenco culture tee · Barcelona print",
    price: 28,
    currency: "EUR",
    category: "Fashion",
    shipsFrom: shipsFrom("spain"),
    flag: "🇪🇸",
    imageUrl: "/arena-real-people/es.jpg",
    supplierNote: "Dropship · Barcelona lane"
  },
  {
    id: "es-beach-kit",
    countryId: "spain",
    name: "Mediterranean Beach Kit",
    description: "Towel · tote · Mediterranean colors",
    price: 31,
    currency: "EUR",
    category: "Outdoor",
    shipsFrom: shipsFrom("spain", "Barcelona"),
    flag: "🇪🇸",
    imageUrl: "/arena-real-people/es.jpg",
    supplierNote: "Dropship · coast supplier"
  },
  {
    id: "es-flag-set",
    countryId: "spain",
    name: "Spain Pride Set",
    description: "Flag · pin · sticker bundle",
    price: 20,
    currency: "EUR",
    category: "Merch",
    shipsFrom: shipsFrom("spain"),
    flag: "🇪🇸",
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
    imageUrl: "https://images.unsplash.com/photo-1734333107760-7389a4f29af8?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
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
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · street supplier"
  },
  {
    id: "jp-kimono-wrap",
    countryId: "japan",
    name: "JAPAN Kimono Silk Wrap",
    description: "Traditional silk wrap · modern style",
    price: 48,
    currency: "USD",
    category: "Fashion · kimono",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · kimono partner"
  },
  {
    id: "jp-kendo-tee",
    countryId: "japan",
    name: "JAPAN Kendo Spirit Tee",
    description: "Martial arts inspired · arena ready",
    price: 32,
    currency: "USD",
    category: "Fashion · kendo",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · martial arts lane"
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
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · matcha partner"
  },
  // ── Anime & Japan-Exclusive Drops ──
  {
    id: "jp-anime-tee",
    countryId: "japan",
    name: "日本限定アニメTシャツ",
    description: "日本限定 · 限定アニメプリント",
    price: 34,
    currency: "USD",
    category: "Anime · limited",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · anime supplier"
  },
  {
    id: "jp-gashapon-figure",
    countryId: "japan",
    name: "日本ガシャポンミニフィギュアセット",
    description: "カプセルトイ · ブラインドボックス",
    price: 18,
    currency: "USD",
    category: "Collectibles",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1772160801956-e471dbee631b?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · gashapon lane"
  },
  {
    id: "jp-manga-box",
    countryId: "japan",
    name: "日本限定版マンガボックス",
    description: "コレクターマンガ · 日本限定版",
    price: 42,
    currency: "USD",
    category: "Manga · exclusive",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · manga partner"
  },
  {
    id: "jp-char-pouch",
    countryId: "japan",
    name: "日本キャラクターグッズポーチ",
    description: "かわいいポーチ · 日本限定コラボ",
    price: 22,
    currency: "USD",
    category: "Accessories",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · character goods"
  },
  // ── J-Beauty / Glass Skin ──
  {
    id: "jp-glass-skin-kit",
    countryId: "japan",
    name: "JAPAN Glass Skin Starter Kit",
    description: "PDRN serum · sheet mask · glow set",
    price: 38,
    currency: "USD",
    category: "Skincare · glass skin",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · J-beauty partner"
  },
  {
    id: "jp-pdrn-masks",
    countryId: "japan",
    name: "JAPAN PDRN Sheet Mask Pack (10)",
    description: "Viral PDRN masks · glass skin 2026",
    price: 24,
    currency: "USD",
    category: "Sheet masks · viral",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · PDRN supplier"
  },
  {
    id: "jp-rice-serum",
    countryId: "japan",
    name: "JAPAN Rice Water Serum",
    description: "Rice bran extract · traditional glow",
    price: 29,
    currency: "USD",
    category: "Serum · traditional",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · rice water lane"
  },
  {
    id: "jp-beauty-box",
    countryId: "japan",
    name: "JAPAN Beauty Essentials Box",
    description: "Curated J-beauty · 5-piece set",
    price: 45,
    currency: "USD",
    category: "J-beauty · curated",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · beauty curator"
  },
  // ── Aesthetic Stationery ──
  {
    id: "jp-precision-pens",
    countryId: "japan",
    name: "JAPAN Precision Pen Set (0.3mm)",
    description: "Monozukuri gel pens · 6-color set",
    price: 16,
    currency: "USD",
    category: "Pens · Monozukuri",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · pen supplier"
  },
  {
    id: "jp-travelers-notebook",
    countryId: "japan",
    name: "JAPAN Traveler's Notebook Kit",
    description: "Leather notebook · refill inserts",
    price: 28,
    currency: "USD",
    category: "Notebook · analog",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · notebook partner"
  },
  {
    id: "jp-sticker-pack",
    countryId: "japan",
    name: "JAPAN Sticker Collector Pack",
    description: "Kawaii stickers · 50-piece set",
    price: 14,
    currency: "USD",
    category: "Stickers · kawaii",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · sticker lane"
  },
  // ── Viral Snacks ──
  {
    id: "jp-spicy-box",
    countryId: "japan",
    name: "JAPAN Spicy Snack Challenge Box",
    description: "Viral spicy snacks · challenge pack",
    price: 26,
    currency: "USD",
    category: "Snacks · viral",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1783615294331-7ec7c558019a?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · snack supplier"
  },
  {
    id: "jp-dagashi-pack",
    countryId: "japan",
    name: "JAPAN Dagashi Variety Pack",
    description: "Retro candy · 20-piece variety",
    price: 20,
    currency: "USD",
    category: "Snacks · retro",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1718155424418-aa8034ceb1a3?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · dagashi lane"
  },
  {
    id: "jp-matcha-sweets",
    countryId: "japan",
    name: "JAPAN Matcha Sweets Box",
    description: "Matcha chocolates · mochi · KitKat",
    price: 32,
    currency: "USD",
    category: "Sweets · matcha",
    shipsFrom: shipsFrom("japan", "JAPAN"),
    flag: "🇯🇵",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80&auto=format&fit=crop",
    supplierNote: "Dropship · matcha sweets"
  }
];

const laneImageByCountryId: Record<string, string> = {
  colombia: "/arena-real-people/co.jpg",
  uk: ukDropshipWomenPhotos.hollandParkFour,
  lithuania: "/arena-real-people/lt.jpg",
  ecuador: ecuadorDropshipPeoplePhotos.bancoGuayaquil,
  trinidad: "/arena-real-people/tt.jpg",
  jamaica: "/arena-real-people/jm.jpg",
  spain: "/arena-real-people/es.jpg",
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
    tech: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80&auto=format&fit=crop",
    automotive: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop"
  },
  ecuador: {
    tech: ecuadorDropshipPeoplePhotos.hatsTeam,
    automotive: ecuadorDropshipPeoplePhotos.volunteers
  },
  uk: {
    tech: "/uk-tech-gadgets-pack.png",
    automotive: "/uk-car-accessories-kit.png"
  }
};

const laneCatalog: DropshipProduct[] = internationalSuiteCountries.flatMap((country) => {
  const defaultImage = laneImageByCountryId[country.id] ?? "/arena-real-people/slot-01.jpg";
  const laneImages = laneImageByCountryLane[country.id];
  const isUk = country.id === "uk";

  return [
    {
      id: `${country.id}-lane-tech`,
      countryId: country.id,
      name: isUk ? "Tech & Gadgets Pack" : `${country.name} Tech & Gadgets Pack`,
      description: isUk
        ? "Premium phone accessories, fast-charging cables, and essential gadget bundle"
        : "Phone accessories · cables · gadget bundle",
      price: 29,
      currency: "USD",
      category: "📱 Tech & Gadgets",
      shipsFrom: isUk ? shipsFrom("uk", "London") : shipsFrom(country.id),
      flag: country.flag,
      imageUrl: laneImages?.tech ?? defaultImage,
      supplierNote: isUk
        ? "Dropship · London tech · supplier ships direct"
        : "Dropship · tech lane",
      lane: "tech"
    },
    {
      id: `${country.id}-lane-automotive`,
      countryId: country.id,
      name: isUk ? "Car Interior & Care Kit" : `${country.name} Car Accessories Kit`,
      description: isUk
        ? "Complete premium vehicle detailing set and luxury interior accessories"
        : "Interior accessories · care kit",
      price: 35,
      currency: "USD",
      category: "🚗 Automotive & Car Accessories",
      shipsFrom: isUk ? shipsFrom("uk", "London") : shipsFrom(country.id),
      flag: country.flag,
      imageUrl: laneImages?.automotive ?? defaultImage,
      supplierNote: isUk
        ? "Dropship · London auto · supplier ships direct"
        : "Dropship · automotive lane",
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

/** Ecuador Direct Dropship Lane · featured SKUs (15% fee is Command Center only) */
export const ecuadorDropshipPanelProductIds = [
  "ec-tech-gadgets",
  "ec-auto-care",
  "ec-ceviche-kit",
  "ec-quito-craft",
  "ec-carnival-wear"
] as const;

export const ecuadorFeaturedDropshipProducts = ecuadorDropshipPanelProductIds
  .map((id) => catalog.find((product) => product.id === id))
  .filter((product): product is DropshipProduct => Boolean(product));

/** UK Tech & Automotive Lane · public featured SKUs (fee % Command Center only) */
export const ukDropshipPanelProductIds = [
  "uk-lane-tech",
  "uk-lane-automotive",
  "uk-british-heritage-travel",
  "uk-smart-home-gadgets",
  "uk-football-fan-pack"
] as const;

export const ukFeaturedDropshipProducts = ukDropshipPanelProductIds
  .map((id) => catalog.find((product) => product.id === id))
  .filter((product): product is DropshipProduct => Boolean(product));

export function getDropshipProductsForCountry(countryId: string, lane?: DropshipLaneId | null) {
  if (lane) {
    return catalog.filter((product) => product.countryId === countryId && product.lane === lane);
  }

  if (countryId === "colombia") {
    return colombiaDropshipPanelProductIds
      .map((id) => catalog.find((product) => product.id === id))
      .filter((product): product is DropshipProduct => Boolean(product));
  }

  if (countryId === "ecuador") {
    return ecuadorFeaturedDropshipProducts;
  }

  if (countryId === "uk") {
    return ukFeaturedDropshipProducts;
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
  // Public UK / Ecuador / Japan: clean single currency — no dual FX conversion string
  if (countryId === "uk" || countryId === "ecuador" || countryId === "japan") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  }
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
