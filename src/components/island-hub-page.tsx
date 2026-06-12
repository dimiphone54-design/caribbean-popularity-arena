"use client";

import { useEffect, useState } from "react";
import { CountryEntryRow } from "@/components/country-entry-row";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { SiteFooter } from "@/components/site-footer";
import { islandHubAutoPath, islandHubQuote } from "@/lib/hub-copy";
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
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <RoomBackToArena />

          <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-[#00c9a7]">Caribbean Popularity Arena · Room #1</p>
          <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.06em] text-[#f7efe0] sm:text-6xl">Island HUB</h1>

          <blockquote className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-[#f5c842]/25 bg-gradient-to-br from-[#1a1030]/80 via-[#08101f] to-[#0a0e1f] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f5c842]">The quote</p>
            <p className="mt-4 font-['Bebas_Neue',sans-serif] text-3xl leading-tight tracking-[0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#f7e7aa] via-[#f5c842] to-[#ff5c2b] sm:text-4xl">
              &ldquo;{islandHubQuote}&rdquo;
            </p>
          </blockquote>

          <div className="mt-4 rounded-2xl border border-[#00c9a7]/25 bg-[#00c9a7]/5 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00c9a7]">Auto URL</p>
            <code className="mt-2 block truncate text-sm font-semibold text-[#f7e7aa]">{autoUrl}</code>
          </div>

          {!unlocked ? (
            <section className="mt-6 rounded-[1.75rem] border border-[#ff5c2b]/30 bg-[#ff5c2b]/10 p-6 sm:p-8">
              <p className="text-lg font-black text-white">Men&apos;s ${islandHubEntryUsd} entry · view all {registeredWomen.length} registered women</p>
              <button type="button" onClick={handleEntry} className="mt-5 rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-6 py-3 text-sm font-black text-[#0a0e1f]">
                Unlock Island HUB
              </button>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {previewWomen.map((woman) => (
                  <div key={woman.id} className="relative rounded-2xl border border-white/10 bg-black/30 p-4 blur-[2px]">
                    <div className="absolute inset-0 grid place-items-center bg-[#0a0e1f]/60 text-xs font-black uppercase text-[#7a82a8]">Preview locked</div>
                    <p className="text-sm font-black text-white">{woman.name}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {registeredWomen.map((woman) => (
                <article key={woman.id} className="rounded-2xl border border-[#f5c842]/20 bg-black/25 p-4">
                  <p className="text-lg font-black text-white">{woman.name}</p>
                  <p className="text-xs text-[#f5c842]">Age {woman.age} · {woman.category}</p>
                  <div className="mt-2 rounded-xl border border-white/10 bg-[#050814]/80 p-2">
                    <CountryEntryRow country={woman.country} flag={woman.flag} />
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
