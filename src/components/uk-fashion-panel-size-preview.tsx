"use client";

const LOOKS = [
  { id: 1, name: "Runway Edit", style: "Street luxe", city: "Manchester" },
  { id: 2, name: "Night Fit", style: "After-dark", city: "Birmingham" },
  { id: 3, name: "Park Walk", style: "Soft utility", city: "London" }
] as const;

function VariantCard({ title, description, className, itemsClassName }: { title: string; description: string; className: string; itemsClassName: string }) {
  return (
    <section className={`dropship-market-panel a2030-holo-panel rounded-[1.5rem] border border-[#d7b46a]/35 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#d7b46a] sm:text-xs">
            🇬🇧 UK Fashion Panel
          </p>
          <p className="mt-1 text-[11px] text-[#9fb4d4]">{description}</p>
        </div>
        <span className="dropship-market-badge">{title}</span>
      </div>

      <div className={`mt-3 ${itemsClassName}`} role="list">
        {LOOKS.map((look) => (
          <div key={look.id} className="rounded-xl border border-[#ff2bd6]/18 bg-[#0a0010]/55 px-3 py-2" role="listitem">
            <p className="truncate text-[11px] font-black text-[#fef9c3]">{look.name}</p>
            <p className="mt-1 truncate text-[10px] text-[#ff2bd6]">{look.style}</p>
            <p className="mt-1 truncate text-[9px] text-[#8fa3c4]">🇬🇧 {look.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UkFashionPanelSizePreview() {
  return (
    <main className="arena-2030 min-h-screen bg-[#06080f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d7b46a]">UK Fashion Panel Preview</p>
          <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-4xl tracking-[0.08em] text-[#fef9c3]">Choose 1 of 5 sizes</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#9fb4d4]">
            Preview 5 short UK fashion panel sizes. Pick the one you want and I will apply only that version in the UK room.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <VariantCard title="A · Ultra short" description="Single tight row · shortest possible panel" className="p-3" itemsClassName="grid gap-2 md:grid-cols-3" />
          <VariantCard title="B · Short" description="Compact row cards · slightly roomier" className="p-4" itemsClassName="grid gap-2 md:grid-cols-3" />
          <VariantCard title="C · Medium short" description="Short panel with more breathing room" className="p-4 sm:p-5" itemsClassName="grid gap-3 md:grid-cols-3" />
          <VariantCard title="D · Wide compact" description="Wider feel with low height" className="p-4 sm:p-5" itemsClassName="grid gap-2 lg:grid-cols-3" />
          <VariantCard title="E · Tallest allowed" description="Still compact, but the tallest option in this set" className="p-5 sm:p-6 lg:col-span-2" itemsClassName="grid gap-3 md:grid-cols-3" />
        </div>
      </div>
    </main>
  );
}
