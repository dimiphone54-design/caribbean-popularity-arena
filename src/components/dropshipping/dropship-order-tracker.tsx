"use client";

import { useEffect, useState } from "react";
import {
  getDropshipCountryDisplayName,
  getDropshipMarketCopy
} from "@/lib/dropship-market-copy";

type DropshipOrder = {
  id: string;
  productName: string;
  productCategory: string;
  amount: string;
  currency: string;
  countryName: string;
  flag: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type DropshipOrderTrackerProps = {
  countryId: string;
  countryName: string;
  flag: string;
  refreshKey?: number;
};

export function DropshipOrderTracker({
  countryId,
  countryName,
  flag,
  refreshKey
}: DropshipOrderTrackerProps) {
  const copy = getDropshipMarketCopy(countryId);
  const displayCountry = getDropshipCountryDisplayName(countryId, countryName);

  const [orderToken, setOrderToken] = useState("");
  const [order, setOrder] = useState<DropshipOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Enter your order access token to view your order."
  );

  useEffect(() => {
    if (!orderToken.trim()) return;
    void loadOrder(orderToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function loadOrder(targetToken: string) {
    const token = targetToken.trim();

    if (!token) {
      setMessage("Enter your order access token to view your order.");
      setOrder(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/dropshipping/orders?orderToken=${encodeURIComponent(token)}`,
        { cache: "no-store" }
      );

      const data = (await response.json()) as {
        ok: boolean;
        order?: DropshipOrder;
        error?: string;
      };

      if (!response.ok || !data.ok || !data.order) {
        setMessage(data.error ?? "Could not load this order.");
        setOrder(null);
        return;
      }

      setOrder(data.order);
      setMessage("");
    } catch {
      setMessage(copy.checkoutErrorNetwork ?? "Network error — try again");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dropship-orders-empty mt-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8fa3c4]">
        {copy.ordersTitle?.(flag, displayCountry) ?? `${flag} ${displayCountry} · sellers`}
      </p>

      <div className="mt-2 flex flex-col gap-2 sm:max-w-md">
        <input
          type="password"
          value={orderToken}
          onChange={(event) => setOrderToken(event.target.value)}
          placeholder="Enter your order access token"
          className="w-full rounded-xl border border-white/15 bg-[#09111f] px-3 py-2 text-xs text-white outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => void loadOrder(orderToken)}
          disabled={loading}
          className="dropship-buy-btn dropship-buy-btn--compact self-start"
        >
          {loading ? (copy.ordersLoading ?? "Loading order…") : "Track order"}
        </button>
      </div>

      {message ? (
        <p className="mt-2 text-xs leading-5 text-[#9aa8c6]">{message}</p>
      ) : null}

      {order ? (
        <ul className="mt-3 space-y-2" role="list">
          <li className="rounded-2xl border border-white/10 bg-[#0a1324]/80 px-3 py-3">
            <p className="text-xs font-semibold text-white">{order.productName}</p>
            <p className="mt-1 text-[11px] text-[#9aa8c6]">
              {order.productCategory}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#d7b46a]">
              <span>{order.currency} {order.amount}</span>
              <span>•</span>
              <span>{copy.orderStatus?.[order.status] ?? order.status}</span>
              <span>•</span>
              <span>
                {new Date(order.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })}
              </span>
            </div>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
