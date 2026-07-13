"use client";

import { useState } from "react";
import { CotswoldsAtmosphereOverlay } from "@/components/cotswolds-atmosphere-overlay";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { CotswoldsParkVideoBackdrop } from "@/components/cotswolds-park-video-backdrop";
import { FreedomDriveSimulatorLazy } from "@/components/freedom-drive/freedom-drive-simulator-lazy";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { ArenaSlotFashionTab } from "@/components/arena-slot-fashion-tab";
import { ArenaSlotFoodTab } from "@/components/arena-slot-food-tab";
import { ArenaSlotStudyHubTab } from "@/components/arena-slot-study-hub-tab";
import { CountryRoomStudyHubTabPanel } from "@/components/country-room-study-hub-tab-panel";
import { UkRoomFoodTabPanel } from "@/components/uk-room-food-tab-panel";
import { ArenaSlotGamesTab } from "@/components/arena-slot-games-tab";
import { UkRoomFashionTabPanel } from "@/components/uk-room-fashion-tab-panel";
import { UkFootballHubStack } from "@/components/uk-football-hub-stack";
import { UkRoomGamesTabPanel } from "@/components/uk-room-games-tab-panel";
import { UkRoomCornerScroll } from "@/components/uk-room-corner-scroll";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { UkRoomHorizontalTitle } from "@/components/uk-wind-flag";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";
import { cotswoldsMenActivityPanels } from "@/lib/cotswolds";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

export function CotswoldsPage() {
  const { t } = useRoomLocale();
  const uk = t.uk;
  const tabLabels = getArenaSlotTabLabels("UK");
  /** Men's dock · exact 1-click open / 1-click close */
  const [panelOpen, setPanelOpen] = useState(false);
  const [menSim, setMenSim] = useState<{ name: string; host: string } | null>(null);
  const [driveExpanded, setDriveExpanded] = useState(false);

  const toggleMenPanel = () => {
    setPanelOpen((open) => !open);
  };

  return (
    <>
      <main className="arena-2030 arena-2030-cotswolds relative flex min-h-screen flex-col overflow-x-hidden pb-56">
        <UkRoomCornerScroll hidden={driveExpanded} />

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

            <figure className="cotswolds-museum-box country-room-section">
              <div className="cotswolds-museum-box-inner">
                <figcaption className="cotswolds-museum-box-label">{uk.cotswoldsMuseumLabel}</figcaption>
                <p className="cotswolds-museum-box-text">{uk.cotswoldsDescription}</p>
              </div>
            </figure>

            <UkFootballHubStack countryId="uk" countryName="United Kingdom" flag="🇬🇧" />

            <section className="country-room-section w-full">
              <div className="ai-real-slot-slot-tabs uk-room-country-tabs">
                <ArenaSlotGamesTab mode="room" countryName="United Kingdom" label={tabLabels.games}>
                  <UkRoomGamesTabPanel />
                </ArenaSlotGamesTab>
                <ArenaSlotFashionTab mode="room" countryName="United Kingdom" label={tabLabels.fashion}>
                  <UkRoomFashionTabPanel />
                </ArenaSlotFashionTab>
                <ArenaSlotFoodTab mode="room" countryName="United Kingdom" label={tabLabels.food}>
                  <UkRoomFoodTabPanel />
                </ArenaSlotFoodTab>
                <ArenaSlotStudyHubTab mode="room" countryName="United Kingdom" label={tabLabels.studyHub}>
                  <CountryRoomStudyHubTabPanel countryId="uk" />
                </ArenaSlotStudyHubTab>
              </div>
            </section>

            <section className={UK_ROOM_PANEL} aria-label="Freedom Drive Simulator">
              <FreedomDriveSimulatorLazy
                embedInRoom
                expanded={driveExpanded}
                onToggleExpand={() => setDriveExpanded((open) => !open)}
              />
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
