import Link from "next/link";
import { healthcareCategories } from "../../lib/site-data";

export default function HealthcarePage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-300">Healthcare</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">AI for medical professionals</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Search medical research AI, writing AI, imaging AI, drug interaction assistants, patient note assistants, and medical translators.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/5 p-4">
          <p className="text-xs font-semibold text-amber-200">
            ⚠️ Medical Disclaimer: These tools assist professionals and are not a replacement for licensed medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {healthcareCategories.map((cat) => (
            <article key={cat.label} className="rounded-3xl border border-emerald-300/15 bg-[linear-gradient(135deg,rgba(6,18,28,0.98),rgba(8,32,30,0.94))] p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                <h2 className="text-lg font-semibold text-white">{cat.label}</h2>
              </div>
              <div className="mt-4 space-y-1.5">
                {cat.tools.map((tool, i) => (
                  <div key={tool} className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-[10px] font-bold text-emerald-200">{i + 1}</span>
                    <span className="text-sm text-white/85">{tool}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
