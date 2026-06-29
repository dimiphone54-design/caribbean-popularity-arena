"use client";

import { useEffect, useMemo, useState } from "react";
import { computeDropshipLaneSplit, getDropshipCountryConfig, getDropshipProcessingUsd } from "@/lib/dropship-country-config";
import { formatUsd, refreshDropshipFxRates } from "@/lib/dropship-fx";

const SAMPLE_USD = 29;

/** Ecuador · real dropship lane rates · supplier · processing · Arena split */
export function EcuadorDropshipRatesPanel() {
  const config = getDropshipCountryConfig("ecuador");
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

  const split5050 = useMemo(
    () => computeDropshipLaneSplit("ecuador", SAMPLE_USD, 50),
    []
  );
  const split7030 = useMemo(
    () => computeDropshipLaneSplit("ecuador", SAMPLE_USD, 70),
    []
  );
  const processingUsd = useMemo(
    () => getDropshipProcessingUsd("ecuador", SAMPLE_USD),
    []
  );

  if (!config) return null;

  const supplierPct = config.supplierCostPercent;
  const processingPct = config.processingPercent;

  return (
    <div className="ecuador-dropship-rates" aria-label="Tarifas dropship Ecuador · carril real">
      <div className="ecuador-dropship-rates-head">
        <p className="ecuador-dropship-rates-kicker">Tarifas carril · info exacta</p>
        <span className="ecuador-dropship-rates-fx-badge">{fxStatus} FX</span>
      </div>

      <ul className="ecuador-dropship-rates-grid" role="list">
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Moneda carril</p>
          <p className="ecuador-dropship-rates-value">{config.currencyCode} · dólar Ecuador</p>
          <p className="ecuador-dropship-rates-note">Precio lista en USD · sin conversión local</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Costo proveedor</p>
          <p className="ecuador-dropship-rates-value">{supplierPct}% del retail</p>
          <p className="ecuador-dropship-rates-note">
            ≈ {formatUsd(getDropshipSupplierSample(supplierPct))} en pedido {formatUsd(SAMPLE_USD)}
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Procesamiento</p>
          <p className="ecuador-dropship-rates-value">{processingPct}% + $0.30</p>
          <p className="ecuador-dropship-rates-note">
            ≈ {formatUsd(processingUsd)} en pedido {formatUsd(SAMPLE_USD)} · checkout arena
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Reparto Arena Plus</p>
          <p className="ecuador-dropship-rates-value">50/50 · 70/30 host</p>
          <p className="ecuador-dropship-rates-note">
            50/50 H {formatUsd(split5050.hostUsd)} · 70/30 H {formatUsd(split7030.hostUsd)} · m{" "}
            {formatUsd(split5050.marginUsd)}
          </p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Envío nacional</p>
          <p className="ecuador-dropship-rates-value">3–7 días hábiles</p>
          <p className="ecuador-dropship-rates-note">Quito · Guayaquil · Cuenca · proveedor empaca directo</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Envío internacional</p>
          <p className="ecuador-dropship-rates-value">7–21 días</p>
          <p className="ecuador-dropship-rates-note">Según destino · aranceles pueden aplicar fuera de Ecuador</p>
        </li>
      </ul>

      <p className="ecuador-dropship-rates-foot">
        Sin inventario en la arena · pagas aquí · socio en Ecuador envía a tu puerta · rastrea con el mismo correo abajo.
      </p>
    </div>
  );
}

function getDropshipSupplierSample(supplierPct: number) {
  return SAMPLE_USD * (supplierPct / 100);
}
