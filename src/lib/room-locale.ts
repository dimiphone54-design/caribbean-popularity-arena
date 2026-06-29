import {
  formatRoomLocaleOptionLabel,
  roomLocaleIdSet,
  roomLocaleOptions,
  type RoomLocaleOption,
  type RoomLocaleRegion
} from "@/lib/room-world-languages";

export type RoomLocaleId = string;

export type ContentLocaleId = "en" | "en-GB" | "es" | "es-CO";

const storageKey = "caribbean-room-locale";
const manualStorageKey = "caribbean-room-locale-manual";
const autoDetectStorageKey = "caribbean-arena-auto-locale";

export const ROOM_LOCALE_CHANGED_EVENT = "cpa:room-locale-changed";
export const ARENA_AUTO_LOCALE_SAVED_EVENT = "cpa:arena-auto-locale-saved";

/** IANA timezone fragments → closest room locale (country-aware auto-detect). Longest match wins. */
const timezoneLocaleRules: Array<[pattern: string, localeId: RoomLocaleId]> = [
  ["europe/london", "en-GB"],
  ["europe/dublin", "en-GB"],
  ["europe/belfast", "en-GB"],
  ["europe/guernsey", "en-GB"],
  ["europe/jersey", "en-GB"],
  ["europe/isle_of_man", "en-GB"],
  ["america/bogota", "es-CO"],
  ["america/medellin", "es-CO"],
  ["america/cali", "es-CO"],
  ["america/port_of_spain", "en-TT"],
  ["america/jamaica", "en-JM"],
  ["america/kingston", "en-JM"],
  ["america/nassau", "en"],
  ["america/barbados", "en"],
  ["america/guadeloupe", "fr"],
  ["america/martinique", "fr"],
  ["america/port-au-prince", "ht"],
  ["america/santo_domingo", "es-DO"],
  ["america/puerto_rico", "es-PR"],
  ["america/havana", "es-CU"],
  ["america/georgetown", "en"],
  ["america/paramaribo", "nl"],
  ["america/cayenne", "fr"],
  ["america/curacao", "nl"],
  ["america/aruba", "nl"],
  ["america/grand_turk", "en"],
  ["america/mexico_city", "es-MX"],
  ["america/cancun", "es-MX"],
  ["america/monterrey", "es-MX"],
  ["america/argentina/buenos_aires", "es-AR"],
  ["america/santiago", "es-CL"],
  ["america/lima", "es-PE"],
  ["america/caracas", "es-VE"],
  ["america/guayaquil", "es-EC"],
  ["america/la_paz", "es-BO"],
  ["america/asuncion", "es-PY"],
  ["america/montevideo", "es-UY"],
  ["america/sao_paulo", "pt-BR"],
  ["america/rio", "pt-BR"],
  ["america/new_york", "en-US"],
  ["america/chicago", "en-US"],
  ["america/denver", "en-US"],
  ["america/los_angeles", "en-US"],
  ["america/phoenix", "en-US"],
  ["america/toronto", "en-CA"],
  ["america/vancouver", "en-CA"],
  ["america/montreal", "en-CA"],
  ["europe/madrid", "es"],
  ["atlantic/canary", "es"],
  ["europe/paris", "fr"],
  ["europe/berlin", "de"],
  ["europe/rome", "it"],
  ["europe/amsterdam", "en-GB"],
  ["europe/brussels", "fr-BE"],
  ["europe/warsaw", "pl"],
  ["europe/vilnius", "lt"],
  ["europe/tallinn", "et"],
  ["europe/riga", "lv"],
  ["europe/helsinki", "fi"],
  ["europe/stockholm", "sv"],
  ["europe/oslo", "nb"],
  ["europe/copenhagen", "da"],
  ["europe/prague", "cs"],
  ["europe/budapest", "hu"],
  ["europe/bucharest", "ro"],
  ["europe/athens", "el"],
  ["europe/istanbul", "tr"],
  ["europe/moscow", "ru"],
  ["europe/kiev", "uk"],
  ["africa/tunis", "ar"],
  ["africa/casablanca", "ar-MA"],
  ["africa/algiers", "ar-DZ"],
  ["africa/cairo", "ar-EG"],
  ["africa/lagos", "en"],
  ["africa/johannesburg", "en"],
  ["africa/nairobi", "sw"],
  ["asia/tokyo", "ja"],
  ["asia/seoul", "ko"],
  ["asia/shanghai", "zh-CN"],
  ["asia/chongqing", "zh-CN"],
  ["asia/hong_kong", "zh-HK"],
  ["asia/taipei", "zh-TW"],
  ["asia/singapore", "en"],
  ["asia/kolkata", "hi"],
  ["asia/dubai", "ar-AE"],
  ["asia/riyadh", "ar-SA"],
  ["asia/jakarta", "id"],
  ["asia/bangkok", "th"],
  ["asia/manila", "tl"],
  ["pacific/auckland", "mi"],
  ["australia/sydney", "en"]
];

