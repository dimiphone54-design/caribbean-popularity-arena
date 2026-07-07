"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const CfaFreedomArenaLiveMap = dynamic(
  () => import("@/components/cfa-freedom-arena-live-map").then((mod) => mod.CfaFreedomArenaLiveMap),
  {
    ssr: false,
    loading: () => <p className="cfa-freedom-arena-live-map-loading">Loading live world map…</p>
  }
);

type CfaPopularityArenaWorldMapModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CfaPopularityArenaWorldMapModal({ open, onClose }: CfaPopularityArenaWorldMapModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="cfa-popularity-worldmap-overlay" onClick={onClose} role="presentation">
      <div
        className="cfa-popularity-worldmap-modal cfa-popularity-worldmap-modal--live"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Caribbean Freedom Arena live world map"
      >
        <button
          type="button"
          className="cfa-popularity-worldmap-close"
          onClick={onClose}
          aria-label="Close world map"
        >
          ×
        </button>
        <CfaFreedomArenaLiveMap />
        <p className="cfa-freedom-arena-live-map-hint">
          Zoom in for cities · drag to explore · green dots = arena countries
        </p>
      </div>
    </div>
  );
}