"use client";

import { useEffect, useRef } from "react";
import { useRoomLocale } from "@/components/room-locale-provider";
import {
  isAiVoiceSupported,
  primeAiVoice,
  speakCountryRoomVoice,
  stopAiVoice
} from "@/lib/ai-voice-greeting";
import { resolveContentLocale } from "@/lib/room-locale";
import {
  hasCountryRoomVoiceWelcomed,
  markCountryRoomVoiceWelcomed,
  readVoiceGreetingEnabled
} from "@/lib/member-username-storage";

/**
 * Auto country-room AI voice when AI Voice is ON.
 * Waits for room language + MASTER detect to settle, then says Welcome
 * in the room language (public local · MASTER English).
 */
export function CountryRoomVoiceWelcome({ countryId }: { countryId: string }) {
  const { locale } = useRoomLocale();
  const spokenForCountryRef = useRef<string | null>(null);
  const latestLocaleRef = useRef(locale);

  useEffect(() => {
    latestLocaleRef.current = locale;
  }, [locale]);

  useEffect(() => {
    spokenForCountryRef.current = null;
  }, [countryId]);

  useEffect(() => {
    if (!countryId) return;
    if (!readVoiceGreetingEnabled()) return;
    if (!isAiVoiceSupported()) return;
    if (spokenForCountryRef.current === countryId) return;
    if (hasCountryRoomVoiceWelcomed(countryId)) return;

    // User-gesture warm-up when possible · helps Chrome autoplay policy.
    primeAiVoice();

    // Delay so room-locale-provider can apply local language / MASTER English.
    const timer = window.setTimeout(() => {
      if (spokenForCountryRef.current === countryId) return;
      if (hasCountryRoomVoiceWelcomed(countryId)) return;
      if (!readVoiceGreetingEnabled()) return;

      spokenForCountryRef.current = countryId;
      markCountryRoomVoiceWelcomed(countryId);

      const roomLocale = resolveContentLocale(latestLocaleRef.current);
      void speakCountryRoomVoice(countryId, roomLocale);
    }, 1400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [countryId, locale]);

  useEffect(() => {
    return () => {
      stopAiVoice();
    };
  }, [countryId]);

  return null;
}
