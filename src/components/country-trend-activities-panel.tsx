"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AiVoiceGreetingToggle } from "@/components/ai-voice-greeting-toggle";
import { useRoomLocale } from "@/components/room-locale-provider";
import { isAiVoiceSupported } from "@/lib/ai-voice-greeting";
import {
  getActivitiesForCountry,
  getCountryTrendMeta,
  getCountryTrendPanelHint,
  getCountryTrendPanelOrder,
  getCountryTrendPanelUi,
  pickTrendCopy,
  roomSlugFromPathname,
  shouldShowCountryTrendPanel,
  type CountryTrendId,
  type TrendPanelLocale
} from "@/lib/country-trend-activities";
import { resolveContentLocale } from "@/lib/room-locale";

type PollItem = {
  id: string;
  country: CountryTrendId;
  rank: number;
  flag: string;
  kicker?: string;
  label: string;
  vibe: string;
  dualLane?: boolean;
};

function buildPollItems(order: CountryTrendId[], locale: TrendPanelLocale): PollItem[] {
  return order.flatMap((country) => {
    const meta = getCountryTrendMeta(country, locale);
    return getActivitiesForCountry(country).map((activity, index) => {
      const copy = pickTrendCopy(locale, activity);
      return {
        id: `${country}-${activity.id}`,
        country,
        rank: index + 1,
        flag: meta.flag,
        kicker: copy.kicker,
        label: copy.label,
        vibe: copy.vibe,
        dualLane: activity.id === "ec-dual-lane"
      };
    });
  });
}

export function CountryTrendActivitiesPanel() {
  const pathname = usePathname();
  const { locale } = useRoomLocale();
  const contentLocale = resolveContentLocale(locale);
  const [open, setOpen] = useState(true);
  const [voiceReady, setVoiceReady] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const roomSlug = roomSlugFromPathname(pathname);
  const order = useMemo(() => getCountryTrendPanelOrder(roomSlug), [roomSlug]);
  const panelUi = useMemo(
    () => getCountryTrendPanelUi(roomSlug, contentLocale),
    [roomSlug, contentLocale]
  );
  const pollItems = useMemo(
    () => buildPollItems(order, panelUi.trendLocale),
    [order, panelUi.trendLocale]
  );

  useEffect(() => {
    setVoiceReady(isAiVoiceSupported());
  }, []);

  if (!shouldShowCountryTrendPanel(pathname)) {
    return null;
  }

  const panelTitle = panelUi.panelTitle;
  const panelHint =
    panelUi.panelHint || getCountryTrendPanelHint(order, panelUi.trendLocale);
  const pollBadge = panelUi.pollBadge;
  const voiceTitle = panelUi.voiceTitle;
  const voiceHint = panelUi.voiceHint;

  const scrollTrack = (direction: "up" | "down") => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      top: direction === "down" ? track.clientHeight * 0.72 : -track.clientHeight * 0.72,
      behavior: "smooth"
    });
  };

  return (
    <aside
      className={`country-trend-panel-rail arena-micro-rail-wall-run${roomSlug.includes("colombia") ? " country-trend-panel-rail--colombia" : ""}${roomSlug.includes("ecuador") ? " country-trend-panel-rail--ecuador" : ""}${roomSlug.includes("japan") ? " country-trend-panel-rail--japan" : ""}${roomSlug.includes("china") ? " country-trend-panel-rail--china" : ""}`}
      aria-label={panelTitle}
    >
      <div className="country-trend-panel-rail-stack">
        <div className="country-trend-panel-cascade arena-micro-rail-wall-run-track">
          <div className="arena-micro-rail-mini-box country-trend-poll-box">
            <span className="arena-micro-rail-mini-notch" aria-hidden="true" />

            <header className="arena-micro-rail-mini-head country-trend-poll-head">
              <span className="arena-micro-rail-mini-badge">{pollBadge}</span>
              <div className="country-trend-poll-head-copy">
                <p className="country-trend-poll-title">{panelTitle}</p>
                <p className="country-trend-poll-hint">{panelHint}</p>
              </div>
              <div className="country-trend-poll-head-actions">
                <button
                  type="button"
                  className="country-trend-poll-arrow"
                  onClick={() => scrollTrack("up")}
                  aria-label={panelUi.scrollPollUp}
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="country-trend-poll-arrow"
                  onClick={() => scrollTrack("down")}
                  aria-label={panelUi.scrollPollDown}
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  className="country-trend-poll-toggle"
                  aria-expanded={open}
                >
                  {open ? "−" : "+"}
                </button>
              </div>
            </header>

            {open ? (
              <div ref={trackRef} className="country-trend-poll-track" role="list" aria-label={panelTitle}>
                {pollItems.map((item) => (
                  <div
                    key={item.id}
                    role="listitem"
                    className={`country-trend-poll-option${
                      item.dualLane ? " country-trend-poll-option--ecuador-dual-lane" : ""
                    }`}
                  >
                    <span className="country-trend-poll-rank" aria-hidden="true">
                      {item.rank}
                    </span>
                    <span className="country-trend-poll-flag" aria-hidden="true">
                      {item.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      {item.kicker ? (
                        <p className="country-trend-poll-kicker">{item.kicker}</p>
                      ) : null}
                      <p className="country-trend-poll-label">{item.label}</p>
                      <p className="country-trend-poll-vibe">{item.vibe}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {voiceReady ? (
            <div className="arena-micro-rail-mini-box country-trend-voice-box" aria-label={voiceTitle}>
              <span className="country-trend-voice-fall-notch" aria-hidden="true" />
              <header className="arena-micro-rail-mini-head country-trend-voice-head">
                <span className="arena-micro-rail-mini-badge">✦ AI</span>
                <div className="country-trend-poll-head-copy">
                  <p className="country-trend-poll-title">{voiceTitle}</p>
                  <p className="country-trend-poll-hint">{voiceHint}</p>
                </div>
              </header>
              <div className="country-trend-voice-scroll">
                <AiVoiceGreetingToggle variant="room-rail" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
