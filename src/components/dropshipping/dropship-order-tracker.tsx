"use client";

import { useEffect, useState } from "react";
import { formatDropshipPrice, getDropshipProduct, type DropshipOrder } from "@/lib/dropshipping";
import {
  getDropshipCountryDisplayName,
  getDropshipMarketCopy,
  getDropshipProductDisplay
} from "@/lib/dropship-market-copy";
import {
  fetchDropshipOrdersFromServer,
  getSavedDropshipBuyerEmail,
  readDropshipOrders
} from "@/lib/dropshipping-orders";

type DropshipOrderTrackerProps = {
  countryId: string;
  countryName: string;
  flag: string;
  refreshKey?: number;
};

export function DropshipOrderTracker({ countryId, countryName, flag, refreshKey = 0 }: DropshipOrderTrackerProps) {
  const [orders, setOrders] = useState<DropshipOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const savedEmail = getSavedDropshipBuyerEmail();
  const copy = getDropshipMarketCopy(countryId);
  const displayCountry = getDropshipCountryDisplayName(countryId, countryName);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const local = readDropshipOrders(countryId);
      if (savedEmail) {
        const remote = await fetchDropshipOrdersFromServer(savedEmail, countryId);
        if (!active) return;
        const merged = [...remote];
        local.forEach((order) => {
          if (!merged.some((entry) => entry.id === order.id)) merged.push(order);
        });
        setOrders(merged);
      } else {
        setOrders(local);
      }
      if (active) setLoading(false);
    };

    load();
    return () => {
      active = false;
    };
  }, [countryId, refreshKey, savedEmail]);

  if (loading && !orders.length) {
    return (
      <div className="dropship-orders-empty mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8fa3c4]">
          {copy.ordersTitle(flag, displayCountry)}
        </p>
        <p className="mt-1 text-xs text-[#9fb4d4]">{copy.ordersLoading}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="dropship-orders-empty mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8fa3c4]">
          {copy.ordersTitle(flag, displayCountry)}
        </p>
        <p className="mt-1 text-xs text-[#9fb4d4]">{copy.ordersEmpty}</p>
      </div>
    );
  }

  return (
    <div className="dropship-orders mt-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b8ff3c]">
        {copy.ordersTitle(flag, displayCountry)}
        {savedEmail ? <span className="dropship-orders-email"> · {savedEmail}</span> : null}
      </p>
      <ul className="dropship-orders-list mt-2" role="list">
        {orders.map((order) => {
          const product = getDropshipProduct(order.productId);
          const orderLabel = product
            ? getDropshipProductDisplay(product, countryId).category
            : copy.ordersItemFallback;

          return (
          <li key={order.id} className="dropship-order-row" role="listitem">
            <div className="dropship-order-main">
              <span className="dropship-order-name">{orderLabel}</span>
              <span className="dropship-order-price">
                {formatDropshipPrice(order.amount, order.currency, countryId)}
              </span>
            </div>
            <div className="dropship-order-meta">
              <span className={`dropship-order-status dropship-order-status--${order.status}`}>
                {copy.orderStatus[order.status]}
              </span>
              <span className="dropship-order-date">
                {new Date(order.orderedAt).toLocaleDateString()}
              </span>
            </div>
            {order.trackingNote ? <p className="dropship-order-track">{order.trackingNote}</p> : null}
          </li>
          );
        })}
      </ul>
    </div>
  );
}
