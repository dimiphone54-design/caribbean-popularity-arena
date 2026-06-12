"use client";

import { SiteFooter } from "@/components/site-footer";
import { RoomBackToArena } from "@/components/room-back-to-arena";

export function CommandCenterPage() {
  return (
    <>
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <RoomBackToArena />

          <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-[#00c9a7]">Owner only</p>
          <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.06em] text-[#f7efe0] sm:text-6xl">
            Command Center
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#7a82a8]">
            Private operator panel. Visible only when{" "}
            <code className="text-[#f7e7aa]">NEXT_PUBLIC_COMMAND_CENTER_ENABLED</code> is set in your local{" "}
            <code className="text-[#f7e7aa]">.env.local</code>.
          </p>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-[#f5c842]/25 bg-[#111830]/80 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5c842]">Arena lounges</p>
              <p className="mt-3 text-sm leading-7 text-[#d8deef]">
                Retro Sugar, Pair League, Comedy Fest, and Island HUB each run independently. Fans enter from the arena
                nav — not room to room.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-[#8fa3bf]">
                <li>Retro Sugar</li>
                <li>Pair League</li>
                <li>Comedy Fest</li>
                <li>Island HUB</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#00c9a7]/25 bg-[#00c9a7]/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00c9a7]">Operator status</p>
              <p className="mt-3 text-sm leading-7 text-[#d8deef]">
                12 front slots · 12 waiting back slots · 12-hour rotation preview. Production keys and live writes stay
                off until you connect them.
              </p>
              <p className="mt-4 inline-flex rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f5c842]">
                Owner view active
              </p>
            </article>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
