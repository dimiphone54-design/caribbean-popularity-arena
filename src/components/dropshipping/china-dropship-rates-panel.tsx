"use client";

import { useEffect, useMemo, useState } from "react";
import {
  computeDropshipLaneSplit,
  getDropshipCountryConfig,
  getDropshipProcessingUsd,
  getDropshipSupplierCostUsd
} from "@/lib/dropship-country-config";
import { formatDropshipCurrency, formatUsd, refreshDropshipFxRates } from "@/lib/dropship-fx";

const SAMPLE_USD = 29;

/** China lane · exact supplier % · processing % · CNY · Arena split */
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

  const split5050 = useMemo(() => computeDropshipLaneSplit("china", SAMPLE_USD, 50), []);
  const split7030 = useMemo(() => computeDropshipLaneSplit("china", SAMPLE_USD, 70), []);
  const processingUsd = useMemo(() => getDropshipProcessingUsd("china", SAMPLE_USD), []);
  const supplierUsd = useMemo(() => getDropshipSupplierCostUsd("china", SAMPLE_USD), []);

  if (!config) return null;

  const supplierPct = config.supplierCostPercent;
  const processingPct = config.processingPercent;
  const cnySample = formatDropshipCurrency(SAMPLE_USD * config.usdToLocalRate, "CNY");

  return (
    <div className="ecuador-dropship-rates china-dropship-rates" aria-label="China dropship lane rates">
      <div className="ecuador-dropship-rates-head">
        <p className="ecuador-dropship-rates-kicker">🇨🇳 中国通道 · 精确费率</p>
        <span className="ecuador-dropship-rates-fx-badge">{fxStatus} FX</span>
      </div>

      <ul className="ecuador-dropship-rates-grid" role="list">
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Lane currency</p>
          <p className="ecuador-dropship-rates-value">{config.currencyCode} · 人民币</p>
          <p className="ecuador-dropship-rates-note">
            {formatUsd(SAMPLE_USD)} ≈ {cnySample} · from China lane
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Supplier from China</p>
          <p className="ecuador-dropship-rates-value">{supplierPct}% of retail</p>
          <p className="ecuador-dropship-rates-note">
            ≈ {formatUsd(supplierUsd)} on {formatUsd(SAMPLE_USD)} order · 中国供应商
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Processing</p>
          <p className="ecuador-dropship-rates-value">{processingPct}% + $0.30</p>
          <p className="ecuador-dropship-rates-note">
            ≈ {formatUsd(processingUsd)} on {formatUsd(SAMPLE_USD)} · arena checkout
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Arena Plus split</p>
          <p className="ecuador-dropship-rates-value">50/50 · 70/30 host</p>
          <p className="ecuador-dropship-rates-note">
            50/50 H {formatUsd(split5050.hostUsd)} · 70/30 H {formatUsd(split7030.hostUsd)} · m{" "}
            {formatUsd(split5050.marginUsd)}
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Ships from</p>
          <p className="ecuador-dropship-rates-value">🇨🇳 China · 上海</p>
          <p className="ecuador-dropship-rates-note">Export supplier direct · 出口供应商直发</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Lane legal</p>
          <p className="ecuador-dropship-rates-value">China lane only</p>
          <p className="ecuador-dropship-rates-note">{config.legalShort}</p>
        </li>
      </ul>

      <p className="ecuador-dropship-rates-foot">
        无库存 · 在竞技场付款 · 中国供应商直发 · 同一邮箱追踪订单 below.
      </p>
    </div>
  );
}