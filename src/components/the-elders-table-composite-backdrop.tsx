"use client";

import { useEffect, useState } from "react";
import { TheEldersTableGatherBackdrop } from "@/components/the-elders-table-gather-backdrop";
import { TheEldersTableHeroSlideshow } from "@/components/the-elders-table-hero-slideshow";
import { getEldersTableVersionConfig } from "@/lib/the-elders-table-versions";

const HOLD_MS = 6500;

const compositeSlides = [
  { id: "quartet", label: "01 / 03 · #7 · Your 4 quarters" },
  { id: "gather", label: "02 / 03 · #8 · Ken Burns mosaic" },
  { id: "noir", label: "03 / 03 · #10 · Marrakech noir" }
] as const;

const version7QuartetConfig = getEldersTableVersionConfig(7);

/** #5 locked layout — #7 → #8 → #10 slideshow (exact assets per version). */
export function TheEldersTableCompositeBackdrop() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideCount = compositeSlides.length;
  const activeSlide = compositeSlides[slideIndex].id;

  useEffect(() => {
    const cycleTimer = window.setInterval(() => {
      setSlideIndex((value) => (value + 1) % slideCount);
    }, HOLD_MS);

    return () => {
      window.clearInterval(cycleTimer);
    };
  }, [slideCount]);

  return (
    <div
      className={`elders-table-composite-backdrop elders-table-composite-backdrop-slide-${activeSlide} pointer-events-none absolute inset-0 w-full overflow-hidden`}
      aria-hidden="true"
    >
      <div className="elders-table-composite-noir-layer absolute inset-0">
        <div
          className="elders-table-noir-photo absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/elders-table-tokyo-marrakech-noir.png')" }}
        />
        <div className="elders-table-composite-noir-scrim absolute inset-0" />
      </div>

      <div className="elders-table-composite-gather-layer absolute inset-0">
        <TheEldersTableGatherBackdrop />
      </div>

      <div className="elders-table-composite-quartet-layer absolute inset-0">
        <TheEldersTableHeroSlideshow config={version7QuartetConfig} />
      </div>

      <div className="elders-table-composite-vignette absolute inset-0" />
      <div className="elders-table-slideshow-grain absolute inset-0" />

      <div className="elders-table-composite-sequence absolute bottom-[11%] left-1/2 z-[5] -translate-x-1/2">
        {compositeSlides[slideIndex].label}
      </div>
    </div>
  );
}
