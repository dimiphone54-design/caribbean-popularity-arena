"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

export const UK_DROPSHIP_TAB_HASH = "uk-dropshipping";
export const CHINA_DROPSHIP_TAB_HASH = "china-dropshipping";
export const COLOMBIA_DROPSHIP_TAB_HASH = "colombia-dropshipping";

export const DROPSHIP_TAB_HASH_BY_ISLAND_CODE: Record<string, string> = {
  UK: UK_DROPSHIP_TAB_HASH,
  CN: CHINA_DROPSHIP_TAB_HASH,
  CO: COLOMBIA_DROPSHIP_TAB_HASH
};

export const DROPSHIP_ROOM_FALLBACK_BY_ISLAND_CODE: Record<string, string> = {
  UK: "/rooms/uk-flag-cotswolds",
  CN: "/rooms/china-room",
  CO: "/rooms/colombia-room"
};

const DEFAULT_DROPSHIP_TAB_HASH = UK_DROPSHIP_TAB_HASH;

type ArenaSlotDropshipTabProps = {
  /** slot card · 1 click into country room dropship tab */
  mode: "link";
  roomHref: string;
  label?: string;
  onNavigate?: () => void;
};

type ArenaSlotDropshipRoomTabProps = {
  /** country room · tab opens full dropship panel inside */
  mode: "room";
  sectionId?: string;
  countryName?: string;
  label?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function ArenaSlotDropshipTab(
  props: ArenaSlotDropshipTabProps | ArenaSlotDropshipRoomTabProps
) {
  const label = props.label ?? "Dropshipping";

  if (props.mode === "link") {
    return (
      <section className="ai-real-slot-country-panel" aria-label="Dropshipping · enter room">
        <Link
          href={props.roomHref}
          className="ai-real-slot-country-panel-tab ai-real-slot-country-panel-tab--link"
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            event.stopPropagation();
            props.onNavigate?.();
          }}
        >
          {label}
        </Link>
      </section>
    );
  }

  const sectionId = props.sectionId ?? DEFAULT_DROPSHIP_TAB_HASH;
  const countryName = props.countryName ?? "room";
  const [open, setOpen] = useState(props.defaultOpen ?? false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromHash = () => {
      const matches = window.location.hash.replace("#", "") === sectionId;
      setOpen(matches);
      if (matches) {
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [sectionId]);

  const openTab = () => {
    setOpen(true);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <section
      id={sectionId}
      className="ai-real-slot-country-panel ai-real-slot-country-panel--room scroll-mt-24"
      aria-label={`${label} · ${countryName}`}
    >
      <button
        type="button"
        className={`ai-real-slot-country-panel-tab ai-real-slot-country-panel-tab--button${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={`${sectionId}-body`}
        onClick={() => (open ? setOpen(false) : openTab())}
      >
        {label}
      </button>
      {open ? (
        <div id={`${sectionId}-body`} className="ai-real-slot-country-panel-body ai-real-slot-country-panel-body--room">
          {props.children}
        </div>
      ) : null}
    </section>
  );
}