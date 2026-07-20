"use client";

import { useEffect, useState } from "react";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { WorkMarketplacePanel } from "@/components/work-marketplace-panel";
import { ProofWallPanel } from "@/components/proof-wall-panel";

const AP_BG = "#030712";

const CATEGORIES = [
  { name: "Design", emoji: "🎨", blurb: "Logos, UI, branding, graphics", color: "border-pink-500/30 hover:border-pink-400 from-pink-500/10", text: "text-pink-200" },
  { name: "Coding", emoji: "💻", blurb: "Apps, sites, scripts, automation", color: "border-cyan-500/30 hover:border-cyan-400 from-cyan-500/10", text: "text-cyan-200" },
  { name: "Writing", emoji: "✍️", blurb: "Copy, articles, scripts, editing", color: "border-amber-500/30 hover:border-amber-400 from-amber-500/10", text: "text-amber-200" },
  { name: "Video", emoji: "🎬", blurb: "Editing, motion, reels, animation", color: "border-red-500/30 hover:border-red-400 from-red-500/10", text: "text-red-200" },
  { name: "Marketing", emoji: "📣", blurb: "Ads, social, SEO, growth", color: "border-emerald-500/30 hover:border-emerald-400 from-emerald-500/10", text: "text-emerald-200" },
  { name: "AI/ML", emoji: "🧠", blurb: "Models, chatbots, data, automation", color: "border-purple-500/30 hover:border-purple-400 from-purple-500/10", text: "text-purple-200" },
];

