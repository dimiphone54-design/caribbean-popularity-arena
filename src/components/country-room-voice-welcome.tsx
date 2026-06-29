"use client";

import { useEffect, useRef } from "react";
import { useRoomLocale } from "@/components/room-locale-provider";
import { isAiVoiceSupported, speakCountryRoomVoice, stopAiVoice } from "@/lib/ai-voice-greeting";
import { resolveContentLocale } from "@/lib/room-locale";
import {
  hasCountryRoomVoiceWelcomed,
  markCountryRoomVoiceWelcomed,
  readVoiceGreetingEnabled
} from "@/lib/member-username-storage";

/** Auto country-room AI voice · once per session · master = localized “The Master”. */
export function CountryRoomVoiceWelcome({ countryId }: { countryId: string }) {
  const { locale } = useRoomLocale();
  const spokenRef = useRef(false);

  useEffect(() => {
    spokenRef.current = false;
  }, [countryId]);

  useEffect(() => {
    if (spokenRef.current) return;
    if (!readVoiceGreetingEnabled()) return;
    if (!isAiVoiceSupported()) return;
    if (hasCountryRoomVoiceWelcomed(countryId)) return;

    const timer = window.setTimeout(() => {
      if (spokenRef.current) return;
      spokenRef.current = true;
      markCountryRoomVoiceWelcomed(countryId);
      void speakCountryRoomVoice(countryId, resolveContentLocale(locale));
    }, 900);

    return () => {
      window.clearTimeout(timer);
      stopAiVoice();
    };
  }, [countryId, locale]);

  return null;
}
