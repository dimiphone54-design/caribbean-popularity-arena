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
import { isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";
import { ensurePrimaryMasterDeviceRecognized } from "@/lib/arena-master-key";
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
  // Always start as "en" so server HTML and first client paint match.
  // Auto-detect / saved locale apply only after mount.
  const [locale, setLocaleState] = useState<RoomLocaleId>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Recognize THE MASTER on this device before room language rules run.
    ensurePrimaryMasterDeviceRecognized();

    const masterEnglishLocale = (auto: RoomLocaleId): RoomLocaleId => {
      // THE MASTER · always English UI (prefer browser en-GB / en when available).
      const tag = auto.trim().toLowerCase().replace("_", "-");
      if (tag === "en-gb") return "en-GB";
      if (tag === "en" || tag.startsWith("en-")) return auto;
      return "en";
    };

    const sync = () => {
      ensurePrimaryMasterDeviceRecognized();
      const auto = resolveArenaAutoLocale();
      const isMaster = isArenaPrimaryMasterRecognized();
      let next = auto;

      // Country rooms: public → local language. MASTER detected → English auto.
      if (pathname?.includes("/rooms/colombia-room")) {
        next = isMaster ? masterEnglishLocale(auto) : "es-CO";
      } else if (pathname?.includes("/rooms/ecuador-room")) {
        next = isMaster ? masterEnglishLocale(auto) : "es-EC";
      } else if (pathname?.includes("/rooms/spain-room")) {
        next = isMaster ? masterEnglishLocale(auto) : "es";
      } else if (pathname?.includes("/rooms/china-room")) {
        if (!isMaster) next = "zh-CN";
      } else if (pathname?.includes("/rooms/japan-room")) {
        if (!isMaster) next = "ja";
      }
      setLocaleState(next);
      syncDocumentHtmlLang(next);
    };

    sync();

    window.addEventListener(ROOM_LOCALE_CHANGED_EVENT, sync);
    window.addEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, sync);
    window.addEventListener("cpa:member-username", sync);
    window.addEventListener("storage", sync);
    window.addEventListener("cpa:arena-master-key", sync);

    return () => {
      window.removeEventListener(ROOM_LOCALE_CHANGED_EVENT, sync);
      window.removeEventListener(ARENA_AUTO_LOCALE_SAVED_EVENT, sync);
      window.removeEventListener("cpa:member-username", sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("cpa:arena-master-key", sync);
    };
  }, [pathname]);

  // Keep locale fixed at "en" until hydrated to prevent first-client-paint drift.
  const activeLocale = hydrated ? locale : "en";

  const setLocale = (next: RoomLocaleId) => {
    storeRoomLocale(next);
    setLocaleState(next);
    syncDocumentHtmlLang(next);
  };

  const value = useMemo(
    () => ({
      locale: activeLocale,
      setLocale,
      t: getRoomTranslations(activeLocale),
      localeOption: findRoomLocaleOption(activeLocale)
    }),
    [activeLocale]
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
