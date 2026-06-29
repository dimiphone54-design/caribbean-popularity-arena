"use client";

import { useCallback, useMemo, useState } from "react";
import {
  dropshipMarketMeta,
  formatDropshipPrice,
  getDropshipCountryLegal,
  getDropshipOptionProductsForCountry,
  getDropshipProductsForCountry,
  type DropshipLaneId
} from "@/lib/dropshipping";
import {
  getDropshipLegalShortDisplay,
  getDropshipMarketCopy,
  getDropshipProductDisplay,
  isChinaDropshipMarket,
  isEcuadorDropshipMarket,
  isJapanDropshipMarket
} from "@/lib/dropship-market-copy";
import { DropshipAiConverter } from "@/components/dropshipping/dropship-ai-converter";
import { DropshipBuyButton } from "@/components/dropshipping/dropship-buy-button";
import { DropshipCategoryLanes } from "@/components/dropshipping/dropship-category-lanes";
import { DropshipHowItWorks } from "@/components/dropshipping/dropship-how-it-works";
import { DropshipOrderTracker } from "@/components/dropshipping/dropship-order-tracker";
import { ColombiaDropshipHeroPanel } from "@/components/dropshipping/colombia-dropship-hero-panel";
import { ChinaDropshipHeroPanel } from "@/components/dropshipping/china-dropship-hero-panel";
import { EcuadorDropshipHeroPanel } from "@/components/dropshipping/ecuador-dropship-hero-panel";
import { EcuadorNoMercyWingIntro } from "@/components/ecuador-no-mercy-wing-intro";
import { UkDropshipWomenPanel } from "@/components/dropshipping/uk-dropship-women-panel";

type DropshipMarketPanelProps = {
  countryId: string;
  countryName: string;
  flag: string;
  /** room pages use aligned section spacing */
  layout?: "room" | "standalone";
  /** when AI converter is mounted above on the room page */
  hideAiConverter?: boolean;
  /** skip duplicate room intro when parent panel already has a header */
  hideRoomIntro?: boolean;
  /** nested inside UK football hub · strip outer card chrome */
  embeddedInUkStack?: boolean;
};

