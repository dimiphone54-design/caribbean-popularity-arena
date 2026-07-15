"use client";

import { useEffect, useState } from "react";
import { getDropshipCountryConfig } from "@/lib/dropship-country-config";
import { formatDropshipCurrency, formatUsd, refreshDropshipFxRates } from "@/lib/dropship-fx";

const SAMPLE_USD = 29;

/** China lane · display only · no fees, cuts, or on-site payment */
export function ChinaDropshipRatesPanel() {
  const config = getDropshipCountryConfig("china");
  const [fxStatus, setFxStatus] = useState<"SYNC" | "LIVE" | "CACHE" | "LOCAL">("SYNC");

  useEffect(() => {
    let active = true;

    const syncFx = async () => {
      const result = await refreshDropshipFxRates();
      if (!active) return;
      if (result.source === "live") setFxStatus("LIVE");
      else if (result.source === "cache") setFxStatus("CACHE");
      else setFxStatus("LOCAL");
    };

    void syncFx();
    const timer = window.setInterval(syncFx, 15 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!config) return null;

  const cnySample = formatDropshipCurrency(SAMPLE_USD * config.usdToLocalRate, "CNY");

  return (
    <div className="ecuador-dropship-rates china-dropship-rates" aria-label="China dropship lane info">
      <div className="ecuador-dropship-rates-head">
        <p className="ecuador-dropship-rates-kicker">🇨🇳 中国通道 · 卖家直连</p>
        <span className="ecuador-dropship-rates-fx-badge">{fxStatus} FX</span>
      </div>

      <ul className="ecuador-dropship-rates-grid" role="list">
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Lane currency</p>
          <p className="ecuador-dropship-rates-value">{config.currencyCode} · 人民币</p>
          <p className="ecuador-dropship-rates-note">
            {formatUsd(SAMPLE_USD)} ≈ {cnySample} · reference only · from China lane
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Seller region</p>
          <p className="ecuador-dropship-rates-value">中国供应商 · China</p>
          <p className="ecuador-dropship-rates-note">Price is shown on-platform and customer payment goes through platform checkout</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Ships from</p>
          <p className="ecuador-dropship-rates-value">🇨🇳 China · 上海</p>
          <p className="ecuador-dropship-rates-note">Export supplier direct · 出口供应商直发</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">How to buy</p>
          <p className="ecuador-dropship-rates-value">Contact seller</p>
          <p className="ecuador-dropship-rates-note">No payment on this site · pay the seller elsewhere</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Lane note</p>
          <p className="ecuador-dropship-rates-value">China lane only</p>
          <p className="ecuador-dropship-rates-note">{config.legalShort}</p>
        </li>
      </ul>

      <p className="ecuador-dropship-rates-foot">
        无库存 · 买家直接联系卖家 · 中国供应商直发 · 本站不收款.
      </p>
    </div>
  );
}
