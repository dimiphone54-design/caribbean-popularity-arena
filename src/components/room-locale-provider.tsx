"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  findRoomLocaleOption,
  resolveArenaAutoLocale,
  storeRoomLocale,
  syncDocumentHtmlLang,
  ARENA_AUTO_LOCALE_SAVED_EVENT,
  ROOM_LOCALE_CHANGED_EVENT,
  type RoomLocaleId
} from "@/lib/room-locale";
import { getRoomTranslations, type RoomTranslationBundle } from "@/lib/room-translations";

type RoomLocaleContextValue = {
  locale: RoomLocaleId;
  setLocale: (locale: RoomLocaleId) => void;
  t: RoomTranslationBundle;
  localeOption: ReturnType<typeof findRoomLocaleOption>;
};

const RoomLocaleContext = createContext<RoomLocaleContextValue | null>(null);

export function RoomLocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<RoomLocaleId>("en");

  useEffect(() => {
    const sync = () => {
      let next = resolveArenaAutoLocale();
      if (pathname?.includes("/rooms/china-room")) {
        next = "zh-CN";
      } else if (pathname?.includes("/rooms/japan-room")) {
        next = "ja";
      }
      setLocaleState(next);
      syncDocumentHtmlLang(next);
    };

    sync();

    window.addEventListener(ROOM_LOCALE_CHANGED_EVENT, sync);
    window.addEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, sync);
    window.addEventListener("cpa:member-username", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(ROOM_LOCALE_CHANGED_EVENT, sync);
      window.removeEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, sync);
      window.removeEventListener("cpa:member-username", sync);
      window.removeEventListener("storage", sync);
    };
  }, [pathname]);

  const setLocale = (next: RoomLocaleId) => {
    storeRoomLocale(next);
    setLocaleState(next);
    syncDocumentHtmlLang(next);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getRoomTranslations(locale),
      localeOption: findRoomLocaleOption(locale)
    }),
    [locale]
  );

  return <RoomLocaleContext.Provider value={value}>{children}</RoomLocaleContext.Provider>;
}

export function useRoomLocale() {
  const context = useContext(RoomLocaleContext);
  if (!context) {
    return {
      locale: "en" as RoomLocaleId,
      setLocale: () => undefined,
      t: getRoomTranslations("en"),
      localeOption: findRoomLocaleOption("en")
    };
  }
  return context;
}
