"use client";

import { useEffect, useState } from "react";
import type { DropshipBuyer, DropshipProduct } from "@/lib/dropshipping";
import { formatDropshipPrice } from "@/lib/dropshipping";
import {
  getDropshipCountryDisplayName,
  getDropshipMarketCopy,
  getDropshipProductDisplay
} from "@/lib/dropship-market-copy";
import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { defaultBuyerFromSaved, confirmDropshipPaymentOnServer, saveDropshipBuyerEmail } from "@/lib/dropshipping-orders";

const countryCodeByCountryId: Record<string, string> = {
  colombia: "CO",
  uk: "GB",
  lithuania: "LT",
  ecuador: "EC",
  trinidad: "TT",
  jamaica: "JM",
  venezuela: "VE",
  poland: "PL",
  tunisia: "TN",
  guyana: "GY",
  china: "CN",
  japan: "JP"
};

type DropshipCheckoutModalProps = {
  product: DropshipProduct;
  countryName: string;
  open: boolean;
  onClose: () => void;
  onComplete: (message: string) => void;
};

export function DropshipCheckoutModal({
  product,
  countryName,
  open,
  onClose,
  onComplete
}: DropshipCheckoutModalProps) {
  const [buyer, setBuyer] = useState<Partial<DropshipBuyer>>(() =>
    defaultBuyerFromSaved(countryCodeByCountryId[product.countryId] ?? "US")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setBuyer(defaultBuyerFromSaved(countryCodeByCountryId[product.countryId] ?? "US"));
  }, [open, product.countryId]);

  if (!open) return null;

  const copy = getDropshipMarketCopy(product.countryId);
  const display = getDropshipProductDisplay(product, product.countryId);
  const displayCountry = getDropshipCountryDisplayName(product.countryId, countryName);
  const priceLabel = formatDropshipPrice(product.price, product.currency, product.countryId);
  const origin =
    display.shipsFrom.split("·").pop()?.trim() ?? displayCountry;

  const setField = (field: keyof DropshipBuyer, value: string) => {
    setBuyer((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    setLoading(true);
    setError(null);

    if (isArenaMasterKeyActive()) {
      onComplete(copy.orderPlaced(display.category, buyer.city ?? displayCountry));
      onClose();
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/dropshipping/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, buyer })
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        mode?: string;
        checkoutUrl?: string;
        message?: string;
        order?: {
          id: string;
          customReference: string;
          productId: string;
          productName: string;
          countryId: string;
          countryName: string;
          flag: string;
          amount: number;
          currency: string;
          status: string;
          buyerEmail?: string;
        };
        customReference?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? copy.checkoutErrorStart);
        return;
      }

      if (buyer.email) saveDropshipBuyerEmail(buyer.email);

      if (payload.mode === "fygaro" && payload.checkoutUrl) {
        window.location.href = payload.checkoutUrl;
        return;
      }

      if (payload.mode === "wipay" && payload.checkoutUrl) {
        window.location.href = payload.checkoutUrl;
        return;
      }

      if (payload.order?.customReference) {
        const confirmed = await confirmDropshipPaymentOnServer(payload.order.customReference);
        if (confirmed) {
          onComplete(
            payload.message ??
              copy.orderPlaced(display.category, buyer.city ?? displayCountry)
          );
          onClose();
          return;
        }
      }

      onComplete(payload.message ?? copy.orderStarted);
      onClose();
    } catch {
      setError(copy.checkoutErrorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="arena-2030 dropship-checkout-overlay" role="dialog" aria-modal="true" aria-labelledby="dropship-checkout-title">
      <button type="button" className="dropship-checkout-backdrop" onClick={onClose} aria-label={copy.checkoutClose} />
      <div className="dropship-checkout-modal">
        <div className="dropship-checkout-head">
          <div>
            <p className="dropship-checkout-kicker">{product.flag} {copy.checkoutKicker}</p>
            <h2 id="dropship-checkout-title" className="dropship-checkout-title">{display.category}</h2>
            <p className="dropship-checkout-meta">
              {copy.checkoutShipsMeta(display.shipsFrom, priceLabel, displayCountry)}
            </p>
          </div>
          <button type="button" className="dropship-checkout-close" onClick={onClose} aria-label={copy.checkoutClose}>
            ×
          </button>
        </div>

        <p className="dropship-checkout-note">{copy.checkoutNote(origin)}</p>

        <div className="dropship-checkout-grid">
          <label className="dropship-checkout-field">
            <span>{copy.checkoutFullName}</span>
            <input
              type="text"
              value={buyer.fullName ?? ""}
              onChange={(e) => setField("fullName", e.target.value)}
              placeholder="Maria Lopez"
              autoComplete="name"
            />
          </label>
          <label className="dropship-checkout-field">
            <span>{copy.checkoutEmail}</span>
            <input
              type="email"
              value={buyer.email ?? ""}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </label>
          <label className="dropship-checkout-field">
            <span>{copy.checkoutPhone}</span>
            <input
              type="tel"
              value={buyer.phone ?? ""}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+1 555 0100"
              autoComplete="tel"
            />
          </label>
          <label className="dropship-checkout-field dropship-checkout-field--full">
            <span>{copy.checkoutStreetAddress}</span>
            <input
              type="text"
              value={buyer.addressLine1 ?? ""}
              onChange={(e) => setField("addressLine1", e.target.value)}
              placeholder="123 Main St, Apt 4"
              autoComplete="street-address"
            />
          </label>
          <label className="dropship-checkout-field">
            <span>{copy.checkoutCity}</span>
            <input
              type="text"
              value={buyer.city ?? ""}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="Miami"
              autoComplete="address-level2"
            />
          </label>
          <label className="dropship-checkout-field">
            <span>{copy.checkoutPostal}</span>
            <input
              type="text"
              value={buyer.postalCode ?? ""}
              onChange={(e) => setField("postalCode", e.target.value)}
              placeholder="33101"
              autoComplete="postal-code"
            />
          </label>
          <label className="dropship-checkout-field">
            <span>{copy.checkoutCountry}</span>
            <input
              type="text"
              value={buyer.countryCode ?? ""}
              onChange={(e) => setField("countryCode", e.target.value.toUpperCase())}
              placeholder="US"
              autoComplete="country"
              maxLength={3}
            />
          </label>
        </div>

        {error ? <p className="dropship-checkout-error">{error}</p> : null}

        <div className="dropship-checkout-actions">
          <button type="button" className="dropship-checkout-cancel" onClick={onClose} disabled={loading}>
            {copy.checkoutCancel}
          </button>
          <button type="button" className="dropship-checkout-pay" onClick={submit} disabled={loading}>
            {loading ? copy.checkoutPayLoading : copy.checkoutPayButton(priceLabel)}
          </button>
        </div>
      </div>
    </div>
  );
}
