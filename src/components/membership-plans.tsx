import Link from "next/link";
import { Check } from "lucide-react";
import { ArenaPlusIceFrostOverlay } from "@/components/arena-plus-ice-frost-overlay";
import { EldersTableGiftCta } from "@/components/elders-table-gift-cta";
import { EldersTableLockPanel } from "@/components/elders-table-lock-panel";
import { arenaGiftCopy, arenaGiftLegalCopy } from "@/lib/arena-gifts";
import { membershipPlans } from "@/lib/data";
import { eldersTableGiftLegal } from "@/lib/elders-table-gift-legal";

export function MembershipPlans() {
  return (
    <section id="plans" className="w-full py-20">
      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-section-eyebrow">Digital room access</p>
          <h2 className="luxury-section-title mt-3 text-4xl sm:text-5xl">
            Exclusive rooms. Platform privilege.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--luxury-mist)]">
            {eldersTableGiftLegal.sectionIntro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <article
              key={plan.name}
              className={`luxury-glass-card p-6 ${
                plan.highlighted ? "ring-1 ring-[var(--luxury-gold)]/40" : ""
              }${plan.name === "Arena Plus" ? " luxury-plan-arena-plus luxury-plan-coming-soon luxury-plan-coming-soon-static" : ""}`}
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

              <h3 className={`relative z-[1] font-luxury-serif text-2xl text-[var(--luxury-champagne)]${plan.highlighted ? " mt-5" : " mt-6"}`}>
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

              {plan.legalNote ? (
                <p className="relative z-[1] mt-4 text-[11px] leading-5 text-[var(--luxury-mist)]">
                  {plan.legalNote}{" "}
                  <Link href="/legal/refunds" className="text-[var(--luxury-champagne)] underline underline-offset-2">
                    Refund Policy
                  </Link>
                  {" · "}
                  <Link href="/legal/terms" className="text-[var(--luxury-champagne)] underline underline-offset-2">
                    Terms
                  </Link>
                </p>
              ) : null}

              {plan.comingSoon ? (
                <span className="relative z-[1] mt-8 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-[var(--luxury-mist)]/20 bg-black/25 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--luxury-mist)]">
                  Coming Soon
                </span>
              ) : plan.highlighted ? (
                <EldersTableGiftCta />
              ) : (
                <a
                  href={plan.href ?? "#vote"}
                  className="relative z-[1] mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition luxury-gold-outline"
                >
                  {plan.href ? `${arenaGiftCopy.sendGift} · ${plan.name}` : `Join ${plan.name}`}
                </a>
              )}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-[var(--luxury-mist)]">
          {arenaGiftLegalCopy.digitalServicesOnly} {arenaGiftLegalCopy.refundPolicyRef}
        </p>
      </div>
    </section>
  );
}
