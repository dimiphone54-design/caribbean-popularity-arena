import Link from "next/link";
import { countryHubs } from "../../lib/site-data";

export default function CountryHubsPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Country hubs</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Global AI country hubs</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Explore real regional strengths, AI service jobs, and position AI WORLD HUB as a bridge between countries, talent, and business demand.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {countryHubs.map((hub) => (
            <article key={hub.name} className="interactive-panel-card rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white/80">{hub.flag} {hub.name}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{hub.tag}</h2>
                </div>
                <span className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  Hub
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">{hub.description}</p>

              {hub.jobs && hub.jobs.length > 0 && (
                <div className="mt-5 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">AI service jobs</p>
                  {hub.jobs.map((job) => (
                    <div key={job.title} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white">{job.title}</p>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/55">{job.type}</span>
                      </div>
                      <p className="mt-1 text-[11px] font-semibold text-emerald-300/80">{job.pay}</p>
                      <p className="mt-1 text-xs leading-5 text-white/60">{job.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
