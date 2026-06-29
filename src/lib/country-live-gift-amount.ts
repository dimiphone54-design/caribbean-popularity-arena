import { countryRoomLiveAccessUsd } from "@/lib/country-room-access";
import { getDropshipCountryConfig } from "@/lib/dropship-country-config";
import {
  convertUsdToCountryLocal,
  formatDropshipCurrency,
  formatUsd
} from "@/lib/dropship-fx";

function roundLocalGiftAmount(local: number, currencyCode: string) {
  if (currencyCode === "JPY" || currencyCode === "COP" || currencyCode === "GYD" || currencyCode === "JMD") {
    return Math.round(local);
  }
  if (currencyCode === "TND") {
    return Math.round(local * 1000) / 1000;
  }
  return Math.round(local * 100) / 100;
}

/** Local currency label · always equivalent to fixed $6 USD live gift */
export function formatCountryLiveGiftAmount(countryId: string) {
  const converted = convertUsdToCountryLocal(countryRoomLiveAccessUsd, countryId);
  if (!converted.config || converted.config.currencyCode === "USD") {
    return formatUsd(countryRoomLiveAccessUsd);
  }

  const rounded = roundLocalGiftAmount(converted.local, converted.currencyCode);
  return formatDropshipCurrency(rounded, converted.currencyCode);
}

export function formatCountryLiveGiftUsdAmount() {
  return formatUsd(countryRoomLiveAccessUsd);
}

export function countryLiveGiftSettlesInLocalCurrency(countryId: string) {
  const config = getDropshipCountryConfig(countryId);
  return Boolean(config && config.currencyCode !== "USD");
}

/** Legal micro-copy when local currency is shown · checkout still $6 USD */
export function getCountryLiveGiftAmountLegalNote(countryId: string) {
  if (!countryLiveGiftSettlesInLocalCurrency(countryId)) {
    return null;
  }
  return `Shown as ${formatCountryLiveGiftAmount(countryId)} · settles at ${formatCountryLiveGiftUsdAmount()} USD.`;
}
