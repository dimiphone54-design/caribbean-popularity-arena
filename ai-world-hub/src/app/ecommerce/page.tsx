import Link from "next/link";
import { ecommerceTools, affiliatePrograms, freelanceServices, promptMarketplace } from "../../lib/site-data";

export default function EcommercePage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">E-commerce & Dropshipping</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">AI-powered business hub</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Use AI to create products, write descriptions, design marketing content, and manage your store.
          </p>
        </div>

        {/* AI Store Tools */}
        <section className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">AI store tools</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {ecommerceTools.map((tool) => (
              <article key={tool.category} className="interactive-panel-card rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
                  <h2 className="text-lg font-semibold text-white">{tool.category}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">{tool.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tool.tools.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Affiliate Programs */}
        <section className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-300">Affiliate programs</p>
          <p className="mt-2 text-sm text-white/60">Share referral links and earn commissions when someone signs up.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {affiliatePrograms.map((prog) => (
              <article key={prog.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-white">{prog.name}</p>
                <p className="mt-1 text-lg font-bold text-emerald-300">{prog.commission}</p>
                <p className="mt-1 text-[11px] text-white/50">Cookie: {prog.cookie}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Freelance Services */}
        <section className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Freelance services you can offer</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {freelanceServices.map((svc) => (
              <article key={svc.service} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="text-2xl" aria-hidden="true">{svc.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{svc.service}</p>
                  <p className="text-[11px] text-emerald-300/80">{svc.price}</p>
                  <p className="text-[10px] text-white/45">{svc.difficulty}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Prompt Marketplace */}
        <section className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-300">AI prompt marketplace</p>
          <p className="mt-2 text-sm text-white/60">Sell prompt packs, templates, workflows, and business automation setups.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promptMarketplace.map((cat) => (
              <article key={cat.category} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">{cat.icon}</span>
                  <h3 className="text-sm font-semibold text-white">{cat.category}</h3>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="text-xs text-white/60">• {ex}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
