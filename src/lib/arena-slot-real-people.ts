import { getArenaCountrySlotMeta } from "@/lib/arena-country-slot-meta";

/** Front 12 slot order · matches arenaCreators rank 1–12 */
export const slotIdToCountryCode: Record<number, string> = {
  1: "CO",
  2: "UK",
  3: "LT",
  4: "EC",
  5: "TT",
  6: "JM",
  7: "VE",
  8: "PL",
  9: "TN",
  10: "GY",
  11: "CN",
  12: "JP"
};

export function getArenaSlotRealPersonPhoto(slotId: number) {
  const code = slotIdToCountryCode[slotId] ?? "CO";
  return getArenaCountrySlotMeta({ islandCode: code }).photoLocal;
}

export function getArenaSlotRealPersonPhotoUrl(slotId: number) {
  const code = slotIdToCountryCode[slotId] ?? "CO";
  return getArenaCountrySlotMeta({ islandCode: code }).photoUrl;
}

export const arenaSlotRealPeoplePhotos: Record<number, string> = Object.fromEntries(
  Object.entries(slotIdToCountryCode).map(([id, code]) => [
    Number(id),
    getArenaCountrySlotMeta({ islandCode: code }).photoLocal
  ])
);

export const arenaSlotRealPeopleInternetUrls: Record<number, string> = Object.fromEntries(
  Object.entries(slotIdToCountryCode).map(([id, code]) => [
    Number(id),
    getArenaCountrySlotMeta({ islandCode: code }).photoUrl
  ])
);

export function getArenaSlotPhotosForCountry(islandCode: string) {
  const meta = getArenaCountrySlotMeta({ islandCode });
  return { url: meta.photoUrl, local: meta.photoLocal };
}
