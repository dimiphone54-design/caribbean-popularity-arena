"use client";

import { useEffect, useState } from "react";
import { ColombiaRoomAccessStatus } from "@/components/colombia-room-access-status";
import { ColombiaRoomBackgroundSlideshow } from "@/components/colombia-room-background-slideshow";
import { ColombiaRoomLiveVenues } from "@/components/colombia-room-live-venues";
import { ColombiaRoomLiveSlots } from "@/components/colombia-room-live-slots";
import { ColombiaRoomSlotTopicsScroll } from "@/components/colombia-room-slot-topics-scroll";
import { ColombiaRoomRomanticAtmosphere } from "@/components/colombia-room-romantic-atmosphere";
import { ColombiaRoomSlideshow } from "@/components/colombia-room-slideshow";
import { ColombiaRoomSpotlightPhotos } from "@/components/colombia-room-spotlight-photos";
import { ColombiaRoomGamesPanel } from "@/components/colombia-room-games-panel";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { defaultColombiaTrendingTopicId, findColombiaTrendingTopic } from "@/lib/live-creator-session";
import { defaultColombiaLiveVenueId, findColombiaLiveVenue } from "@/lib/colombia-live-venues";
import { getColombiaTopicLiveSlot, getColombiaVenueLiveSlot } from "@/lib/colombia-room-live";
import { translateColombiaTopic, translateColombiaVenue } from "@/lib/room-translations";

const COLOMBIA_ROOM_SLUG = "colombia-room";
const COLOMBIA_ROOM_BG = "#0d0104";

export function ColombiaRoomPage() {
  const { locale, t } = useRoomLocale();
  const copy = t.colombia;
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
      >
        <ColombiaRoomBackgroundSlideshow />
        <ColombiaRoomRomanticAtmosphere />

        <div className="relative z-10 min-h-dvh" style={{ minHeight: "100dvh" }}>
          <div className="mx-auto max-w-6xl px-4 pb-56 pt-[11.5rem] sm:px-6 sm:pt-28">
            <header className="colombia-romantic-header border-b border-[#fb7185]/15 pb-6 text-center sm:pb-8">
              <h1 className="colombia-romantic-title-wrap mt-3 text-3xl md:text-5xl">
                <span className="colombia-romantic-title">{copy.title}</span>{" "}
                <span className="colombia-romantic-title-flag" aria-hidden="true">
                  🇨🇴
                </span>
              </h1>
              <p className="colombia-romantic-quote colombia-handwriting-soft mx-auto mt-3 max-w-xl text-base italic leading-7 text-[#fecdd3] sm:text-lg md:text-xl">
                &ldquo;{copy.tagline}&rdquo;
              </p>
              <ColombiaRoomAccessStatus roomSlug={COLOMBIA_ROOM_SLUG} countryName="Colombia" flag="🇨🇴" />
            </header>

            <div className="colombia-room-body mx-auto flex w-full max-w-6xl flex-col pt-6 sm:pt-8">
              <section className="country-room-section colombia-room-live-slots-section w-full">
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4">
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

                <div className="mt-3">
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

              <DropshipMarketPanel
                countryId="colombia"
                countryName="Colombia"
                flag="🇨🇴"
                layout="room"
              />
              <div className="country-room-section w-full">
                <ColombiaRoomGamesPanel />
              </div>
            </div>
          </div>

          <section className="colombia-romantic-slideshow-section order-3 border-y border-[#fb7185]/15 px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <ColombiaRoomSpotlightPhotos />
              <ColombiaRoomSlideshow />
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
