"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

export const UK_STUDY_HUB_TAB_HASH = "uk-study-hub";
export const CHINA_STUDY_HUB_TAB_HASH = "china-study-hub";
export const JAPAN_STUDY_HUB_TAB_HASH = "japan-study-hub";
export const COLOMBIA_STUDY_HUB_TAB_HASH = "colombia-study-hub";
export const ECUADOR_STUDY_HUB_TAB_HASH = "ecuador-study-hub";

export const STUDY_HUB_TAB_HASH_BY_ISLAND_CODE: Record<string, string> = {
  UK: UK_STUDY_HUB_TAB_HASH,
  CN: CHINA_STUDY_HUB_TAB_HASH,
  JP: JAPAN_STUDY_HUB_TAB_HASH,
  CO: COLOMBIA_STUDY_HUB_TAB_HASH,
  EC: ECUADOR_STUDY_HUB_TAB_HASH
};

export const STUDY_HUB_ROOM_FALLBACK_BY_ISLAND_CODE: Record<string, string> = {
  UK: "/rooms/uk-flag-cotswolds",
  CN: "/rooms/china-room",
  JP: "/rooms/japan-room",
  CO: "/rooms/colombia-room",
  EC: "/rooms/ecuador-room"
};

const DEFAULT_STUDY_HUB_TAB_HASH = UK_STUDY_HUB_TAB_HASH;

type ArenaSlotStudyHubTabProps = {
  mode: "link";
  roomHref: string;
  label?: string;
  onNavigate?: () => void;
};

type ArenaSlotStudyHubRoomTabProps = {
  mode: "room";
  sectionId?: string;
  countryName?: string;
  label?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function ArenaSlotStudyHubTab(props: ArenaSlotStudyHubTabProps | ArenaSlotStudyHubRoomTabProps) {
  const label = props.label ?? "Study Hub";
  const isLinkMode = props.mode === "link";
  const sectionId =
    props.mode === "room" ? (props.sectionId ?? DEFAULT_STUDY_HUB_TAB_HASH) : DEFAULT_STUDY_HUB_TAB_HASH;
  const countryName = props.mode === "room" ? (props.countryName ?? "room") : "room";
  const [open, setOpen] = useState(props.mode === "room" ? (props.defaultOpen ?? false) : false);

  useEffect(() => {
    if (isLinkMode || typeof window === "undefined") return;
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
  }, [sectionId, isLinkMode]);

  if (isLinkMode) {
    return (
      <section className="ai-real-slot-country-panel" aria-label={`${label} · enter room`}>
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