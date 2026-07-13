"use client";

import type { DropshipProduct } from "@/lib/dropshipping";
import { getDropshipMarketCopy } from "@/lib/dropship-market-copy";
import { getSellerContactHref } from "@/lib/dropship-seller-contact";

type DropshipBuyButtonProps = {
  product: DropshipProduct;
  countryName: string;
  compact?: boolean;
  onOrdered?: () => void;
};

/** Direct buyer → seller contact. No on-site payment. */
export function DropshipBuyButton({ product, countryName, compact = false }: DropshipBuyButtonProps) {
  const copy = getDropshipMarketCopy(product.countryId);
  const href = getSellerContactHref(product, countryName);
  const label = copy.contactSeller ?? copy.buy ?? "Contact seller";

  return (
    <div className="dropship-buy-wrap">
      <a
        href={href}
        className={`dropship-buy-btn${compact ? " dropship-buy-btn--compact" : ""}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {label}
      </a>
    </div>
  );
}
