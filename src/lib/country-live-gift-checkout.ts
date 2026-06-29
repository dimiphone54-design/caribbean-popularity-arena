import { countryRoomLiveAccessUsd, countryRoomLiveSessionHours } from "@/lib/country-room-access";
import {
  computeLiveGiftSplit,
  countryRevenueSplitMeta,
  formatUsdMoney,
  getCountryRevenueProfile,
  hostRevenueTiers
} from "@/lib/country-revenue-split";
import { internationalSuiteCountries } from "@/lib/international-suite";

export const countryLiveGiftPendingKey = "cfa-country-live-gift-pending";

export type CountryLiveGiftPending = {
  roomSlug: string;
  countryId: string;
  countryName: string;
};

export function getDefaultCountryRoomSlug(countryId: string) {
  const country = internationalSuiteCountries.find((entry) => entry.id === countryId);
  if (!country) return `${countryId}-intl-lane`;

  const builtRoom = country.rooms.find((room) => room.status === "open" && !room.href);
  if (builtRoom) return builtRoom.roomSlug;

  const anyOpen = country.rooms.find((room) => room.status === "open");
  return anyOpen?.roomSlug ?? `${countryId}-intl-lane`;
}

export type CountryLiveGiftTermSection = {
  label: string;
  detail: string;
};

export function getCountryLiveGiftTerms(countryId: string) {
  const profile = getCountryRevenueProfile(countryId);
  const base = profile ? computeLiveGiftSplit(profile, 1, "base") : null;
  const l1 = profile ? computeLiveGiftSplit(profile, 1, "level1") : null;
  const l2 = profile ? computeLiveGiftSplit(profile, 1, "level2") : null;
  const priceLabel = formatUsdMoney(countryRoomLiveAccessUsd);
  const processingLabel = `~${countryRevenueSplitMeta.paymentProcessingPercent}% + ${formatUsdMoney(countryRevenueSplitMeta.paymentProcessingFixedUsd)}`;

  const sections: CountryLiveGiftTermSection[] = [
    {
      label: "Live games & activities",
      detail: `Your ${priceLabel} gift unlocks ${countryRoomLiveSessionHours} hours of live games, talk-show, and activities for this country lane.`
    },
    {
      label: "Payment processing",
      detail: `Card fees (${processingLabel} USD) are deducted from the gift amount before revenue is allocated.`
    },
    {
      label: `Base tier · ${hostRevenueTiers[0].hostSharePercent}/${hostRevenueTiers[0].platformSharePercent}`,
      detail: base
        ? `Estimated net allocation per gift: ${formatUsdMoney(base.hostUsd)} host · ${formatUsdMoney(base.platformUsd)} platform.`
        : `Hosts and platform each receive ${hostRevenueTiers[0].hostSharePercent}% of net proceeds after fees.`
    },
    {
      label: "Arena Plus · qualified hosts",
      detail:
        l1 && l2
          ? `L1 ${hostRevenueTiers[1].hostSharePercent}/${hostRevenueTiers[1].platformSharePercent}: est. ${formatUsdMoney(l1.hostUsd)} host per gift. L2 ${hostRevenueTiers[2].hostSharePercent}/${hostRevenueTiers[2].platformSharePercent}: est. ${formatUsdMoney(l2.hostUsd)} host per gift.`
          : `Qualified hosts may earn up to ${hostRevenueTiers[2].hostSharePercent}% of net proceeds (YouTube-class 70/30).`
    },
    {
      label: "Nature of payment",
      detail:
        "This is a voluntary digital access contribution, not a purchase of goods or services. Completing payment constitutes agreement to arena gift terms and applicable country lane disclosures."
    }
  ];

  return {
    title: "Gift terms & revenue disclosure",
    subtitle: `${priceLabel} live access gift`,
    priceLabel,
    sessionHours: countryRoomLiveSessionHours,
    sections,
    legalNote: countryRevenueSplitMeta.liveGiftCheckoutFooter
  };
}

export function saveCountryLiveGiftPending(pending: CountryLiveGiftPending) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(countryLiveGiftPendingKey, JSON.stringify(pending));
}

export function readCountryLiveGiftPending(): CountryLiveGiftPending | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(countryLiveGiftPendingKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CountryLiveGiftPending;
    if (!parsed.roomSlug || !parsed.countryId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearCountryLiveGiftPending() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(countryLiveGiftPendingKey);
}

export function parseCountryLiveGiftRoomSlug(customReference: string) {
  if (!customReference.startsWith("country-live-gift__")) return null;
  const body = customReference.slice("country-live-gift__".length);
  const lastSep = body.lastIndexOf("__");
  if (lastSep <= 0) return null;
  return body.slice(0, lastSep);
}
