"use client";

import { useEffect, useId, useState } from "react";
import { measureGlobeTrinidadJoinLine, type GlobeTrinidadJoinLine } from "@/lib/cfa-header-globe-trinidad-beam";

function bindMediaLoad(frame: Element, onLoad: () => void): () => void {
  const cleanups: Array<() => void> = [];

  frame.querySelectorAll("img").forEach((img) => {
    if (img.complete) {
      onLoad();
      return;
    }

    img.addEventListener("load", onLoad);
    cleanups.push(() => img.removeEventListener("load", onLoad));
  });

  frame.querySelectorAll("image").forEach((node) => {
    node.addEventListener("load", onLoad);
    cleanups.push(() => node.removeEventListener("load", onLoad));
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

/** Measured white 4K stream · locks globe rim to Trinidad island */
export function CfaHeaderGlobeTrinidadJoinBeam() {
  const filterId = useId().replace(/:/g, "");
  const [line, setLine] = useState<GlobeTrinidadJoinLine | null>(null);

  useEffect(() => {
    const frame = document.querySelector(".cfa-elite-ai-header-frame");
    if (!frame) return;

    const update = () => setLine(measureGlobeTrinidadJoinLine(frame));
    const retryTimers = [120, 450, 1200].map((ms) => window.setTimeout(update, ms));

    update();
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update).catch(() => undefined);

    const ro = new ResizeObserver(update);
    ro.observe(frame);

    const globeBody = frame.querySelector(".cfa-real-world-globe-body");
    if (globeBody) ro.observe(globeBody);

    const unbindMedia = bindMediaLoad(frame, update);
    const onFlip = () => update();
    window.addEventListener("cfa-slot-map-flip", onFlip);

    return () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", update);
      window.removeEventListener("cfa-slot-map-flip", onFlip);
      ro.disconnect();
      unbindMedia();
    };
  }, []);

  if (!line) return null;

  const pathD = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;

  return (
    <svg
      className="cfa-elite-ai-header-join-beam"
      width={line.width}
      height={line.height}
      viewBox={`0 0 ${line.width} ${line.height}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={`cfaJoinGlow-${filterId}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.8 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={pathD} className="cfa-join-beam-trace" />
      <path d={pathD} className="cfa-join-beam-core" />
      <path d={pathD} className="cfa-join-beam-pulse" filter={`url(#cfaJoinGlow-${filterId})`} />
      <circle cx={line.x1} cy={line.y1} r="2.5" className="cfa-join-beam-globe-node" />
      <circle r="1.8" className="cfa-join-beam-head">
        <animateMotion dur="1.25s" repeatCount="indefinite" path={pathD} />
      </circle>
    </svg>
  );
}
