import Link from "next/link";
import { AiAssistant } from "@/components/ai-assistant";
import { professionRankings } from "@/lib/site-data";

const moreRoles = [
  "Farmer",
  "Lawyer",
  "Engineer",
  "Construction",
  "Electrician",
  "Mechanic",
  "Pilot",
  "Teacher",
  "Nurse",
  "Dentist",
  "Artist",
  "Musician",
  "Scientist",
  "Police",
  "Firefighter",
  "Accountant",
  "Real Estate",
  "Restaurant Owner",
  "Hotel Owner",
  "Tour Guide",
  "...hundreds more",
];

const regions = [
  {
    flag: "🇫🇷",
    name: "France",
    tag: "Open-Source & Large Models",
    description:
      "Mistral-style open model builders, multilingual fine-tuning, and private local deployments for European teams.",
    specialties: ["Open-source LLMs", "Model tuning", "EU multilingual AI"],
  },
  {
    flag: "🇮🇱",
    name: "Israel",
    tag: "Deep Tech & AI Security",
    description:
      "Specialists in computer vision, AI-native SaaS, cybersecurity copilots, and high-precision enterprise integrations.",
    specialties: ["Computer vision", "AI security", "B2B SaaS AI"],
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    tag: "Enterprise Strategy & AI Safety",
    description:
      "Research-led AI services for fintech, compliance, medical workflows, and responsible deployment.",
    specialties: ["Fintech AI", "AI safety", "Healthcare workflows"],
  },
  {
    flag: "🇪🇬",
    name: "Egypt",
    tag: "No-Code Automations & Chatbots",
    description:
      "Fast-moving automation builders creating affordable operational systems, AI chat support, and workflow pipelines.",
    specialties: ["n8n flows", "Business automation", "Support chatbots"],
  },
  {
    flag: "🇨🇳",
    name: "China",
    tag: "Creative Media & Mass Automation",
    description:
      "High-scale AI video, e-commerce automations, social commerce systems, and hardware-connected experiences.",
    specialties: ["AI video", "E-commerce automation", "Smart hardware AI"],
  },
  {
    flag: "🇯🇵",
    name: "Japan",
    tag: "Robotics & Agentic Workflows",
    description:
      "Structured multi-agent systems, robotics workflows, gaming AI logic, and operational precision tooling.",
    specialties: ["Robotics", "Agent systems", "Gaming AI"],
  },
  {
    flag: "🇨🇭",
    name: "Switzerland",
    tag: "Data Privacy & FinTech AI",
    description:
      "Secure RAG systems, private hosting strategies, medical-grade data handling, and precision finance tooling.",
    specialties: ["Private RAG", "Secure hosting", "Financial AI"],
  },
];

const services = [
  {
    title: "AI Project Brief Generator",
    category: "Client Launchpad",
    price: "From $49",
    summary:
      "Turn a rough idea into a structured technical brief that AI builders can quote and deliver against.",
  },
  {
    title: "Prompt-as-a-Service Packs",
    category: "Creator Marketplace",
    price: "From $29",
    summary:
      "Production-tested prompts, system instructions, and model settings packaged for repeat business use.",
  },
  {
    title: "No-Code Automation Blueprints",
    category: "AI Automation",
    price: "From $95",
    summary:
      "Ready-to-customize flows for CRMs, lead intake, customer support, and email automation.",
  },
  {
    title: "AI Audit & Optimization",
    category: "Performance",
    price: "From $199",
    summary:
      "Reduce token costs, improve latency, and clean up weak prompts or over-engineered AI pipelines.",
  },
];

const projects = [
  {
    name: "Custom AI Agent",
    target: "For founders and brands",
    text: "Hire a builder to create a branded assistant, support bot, or internal workflow agent.",
  },
  {
    name: "Marketplace Services",
    target: "For AI experts",
    text: "List your skills, demos, and fixed-price offers so clients can hire you directly.",
  },
  {
    name: "Regional AI Hubs",
    target: "For global discovery",
    text: "Explore country-based strengths and match clients to the best regional AI talent.",
  },
];

const backgroundSignals = [
  "LIVE · London · UK AI Safety",
  "LIVE · Tokyo · Robotics",
  "LIVE · Tel Aviv · AI Security",
  "LIVE · Cairo · Automation",
  "LIVE · Paris · Open Models",
  "LIVE · Zurich · Private Data",
  "Doctor · Real workflow",
  "Engineer · Real workflow",
  "Teacher · Real workflow",
  "Lawyer · Real workflow",
  "Builder match · active",
  "Global region signals · online",
];

