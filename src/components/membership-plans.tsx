import { Check, Gem, Zap } from "lucide-react";
import { membershipPlans } from "@/lib/data";

export function MembershipPlans() {
  return (
    <section id="plans" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-rose-200">
            Membership plans
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Give fans more ways to rally.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Plans are designed for casual voters, super fans, and creators who
            need more analytics and placement tools as the arena grows.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-[2rem] border p-6 shadow-xl shadow-black/10 ${
                plan.highlighted
                  ? "border-amber-200 bg-amber-200/15"
                  : "border-white/10 bg-white/[0.07]"
              }`}
            >
              {plan.highlighted ? (
                <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-950">
                  <Zap className="size-3.5 fill-current" aria-hidden="true" />
                  Popular
                </div>
              ) : null}

              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-amber-200">
                <Gem className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-black text-white">{plan.name}</h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-300">
                {plan.description}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                <span className="pb-2 text-sm font-bold text-slate-300">/{plan.cadence}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-300 text-slate-950">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#vote"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "bg-amber-300 text-slate-950"
                    : "bg-white text-slate-950 hover:bg-cyan-100"
                }`}
              >
                Choose {plan.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
