"use client";

import { useEffect, useState } from "react";
import {
  countryRoomAccessTimeLeftMs,
  formatCountryRoomAccessTimeLeft,
  isCountryRoomAccessActive
} from "@/lib/country-room-access";
import { useRoomLocale } from "@/components/room-locale-provider";

type ColombiaRoomAccessStatusProps = {
  roomSlug: string;
  countryName: string;
  flag: string;
};

export function ColombiaRoomAccessStatus({ roomSlug, countryName, flag }: ColombiaRoomAccessStatusProps) {
  const { t } = useRoomLocale();
  const [unlocked, setUnlocked] = useState(false);
  const [accessLeftMs, setAccessLeftMs] = useState(0);

  useEffect(() => {
    const sync = () => {
      setUnlocked(isCountryRoomAccessActive(roomSlug));
      setAccessLeftMs(countryRoomAccessTimeLeftMs(roomSlug));
    };

    sync();
    const timer = window.setInterval(sync, 1000);
    return () => window.clearInterval(timer);
  }, [roomSlug]);

  if (!unlocked) {
    return null;
  }

  return (
    <p className="colombia-room-access-status mt-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#fda4af]">
      {flag} {countryName} {t.colombia.accessLive} {formatCountryRoomAccessTimeLeft(accessLeftMs)} {t.gateTimeLeft}
    </p>
  );
}
