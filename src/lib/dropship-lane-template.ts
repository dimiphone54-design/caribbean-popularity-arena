import { getArenaCountryMetaByCountryId } from "@/lib/arena-country-slot-meta";
import { internationalSuiteCountries } from "@/lib/international-suite";
import {
  getAllDropshipProductsForCountry,
  getDropshipProductsForCountry,
  type DropshipProduct
} from "@/lib/dropshipping";
import { DIRECT_DROPSHIP_PLATFORM_PCT } from "@/lib/dropship-pricing";

/** Shared Direct Dropship Lane template · all countries */
export const DIRECT_DROPSHIP_TEMPLATE = {
  laneType: "Direct Dropship",
  feeLabel: "15% platform service fee",
  feePct: DIRECT_DROPSHIP_PLATFORM_PCT,
  payment: "WiPay / Paddle (USD)",
  paymentShort: "Secure Arena checkout",
  currency: "USD",
  shippingLabel: "Direct from local suppliers",
  domesticDelivery: "3–7 business days",
  internationalDelivery: "7–21 days international",
  subtitle: "Supplier Ships Direct · Secure USD Checkout",
  noInventoryNote: "No inventory on the Arena. Tracking sent to your email.",
  notes: [
    "No inventory on Arena",
    "15% platform service fee · every country · Command Center only (never public UI)",
    "Optional premium vendor monthly listing fee · internal",
    "All payouts managed through platform · hide split % from customers"
  ],
  /** Fan-facing fulfillment line — no fee % */
  publicFulfillmentBody: "Local supplier packs and ships directly from their warehouse."
} as const;

export type DirectDropshipHowStep = {
  title: string;
  body: string;
};

export type DirectDropshipLanePublic = {
  countryId: string;
  flag: string;
  countryName: string;
  title: string;
  subtitle: string;
  howItWorksHeading: string;
  steps: readonly DirectDropshipHowStep[];
  footer: string;
  laneCurrency: string;
  payment: string;
  shipping: string;
  hubCity: string;
  featuredProducts: readonly DropshipProduct[];
};

export type DirectDropshipLaneInternal = {
  countryId: string;
  flag: string;
  countryName: string;
  laneType: string;
  fee: string;
  payment: string;
  fulfillment: string;
  delivery: string;
  publicTitle: string;
  publicSubtitle: string;
  publicSteps: readonly string[];
  featuredProducts: ReadonlyArray<{
    name: string;
    description: string;
    priceLabel: string;
    hub: string;
  }>;
  notes: readonly string[];
};

function resolveCountry(countryId: string) {
  const id = countryId.trim().toLowerCase();
  return (
    internationalSuiteCountries.find((c) => c.id === id) ?? {
      id,
      flag: "🏳️",
      name: countryId,
      islandCode: ""
    }
  );
}

export function getDropshipHubCity(countryId: string): string {
  return getArenaCountryMetaByCountryId(countryId).capital || "Local hub";
}

/** Best public room href for a dropship country (when a room exists). */
export function getDropshipCountryRoomHref(countryId: string): string {
  const country = internationalSuiteCountries.find((c) => c.id === countryId);
  const openRoom = country?.rooms.find((r) => r.status === "open");
  if (openRoom?.href) return openRoom.href;
  if (openRoom?.roomSlug) return `/rooms/${openRoom.roomSlug}`;
  if (countryId === "uk") return "/rooms/uk-flag-cotswolds";
  return `/rooms/${countryId}-room`;
}

/** Ready-to-use public How It Works block for any country */
export function buildDirectDropshipHowItWorks(countryName: string): DirectDropshipHowStep[] {
  return [
    {
      title: "Browse",
      body: `Discover authentic ${countryName} products — tech, auto, crafts, food, and local specialties.`
    },
    {
      title: "Order",
      body: "Pay securely on the Arena in USD (WiPay or Paddle)."
    },
    {
      title: "Fulfillment",
      body: DIRECT_DROPSHIP_TEMPLATE.publicFulfillmentBody
    },
    {
      title: "Delivery",
      body: `3–7 business days inside ${countryName}\n7–21 days international`
    }
  ];
}

