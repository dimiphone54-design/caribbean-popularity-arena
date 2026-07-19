"use client";

import { useEffect, useState } from "react";
import { getDropshipCountryDisplayName, getDropshipMarketCopy } from "@/lib/dropship-market-copy";

type DropshipOrder = {
  id: string;
  productName: string;
  productCategory: string;
  amount: string;
  currency: string;
  platformAmount: string;
  supplierAmount: string;
  platformPct: number;
  supplierPct: number;
  status: string;
  createdAt: string;
};

type DropshipOrderTrackerProps = {
  countryId: string;
  countryName: string;
  flag: string;
  refreshKey?: number;
};

export function DropshipOrderTracker({ countryId, countryName, flag, refreshKey }: DropshipOrderTrackerProps) {
  const copy = getDropshipMarketCopy(countryId);
  const displayCountry = getDropshipCountryDisplayName(countryId, countryName);
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<DropshipOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Enter your checkout email to see your orders.");

  useEffect(() => {
    if (!email.trim()) return;
    void loadOrders(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function loadOrders(targetEmail: string) {
    const normalized = targetEmail.trim().toLowerCase();
    if (!normalized) {
      setMessage("Enter your checkout email to see your orders.");
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/dropshipping/orders?email=${encodeURIComponent(normalized)}&countryId=${encodeURIComponent(countryId)}`);
      const data = (await response.json()) as { ok: boolean; orders?: DropshipOrder[]; error?: string };
      if (!response.ok || !data.ok) {
        setMessage(data.error ?? "Could not load orders.");
        setOrders([]);
        return;
      }

      const nextOrders = data.orders ?? [];
      setOrders(nextOrders);
      setMessage(nextOrders.length ? "" : copy.ordersEmpty);
    } catch {
      setMessage(copy.checkoutErrorNetwork ?? "Network error — try again");
      setOrders([]);
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
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your order email"
          className="w-full rounded-xl border border-white/15 bg-[#09111f] px-3 py-2 text-xs text-white outline-none"
          autoComplete="email"
        />
        <button type="button" onClick={() => void loadOrders(email)} className="dropship-buy-btn dropship-buy-btn--compact self-start">
          {loading ? (copy.ordersLoading ?? "Loading orders…") : "Load orders"}
        </button>
      </div>
      {message ? <p className="mt-2 text-xs leading-5 text-[#9aa8c6]">{message}</p> : null}
      {orders.length ? (
        <ul className="mt-3 space-y-2" role="list">
          {orders.map((order) => (
            <li key={order.id} className="rounded-2xl border border-white/10 bg-[#0a1324]/80 px-3 py-3">
              <p className="text-xs font-semibold text-white">{order.productName}</p>
              <p className="mt-1 text-[11px] text-[#9aa8c6]">{order.productCategory}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#d7b46a]">
                <span>
                  {order.currency} {order.amount}
                </span>
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
              {/* Platform / supplier fee splits stay owner-only in Command Center — never on public order UI */}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
