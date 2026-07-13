"use client";

import { useState } from "react";
import {
  fashionMonthLooks,
  fashionMonthMenPrompts,
  fashionMonthPromptResponses,
  type FashionMonthMenPromptId
} from "@/lib/fashion-month";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

const ukFashionLooks = fashionMonthLooks.filter((look) => look.flag === "🇬🇧" || look.city.includes("London"));

const ukFashionLanes = [
  { emoji: "💄", label: "Best Makeup Look · live 3h tournament", hint: "Holland Park · park glam lane" },
  { emoji: "🧥", label: "Street tailoring · London editorial", hint: "Cotswolds mall · ivory blazer fits" },
  { emoji: "👗", label: "Park picnic looks · Hyde Park lane", hint: "Relay day · outdoor style check" },
  { emoji: "🛍️", label: "Cotswolds mall runway · shop the fit", hint: "Fashion Month · UK wired" }
];

/** UK room · fashion looks + style prompts inside Fashion tab */
export function UkRoomFashionTabPanel() {
  const [selectedPrompt, setSelectedPrompt] = useState<FashionMonthMenPromptId | null>(null);
  const activePrompt = fashionMonthMenPrompts.find((prompt) => prompt.id === selectedPrompt);

  return (
    <div className="uk-room-fashion-tab-panel space-y-5">
      <section className={`uk-room-fashion-panel ${UK_ROOM_PANEL}`} aria-label="United Kingdom fashion">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            UK fashion · Cotswolds · London
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            United Kingdom · street couture
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
            Runway energy, park glam, and men&apos;s style prompts wired for the UK room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {ukFashionLanes.map((lane) => (
            <span
              key={lane.label}
              className="cotswolds-extra-game-chip inline-flex max-w-full items-start gap-1.5 rounded-full border border-[#94a3b8]/25 px-3 py-1.5 text-[10px] font-semibold text-[#cbd5e1]"
              role="listitem"
              title={lane.hint}
            >
              <span aria-hidden="true">{lane.emoji}</span>
              <span>{lane.label}</span>
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {ukFashionLooks.map((look) => (
            <span
              key={look.id}
              className="a2030-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#eef6ff] backdrop-blur-sm"
            >
              <span>{look.flag}</span>
              <span>{look.name.split(" ")[0]}</span>
              <span className="text-[#a5b4fc]">· {look.city}</span>
              <span className="text-[#ff2bd6]">· {look.style}</span>
              <span className="text-[#9fb4d4]">· {look.accent}</span>
            </span>
          ))}
        </div>
      </section>

      <section className={UK_ROOM_PANEL}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#ff2bd6] sm:text-xs">
            Style prompts // men&apos;s entry
          </p>
          <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#ff2bd6]" />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {fashionMonthMenPrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => setSelectedPrompt(prompt.id)}
              className={`cotswolds-men-game-dock-link a2030-prompt rounded-lg px-3 py-2 text-left${
                selectedPrompt === prompt.id ? " ring-1 ring-[#ff2bd6]/45" : ""
              }`}
            >
              <span className="cotswolds-men-game-dock-link-title">{prompt.label}</span>
            </button>
          ))}
        </div>
        {activePrompt ? (
          <p className="mt-4 text-sm leading-7 text-[#b8c9e8]">{fashionMonthPromptResponses[activePrompt.id]}</p>
        ) : null}
      </section>
    </div>
  );
}