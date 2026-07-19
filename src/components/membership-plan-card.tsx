"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { ArenaPlusIceFrostOverlay } from "@/components/arena-plus-ice-frost-overlay";
import { EldersTableLockPanel } from "@/components/elders-table-lock-panel";
import { PayPalCheckoutButton } from "@/components/paypal-checkout-button";
import { isRealMoneyEnabled } from "@/lib/real-money";

type Plan = {
  name: string;
  price: string;
  cadence: string;
  highlighted?: boolean;
  comingSoon?: boolean;
  href?: string;
  description: string;
  features: string[];
  priceUsd?: string;
  planId?: string;
};

const PLAN_MAP: Record<string, { priceUsd: string; planId: string }> = {
  "Arena Plus": { priceUsd: "9.99", planId: "arena-plus" },
  "Creator Circle": { priceUsd: "14.99", planId: "creator-circle" },
};

export function MembershipPlanCard({ plan }: { plan: Plan }) {
  const [paid, setPaid] = useState(false);
  const payConfig = PLAN_MAP[plan.name];

  return (
    <article
      className={`luxury-glass-card p-6 ${
        plan.highlighted ? "ring-1 ring-[var(--luxury-gold)]/40" : ""
      }${plan.name === "Arena Plus" ? " luxury-plan-arena-plus" : ""}`}
    >
      {plan.comingSoon ? (
        <>
          <span className="luxury-plan-frost-glass" aria-hidden="true">
            <span className="luxury-plan-frost-rim" aria-hidden="true" />
            <span className="luxury-plan-frost-crystals" aria-hidden="true" />
            <span className="luxury-plan-frost-sheen" aria-hidden="true" />
            <span className="luxury-plan-frost-darken" aria-hidden="true" />
            <ArenaPlusIceFrostOverlay />
          </span>
          <div className="absolute right-6 top-6 z-[8] inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--luxury-champagne)] backdrop-blur-md">
            Coming Soon
          </div>
        </>
      ) : null}
      {plan.highlighted ? <EldersTableLockPanel /> : null}

      <h3
        className={`relative z-[1] font-luxury-serif text-2xl text-[var(--luxury-champagne)]${plan.highlighted ? " mt-5" : " mt-6"}`}
      >
        {plan.name}
      </h3>
      <p
        className={`relative z-[1] mt-3 min-h-14 text-sm leading-6 ${
          plan.name === "Arena Plus" || plan.name === "The Elders Table"
            ? "luxury-plan-gold-glow"
            : "text-[var(--luxury-mist)]"
        }`}
      >
        {plan.description}
      </p>

      <div className="relative z-[1] mt-6 flex items-end gap-2">
        <span className="font-luxury-serif text-5xl text-[var(--luxury-champagne)]">{plan.price}</span>
        <span className="pb-2 text-sm font-semibold text-[var(--luxury-mist)]">/{plan.cadence}</span>
      </div>

      <ul className="relative z-[1] mt-8 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-[var(--luxury-ivory)]">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--luxury-gold)]/25 text-[var(--luxury-gold-bright)]">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative z-[1] mt-8">
        {paid ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-green-400">Payment complete!</p>
            {plan.href && (
              <Link
                href={plan.href}
                className="inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition luxury-gold-outline"
              >
                Enter {plan.name}
              </Link>
            )}
          </div>
        ) : plan.comingSoon ? (
          <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-[var(--luxury-mist)]/20 bg-black/25 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--luxury-mist)]">
            Coming Soon
          </span>
        ) : payConfig && isRealMoneyEnabled() ? (
          <PayPalCheckoutButton
            plan={payConfig.planId}
            amountUsd={payConfig.priceUsd}
            label={`Pay $${payConfig.priceUsd} — ${plan.name}`}
            onSuccess={() => setPaid(true)}
          />
        ) : payConfig ? (
          <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-[var(--luxury-mist)]/20 bg-black/25 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--luxury-mist)]">
            Payments frozen
          </span>
        ) : (
          <Link
            href={plan.href ?? "#vote"}
            className="inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition luxury-gold-outline"
          >
            {plan.href ? `Enter ${plan.name}` : `Join ${plan.name}`}
          </Link>
        )}
      </div>
    </article>
  );
}
