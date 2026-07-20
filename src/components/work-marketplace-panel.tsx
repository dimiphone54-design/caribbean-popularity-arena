"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;
  job_title: string;
  company: string | null;
  work_mode: string | null;
  description: string | null;
  contact_url: string | null;
  category: string | null;
};

type Profile = {
  id: string;
  display_name: string;
  skill: string | null;
  location: string | null;
  description: string | null;
  contact_url: string | null;
  availability: string | null;
  category: string | null;
};

const CATEGORIES = ["All", "Design", "Coding", "Writing", "Video", "Marketing", "AI/ML"];

type Props = {
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
};

export function WorkMarketplacePanel({ selectedCategory = "All", onCategoryChange }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const filter = selectedCategory;
  const setFilter = (cat: string) => onCategoryChange?.(cat);

  const [job, setJob] = useState({ job_title: "", company: "", work_mode: "Remote", description: "", contact_url: "", category: "Design" });
  const [prof, setProf] = useState({ display_name: "", skill: "", location: "", description: "", contact_url: "", availability: "Available Now", category: "Design" });

  const [jobMsg, setJobMsg] = useState("");
  const [profMsg, setProfMsg] = useState("");
  const [jobSending, setJobSending] = useState(false);
  const [profSending, setProfSending] = useState(false);

  async function loadJobs(cat: string) {
    try {
      const q = cat && cat !== "All" ? `?category=${encodeURIComponent(cat)}` : "";
      const r = await fetch(`/api/work/jobs${q}`);
      setJobs(await r.json());
    } catch { /* ignore */ }
  }
  async function loadProfiles(cat: string) {
    try {
      const q = cat && cat !== "All" ? `?category=${encodeURIComponent(cat)}` : "";
      const r = await fetch(`/api/work/profiles${q}`);
      setProfiles(await r.json());
    } catch { /* ignore */ }
  }
  useEffect(() => { loadJobs(filter); loadProfiles(filter); }, [filter]);

  async function postJob() {
    setJobMsg("");
    if (!job.job_title.trim()) { setJobMsg("Job title required."); return; }
    if (job.contact_url && !job.contact_url.startsWith("https://")) { setJobMsg("Contact link must start with https://"); return; }
    setJobSending(true);
    try {
      const r = await fetch("/api/work/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(job) });
      const d = await r.json();
      if (d.ok) { setJobMsg("Posted!"); setJob({ job_title: "", company: "", work_mode: "Remote", description: "", contact_url: "", category: "Design" }); loadJobs(filter); }
      else setJobMsg(d.error || "Failed.");
    } catch { setJobMsg("Network error."); }
    setJobSending(false);
  }

  async function postProfile() {
    setProfMsg("");
    if (!prof.display_name.trim()) { setProfMsg("Name required."); return; }
    if (prof.contact_url && !prof.contact_url.startsWith("https://")) { setProfMsg("Contact link must start with https://"); return; }
    setProfSending(true);
    try {
      const r = await fetch("/api/work/profiles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(prof) });
      const d = await r.json();
      if (d.ok) { setProfMsg("Posted!"); setProf({ display_name: "", skill: "", location: "", description: "", contact_url: "", availability: "Available Now", category: "Design" }); loadProfiles(filter); }
      else setProfMsg(d.error || "Failed.");
    } catch { setProfMsg("Network error."); }
    setProfSending(false);
  }

  const inputCls = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-cyan-500/50";

  return (
    <section className="w-full" aria-label="Work Marketplace" id="work-marketplace">
      <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 via-[#030712]/90 to-emerald-900/20 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-cyan-300 sm:text-3xl">WORK MARKETPLACE</h2>
          <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">{filter === "All" ? "All Lanes" : filter}</span>
        </div>
        <p className="mt-1 text-[11px] text-white/40">Post a job · Offer your skills · Connect directly — no middleman, no fees</p>

        {/* Category filter buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-black uppercase tracking-wider transition ${
                filter === cat
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-200"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-cyan-500/30 hover:text-cyan-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {/* LEFT — Post a Job */}
          <div className="rounded-xl border border-emerald-500/20 bg-black/40 p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <h4 className="text-sm font-bold text-white">I Need This Done</h4>
            </div>
            <p className="mt-1 text-[11px] text-white/50">Post a job. Reach people worldwide. Free forever.</p>
            <div className="mt-3 space-y-2">
              <input className={inputCls} placeholder="Job title *" value={job.job_title} onChange={(e) => setJob({ ...job, job_title: e.target.value })} />
              <input className={inputCls} placeholder="Your name / company" value={job.company} onChange={(e) => setJob({ ...job, company: e.target.value })} />
              <select className={inputCls} value={job.category} onChange={(e) => setJob({ ...job, category: e.target.value })}>
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
              <select className={inputCls} value={job.work_mode} onChange={(e) => setJob({ ...job, work_mode: e.target.value })}>
                <option>Remote</option><option>On-site</option><option>Hybrid</option>
              </select>
              <textarea className={inputCls} rows={2} placeholder="What you need done..." value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} />
              <input className={inputCls} placeholder="Contact link (https://wa.me/... or email)" value={job.contact_url} onChange={(e) => setJob({ ...job, contact_url: e.target.value })} />
              <button type="button" onClick={postJob} disabled={jobSending} className="w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2 text-[11px] font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/20">
                {jobSending ? "Posting..." : "Post Job Free →"}
              </button>
              {jobMsg && <p className="text-[11px] font-bold text-emerald-400">{jobMsg}</p>}
            </div>

            <div className="mt-4 space-y-2">
              {jobs.length === 0 && <p className="text-[10px] text-white/30">No jobs in this lane yet — be the first to post.</p>}
              {jobs.map((j) => (
                <div key={j.id} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                  <p className="text-[11px] font-bold text-white">{j.job_title}</p>
                  <p className="text-[9px] text-white/40">{[j.category, j.company, j.work_mode].filter(Boolean).join(" · ")}</p>
                  {j.description && <p className="mt-1 text-[10px] text-white/50">{j.description}</p>}
                  {j.contact_url && (
                    <button type="button" onClick={() => window.open(j.contact_url!, "_blank", "noopener,noreferrer")} className="mt-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[9px] font-bold text-emerald-300">Connect →</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Offer Skills */}
          <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔧</span>
              <h4 className="text-sm font-bold text-white">I Can Do This</h4>
            </div>
            <p className="mt-1 text-[11px] text-white/50">Post your skills. Get found. Connect directly.</p>
            <div className="mt-3 space-y-2">
              <input className={inputCls} placeholder="Your name *" value={prof.display_name} onChange={(e) => setProf({ ...prof, display_name: e.target.value })} />
              <input className={inputCls} placeholder="Your skill (e.g. ML Engineer, Designer)" value={prof.skill} onChange={(e) => setProf({ ...prof, skill: e.target.value })} />
              <select className={inputCls} value={prof.category} onChange={(e) => setProf({ ...prof, category: e.target.value })}>
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
              <input className={inputCls} placeholder="Location" value={prof.location} onChange={(e) => setProf({ ...prof, location: e.target.value })} />
              <textarea className={inputCls} rows={2} placeholder="What you can do..." value={prof.description} onChange={(e) => setProf({ ...prof, description: e.target.value })} />
              <select className={inputCls} value={prof.availability} onChange={(e) => setProf({ ...prof, availability: e.target.value })}>
                <option>Available Now</option><option>Open to Offers</option><option>Contract Only</option>
              </select>
              <input className={inputCls} placeholder="Contact link (https://wa.me/... or email)" value={prof.contact_url} onChange={(e) => setProf({ ...prof, contact_url: e.target.value })} />
              <button type="button" onClick={postProfile} disabled={profSending} className="w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-2 text-[11px] font-black uppercase tracking-wider text-cyan-300 transition hover:bg-cyan-500/20">
                {profSending ? "Posting..." : "Post Profile Free →"}
              </button>
              {profMsg && <p className="text-[11px] font-bold text-cyan-400">{profMsg}</p>}
            </div>

            <div className="mt-4 space-y-2">
              {profiles.length === 0 && <p className="text-[10px] text-white/30">No profiles in this lane yet — be the first to post.</p>}
              {profiles.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white">{p.display_name}</p>
                    <p className="text-[9px] text-white/40">{[p.category, p.skill, p.location].filter(Boolean).join(" · ")}</p>
                    {p.description && <p className="mt-0.5 text-[10px] text-white/50">{p.description}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {p.availability && <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-bold text-emerald-400">{p.availability}</span>}
                    {p.contact_url && (
                      <button type="button" onClick={() => window.open(p.contact_url!, "_blank", "noopener,noreferrer")} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-[9px] font-bold text-cyan-300">Connect →</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}