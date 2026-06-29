import { syncMemberDispatchLocationOnSignIn } from "@/lib/member-dispatch-location";
import {
  isArenaPrimaryMasterRecognized,
  ARENA_PRIMARY_MASTER,
  isArenaPrimaryMasterUsername
} from "@/lib/arena-master-identity";
import { autoActivatePrimaryMasterAccess, ensurePrimaryMasterDeviceRecognized } from "@/lib/arena-master-key";
import { autoDetectRoomLocale, saveArenaAutoLocale, type RoomLocaleId } from "@/lib/room-locale";

const usernameKey = "cpa_member_username";
const voiceGreetingKey = "cpa_ai_voice_greeting";
const guestWelcomeKey = "cpa_guest_welcome_name";

const arenaGuestWelcomePool = [
  "WEEZY",
  "JOHN",
  "MAYA",
  "SABRINA",
  "MARCUS",
  "AALIYAH",
  "DEVON",
  "KEISHA",
  "RIO",
  "CALVIN"
] as const;

export const ARENA_WELCOME_ENTER_EVENT = "cpa:arena-welcome-enter";

/** Panel + voice · every visitor launch (non-master). */
export const ARENA_SITE_WELCOME_PANEL_LINE = "WELCOME TO CARIBBEAN FREEDOM ARENA";

/** AI micro rail · two-line stack · aligned left edge */
export const ARENA_SITE_WELCOME_RAIL_LINES = ["WELCOME TO", "CARIBBEAN FREEDOM ARENA"] as const;

export function formatArenaWelcomeLine(name: string) {
  return `WELCOME ${name.trim().toUpperCase()}`;
}

/** Spoken welcome · matches welcome panel (WELCOME DIMITRI → Welcome Dimitri). */
export function formatWelcomeVoiceGreeting(name: string, locale: RoomLocaleId = "en") {
  const cleaned = name.trim().replace(/^@+/, "");
  if (cleaned.length < 2) return "";

  const spokenName = `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1).toLowerCase()}`;
  const language = locale.trim().toLowerCase().replace("_", "-").split("-")[0] ?? "en";

  const templates: Record<string, string> = {
    en: `Welcome ${spokenName}`,
    es: `Bienvenido ${spokenName}`,
    pt: `Bem-vindo ${spokenName}`,
    fr: `Bienvenue ${spokenName}`,
    de: `Willkommen ${spokenName}`,
    it: `Benvenuto ${spokenName}`,
    nl: `Welkom ${spokenName}`,
    ja: `ようこそ ${spokenName}`,
    ko: `환영합니다 ${spokenName}`,
    zh: `欢迎 ${spokenName}`,
    hi: `स्वागत है ${spokenName}`,
    ar: `مرحباً ${spokenName}`,
    ru: `Добро пожаловать ${spokenName}`,
    pl: `Witaj ${spokenName}`,
    uk: `Ласкаво просимо ${spokenName}`,
    tr: `Hoş geldin ${spokenName}`,
    vi: `Chào mừng ${spokenName}`,
    th: `ยินดีต้อนรับ ${spokenName}`,
    id: `Selamat datang ${spokenName}`,
    ms: `Selamat datang ${spokenName}`,
    sw: `Karibu ${spokenName}`,
    ht: `Byenveni ${spokenName}`,
    tl: `Maligayang pagdating ${spokenName}`
  };

  return templates[language] ?? templates.en!;
}

/** Spoken site welcome · other users · every launch. */
export function formatArenaSiteWelcomeVoice(locale: RoomLocaleId = "en") {
  const language = locale.trim().toLowerCase().replace("_", "-").split("-")[0] ?? "en";

  const templates: Record<string, string> = {
    en: "Welcome to Caribbean Freedom Arena",
    es: "Bienvenido a Caribbean Freedom Arena",
    pt: "Bem-vindo ao Caribbean Freedom Arena",
    fr: "Bienvenue au Caribbean Freedom Arena",
    de: "Willkommen bei Caribbean Freedom Arena",
    it: "Benvenuto a Caribbean Freedom Arena",
    nl: "Welkom bij Caribbean Freedom Arena",
    ja: "Caribbean Freedom Arena へようこそ",
    ko: "Caribbean Freedom Arena에 오신 것을 환영합니다",
    zh: "欢迎来到 Caribbean Freedom Arena",
    hi: "Caribbean Freedom Arena में आपका स्वागत है",
    ar: "مرحباً بكم في Caribbean Freedom Arena",
    ru: "Добро пожаловать в Caribbean Freedom Arena",
    pl: "Witamy w Caribbean Freedom Arena",
    uk: "Ласкаво просимо до Caribbean Freedom Arena",
    tr: "Caribbean Freedom Arena'ya hoş geldiniz",
    vi: "Chào mừng đến với Caribbean Freedom Arena",
    th: "ยินดีต้อนรับสู่ Caribbean Freedom Arena",
    id: "Selamat datang di Caribbean Freedom Arena",
    ms: "Selamat datang ke Caribbean Freedom Arena",
    sw: "Karibu Caribbean Freedom Arena",
    ht: "Byenveni nan Caribbean Freedom Arena",
    tl: "Maligayang pagdating sa Caribbean Freedom Arena"
  };

  return templates[language] ?? templates.en!;
}

