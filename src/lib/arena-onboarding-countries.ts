import { arenaCreators } from "@/lib/arena-experience";

/** Front 12 nations · member + woman onboarding country pickers */
export const arenaOnboardingCountries = arenaCreators.slice(0, 12).map((slot) => ({
  islandCode: slot.islandCode,
  country: slot.country,
  flag: slot.flag
}));

export function findOnboardingCountry(islandCode: string) {
  return arenaOnboardingCountries.find((entry) => entry.islandCode === islandCode) ?? null;
}
