import Link from "next/link";
import { aiJobs } from "../../lib/site-data";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">AI jobs</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Global AI jobs and hiring</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            A real jobs section for AI builders, consultants, prompt engineers, and automation specialists across the world.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {aiJobs.map((job) => (
            <article key={job.title} className="interactive-panel-card rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{job.title}</h2>
                <span className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-200">{job.type}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-fuchsia-300">{job.location}</p>
              <p className="mt-2 text-sm font-semibold text-white/82">{job.pay}</p>
              <p className="mt-4 text-sm leading-7 text-white/70">{job.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
