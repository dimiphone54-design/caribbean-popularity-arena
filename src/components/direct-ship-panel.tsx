"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  product_name: string;
  maker: string | null;
  price: string | null;
  country: string | null;
  description: string | null;
  image_url: string | null;
  buy_url: string | null;
};

export function DirectShipPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ product_name: "", maker: "", price: "", country: "", description: "", image_url: "", buy_url: "" });
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    try {
      const r = await fetch("/api/products");
      setProducts(await r.json());
    } catch { /* ignore */ }
  }
  useEffect(() => { load(); }, []);

  async function post() {
    setMsg("");
    if (!form.product_name.trim()) { setMsg("Product name required."); return; }
    if (form.buy_url && !form.buy_url.startsWith("https://")) { setMsg("Buy link must start with https://"); return; }
    if (form.image_url && !form.image_url.startsWith("https://")) { setMsg("Image link must start with https://"); return; }
    setSending(true);
    try {
      const r = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (d.ok) { setMsg("Listed! 🚀"); setForm({ product_name: "", maker: "", price: "", country: "", description: "", image_url: "", buy_url: "" }); setShowForm(false); load(); }
      else setMsg(d.error || "Failed.");
    } catch { setMsg("Network error."); }
    setSending(false);
  }

  const inputCls = "w-full rounded-lg border border-emerald-500/20 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-emerald-500/50";

  return (
    <section className="w-full" aria-label="Direct Ship Marketplace">
      <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 via-[#030712]/90 to-cyan-900/20 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-emerald-300 sm:text-3xl">DIRECT SHIP MARKETPLACE</h2>
          <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">Free · Ships Direct</span>
        </div>
        <p className="mt-1 text-[11px] text-white/40">
          Built something with AI? Sell it here — your price, your country, direct to the world. No fees, no middleman.
        </p>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowForm((s) => !s)}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-[11px] font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/20"
          >
            {showForm ? "Close" : "+ List Your Product Free"}
          </button>
        </div>

        {showForm && (
          <div className="mt-3 rounded-xl border border-emerald-500/20 bg-black/40 p-4 space-y-2">
            <input className={inputCls} placeholder="Product name * (e.g. AI-Built Water Filter)" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} />
            <input className={inputCls} placeholder="Your name / maker" value={form.maker} onChange={(e) => setForm({ ...form, maker: e.target.value })} />
            <div className="flex gap-2">
              <input className={inputCls} placeholder="Price (e.g. $45)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className={inputCls} placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            </div>
            <textarea className={inputCls} rows={2} placeholder="Describe it — what it is, how AI built it..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className={inputCls} placeholder="Image link (https://... — optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <input className={inputCls} placeholder="Buy / contact link (https://wa.me/... or your store)" value={form.buy_url} onChange={(e) => setForm({ ...form, buy_url: e.target.value })} />
            <button type="button" onClick={post} disabled={sending} className="w-full rounded-lg border border-emerald-500/40 bg-emerald-500/15 py-2 text-[11px] font-black uppercase tracking-wider text-emerald-200 transition hover:bg-emerald-500/25">
              {sending ? "Listing..." : "List It 🚀"}
            </button>
            {msg && <p className="text-[11px] font-bold text-emerald-400">{msg}</p>}
          </div>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 && <p className="text-[11px] text-white/30">No products yet — be the first to list what you built.</p>}
          {products.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-all hover:border-emerald-500/40 hover:bg-black/60"
            >
              {p.image_url ? (
                <img src={p.image_url} alt={p.product_name} className="h-32 w-full object-cover" />
              ) : (
                <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-emerald-900/30 to-black/40">
                  <span className="text-4xl">📦</span>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{p.product_name}</h3>
                  {p.price && <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-300">{p.price}</span>}
                </div>
                {(p.maker || p.country) && (
                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400/70">
                    {[p.maker, p.country].filter(Boolean).join(" · ")}
                  </p>
                )}
                {p.description && <p className="mt-2 text-[11px] leading-5 text-white/50">{p.description}</p>}
                {p.buy_url && (
                  <button
                    type="button"
                    onClick={() => window.open(p.buy_url!, "_blank", "noopener,noreferrer")}
                    className="mt-3 w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                    Get This →
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}