export function AiPowerhouseRoomPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    html.style.backgroundColor = AP_BG;
    body.style.backgroundColor = AP_BG;
    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  function pickCategory(cat: string) {
    setSelectedCategory(cat);
    const el = document.getElementById("work-marketplace");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <main
        className="arena-2030 ai-powerhouse-room relative flex min-h-screen flex-col overflow-hidden"
        style={{ backgroundColor: AP_BG }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]" />
        <div className="absolute inset-0 z-0 bg-[#030712]/40" aria-hidden="true" />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <header className="text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=400&q=80"
                  alt="AI Powerhouse Agent"
                  className="h-32 w-32 rounded-2xl object-cover ring-4 ring-red-500/50 shadow-[0_0_40px_rgba(220,38,38,0.4)] sm:h-40 sm:w-40"
                />
              </div>
              <h1 className="font-['Bebas_Neue',sans-serif] text-6xl tracking-[0.06em] text-white sm:text-8xl">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  AI POWERHOUSE
                </span>
              </h1>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.3em] text-cyan-400/80">
                The World&apos;s AI &amp; Work Powerhouse · Global · est. 2026
              </p>
              <p className="mt-3 mx-auto max-w-2xl text-center text-sm italic leading-7 text-white/50 sm:text-base">
                &ldquo;One powerhouse. Every nation. Post what you need, offer what you do — talent from every country, all in one place. Building the future together.&rdquo;
              </p>
            </header>

            <section className="w-full" aria-label="About AI Powerhouse">
              <div className="mt-8 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 via-[#030712]/90 to-blue-900/20 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-cyan-300 sm:text-3xl">
                    ABOUT US
                  </h2>
                  <span className="ml-auto text-xs font-black uppercase tracking-wider text-blue-400/70">
                    Worldwide
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">
                  AI-first · Deep tech · Built by every nation, for the world
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-4 text-center">
                    <p className="text-3xl font-black text-cyan-400">190+</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">Countries Connected</p>
                  </div>
                  <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-4 text-center">
                    <p className="text-3xl font-black text-cyan-400">0%</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">Platform Fees</p>
                  </div>
                  <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-4 text-center">
                    <p className="text-3xl font-black text-cyan-400">100%</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">Direct Connections</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full" aria-label="Categories">
              <div className="mt-6 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 via-[#030712]/90 to-cyan-900/20 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🗂️</span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-cyan-300 sm:text-3xl">
                    PICK YOUR LANE
                  </h2>
                  <span className="ml-auto text-xs font-black uppercase tracking-wider text-blue-400/70">
                    Tap to enter
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">
                  Choose a category — jump straight to the jobs and talent in your lane.
                </p>

                <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => pickCategory(cat.name)}
                      className={`group text-left overflow-hidden rounded-xl border ${cat.color} bg-gradient-to-br to-black/40 p-4 transition-all`}
                    >
                      <span className="text-3xl">{cat.emoji}</span>
                      <h3 className={`mt-2 text-sm font-black ${cat.text}`}>{cat.name}</h3>
                      <p className="mt-0.5 text-[10px] leading-4 text-white/50">{cat.blurb}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => pickCategory("All")}
                    className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-8 py-3 text-sm font-black uppercase tracking-wider text-cyan-300 transition hover:bg-cyan-500/20"
                  >
                    See Everything ↓
                  </button>
                </div>
              </div>
            </section>

            <WorkMarketplacePanel selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

            <ProofWallPanel />

            <section className="w-full" aria-label="Tech Stack">
              <div className="mt-6 overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-[#030712]/90 to-cyan-900/20 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚙️</span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-purple-300 sm:text-3xl">
                    OUR STACK
                  </h2>
                  <span className="ml-auto text-xs font-black uppercase tracking-wider text-purple-400/70">
                    Built for Scale
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { emoji: "🔥", name: "PyTorch" },
                    { emoji: "🟢", name: "Python" },
                    { emoji: "☸️", name: "Kubernetes" },
                    { emoji: "📊", name: "Spark" },
                    { emoji: "🧠", name: "CUDA" },
                    { emoji: "🌐", name: "FastAPI" },
                    { emoji: "🐳", name: "Docker" },
                    { emoji: "📈", name: "Grafana" }
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="rounded-xl border border-white/10 bg-black/40 p-3 text-center transition-all hover:border-purple-500/30"
                    >
                      <span className="text-2xl">{tech.emoji}</span>
                      <p className="mt-1 text-[10px] font-bold text-white/70">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full" aria-label="Direct Ship Marketplace">
              <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 via-[#030712]/90 to-cyan-900/20 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-emerald-300 sm:text-3xl">
                    DIRECT SHIP MARKETPLACE
                  </h2>
                  <span className="ml-auto text-xs font-black uppercase tracking-wider text-emerald-400/70">
                    Free · No Fees
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">
                  Browse AI gear · Supplier ships direct · Platform info is free
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                  <span className="text-sm">✅</span>
                  <p className="text-[11px] font-bold text-emerald-300">
                    Zero commission · Zero listing fees · Free product info · Supplier ships direct to buyer
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { emoji: "🎧", name: "AI Noise-Cancel Headset", price: "$89", supplier: "Barcelona, ES", desc: "Active noise cancellation with AI-adaptive ANC. 40hr battery. Bluetooth 5.3.", tag: "Audio" },
                    { emoji: "⌨️", name: "Mechanical AI Keyboard", price: "$129", supplier: "Madrid, ES", desc: "Programmable macro keys for AI workflows. Cherry MX switches. RGB backlit.", tag: "Peripherals" },
                    { emoji: "🖥️", name: "4K AI Monitor 27\"", price: "$349", supplier: "Shanghai, CN", desc: "IPS panel, 144Hz, built-in KVM switch. USB-C 96W passthrough for laptop docking.", tag: "Displays" },
                    { emoji: "🔌", name: "USB-C AI Dock Hub", price: "$59", supplier: "Tokyo, JP", desc: "12-in-1 hub: HDMI 4K, ethernet, SD card, 3x USB-A, 2x USB-C PD 100W.", tag: "Accessories" },
                    { emoji: "🖱️", name: "Ergonomic AI Mouse", price: "$45", supplier: "Bogotá, CO", desc: "Vertical design, 16000 DPI sensor, 8 programmable buttons. Wireless + wired.", tag: "Peripherals" },
                    { emoji: "💡", name: "Smart Desk Lamp AI", price: "$67", supplier: "London, UK", desc: "Auto-adjusting color temperature based on time of day. USB charging port. Touch controls.", tag: "Smart Home" },
                    { emoji: "🔊", name: "AI Speaker Pod", price: "$79", supplier: "Barcelona, ES", desc: "360° sound with room-calibrating AI. Multi-room sync. Voice assistant compatible.", tag: "Audio" },
                    { emoji: "📷", name: "Webcam AI Pro", price: "$99", supplier: "Madrid, ES", desc: "4K@30fps, AI auto-framing, background blur, noise reduction. Plug and play.", tag: "Cameras" },
                    { emoji: "🛡️", name: "Privacy Screen Filter", price: "$35", supplier: "London, UK", desc: "27\" magnetic privacy filter. Anti-glare coating. Blocks side-angle viewing.", tag: "Accessories" }
                  ].map((product) => (
                    <article
                      key={product.name}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-emerald-500/30 hover:bg-black/60"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{product.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-white">{product.name}</h3>
                          <p className="mt-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-400/70">
                            {product.supplier}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                          {product.price}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold text-white/60">
                          {product.tag}
                        </span>
                        <span className="ml-auto rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[9px] font-bold text-cyan-400">
                          Direct Ship
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-white/50">
                        {product.desc}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                  <p className="text-xs font-bold text-emerald-300">
                    🚀 Want to list your products? AI POWERHOUSE provides free product info — you ship direct, keep your margins.
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">
                    No platform fees · No commission · No inventory required · Just list and ship
                  </p>
                  <button
                    type="button"
                    className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-[11px] font-black uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                    List Your Products Free →
                  </button>
                </div>
              </div>
            </section>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}