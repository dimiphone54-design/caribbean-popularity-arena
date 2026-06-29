"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getDropshipMarketHref } from "@/lib/dropshipping";
import { getDropshipCountryDisplayName, getDropshipMarketCopy } from "@/lib/dropship-market-copy";
import { navigateIntlSuiteLink } from "@/lib/intl-suite-navigate";

type DropshipEnterButtonProps = {
  countryId?: string;
  countryName?: string;
  flag?: string;
  compact?: boolean;
  className?: string;
  onNavigate?: () => void;
};

/** One click · full dropship market + order flow */
export function DropshipEnterButton({
  countryId,
  countryName,
  flag,
  compact = false,
  className = "",
  onNavigate
}: DropshipEnterButtonProps) {
  const router = useRouter();
  const href = getDropshipMarketHref(countryId);
  const copy = getDropshipMarketCopy(countryId ?? "uk");
  const displayName = countryName
    ? getDropshipCountryDisplayName(countryId ?? "uk", countryName)
    : undefined;
  const label =
    displayName && flag ? copy.enterMarketWithCountry(flag, displayName) : copy.enterMarketFull;

  return (
    <Link
      href={href}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        navigateIntlSuiteLink(router, href, onNavigate);
      }}
      className={`dropship-enter-btn${compact ? " dropship-enter-btn--compact" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`${copy.title}${displayName ? ` · ${displayName}` : ""}`}
    >
      <span className="dropship-enter-btn-icon" aria-hidden="true">
        📦
      </span>
      <span className="dropship-enter-btn-text">{compact ? copy.enterCompact : label}</span>
      {!compact ? <span className="dropship-enter-btn-hint">{copy.enterHint}</span> : null}
    </Link>
  );
}
