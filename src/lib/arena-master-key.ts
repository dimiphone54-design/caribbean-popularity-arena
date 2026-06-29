import type { ArenaCreatorSlot } from "@/lib/arena-experience";
import { isCommandCenterEnabled } from "@/lib/command-center-access";
import { claimArenaSlot } from "@/lib/arena-slot-occupancy";
import { unlockAllCountryRoomsForMasterKey } from "@/lib/arena-master-key-unlock";
import {
  isArenaPrimaryMasterAutoDevice,
  markPrimaryMasterDeviceTrusted,
  registerArenaPrimaryMasterUsername,
  shouldAutoActivatePrimaryMaster
} from "@/lib/arena-master-identity";
import {
  getInternationalSuiteRoomHref,
  internationalSuiteCountries
} from "@/lib/international-suite";
import { readMemberUsername } from "@/lib/member-username-storage";

export const ARENA_MASTER_KEY_SESSION = "cfa_arena_master_key_active";
export const ARENA_MASTER_KEY_EVENT = "cpa:arena-master-key";

export function isArenaMasterKeyActive() {
  if (typeof window === "undefined") return false;
  if (!isCommandCenterEnabled) return false;
  return window.sessionStorage.getItem(ARENA_MASTER_KEY_SESSION) === "true";
}

/** Recognized THE MASTER · auto-open all corners without manual key entry. */
export function autoActivatePrimaryMasterAccess() {
  if (typeof window === "undefined") return false;
  if (isArenaMasterKeyActive()) return true;
  if (!shouldAutoActivatePrimaryMaster()) return false;

  setArenaMasterKeyActive(true);
  return true;
}

/** Run before welcome read · trust owner device + unlock corners immediately. */
export function ensurePrimaryMasterDeviceRecognized() {
  if (typeof window === "undefined") return false;
  if (isArenaPrimaryMasterAutoDevice()) markPrimaryMasterDeviceTrusted();
  return autoActivatePrimaryMasterAccess();
}

export function setArenaMasterKeyActive(active: boolean) {
  if (typeof window === "undefined") return;
  if (active && !isCommandCenterEnabled) return;
  if (active) {
    window.sessionStorage.setItem(ARENA_MASTER_KEY_SESSION, "true");
    markPrimaryMasterDeviceTrusted();
    registerArenaPrimaryMasterUsername();
    unlockAllCountryRoomsForMasterKey();
  } else {
    window.sessionStorage.removeItem(ARENA_MASTER_KEY_SESSION);
  }

  window.dispatchEvent(new CustomEvent(ARENA_MASTER_KEY_EVENT, { detail: { active } }));
}

export function getCountryRoomPathForIslandCode(islandCode: string) {
  const country = internationalSuiteCountries.find((entry) => entry.islandCode === islandCode);
  if (!country) return "/#home";

  const built = country.rooms.find((room) => room.status === "open" && !room.href);
  if (built) return getInternationalSuiteRoomHref(built);

  return `/rooms/dropship-market?country=${country.id}`;
}

export async function masterKeyEnterSlotRoom(
  slot: Pick<ArenaCreatorSlot, "id" | "islandCode" | "country" | "rank">
) {
  const displayName = readMemberUsername().trim() || "Arena Owner";
  // Owner preview only · local session — never writes shared arena-engine state
  claimArenaSlot({
    slotId: slot.id,
    islandCode: slot.islandCode,
    displayName
  });

  unlockAllCountryRoomsForMasterKey();
  return getCountryRoomPathForIslandCode(slot.islandCode);
}
