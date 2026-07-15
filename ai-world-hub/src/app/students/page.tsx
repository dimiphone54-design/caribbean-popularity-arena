import Link from "next/link";
import { studentSubjects } from "../../lib/site-data";

export default function StudentsPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="back-to-main-link">← Back to the main</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">University Students</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Find the best AI for every subject</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Each subject shows the top 10 AI tools, whether they&apos;re free or paid, difficulty level, best prompts, and video tutorials.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {studentSubjects.map((subject) => (
            <article key={subject.subject} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{subject.emoji}</span>
                <div>
                  <h2 className="text-xl font-semibold text-white">{subject.subject}</h2>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-200">{subject.freePaid}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{subject.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">Top 10 AI</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {subject.topAI.map((tool, i) => (
                    <span key={tool} className="flex items-center gap-1 rounded-lg border border-white/8 bg-black/20 px-2 py-1 text-[11px] text-white/80">
                      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-cyan-200">{i + 1}</span>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-300">Best prompts</p>
                <p className="mt-1.5 text-xs leading-5 text-white/70">{subject.bestPrompts}</p>
              </div>

              <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300">Video tutorials</p>
                <p className="mt-1.5 text-xs leading-5 text-white/70">{subject.videoTutorials}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
