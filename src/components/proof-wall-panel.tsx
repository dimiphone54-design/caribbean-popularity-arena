"use client";

import { useEffect, useState } from "react";

type Proof = {
  id: string;
  display_name: string;
  job_title: string | null;
  outcome: string | null;
  location: string | null;
  proof_url: string | null;
};

const MAX_WINS = 20;

// 20 colours — each card cycles through these (same size/info, different colour)
const CARD_COLORS = [
  { border: "border-amber-500/40", glow: "245,158,11", text: "text-amber-200", sub: "text-amber-400/70", from: "from-amber-500/10" },
  { border: "border-cyan-500/40", glow: "34,211,238", text: "text-cyan-200", sub: "text-cyan-400/70", from: "from-cyan-500/10" },
  { border: "border-purple-500/40", glow: "168,85,247", text: "text-purple-200", sub: "text-purple-400/70", from: "from-purple-500/10" },
  { border: "border-pink-500/40", glow: "236,72,153", text: "text-pink-200", sub: "text-pink-400/70", from: "from-pink-500/10" },
  { border: "border-emerald-500/40", glow: "16,185,129", text: "text-emerald-200", sub: "text-emerald-400/70", from: "from-emerald-500/10" },
  { border: "border-blue-500/40", glow: "59,130,246", text: "text-blue-200", sub: "text-blue-400/70", from: "from-blue-500/10" },
  { border: "border-red-500/40", glow: "239,68,68", text: "text-red-200", sub: "text-red-400/70", from: "from-red-500/10" },
  { border: "border-orange-500/40", glow: "249,115,22", text: "text-orange-200", sub: "text-orange-400/70", from: "from-orange-500/10" },
  { border: "border-teal-500/40", glow: "20,184,166", text: "text-teal-200", sub: "text-teal-400/70", from: "from-teal-500/10" },
  { border: "border-fuchsia-500/40", glow: "217,70,239", text: "text-fuchsia-200", sub: "text-fuchsia-400/70", from: "from-fuchsia-500/10" },
  { border: "border-lime-500/40", glow: "132,204,22", text: "text-lime-200", sub: "text-lime-400/70", from: "from-lime-500/10" },
  { border: "border-sky-500/40", glow: "14,165,233", text: "text-sky-200", sub: "text-sky-400/70", from: "from-sky-500/10" },
  { border: "border-rose-500/40", glow: "244,63,94", text: "text-rose-200", sub: "text-rose-400/70", from: "from-rose-500/10" },
  { border: "border-indigo-500/40", glow: "99,102,241", text: "text-indigo-200", sub: "text-indigo-400/70", from: "from-indigo-500/10" },
  { border: "border-yellow-500/40", glow: "234,179,8", text: "text-yellow-200", sub: "text-yellow-400/70", from: "from-yellow-500/10" },
  { border: "border-green-500/40", glow: "34,197,94", text: "text-green-200", sub: "text-green-400/70", from: "from-green-500/10" },
  { border: "border-violet-500/40", glow: "139,92,246", text: "text-violet-200", sub: "text-violet-400/70", from: "from-violet-500/10" },
  { border: "border-cyan-400/40", glow: "34,211,238", text: "text-cyan-100", sub: "text-cyan-300/70", from: "from-cyan-400/10" },
  { border: "border-amber-400/40", glow: "251,191,36", text: "text-amber-100", sub: "text-amber-300/70", from: "from-amber-400/10" },
  { border: "border-pink-400/40", glow: "244,114,182", text: "text-pink-100", sub: "text-pink-300/70", from: "from-pink-400/10" },
];

