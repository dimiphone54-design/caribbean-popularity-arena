export type DropshipRevenueSplit = {
  grossUsd: number;
  supplierUsd: number;
  platformUsd: number;
  supplierPct: number;
  platformPct: number;
};

/**
 * Direct Dropship Lane · 15% arena service fee for every country.
 * Host AI “50/50 · 70/30” displays are separate from this checkout fee.
 */
export const DIRECT_DROPSHIP_PLATFORM_PCT = 0.15;
export const DEFAULT_DROPSHIP_PLATFORM_PCT = DIRECT_DROPSHIP_PLATFORM_PCT;
/** @deprecated use DIRECT_DROPSHIP_PLATFORM_PCT */
export const ECUADOR_DROPSHIP_PLATFORM_PCT = DIRECT_DROPSHIP_PLATFORM_PCT;

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function getDropshipPlatformPctForCountry(_countryId?: string | null) {
  return DIRECT_DROPSHIP_PLATFORM_PCT;
}

export function getDropshipRevenueSplit(grossUsd: number, platformPct = DEFAULT_DROPSHIP_PLATFORM_PCT): DropshipRevenueSplit {
  const safeGross = Math.max(0, grossUsd);
  const safePlatformPct = Math.min(1, Math.max(0, platformPct));
  const platformUsd = roundMoney(safeGross * safePlatformPct);
  const supplierUsd = roundMoney(safeGross - platformUsd);

  return {
    grossUsd: roundMoney(safeGross),
    supplierUsd,
    platformUsd,
    supplierPct: roundMoney((1 - safePlatformPct) * 100),
    platformPct: roundMoney(safePlatformPct * 100)
  };
}

export function getDropshipRevenueSplitForCountry(grossUsd: number, countryId?: string | null) {
  return getDropshipRevenueSplit(grossUsd, getDropshipPlatformPctForCountry(countryId));
}
