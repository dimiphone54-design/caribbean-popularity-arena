"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 7000;
const FADE_MS = 1200;

const COLOMBIA_HERO_SLIDES = [
  {
    id: "medellin-night",
    src: "/colombia-nightlife-real.png",
    focus: "center 35%",
    fill: "cover"
  },
  {
    id: "medellin-metro",
    src: "/colombia-slide-medellin-metro.png",
    focus: "center 42%"
  }
] as const;

/** Medellín · Colombia hero photo slideshow · dropship panels */
export function ColombiaDropshipHeroPanel({ compact = false }: { compact?: boolean }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const slideCount = COLOMBIA_HERO_SLIDES.length;

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
      className={`dropship-colombia-hero${compact ? " dropship-colombia-hero--compact" : ""}`}
      aria-hidden="true"
    >
      <div className="dropship-colombia-hero-photos">
        {COLOMBIA_HERO_SLIDES.map((slide, index) => {
          const isActive = index === slideIndex;
          const isLeaving = previousIndex === index;

          return (
            <div
              key={slide.id}
              className={`dropship-colombia-hero-photo dropship-colombia-hero-photo--${slide.id}${"fill" in slide && slide.fill === "cover" ? " dropship-colombia-hero-photo--fill" : ""}${isActive ? " dropship-colombia-hero-photo--active" : ""}${isLeaving ? " dropship-colombia-hero-photo--leaving" : ""}`}
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundPosition: slide.focus
              }}
            />
          );
        })}
      </div>
      <div className="dropship-colombia-hero-beam" aria-hidden="true" />
      <span className="dropship-colombia-hero-beam-notch" aria-hidden="true" />
      <p className="dropship-colombia-hero-label">🇨🇴 Medellín · Colombia</p>
      <span className="dropship-colombia-hero-live">● EN VIVO · carril dropship</span>
    </div>
  );
}

export const colombiaDropshipHeroImage = COLOMBIA_HERO_SLIDES[0].src;
