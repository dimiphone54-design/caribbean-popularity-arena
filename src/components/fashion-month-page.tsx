"use client";

import { useState } from "react";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { ArenaLoungeFrostBadge, ArenaLoungeFrostPanel } from "@/components/arena-lounge-frost-panel";
import { SiteFooter } from "@/components/site-footer";
import {
  fashionMonthLooks,
  fashionMonthMenPrompts,
  fashionMonthPromptResponses,
  fashionMonthRegions,
  fashionMonthRoomDescription,
  type FashionMonthMenPromptId
} from "@/lib/fashion-month";

export function FashionMonthPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<FashionMonthMenPromptId | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const activePrompt = fashionMonthMenPrompts.find((prompt) => prompt.id === selectedPrompt);

  return (
    <>
      <main className="arena-2030 arena-2030-fashion-month relative min-h-screen overflow-hidden pb-56">
        <Arena2030Backdrop
          image="/cotswolds-mall-backdrop.png"
          imageOpacity="opacity-[0.36] sm:opacity-[0.42]"
          intensity="deep"
          photoFocus
        />
        <div className="fashion-month-glow pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

        <div className="relative z-10 px-4 pt-[11.5rem] sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Arena2030Header
              liveBadge="Runway · Live"
              title="FASHION MONTH"
              titleJump
              description={fashionMonthRoomDescription}
            />

            <ArenaLoungeFrostBadge />

            <ArenaLoungeFrostPanel className="a2030-holo-panel mt-8 rounded-[1.75rem] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="a2030-micro text-[10px] font-bold uppercase text-[#ff2bd6] sm:text-xs">
                  Looks // {fashionMonthLooks.length} profiles // {fashionMonthRegions}
                </p>
                <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#ff2bd6]" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {fashionMonthLooks.map((look) => (
                  <span
                    key={look.id}
                    className="a2030-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#eef6ff] backdrop-blur-sm"
                  >
                    <span>{look.flag}</span>
                    <span>{look.name.split(" ")[0]}</span>
                    <span className="text-[#a5b4fc]">· {look.city.split(" ")[0]}</span>
                    <span className="text-[#ff2bd6]">· {look.style}</span>
                  </span>
                ))}
              </div>
            </ArenaLoungeFrostPanel>

            {activePrompt ? (
              <ArenaLoungeFrostPanel className="a2030-transmission mt-6 rounded-[1.5rem] p-5 backdrop-blur-md">
                <p className="a2030-micro text-[10px] font-bold uppercase text-[#ff2bd6] sm:text-xs">
                  Transmission // your pick
                </p>
                <p className="mt-2 text-lg font-black text-white">{activePrompt.label}</p>
                <p className="mt-3 text-sm leading-7 text-[#b8c9e8]">{fashionMonthPromptResponses[activePrompt.id]}</p>
              </ArenaLoungeFrostPanel>
            ) : null}
          </div>
        </div>

        <ArenaLoungeFrostPanel as="div" className="a2030-dock fixed inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="a2030-micro text-[10px] font-bold uppercase text-[#ff2bd6] sm:text-xs">
                  Men&apos;s entry // fashion month
                </p>
                <p className="text-sm text-[#9fb4d4]">Pick your style prompt — holo replies live below</p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen((open) => !open)}
                className="a2030-micro rounded-lg border border-[#ff2bd6]/30 bg-[#ff2bd6]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ffb8ef] transition hover:border-[#00f5ff]/45 hover:text-[#00f5ff] sm:text-xs"
              >
                {panelOpen ? "Hide" : "Show"}
              </button>
            </div>

            {panelOpen ? (
              <div className="mt-3 max-h-52 space-y-2 overflow-y-auto pb-1">
                {fashionMonthMenPrompts.map((prompt) => {
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
        </ArenaLoungeFrostPanel>
      </main>
      <SiteFooter />
    </>
  );
}
