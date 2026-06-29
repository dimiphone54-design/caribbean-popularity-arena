import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { isCommandCenterEnabled } from "@/lib/command-center-access";

const memberUsernameStorageKey = "cpa_member_username";
const primaryMasterTrustKey = "cfa_primary_master_trusted_device";

/** First owner · CaribbeanFreedomArena */
export const ARENA_PRIMARY_MASTER = {
  username: "Dimitri",
  welcomePanelName: "DIMITRI"
} as const;

/** Localized “The Master” · exact per International SUITE country */
const masterTitleByCountryId: Record<string, string> = {
  colombia: "El Maestro",
  ecuador: "El Maestro",
  venezuela: "El Maestro",
  uk: "The Master",
  lithuania: "Meistras",
  trinidad: "The Master",
  jamaica: "The Master",
  guyana: "The Master",
  poland: "Mistrz",
  tunisia: "Le Maître",
  china: "大师",
  japan: "マスター"
};

export function isArenaPrimaryMasterUsername() {
  if (typeof window === "undefined") return false;

  const username =
    window.localStorage.getItem(memberUsernameStorageKey)?.trim().toLowerCase() ?? "";
  return username === ARENA_PRIMARY_MASTER.username.toLowerCase();
}

export function isPrimaryMasterDeviceTrusted() {
  if (typeof window === "undefined") return false;
  if (isArenaPrimaryMasterUsername()) return true;
  return window.localStorage.getItem(primaryMasterTrustKey) === "true";
}

export function markPrimaryMasterDeviceTrusted() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(primaryMasterTrustKey, "true");
}

/** Auto master-key unlock when THE MASTER is recognized on this device. */
export function shouldAutoActivatePrimaryMaster() {
  if (!isCommandCenterEnabled) return false;
  return isPrimaryMasterDeviceTrusted() || isArenaPrimaryMasterAutoDevice();
}

/** Owner preview · localhost dev or explicit env auto-trusts THE MASTER device. */
export function isArenaPrimaryMasterAutoDevice() {
  if (typeof window === "undefined") return false;
  if (!isCommandCenterEnabled) return false;
  if (process.env.NEXT_PUBLIC_ARENA_PRIMARY_MASTER_AUTO === "true") return true;

  const host = window.location.hostname;
  return (
    process.env.NEXT_PUBLIC_APP_ENV === "development" &&
    (host === "localhost" || host === "127.0.0.1")
  );
}

export function isArenaPrimaryMasterRecognized() {
  if (typeof window === "undefined") return false;
  if (isArenaMasterKeyActive()) return true;
  if (isArenaPrimaryMasterUsername()) return true;
  if (isPrimaryMasterDeviceTrusted()) return true;
  if (isArenaPrimaryMasterAutoDevice()) return true;
  return false;
}

export function getArenaMasterCountryTitle(countryId: string) {
  return masterTitleByCountryId[countryId] ?? "The Master";
}

export function registerArenaPrimaryMasterUsername() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(memberUsernameStorageKey, ARENA_PRIMARY_MASTER.username);
  window.dispatchEvent(
    new CustomEvent("cpa:member-username", { detail: ARENA_PRIMARY_MASTER.username })
  );
}
