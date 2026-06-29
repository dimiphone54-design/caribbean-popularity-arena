import { internationalSuiteCountries } from "@/lib/international-suite";

export type DropshipCountryConfig = {
  countryId: string;
  countryName: string;
  flag: string;
  currencyCode: string;
  /** Units of local currency per 1 USD (updated when live FX loads) */
  usdToLocalRate: number;
  /** Estimated supplier + fulfilment share of retail USD price */
  supplierCostPercent: number;
  /** Card processing · country lane estimate (some regions higher cross-border) */
  processingPercent: number;
  legalShort: string;
  legalDropship: string;
};

const baseLegal =
  "Arena lists supplier lanes only — we do not hold inventory. Checkout is a product order fulfilled by an independent supplier in the listed country. Digital gift lanes are separate from physical dropship orders.";

const configs: DropshipCountryConfig[] = [
  {
    countryId: "colombia",
    countryName: "Colombia",
    flag: "🇨🇴",
    currencyCode: "COP",
    usdToLocalRate: 4000,
    supplierCostPercent: 62,
    processingPercent: 3.4,
    legalShort: "Colombia supplier ships · COP lane · import duties may apply outside Colombia",
    legalDropship: `${baseLegal} Colombia lane: supplier packs in Colombia. Consumer rules under SIC / local commerce apply to the seller-of-record partner.`
  },
  {
    countryId: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currencyCode: "GBP",
    usdToLocalRate: 0.79,
    supplierCostPercent: 58,
    processingPercent: 3.4,
    legalShort: "UK supplier ships · GBP lane · UK consumer rights via supplier policy",
    legalDropship: `${baseLegal} UK lane: fulfilled from UK warehouses or partners. UK Consumer Rights Act disclosures apply to the fulfilling merchant.`
  },
  {
    countryId: "lithuania",
    countryName: "Lithuania",
    flag: "🇱🇹",
    currencyCode: "EUR",
    usdToLocalRate: 0.92,
    supplierCostPercent: 57,
    processingPercent: 3.4,
    legalShort: "EU Lithuania lane · EUR · EU consumer protection on supplier sales",
    legalDropship: `${baseLegal} Lithuania lane: EU VAT and consumer directives may apply on cross-border delivery into the EU.`
  },
  {
    countryId: "ecuador",
    countryName: "Ecuador",
    flag: "🇪🇨",
    currencyCode: "USD",
    usdToLocalRate: 1,
    supplierCostPercent: 60,
    processingPercent: 3.4,
    legalShort: "Proveedor ecuatoriano envía · carril USD · hubs Quito y Guayaquil · aranceles fuera de Ecuador pueden aplicar",
    legalDropship: `${baseLegal} Ecuador lane: priced in USD. Supplier ships from Quito and Guayaquil hubs listed on each SKU. National delivery typically 3–7 business days; international 7–21 days depending on destination. Import duties may apply outside Ecuador.`
  },
  {
    countryId: "trinidad",
    countryName: "Trinidad & Tobago",
    flag: "🇹🇹",
    currencyCode: "TTD",
    usdToLocalRate: 6.8,
    supplierCostPercent: 61,
    processingPercent: 3.5,
    legalShort: "Trinidad lane · TTD conversion · Caribbean fulfilment",
    legalDropship: `${baseLegal} Trinidad & Tobago lane: supplier ships from listed Caribbean partners. Customs may apply on import.`
  },
  {
    countryId: "jamaica",
    countryName: "Jamaica",
    flag: "🇯🇲",
    currencyCode: "JMD",
    usdToLocalRate: 155,
    supplierCostPercent: 61,
    processingPercent: 3.5,
    legalShort: "Jamaica lane · JMD conversion · island supplier direct",
    legalDropship: `${baseLegal} Jamaica lane: Kingston-region suppliers fulfil orders. Consumer complaints route to supplier policy first.`
  },
  {
    countryId: "venezuela",
    countryName: "Venezuela",
    flag: "🇻🇪",
    currencyCode: "USD",
    usdToLocalRate: 1,
    supplierCostPercent: 63,
    processingPercent: 3.6,
    legalShort: "Venezuela lane · USD display · supplier export lane",
    legalDropship: `${baseLegal} Venezuela lane: USD pricing for arena stability. Fulfilment subject to supplier export availability.`
  },
  {
    countryId: "poland",
    countryName: "Poland",
    flag: "🇵🇱",
    currencyCode: "PLN",
    usdToLocalRate: 4,
    supplierCostPercent: 56,
    processingPercent: 3.4,
    legalShort: "Poland lane · PLN conversion · EU supplier network",
    legalDropship: `${baseLegal} Poland lane: EU fulfilment. PLN shown for local reference; checkout settles in USD on arena.`
  },
  {
    countryId: "tunisia",
    countryName: "Tunisia",
    flag: "🇹🇳",
    currencyCode: "TND",
    usdToLocalRate: 3.1,
    supplierCostPercent: 60,
    processingPercent: 3.5,
    legalShort: "Tunisia lane · TND conversion · Maghreb supplier",
    legalDropship: `${baseLegal} Tunisia lane: North Africa fulfilment partners. Cross-border fees may apply.`
  },
  {
    countryId: "guyana",
    countryName: "Guyana",
    flag: "🇬🇾",
    currencyCode: "GYD",
    usdToLocalRate: 210,
    supplierCostPercent: 61,
    processingPercent: 3.5,
    legalShort: "Guyana lane · GYD conversion · Georgetown supplier",
    legalDropship: `${baseLegal} Guyana lane: Caribbean South America fulfilment from listed suppliers.`
  },
  {
    countryId: "china",
    countryName: "China",
    flag: "🇨🇳",
    currencyCode: "CNY",
    usdToLocalRate: 7.25,
    supplierCostPercent: 55,
    processingPercent: 3.3,
    legalShort: "China lane · CNY conversion · export supplier direct",
    legalDropship: `${baseLegal} China lane: export-oriented suppliers. International shipping times vary by destination.`
  },
  {
    countryId: "japan",
    countryName: "Japan",
    flag: "🇯🇵",
    currencyCode: "JPY",
    usdToLocalRate: 150,
    supplierCostPercent: 54,
    processingPercent: 3.3,
    legalShort: "Japan lane · JPY conversion · domestic supplier lane",
    legalDropship: `${baseLegal} Japan lane: fulfilled by Japan-based partners where listed on SKU.`
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

export function getDropshipSupplierCostUsd(countryId: string, retailUsd: number) {
  const config = getDropshipCountryConfig(countryId);
  const pct = config?.supplierCostPercent ?? 60;
  return retailUsd * (pct / 100);
}

export function getDropshipProcessingUsd(countryId: string, grossUsd: number, fixedUsd = 0.3) {
  const config = getDropshipCountryConfig(countryId);
  const pct = config?.processingPercent ?? 3.4;
  return grossUsd * (pct / 100) + fixedUsd;
}

/** Automated tiered lane split on USD retail */
export function computeDropshipLaneSplit(
  countryId: string,
  grossUsd: number,
  hostSharePercent = 50
) {
  const supplierUsd = getDropshipSupplierCostUsd(countryId, grossUsd);
  const processingUsd = getDropshipProcessingUsd(countryId, grossUsd);
  const marginUsd = Math.max(0, grossUsd - supplierUsd - processingUsd);
  const platformSharePercent = 100 - hostSharePercent;
  const hostUsd = marginUsd * (hostSharePercent / 100);
  const platformUsd = marginUsd * (platformSharePercent / 100);
  return { grossUsd, supplierUsd, processingUsd, marginUsd, hostUsd, platformUsd, hostSharePercent, platformSharePercent };
}
