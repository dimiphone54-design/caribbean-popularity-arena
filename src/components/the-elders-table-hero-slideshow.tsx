"use client";

import { useEffect, useState } from "react";
import type { EldersTableVersionConfig } from "@/lib/the-elders-table-versions";

const HOLD_MS = 7000;
const SLIDE_MS = 1400;

const quarterPositions = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

function QuartetFrame({
  frame,
  photos
}: {
  frame: EldersTableVersionConfig["frames"][number] | undefined;
  photos: EldersTableVersionConfig["photos"];
}) {
  if (!frame?.indices?.length) {
    return null;
  }

  return (
    <div className="elders-table-quartet-frame elders-table-quartet-frame-static">
      {frame.indices.map((photoIndex, cellIndex) => {
        const photo = photos[photoIndex];
        if (!photo) {
          return null;
        }

        return (
          <div
            key={`${frame.id}-${quarterPositions[cellIndex]}`}
            className={`elders-table-quartet-cell elders-table-quartet-cell-${quarterPositions[cellIndex]}`}
          >
            <div
              className="elders-table-quartet-photo"
              style={{
                backgroundImage: `url('${photo.image}')`,
                backgroundPosition: photo.focus ?? "center center",
                backgroundSize: photo.size ?? "cover"
              }}
            />
          </div>
        );
      })}
      <div className="elders-table-quartet-cross" aria-hidden="true" />
    </div>
  );
}

type TheEldersTableHeroSlideshowProps = {
  config: EldersTableVersionConfig;
};

export function TheEldersTableHeroSlideshow({ config }: TheEldersTableHeroSlideshowProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [resetTrack, setResetTrack] = useState(false);
  const frameCount = config.frames.length;
  const safeFrameIndex = frameCount > 0 ? frameIndex % frameCount : 0;
  const nextIndex = frameCount > 0 ? (safeFrameIndex + 1) % frameCount : 0;
  const activeFrame = frameCount > 0 ? config.frames[safeFrameIndex] : undefined;

  useEffect(() => {
    if (!config.rotateSlideshow || frameCount <= 1) {
      return undefined;
    }

    let slideTimer: number | undefined;
    let resetTimer: number | undefined;

    const cycleTimer = window.setInterval(() => {
      setSliding(true);

      slideTimer = window.setTimeout(() => {
        setResetTrack(true);
        setFrameIndex((value) => (value + 1) % frameCount);
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
  }, [config.rotateSlideshow, frameCount]);

  if (!frameCount || !activeFrame) {
    return null;
  }

  return (
    <div className="elders-table-hero-glass pointer-events-none absolute inset-0 w-full overflow-hidden" aria-hidden="true">
      <div className="elders-table-quartet-track absolute inset-0">
        {!config.rotateSlideshow || frameCount <= 1 ? (
          <QuartetFrame frame={activeFrame} photos={config.photos} />
        ) : (
          <div
            className={`elders-table-quartet-wrap${sliding ? " elders-table-quartet-wrap-sliding" : ""}${
              resetTrack ? " elders-table-quartet-wrap-reset" : ""
            }`}
          >
            <QuartetFrame frame={config.frames[safeFrameIndex]} photos={config.photos} />
            <QuartetFrame frame={config.frames[nextIndex]} photos={config.photos} />
          </div>
        )}
      </div>

      <div className="elders-table-hero-glass-edge elders-table-hero-glass-edge-bottom absolute inset-x-0 bottom-0 h-[22%]" />
      <div className="elders-table-hero-glass-edge elders-table-hero-glass-edge-left absolute inset-y-0 left-0 w-[6%]" />
      <div className="elders-table-hero-glass-edge elders-table-hero-glass-edge-right absolute inset-y-0 right-0 w-[6%]" />

      {config.rotateSlideshow ? (
        <div className="elders-table-hero-sequence absolute bottom-[10%] left-1/2 z-[5] -translate-x-1/2 sm:bottom-[11%]">
          {String(safeFrameIndex + 1).padStart(2, "0")}/{String(frameCount).padStart(2, "0")} · {activeFrame.label}
        </div>
      ) : null}

      <div className="elders-table-photo-backdrop-scrim absolute inset-0" />
      <div className="elders-table-photo-backdrop-vignette absolute inset-0" />
    </div>
  );
}
