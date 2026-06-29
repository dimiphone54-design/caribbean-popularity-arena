import {
  getAllDropshipCountryConfigs,
  getDropshipCountryConfig,
  type DropshipCountryConfig
} from "@/lib/dropship-country-config";

const FX_CACHE_KEY = "cfa-dropship-fx-rates";
const FX_CACHE_MS = 6 * 60 * 60 * 1000;

type FxCache = {
  fetchedAt: number;
  rates: Record<string, number>;
};

let liveRates: Record<string, number> | null = null;

export function getDropshipFxRates() {
  return liveRates;
}

export function applyDropshipFxRates(rates: Record<string, number>) {
  liveRates = rates;
  for (const config of getAllDropshipCountryConfigs()) {
    const rate = rates[config.currencyCode];
    if (rate && Number.isFinite(rate)) {
      config.usdToLocalRate = rate;
    }
  }
}

export async function refreshDropshipFxRates() {
  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(FX_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as FxCache;
        if (Date.now() - cached.fetchedAt < FX_CACHE_MS) {
          applyDropshipFxRates(cached.rates);
          return { source: "cache" as const, rates: cached.rates };
        }
      }
    } catch {
      /* ignore */
    }
  }

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!response.ok) throw new Error("FX unavailable");
    const data = (await response.json()) as { rates?: Record<string, number> };
    if (!data.rates) throw new Error("FX incomplete");

    applyDropshipFxRates(data.rates);

    const cache: FxCache = { fetchedAt: Date.now(), rates: data.rates };
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(FX_CACHE_KEY, JSON.stringify(cache));
    }

    return { source: "live" as const, rates: data.rates };
  } catch {
    return { source: "fallback" as const, rates: null };
  }
}

export function usdToLocal(usd: number, config: DropshipCountryConfig) {
  return usd * config.usdToLocalRate;
}

export function localToUsd(local: number, config: DropshipCountryConfig) {
  if (config.usdToLocalRate <= 0) return 0;
  return local / config.usdToLocalRate;
}

export function convertUsdToCountryLocal(usd: number, toCountryId: string) {
  const config = getDropshipCountryConfig(toCountryId);
  if (!config) return { usd, local: usd, currencyCode: "USD", config: null };
  return {
    usd,
    local: usdToLocal(usd, config),
    currencyCode: config.currencyCode,
    config
  };
}

export function convertCountryToCountry(usdAmount: number, fromCountryId: string, toCountryId: string) {
  const from = getDropshipCountryConfig(fromCountryId);
  const to = getDropshipCountryConfig(toCountryId);
  if (!from || !to) {
    return {
      usdAmount,
      fromLocal: usdAmount,
      toLocal: usdAmount,
      fromCurrency: "USD",
      toCurrency: "USD",
      rate: 1,
      formula: `${usdAmount} USD`
    };
  }

  const fromLocal = usdToLocal(usdAmount, from);
  const toLocal = usdToLocal(usdAmount, to);
  const rate = to.usdToLocalRate / from.usdToLocalRate;

  return {
    usdAmount,
    fromLocal,
    toLocal,
    fromCurrency: from.currencyCode,
    toCurrency: to.currencyCode,
    rate,
    formula: `1 ${from.currencyCode} = ${rate.toFixed(6)} ${to.currencyCode} · base ${usdAmount} USD`
  };
}

export function formatDropshipCurrency(amount: number, currencyCode: string) {
  const zeroDecimal = currencyCode === "JPY";
  const fractionDigits = zeroDecimal ? 0 : currencyCode === "TND" ? 3 : 2;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatDropshipDualPrice(usd: number, countryId: string) {
  const converted = convertUsdToCountryLocal(usd, countryId);
  if (!converted.config || converted.config.currencyCode === "USD") {
    return formatUsd(usd);
  }
  return `${formatUsd(usd)} · ${formatDropshipCurrency(converted.local, converted.currencyCode)}`;
}
