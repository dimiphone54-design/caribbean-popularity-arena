const layers = [
  {
    name: "SAFE",
    tagline: "Just flyover",
    price: "$8K/mo",
    summary: "A quiet overhead presence for clients who want visual assurance, route coverage, and an emergency-ready signal without active intervention.",
    details: [
      "Silent aerial position over your route",
      "8K recording and passive watch mode",
      "Client-controlled SOS only",
      "No human team included",
    ],
  },
  {
    name: "BLAZE",
    tagline: "AI + human watch + strike authority",
    price: "$28K/mo",
    summary: "A monitored overwatch layer combining automated detection with human confirmation and immediate escalation under pre-signed rules of engagement.",
    details: [
      "24/7 AI + command-center review",
      "Priority detection and rapid action chain",
      "Client pre-authorization rules at checkout",
      "No ground crew included by default",
    ],
  },
  {
    name: "SIGNAL",
    tagline: "Call your people",
    price: "$12K/mo add-on",
    summary: "When a serious event is confirmed, your designated contacts, family office, driver team, or selected police channel receive route and incident data.",
    details: [
      "Auto-ping trusted contacts",
      "Optional nearest police alert workflow",
      "GPS + live incident share",
      "Runs on top of SAFE or BLAZE",
    ],
  },
  {
    name: "WOLF CREW",
    tagline: "SUV on standby",
    price: "$45K/mo add-on",
    summary: "A physical response layer for high-risk cities where a nearby mobile team is kept on standby while the aerial platform maintains eyes overhead.",
    details: [
      "2-person standby vehicle team",
      "Live feed coordination",
      "Rapid arrival support layer",
      "Overwatch remains active until clear",
    ],
  },
];

const checkoutOptions = [
  {
    title: "SAFE",
    price: "$8K",
    text: "Baseline overhead watch and route coverage.",
  },
  {
    title: "BLAZE",
    price: "+$20K",
    text: "AI + human command review with pre-authorized response logic.",
  },
  {
    title: "SIGNAL",
    price: "+$4K",
    text: "Notify your people or selected authorities with live incident data.",
  },
  {
    title: "WOLF CREW",
    price: "+$45K",
    text: "Ground team standby support for high-threat environments.",
  },
];

const legalNotes = [
  "Rules of engagement must be signed before activation.",
  "Higher response tiers require documented legal authorization where applicable.",
  "Every intervention path must generate an audit trail and review record.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06070d] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d2a5f_0%,rgba(6,7,13,0.96)_45%,#06070d_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.42em] text-cyan-300">PULSAR ONE</p>
            <h1 className="mt-4 max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              Sky Overwatch + Strike Authority
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              A premium protective-overwatch app concept built around layered aerial coverage, monitored response logic,
              and fast checkout selection for clients who want visible control over their protection stack.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#checkout" className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Open checkout flow
              </a>
              <a href="#layers" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View 4 layers
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="layers" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">4 layers 2070</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Choose the exact protection stack your client wants.</h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {layers.map((layer) => (
            <article key={layer.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/25 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">{layer.tagline}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">{layer.name}</h3>
                </div>
                <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
                  {layer.price}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">{layer.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/84">
                {layer.details.map((detail) => (
                  <li key={detail} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="checkout" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">App checkout flow</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">A 10-second stack picker for high-end protective coverage.</h2>
              <p className="mt-5 text-sm leading-7 text-white/68">
                The client can pick a base layer, add command review, add notification paths, and add a standby team where city conditions justify it.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Protection checkout</p>
              <div className="mt-5 space-y-4">
                {checkoutOptions.map((option) => (
                  <label key={option.title} className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.06]">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-cyan-300" />
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-lg font-semibold text-white">{option.title}</p>
                        <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold text-fuchsia-200">{option.price}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/68">{option.text}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/8 p-4 text-sm text-cyan-100/88">
                <p className="font-semibold text-cyan-200">Pre-authorization wall</p>
                <p className="mt-2 leading-6">Response layers must follow signed rules, legal approvals, and jurisdiction-specific compliance. The app should not skip authorization, documentation, or review.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Legal + operational notes</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Premium security UX still needs strong rules, logs, and review.</h2>
          </div>

          <div className="grid gap-4">
            {legalNotes.map((note, index) => (
              <article key={note} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-white/72">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
