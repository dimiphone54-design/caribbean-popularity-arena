"use client";

import Link from "next/link";
import { type MouseEvent } from "react";

export const AI_POWERHOUSE_ROOM_HREF = "/rooms/ai-powerhouse-room";

export const AI_POWERHOUSE_TAB_HASH = "ai-powerhouse";

export const AI_POWERHOUSE_TAB_HASH_BY_ISLAND_CODE: Record<string, string> = {
  UK: AI_POWERHOUSE_TAB_HASH,
  CN: AI_POWERHOUSE_TAB_HASH,
  JP: AI_POWERHOUSE_TAB_HASH,
  CO: AI_POWERHOUSE_TAB_HASH,
  EC: AI_POWERHOUSE_TAB_HASH,
  TT: AI_POWERHOUSE_TAB_HASH,
  ES: AI_POWERHOUSE_TAB_HASH
};

type ArenaSlotAiPowerhouseTabProps = {
  mode: "link";
  roomHref?: string;
  label?: string;
  onNavigate?: () => void;
};

export function ArenaSlotAiPowerhouseTab(props: ArenaSlotAiPowerhouseTabProps) {
  const label = props.label ?? "AI Powerhouse";
  const href = props.roomHref ?? AI_POWERHOUSE_ROOM_HREF;

  return (
    <section className="ai-real-slot-country-panel" aria-label={`${label} · enter room`}>
      <Link
        href={href}
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
