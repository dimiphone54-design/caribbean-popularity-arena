"use client";

import Link from "next/link";
import { useCompliance } from "@/components/compliance-provider";

export function CookieConsentBanner() {
  const { ready, ageVerified, termsAccepted, cookieConsent, setCookieConsent } = useCompliance();

  if (!ready || !ageVerified || !termsAccepted || cookieConsent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[190] border-t border-[#d7b46a]/25 bg-[#050d1d]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#f7efe0]">Cookie &amp; analytics preferences</p>
          <p className="mt-1 text-sm leading-6 text-[#b8c9e1]">
            We use essential cookies for security and session operation. With your consent, we may also use analytics
            cookies to improve the platform. Read our{" "}
            <Link href="/legal/cookies" className="text-[#f7e7aa] underline underline-offset-2">
              Cookie and Analytics Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCookieConsent("essential")}
            className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-[#b8c9e1] transition hover:border-white/30 hover:text-[#f7efe0]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent("all")}
            className="rounded-lg bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-4 py-2.5 text-sm font-black text-[#0a0e1f] transition hover:opacity-90"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
