"use client";

import Link from "next/link";

const specs = [
  { label: "Lane", value: "UK Tech & Automotive · premium dropship" },
  { label: "Platform fee", value: "15% service fee on every order" },
  { label: "Supplier payout", value: "~85% goes to the UK supplier after fee" },
  {
    label: "Payment flow",
    value: "Customer pays Arena (WiPay/Paddle) → Platform takes cut → Pay supplier"
  },
  { label: "Shipping", value: "Direct from London (or other UK warehouses)" }
] as const;

const publicFacing = [
  "🇬🇧 United Kingdom Tech & Automotive Lane",
  "Premium Dropship · Supplier Ships Direct from UK",
  "Tech & Gadgets Pack · $29 · London",
  "Car Interior & Care Kit · $35 · London",
  "British Heritage Travel Kit · $42 · Manchester",
  "Smart Home Gadgets Bundle · $38 · London",
  "Premium Football Fan Pack · $27 · Manchester",
  "Secure USD checkout · UK ships direct · tracking — no fee % on public page"
] as const;

const notes = [
  "No inventory risk for Arena",
  "Focus on reliable UK suppliers with fast shipping",
  "Possible premium vendor listing fee (monthly)",
  "Never show platform fee / payout split on public UK room"
] as const;

/** Owner-only · UK Tech & Automotive lane ops */
export function CommandCenterUkDropship() {
  return (
    <div className="space-y-4 text-left" aria-label="Command Center UK Dropship Internal">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d7b46a]">
          COMMAND CENTER · UK Tech &amp; Automotive Lane
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#8fa3bf]">Internal · hide from public room</p>
      </div>

      <dl className="grid gap-1.5 sm:grid-cols-2">
        {specs.map((row) => (
          <div
            key={row.label}
            className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-2"
          >
            <dt className="text-[8px] font-black uppercase tracking-[0.12em] text-[#8fa3bf]">
              {row.label}
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold leading-4 text-[#f7efe0]">{row.value}</dd>
          </div>
        ))}
      </dl>

      <section className="rounded-xl border border-[#00c9a7]/25 bg-[#001c2a]/50 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#67e8f9]">
          Public Description (Use This)
        </p>
        <ul className="mt-2 space-y-1 text-[11px] leading-5 text-[#c5cfe8]" role="list">
          {publicFacing.map((line) => (
            <li key={line} role="listitem">
              • {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#f5c842]/25 bg-[#120f06]/70 px-3 py-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
          Internal fee model (hide from public)
        </p>
        <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
          {notes.map((note) => (
            <li key={note} role="listitem">
              • {note}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/rooms/uk-flag-cotswolds#dropship-market"
        className="inline-flex rounded-full border border-[#d7b46a]/30 bg-[#d7b46a]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#d7b46a] transition hover:bg-[#d7b46a]/20"
      >
        Open public UK dropship →
      </Link>
    </div>
  );
}