function DropshipMarketRoomIntroContent({
  countryId,
  countryName,
  flag
}: {
  countryId: string;
  countryName: string;
  flag: string;
}) {
  const copy = getDropshipMarketCopy(countryId);
  const steps = copy.steps;
  const ecuadorWing = isEcuadorDropshipMarket(countryId);
  const chinaRoom = isChinaDropshipMarket(countryId);

  if (ecuadorWing) {
    return <EcuadorNoMercyWingIntro flag={flag} countryName={countryName} />;
  }

  return (
    <div className={`dropship-market-room-intro${chinaRoom ? " dropship-market-room-intro--china" : ""}`}>
      <header className={`dropship-market-room-head${chinaRoom ? " dropship-market-room-head--china" : ""}`}>
        {copy.roomHeaderTitleLead && copy.roomHeaderTitleTrail ? (
          <h2 className="dropship-market-room-header-title" aria-label={copy.roomHeaderTitle ?? undefined}>
            <span className="dropship-market-room-header-word">{copy.roomHeaderTitleLead}</span>
            {copy.roomHeaderIconSrc ? (
              <img
                className="dropship-market-room-header-icon"
                src={copy.roomHeaderIconSrc}
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                decoding="async"
              />
            ) : null}
            <span className="dropship-market-room-header-word">{copy.roomHeaderTitleTrail}</span>
          </h2>
        ) : copy.roomHeaderTitle ? (
          <h2 className="dropship-market-room-header-title">{copy.roomHeaderTitle}</h2>
        ) : null}
        <div className="dropship-market-room-head-copy">
          <p className="a2030-electric-flash a2030-micro dropship-market-room-kicker">
            {`${flag} ${copy.title}`}
          </p>
          <p className="dropship-market-room-sub">{copy.roomSub(flag, countryName)}</p>
        </div>
        <span className="dropship-market-badge dropship-market-badge--room">{copy.marketOnlyBadge}</span>
      </header>

      <ol className="dropship-market-room-steps" role="list">
        {steps.map((step) => (
          <li key={step.title} className="dropship-market-room-step" role="listitem">
            <p className="dropship-market-room-step-title">{step.title}</p>
            <p className="dropship-market-room-step-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

type DropshipMarketRoomIntroPanelProps = {
  countryId: string;
  countryName: string;
  flag: string;
  /** flush under LIVE AI GENERATOR on Japan room */
  stackUnderAi?: boolean;
  /** inside DropshipMarketPanel — no outer card wrapper */
  embedded?: boolean;
};

/** Room intro only · header + 4 market steps */
export function DropshipMarketRoomIntroPanel({
  countryId,
  countryName,
  flag,
  stackUnderAi = false,
  embedded = false
}: DropshipMarketRoomIntroPanelProps) {
  if (embedded) {
    return <DropshipMarketRoomIntroContent countryId={countryId} countryName={countryName} flag={flag} />;
  }

  return (
    <section
      id="dropship-market-intro"
      data-country-id={countryId}
      className={`dropship-market-room-intro-panel a2030-holo-panel rounded-[1.5rem] border border-[#d7b46a]/35 p-4 sm:p-5${
        stackUnderAi ? " dropship-market-room-intro-panel--stack" : " country-room-section"
      }${isJapanDropshipMarket(countryId) ? " dropship-market-room-intro-panel--japan" : ""}${
        isChinaDropshipMarket(countryId) ? " dropship-market-room-intro-panel--china" : ""
      }${isEcuadorDropshipMarket(countryId) ? " dropship-market-room-intro-panel--no-mercy-wing" : ""}`}
      aria-label={getDropshipMarketCopy(countryId).roomIntroAria(countryName)}
    >
      <DropshipMarketRoomIntroContent countryId={countryId} countryName={countryName} flag={flag} />
    </section>
  );
}

/** Full dropship market · country room pages */
export function DropshipMarketPanel({
  countryId,
  countryName,
  flag,
  layout = "standalone",
  hideAiConverter = false,
  hideRoomIntro = false,
  embeddedInUkStack = false
}: DropshipMarketPanelProps) {
  const [selectedLane, setSelectedLane] = useState<DropshipLaneId | null>(null);
  const [orderTick, setOrderTick] = useState(0);
  const refreshOrders = useCallback(() => setOrderTick((value) => value + 1), []);
  const isRoom = layout === "room";

  const optionProducts = useMemo(() => getDropshipOptionProductsForCountry(countryId), [countryId]);
  const featuredProducts = useMemo(() => getDropshipProductsForCountry(countryId), [countryId]);

  const visibleOptionProducts = selectedLane
    ? optionProducts.filter((product) => product.lane === selectedLane)
    : optionProducts;

  const legal = getDropshipCountryLegal(countryId);
  const copy = getDropshipMarketCopy(countryId);
  const legalShort = getDropshipLegalShortDisplay(countryId, legal.short);
  const sampleUsd = visibleOptionProducts[0]?.price ?? featuredProducts[0]?.price ?? 29;
  const japanMarket = isJapanDropshipMarket(countryId);
  const chinaMarket = isChinaDropshipMarket(countryId);
  const ecuadorMarket = isEcuadorDropshipMarket(countryId);

  return (
    <section
      id="dropship-market"
      className={`dropship-market-panel a2030-holo-panel scroll-mt-24 rounded-[1.5rem] border border-[#d7b46a]/35 p-4 sm:p-5${
        isRoom ? " dropship-market-panel--room dropship-market-panel--room-aligned country-room-section" : " mt-3"
      }${embeddedInUkStack ? " dropship-market-panel--uk-stack" : ""}${japanMarket ? " dropship-market-panel--japan" : ""}${
        chinaMarket ? " dropship-market-panel--china" : ""
      }${ecuadorMarket ? " dropship-market-panel--no-mercy-wing" : ""}`}
    >
      {isRoom && !hideRoomIntro ? (
        <DropshipMarketRoomIntroPanel
          countryId={countryId}
          countryName={countryName}
          flag={flag}
          embedded
        />
      ) : null}

      {!isRoom ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#d7b46a] sm:text-xs">
                {flag} {copy.title}
              </p>
              <p className="mt-1 text-xs text-[#9fb4d4]">{copy.subtitle}</p>
            </div>
            <span className="dropship-market-badge">{copy.dropshipBadge}</span>
          </div>
        </>
      ) : null}

      {countryId === "colombia" ? <ColombiaDropshipHeroPanel compact={isRoom} /> : null}
      {countryId === "china" ? <ChinaDropshipHeroPanel compact={isRoom} /> : null}
      {countryId === "ecuador" ? <EcuadorDropshipHeroPanel compact={isRoom} /> : null}

      {!isRoom ? <DropshipHowItWorks /> : null}

      {embeddedInUkStack && countryId === "uk" ? (
        <UkDropshipWomenPanel countryName={countryName} onOrdered={refreshOrders} />
      ) : (
        <>
          <DropshipCategoryLanes selectedLane={selectedLane} onSelectLane={setSelectedLane} compact={isRoom} countryId={countryId} />

          <ul className="dropship-options-grid mt-3" role="list">
            {visibleOptionProducts.map((product) => {
              const display = getDropshipProductDisplay(product, countryId);
              return (
              <li key={product.id} className="dropship-product-card dropship-product-card--option" role="listitem">
                <div
                  className="dropship-product-thumb"
                  style={{ backgroundImage: `url('${product.imageUrl}')` }}
                  aria-hidden="true"
                />
                <div className="dropship-product-body">
                  <p className="dropship-product-category">{display.name ?? display.category}</p>
                  <p className="dropship-product-desc">{display.description}</p>
                  <p className="dropship-product-ship">{copy.shipsFrom} {display.shipsFrom}</p>
                  <p className="dropship-product-price">{formatDropshipPrice(product.price, product.currency, countryId)}</p>
                  <DropshipBuyButton product={product} countryName={countryName} onOrdered={refreshOrders} compact={isRoom} />
                </div>
              </li>
              );
            })}
          </ul>

          {!selectedLane && featuredProducts.length > 0 ? (
            <ul className="dropship-product-grid mt-4" role="list">
              {featuredProducts.map((product) => {
                const display = getDropshipProductDisplay(product, countryId);
                return (
                <li key={product.id} className="dropship-product-card" role="listitem">
                  <div
                    className="dropship-product-thumb"
                    style={{ backgroundImage: `url('${product.imageUrl}')` }}
                    aria-hidden="true"
                  />
                  <div className="dropship-product-body">
                    <p className="dropship-product-category">{display.name ?? display.category}</p>
                    <p className="dropship-product-desc">{display.description}</p>
                    <p className="dropship-product-ship">{copy.shipsFrom} {display.shipsFrom}</p>
                    <p className="dropship-product-price">{formatDropshipPrice(product.price, product.currency, countryId)}</p>
                    <DropshipBuyButton product={product} countryName={countryName} onOrdered={refreshOrders} compact={isRoom} />
                  </div>
                </li>
                );
              })}
            </ul>
          ) : null}
        </>
      )}

      {!hideAiConverter ? (
        <DropshipAiConverter
          defaultCountryId={countryId}
          defaultUsd={sampleUsd}
          variant={isRoom && !ecuadorMarket ? "compact" : "full"}
        />
      ) : null}

      <p className="dropship-country-legal-short mt-3 text-[10px] leading-relaxed text-[#b8ff3c]">{legalShort}</p>

      <DropshipOrderTracker countryId={countryId} countryName={countryName} flag={flag} refreshKey={orderTick} />

      {!isRoom || ecuadorMarket ? (
        <p className="dropship-market-legal mt-4 text-[10px] leading-relaxed text-[#8fa3c4]">
          {legal.full} · {dropshipMarketMeta.legalNote}
        </p>
      ) : null}
    </section>
  );
}