const revenueIdeas = [
  {
    title: "AI by profession rankings",
    money: "Affiliate revenue · sponsored placements · premium rankings",
    text: "Turn profession pages into monetized recommendation engines for doctors, lawyers, builders, teachers, creators, and business owners.",
  },
  {
    title: "Global AI marketplace",
    money: "Platform fees · paid listings · premium seller accounts",
    text: "Let AI builders sell prompt packs, automations, chatbot setups, custom agents, and full project services across borders.",
  },
  {
    title: "AI jobs and hiring",
    money: "Paid job posts · recruiter access · boosted profiles",
    text: "Connect companies looking for AI talent with builders, consultants, automation experts, and prompt engineers worldwide.",
  },
  {
    title: "AI academy and memberships",
    money: "Courses · certificates · subscriptions · workshops",
    text: "Teach people how to use AI in the real world with job-specific learning tracks and premium community access.",
  },
];

const connectionIdeas = [
  "Country AI hubs that spotlight regional strengths",
  "World map of AI talent, jobs, and services",
  "Cross-border buyer and seller matching",
  "Project brief generator for non-technical clients",
  "Global business subscriptions for ongoing AI support",
  "Live trends, rankings, and AI news by profession",
];

const businessPhases = [
  {
    phase: "Phase 1",
    title: "Rankings + affiliate engine",
    text: "Launch profession pages, AI tool comparisons, email capture, and affiliate revenue flows.",
  },
  {
    phase: "Phase 2",
    title: "Marketplace + paid profiles",
    text: "Open seller listings, buyer project briefs, premium visibility, and platform transaction fees.",
  },
  {
    phase: "Phase 3",
    title: "Country hubs + academy + subscriptions",
    text: "Expand into regional AI ecosystems, global memberships, business services, and education.",
  },
];