export function ProofWallPanel() {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [form, setForm] = useState({ display_name: "", job_title: "", outcome: "", location: "", proof_url: "" });
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    try {
      const r = await fetch("/api/work/proof");
      setProofs(await r.json());
    } catch { /* ignore */ }
  }
  useEffect(() => { load(); }, []);

  const isFull = proofs.length >= MAX_WINS;

  async function post() {
    setMsg("");
    if (isFull) { setMsg("Wall is full — all 20 spots are claimed."); return; }
    if (!form.display_name.trim()) { setMsg("Name required."); return; }
    if (form.proof_url && !form.proof_url.startsWith("https://")) { setMsg("Proof link must start with https://"); return; }
    setSending(true);
    try {
      const r = await fetch("/api/work/proof", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (d.ok) { setMsg("Added to the wall! 🏆"); setForm({ display_name: "", job_title: "", outcome: "", location: "", proof_url: "" }); setShowForm(false); load(); }
      else setMsg(d.error || "Failed.");
    } catch { setMsg("Network error."); }
    setSending(false);
  }

  const inputCls = "w-full rounded-lg border border-amber-500/20 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-amber-500/50";

  return (
    <section className="w-full" aria-label="Proof Wall">
      <div className="mt-6 overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 via-[#030712]/90 to-yellow-900/10 p-4 sm:p-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-amber-300 sm:text-3xl">PROOF WALL</h2>
          <span className="ml-auto rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-400">{proofs.length} / {MAX_WINS} Claimed</span>
        </div>
        <p className="mt-1 text-[11px] text-white/40">Completed work that stays. Real people, real results — only 20 spots, forever.</p>

        <div className="mt-4">
          {isFull ? (
            <span className="inline-block rounded-xl border border-amber-500/40 bg-amber-500/15 px-6 py-2 text-[11px] font-black uppercase tracking-wider text-amber-200">
              🏆 Wall full — all 20 spots claimed
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setShowForm((s) => !s)}
              className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-2 text-[11px] font-black uppercase tracking-wider text-amber-300 transition hover:bg-amber-500/20"
            >
              {showForm ? "Close" : `+ Add Your Win (${MAX_WINS - proofs.length} left)`}
            </button>
          )}
        </div>

        {showForm && !isFull && (
          <div className="mt-3 rounded-xl border border-amber-500/20 bg-black/40 p-4 space-y-2">
            <input className={inputCls} placeholder="Your name *" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
            <input className={inputCls} placeholder="What did you do? (e.g. Built an AI chatbot)" value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} />
            <textarea className={inputCls} rows={2} placeholder="The result / outcome (e.g. Boosted sales 40%)" value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} />
            <input className={inputCls} placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input className={inputCls} placeholder="Proof link (https://...) — portfolio, demo, etc." value={form.proof_url} onChange={(e) => setForm({ ...form, proof_url: e.target.value })} />
            <button type="button" onClick={post} disabled={sending} className="w-full rounded-lg border border-amber-500/40 bg-amber-500/15 py-2 text-[11px] font-black uppercase tracking-wider text-amber-200 transition hover:bg-amber-500/25">
              {sending ? "Posting..." : "Post to the Wall 🏆"}
            </button>
            {msg && <p className="text-[11px] font-bold text-amber-400">{msg}</p>}
          </div>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {proofs.length === 0 && <p className="text-[11px] text-white/30">No wins on the wall yet — be the first to prove it.</p>}
          {proofs.map((p, i) => {
            const c = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <article
                key={p.id}
                className={`group relative overflow-hidden rounded-xl border ${c.border} bg-gradient-to-br ${c.from} to-black/40 p-4 transition-all hover:shadow-[0_0_25px_rgba(${c.glow},0.3)]`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🏆</span>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-sm font-black ${c.text}`}>{p.job_title || "Completed Work"}</h3>
                    <p className={`mt-0.5 text-[10px] font-bold uppercase tracking-wider ${c.sub}`}>
                      {p.display_name}{p.location ? ` · ${p.location}` : ""}
                    </p>
                  </div>
                </div>
                {p.outcome && <p className="mt-2 text-[11px] leading-5 text-white/60">{p.outcome}</p>}
                {p.proof_url && (
                  <button
                    type="button"
                    onClick={() => window.open(p.proof_url!, "_blank", "noopener,noreferrer")}
                    className={`mt-2 rounded-full border ${c.border} bg-white/5 px-3 py-0.5 text-[9px] font-bold ${c.text}`}
                  >
                    View Proof →
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}