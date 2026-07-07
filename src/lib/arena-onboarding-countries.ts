import worldCountries from "world-countries";

export type ArenaOnboardingCountry = {
  islandCode: string;
  country: string;
  flag: string;
};

function toFlagEmoji(countryCode: string) {
  if (countryCode.length !== 2) return "🌍";
  const base = 0x1f1e6;
  const [first, second] = countryCode.toUpperCase().split("");
  if (!first || !second) return "🌍";
  return String.fromCodePoint(base + first.charCodeAt(0) - 65, base + second.charCodeAt(0) - 65);
}

export const arenaOnboardingCountries: ArenaOnboardingCountry[] = worldCountries
  .filter((country) => country.independent || country.unMember)
  .map((country) => ({
    islandCode: country.cca2,
    country: country.name.common,
    flag: toFlagEmoji(country.cca2)
  }))
  .sort((left, right) => left.country.localeCompare(right.country, "en"));

export function findOnboardingCountry(islandCode: string) {
  return arenaOnboardingCountries.find((entry) => entry.islandCode === islandCode) ?? null;
}

export function detectBrowserCountryCode() {
  if (typeof window === "undefined") return null;

  const candidates = window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language];

  for (const candidate of candidates) {
    const normalized = candidate.trim();
    if (!normalized) continue;

    try {
      const locale = new Intl.Locale(normalized);
      const region = locale.region?.toUpperCase();
      if (region && findOnboardingCountry(region)) return region;
    } catch {
      // Ignore locales that Intl.Locale cannot parse.
    }

    const region = normalized.split("-")[1]?.toUpperCase();
    if (region && findOnboardingCountry(region)) return region;
  }

  return null;
}