export { roomLocaleOptions, formatRoomLocaleOptionLabel };
export type { RoomLocaleOption, RoomLocaleRegion };

export function isRoomLocaleId(value: string): value is RoomLocaleId {
  return roomLocaleIdSet.has(value.toLowerCase());
}

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase().replace("_", "-");
}

function findOptionById(id: string): RoomLocaleOption | undefined {
  const normalized = normalizeTag(id);
  return roomLocaleOptions.find((option) => normalizeTag(option.id) === normalized);
}

function matchPreferredLocale(preferred: string): RoomLocaleOption | undefined {
  const tag = normalizeTag(preferred);
  const exact = findOptionById(tag);
  if (exact) return exact;

  const [language, region] = tag.split("-");

  if (region) {
    const regional = findOptionById(`${language}-${region}`);
    if (regional) return regional;
  }

  const languageOnly = findOptionById(language);
  if (languageOnly) return languageOnly;

  return roomLocaleOptions.find((option) => normalizeTag(option.id).startsWith(`${language}-`));
}

function localeSpecificity(option: RoomLocaleOption): number {
  return normalizeTag(option.id).split("-").length;
}

function isGenericLocaleOption(option: RoomLocaleOption): boolean {
  return localeSpecificity(option) === 1;
}

function localeLanguage(option: RoomLocaleOption): string {
  return normalizeTag(option.id).split("-")[0] ?? normalizeTag(option.id);
}

function matchFirstPreferredLocale(tags: readonly string[]): RoomLocaleOption | undefined {
  for (const tag of tags) {
    const match = matchPreferredLocale(tag);
    if (match) return match;
  }
  return undefined;
}

function detectLocaleFromTimezone(): RoomLocaleOption | undefined {
  if (typeof window === "undefined") return undefined;

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
  if (!tz) return undefined;

  const sortedRules = [...timezoneLocaleRules].sort((a, b) => b[0].length - a[0].length);

  for (const [pattern, localeId] of sortedRules) {
    if (tz.includes(pattern)) {
      return findOptionById(localeId);
    }
  }

  return undefined;
}

/** Browser primary language wins · timezone only refines generic English or as fallback. */
export function autoDetectRoomLocale(): RoomLocaleId {
  if (typeof window === "undefined") return "en";

  const preferred = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];

  const browserMatch = matchFirstPreferredLocale(preferred);
  if (browserMatch) {
    if (localeLanguage(browserMatch) === "en" && isGenericLocaleOption(browserMatch)) {
      const timezoneMatch = detectLocaleFromTimezone();
      if (timezoneMatch && localeLanguage(timezoneMatch) === "en") {
        return timezoneMatch.id;
      }
    }
    return browserMatch.id;
  }

  const timezoneMatch = detectLocaleFromTimezone();
  return timezoneMatch?.id ?? "en";
}

function browserPrimaryLanguageFamily(): string {
  if (typeof window === "undefined") return "en";
  const tag = (window.navigator.languages?.[0] ?? window.navigator.language).toLowerCase();
  return tag.split("-")[0] ?? "en";
}

function migrateStaleArenaLocale() {
  if (typeof window === "undefined") return;

  const primary = browserPrimaryLanguageFamily();
  const saved = window.localStorage.getItem(autoDetectStorageKey);

  if (primary === "en" && saved && saved.toLowerCase().startsWith("es")) {
    window.localStorage.removeItem(autoDetectStorageKey);
  }

  const manual = window.localStorage.getItem(manualStorageKey) === "1";
  const oldRoom = window.localStorage.getItem(storageKey);
  if (primary === "en" && manual && oldRoom && oldRoom.toLowerCase().startsWith("es")) {
    window.localStorage.removeItem(manualStorageKey);
  }
}

export function readSavedArenaAutoLocale(): RoomLocaleId | null {
  if (typeof window === "undefined") return null;
  migrateStaleArenaLocale();
  const stored = window.localStorage.getItem(autoDetectStorageKey);
  if (!stored || !isRoomLocaleId(stored)) return null;
  return findOptionById(stored)?.id ?? stored;
}

