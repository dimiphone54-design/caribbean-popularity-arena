"use client";

import { useCompliance } from "@/components/compliance-provider";

type UkGamesAgeGateBannerProps = {
  /** compact strip under panel header */
  compact?: boolean;
};

/**
 * Age Gates & Verification for UK games lanes.
 * Sport content is all-ages friendly; live play / tips / VIP stay premium 18+.
 * Reuses existing ComplianceProvider · acceptAgeAndTerms storage keys.
 */
export function UkGamesAgeGateBanner({ compact = false }: UkGamesAgeGateBannerProps) {
  const { ready, ageVerified, acceptAgeAndTerms } = useCompliance();

  if (!ready) {
    return (
      <div
        className={`rounded-xl border border-white/10 bg-black/30 ${compact ? "mt-2 px-2.5 py-2" : "mt-3 px-3 py-2.5"}`}
        aria-hidden="true"
      >
        <p className="text-[10px] text-[#8fa3c4]">Checking age gate…</p>
      </div>
    );
  }

  if (ageVerified) {
    return (
      <div
        className={`rounded-xl border border-emerald-400/25 bg-emerald-500/8 ${compact ? "mt-2 px-2.5 py-2" : "mt-3 px-3 py-2.5"}`}
        role="status"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-300">
          18+ verified · premium play unlocked
        </p>
        <p className="mt-1 text-[10px] leading-4 text-[#9fb4d4]">
          Games are fine for all ages as park sport. Live tips, VIP matches, and premium lanes stay adult-focused.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-[#f5c842]/30 bg-[#f5c842]/8 ${compact ? "mt-2 px-2.5 py-2" : "mt-3 px-3 py-2.5"}`}
      role="region"
      aria-label="Age gate and verification"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#f5c842]">
        Age gate · 18+ verification
      </p>
      <p className="mt-1 text-[11px] leading-5 text-[#d7e3f6]">
        These games are fine for all ages as British park sports. The Arena keeps live play, tipping,
        VIP matches, and premium branding adult-focused — confirm you are 18+ to play.
      </p>
      <button
        type="button"
        onClick={acceptAgeAndTerms}
        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#f5c842]/50 bg-[#f5c842]/15 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#fef9c3] transition hover:border-[#f5c842]/75 hover:bg-[#f5c842]/25"
      >
        I am 18+ · unlock play
      </button>
    </div>
  );
}

/** Returns whether live play is allowed (after compliance ready + age verified). */
export function useUkGamesPlayAllowed() {
  const { ready, ageVerified, acceptAgeAndTerms } = useCompliance();
  return {
    ready,
    allowed: ready && ageVerified,
    ageVerified,
    acceptAgeAndTerms
  };
}
