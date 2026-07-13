"use client";

import type { ReactNode } from "react";

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
  /** e.g. Japan dropship creator slot · rendered under the room content */
  belowGate?: ReactNode;
  /** @deprecated Gift unlock removed — rooms are free community access */
  onUnlocked?: () => void;
};

/**
 * Country rooms are free community access.
 * Payment / gift unlock gate removed — always shows room content.
 */
export function CountryRoomLiveAccessGate({
  countryId,
  countryName,
  flag,
  children,
  hideUnlockedStatus = false,
  belowGate
}: CountryRoomLiveAccessGateProps) {
  return (
    <div>
      {!hideUnlockedStatus ? (
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-400">
          {flag} {countryName} · open community room
        </p>
      ) : null}
      {belowGate}
      <div id={`${countryId}-live-room`}>{children}</div>
    </div>
  );
}
