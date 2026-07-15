"use client";

import { useState, type ReactNode } from "react";
import type { DropshipProduct } from "@/lib/dropshipping";
import { getDropshipMarketCopy } from "@/lib/dropship-market-copy";

type DropshipBuyButtonProps = {
  product: DropshipProduct;
  countryName: string;
  flag?: string;
  compact?: boolean;
  onOrderedAction?: () => void;
  footer?: ReactNode;
};

export function DropshipBuyButton({ product, countryName, flag, compact = false, onOrderedAction, footer }: DropshipBuyButtonProps) {
  const copy = getDropshipMarketCopy(product.countryId);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const label = copy.checkoutPayButton?.(`$${product.price.toFixed(2)}`) ?? copy.buy ?? "Buy now";

  async function handleBuy() {
    const email = buyerEmail.trim().toLowerCase();
    if (!email) {
      setMessage("Enter your email first.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch("/api/dropshipping/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          countryId: product.countryId,
          countryName,
          flag: flag ?? product.flag,
          productId: product.id
        })
      });

      const data = (await response.json()) as {
        ok: boolean;
        mode?: "manual" | "paypal";
        error?: string;
        message?: string;
        approveUrl?: string;
      };

      if (!response.ok || !data.ok) {
        setMessage(data.error ?? copy.checkoutErrorStart ?? "Could not start checkout");
        return;
      }

      onOrderedAction?.();

      if (data.mode === "paypal" && data.approveUrl) {
        window.open(data.approveUrl, "_blank", "noopener,noreferrer");
        setMessage("Checkout opened in PayPal. After payment, your order will appear below.");
        return;
      }

      setMessage(data.message ?? "Order saved. Seller follow-up can begin.");
    } catch {
      setMessage(copy.checkoutErrorNetwork ?? "Network error — try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="dropship-buy-wrap">
      <input
        type="email"
        value={buyerEmail}
        onChange={(event) => setBuyerEmail(event.target.value)}
        placeholder="your@email.com"
        className="mt-2 w-full rounded-xl border border-white/15 bg-[#09111f] px-3 py-2 text-xs text-white outline-none"
        autoComplete="email"
      />
      <button
        type="button"
        onClick={handleBuy}
        disabled={isSubmitting}
        className={`dropship-buy-btn${compact ? " dropship-buy-btn--compact" : ""}${isSubmitting ? " opacity-70" : ""}`}
      >
        {isSubmitting ? (copy.checkoutPayLoading ?? "Starting…") : label}
      </button>
      {message ? <p className="mt-2 text-[11px] leading-4 text-[#9aa8c6]">{message}</p> : null}
      {footer ? <div className="mt-2">{footer}</div> : null}
    </div>
  );
}
