"use client";

import { useEffect, useState } from "react";
import { CfaHeaderSlotCountryMapSlide } from "@/components/cfa-header-slot-country-map-slide";
import { CFA_HEADER_SLOT_COUNTRY_MAPS } from "@/lib/cfa-header-slot-country-maps";

const FLIP_MS = 5200;
const FLIP_OUT_MS = 460;

/** Front 12 slot nations · Trinidad-exact map look · flipping carousel */
export function CfaHeaderSlotCountriesFlipBackdrop() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  const country = CFA_HEADER_SLOT_COUNTRY_MAPS[index] ?? CFA_HEADER_SLOT_COUNTRY_MAPS[0]!;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % CFA_HEADER_SLOT_COUNTRY_MAPS.length);
        setPhase("in");
        window.dispatchEvent(new CustomEvent("cfa-slot-map-flip"));
      }, FLIP_OUT_MS);
    }, FLIP_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="cfa-elite-ai-header-tt-bg cfa-elite-ai-header-slot-flip-root" aria-hidden="true">
      <div className={`cfa-elite-ai-header-slot-flip-stage cfa-elite-ai-header-slot-flip-stage--${phase}`}>
        <CfaHeaderSlotCountryMapSlide key={country.islandCode} country={country} withJoinAnchor backdrop />
      </div>
    </div>
  );
}
