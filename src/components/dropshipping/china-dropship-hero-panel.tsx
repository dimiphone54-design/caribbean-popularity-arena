"use client";

import { useEffect, useState } from "react";
import { chinaDropshipHeroSlides } from "@/lib/china-dropship-people-photos";

const HOLD_MS = 7000;
const FADE_MS = 1200;

/** Shanghai · China dropship people slideshow · exact photos */
export function ChinaDropshipHeroPanel({ compact = false }: { compact?: boolean }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const slideCount = chinaDropshipHeroSlides.length;

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
      className={`dropship-china-hero${compact ? " dropship-china-hero--compact" : ""}`}
      aria-label="China dropship team"
    >
      <div className="dropship-china-hero-photos">
        {chinaDropshipHeroSlides.map((slide, index) => {
          const isActive = index === slideIndex;
          const isLeaving = previousIndex === index;

          return (
            <div
              key={slide.id}
              className={`dropship-china-hero-photo dropship-china-hero-photo--${slide.id} dropship-china-hero-photo--fill${isActive ? " dropship-china-hero-photo--active" : ""}${isLeaving ? " dropship-china-hero-photo--leaving" : ""}`}
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundPosition: slide.focus
              }}
            />
          );
        })}
      </div>
      <div className="dropship-china-hero-beam" aria-hidden="true" />
      <span className="dropship-china-hero-beam-notch" aria-hidden="true" />
      <p className="dropship-china-hero-label">🇨🇳 上海 · 代发团队</p>
      <span className="dropship-china-hero-live">● 直播 · dropship lane</span>
    </div>
  );
}
