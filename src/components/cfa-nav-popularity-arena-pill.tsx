"use client";

import { CfaNavPopularityPreviewReel } from "@/components/cfa-nav-popularity-preview-reel";

/** CARIBBEAN POPULARITY ARENA nav tab · slideshow only · no click action */
export function CfaNavPopularityArenaPill() {
  return (
    <span
      className="a2030-brand cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--popularity-display min-w-0 shrink"
      aria-label="Caribbean Popularity Arena"
    >
      <CfaNavPopularityPreviewReel />
      <span className="cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10">
        CARIBBEAN POPULARITY ARENA
      </span>
    </span>
  );
}