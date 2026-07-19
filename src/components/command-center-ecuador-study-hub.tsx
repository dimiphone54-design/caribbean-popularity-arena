"use client";

import Link from "next/link";
import { ECUADOR_STUDY_HUB_FREEZE_CATALOG } from "@/components/ecuador-study-hub-tab-panel";

/** Owner-only · Ecuador Study Hub revenue model (hidden from public room) */
export function CommandCenterEcuadorStudyHub() {
  const catalog = ECUADOR_STUDY_HUB_FREEZE_CATALOG;

  return (
    <div className="space-y-4 text-left" aria-label="Command Center Ecuador Study Hub Internal">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#fcd116]">
          COMMAND CENTER · Ecuador Study Hub
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#8fa3bf]">
          Internal · public is free campus · full money also in FREEZE COMING SOON
        </p>
      </div>

      <section className="rounded-xl border border-[#00c9a7]/25 bg-[#001c2a]/50 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#67e8f9]">
          Public free campus (live now)
        </p>
        <p className="mt-2 text-[13px] font-black text-[#fff7df]">🇪🇨 Ecuador Study Hub</p>
        <p className="mt-0.5 text-[11px] text-[#d7e3f6]">
          Quito · Guayaquil · Live Learning with Real Teachers
        </p>
        <p className="mt-1 text-[10px] text-[#86efac]">{catalog.publicStatus}</p>
        <ul className="mt-2 space-y-1 text-[11px] leading-5 text-[#c5cfe8]" role="list">
          {catalog.freePublic.map((line) => (
            <li key={line} role="listitem">
              • {line}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
          💰 How This Makes Money for the Platform (frozen)
        </p>
        <dl className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {catalog.moneyLanes.map((row) => (
            <div
              key={row.label}
              className="rounded-lg border border-[#f5c842]/20 bg-black/30 px-2.5 py-2"
            >
              <dt className="text-[8px] font-black uppercase tracking-[0.12em] text-[#8fa3bf]">
                {row.label}
              </dt>
              <dd className="mt-0.5 text-[11px] font-semibold leading-4 text-[#f7efe0]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#8fa3bf]">
          Payout · commission notes
        </p>
        <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
          {catalog.payoutNotes.map((note) => (
            <li key={note} role="listitem">
              • {note}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] text-[#fcd116]/90">{catalog.reopenNote}</p>
      </section>

      <Link
        href="/rooms/ecuador-room#ecuador-study-hub"
        className="inline-flex rounded-full border border-[#fcd116]/30 bg-[#fcd116]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#fcd116] transition hover:bg-[#fcd116]/20"
      >
        Open public Ecuador Study Hub →
      </Link>
    </div>
  );
}