export function hasSavedArenaAutoLocale(): boolean {
  return readSavedArenaAutoLocale() !== null;
}

export function saveArenaAutoLocale(locale: RoomLocaleId) {
  if (typeof window === "undefined") return;
  const option = findOptionById(locale);
  const resolved = option?.id ?? locale;
  window.localStorage.setItem(autoDetectStorageKey, resolved);
  window.dispatchEvent(new CustomEvent(ARENA_AUTO_LOCALE_SAVED_EVENT, { detail: resolved }));
}

/** Saved auto-detect first · then browser detect · then save for next enter. */
export function resolveArenaAutoLocale(): RoomLocaleId {
  if (typeof window === "undefined") return "en";

  migrateStaleArenaLocale();

  const saved = readSavedArenaAutoLocale();
  if (saved) return saved;

  const detected = autoDetectRoomLocale();
  saveArenaAutoLocale(detected);
  return detected;
}

export function refreshArenaAutoLocaleFromBrowser(): RoomLocaleId {
  if (typeof window === "undefined") return "en";
  const detected = autoDetectRoomLocale();
  saveArenaAutoLocale(detected);
  return detected;
}

export function hasManualRoomLocale(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(manualStorageKey) === "1";
}

export function detectRoomLocale(): RoomLocaleId {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem(storageKey);
  if (window.localStorage.getItem(manualStorageKey) === "1" && stored && isRoomLocaleId(stored)) {
    return findOptionById(stored)?.id ?? stored;
  }

  return autoDetectRoomLocale();
}

export function readStoredRoomLocale(): RoomLocaleId | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(storageKey);
  if (!stored || !isRoomLocaleId(stored)) return null;
  return findOptionById(stored)?.id ?? stored;
}

export function storeRoomLocale(locale: RoomLocaleId) {
  if (typeof window === "undefined") return;
  const option = findOptionById(locale);
  const resolved = option?.id ?? locale;
  window.localStorage.setItem(storageKey, resolved);
  window.localStorage.setItem(manualStorageKey, "1");
  window.dispatchEvent(new CustomEvent(ROOM_LOCALE_CHANGED_EVENT, { detail: resolved }));
}

export function findRoomLocaleOption(locale: RoomLocaleId): RoomLocaleOption {
  return findOptionById(locale) ?? roomLocaleOptions[0]!;
}

/** Maps any picker locale to the closest fully-translated room bundle. */
export function resolveContentLocale(locale: RoomLocaleId): ContentLocaleId {
  const tag = normalizeTag(locale);
  const [language, region] = tag.split("-");

  if (language === "es") {
    if (region === "co" || tag === "es-co") return "es-CO";
    return "es";
  }

  if (language === "en") {
    if (region === "gb" || tag === "en-gb") return "en-GB";
    return "en";
  }

  return "en";
}

export function isSpanishContentLocale(locale: RoomLocaleId) {
  return resolveContentLocale(locale).startsWith("es");
}

export function groupRoomLocaleOptions(options: RoomLocaleOption[] = roomLocaleOptions) {
  const groups = new Map<RoomLocaleRegion, RoomLocaleOption[]>();

  for (const option of options) {
    const bucket = groups.get(option.region) ?? [];
    bucket.push(option);
    groups.set(option.region, bucket);
  }

  return groups;
}

export function normalizeLocaleId(value: string) {
  return value.trim().toLowerCase().replace("_", "-");
}

export function localeIdsMatch(a: string, b: string) {
  return normalizeLocaleId(a) === normalizeLocaleId(b);
}

/** BCP47 tag for `<html lang>` and speech synthesis. */
export function localeToUtteranceLang(localeId: RoomLocaleId): string {
  const tag = localeId.trim().replace("_", "-");
  const [language, region] = tag.split("-");

  if (language && region) {
    return `${language}-${region.toUpperCase()}`;
  }

  const defaults: Record<string, string> = {
    en: "en-GB",
    es: "es-419",
    pt: "pt-BR",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    nl: "nl-NL",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    hi: "hi-IN",
    ar: "ar-SA",
    ru: "ru-RU",
    pl: "pl-PL",
    uk: "uk-UA",
    tr: "tr-TR",
    vi: "vi-VN",
    th: "th-TH",
    id: "id-ID",
    ms: "ms-MY",
    sw: "sw-KE"
  };

  return defaults[language ?? ""] ?? language ?? "en-GB";
}

export function syncDocumentHtmlLang(locale: RoomLocaleId) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = localeToUtteranceLang(locale);
}
