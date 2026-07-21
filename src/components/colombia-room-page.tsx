"use client";

import { useEffect, useState } from "react";
import { ColombiaRoomAccessStatus } from "@/components/colombia-room-access-status";
import { ColombiaRoomBackgroundSlideshow } from "@/components/colombia-room-background-slideshow";
import { ColombiaRoomLiveVenues } from "@/components/colombia-room-live-venues";
import { ColombiaRoomLiveSlots } from "@/components/colombia-room-live-slots";
import { ColombiaRoomSlotTopicsScroll } from "@/components/colombia-room-slot-topics-scroll";
import { ColombiaRoomRomanticAtmosphere } from "@/components/colombia-room-romantic-atmosphere";
import { ArenaSlotDropshipTab, COLOMBIA_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { COLOMBIA_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { COLOMBIA_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { ArenaSlotAiPowerhouseTab } from "@/components/arena-slot-ai-powerhouse-tab";
import { COLOMBIA_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { COLOMBIA_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
import { ColombiaRoomFashionTabPanel } from "@/components/colombia-room-fashion-tab-panel";
import { ColombiaRoomFoodTabPanel } from "@/components/colombia-room-food-tab-panel";
import { ColombiaRoomGamesTabPanel } from "@/components/colombia-room-games-tab-panel";
import { ColombiaStudyHubTabPanel } from "@/components/colombia-study-hub-tab-panel";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { defaultColombiaTrendingTopicId, findColombiaTrendingTopic } from "@/lib/live-creator-session";
import { defaultColombiaLiveVenueId, findColombiaLiveVenue } from "@/lib/colombia-live-venues";
import { getColombiaTopicLiveSlot, getColombiaVenueLiveSlot } from "@/lib/colombia-room-live";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";
import { isSpanishContentLocale } from "@/lib/room-locale";
import { translateColombiaTopic, translateColombiaVenue } from "@/lib/room-translations";

const COLOMBIA_ROOM_SLUG = "colombia-room";
const COLOMBIA_ROOM_BG = "#0d0104";

export function ColombiaRoomPage() {
  const { locale, t } = useRoomLocale();
  const copy = t.colombia;
  const es = isSpanishContentLocale(locale);
  // Public Colombia → Español (CO) tabs. MASTER detected → English tabs.
  const tabLabels = getArenaSlotTabLabels("CO", { english: !es });
  const [topicId, setTopicId] = useState(defaultColombiaTrendingTopicId);
  const [venueId, setVenueId] = useState(defaultColombiaLiveVenueId);
  const activeTopic = findColombiaTrendingTopic(topicId);
  const activeVenue = findColombiaLiveVenue(venueId);
  const activeTopicCopy = translateColombiaTopic(locale, activeTopic.id, {
    label: activeTopic.label,
    blurb: activeTopic.blurb
  });
  const activeVenueCopy = translateColombiaVenue(locale, activeVenue.id, {
    label: activeVenue.id,
    blurb: ""
  });
  const topicLiveSlot = getColombiaTopicLiveSlot(topicId);
  const venueLiveSlot = getColombiaVenueLiveSlot(venueId);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;

    html.style.backgroundColor = COLOMBIA_ROOM_BG;
    body.style.backgroundColor = COLOMBIA_ROOM_BG;

    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <div
        className="colombia-room-romantic relative min-h-dvh overflow-hidden text-[#fff1f2]"
        style={{ backgroundColor: COLOMBIA_ROOM_BG, minHeight: "100dvh" }}
        lang={es ? "es-CO" : "en"}
      >
        <ColombiaRoomBackgroundSlideshow />
        <ColombiaRoomRomanticAtmosphere />

        <div className="relative z-10 min-h-dvh" style={{ minHeight: "100dvh" }}>
          <div className="colombia-room-content mx-auto max-w-6xl px-3 pb-10 pt-16 sm:px-5 sm:pb-12 sm:pt-20">
            <header className="colombia-romantic-header border-b border-[#fb7185]/15 pb-3 text-center sm:pb-3.5">
              <h1 className="colombia-romantic-title-wrap mt-1 text-3xl md:text-5xl">
                <span className="colombia-romantic-title">{copy.title}</span>{" "}
                <span className="colombia-romantic-title-flag" aria-hidden="true">
                  🇨🇴
                </span>
              </h1>
              <p className="colombia-romantic-quote colombia-handwriting-soft mx-auto mt-1.5 max-w-xl text-sm italic leading-6 text-[#fecdd3] sm:text-base sm:leading-7">
                &ldquo;{copy.tagline}&rdquo;
              </p>
              <ColombiaRoomAccessStatus roomSlug={COLOMBIA_ROOM_SLUG} countryName="Colombia" flag="🇨🇴" />
            </header>

            <div className="colombia-room-body mx-auto flex w-full max-w-6xl flex-col gap-2.5 pt-3 sm:gap-3 sm:pt-3.5">
              <section className="country-room-section colombia-room-live-slots-section w-full">
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:gap-2.5">
                  <ColombiaRoomSlotTopicsScroll
                    compact
                    selectedId={topicId}
                    onSelect={(topic) => setTopicId(topic.id)}
                  />
                  <ColombiaRoomLiveVenues
                    compact
                    selectedId={venueId}
                    onSelect={(venue) => setVenueId(venue.id)}
                  />
                </div>

                <div className="mt-2">
                <CountryRoomLiveAccessGate
                  roomSlug={COLOMBIA_ROOM_SLUG}
                  countryId="colombia"
                  countryName="Colombia"
                  flag="🇨🇴"
                  variant="romantic"
                  hideUnlockedStatus
                >
                  <ColombiaRoomLiveSlots
                    topicId={topicId}
                    venueId={venueId}
                    topicSlot={topicLiveSlot}
                    venueSlot={venueLiveSlot}
                    topicLabel={activeTopicCopy.label}
                    topicBlurb={activeTopicCopy.blurb}
                    topicFlag={activeTopic.flag}
                    venueLabel={activeVenueCopy.label}
                    venueBlurb={activeVenueCopy.blurb}
                    venueEmoji={activeVenue.emoji}
                    tonightKicker={copy.tonightTopicKicker}
                    tonightSession={copy.tonightTopicSession}
                    liveOnAir={copy.liveOnAir}
                    slotTopicTitle={copy.slotTopicTitle}
                    slotVenueTitle={copy.slotVenueTitle}
                    slotTopicCaption={copy.slotTopicCaption}
                    slotVenueCaption={copy.slotVenueCaption}
                  />
                </CountryRoomLiveAccessGate>
                </div>
              </section>

              <ArenaSlotDropshipTab
                mode="room"
                sectionId={COLOMBIA_DROPSHIP_TAB_HASH}
                countryName="Colombia"
                label={tabLabels.dropshipping}
              >
                <DropshipMarketPanel
                  countryId="colombia"
                  countryName="Colombia"
                  flag="🇨🇴"
                  layout="room"
                />
              </ArenaSlotDropshipTab>

              {/* 🎮 Juegos — always-open full panel */}
              <section
                id={COLOMBIA_GAMES_TAB_HASH}
                className="country-room-section colombia-juegos-section w-full scroll-mt-16"
                aria-label={`${tabLabels.games} · Colombia`}
              >
                <ColombiaRoomGamesTabPanel />
              </section>

              {/* 🍽️ Comida — always-open full panel (not a collapse tab) */}
              <section
                id={COLOMBIA_FOOD_TAB_HASH}
                className="country-room-section colombia-comida-section w-full scroll-mt-16"
                aria-label={`${tabLabels.food} · Colombia`}
              >
                <ColombiaRoomFoodTabPanel />
              </section>

              {/* 🤖 AI Powerhouse — middle placement */}
              <section className="w-full px-1" aria-label="AI Powerhouse · Colombia">
                <ArenaSlotAiPowerhouseTab mode="link" label={tabLabels.aiPowerhouse} />
              </section>

              {/* 📚 Centro de estudio — always-open full panel (not a collapse tab) */}
              <section
                id={COLOMBIA_STUDY_HUB_TAB_HASH}
                className="country-room-section colombia-estudio-section w-full scroll-mt-16"
                aria-label={`${tabLabels.studyHub} · Colombia`}
              >
                <ColombiaStudyHubTabPanel />
              </section>

              {/* 👗 Moda — always-open full panel (not a collapse tab) */}
              <section
                id={COLOMBIA_FASHION_TAB_HASH}
                className="country-room-section colombia-moda-section w-full scroll-mt-16"
                aria-label={`${tabLabels.fashion} · Colombia`}
              >
                <ColombiaRoomFashionTabPanel />
              </section>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}