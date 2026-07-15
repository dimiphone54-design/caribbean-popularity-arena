"use client";

import { useState } from "react";
import { cotswoldsLondonParkGirls } from "@/lib/cotswolds";

export function UkRoomGamesTabPanel() {
  const [sim, setSim] = useState<{ name: string; host: string } | null>(null);

  return (
    <div className="a2030-holo-panel scroll-mt-24 rounded-[1.25rem] border border-[#b8ff3c]/20 p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
          🇬🇧 UK park games
        </p>
        <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#b8ff3c]" />
      </div>
      <div className="mt-3 space-y-1.5" role="list">
        {cotswoldsLondonParkGirls.map((member, index) => {
          const parts = member.game.split("·");
          const orderTag = parts.length > 1 ? parts[0].trim() : `Game ${index + 1}`;
          const gameName = (parts.length > 1 ? parts.slice(1).join("·") : member.game).trim();
          const ready = 46 + ((member.id * 13) % 48);
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => setSim({ name: gameName, host: member.name.split(" ")[0] })}
              className="flex w-full items-center gap-2 rounded-lg border border-white/5 bg-[#0a0010]/50 px-3 py-2 text-left transition hover:border-[#b8ff3c]/25 hover:bg-[#b8ff3c]/5"
            >
              <span className="text-lg" aria-hidden="true">{member.flag}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold text-[#fef9c3]">{gameName}</span>
                <span className="block text-[10px] text-[#8fa3c4]">{member.name.split(" ")[0]} · {member.area}</span>
              </span>
              <span className="shrink-0 rounded-full bg-[#b8ff3c]/10 px-2 py-0.5 text-[9px] font-bold text-[#b8ff3c]">
                {ready}% ready
              </span>
            </button>
          );
        })}
      </div>

      {sim ? (
        <div className="mt-2 rounded-xl border border-[#b8ff3c]/20 bg-[#b8ff3c]/5 p-3 text-center">
          <p className="text-[11px] font-bold text-[#fef9c3]">{sim.name}</p>
          <p className="mt-0.5 text-[9px] text-[#8fa3c4]">{sim.host}</p>
          <button
            type="button"
            onClick={() => setSim(null)}
            className="mt-1.5 rounded-full bg-[#b8ff3c]/10 px-3 py-1 text-[9px] font-bold text-[#b8ff3c] hover:bg-[#b8ff3c]/20"
          >
            PLAY · {sim.host.split("·")[0].trim()}
          </button>
        </div>
      ) : null}
    </div>
  );
}
