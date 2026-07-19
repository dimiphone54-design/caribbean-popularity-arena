"use client";

import Link from "next/link";

const specs = [
  { label: "Lane Type", value: "Direct Dropship" },
  { label: "Fee", value: "15% platform service fee" },
  { label: "Payment", value: "WiPay / Paddle (USD)" },
  { label: "Fulfillment", value: "Supplier ships direct from Quito or Guayaquil" },
  { label: "Delivery", value: "3–7 days domestic | 7–21 days international" }
] as const;

const publicSteps = [
  "Browse authentic Ecuadorian products",
  "Pay securely on the Arena (USD)",
  "Supplier ships direct from Quito or Guayaquil",
  "Receive with tracking"
] as const;

/** Owner-only fee line — never show on public Ecuador dropship UI */
const internalFeeNotes = [
  "Platform keeps 15% service fee on every paid dropship order",
  "Optional premium vendor monthly listing fee",
  "All payouts managed through platform checkout"
] as const;

const featuredProducts = [
  { name: "Tech & Gadgets Bundle", price: "$29.00", hub: "Quito" },
  { name: "Auto Interior Care Kit", price: "$35.00", hub: "Quito" },
  { name: "Guayaquil Ceviche Kit", price: "$27.00", hub: "Guayaquil" },
  { name: "Andes Artisan Collection", price: "$31.00", hub: "Quito" },
  { name: "Carnival Ready Pack", price: "$22.00", hub: "Quito" }
] as const;

const notes = [
  "No inventory on Arena",
  "Optional premium vendor monthly listing fee",
  "All payouts managed through platform"
] as const;

/** Money catalog · Command Center FREEZE COMING SOON (public dropship panel hidden) */
export const ECUADOR_DROPSHIP_FREEZE_CATALOG = {
  panelTitle: "🇪🇨 Ecuador Direct Dropship · paid lane",
  publicStatus: "HIDDEN on public room · PublicDropshipGate + SHOW_DROPSHIP_PANELS=false",
  room: "/rooms/ecuador-room#ecuador-dropshipping",
  specs,
  publicSteps,
  internalFeeNotes,
  featuredProducts,
  notes,
  reopenNote:
    "Set NEXT_PUBLIC_SHOW_DROPSHIP_PANELS=true and NEXT_PUBLIC_REAL_MONEY_ENABLED=true to restore public checkout."
} as const;

/** Owner-only · clean Ecuador dropship lane reference */
export function CommandCenterEcuadorDropship() {
  return (
    <div className="space-y-4 text-left" aria-label="Command Center Ecuador Dropship Lane Internal">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f5c842]">
          COMMAND CENTER · Ecuador Dropship Lane
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#8fa3bf]">Internal</p>
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
        <p className="mt-2 text-[13px] font-black text-[#fff7df]">🇪🇨 Ecuador Direct Dropship Lane</p>
        <p className="mt-0.5 text-[11px] text-[#d7e3f6]">Supplier Ships Direct · Secure USD Checkout</p>
        <ul className="mt-2 space-y-1 text-[11px] leading-5 text-[#c5cfe8]" role="list">
          {publicSteps.map((step) => (
            <li key={step} role="listitem">
              • {step}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
          Featured Products
        </p>
        <ul className="mt-2 space-y-1" role="list">
          {featuredProducts.map((product) => (
            <li
              key={product.name}
              className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 border-b border-white/5 py-1.5 text-[11px] last:border-0"
              role="listitem"
            >
              <span className="font-semibold text-[#f7efe0]">{product.name}</span>
              <span className="text-[#8fa3bf]">
                {product.price} ({product.hub})
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#f5c842]/25 bg-[#120f06]/70 px-3 py-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
          Internal fee model (hide from public)
        </p>
        <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
          {internalFeeNotes.map((note) => (
            <li key={note} role="listitem">
              • {note}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#8fa3bf]">Notes</p>
        <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
          {notes.map((note) => (
            <li key={note} role="listitem">
              • {note}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/rooms/ecuador-room#ecuador-dropshipping"
        className="inline-flex rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#f5c842] transition hover:bg-[#f5c842]/20"
      >
        Open public Ecuador Dropship →
      </Link>
    </div>
  );
}