export function readMemberUsername(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(usernameKey)?.trim() ?? "";
}

/** Session guest name when member sign-in username is not set yet. */
export function readOrCreateSessionGuestName() {
  if (typeof window === "undefined") return arenaGuestWelcomePool[0];

  const existing = window.sessionStorage.getItem(guestWelcomeKey)?.trim();
  if (existing && existing.length >= 2) return existing;

  const picked = arenaGuestWelcomePool[Math.floor(Math.random() * arenaGuestWelcomePool.length)];
  window.sessionStorage.setItem(guestWelcomeKey, picked);
  return picked;
}

export function clearSessionGuestWelcomeName() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(guestWelcomeKey);
}

/** Name shown/spoken on Welcome · Guide — master first, then member, else session guest. */
export function readArenaWelcomeDisplayName() {
  if (typeof window !== "undefined") {
    ensurePrimaryMasterDeviceRecognized();
  }

  if (isArenaPrimaryMasterRecognized()) {
    clearSessionGuestWelcomeName();
    return ARENA_PRIMARY_MASTER.welcomePanelName;
  }

  const member = readMemberUsername();
  if (member.length >= 2) return member;
  return readOrCreateSessionGuestName();
}

export function dispatchArenaWelcomeEnter() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ARENA_WELCOME_ENTER_EVENT));
}

export function saveMemberUsername(username: string) {
  if (typeof window === "undefined") return;
  const trimmed = username.trim();
  if (trimmed.length < 2) return;
  window.localStorage.setItem(usernameKey, trimmed);
  saveArenaAutoLocale(autoDetectRoomLocale());
  syncMemberDispatchLocationOnSignIn();
  window.dispatchEvent(new CustomEvent("cpa:member-username", { detail: trimmed }));

  if (isArenaPrimaryMasterUsername()) {
    autoActivatePrimaryMasterAccess();
    dispatchArenaWelcomeEnter();
  }
}

export function readVoiceGreetingEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem(voiceGreetingKey);
  if (stored === null) return true;
  return stored === "true";
}

export function saveVoiceGreetingEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(voiceGreetingKey, enabled ? "true" : "false");
}

const greetedSessionKey = "cpa_ai_greeted_session";

export function hasGreetedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(greetedSessionKey) === "true";
}

export function markGreetedThisSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(greetedSessionKey, "true");
}

export function clearGreetedSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(greetedSessionKey);
}

const colombiaRoomWelcomeSessionKey = "cpa_colombia_room_welcome_session";

export function hasColombiaRoomWelcomedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(colombiaRoomWelcomeSessionKey) === "true";
}

export function markColombiaRoomWelcomedThisSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(colombiaRoomWelcomeSessionKey, "true");
}

const ecuadorRoomWelcomeSessionKey = "cpa_ecuador_room_welcome_session";

export function hasEcuadorRoomWelcomedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ecuadorRoomWelcomeSessionKey) === "true";
}

export function markEcuadorRoomWelcomedThisSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(ecuadorRoomWelcomeSessionKey, "true");
}

function countryRoomVoiceSessionKey(countryId: string) {
  return `cpa_country_room_voice:${countryId}`;
}

export function hasCountryRoomVoiceWelcomed(countryId: string) {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(countryRoomVoiceSessionKey(countryId)) === "true";
}

export function markCountryRoomVoiceWelcomed(countryId: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(countryRoomVoiceSessionKey(countryId), "true");
}
