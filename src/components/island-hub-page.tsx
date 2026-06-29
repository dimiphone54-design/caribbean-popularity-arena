"use client";

import { useEffect, useState } from "react";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { ArenaLoungeFrostBadge, ArenaLoungeFrostPanel } from "@/components/arena-lounge-frost-panel";
import { CountryEntryRow } from "@/components/country-entry-row";
import { SiteFooter } from "@/components/site-footer";
import { islandHubAutoPath, islandHubQuote } from "@/lib/hub-copy";
import { formatArenaGiftAmount, arenaGiftCopy } from "@/lib/arena-gifts";
import { grantIslandHubAccess, hasIslandHubAccess, islandHubEntryUsd } from "@/lib/room-access";
import { registeredWomen } from "@/lib/registered-women";

export function IslandHubPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [autoUrl, setAutoUrl] = useState(islandHubAutoPath);
  const previewWomen = registeredWomen.slice(0, 2);

  useEffect(() => {
    setAutoUrl(`${window.location.origin}${islandHubAutoPath}`);
    setUnlocked(hasIslandHubAccess());
  }, []);

  const handleEntry = () => {
    grantIslandHubAccess();
    setUnlocked(true);
  };

  return (
    <>
      <main className="arena-2030 relative min-h-screen overflow-hidden">
        <Arena2030Backdrop intensity="deep" />

        <div className="relative z-10 px-4 pt-[11.5rem] sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Arena2030Header
              title="ISLAND HUB"
              description="The central holo-lounge — registered women, island flags, and men's entry wired for the 2030 arena."
            />

            <ArenaLoungeFrostBadge />

            <ArenaLoungeFrostPanel className="a2030-transmission relative mt-8 overflow-hidden rounded-[1.5rem] p-6 sm:p-8">
              <p className="a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">Transmission // the quote</p>
              <p className="mt-4 font-['Orbitron',sans-serif] text-2xl leading-tight tracking-[0.06em] text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#eef6ff] to-[#ff2bd6] sm:text-3xl">
                &ldquo;{islandHubQuote}&rdquo;
              </p>
            </ArenaLoungeFrostPanel>

            <ArenaLoungeFrostPanel className="a2030-holo-panel mt-4 rounded-2xl p-4">
              <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff] sm:text-xs">Auto URL</p>
              <code className="mt-2 block truncate text-sm font-semibold text-[#eef6ff]">{autoUrl}</code>
            </ArenaLoungeFrostPanel>

            {!unlocked ? (
              <ArenaLoungeFrostPanel className="a2030-holo-panel mt-6 rounded-[1.75rem] p-6 sm:p-8">
                <p className="text-lg font-black text-white">
                  Men&apos;s {formatArenaGiftAmount(islandHubEntryUsd)} entry · view all {registeredWomen.length} registered women
                </p>
                <button
                  type="button"
                  onClick={handleEntry}
                  className="a2030-cta a2030-micro mt-5 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-[0.12em] transition"
                >
                  {arenaGiftCopy.sendGift} · Island HUB
                </button>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {previewWomen.map((woman) => (
                    <div key={woman.id} className="relative rounded-2xl border border-white/10 bg-black/30 p-4 blur-[2px]">
                      <div className="absolute inset-0 grid place-items-center bg-[#03040c]/70 text-xs font-black uppercase text-[#7a82a8]">
                        Preview locked
                      </div>
                      <p className="text-sm font-black text-white">{woman.name}</p>
                    </div>
                  ))}
                </div>
              </ArenaLoungeFrostPanel>
            ) : (
              <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {registeredWomen.map((woman) => (
                  <ArenaLoungeFrostPanel key={woman.id} className="a2030-holo-panel rounded-2xl p-4">
                    <p className="text-lg font-black text-white">{woman.name}</p>
                    <p className="text-xs text-[#00f5ff]">
                      Age {woman.age} · {woman.category}
                    </p>
                    <div className="mt-2 rounded-xl border border-white/10 bg-[#03040c]/80 p-2">
                      <CountryEntryRow country={woman.country} flag={woman.flag} />
                    </div>
                  </ArenaLoungeFrostPanel>
                ))}
              </section>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
