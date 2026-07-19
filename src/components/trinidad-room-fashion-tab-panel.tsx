"use client";

export function TrinidadRoomFashionTabPanel() {
  return (
    <div className="trinidad-room-fashion-tab-panel space-y-3">
      <section className="overflow-hidden rounded-[1.25rem] border border-[#fbbf24]/20 bg-gradient-to-br from-[#1a0a0a]/80 to-[#0d0508]/80 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/70">
              🎭 Culture · Trinidad &amp; Tobago
            </p>
            <h3 className="mt-1 font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-[#fbbf24]">
              Carnival Masquerade
            </h3>
            <p className="mt-1 max-w-md text-xs text-white/50">
              Masquerade bands, sequin bikinis, feathered headpieces — the Trinidad Carnival tradition.
            </p>
          </div>
          <span className="text-3xl">🎭</span>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <section className="rounded-xl border border-[#fbbf24]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/50">🎭 Carnival</p>
          <h4 className="mt-1 text-sm font-black text-white">The Greatest Show on Earth</h4>
          <p className="mt-1 text-xs text-white/40">Two days of pure bacchanal. J'ouvert at 4am — paint, mud, oil, music in the dark. Then the bands hit the streets: feathers, sequins, thousands masquerading till sunset. The biggest street party on the planet.</p>
        </section>
        <section className="rounded-xl border border-[#fbbf24]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/50">🪔 Divali</p>
          <h4 className="mt-1 text-sm font-black text-white">Festival of Lights</h4>
          <p className="mt-1 text-xs text-white/40">500,000+ clay lamps lit across the island. Divali Nagar fair in Chaguanas — curries, sweets, sari shopping, Bollywood music. Hindu communities light up every yard, every temple, every street.</p>
        </section>
        <section className="rounded-xl border border-[#fbbf24]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/50">⛪ Spiritual Baptist Liberation Day</p>
          <h4 className="mt-1 text-sm font-black text-white">March 30 — Freedom to Worship</h4>
          <p className="mt-1 text-xs text-white/40">Banned by the British for over 100 years. Shouters, tie-tongues, holy water, colourful ribbons. Liberation Day celebrates the right to practice this Afro-Caribbean faith — raw, spiritual, powerful.</p>
        </section>
        <section className="rounded-xl border border-[#fbbf24]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/50">🥁 Steelpan</p>
          <h4 className="mt-1 text-sm font-black text-white">Born from Oil Drums</h4>
          <p className="mt-1 text-xs text-white/40">Invented in Trinidad — the only acoustic instrument invented in the 20th century. From discarded oil cans to orchestras of 100+ pans. Panorama competition each Carnival: 100,000+ people watching live.</p>
        </section>
        <section className="rounded-xl border border-[#fbbf24]/15 bg-black/30 p-4 sm:col-span-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/50">🎤 Calypso</p>
          <h4 className="mt-1 text-sm font-black text-white">The Voice of the People</h4>
          <p className="mt-1 max-w-lg text-xs text-white/40">Born in the yards of Port of Spain. Calypsonians used music to challenge governors, expose corruption, tell stories. Mighty Sparrow, Lord Kitchener, Superblue — legends who made the world listen. Soca grew out of calypso and took it global.</p>
        </section>
      </div>
    </div>
  );
}
