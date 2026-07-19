"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  getAllDirectDropshipInternalLanes,
  getDirectDropshipBlankTemplate,
  getDropshipCountryRoomHref,
  type DirectDropshipLaneInternal
} from "@/lib/dropship-lane-template";

function LaneDetail({ lane }: { lane: DirectDropshipLaneInternal }) {
  return (
    <div className="space-y-3 border-t border-white/10 pt-3">
      <dl className="grid gap-1.5 sm:grid-cols-2">
        {[
          { label: "Lane Type", value: lane.laneType },
          { label: "Fee", value: lane.fee },
          { label: "Payment", value: lane.payment },
          { label: "Fulfillment", value: lane.fulfillment },
          { label: "Delivery", value: lane.delivery }
        ].map((row) => (
          <div key={row.label} className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-2">
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
        <p className="mt-2 text-[13px] font-black text-[#fff7df]">{lane.publicTitle}</p>
        <p className="mt-0.5 text-[11px] text-[#d7e3f6]">{lane.publicSubtitle}</p>
        <ul className="mt-2 space-y-1 text-[11px] leading-5 text-[#c5cfe8]" role="list">
          {lane.publicSteps.map((step) => (
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
        {lane.featuredProducts.length === 0 ? (
          <p className="mt-1.5 text-[11px] text-[#8fa3bf]">No SKUs yet — add 3–5 products.</p>
        ) : (
          <ul className="mt-2 space-y-1" role="list">
            {lane.featuredProducts.map((product) => (
              <li
                key={product.name}
                className="border-b border-white/5 py-1.5 text-[11px] last:border-0"
                role="listitem"
              >
                <span className="font-semibold text-[#f7efe0]">{product.name}</span>
                <span className="text-[#8fa3bf]">
                  {" "}
                  — {product.priceLabel} ({product.hub})
                </span>
                <p className="text-[10px] text-[#8fa3bf]">{product.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-[#f5c842]/25 bg-[#120f06]/70 px-3 py-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
          Internal fee model (hide from public · all countries)
        </p>
        <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
          <li role="listitem">• Platform keeps 15% service fee on every paid dropship order</li>
          <li role="listitem">• Never show “Platform takes 15%” on room / market / order UI</li>
          <li role="listitem">• Public: browse · pay · supplier ships · track only</li>
        </ul>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#8fa3bf]">Notes</p>
        <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
          {lane.notes.map((note) => (
            <li key={note} role="listitem">
              • {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** Owner · Direct Dropship template + every country lane */
export function CommandCenterDropshipLanes() {
  const lanes = useMemo(() => getAllDirectDropshipInternalLanes(), []);
  const blank = useMemo(() => getDirectDropshipBlankTemplate(), []);
  const [activeId, setActiveId] = useState(lanes[0]?.countryId ?? "ecuador");
  const active = lanes.find((l) => l.countryId === activeId) ?? lanes[0];

  return (
    <div className="space-y-4 text-left" aria-label="Command Center Direct Dropship Lanes">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f5c842]">
          COMMAND CENTER · Direct Dropship Lanes
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#8fa3bf]">
          Internal · one template for every country
        </p>
      </div>

      <details className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
        <summary className="cursor-pointer text-[10px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          Blank template (copy for new countries)
        </summary>
        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap text-[10px] leading-4 text-[#c5cfe8]">
          {blank}
        </pre>
      </details>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Country lanes">
        {lanes.map((lane) => (
          <button
            key={lane.countryId}
            type="button"
            role="tab"
            aria-selected={lane.countryId === active?.countryId}
            onClick={() => setActiveId(lane.countryId)}
            className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] transition ${
              lane.countryId === active?.countryId
                ? "border-[#f5c842]/50 bg-[#f5c842]/15 text-[#f5c842]"
                : "border-white/15 bg-white/5 text-[#8fa3bf] hover:border-white/30"
            }`}
          >
            {lane.flag} {lane.countryName}
          </button>
        ))}
      </div>

      {active ? (
        <>
          <p className="text-[12px] font-black text-[#fff7df]">
            {active.flag} {active.countryName} Direct Dropship Lane (Internal)
          </p>
          <LaneDetail lane={active} />
          <Link
            href={getDropshipCountryRoomHref(active.countryId)}
            className="inline-flex rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#f5c842] transition hover:bg-[#f5c842]/20"
          >
            Open {active.countryName} room →
          </Link>
        </>
      ) : null}
    </div>
  );
}
