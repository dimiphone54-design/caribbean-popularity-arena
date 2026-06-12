"use client";

import { useState } from "react";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { SiteFooter } from "@/components/site-footer";
import {
  comedyFestGames,
  comedyMenPrompts,
  comedyPromptResponses,
  type ComedyMenPromptId
} from "@/lib/comedy-fest";

function ComedyAvatar({
  portrait,
  icon
}: {
  portrait: (typeof comedyFestGames)[number]["portrait"];
  icon: string;
}) {
  return (
    <div className="relative mx-auto h-16 w-12">
      <span
        className="absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 rounded-full"
        style={{ backgroundColor: portrait.hair }}
      />
      <span
        className="absolute left-1/2 top-5 h-8 w-9 -translate-x-1/2 rounded-t-[999px]"
        style={{ backgroundColor: portrait.skin }}
      />
      <span
        className="absolute bottom-0 left-1/2 h-7 w-11 -translate-x-1/2 rounded-b-xl"
        style={{ background: `linear-gradient(135deg, ${portrait.outfit}, ${portrait.accent})` }}
      />
      <span className="absolute -right-1 top-8 text-sm">{icon}</span>
    </div>
  );
}

export function ComedyFestPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<ComedyMenPromptId | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const activePrompt = comedyMenPrompts.find((prompt) => prompt.id === selectedPrompt);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden pb-56">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(255,92,43,0.12),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(245,200,66,0.1),transparent_30%),linear-gradient(180deg,#12091f_0%,#0a0e1f_45%,#08101a_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <RoomBackToArena />

            <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-[#ff5c2b]">
              Category lounge · Room #4 · Comedy Fest
            </p>
            <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.06em] text-[#f7efe0] sm:text-6xl">
              Comedy Fest
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b8c9e1]">
              Ten Caribbean women running ten games in the backdrop — laughing loud, playing characters, and keeping the
              room alive.
            </p>

            <section className="mt-8 rounded-[1.75rem] border border-[#f5c842]/20 bg-[#0a0e1f]/55 p-4 backdrop-blur-sm sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f5c842]">
                Backdrop · 10 games · 10 happy players
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {comedyFestGames.map((player) => (
                  <article
                    key={player.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3 text-center transition hover:border-[#f5c842]/35 hover:bg-black/45"
                    style={{ backgroundImage: player.avatarGradient }}
                  >
                    <div className="absolute inset-0 bg-[#0a0e1f]/72" />
                    <div className="relative z-10">
                      <ComedyAvatar portrait={player.portrait} icon={player.avatarIcon} />
                      <p className="mt-2 text-sm font-black text-white">{player.name}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#f5c842]">
                        <span>{player.country}</span>
                        <span>{player.flag}</span>
                      </p>
                      <p className="mt-2 rounded-full border border-[#00c9a7]/30 bg-[#00c9a7]/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#9ff7df]">
                        {player.game}
                      </p>
                      <p className="mt-2 text-lg" aria-hidden="true">
                        😂
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {activePrompt ? (
              <section className="mt-6 rounded-[1.5rem] border border-[#00c9a7]/25 bg-[#00c9a7]/8 p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00c9a7]">Your pick</p>
                <p className="mt-2 text-lg font-black text-white">{activePrompt.label}</p>
                <p className="mt-3 text-sm leading-7 text-[#d8deef]">
                  {comedyPromptResponses[activePrompt.id]}
                </p>
              </section>
            ) : null}
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#f5c842]/25 bg-[#0a0e1f]/95 shadow-[0_-20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5c842]">Men&apos;s entry</p>
                <p className="text-sm text-[#b8c9e1]">Drop low — pick how you want to play</p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen((open) => !open)}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#f7e7aa]"
              >
                {panelOpen ? "Hide" : "Show"}
              </button>
            </div>

            {panelOpen ? (
              <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pb-1">
                {comedyMenPrompts.map((prompt) => {
                  const active = selectedPrompt === prompt.id;
                  return (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => setSelectedPrompt(prompt.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        active
                          ? "border-[#f5c842] bg-[#f5c842]/15 text-[#fff4c2]"
                          : "border-white/10 bg-[#111830]/80 text-[#f0edf8] hover:border-[#f5c842]/35 hover:bg-[#151d35]"
                      }`}
                    >
                      {prompt.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
