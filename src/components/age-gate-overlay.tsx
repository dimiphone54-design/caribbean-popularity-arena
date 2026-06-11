"use client";

import Link from "next/link";
import { useState } from "react";
import { useCompliance } from "@/components/compliance-provider";

export function AgeGateOverlay() {
  const { ready, ageVerified, termsAccepted, acceptAgeAndTerms } = useCompliance();
  const [confirmedAge, setConfirmedAge] = useState(false);
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);

  if (!ready || (ageVerified && termsAccepted)) {
    return null;
  }

  const canEnter = confirmedAge && acceptedPolicies;

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-[#02050d]/95 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-[#d7b46a]/30 bg-[#0a0e1f] p-6 shadow-2xl shadow-black/40 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d7b46a]">Age &amp; Legal Access</p>
        <h1 className="mt-2 font-luxury-serif text-3xl text-[#f7efe0]">Caribbean Popularity Arena</h1>
        <p className="mt-3 text-sm leading-6 text-[#b8c9e1]">
          This platform is for adults only. You must be at least 18 years old and agree to our legal policies before
          entering the arena.
        </p>

        <label className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
          <input
            type="checkbox"
            checked={confirmedAge}
            onChange={(event) => setConfirmedAge(event.target.checked)}
            className="mt-1"
          />
          <span className="text-sm leading-6 text-[#d9e4f2]">I confirm that I am at least 18 years old.</span>
        </label>

        <label className="mt-3 flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
          <input
            type="checkbox"
            checked={acceptedPolicies}
            onChange={(event) => setAcceptedPolicies(event.target.checked)}
            className="mt-1"
          />
          <span className="text-sm leading-6 text-[#d9e4f2]">
            I have read and agree to the{" "}
            <Link href="/legal/terms" className="text-[#f7e7aa] underline underline-offset-2">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-[#f7e7aa] underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <button
          type="button"
          disabled={!canEnter}
          onClick={acceptAgeAndTerms}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-4 py-3.5 text-sm font-black text-[#0a0e1f] transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enter Arena
        </button>

        <p className="mt-4 text-xs leading-5 text-[#8fa3bf]">
          If you do not agree, please leave this site. See also our{" "}
          <Link href="/legal/community" className="text-[#d7b46a] underline underline-offset-2">
            Community Guidelines
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
