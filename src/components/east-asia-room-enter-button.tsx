"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { navigateIntlSuiteLink } from "@/lib/intl-suite-navigate";

type EastAsiaRoomEnterButtonProps = {
  countryId: "japan" | "china";
  countryName: string;
  flag: string;
  compact?: boolean;
  className?: string;
  onNavigate?: () => void;
};

/** One click · Japan / China live stage games room */
export function EastAsiaRoomEnterButton({
  countryId,
  countryName,
  flag,
  compact = false,
  className = "",
  onNavigate
}: EastAsiaRoomEnterButtonProps) {
  const router = useRouter();
  const href = `/rooms/${countryId}-room`;
  const gameLabel =
    countryId === "japan" ? "Kendo stage duel · sword + flame" : "Wushu Duilian · sword + staff sparring";

  return (
    <Link
      href={href}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        navigateIntlSuiteLink(router, href, onNavigate);
      }}
      className={`east-asia-room-enter-btn${compact ? " east-asia-room-enter-btn--compact" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`Enter ${countryName} live stage games room`}
    >
      <span className="east-asia-room-enter-btn-icon" aria-hidden="true">
        ⚔️
      </span>
      <span className="east-asia-room-enter-btn-text">
        {compact ? `▶ Stage games · 1 click` : `${flag} Enter Live Stage · ${countryName}`}
      </span>
      {!compact ? <span className="east-asia-room-enter-btn-hint">{gameLabel}</span> : null}
    </Link>
  );
}
