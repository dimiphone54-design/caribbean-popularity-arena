import { resolveDropshipCountryId } from "@/lib/dropshipping";

/** Explicit path → International SUITE country id (clocks · AI voice · layout) */
const roomPathToCountryId: Array<[pathFragment: string, countryId: string]> = [
  ["/rooms/colombia-room", "colombia"],
  ["/rooms/ecuador-room", "ecuador"],
  ["/rooms/spain-room", "spain"],
  ["/rooms/uk-flag-cotswolds", "uk"],
  ["/rooms/japan-room", "japan"],
  ["/rooms/china-room", "china"],
  ["/rooms/trinidad-room", "trinidad"],
  ["/rooms/jamaica-room", "jamaica"],
  ["/rooms/guyana-room", "guyana"],
  ["/rooms/poland-room", "poland"],
  ["/rooms/lithuania-room", "lithuania"],
  ["/rooms/tunisia-room", "tunisia"]
];

/** Map /rooms/* paths to International SUITE country ids for clocks, AI voice, layout */
export function getRoomCountryId(pathname: string | null, dropshipCountry: string | null): string | null {
  if (!pathname) return null;

  for (const [fragment, countryId] of roomPathToCountryId) {
    if (pathname.includes(fragment)) return countryId;
  }

  if (pathname.includes("/rooms/dropship-market")) {
    return resolveDropshipCountryId(dropshipCountry);
  }

  // Fallback · /rooms/{country}-room → country
  const match = pathname.match(/\/rooms\/([a-z0-9-]+)-room(?:\/|$)/i);
  if (match?.[1]) {
    const slug = match[1].toLowerCase();
    if (slug === "uk-flag-cotswolds") return "uk";
    return slug;
  }

  return null;
}
