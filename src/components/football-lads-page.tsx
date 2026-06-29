"use client";

import { useState } from "react";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { FootballPredictionArena } from "@/components/football-prediction/football-prediction-arena";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import {
  footballLads,
  footballLadsMenPrompts,
  footballLadsPromptResponses,
  footballLadsRegions,
  type FootballLadsMenPromptId
} from "@/lib/football-lads";

export function FootballLadsPage() {
  const { t } = useRoomLocale();
  const uk = t.uk;
  const [selectedPrompt, setSelectedPrompt] = useState<FootballLadsMenPromptId | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const activePrompt = footballLadsMenPrompts.find((prompt) => prompt.id === selectedPrompt);

  return (
    <>
      <main className="arena-2030 arena-2030-football-lads relative min-h-screen overflow-hidden">
        <Arena2030Backdrop
          image="/cotswolds-greenwich-park-london.png"
          imageOpacity="opacity-[0.34] sm:opacity-[0.4]"
          intensity="deep"
          photoFocus
        />
        <div className="football-lads-pitch-stripes pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <Arena2030Header
              liveBadge={uk.footballMatchDay}
              title="FOOTBALL LADS"
              titleJump
              description={uk.footballLadsDescription}
            />

            <CountryRoomLiveAccessGate
              roomSlug="football-lads"
              countryId="uk"
              countryName="United Kingdom"
              flag="🇬🇧"
            >
              <section className="country-room-section a2030-holo-panel rounded-[1.75rem] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
                    Squad // {footballLads.length} lads // {footballLadsRegions}
                  </p>
                  <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#b8ff3c]" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {footballLads.map((lad) => (
                    <span
                      key={lad.id}
                      className="a2030-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#eef6ff] backdrop-blur-sm"
                    >
                      <span>{lad.flag}</span>
                      <span>{lad.name.split(" ")[0]}</span>
                      <span className="text-[#a5b4fc]">· {lad.city}</span>
                      <span className="text-[#b8ff3c]">· {lad.position}</span>
                    </span>
                  ))}
                </div>
              </section>

              <section className="country-room-section a2030-holo-panel rounded-[1.75rem] border border-[#b8ff3c]/35 p-4 sm:p-6">
                <FootballPredictionArena countryId="uk" countryName="United Kingdom" flag="🇬🇧" />
              </section>
            </CountryRoomLiveAccessGate>

            <DropshipMarketPanel
              countryId="uk"
              countryName="United Kingdom"
              flag="🇬🇧"
              layout="room"
            />

            {activePrompt ? (
              <section className="country-room-section a2030-transmission rounded-[1.5rem] p-5 backdrop-blur-md">
                <p className="a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
                  Transmission // your pick
                </p>
                <p className="mt-2 text-lg font-black text-white">{activePrompt.label}</p>
                <p className="mt-3 text-sm leading-7 text-[#b8c9e8]">{footballLadsPromptResponses[activePrompt.id]}</p>
              </section>
            ) : null}
          </RoomCountryPageShell>
        </div>

        <div className="a2030-dock fixed inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
                  Men&apos;s entry // football lads
                </p>
                <p className="text-sm text-[#9fb4d4]">Pick your match-day prompt — holo replies live below</p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen((open) => !open)}
                className="a2030-micro rounded-lg border border-[#b8ff3c]/30 bg-[#b8ff3c]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b8ff3c] transition hover:border-[#00f5ff]/45 hover:text-[#00f5ff] sm:text-xs"
              >
                {panelOpen ? "Hide" : "Show"}
              </button>
            </div>

            {panelOpen ? (
              <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pb-1">
                {footballLadsMenPrompts.map((prompt) => {
                  const active = selectedPrompt === prompt.id;
                  return (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => setSelectedPrompt(prompt.id)}
                      className={`a2030-prompt w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                        active ? "a2030-prompt-active" : "text-[#eef4ff]"
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
