"use client";

import { useEffect, useState } from "react";
import { ecuadorDropshipHeroSlides } from "@/lib/ecuador-dropship-people-photos";

const HOLD_MS = 7000;
const FADE_MS = 1200;

/** Ecuador · dropship people slideshow · exact photos */
export function EcuadorDropshipHeroPanel({ compact = false }: { compact?: boolean }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const slideCount = ecuadorDropshipHeroSlides.length;

  useEffect(() => {
    if (slideCount <= 1) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const cycleTimer = window.setInterval(() => {
      setSlideIndex((current) => {
        setPreviousIndex(current);
        window.setTimeout(() => setPreviousIndex(null), FADE_MS);
        return (current + 1) % slideCount;
      });
    }, HOLD_MS);

    return () => window.clearInterval(cycleTimer);
  }, [slideCount]);

  return (
    <div
      className={`dropship-ecuador-hero${compact ? " dropship-ecuador-hero--compact" : ""}`}
      aria-label="Ecuador dropship team"
    >
      <div className="dropship-ecuador-hero-photos">
        {ecuadorDropshipHeroSlides.map((slide, index) => {
          const isActive = index === slideIndex;
          const isLeaving = previousIndex === index;

          return (
            <div
              key={slide.id}
              className={`dropship-ecuador-hero-photo dropship-ecuador-hero-photo--${slide.id} dropship-ecuador-hero-photo--fill${isActive ? " dropship-ecuador-hero-photo--active" : ""}${isLeaving ? " dropship-ecuador-hero-photo--leaving" : ""}`}
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundPosition: slide.focus
              }}
            />
          );
        })}
      </div>
      <div className="dropship-ecuador-hero-beam" aria-hidden="true" />
      <span className="dropship-ecuador-hero-beam-notch" aria-hidden="true" />
      <p className="dropship-ecuador-hero-label">🇪🇨 Ecuador · equipo dropship</p>
      <span className="dropship-ecuador-hero-live">● EN VIVO · carril dropship</span>
    </div>
  );
}
