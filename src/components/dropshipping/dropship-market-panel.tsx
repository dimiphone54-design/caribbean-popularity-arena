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
  isJapanDropshipMarket,
  isUkDropshipMarket
} from "@/lib/dropship-market-copy";
import { DropshipAiConverter } from "@/components/dropshipping/dropship-ai-converter";
import { DropshipBuyButton } from "@/components/dropshipping/dropship-buy-button";
import { DropshipCategoryLanes } from "@/components/dropshipping/dropship-category-lanes";
import { DropshipHowItWorks } from "@/components/dropshipping/dropship-how-it-works";
import { DropshipOrderTracker } from "@/components/dropshipping/dropship-order-tracker";
import { ColombiaDropshipHeroPanel } from "@/components/dropshipping/colombia-dropship-hero-panel";
import { ChinaDropshipHeroPanel } from "@/components/dropshipping/china-dropship-hero-panel";
import { DirectDropshipLanePanel } from "@/components/dropshipping/direct-dropship-lane-panel";
import { UkDropshipWomenPanel } from "@/components/dropshipping/uk-dropship-women-panel";
import { UkTechAutoDropshipHero } from "@/components/dropshipping/uk-tech-auto-dropship-hero";
import { isPublicDropshipVisible } from "@/lib/real-money";

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
  countryId
}: {
  countryId: string;
  countryName: string;
  flag: string;
}) {
  /** One shared Direct Dropship template for every country */
  return (
    <div className="dropship-market-room-intro">
      <DirectDropshipLanePanel countryId={countryId} variant="compact" />
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
  if (!isPublicDropshipVisible()) return null;

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
  const ukMarket = isUkDropshipMarket(countryId);

  if (!isPublicDropshipVisible()) return null;

  return (
    <section
      id="dropship-market"
      className={`dropship-market-panel a2030-holo-panel scroll-mt-24 rounded-[1.5rem] border border-[#d7b46a]/35 p-4 sm:p-5${
        isRoom ? " dropship-market-panel--room dropship-market-panel--room-aligned country-room-section" : " mt-3"
      }${embeddedInUkStack ? " dropship-market-panel--uk-stack" : ""}${japanMarket ? " dropship-market-panel--japan" : ""}${
        chinaMarket ? " dropship-market-panel--china" : ""
      }${ecuadorMarket ? " dropship-market-panel--no-mercy-wing" : ""}${
        ukMarket ? " dropship-market-panel--uk-tech-auto" : ""
      }`}
    >
      {isRoom && !hideRoomIntro && ukMarket ? <UkTechAutoDropshipHero compact /> : null}
      {isRoom && !hideRoomIntro && !ukMarket ? (
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
      {/* Ecuador: clean public intro only — no hero slideshow / FX debug clutter */}

      {!isRoom ? <DropshipHowItWorks countryName={countryName} /> : null}

      {isRoom && countryId !== "uk" ? (
        <>
          <p className="dropship-section-label mt-3 text-[10px] font-bold uppercase tracking-wider text-[#d7b46a]">
            Featured Products
          </p>
          <ul className="dropship-product-grid mt-2" role="list">
            {(featuredProducts.length > 0 ? featuredProducts : visibleOptionProducts).slice(0, 5).map((product) => {
              const display = getDropshipProductDisplay(product, countryId);
              return (
                <li key={product.id} className="dropship-product-card" role="listitem">
                  <div
                    className="dropship-product-thumb"
                    style={{ backgroundImage: `url('${product.imageUrl}')` }}
                    aria-hidden="true"
                  />
                  <div className="dropship-product-body">
                    <p className="dropship-product-category">{display.name ?? product.name}</p>
                    <p className="dropship-product-desc">{display.description ?? product.description}</p>
                    <p className="dropship-product-ship">
                      Ships from {display.shipsFrom ?? product.shipsFrom}
                    </p>
                    <p className="dropship-product-price">
                      {formatDropshipPrice(product.price, product.currency, countryId)}
                    </p>
                    <DropshipBuyButton
                      product={product}
                      countryName={countryName}
                      flag={flag}
                      onOrderedAction={refreshOrders}
                      compact={isRoom}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : embeddedInUkStack && countryId === "uk" ? (
        <UkDropshipWomenPanel countryName={countryName} onOrdered={refreshOrders} />
      ) : (
        <>
          {/* Category chips · always show 📱 Tech & Gadgets · 🚗 Automotive for UK (+ all other markets) */}
          <p className="dropship-section-label mt-2 text-[10px] font-bold uppercase tracking-wider text-[#d7b46a]">
            Shop by category
          </p>
          <DropshipCategoryLanes
            selectedLane={selectedLane}
            onSelectLane={setSelectedLane}
            compact={isRoom}
            countryId={countryId}
          />

          {isRoom && countryId === "uk" && !selectedLane ? (
            <>
              <p className="dropship-section-label mt-3 text-[10px] font-bold uppercase tracking-wider text-[#d7b46a]">
                Featured Products
              </p>
              <ul className="dropship-product-grid mt-2" role="list">
                {(featuredProducts.length > 0 ? featuredProducts : visibleOptionProducts).map((product) => {
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
                      <DropshipBuyButton product={product} countryName={countryName} flag={flag} onOrderedAction={refreshOrders} compact={isRoom} />
                    </div>
                  </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-center text-[11px] leading-5 text-[#9fb4d4]">
                Secure USD checkout on the Arena • UK supplier ships direct • Tracking provided
              </p>
            </>
          ) : (
            <>
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
                      <DropshipBuyButton product={product} countryName={countryName} flag={flag} onOrderedAction={refreshOrders} compact={isRoom} />
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
                        <DropshipBuyButton product={product} countryName={countryName} flag={flag} onOrderedAction={refreshOrders} compact={isRoom} />
                      </div>
                    </li>
                    );
                  })}
                </ul>
              ) : null}
            </>
          )}
        </>
      )}

      {/* Public UK / Ecuador / Japan: clean lane only — no LIVE AI / CACHE FX / FX converter clutter */}
      {!hideAiConverter && !ecuadorMarket && !ukMarket && !japanMarket ? (
        <DropshipAiConverter
          defaultCountryId={countryId}
          defaultUsd={sampleUsd}
          variant={isRoom ? "compact" : "full"}
        />
      ) : null}

      {!ecuadorMarket && !ukMarket && !japanMarket ? (
        <p className="dropship-country-legal-short mt-3 text-[10px] leading-relaxed text-[#b8ff3c]">{legalShort}</p>
      ) : null}

      <DropshipOrderTracker countryId={countryId} countryName={countryName} flag={flag} refreshKey={orderTick} />

      {!isRoom && !ecuadorMarket && !ukMarket && !japanMarket ? (
        <p className="dropship-market-legal mt-4 text-[10px] leading-relaxed text-[#8fa3c4]">
          {legal.full} · {dropshipMarketMeta.legalNote}
        </p>
      ) : null}
    </section>
  );
}
