"use client";

import { DirectDropshipLanePanel } from "@/components/dropshipping/direct-dropship-lane-panel";

type EcuadorNoMercyWingIntroProps = {
  className?: string;
  variant?: "default" | "obsidian-row";
  flag?: string;
  countryName?: string;
};

/** Ecuador room · Direct Dropship template (same as every other country) */
export function EcuadorNoMercyWingIntro({ className = "" }: EcuadorNoMercyWingIntroProps) {
  return (
    <div className={`dropship-market-room-intro dropship-market-room-intro--no-mercy-wing${className ? ` ${className}` : ""}`}>
      <DirectDropshipLanePanel countryId="ecuador" variant="compact" />
    </div>
  );
}
