import Link from "next/link";
import { professionRankings, allCareers } from "../../lib/site-data";

export default function ProfessionsPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Professions</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Top AI by profession</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Click your profession to see the best AI tools for that line of work.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {professionRankings.map((item) =>
            item.role === "Doctor" ? (
              <article key={item.role} className="doctor-panel rounded-3xl border border-emerald-300/20 bg-[linear-gradient(135deg,rgba(6,18,28,0.98),rgba(8,32,30,0.94))] p-6 shadow-2xl shadow-emerald-500/10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">Profession rankings</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">👨‍⚕️ Doctor</h2>
                <p className="mt-3 text-sm leading-7 text-emerald-100/75">Clinical workflow, patient communication, research support, and private note drafting.</p>
                <div className="mt-5 space-y-3 text-sm text-white/86">
                  {item.tools.map((tool, index) => (
                    <div key={tool} className="doctor-panel-row rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-sm font-bold text-emerald-200">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-white">{tool}</p>
                            <p className="text-xs text-white/55">Doctor workflow ranking</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/65">Clinical use</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ) : item.role === "Nurse" ? (
              <article key={item.role} className="nurse-panel rounded-3xl border border-sky-300/20 bg-[linear-gradient(135deg,rgba(6,15,30,0.98),rgba(8,25,35,0.94))] p-6 shadow-2xl shadow-sky-500/10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">Profession rankings</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">👩‍⚕️ Nurse</h2>
                <p className="mt-3 text-sm leading-7 text-sky-100/75">Shift scheduling, patient handoff notes, medication tracking, care plans, and documentation.</p>
                <div className="mt-5 space-y-3 text-sm text-white/86">
                  {item.tools.map((tool, index) => (
                    <div key={tool} className="nurse-panel-row rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-sm font-bold text-sky-200">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-white">{tool}</p>
                            <p className="text-xs text-white/55">Nurse workflow ranking</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/65">Care use</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ) : (
              <article key={item.role} className="interactive-panel-card rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">{item.title}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{item.emoji} {item.role}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.summary}</p>
                <ol className="mt-5 space-y-2 text-sm text-white/86">
                  {item.tools.map((tool, index) => (
                    <li key={tool} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      {index + 1}. {tool}
                    </li>
                  ))}
                </ol>
              </article>
            )
          )}
        </div>

        {/* All Careers Grid */}
        <section className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">All careers</p>
          <p className="mt-2 text-sm text-white/60">Click your profession to see the best AI tools for your work.</p>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {allCareers.map((career, index) => (
              <span key={`${career.role}-${index}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-center text-xs font-medium text-white/60">
                <span aria-hidden="true">{career.emoji}</span>
                {career.role}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