export default function Home() {
  return (
    <main id="main-top" className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#23326d_0%,rgba(5,8,22,0.96)_48%,#050816_100%)]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="hero-real-life-grid" aria-hidden="true">
          {backgroundSignals.map((signal, index) => (
            <span key={signal} className={`hero-real-life-chip hero-real-life-chip-${(index % 4) + 1}`}>
              {signal}
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="ai-world-hub-brand-bar flex items-center justify-between gap-4 rounded-[1.75rem] border border-white/70 bg-white px-5 py-4 backdrop-blur-xl">
            <div className="ai-world-hub-brand-orb" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-700">GLOBAL AI PLATFORM</p>
              <h1 className="ai-world-hub-title mt-2 text-3xl font-black uppercase tracking-[0.16em] text-slate-950 sm:text-5xl lg:text-6xl">
                AI WORLD HUB
              </h1>
              <p className="ai-world-hub-subtitle mt-3 max-w-3xl text-sm font-medium tracking-[0.18em] text-slate-700 sm:text-base lg:text-lg">
                The global AI ranking and services universe
              </p>
            </div>
            <div className="ai-and-latest-panel hidden md:block">
              <div className="ai-and-latest-scan" aria-hidden="true" />
              <div className="ai-and-latest-grid-line" aria-hidden="true" />
              <p className="ai-and-latest-label">AI And latest</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-white/85">
                <a href="/professions" className="ai-and-latest-pill">Top AI by profession</a>
                <a href="/healthcare" className="ai-and-latest-pill">Healthcare</a>
                <a href="/students" className="ai-and-latest-pill">Students</a>
                <a href="/ecommerce" className="ai-and-latest-pill">E-commerce</a>
                <a href="/country-hubs" className="ai-and-latest-pill">Regional Hubs</a>
                <a href="/money" className="ai-and-latest-pill">Make Money</a>
              </div>
            </div>
          </div>

          <div className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                The main header
              </p>
              <h2 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
                Top AI tools ranked by profession, industry, and real-world work.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                AI WORLD HUB helps people discover which AI tools fit their exact job — from doctors and programmers to chefs,
                teachers, engineers, lawyers, and hundreds more.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {moreRoles.map((role) => (
                  <span key={role} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-white/60">
                    {role}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/professions"
                  className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  View rankings
                </a>
                <a
                  href="/country-hubs"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Search regions
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["100+", "career categories coming"],
                  ["7", "global AI regional hubs"],
                  ["24/7", "AI discovery worldwide"],
                ].map(([value, label]) => (
                  <a href="#main-top" key={label} className="interactive-stat-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-sm text-white/65">{label}</p>
                  </a>
                ))}
              </div>
            </div>

            <div id="rankings" className="rounded-[2rem] border border-cyan-300/20 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-500/10 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Profession rankings</p>
              <div className="mt-4 space-y-3">
                {professionRankings.map((ranking) => {
                  const accent = ranking.role === "Doctor" ? "emerald" : ranking.role === "Nurse" ? "sky" : "cyan";
                  const avatar = ranking.role === "Doctor" ? "https://i.pravatar.cc/80?img=32" : ranking.role === "Nurse" ? "https://i.pravatar.cc/80?img=47" : null;
                  return (
                    <article key={ranking.role} className={`rounded-2xl border p-4 ${ranking.role === "Doctor" ? "doctor-panel border-emerald-300/20 bg-[linear-gradient(135deg,rgba(6,18,28,0.98),rgba(8,32,30,0.94))]" : ranking.role === "Nurse" ? "nurse-panel border-sky-300/20 bg-[linear-gradient(135deg,rgba(6,15,30,0.98),rgba(8,25,35,0.94))]" : "border-white/10 bg-white/[0.04]"}`}>
                      <div className="flex items-center gap-3">
                        {avatar ? <img src={avatar} alt={ranking.role} className={`h-9 w-9 shrink-0 rounded-full border-2 object-cover ${ranking.role === "Doctor" ? "border-emerald-300/40" : "border-sky-300/40"}`} /> : null}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm font-semibold text-white">{ranking.emoji} {ranking.role}</h2>
                            <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase ${accent === "emerald" ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200" : accent === "sky" ? "border-sky-300/25 bg-sky-300/10 text-sky-200" : "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"}`}>Top AI</span>
                            <span className={`ml-auto text-[10px] ${accent === "emerald" ? "text-emerald-300/60" : accent === "sky" ? "text-sky-300/60" : "text-cyan-300/60"}`}>{ranking.countries.length} countries</span>
                          </div>
                          <ol className="mt-1.5 flex flex-wrap gap-1">
                            {ranking.tools.map((tool, index) => (
                              <li key={tool} className="flex items-center gap-1 rounded-lg border border-white/8 bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                                <span className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold ${accent === "emerald" ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : accent === "sky" ? "border border-sky-300/20 bg-sky-300/10 text-sky-200" : "bg-white/10 text-cyan-200"}`}>{index + 1}</span>
                                {tool}
                              </li>
                            ))}
                          </ol>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1">
                            {ranking.countries.map((c) => (
                              <span key={c.name} className="text-[11px]" title={c.name}>{c.flag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
        <a href="#main-top" className="back-to-main-link">← Back to the main</a>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <AiAssistant />
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Core marketplace</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Start with services people already need</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/65">
            Launch the first version with clear AI offers: project brief creation, prompt packs, no-code automation setups,
            and AI optimization consulting.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="interactive-panel-card rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{service.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{service.summary}</p>
              <p className="mt-6 text-sm font-semibold text-fuchsia-300">{service.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="regions" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Global hub selector</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Search the world by regional AI strengths
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              AI WORLD HUB can filter talent by country expertise so buyers don’t just search names — they search strategic strengths.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {regions.map((region) => (
              <article key={region.name} className="interactive-panel-card rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white/80">{region.flag} {region.name}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{region.tag}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">Regional Hub</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/70">{region.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {region.specialties.map((specialty) => (
                    <span key={specialty} className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-200">
                      {specialty}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="growth" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">How it grows</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">A marketplace first. A full AI operating ecosystem next.</h2>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Start with discovery and transactions. Then expand into secure workspaces, live demos, escrow, and region-based deployment lanes.
            </p>
          </div>

          <div className="grid gap-4">
            {projects.map((project, index) => (
              <article key={project.name} className="interactive-panel-card rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
                <p className="mt-2 text-sm font-medium text-cyan-200">{project.target}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{project.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="money" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Make money</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Revenue engines you can build directly into AI WORLD HUB</h2>
              <a href="/money" className="mt-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/15">Open money page</a>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/68">
              Combine rankings, marketplace services, hiring, and education so the platform earns from discovery, transactions, subscriptions, and premium access.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {revenueIdeas.map((idea) => (
              <article key={idea.title} className="interactive-panel-card rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-300">{idea.money}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{idea.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{idea.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="connect-world" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Connect the world</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Turn AI WORLD HUB into a bridge between countries, talent, and business needs.</h2>
            <a href="/country-hubs" className="mt-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/15">Open country hubs</a>
            <p className="mt-5 text-sm leading-7 text-white/68">
              The platform can become the place where people discover the right AI, the right builders, and the right countries for their exact industry need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {connectionIdeas.map((idea) => (
              <article key={idea} className="interactive-panel-card rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <p className="text-sm leading-7 text-white/82">{idea}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="business-roadmap" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Business roadmap</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">A clear plan to scale from rankings into a global AI platform.</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/professions" className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Professions</a>
              <a href="/jobs" className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Jobs</a>
              <a href="/money" className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Money</a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {businessPhases.map((phase) => (
              <article key={phase.phase} className="interactive-panel-card rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{phase.phase}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{phase.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{phase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
