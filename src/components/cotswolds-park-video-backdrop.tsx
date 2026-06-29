"use client";

import { useEffect, useState } from "react";
import { QuarterLocationLabel } from "@/components/quarter-location-label";
import { UkSlideshowDropshipCreatorsSlot } from "@/components/uk-slideshow-dropship-creators-slot";
import { cotswoldsQuarterSlideSets } from "@/lib/cotswolds";

const HOLD_MS = 5200;
const SLIDE_MS = 1500;

function QuarterGrid({
  setIndex,
  motionSeed
}: {
  setIndex: number;
  motionSeed: number;
}) {
  const activeSet = cotswoldsQuarterSlideSets[setIndex];

  return (
    <div className="cotswolds-quarters-grid">
      {activeSet.map((feed, index) => (
        <div key={`${setIndex}-${feed.id}-${index}`} className="cotswolds-quarter-cell">
          <div
            className={`cotswolds-quarter-photo cotswolds-quarter-photo-motion-${(motionSeed + index) % 3}`}
            style={{ backgroundImage: `url('${feed.image}')` }}
          />
          <QuarterLocationLabel feed={feed} />
        </div>
      ))}
    </div>
  );
}

export function CotswoldsParkVideoBackdrop() {
  const [setIndex, setSetIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [resetTrack, setResetTrack] = useState(false);
  const setCount = cotswoldsQuarterSlideSets.length;
  const nextIndex = (setIndex + 1) % setCount;

  useEffect(() => {
    let slideTimer: number | undefined;
    let resetTimer: number | undefined;

    const cycleTimer = window.setInterval(() => {
      setSliding(true);

      slideTimer = window.setTimeout(() => {
        setResetTrack(true);
        setSetIndex((value) => (value + 1) % setCount);
        setSliding(false);

        resetTimer = window.setTimeout(() => {
          setResetTrack(false);
        }, 40);
      }, SLIDE_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(cycleTimer);
      if (slideTimer) window.clearTimeout(slideTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [setCount]);

  return (
    <div className="cotswolds-quarters-backdrop absolute inset-0 overflow-hidden">
      <div className="cotswolds-quarters-backdrop-media pointer-events-none" aria-hidden="true">
        <div className="cotswolds-quarters-track">
          <div
            className={`cotswolds-quarters-grid-wrap${sliding ? " cotswolds-quarters-grid-wrap-sliding" : ""}${
              resetTrack ? " cotswolds-quarters-grid-wrap-reset" : ""
            }`}
          >
            <QuarterGrid setIndex={setIndex} motionSeed={setIndex} />
            <QuarterGrid setIndex={nextIndex} motionSeed={nextIndex} />
          </div>
        </div>

        <div className="cotswolds-quarters-crosshair-h" />
        <div className="cotswolds-quarters-crosshair-v" />
        <div className="cotswolds-park-unified-scrim" />
        <div className="cotswolds-slideshow-film-grain" />
      </div>
      <div className="cotswolds-uk-women-slot-mount">
        <UkSlideshowDropshipCreatorsSlot />
      </div>
    </div>
  );
}
