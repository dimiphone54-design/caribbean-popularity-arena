"use client";

import { useEffect, useState } from "react";
import {
  ARENA_MEMBER_LANGUAGE_EVENT,
  aiVoiceLanguageMeta,
  detectBrowserAiVoiceLanguage,
  type AiVoiceLanguage
} from "@/lib/ai-voice-language";
import {
  ARENA_AUTO_LOCALE_SAVED_EVENT,
  hasSavedArenaAutoLocale,
  localeIdsMatch,
  refreshArenaAutoLocaleFromBrowser,
  syncDocumentHtmlLang
} from "@/lib/room-locale";

/** Arena auto-detect panel · saved on device · remembers boss on enter. */
export function useArenaMemberLanguage() {
  const [locale, setLocale] = useState<AiVoiceLanguage>("en");
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = detectBrowserAiVoiceLanguage();
      setLocale(next);
      setSaved(hasSavedArenaAutoLocale());
      syncDocumentHtmlLang(next);
      setReady(true);
    };

    sync();

    const onBrowserLanguageChange = () => {
      const next = refreshArenaAutoLocaleFromBrowser();
      setLocale(next);
      setSaved(true);
      syncDocumentHtmlLang(next);
    };

    window.addEventListener("languagechange", onBrowserLanguageChange);
    window.addEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, sync);
    window.addEventListener(ARENA_MEMBER_LANGUAGE_EVENT, sync);
    window.addEventListener("cpa:member-username", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("languagechange", onBrowserLanguageChange);
      window.removeEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, sync);
      window.removeEventListener(ARENA_MEMBER_LANGUAGE_EVENT, sync);
      window.removeEventListener("cpa:member-username", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const meta = aiVoiceLanguageMeta(locale);

  return {
    ready,
    saved,
    locale,
    language: locale,
    meta,
    detectKicker: saved ? "Auto-detect · Saved" : "Auto-detect",
    matchesLocale: (candidate: string) => localeIdsMatch(candidate, locale)
  };
}
