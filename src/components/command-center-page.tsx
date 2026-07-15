"use client";

import { useEffect } from "react";
import { CommandCenterUkRoomArchive } from "@/components/command-center-uk-room-archive";
import { CommandCenterFirebaseInfrastructure } from "@/components/command-center-firebase-infrastructure";
import { ArenaMasterKeyPanel } from "@/components/arena-master-key-panel";
import { LiveSlotMarketRateCard } from "@/components/live-slot-market-rate-card";
import { SiteFooter } from "@/components/site-footer";
import { RoomBackToArena } from "@/components/room-back-to-arena";

const COMMAND_CENTER_ROOM_BG = "#06080f";

export function CommandCenterPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;

    html.style.backgroundColor = COMMAND_CENTER_ROOM_BG;
    body.style.backgroundColor = COMMAND_CENTER_ROOM_BG;

    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <div className="command-center-room-shell" style={{ backgroundColor: "transparent" }}>
        <div
          className="command-center-room-bg"
          style={{ backgroundImage: "url(/command-center-room-bg.png)" }}
          aria-hidden="true"
        />
        <div className="command-center-room-scrim" aria-hidden="true" />

        <main className="command-center-room-content min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <RoomBackToArena />

            <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-[#00c9a7]">Owner only</p>
            <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.06em] text-[#f7efe0] sm:text-6xl">
              Command Center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c5cfe8]">
              Private operator panel — not linked on the public fan site unless you enable it locally.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Isolation — a2030 holo panel */}
              <article className="a2030-holo-panel overflow-hidden rounded-[1.25rem] border border-[#00f5ff]/40 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00f5ff]/40 bg-[#00f5ff]/15 text-xs">🔒</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00f5ff]">Isolation</p>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[11px] leading-5 text-[#d8deef]">
                  <li><strong className="text-[#f7efe0]">Fan site</strong> — rooms, gifts, dropship, signup run normal when disabled.</li>
                  <li><strong className="text-[#f7efe0]">Your view</strong> — flag true in .env.local only.</li>
                  <li><strong className="text-[#f7efe0]">Data</strong> — registry reads .data/ (gitignored).</li>
                  <li><strong className="text-[#f7efe0]">Master Key</strong> — bypass gates while enabled.</li>
                </ul>
              </article>

              {/* Card 2: Study Hub — a2030 holo panel */}
              <article className="a2030-holo-panel overflow-hidden rounded-[1.25rem] border border-[#fbbf24]/40 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/15 text-xs">📚</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#fbbf24]">UK Study Hub</p>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5" role="list">
                  {[
                    { emoji: "📚", label: "London campus" },
                    { emoji: "🎓", label: "GCSE · A-Level" },
                    { emoji: "💻", label: "Remote desk" },
                    { emoji: "🗣️", label: "English circle" },
                  ].map((lane) => (
                    <span
                      key={lane.label}
                      role="listitem"
                      className="inline-flex items-center gap-1 rounded-full border border-[#fbbf24]/25 bg-[#fbbf24]/8 px-2 py-1 text-[9px] font-semibold text-[#fbbf24]"
                    >
                      <span aria-hidden="true">{lane.emoji}</span>
                      {lane.label}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 3: Arena Lounges — a2030 holo panel */}
              <article className="a2030-holo-panel overflow-hidden rounded-[1.25rem] border border-[#f5c842]/40 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f5c842]/40 bg-[#f5c842]/15 text-xs">🏟️</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f5c842]">Arena Lounges</p>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                  {["Elders Table", "Pair League", "Comedy Fest", "Football Lads", "Int'l SUITE", "Island HUB"].map((lounge) => (
                    <span key={lounge} className="rounded-md border border-[#f5c842]/20 bg-[#f5c842]/8 px-2 py-1 text-[9px] font-semibold text-[#8fa3bf]">
                      {lounge}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 4: Operator Status — a2030 holo panel */}
              <article className="a2030-holo-panel overflow-hidden rounded-[1.25rem] border border-[#00c9a7]/40 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00c9a7]/40 bg-[#00c9a7]/15 text-xs">⚡</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00c9a7]">Operator Status</p>
                </div>
                <p className="mt-2.5 text-[11px] leading-5 text-[#d8deef]">
                  12 front slots · 12 back slots · 12hr rotation. Production keys off until connected.
                </p>
                <p className="mt-2 inline-flex rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
                  Owner view active
                </p>
              </article>

              {/* Card 5: Master Key */}
              <article className="command-center-room-panel rounded-xl border border-[#b8ff3c]/25 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#b8ff3c]/30 bg-[#b8ff3c]/10 text-xs">🔑</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#b8ff3c]">Master Key</p>
                </div>
                <div className="mt-2.5">
                  <ArenaMasterKeyPanel />
                </div>
              </article>

              {/* Card 6: Registry Admin — compact */}
              <article className="a2030-holo-panel overflow-hidden rounded-[1.25rem] border border-[#ff2bd6]/40 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#ff2bd6]/40 bg-[#ff2bd6]/15 text-xs">📋</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff2bd6]">Registry Admin</p>
                </div>
                <p className="mt-2 text-[10px] leading-4 text-[#d8deef]">
                  Arena registry · Member + women creator database
                </p>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded-md border border-[#ff2bd6]/20 bg-[#ff2bd6]/8 px-2 py-1 text-[9px] font-semibold text-[#ff2bd6]">Members</span>
                  <span className="rounded-md border border-[#ff2bd6]/20 bg-[#ff2bd6]/8 px-2 py-1 text-[9px] font-semibold text-[#ff2bd6]">Creators</span>
                  <span className="rounded-md border border-[#ff2bd6]/20 bg-[#ff2bd6]/8 px-2 py-1 text-[9px] font-semibold text-[#ff2bd6]">Data</span>
                </div>
              </article>

              {/* Card 7: UK Teacher Live Rates */}
              <article className="command-center-room-panel rounded-xl border border-[#d7b46a]/25 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d7b46a]/30 bg-[#d7b46a]/10 text-xs">💰</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d7b46a]">UK Teacher Rates</p>
                </div>
                <div className="mt-2.5">
                  <LiveSlotMarketRateCard countryId="uk" title="5% below public reference" />
                </div>
              </article>

              {/* Card 8: UK Room Archive */}
              <article className="command-center-room-panel rounded-xl border border-[#00f5ff]/20 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 text-xs">📁</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00f5ff]">UK Room Archive</p>
                </div>
                <div className="mt-2.5">
                  <CommandCenterUkRoomArchive />
                </div>
              </article>

              {/* Card 9: Firebase Infrastructure */}
              <article className="command-center-room-panel rounded-xl border border-[#00c9a7]/20 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00c9a7]/30 bg-[#00c9a7]/10 text-xs">🔥</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00c9a7]">Firebase Infra</p>
                </div>
                <div className="mt-2.5">
                  <CommandCenterFirebaseInfrastructure />
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
