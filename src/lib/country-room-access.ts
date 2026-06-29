import { isArenaMasterKeyActive } from "@/lib/arena-master-key";

/** One paid live session per country room — worldwide entry. */
export const countryRoomLiveAccessUsd = 6;
export const countryRoomLiveSessionHours = 3;
export const countryRoomLiveSessionMs = countryRoomLiveSessionHours * 60 * 60 * 1000;

export const COUNTRY_ROOM_ACCESS_EVENT = "cpa:country-room-access";

export type CountryRoomAccessRecord = {
  unlockedAt: number;
};

export function getCountryRoomAccessKey(roomSlug: string) {
  return `country-room-live-access:${roomSlug}`;
}

export function readCountryRoomAccess(roomSlug: string): CountryRoomAccessRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(getCountryRoomAccessKey(roomSlug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CountryRoomAccessRecord;
    if (!parsed.unlockedAt) return null;
    if (Date.now() - parsed.unlockedAt > countryRoomLiveSessionMs) {
      window.sessionStorage.removeItem(getCountryRoomAccessKey(roomSlug));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function isCountryRoomAccessActive(roomSlug: string) {
  if (isArenaMasterKeyActive()) return true;
  return readCountryRoomAccess(roomSlug) !== null;
}

export function unlockCountryRoomAccess(roomSlug: string) {
  if (typeof window === "undefined") return;

  const record: CountryRoomAccessRecord = { unlockedAt: Date.now() };
  window.sessionStorage.setItem(getCountryRoomAccessKey(roomSlug), JSON.stringify(record));
  window.dispatchEvent(new CustomEvent(COUNTRY_ROOM_ACCESS_EVENT, { detail: { roomSlug } }));
}

export function countryRoomAccessTimeLeftMs(roomSlug: string) {
  if (isArenaMasterKeyActive()) return countryRoomLiveSessionMs;
  const record = readCountryRoomAccess(roomSlug);
  if (!record) return 0;
  return Math.max(0, countryRoomLiveSessionMs - (Date.now() - record.unlockedAt));
}

export function formatCountryRoomAccessTimeLeft(totalMs: number) {
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
