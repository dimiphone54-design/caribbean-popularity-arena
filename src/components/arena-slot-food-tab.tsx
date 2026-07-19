"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

export const UK_FOOD_TAB_HASH = "uk-food";
export const CHINA_FOOD_TAB_HASH = "china-food";
export const JAPAN_FOOD_TAB_HASH = "japan-food";
export const COLOMBIA_FOOD_TAB_HASH = "colombia-food";
export const ECUADOR_FOOD_TAB_HASH = "ecuador-food";
export const TRINIDAD_FOOD_TAB_HASH = "trinidad-food";

export const FOOD_TAB_HASH_BY_ISLAND_CODE: Record<string, string> = {
  UK: UK_FOOD_TAB_HASH,
  CN: CHINA_FOOD_TAB_HASH,
  JP: JAPAN_FOOD_TAB_HASH,
  CO: COLOMBIA_FOOD_TAB_HASH,
  EC: ECUADOR_FOOD_TAB_HASH,
  TT: TRINIDAD_FOOD_TAB_HASH
};

export const FOOD_ROOM_FALLBACK_BY_ISLAND_CODE: Record<string, string> = {
  UK: "/rooms/uk-flag-cotswolds",
  CN: "/rooms/china-room",
  JP: "/rooms/japan-room",
  CO: "/rooms/colombia-room",
  EC: "/rooms/ecuador-room"
};

const DEFAULT_FOOD_TAB_HASH = UK_FOOD_TAB_HASH;

type ArenaSlotFoodTabProps = {
  mode: "link";
  roomHref: string;
  label?: string;
  onNavigate?: () => void;
};

type ArenaSlotFoodRoomTabProps = {
  mode: "room";
  sectionId?: string;
  countryName?: string;
  label?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function ArenaSlotFoodTab(props: ArenaSlotFoodTabProps | ArenaSlotFoodRoomTabProps) {
  const label = props.label ?? "Food";
  const isLinkMode = props.mode === "link";
  const sectionId =
    props.mode === "room" ? (props.sectionId ?? DEFAULT_FOOD_TAB_HASH) : DEFAULT_FOOD_TAB_HASH;
  const countryName = props.mode === "room" ? (props.countryName ?? "room") : "room";
  const defaultOpen = props.mode === "room" ? (props.defaultOpen ?? false) : false;
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (isLinkMode || typeof window === "undefined") return;
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      const matches = hash === sectionId;
      if (matches) {
        setOpen(true);
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
      // Empty hash: keep defaultOpen panels open (e.g. Ecuador Comida panel)
      if (!hash && defaultOpen) {
        setOpen(true);
        return;
      }
      if (hash) setOpen(false);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [sectionId, isLinkMode, defaultOpen]);

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

  const closeTab = () => {
    setOpen(false);
    if (typeof window === "undefined") return;
    if (window.location.hash.replace("#", "") === sectionId) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  const toggleTab = () => {
    if (open) closeTab();
    else openTab();
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
        onClick={toggleTab}
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