/** Public lane copy + featured SKUs for a country */
export function buildDirectDropshipPublicLane(countryId: string): DirectDropshipLanePublic {
  const country = resolveCountry(countryId);
  const hubCity = getDropshipHubCity(country.id);
  const featured = getDropshipProductsForCountry(country.id);
  const products =
    featured.length > 0
      ? featured.slice(0, 5)
      : getAllDropshipProductsForCountry(country.id)
          .filter((p) => !p.lane)
          .slice(0, 5);

  return {
    countryId: country.id,
    flag: country.flag,
    countryName: country.name,
    title: `${country.flag} ${country.name} Direct Dropship Lane`,
    subtitle: DIRECT_DROPSHIP_TEMPLATE.subtitle,
    howItWorksHeading: "How It Works",
    steps: buildDirectDropshipHowItWorks(country.name),
    footer: DIRECT_DROPSHIP_TEMPLATE.noInventoryNote,
    laneCurrency: DIRECT_DROPSHIP_TEMPLATE.currency,
    payment: DIRECT_DROPSHIP_TEMPLATE.paymentShort,
    shipping: DIRECT_DROPSHIP_TEMPLATE.shippingLabel,
    hubCity,
    featuredProducts: products
  };
}

/** Command Center internal card for one country */
export function buildDirectDropshipInternalLane(countryId: string): DirectDropshipLaneInternal {
  const publicLane = buildDirectDropshipPublicLane(countryId);
  const hub = publicLane.hubCity;

  return {
    countryId: publicLane.countryId,
    flag: publicLane.flag,
    countryName: publicLane.countryName,
    laneType: DIRECT_DROPSHIP_TEMPLATE.laneType,
    fee: DIRECT_DROPSHIP_TEMPLATE.feeLabel,
    payment: DIRECT_DROPSHIP_TEMPLATE.payment,
    fulfillment: `Supplier ships direct from ${hub}`,
    delivery: `${DIRECT_DROPSHIP_TEMPLATE.domesticDelivery} domestic | ${DIRECT_DROPSHIP_TEMPLATE.internationalDelivery}`,
    publicTitle: publicLane.title,
    publicSubtitle: publicLane.subtitle,
    publicSteps: publicLane.steps.map((s) => s.body.replace(/\n/g, " · ")),
    featuredProducts: publicLane.featuredProducts.map((p) => {
      const fromGuayaquil = p.shipsFrom.includes("Guayaquil");
      const productHub = fromGuayaquil ? "Guayaquil" : hub;
      return {
        name: p.name,
        description: p.description,
        priceLabel: `$${p.price.toFixed(2)}`,
        hub: productHub
      };
    }),
    notes: DIRECT_DROPSHIP_TEMPLATE.notes
  };
}

/** Blank command/template text for operators */
export function getDirectDropshipBlankTemplate(): string {
  return `🇽🇽 [Country Name] Direct Dropship Lane
Supplier Ships Direct • Secure USD Checkout

How It Works
• Browse — Discover authentic [Country] products — tech, auto, crafts, food, and local specialties.
• Order — Pay securely on the Arena in USD (WiPay or Paddle).
• Fulfillment — Local supplier packs and ships directly from their warehouse.
(Internal only — platform fee 15% lives in Command Center, not public copy)
• Delivery — 3–7 business days inside [Country] · 7–21 days international

No inventory on the Arena. Tracking sent to your email.

Featured Products
• Product Name 1 — Short description — Ships from [Main City] • $XX.00
• Product Name 2 — Short description — Ships from [Main City] • $XX.00
• Product Name 3 — Short description — Ships from [Main City] • $XX.00
(Add 2 more if needed)`;
}

/** All International SUITE countries with Direct Dropship lanes */
export function getAllDirectDropshipInternalLanes(): DirectDropshipLaneInternal[] {
  return internationalSuiteCountries.map((c) => buildDirectDropshipInternalLane(c.id));
}
