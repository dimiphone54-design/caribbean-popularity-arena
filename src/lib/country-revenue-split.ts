import { countryRoomLiveAccessUsd, countryRoomLiveSessionHours } from "@/lib/country-room-access";
import {
  getDropshipCountryConfig,
  getDropshipProcessingUsd,
  getDropshipSupplierCostUsd as getCatalogSupplierCostUsd
} from "@/lib/dropship-country-config";
import type { DropshipProduct } from "@/lib/dropshipping";
import { getDropshipProductsForCountry } from "@/lib/dropshipping";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { getOpenRoomsForCountry } from "@/lib/international-suite";

/** Arena Plus tiers · compete with Twitch / YouTube on live; same tiers on dropship margin */
export type HostRevenueTierId = "base" | "level1" | "level2";

export type HostRevenueTier = {
  id: HostRevenueTierId;
  label: string;
  hostSharePercent: number;
  platformSharePercent: number;
  qualification: string;
  compareNote: string;
};

export const hostRevenueTiers: HostRevenueTier[] = [
  {
    id: "base",
    label: "Base",
    hostSharePercent: 50,
    platformSharePercent: 50,
    qualification: "New hosts · default country lane",
    compareNote: "Matches Twitch default 50/50 after fees"
  },
  {
    id: "level1",
    label: "Arena Plus L1",
    hostSharePercent: 60,
    platformSharePercent: 40,
    qualification: "5+ live gifts/week in your lane · 3 consecutive months",
    compareNote: "Matches Twitch Plus Level 1 · 60/40"
  },
  {
    id: "level2",
    label: "Arena Plus L2",
    hostSharePercent: 70,
    platformSharePercent: 30,
    qualification: "15+ live gifts/week in your lane · 3 consecutive months",
    compareNote: "Matches YouTube memberships · 70/30"
  }
];

export function getHostRevenueTier(tierId: HostRevenueTierId = "base") {
  return hostRevenueTiers.find((tier) => tier.id === tierId) ?? hostRevenueTiers[0];
}

/** Published split policy · used in calculator + host disclosures */
export const countryRevenueSplitMeta = {
  hostSharePercent: 50,
  platformSharePercent: 50,
  maxHostSharePercent: 70,
  paymentProcessingPercent: 3.4,
  paymentProcessingFixedUsd: 0.3,
  legalNote:
    "Live gifts are voluntary digital access contributions—not purchases of goods or services. After card processing, base hosts receive a 50/50 split on net live gift proceeds and on arena margin from dropship sales. Qualified Arena Plus hosts earn 60/40 (L1) or 70/30 (L2) on both revenue lanes, comparable to Twitch Plus and YouTube channel memberships.",
  liveGiftCheckoutFooter:
    "Complete gift terms, privacy policy, and country lane disclosures are available in the legal suite.",
  formulas: {
    processing: "processing = gross × (fee% ÷ 100) + fixedFee",
    liveNet: "net = gross − processing",
    liveHost: "hostCut = net × (host% ÷ 100)",
    livePlatform: "platformCut = net × (platform% ÷ 100)",
    dropshipMargin: "margin = gross − supplierCost − processing",
    dropshipHost: "hostCut = margin × (host% ÷ 100)",
    dropshipPlatform: "platformCut = margin × (platform% ÷ 100)"
  }
} as const;

export type RevenueLaneId = "live_gift" | "dropship";

export type CountryRevenueProfile = {
  countryId: string;
  countryName: string;
  flag: string;
  localCurrency: string;
  /** Units of local currency per 1 USD (updated live when FX fetch succeeds) */
  usdToLocalRate: number;
  liveGiftUsd: number;
  liveSessionHours: number;
  /** Default supplier share of retail when product has no supplierCostUsd */
  dropshipSupplierCostPercent: number;
};

export type SplitLineItem = {
  id: string;
  label: string;
  formula: string;
  amountUsd: number;
  note?: string;
};

export type RevenueSplitBreakdown = {
  lane: RevenueLaneId;
  tierId: HostRevenueTierId;
  hostSharePercent: number;
  platformSharePercent: number;
  grossUsd: number;
  processingUsd: number;
  supplierUsd?: number;
  netOrMarginUsd: number;
  hostUsd: number;
  platformUsd: number;
  hostPercentOfGross: number;
  platformPercentOfGross: number;
  lines: SplitLineItem[];
  grossLocal: number;
  hostLocal: number;
  platformLocal: number;
  processingLocal: number;
  supplierLocal?: number;
};

const activeProfiles: CountryRevenueProfile[] = internationalSuiteCountries.map((country) => {
  const config = getDropshipCountryConfig(country.id);
  return {
    countryId: country.id,
    countryName: country.name,
    flag: country.flag,
    localCurrency: config?.currencyCode ?? "USD",
    usdToLocalRate: config?.usdToLocalRate ?? 1,
    liveGiftUsd: countryRoomLiveAccessUsd,
    liveSessionHours: countryRoomLiveSessionHours,
    dropshipSupplierCostPercent: config?.supplierCostPercent ?? 60
  };
});

