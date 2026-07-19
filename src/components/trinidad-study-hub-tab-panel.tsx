"use client";

const TEACHERS = [
  {
    name: "Dr. Marva Clarke",
    title: "Professor of Sociology · UWI St. Augustine",
    subject: "Race, Identity & Post-Colonial Caribbean Society",
    status: "Live Now",
    students: 47,
    emoji: "📚"
  },
  {
    name: "Prof. Andre Thomas",
    title: "Musicology & Steelpan Studies · UWI Music Dept",
    subject: "From Tin Pans to Orchestras — The Steelpan Journey",
    status: "Next at 7pm",
    students: 0,
    emoji: "🥁"
  },
  {
    name: "Ms. Camille Dubois",
    title: "Trinidad French Creole Preservation Society",
    subject: "Saving Patois — Paramin, Blanchisseuse & Beyond",
    status: "Wed 6pm",
    students: 0,
    emoji: "🗣️"
  },
  {
    name: "Dr. Rawle Gibbons",
    title: "Political Science · UWI",
    subject: "Eric Williams & The Birth of a Nation",
    status: "Thu 8pm",
    students: 0,
    emoji: "🏛️"
  },
  {
    name: "Chef Dario Baptiste",
    title: "Culinary Arts · Trinidad Institute of Technology",
    subject: "Callaloo from Scratch — Grandmother's Secrets",
    status: "Fri 5pm",
    students: 0,
    emoji: "👨‍🍳"
  },
  {
    name: "Prof. Lorraine Neptune",
    title: "Oral Tradition & Literature · UWI",
    subject: "Calypso as Literature — Reading Sparrow's Lyrics",
    status: "Sat 3pm",
    students: 0,
    emoji: "🎤"
  }
];

export function TrinidadStudyHubTabPanel() {
  return (
    <div className="trinidad-study-hub-tab-panel space-y-3">
      <section className="overflow-hidden rounded-[1.25rem] border border-[#22d3ee]/20 bg-gradient-to-br from-[#041420]/80 to-[#020a10]/80 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#22d3ee]/70">
              📚 Study Hub · Trinidad &amp; Tobago
            </p>
            <h3 className="mt-1 font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-[#22d3ee]">
              Learn · Teach · Go Live
            </h3>
            <p className="mt-1 max-w-md text-xs text-white/50">
              Professors from UWI, language specialists, chefs, and musicians go live and teach anyone. Ask questions, exchange knowledge, build together.
            </p>
          </div>
          <span className="text-3xl">🎓</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/5 px-3 py-1 text-[10px] font-semibold text-[#22d3ee]/70">
            🔴 Live Now
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/5 px-3 py-1 text-[10px] font-semibold text-[#22d3ee]/70">
            🎓 Professors Welcome
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/5 px-3 py-1 text-[10px] font-semibold text-[#22d3ee]/70">
            💬 Exchange Knowledge
          </span>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {TEACHERS.map((teacher) => (
          <section
            key={teacher.name}
            className={`rounded-xl border bg-black/30 p-4 ${
              teacher.status === "Live Now"
                ? "border-green-500/30 ring-1 ring-green-500/10"
                : "border-[#22d3ee]/15"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#22d3ee]/50">
                  {teacher.emoji} {teacher.title}
                </p>
                <h4 className="mt-1 text-sm font-black text-white">{teacher.name}</h4>
              </div>
              {teacher.status === "Live Now" ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1 text-[10px] font-bold text-green-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  LIVE · {teacher.students}
                </span>
              ) : (
                <span className="inline-flex shrink-0 rounded-full border border-[#22d3ee]/20 px-2.5 py-1 text-[10px] font-semibold text-[#22d3ee]/60">
                  {teacher.status}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs leading-5 text-white/40">{teacher.subject}</p>
            {teacher.status === "Live Now" && (
              <button
                type="button"
                className="mt-3 w-full rounded-lg border border-green-500/30 bg-green-500/10 py-2 text-[10px] font-bold uppercase tracking-wider text-green-400 transition hover:bg-green-500/20"
              >
                Join Live Session
              </button>
            )}
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-[#22d3ee]/15 bg-black/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#22d3ee]/50">🏫 Open Campus</p>
            <h4 className="mt-1 text-sm font-black text-white">Go Live &amp; Teach</h4>
          </div>
        </div>
        <p className="mt-2 text-xs text-white/40">
          UWI professors, Creole language keepers, steelpan masters, chefs — anyone with knowledge can go live and teach the world. Ask questions in real-time, exchange notes, build the community.
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-[#22d3ee]/30 bg-[#22d3ee]/10 py-2.5 text-xs font-bold uppercase tracking-wider text-[#22d3ee] transition hover:bg-[#22d3ee]/20"
        >
          Start a Live Session
        </button>
      </section>
    </div>
  );
}
