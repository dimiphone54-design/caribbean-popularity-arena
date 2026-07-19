"use client";

import { QuarterLocationLabel } from "@/components/quarter-location-label";
import { cotswoldsQuarterSlideSets } from "@/lib/cotswolds";

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
  return (
    <div className="cotswolds-quarters-backdrop absolute inset-0 overflow-hidden">
      <div className="cotswolds-quarters-backdrop-media pointer-events-none" aria-hidden="true">
        <div className="cotswolds-quarters-track">
          <div className="cotswolds-quarters-grid-wrap">
            <QuarterGrid setIndex={0} motionSeed={0} />
          </div>
        </div>

        <div className="cotswolds-quarters-crosshair-h" />
        <div className="cotswolds-quarters-crosshair-v" />
        <div className="cotswolds-park-unified-scrim" />
        <div className="cotswolds-slideshow-film-grain" />
      </div>
    </div>
  );
}
