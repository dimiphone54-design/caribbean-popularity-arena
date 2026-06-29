import { resolveDropshipCountryId } from "@/lib/dropshipping";

/** Map /rooms/* paths to International SUITE country ids for clocks and layout */
export function getRoomCountryId(pathname: string | null, dropshipCountry: string | null): string | null {
  if (!pathname) return null;
  if (pathname.includes("/rooms/colombia-room")) return "colombia";
  if (pathname.includes("/rooms/ecuador-room")) return "ecuador";
  if (pathname.includes("/rooms/uk-flag-cotswolds") || pathname.includes("/rooms/football-lads")) return "uk";
  if (pathname.includes("/rooms/japan-room")) return "japan";
  if (pathname.includes("/rooms/china-room")) return "china";
  if (pathname.includes("/rooms/dropship-market")) return resolveDropshipCountryId(dropshipCountry);
  return null;
}
