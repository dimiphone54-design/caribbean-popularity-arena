import {
  findRoomLocaleOption,
  localeToUtteranceLang,
  resolveArenaAutoLocale,
  saveArenaAutoLocale,
  type RoomLocaleId
} from "@/lib/room-locale";
import { roomLocaleOptions, type RoomLocaleOption } from "@/lib/room-world-languages";

export type AiVoiceLanguage = RoomLocaleId;

export { localeToUtteranceLang };

const legacyStorageKey = "cpa_ai_voice_language";

export const ARENA_MEMBER_LANGUAGE_EVENT = "cpa:member-language";

/** Popular locales for member sign-up language picker. */
export const aiVoiceLanguageOptions: RoomLocaleOption[] = roomLocaleOptions.filter(
  (option) => option.region === "popular"
);

function migrateLegacyVoiceLanguage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(legacyStorageKey);
}

/** Boss rule · saved auto-detect on device · remembers you on enter. */
export function detectBrowserAiVoiceLanguage(): AiVoiceLanguage {
  migrateLegacyVoiceLanguage();
  return resolveArenaAutoLocale();
}

export function readAiVoiceLanguage(): AiVoiceLanguage {
  return detectBrowserAiVoiceLanguage();
}

/** Member sign-up language pick · saves arena auto-detect for voice + panels. */
export function saveAiVoiceLanguage(language: AiVoiceLanguage) {
  if (typeof window === "undefined") return;
  migrateLegacyVoiceLanguage();
  persistArenaAutoLanguage(language);
}

export function persistArenaAutoLanguage(locale: AiVoiceLanguage) {
  if (typeof window === "undefined") return;
  saveArenaAutoLocale(locale);
  window.dispatchEvent(new CustomEvent(ARENA_MEMBER_LANGUAGE_EVENT, { detail: locale }));
}

export function aiVoiceLanguageMeta(language: AiVoiceLanguage) {
  const option = findRoomLocaleOption(language);

  return {
    id: option.id,
    label: option.nativeLabel,
    sublabel: option.englishLabel,
    flag: option.flag,
    utteranceLang: localeToUtteranceLang(option.id)
  };
}
