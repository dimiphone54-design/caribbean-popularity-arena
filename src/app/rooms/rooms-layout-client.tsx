"use client";

import type { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CountryTrendActivitiesPanel } from "@/components/country-trend-activities-panel";
import { CountryRoomVoiceWelcome } from "@/components/country-room-voice-welcome";
import { RoomCountryClock } from "@/components/room-country-clock";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { RoomLocalePicker } from "@/components/room-locale-picker";
import { getRoomCountryId } from "@/lib/room-country-from-path";

export function RoomsLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropshipCountry = searchParams.get("country");
  const roomCountryId = getRoomCountryId(pathname, dropshipCountry);

  return (
    <div className="relative min-h-dvh text-[var(--luxury-ivory)]">
        <RoomBackToArena fixed showHint={false} />
        <CountryTrendActivitiesPanel />
        {roomCountryId ? <CountryRoomVoiceWelcome countryId={roomCountryId} /> : null}
        <div className="room-top-corner-shell pointer-events-none fixed right-3 top-3 z-[120] w-[min(18rem,calc(100vw-1.5rem))] sm:right-5 sm:top-4">
          <div className="room-top-corner-glass pointer-events-auto flex flex-col items-stretch gap-2">
            <RoomLocalePicker className="room-locale-picker-floating" />
            {roomCountryId ? <RoomCountryClock countryId={roomCountryId} className="w-full" /> : null}
          </div>
        </div>
      {children}
    </div>
  );
}
