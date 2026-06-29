"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getInternationalSuitePrimaryRoomHref,
  type InternationalSuiteCountry
} from "@/lib/international-suite";
import { getIntlSuiteEnterRoomOneClick } from "@/lib/intl-suite-country-copy";
import { navigateIntlSuiteLink } from "@/lib/intl-suite-navigate";

type InternationalSuiteRoomEnterLinkProps = {
  country: InternationalSuiteCountry;
  onNavigate?: () => void;
  className?: string;
  label?: string;
  /** Prevent `<details>` summary from toggling when link is inside summary */
  stopToggle?: boolean;
};

/** One-click entry into a built country room from International SUITE */
export function InternationalSuiteRoomEnterLink({
  country,
  onNavigate,
  className = "a2030-intl-suite-enter-room-link",
  label,
  stopToggle = false
}: InternationalSuiteRoomEnterLinkProps) {
  const router = useRouter();
  const href = getInternationalSuitePrimaryRoomHref(country);
  if (!href) return null;

  const text =
    label ??
    getIntlSuiteEnterRoomOneClick(country.id, country.flag, `ENTER ROOM · 1 click enter`);

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        if (stopToggle) {
          event.stopPropagation();
        }
        if (onNavigate) {
          event.preventDefault();
          navigateIntlSuiteLink(router, href, onNavigate);
        }
      }}
    >
      {text}
    </Link>
  );
}
