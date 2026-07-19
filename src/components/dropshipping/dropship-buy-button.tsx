"use client";

import { useState, type ReactNode } from "react";
import type { DropshipProduct } from "@/lib/dropshipping";

type DropshipBuyButtonProps = {
  product: DropshipProduct;
  compact?: boolean;
  footer?: ReactNode;
};

export function DropshipBuyButton({ product, compact = false, footer }: DropshipBuyButtonProps) {
  const [message, setMessage] = useState<string | null>(null);
  const url = product.sellerPaymentUrl ?? "";
  const hasValidUrl = url.startsWith("https://");

  function handleBuy() {
    if (!hasValidUrl) {
      setMessage("Seller hasn't set up payment yet.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("Payment page opened in a new tab.");
  }

  return (
    <div className="dropship-buy-wrap">
      <button
        type="button"
        onClick={handleBuy}
        disabled={!hasValidUrl}
        className={`dropship-buy-btn${compact ? " dropship-buy-btn--compact" : ""}${!hasValidUrl ? " opacity-60 cursor-not-allowed" : ""}`}
      >
        {hasValidUrl ? "Pay seller directly" : "Payment not available"}
      </button>
      {message ? <p className="mt-1 text-[11px] leading-4 text-[#9aa8c6]">{message}</p> : null}
      {!hasValidUrl ? (
        <p className="mt-1 text-[11px] leading-4 text-[#9aa8c6]">Seller hasn't set up payment yet.</p>
      ) : null}
      {footer ? <div className="mt-2">{footer}</div> : null}
    </div>
  );
}
