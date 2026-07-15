import { internationalSuiteCountries } from "@/lib/international-suite";

/** Neutral lane display only — no fees, cuts, or processing math. */
export type DropshipCountryConfig = {
  countryId: string;
  countryName: string;
  flag: string;
  currencyCode: string;
  /** Units of local currency per 1 USD (updated when live FX loads) */
  usdToLocalRate: number;
  legalShort: string;
  legalDropship: string;
};

const baseLegal =
  "Arena operates the customer checkout for supplier lanes and manages supplier payout through the platform. We do not hold inventory, and fulfillment still depends on the supplier partner.";

const configs: DropshipCountryConfig[] = [
  {
    countryId: "colombia",
    countryName: "Colombia",
    flag: "🇨🇴",
    currencyCode: "COP",
    usdToLocalRate: 4000,
    legalShort: "Colombia supplier ships · COP lane · import duties may apply outside Colombia",
    legalDropship: `${baseLegal} Colombia lane: supplier packs in Colombia.`
  },
  {
    countryId: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currencyCode: "GBP",
    usdToLocalRate: 0.79,
    legalShort: "UK supplier ships · GBP lane · UK consumer rights via supplier policy",
    legalDropship: `${baseLegal} UK lane: fulfilled from UK warehouses or partners.`
  },
  {
    countryId: "lithuania",
    countryName: "Lithuania",
    flag: "🇱🇹",
    currencyCode: "EUR",
    usdToLocalRate: 0.92,
    legalShort: "EU Lithuania lane · EUR · EU consumer protection on supplier sales",
    legalDropship: `${baseLegal} Lithuania lane: EU fulfilment partners.`
  },
  {
    countryId: "ecuador",
    countryName: "Ecuador",
    flag: "🇪🇨",
    currencyCode: "USD",
    usdToLocalRate: 1,
    legalShort: "Proveedor ecuatoriano envía · carril USD · hubs Quito y Guayaquil",
    legalDropship: `${baseLegal} Ecuador lane: supplier ships from Quito and Guayaquil hubs.`
  },
  {
    countryId: "trinidad",
    countryName: "Trinidad & Tobago",
    flag: "🇹🇹",
    currencyCode: "TTD",
    usdToLocalRate: 6.8,
    legalShort: "Trinidad lane · TTD conversion · Caribbean fulfilment",
    legalDropship: `${baseLegal} Trinidad & Tobago lane: Caribbean partners ship direct.`
  },
  {
    countryId: "jamaica",
    countryName: "Jamaica",
    flag: "🇯🇲",
    currencyCode: "JMD",
    usdToLocalRate: 155,
    legalShort: "Jamaica lane · JMD conversion · island supplier direct",
    legalDropship: `${baseLegal} Jamaica lane: Kingston-region suppliers.`
  },
  {
    countryId: "venezuela",
    countryName: "Venezuela",
    flag: "🇻🇪",
    currencyCode: "USD",
    usdToLocalRate: 1,
    legalShort: "Venezuela lane · USD display · supplier export lane",
    legalDropship: `${baseLegal} Venezuela lane: USD display for lane stability.`
  },
  {
    countryId: "poland",
    countryName: "Poland",
    flag: "🇵🇱",
    currencyCode: "PLN",
    usdToLocalRate: 4,
    legalShort: "Poland lane · PLN conversion · EU supplier network",
    legalDropship: `${baseLegal} Poland lane: EU fulfilment partners.`
  },
  {
    countryId: "tunisia",
    countryName: "Tunisia",
    flag: "🇹🇳",
    currencyCode: "TND",
    usdToLocalRate: 3.1,
    legalShort: "Tunisia lane · TND conversion · Maghreb supplier",
    legalDropship: `${baseLegal} Tunisia lane: North Africa fulfilment partners.`
  },
  {
    countryId: "guyana",
    countryName: "Guyana",
    flag: "🇬🇾",
    currencyCode: "GYD",
    usdToLocalRate: 210,
    legalShort: "Guyana lane · GYD conversion · Georgetown supplier",
    legalDropship: `${baseLegal} Guyana lane: Caribbean South America suppliers.`
  },
  {
    countryId: "china",
    countryName: "China",
    flag: "🇨🇳",
    currencyCode: "CNY",
    usdToLocalRate: 7.25,
    legalShort: "China lane · CNY conversion · export supplier direct",
    legalDropship: `${baseLegal} China lane: export-oriented suppliers.`
  },
  {
    countryId: "japan",
    countryName: "Japan",
    flag: "🇯🇵",
    currencyCode: "JPY",
    usdToLocalRate: 150,
    legalShort: "Japan lane · JPY conversion · domestic supplier lane",
    legalDropship: `${baseLegal} Japan lane: Japan-based partners where listed on SKU.`
  }
];

const configById = new Map(configs.map((entry) => [entry.countryId, entry]));

export function getDropshipCountryConfig(countryId: string) {
  return configById.get(countryId);
}

export function getAllDropshipCountryConfigs() {
  return configs;
}

/** Every International SUITE country with dropship lanes */
export function getDropshipEnabledCountryIds() {
  return internationalSuiteCountries.map((country) => country.id);
}
