"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCompliance } from "@/components/compliance-provider";
import { markArenaMemberAccess } from "@/lib/arena-member-access";

type ArenaJoinSignupModalProps = {
  open: boolean;
  onClose: () => void;
  onJoined: () => void;
  slotRank?: number;
  countryLabel?: string;
};

/** Exact JOIN panel · pops on slot click · 1 click $6 Gift */
export function ArenaJoinSignupModal({
  open,
  onClose,
  onJoined,
  slotRank,
  countryLabel
}: ArenaJoinSignupModalProps) {
  const { acceptAgeAndTerms } = useCompliance();
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setOpening(false);
  }, [open]);

  if (!open) {
    return null;
  }

  function openArena() {
    if (opening) return;
    setOpening(true);
    acceptAgeAndTerms();
    markArenaMemberAccess();
    onJoined();
    setOpening(false);
  }

  const slotLine =
    slotRank && countryLabel
      ? `${countryLabel} · SLOT ${slotRank}`
      : slotRank
        ? `SLOT ${slotRank}`
        : null;

  return (
    <div
      className="arena-site-signup-gate fixed inset-0 z-[220] grid place-items-center bg-black/82 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arena-site-join-title"
      onClick={onClose}
    >
      <div
        className="a2030-modal a2030-modal--signup-bg arena-site-signup-gate-panel relative w-full max-w-lg overflow-hidden rounded-[1.25rem] p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="a2030-modal-signup-bg-image" aria-hidden="true" />
        <span className="a2030-modal-signup-bg-scrim" aria-hidden="true" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 z-[2] text-xl text-[#7a82a8] hover:text-[#f0edf8]"
          aria-label="Close join panel"
        >
          ×
        </button>

        <div className="relative z-[1] arena-site-signup-choose text-center">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#7dd3fc]">
            Step 1 · CaribbeanFreedomArena · 18+ only
          </p>
          {slotLine ? (
            <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#f5c842]">{slotLine}</p>
          ) : null}
          <h1
            id="arena-site-join-title"
            className="arena-site-signup-title mt-3 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-[#f5c842] via-[#ff8060] to-[#ff5c2b] sm:text-6xl"
          >
            JOIN
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#b8c9e1]">
            Join first · then continue on the arena · one click for anyone
          </p>

          <button
            type="button"
            className="arena-site-signup-gift-open mt-8 w-full"
            onClick={openArena}
            disabled={opening}
          >
            <span className="arena-site-signup-gift-open-kicker">Join · Arena Member Gift · anyone</span>
            <span className="arena-site-signup-gift-open-amount">$6.00 USD Gift</span>
            <span className="arena-site-signup-gift-open-action">{opening ? "Opening…" : "Open →"}</span>
          </button>

          <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#7a82a8]">
            Gifts are for digital platform access only ·{" "}
            <Link href="/legal/terms" className="text-[#f7e7aa] underline underline-offset-2">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
