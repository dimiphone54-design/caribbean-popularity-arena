"use client";

export function TrinidadRoomFoodTabPanel() {
  return (
    <div className="trinidad-room-food-tab-panel space-y-3">
      <section className="overflow-hidden rounded-[1.25rem] border border-[#fb7185]/20 bg-gradient-to-br from-[#1a0508]/80 to-[#0d0304]/80 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#fb7185]/70">
              🍽️ Food · Trinidad &amp; Tobago
            </p>
            <h3 className="mt-1 font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-[#fb7185]">
              Street Food &amp; One-Pot Legends
            </h3>
            <p className="mt-1 max-w-md text-xs text-white/50">
              From doubles stands in Port of Spain to pelau pots on the beach — T&T&apos;s food scene hits different.
            </p>
          </div>
          <span className="text-3xl">🍛</span>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <section className="rounded-xl border border-[#fb7185]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fb7185]/50">🫓 Street Champion</p>
          <h4 className="mt-1 text-sm font-black text-white">Doubles</h4>
          <p className="mt-1 text-xs text-white/40">The undisputed champion of local street food. Two soft, fried flatbreads (bara) filled with curried chickpeas (channa) and topped with various chutneys.</p>
        </section>
        <section className="rounded-xl border border-[#fb7185]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fb7185]/50">🫓 Stuffed Flatbread</p>
          <h4 className="mt-1 text-sm font-black text-white">Roti</h4>
          <p className="mt-1 text-xs text-white/40">Stuffed flatbreads featuring fillings like curried chicken, goat, or shrimp. Popular types include bus-up-shot (paratha) and dhalpuri.</p>
        </section>
        <section className="rounded-xl border border-[#fb7185]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fb7185]/50">🐟 Maracas Beach</p>
          <h4 className="mt-1 text-sm font-black text-white">Bake and Shark</h4>
          <p className="mt-1 text-xs text-white/40">A beloved coastal treat originating from the beaches of Maracas, featuring fried dough stuffed with seasoned shark meat and customized with a variety of local sauces and toppings.</p>
        </section>
        <section className="rounded-xl border border-[#fb7185]/15 bg-black/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#fb7185]/50">🍚 One-Pot Comfort</p>
          <h4 className="mt-1 text-sm font-black text-white">Pelau</h4>
          <p className="mt-1 text-xs text-white/40">A comforting, one-pot dish made with browned chicken, rice, pigeon peas, and vegetables, cooked in coconut milk.</p>
        </section>
      </div>
    </div>
  );
}
