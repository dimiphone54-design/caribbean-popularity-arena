import Link from "next/link";
import { PayPalCheckoutButton } from "@/components/paypal-checkout-button";
import { revenueIdeas } from "../../lib/site-data";

export default function MoneyPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Money</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">How AI WORLD HUB makes money</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            A real monetization page for platform fees, subscriptions, affiliate revenue, premium profiles, hiring, and education.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {revenueIdeas.map((idea) => (
            <article key={idea.title} className="interactive-panel-card rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-300">{idea.money}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{idea.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{idea.text}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-cyan-300/15 bg-white/[0.04] p-6 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">PayPal checkout</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">AI WORLD HUB Pro access</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            This reuses the Caribbean Freedom Arena PayPal integration pattern. To go fully live, add your real PayPal environment variables to this project.
          </p>
          <div className="mt-6 max-w-md">
            <PayPalCheckoutButton
              plan="AI WORLD HUB Pro Access"
              amountUsd="29.00"
              label="Pay $29.00 · AI WORLD HUB Pro"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