export function getCountryRevenueProfile(countryId: string) {
  const profile = activeProfiles.find((entry) => entry.countryId === countryId);
  if (!profile) return undefined;
  const config = getDropshipCountryConfig(countryId);
  return {
    ...profile,
    usdToLocalRate: config?.usdToLocalRate ?? profile.usdToLocalRate
  };
}

export function getActiveCountryRevenueProfiles() {
  return activeProfiles;
}

export function applyFxRatesToProfiles(rates: Record<string, number>) {
  for (const profile of activeProfiles) {
    const config = getDropshipCountryConfig(profile.countryId);
    if (config && rates[config.currencyCode]) {
      config.usdToLocalRate = rates[config.currencyCode];
      profile.usdToLocalRate = config.usdToLocalRate;
    }
  }
}

export function computePaymentProcessingUsd(grossUsd: number) {
  if (grossUsd <= 0) return 0;
  return (
    grossUsd * (countryRevenueSplitMeta.paymentProcessingPercent / 100) +
    countryRevenueSplitMeta.paymentProcessingFixedUsd
  );
}

export function usdToLocalAmount(usd: number, profile: CountryRevenueProfile) {
  return usd * profile.usdToLocalRate;
}

export function formatLocalMoney(amount: number, profile: CountryRevenueProfile) {
  if (profile.localCurrency === "COP") {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(amount);
  }

  if (profile.localCurrency === "GBP") {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
  }

  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatUsdMoney(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function withLocalAmounts(
  profile: CountryRevenueProfile,
  breakdown: Omit<
    RevenueSplitBreakdown,
    "grossLocal" | "hostLocal" | "platformLocal" | "processingLocal" | "supplierLocal"
  >
): RevenueSplitBreakdown {
  return {
    ...breakdown,
    grossLocal: usdToLocalAmount(breakdown.grossUsd, profile),
    hostLocal: usdToLocalAmount(breakdown.hostUsd, profile),
    platformLocal: usdToLocalAmount(breakdown.platformUsd, profile),
    processingLocal: usdToLocalAmount(breakdown.processingUsd, profile),
    supplierLocal: breakdown.supplierUsd != null ? usdToLocalAmount(breakdown.supplierUsd, profile) : undefined
  };
}

/** Live gift lane · $6 · 3h · tiered split on net after processing */
export function computeLiveGiftSplit(
  profile: CountryRevenueProfile,
  giftsCount = 1,
  tierId: HostRevenueTierId = "base"
): RevenueSplitBreakdown {
  const tier = getHostRevenueTier(tierId);
  const grossUsd = profile.liveGiftUsd * giftsCount;
  const processingUsd = getDropshipProcessingUsd(profile.countryId, grossUsd);
  const netUsd = Math.max(0, grossUsd - processingUsd);
  const hostUsd = netUsd * (tier.hostSharePercent / 100);
  const platformUsd = netUsd * (tier.platformSharePercent / 100);

  const feePct = countryRevenueSplitMeta.paymentProcessingPercent;
  const fixed = countryRevenueSplitMeta.paymentProcessingFixedUsd;

  const lines: SplitLineItem[] = [
    {
      id: "gross",
      label: `Live gift × ${giftsCount}`,
      formula: `${formatUsdMoney(profile.liveGiftUsd)} × ${giftsCount} = ${formatUsdMoney(grossUsd)}`,
      amountUsd: grossUsd
    },
    {
      id: "processing",
      label: "Card processing",
      formula: `${formatUsdMoney(grossUsd)} × ${feePct}% + ${formatUsdMoney(fixed)} = ${formatUsdMoney(processingUsd)}`,
      amountUsd: -processingUsd
    },
    {
      id: "net",
      label: "Net to split",
      formula: countryRevenueSplitMeta.formulas.liveNet.replace("gross", formatUsdMoney(grossUsd)),
      amountUsd: netUsd
    },
    {
      id: "host",
      label: `Host cut (${tier.hostSharePercent}% · ${tier.label})`,
      formula: `${formatUsdMoney(netUsd)} × ${tier.hostSharePercent}% = ${formatUsdMoney(hostUsd)}`,
      amountUsd: hostUsd,
      note: tier.compareNote
    },
    {
      id: "platform",
      label: `Platform cut (${tier.platformSharePercent}%)`,
      formula: `${formatUsdMoney(netUsd)} × ${tier.platformSharePercent}% = ${formatUsdMoney(platformUsd)}`,
      amountUsd: platformUsd
    }
  ];

  return withLocalAmounts(profile, {
    lane: "live_gift",
    tierId: tier.id,
    hostSharePercent: tier.hostSharePercent,
    platformSharePercent: tier.platformSharePercent,
    grossUsd,
    processingUsd,
    netOrMarginUsd: netUsd,
    hostUsd,
    platformUsd,
    hostPercentOfGross: grossUsd > 0 ? (hostUsd / grossUsd) * 100 : 0,
    platformPercentOfGross: grossUsd > 0 ? (platformUsd / grossUsd) * 100 : 0,
    lines
  });
}

export function getDropshipSupplierCostUsd(product: DropshipProduct) {
  if (typeof product.supplierCostUsd === "number") return product.supplierCostUsd;
  return getCatalogSupplierCostUsd(product.countryId, product.price);
}

/** Dropship lane · tiered split on margin after supplier + processing */
export function computeDropshipProductSplit(
  product: DropshipProduct,
  profile: CountryRevenueProfile,
  orderCount = 1,
  tierId: HostRevenueTierId = "base"
): RevenueSplitBreakdown {
  const tier = getHostRevenueTier(tierId);
  const grossUsd = product.price * orderCount;
  const supplierPerUnit = getDropshipSupplierCostUsd(product);
  const supplierUsd = supplierPerUnit * orderCount;
  const processingUsd = getDropshipProcessingUsd(profile.countryId, grossUsd);
  const marginUsd = Math.max(0, grossUsd - supplierUsd - processingUsd);
  const hostUsd = marginUsd * (tier.hostSharePercent / 100);
  const platformUsd = marginUsd * (tier.platformSharePercent / 100);

  const feePct = countryRevenueSplitMeta.paymentProcessingPercent;
  const fixed = countryRevenueSplitMeta.paymentProcessingFixedUsd;

  const lines: SplitLineItem[] = [
    {
      id: "gross",
      label: `${product.name} × ${orderCount}`,
      formula: `${formatUsdMoney(product.price)} × ${orderCount} = ${formatUsdMoney(grossUsd)}`,
      amountUsd: grossUsd
    },
    {
      id: "supplier",
      label: "Supplier + fulfilment",
      formula: `${formatUsdMoney(supplierPerUnit)} × ${orderCount} = ${formatUsdMoney(supplierUsd)}`,
      amountUsd: -supplierUsd,
      note: product.supplierNote
    },
    {
      id: "processing",
      label: "Card processing",
      formula: `${formatUsdMoney(grossUsd)} × ${feePct}% + ${formatUsdMoney(fixed)} = ${formatUsdMoney(processingUsd)}`,
      amountUsd: -processingUsd
    },
    {
      id: "margin",
      label: "Arena margin",
      formula: `${formatUsdMoney(grossUsd)} − ${formatUsdMoney(supplierUsd)} − ${formatUsdMoney(processingUsd)} = ${formatUsdMoney(marginUsd)}`,
      amountUsd: marginUsd
    },
    {
      id: "host",
      label: `Host cut (${tier.hostSharePercent}% · ${tier.label})`,
      formula: `${formatUsdMoney(marginUsd)} × ${tier.hostSharePercent}% = ${formatUsdMoney(hostUsd)}`,
      amountUsd: hostUsd,
      note: tier.compareNote
    },
    {
      id: "platform",
      label: `Platform cut (${tier.platformSharePercent}%)`,
      formula: `${formatUsdMoney(marginUsd)} × ${tier.platformSharePercent}% = ${formatUsdMoney(platformUsd)}`,
      amountUsd: platformUsd
    }
  ];

  return withLocalAmounts(profile, {
    lane: "dropship",
    tierId: tier.id,
    hostSharePercent: tier.hostSharePercent,
    platformSharePercent: tier.platformSharePercent,
    grossUsd,
    processingUsd,
    supplierUsd,
    netOrMarginUsd: marginUsd,
    hostUsd,
    platformUsd,
    hostPercentOfGross: grossUsd > 0 ? (hostUsd / grossUsd) * 100 : 0,
    platformPercentOfGross: grossUsd > 0 ? (platformUsd / grossUsd) * 100 : 0,
    lines
  });
}

export function getOpenCountryRoomLabels(countryId: string) {
  return getOpenRoomsForCountry(countryId).map((room) => room.roomLabel);
}

/** @deprecated use computeLiveGiftSplit */
export function estimateLiveGiftSplit(profile: CountryRevenueProfile) {
  return computeLiveGiftSplit(profile, 1);
}

/** @deprecated use computeDropshipProductSplit with a catalog product */
export function estimateDropshipSplit(profile: CountryRevenueProfile) {
  const product = getDropshipProductsForCountry(profile.countryId)[0];
  if (product) return computeDropshipProductSplit(product, profile, 1);
  return computeLiveGiftSplit(profile, 1);
}

export function estimateBlendedPlatformPercentOfGross() {
  const livePercents = activeProfiles.map((profile) => computeLiveGiftSplit(profile, 1).platformPercentOfGross);
  const dropshipPercents = activeProfiles.map(
    (profile) => estimateDropshipSplit(profile).platformPercentOfGross
  );
  const liveAvg = livePercents.reduce((sum, value) => sum + value, 0) / livePercents.length;
  const dropshipAvg = dropshipPercents.reduce((sum, value) => sum + value, 0) / dropshipPercents.length;
  return {
    liveGiftOnlyPlatformPercent: liveAvg,
    dropshipMarginPlatformPercent: dropshipAvg,
    blendedPlatformPercent: (liveAvg + dropshipAvg) / 2
  };
}
