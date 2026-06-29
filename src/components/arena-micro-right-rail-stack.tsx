"use client";

import { useEffect, useRef, useState } from "react";
import { ArenaMicroRightRailPanels } from "@/components/arena-micro-right-rail-panels";

type ArenaMicroRightRailStackProps = {
  className?: string;
};

/** Welcome · Guide + Auto-detect + Voice · lower-right · open by default · fire-scroll */
export function ArenaMicroRightRailStack({ className = "" }: ArenaMicroRightRailStackProps) {
  const [open, setOpen] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const drawerId = "arena-micro-rail-wall-drawer";

  useEffect(() => {
    if (!open || !trackRef.current) return;
    trackRef.current.scrollTop = 0;
  }, [open]);

  return (
    <div
      className={`arena-micro-rail-hover-shell arena-micro-rail-wall-run${open ? " arena-micro-rail-hover-shell--open" : ""} ${className}`.trim()}
    >
      <div
        id={drawerId}
        className="arena-micro-rail-hover-drawer arena-micro-right-rail-fire-drawer"
        aria-hidden={!open}
        aria-label="AI panels · wall stack"
      >
        <div className="arena-micro-right-rail-fire-wrap">
          <div
            ref={trackRef}
            className="arena-micro-rail-hover-up-track arena-micro-rail-wall-run-track fire-scroll arena-micro-right-rail-ai-fire-scroll"
          >
            <ArenaMicroRightRailPanels />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="arena-micro-rail-hover-spot"
        aria-label={open ? "Close AI wall" : "Open AI wall"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="arena-micro-rail-hover-spot-glyph" aria-hidden="true">
          ✦
        </span>
        <span className="arena-micro-rail-hover-spot-label">AI</span>
      </button>
    </div>
  );
}
