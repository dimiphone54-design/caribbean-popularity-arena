"use client";

import { useEffect, useState } from "react";
import { colombiaRoomBackgroundSlides } from "@/lib/colombia-room-live";

const HOLD_MS = 9000;
const FADE_MS = 1400;
const DARK_WINE = "#0d0104";
const DARK_WINE_DEEP = "#1a0208";

const scrimStyle = {
  background:
    "radial-gradient(ellipse 85% 55% at 50% 8%, rgba(251, 113, 133, 0.1), transparent 58%), radial-gradient(ellipse 70% 50% at 50% 42%, transparent 0%, rgba(13, 1, 4, 0.18) 72%, rgba(13, 1, 4, 0.52) 100%), linear-gradient(180deg, rgba(26, 2, 8, 0.28) 0%, rgba(13, 1, 4, 0.22) 32%, rgba(13, 1, 4, 0.68) 100%)"
} as const;

export function ColombiaRoomBackgroundSlideshow() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const slideCount = colombiaRoomBackgroundSlides.length;

  useEffect(() => {
    if (slideCount <= 1) {
      return undefined;
    }

    const cycleTimer = window.setInterval(() => {
      setSlideIndex((current) => {
        setPreviousIndex(current);
        window.setTimeout(() => setPreviousIndex(null), FADE_MS);
        return (current + 1) % slideCount;
      });
    }, HOLD_MS);

    return () => {
      window.clearInterval(cycleTimer);
    };
  }, [slideCount]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: DARK_WINE, width: "100%", height: "100dvh" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ backgroundColor: DARK_WINE_DEEP }} />

      {colombiaRoomBackgroundSlides.map((slide, index) => {
        const isActive = index === slideIndex;
        const isLeaving = previousIndex === index;

        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.42,0.03,0.18,1)]"
            style={{ opacity: isActive ? 1 : isLeaving ? 0 : 0, zIndex: isActive ? 2 : isLeaving ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt=""
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: slide.focus ?? "center center",
                filter: "saturate(1.12) contrast(1.06) brightness(0.94)",
                transform: slide.id === "comuna-13-party" ? "scale(1.18)" : "scale(1.04)"
              }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-[3]" style={scrimStyle} />
      <div
        className="absolute inset-0 z-[4]"
        style={{ boxShadow: "inset 0 0 80px rgba(0, 0, 0, 0.22)" }}
      />
    </div>
  );
}
