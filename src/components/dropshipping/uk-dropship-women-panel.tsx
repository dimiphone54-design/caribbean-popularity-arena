"use client";

import { useMemo } from "react";
import { DropshipBuyButton } from "@/components/dropshipping/dropship-buy-button";
import {
  formatDropshipPrice,
  getDropshipOptionProductsForCountry,
  type DropshipProduct
} from "@/lib/dropshipping";
import { getDropshipMarketCopy, getDropshipProductDisplay } from "@/lib/dropship-market-copy";
import { ukDropshipWomenHeroSlides } from "@/lib/uk-dropship-women-photos";

type UkDropshipWomenPanelProps = {
  countryName: string;
  onOrdered?: () => void;
};

/** UK football hub shop · exact UK women photos only · lane checkout below */
export function UkDropshipWomenPanel({ countryName, onOrdered }: UkDropshipWomenPanelProps) {
  const copy = getDropshipMarketCopy("uk");
  const laneProducts = useMemo(() => getDropshipOptionProductsForCountry("uk"), []);

  return (
    <div className="uk-dropship-women-panel" aria-label="United Kingdom shop · UK women photos">
      <ul className="uk-dropship-women-photo-grid" role="list">
        {ukDropshipWomenHeroSlides.map((slide) => (
          <li key={slide.id} className="uk-dropship-women-photo-cell" role="listitem">
            <div
              className="uk-dropship-women-photo"
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundPosition: slide.focus
              }}
              role="img"
              aria-label={`UK women · ${slide.id.replace(/-/g, " ")}`}
            />
          </li>
        ))}
      </ul>

      <ul className="uk-dropship-women-buy-grid" role="list">
        {laneProducts.map((product: DropshipProduct) => {
          const display = getDropshipProductDisplay(product, "uk");
          return (
            <li key={product.id} className="uk-dropship-women-buy-card" role="listitem">
              <div
                className="uk-dropship-women-buy-thumb"
                style={{ backgroundImage: `url('${product.imageUrl}')` }}
                aria-hidden="true"
              />
              <div className="uk-dropship-women-buy-body">
                <p className="uk-dropship-women-buy-category">{display.category}</p>
                <p className="uk-dropship-women-buy-desc">{display.description}</p>
                <p className="uk-dropship-women-buy-ship">
                  {copy.shipsFrom} {display.shipsFrom}
                </p>
                <p className="uk-dropship-women-buy-price">
                  {formatDropshipPrice(product.price, product.currency, "uk")}
                </p>
                <DropshipBuyButton
                  product={product}
                  countryName={countryName}
                  onOrdered={onOrdered}
                  compact
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
