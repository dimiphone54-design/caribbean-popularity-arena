export type DropshipRevenueSplit = {
  grossUsd: number;
  supplierUsd: number;
  platformUsd: number;
  supplierPct: number;
  platformPct: number;
};

export const DEFAULT_DROPSHIP_PLATFORM_PCT = 0.5;

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
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
