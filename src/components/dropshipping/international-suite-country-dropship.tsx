"use client";

import { useMemo, useState } from "react";
import {
  formatDropshipPrice,
  getDropshipCountryLegal,
  getDropshipOptionProductsForCountry,
  getDropshipProductsForCountry,
  type DropshipLaneId
} from "@/lib/dropshipping";
import {
  getDropshipLegalShortDisplay,
  getDropshipMarketCopy,
  getDropshipProductDisplay
} from "@/lib/dropship-market-copy";
import { DropshipAiConverter } from "@/components/dropshipping/dropship-ai-converter";
import { DropshipBuyButton } from "@/components/dropshipping/dropship-buy-button";
import { DropshipCategoryLanes } from "@/components/dropshipping/dropship-category-lanes";
import { ColombiaDropshipHeroPanel } from "@/components/dropshipping/colombia-dropship-hero-panel";
import { ChinaDropshipHeroPanel } from "@/components/dropshipping/china-dropship-hero-panel";

type InternationalSuiteCountryDropshipProps = {
  countryId: string;
  countryName: string;
  flag: string;
};

/** Compact dropship strip · International SUITE country panels */
export function InternationalSuiteCountryDropship({
  countryId,
  countryName,
  flag
}: InternationalSuiteCountryDropshipProps) {
  const [selectedLane, setSelectedLane] = useState<DropshipLaneId | null>(null);

  const optionProducts = useMemo(() => getDropshipOptionProductsForCountry(countryId), [countryId]);
  const featuredProducts = useMemo(() => getDropshipProductsForCountry(countryId), [countryId]);

  const visibleOptionProducts = selectedLane
    ? optionProducts.filter((product) => product.lane === selectedLane)
    : optionProducts;

  const visibleFeatured =
    selectedLane
      ? []
      : countryId === "colombia"
        ? featuredProducts
        : featuredProducts.slice(0, 2);

  if (!optionProducts.length) return null;

  const legal = getDropshipCountryLegal(countryId);
  const copy = getDropshipMarketCopy(countryId);

  return (
    <div className="a2030-intl-country-dropship" data-country-id={countryId}>
      <div className="a2030-intl-country-dropship-head">
        <span className="a2030-intl-country-dropship-icon" aria-hidden="true">
          📦
        </span>
        <div className="min-w-0">
          <p className="a2030-intl-country-dropship-title">{copy.title}</p>
          <p className="a2030-intl-dropship-legal-line">
            {flag} {countryName} · {getDropshipLegalShortDisplay(countryId, legal.short)}
          </p>
        </div>
      </div>

      {countryId === "colombia" ? <ColombiaDropshipHeroPanel compact /> : null}
      {countryId === "china" ? <ChinaDropshipHeroPanel compact /> : null}

      <DropshipCategoryLanes
        compact
        countryId={countryId}
        selectedLane={selectedLane}
        onSelectLane={setSelectedLane}
      />
      <ul className="a2030-intl-dropship-mini-list a2030-intl-dropship-options-list" role="list">
        {visibleOptionProducts.map((product) => {
          const display = getDropshipProductDisplay(product, countryId);
          return (
          <li key={product.id} className="a2030-intl-dropship-mini-card" role="listitem">
            <div
              className="a2030-intl-dropship-mini-thumb"
              style={{ backgroundImage: `url('${product.imageUrl}')` }}
              aria-hidden="true"
            />
            <div className="a2030-intl-dropship-mini-body">
              <p className="a2030-intl-dropship-mini-name">{display.category}</p>
              <p className="a2030-intl-dropship-mini-ship">{display.shipsFrom}</p>
              <p className="a2030-intl-dropship-mini-price">
                {formatDropshipPrice(product.price, product.currency, countryId)}
              </p>
              <DropshipBuyButton product={product} countryName={countryName} compact />
            </div>
          </li>
          );
        })}
      </ul>

      {visibleFeatured.length > 0 ? (
        <ul className="a2030-intl-dropship-mini-list mt-2" role="list">
          {visibleFeatured.map((product) => {
            const display = getDropshipProductDisplay(product, countryId);
            return (
            <li key={product.id} className="a2030-intl-dropship-mini-card" role="listitem">
              <div
                className="a2030-intl-dropship-mini-thumb"
                style={{ backgroundImage: `url('${product.imageUrl}')` }}
                aria-hidden="true"
              />
              <div className="a2030-intl-dropship-mini-body">
                <p className="a2030-intl-dropship-mini-name">{display.name}</p>
                <p className="a2030-intl-dropship-mini-ship">{display.shipsFrom}</p>
                <p className="a2030-intl-dropship-mini-price">
                  {formatDropshipPrice(product.price, product.currency, countryId)}
                </p>
                <DropshipBuyButton product={product} countryName={countryName} compact />
              </div>
            </li>
            );
          })}
        </ul>
      ) : null}

      <DropshipAiConverter
        defaultCountryId={countryId}
        defaultUsd={visibleOptionProducts[0]?.price ?? featuredProducts[0]?.price ?? 29}
        variant="compact"
      />
    </div>
  );
}
