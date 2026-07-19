import { unlockCountryRoomAccess } from "@/lib/country-room-access";
import {
  getInternationalSuiteCountryLiveRoomSlug,
  internationalSuiteCountries,
  isInternationalSuiteCountryFrozen
} from "@/lib/international-suite";
import { saveAiVoiceLanguage, type AiVoiceLanguage } from "@/lib/ai-voice-language";
import { storeRoomLocale, type RoomLocaleId } from "@/lib/room-locale";
import { saveMemberUsername } from "@/lib/member-username-storage";

const accessKey = "cpa_arena_member_access";
const memberIdSessionKey = "cpa_arena_member_id";
const memberIdPersistKey = "cpa_arena_member_id_persist";
const profileKey = "cpa_arena_member_profile";

export const ARENA_MEMBER_ACCESS_EVENT = "cpa:arena-member-access";
export const ARENA_MEMBER_ENTERED_EVENT = "cpa:arena-member-entered";

/** One-time sign-in profile · device local · never re-type after first SIGN IN */
export type ArenaMemberSavedProfile = {
  memberId: string;
  displayName: string;
  email: string;
  country: string;
  islandCode: string;
  voiceLanguage: string;
  signedInAt: string;
};

export function readArenaMemberId(): string | null {
  if (typeof window === "undefined") return null;
  return (
    window.localStorage.getItem(memberIdPersistKey)?.trim() ||
    window.sessionStorage.getItem(memberIdSessionKey)?.trim() ||
    null
  );
}

export function saveArenaMemberId(id: string) {
  if (typeof window === "undefined") return;
  const trimmed = id.trim();
  if (!trimmed) return;
  window.sessionStorage.setItem(memberIdSessionKey, trimmed);
  window.localStorage.setItem(memberIdPersistKey, trimmed);
}

/** Arena · member sign-in unlocks personalized welcome + return-user auto enter */
export function readArenaMemberAccess(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(accessKey) === "true";
}

export function markArenaMemberAccess() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(accessKey, "true");
  window.dispatchEvent(new CustomEvent(ARENA_MEMBER_ACCESS_EVENT));
}

export function clearArenaMemberAccess() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(accessKey);
  window.localStorage.removeItem(profileKey);
  window.localStorage.removeItem(memberIdPersistKey);
  window.sessionStorage.removeItem(memberIdSessionKey);
  window.dispatchEvent(new CustomEvent(ARENA_MEMBER_ACCESS_EVENT));
}

export function readArenaMemberProfile(): ArenaMemberSavedProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(profileKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ArenaMemberSavedProfile;
    if (!parsed?.displayName || !parsed?.email || !parsed?.memberId) return null;
    if (parsed.displayName.trim().length < 2 || !parsed.email.includes("@")) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveArenaMemberProfile(profile: ArenaMemberSavedProfile) {
  if (typeof window === "undefined") return;
  const next: ArenaMemberSavedProfile = {
    memberId: profile.memberId.trim(),
    displayName: profile.displayName.trim(),
    email: profile.email.trim().toLowerCase(),
    country: profile.country.trim(),
    islandCode: profile.islandCode.trim(),
    voiceLanguage: profile.voiceLanguage.trim() || "en",
    signedInAt: profile.signedInAt || new Date().toISOString()
  };
  window.localStorage.setItem(profileKey, JSON.stringify(next));
  saveArenaMemberId(next.memberId);
  markArenaMemberAccess();
}

/** Active International SUITE countries only · open live room gates for signed-in members */
export function unlockActiveCountryRoomsForMember() {
  if (typeof window === "undefined") return;

  const slugs = new Set<string>();
  for (const country of internationalSuiteCountries) {
    if (isInternationalSuiteCountryFrozen(country)) continue;
    slugs.add(getInternationalSuiteCountryLiveRoomSlug(country.id));
    for (const room of country.rooms) {
      if (room.status === "open" && !room.href) {
        slugs.add(room.roomSlug);
      }
    }
  }
  slugs.forEach((roomSlug) => unlockCountryRoomAccess(roomSlug));
}

/**
 * Restore saved member on this device · language · active country access · main interface enter.
 * Used after first SIGN IN and every return-user SIGN IN.
 */
export function enterAsSavedArenaMember(profile: ArenaMemberSavedProfile) {
  if (typeof window === "undefined") return profile;

  saveArenaMemberProfile(profile);
  saveMemberUsername(profile.displayName);
  saveArenaMemberId(profile.memberId);

  const lang = (profile.voiceLanguage || "en") as AiVoiceLanguage;
  saveAiVoiceLanguage(lang);
  storeRoomLocale(lang as RoomLocaleId);

  unlockActiveCountryRoomsForMember();
  markArenaMemberAccess();

  window.dispatchEvent(
    new CustomEvent(ARENA_MEMBER_ENTERED_EVENT, {
      detail: { memberId: profile.memberId, displayName: profile.displayName }
    })
  );

  return profile;
}

/** Has this device already completed Member Sign In once? */
export function hasSavedArenaMemberSignIn() {
  return readArenaMemberProfile() !== null && readArenaMemberAccess();
}

/** Close gate + land on main arena interface */
export function goToMainArenaInterface() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.hash = "home";
  window.history.replaceState(null, "", `${url.pathname}${url.search}#home`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
