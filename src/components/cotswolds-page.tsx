"use client";

import { useState } from "react";
import Image from "next/image";
import { CotswoldsAtmosphereOverlay } from "@/components/cotswolds-atmosphere-overlay";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { CotswoldsParkVideoBackdrop } from "@/components/cotswolds-park-video-backdrop";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { ukFoodScenes, ukFoodLanes } from "@/components/uk-room-food-tab-panel";
import { UkFashionPanel } from "@/components/uk-fashion-panel";
import { UkFootballHubStack } from "@/components/uk-football-hub-stack";
import { UkRoomCornerScroll } from "@/components/uk-room-corner-scroll";
import { UKStudyHubTeacherLiveSlot } from "@/components/uk-study-hub-teacher-live-slot";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { UkRoomHorizontalTitle } from "@/components/uk-wind-flag";
import { cotswoldsLondonParkGirls, cotswoldsMenActivityPanels } from "@/lib/cotswolds";

export function CotswoldsPage() {
  const { t } = useRoomLocale();
  const uk = t.uk;
  /** Men's dock · exact 1-click open / 1-click close */
  const [panelOpen, setPanelOpen] = useState(false);
  const [menSim, setMenSim] = useState<{ name: string; host: string } | null>(null);

  const toggleMenPanel = () => {
    setPanelOpen((open) => !open);
  };

  return (
    <>
      <main className="arena-2030 arena-2030-cotswolds relative flex min-h-screen flex-col overflow-x-hidden pb-16">
        <UkRoomCornerScroll />

        <div className="relative z-10">
          <RoomCountryPageShell topPadding="compact">
            <header className="cotswolds-hero-stack">
              <div className="cotswolds-room-intro">
                <div className="cotswolds-room-header-band">
                  <h1 className="cotswolds-room-header-overlay" aria-label="United Kingdom">
                    <UkRoomHorizontalTitle text="United Kingdom" />
                  </h1>
                </div>
                <div className="cotswolds-quote-row">
                  <p className="cotswolds-quote-text a2030-micro text-[10px] font-bold sm:text-xs">
                    &quot;Oi, Have you seen where that bird went, Or did she head down the road, my duck.&quot;
                  </p>
                  <span className="a2030-live a2030-micro inline-flex shrink-0 items-center gap-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/8 px-3 py-1 text-[10px] font-bold uppercase text-[#b8ff3c]">
                    <span className="a2030-pulse-ring inline-flex h-1.5 w-1.5 rounded-full bg-[#b8ff3c]" />
                    {uk.cotswoldsSeasonsLive}
                  </span>
                </div>
              </div>

              <div className="cotswolds-slideshow-shell">
                <div className="cotswolds-slideshow-stage cotswolds-slideshow-stage--below-quote">
                  <CotswoldsParkVideoBackdrop />
                  <CotswoldsAtmosphereOverlay />
                  <div className="cotswolds-slideshow-border" aria-hidden="true" />
                </div>
              </div>
            </header>

            {/* ── UK Study Hub · standalone panel ── */}
            <section
              className="country-room-section relative overflow-hidden rounded-[1.25rem] border border-[#fbbf24]/20"
              aria-label="UK Study Hub"
              style={{
                backgroundImage: "url('/uk-study-hub-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#020c06]/40" aria-hidden="true" />
              <div className="relative z-10 p-3">
                <div className="flex flex-col items-center gap-1">
                  <p className="a2030-electric-flash a2030-micro text-center text-2xl font-black uppercase tracking-wider text-[#fbbf24] sm:text-3xl">
                    📚 UK Study Hub · London · campus lane
                  </p>
                </div>
                <div className="mt-2">
                  <UKStudyHubTeacherLiveSlot />
                </div>
              </div>
            </section>

            <figure className="cotswolds-museum-box country-room-section">
              <div className="cotswolds-museum-box-inner">
                <figcaption className="cotswolds-museum-box-label">{uk.cotswoldsMuseumLabel}</figcaption>
                <p className="cotswolds-museum-box-text">{uk.cotswoldsDescription}</p>
              </div>
            </figure>

            <UkFootballHubStack countryId="uk" countryName="United Kingdom" flag="🇬🇧" />

            {/* ── UK Dropshipping · standalone panel ── */}
            <section className="country-room-section w-full" aria-label="UK Dropshipping market">
              <DropshipMarketPanel
                countryId="uk"
                countryName="United Kingdom"
                flag="🇬🇧"
                layout="room"
              />
            </section>

            {/* ── UK Welcome panel #2 ── */}
            <figure className="cotswolds-museum-box country-room-section">
              <div className="cotswolds-museum-box-inner">
                <p className="cotswolds-quote-text a2030-micro text-[10px] font-bold sm:text-xs">
                  🪵 &quot;NOWT WRONG WI&apos; YA, LOVE? Come in, sit yourself down — don&apos;t be shy! We&apos;ve got the kettle on and a plate of biscuits sorted. Pull up a chair and have a proper chinwag. You&apos;re among friends here, so make yourself at home!&quot;
                </p>
              </div>
            </figure>

            {/* ── UK Park Games · standalone panel ── */}
            <section className="country-room-section w-full" aria-label="UK Park Games">
              <div className="a2030-holo-panel scroll-mt-24 rounded-[1.25rem] border border-[#b8ff3c]/20 p-3 sm:p-4">
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
              </div>
            </section>

            {/* ── UK Food · standalone panel ── */}
            <section className="country-room-section w-full" aria-label="UK Food">
              <div className="a2030-holo-panel scroll-mt-24 rounded-[1.25rem] border border-[#fbbf24]/20 p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#fbbf24] sm:text-xs">
                    🇬🇧 UK food
                  </p>
                  <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#fbbf24]" />
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {ukFoodScenes.map((scene) => (
                    <figure
                      key={scene.id}
                      className="overflow-hidden rounded-xl border border-[#94a3b8]/25 bg-[#0f172a]/70"
                    >
                      <div className="relative aspect-[5/3] w-full">
                        <Image
                          src={scene.imageUrl}
                          alt={scene.label}
                          fill
                          sizes="(max-width: 640px) 100vw, 280px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="px-3 py-2">
                        <p className="text-[11px] font-bold text-[#eef6ff]">{scene.label}</p>
                        <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{scene.caption}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2" role="list">
                  {ukFoodLanes.map((lane) => (
                    <span
                      key={lane.label}
                      className="inline-flex max-w-full items-start gap-1.5 rounded-full border border-[#fbbf24]/25 px-3 py-1.5 text-[10px] font-semibold text-[#fbbf24]"
                      role="listitem"
                      title={lane.hint}
                    >
                      <span aria-hidden="true">{lane.emoji}</span>
                      <span>{lane.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── UK Fashion · standalone panel ── */}
            <section className="country-room-section w-full" aria-label="UK Fashion panel">
              <UkFashionPanel />
            </section>
          </RoomCountryPageShell>
        </div>

        <div className="a2030-dock a2030-dock-glass fixed inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="a2030-uk-flag-flash" aria-hidden="true">
                  🇬🇧
                </span>
                <p className="a2030-uk-title-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
                  Men&apos;s entry // UK games
                </p>
              </div>
              <button
                type="button"
                onClick={toggleMenPanel}
                aria-expanded={panelOpen}
                aria-controls="uk-room-men-panel"
                className={`cotswolds-dock-toggle a2030-micro rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition sm:text-xs${
                  panelOpen
                    ? " cotswolds-dock-toggle--hide a2030-hide-blink"
                    : " border-[#00f5ff]/30 bg-[#00f5ff]/8 text-[#00f5ff] hover:border-[#b8ff3c]/45"
                }`}
              >
                {panelOpen ? (
                  <>
                    <span className="cotswolds-dock-hide-blinker" aria-hidden="true" />
                    Hide
                  </>
                ) : (
                  "Show"
                )}
              </button>
            </div>

            {panelOpen ? (
              <div
                id="uk-room-men-panel"
                className="a2030-men-scroll mt-3 flex max-h-[min(38vh,18rem)] flex-col gap-2 overflow-y-auto overscroll-contain pr-1"
              >
                {cotswoldsMenActivityPanels.map((panel) => (
                  <button
                    key={panel.id}
                    type="button"
                    onClick={() => setMenSim({ name: panel.simGame, host: panel.simHost })}
                    className="cotswolds-men-game-dock-link a2030-prompt rounded-lg px-3 py-2 text-left"
                  >
                    <span className="cotswolds-men-game-dock-link-title">{panel.title}</span>
                    <span className="cotswolds-men-game-dock-link-question">{panel.question}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>
      {menSim ? (
        <CotswoldsGameSimulator
          gameName={menSim.name}
          host={menSim.host}
          roomKicker="Men's entry · UK games · live"
          onClose={() => setMenSim(null)}
        />
      ) : null}
      <SiteFooter />
    </>
  );
}
