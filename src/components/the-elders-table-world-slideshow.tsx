"use client";

import { useEffect, useState } from "react";
import {
  eldersTableSceneLabels,
  eldersTableWorldSlideLabels,
  eldersTableWorldSlideSets,
  getEldersTableWoman,
  type EldersTableWorldSlide
} from "@/lib/the-elders-table";

const HOLD_MS = 5200;
const SLIDE_MS = 1500;

function WorldSlideCell({ slide, motionSeed }: { slide: EldersTableWorldSlide; motionSeed: number }) {
  const woman = getEldersTableWoman(slide.womanId);

  return (
    <div className={`elders-table-world-cell elders-table-world-cell-${slide.scene}`}>
      <div
        className={`elders-table-world-photo elders-table-world-photo-${motionSeed % 3}`}
        style={{ backgroundImage: `url('${slide.image}')` }}
      />
      <div className="elders-table-world-caption">
        <p className="elders-table-world-scene">{eldersTableSceneLabels[slide.scene]}</p>
        <p className="elders-table-world-activity">{slide.activity}</p>
        {woman ? (
          <p className="elders-table-world-name">
            {woman.flag} {woman.name.split(" ")[0]} · {woman.origin}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function WorldSlideGrid({ setIndex, motionSeed }: { setIndex: number; motionSeed: number }) {
  const cells = eldersTableWorldSlideSets[setIndex];

  return (
    <div className="elders-table-world-grid">
      {cells.map((slide, index) => (
        <WorldSlideCell key={slide.id} slide={slide} motionSeed={motionSeed + index} />
      ))}
    </div>
  );
}

export function TheEldersTableWorldSlideshow() {
  const [setIndex, setSetIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [resetTrack, setResetTrack] = useState(false);
  const setCount = eldersTableWorldSlideSets.length;
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
    <div className="elders-table-world-slideshow pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="elders-table-world-slideshow-stage absolute inset-0">
        <div className="elders-table-world-slideshow-track">
          <div
            className={`elders-table-world-slideshow-wrap${sliding ? " elders-table-world-slideshow-wrap-sliding" : ""}${
              resetTrack ? " elders-table-world-slideshow-wrap-reset" : ""
            }`}
          >
            <WorldSlideGrid setIndex={setIndex} motionSeed={setIndex} />
            <WorldSlideGrid setIndex={nextIndex} motionSeed={nextIndex} />
          </div>
        </div>
        <div className="elders-table-world-sequence">
          Set {String(setIndex + 1).padStart(2, "0")}/{String(setCount).padStart(2, "0")} ·{" "}
          {eldersTableWorldSlideLabels[setIndex]}
        </div>
      </div>
    </div>
  );
}
