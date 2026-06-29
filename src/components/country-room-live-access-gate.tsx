"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CountryLiveGiftCheckoutPanel } from "@/components/country-live-gift-checkout-panel";
import { useRoomLocale } from "@/components/room-locale-provider";
import {
  countryRoomAccessTimeLeftMs,
  COUNTRY_ROOM_ACCESS_EVENT,
  formatCountryRoomAccessTimeLeft,
  isCountryRoomAccessActive
} from "@/lib/country-room-access";

type CountryRoomLiveAccessGateProps = {
  roomSlug: string;
  countryId: string;
  countryName: string;
  flag: string;
  children: ReactNode;
  variant?: "default" | "romantic";
  hideUnlockedStatus?: boolean;
  /** overlay = centered on content · underneath = full-width stack under dropship */
  gateLayout?: "overlay" | "underneath";
  /** e.g. Japan dropship creator slot · rendered directly under the gift signup panel */
  belowGate?: ReactNode;
};

export function CountryRoomLiveAccessGate({
  roomSlug,
  countryId,
  countryName,
  flag,
  children,
  variant = "default",
  hideUnlockedStatus = false,
  gateLayout = "overlay",
  belowGate
}: CountryRoomLiveAccessGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [accessLeftMs, setAccessLeftMs] = useState(0);
  const romantic = variant === "romantic";
  const { t } = useRoomLocale();
  const romanticCopy = t.colombia;

  useEffect(() => {
    const sync = () => {
      const active = isCountryRoomAccessActive(roomSlug);
      setUnlocked(active);
      setAccessLeftMs(countryRoomAccessTimeLeftMs(roomSlug));
    };

    sync();
    const timer = window.setInterval(sync, 1000);
    window.addEventListener(COUNTRY_ROOM_ACCESS_EVENT, sync);
    window.addEventListener("cpa:arena-master-key", sync);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(COUNTRY_ROOM_ACCESS_EVENT, sync);
      window.removeEventListener("cpa:arena-master-key", sync);
    };
  }, [roomSlug]);

  if (unlocked) {
    return (
      <div>
        {!hideUnlockedStatus ? (
          <p
            className={`mb-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] ${
              romantic ? "text-[#fda4af]" : "text-emerald-400"
            }`}
          >
            {flag} {countryName} {romantic ? romanticCopy.accessLive : t.gateLiveUnlocked} ·{" "}
            {formatCountryRoomAccessTimeLeft(accessLeftMs)} {t.gateTimeLeft}
          </p>
        ) : null}
        {belowGate}
        {children}
      </div>
    );
  }

  const checkoutPanel = (
    <CountryLiveGiftCheckoutPanel
      countryId={countryId}
      countryName={countryName}
      flag={flag}
      roomSlug={roomSlug}
      variant={romantic ? "romantic" : "gate"}
      onUnlocked={() => {
        setUnlocked(true);
        setAccessLeftMs(countryRoomAccessTimeLeftMs(roomSlug));
      }}
    />
  );

  if (gateLayout === "underneath") {
    return (
      <div className="country-room-live-gate-underneath w-full">
        <div id={`${countryId}-live-gift-gate`} className="country-room-live-gate-underneath-gate w-full">
          {checkoutPanel}
        </div>
        {belowGate ? <div className="country-room-live-gate-underneath-slot w-full">{belowGate}</div> : null}
        <div className="country-room-live-gate-underneath-preview">
          <div className="pointer-events-none select-none opacity-30 blur-[2px]" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-30 blur-[2px]" aria-hidden="true">
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#040810]/35 p-4 backdrop-blur-[2px] sm:p-6">
        <div className="w-full max-w-6xl">{checkoutPanel}</div>
      </div>
    </div>
  );
}
