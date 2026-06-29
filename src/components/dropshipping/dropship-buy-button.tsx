"use client";

import { useState } from "react";
import type { DropshipProduct } from "@/lib/dropshipping";
import { getDropshipMarketCopy } from "@/lib/dropship-market-copy";
import { DropshipCheckoutModal } from "@/components/dropshipping/dropship-checkout-modal";

type DropshipBuyButtonProps = {
  product: DropshipProduct;
  countryName: string;
  compact?: boolean;
  onOrdered?: () => void;
};

export function DropshipBuyButton({ product, countryName, compact = false, onOrdered }: DropshipBuyButtonProps) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const copy = getDropshipMarketCopy(product.countryId);

  return (
    <div className="dropship-buy-wrap">
      <button
        type="button"
        className={`dropship-buy-btn${compact ? " dropship-buy-btn--compact" : ""}`}
        onClick={() => {
          setNotice(null);
          setOpen(true);
        }}
      >
        {copy.buy}
      </button>
      {notice ? <p className="dropship-buy-notice">{notice}</p> : null}
      <DropshipCheckoutModal
        product={product}
        countryName={countryName}
        open={open}
        onClose={() => setOpen(false)}
        onComplete={(message) => {
          setNotice(message);
          onOrdered?.();
        }}
      />
    </div>
  );
}
