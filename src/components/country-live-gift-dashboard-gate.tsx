"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { getCountryGateHeadlineTag } from "@/lib/country-live-gift-activity-copy";
import { getCountryLiveGiftGateLabels } from "@/lib/country-live-gift-gate-copy";

type CountryLiveGiftDashboardGateProps = {
  countryId: string;
  countryName: string;
  flag: string;
  activityTag: string;
  enterTitle: string;
  roomScrollHint: string;
  priceLine: string;
  footnote: string;
  actions: ReactNode;
};

type AppleLiquidGlassPanelProps = {
  variant: "room" | "lane" | "game" | "gift";
  children: ReactNode;
  backdropImage?: string;
};

function AppleLiquidGlassPanel({
  variant,
  children,
  backdropImage,
  className = ""
}: AppleLiquidGlassPanelProps & { className?: string }) {
  return (
    <article
      className={`c-live-gift-glass-card c-live-gift-glass-card--${variant} c-apple-liquid-glass c-apple-liquid-glass--${variant}${
        backdropImage ? " c-apple-liquid-glass--photo-backdrop" : ""
      }${className ? ` ${className}` : ""}`}
    >
      {backdropImage ? (
        <>
          <Image
            src={backdropImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="c-apple-liquid-glass-backdrop-img"
          />
          <span className="c-apple-liquid-glass-backdrop-veil" aria-hidden="true" />
        </>
      ) : null}
      <span className="c-apple-liquid-glass-blob c-apple-liquid-glass-blob--a" aria-hidden="true" />
      <span className="c-apple-liquid-glass-blob c-apple-liquid-glass-blob--b" aria-hidden="true" />
      <span className="c-apple-liquid-glass-specular" aria-hidden="true" />
      <span className="c-apple-liquid-glass-rim" aria-hidden="true" />
      <div className="c-apple-liquid-glass-content">{children}</div>
    </article>
  );
}

/** Japan · Freedom Gateway header photo */
const japanFreedomGatewayPhoto = "/japan-freedom-gateway-hikers.png";

/** China room · Great Wall · under room-loaded panel · before gift terms */
const chinaGreatWallGiftPhoto = "/china-great-wall-gift-gateway.png?v=6";

/** Live gift gate · 4 Apple Liquid Glass panels · room · lane · game · gift */
export function CountryLiveGiftDashboardGate({
  countryId,
  countryName,
  flag,
  activityTag,
  enterTitle,
  roomScrollHint,
  priceLine,
  footnote,
  actions
}: CountryLiveGiftDashboardGateProps) {
  const headlineTag = getCountryGateHeadlineTag(countryId);
  const labels = getCountryLiveGiftGateLabels(countryId);

  return (
    <section
      className={`c-live-gift-glass${labels.shellClass ? ` ${labels.shellClass}` : ""}`}
      data-country-id={countryId}
      aria-label={`${countryName} live gift glassmorphism gate`}
    >
      <div className="c-live-gift-glass-shell">
        <span className="c-live-gift-glass-plate" aria-hidden="true" />
        <span className="c-live-gift-glass-sheen" aria-hidden="true" />
        <span className="c-live-gift-glass-grid-lines" aria-hidden="true" />

        <div className="c-live-gift-glass-inner">
          <header className="c-live-gift-glass-head">
            <p className="c-live-gift-glass-freedom-title">{labels.freedomTitle}</p>
            {countryId === "japan" ? (
              <div className="c-live-gift-glass-head-panel">
                <div className="c-live-gift-glass-head-photo">
                  <Image
                    src={japanFreedomGatewayPhoto}
                    alt="日本 · ゲーム · トークショー · アクティビティ · Freedom Gateway"
                    width={800}
                    height={560}
                    className="c-live-gift-glass-head-photo-img"
                    priority
                  />
                  <span className="c-live-gift-glass-head-photo-glass" aria-hidden="true" />
                  <p className="c-live-gift-glass-headline c-live-gift-glass-headline--photo">
                    {flag} {countryName} · {headlineTag}
                  </p>
                </div>
              </div>
            ) : (
              <p className="c-live-gift-glass-headline">
                {flag} {countryName} · {headlineTag}
              </p>
            )}
          </header>

          {countryId === "japan" ? (
            <div className="c-japan-gift-panel-wrap">
              <AppleLiquidGlassPanel variant="gift" className="c-japan-gift-panel-hero">
                <div className="c-apple-liquid-glass-actions c-japan-gift-panel-actions">{actions}</div>
                <p className="c-apple-liquid-glass-foot c-japan-gift-panel-foot">{footnote}</p>
              </AppleLiquidGlassPanel>
            </div>
          ) : (
            <div className="c-live-gift-glass-grid c-live-gift-glass-grid--four">
              <AppleLiquidGlassPanel
                variant="room"
                backdropImage={countryId === "china" ? chinaGreatWallGiftPhoto : undefined}
              >
                <p className="c-apple-liquid-glass-kicker a2030-micro">{labels.roomKicker}</p>
                <p className="c-apple-liquid-glass-title">{labels.roomLoaded(flag, countryName)}</p>
                <p className="c-apple-liquid-glass-copy">{roomScrollHint}</p>
                <span className="c-apple-liquid-glass-badge">{labels.previewBadge}</span>
              </AppleLiquidGlassPanel>

              <AppleLiquidGlassPanel variant="lane">
                <p className="c-apple-liquid-glass-kicker a2030-micro">{labels.laneKicker}</p>
                <p className="c-apple-liquid-glass-tag">
                  {flag} {countryName} · {activityTag}
                </p>
                <p className="c-apple-liquid-glass-copy">{labels.laneCopy}</p>
              </AppleLiquidGlassPanel>

              <AppleLiquidGlassPanel variant="game">
                <p className="c-apple-liquid-glass-kicker a2030-micro">{labels.gameKicker}</p>
                <h2 className="c-apple-liquid-glass-title c-apple-liquid-glass-title--game">{enterTitle}</h2>
                <p className="c-apple-liquid-glass-price c-apple-liquid-glass-price--game">{priceLine}</p>
                {labels.gameBadge ? (
                  <span className="c-apple-liquid-glass-badge c-apple-liquid-glass-badge--game">{labels.gameBadge}</span>
                ) : null}
              </AppleLiquidGlassPanel>

              <AppleLiquidGlassPanel variant="gift">
                <div className="c-apple-liquid-glass-actions">{actions}</div>
                <p className="c-apple-liquid-glass-foot">{footnote}</p>
              </AppleLiquidGlassPanel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
