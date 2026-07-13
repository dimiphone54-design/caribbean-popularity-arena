"use client";

import { useEffect, useState } from "react";
import { getDropshipCountryConfig } from "@/lib/dropship-country-config";
import { refreshDropshipFxRates } from "@/lib/dropship-fx";

/** Ecuador lane · display only · no fees, cuts, or on-site payment */
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

  if (!config) return null;

  return (
    <div className="ecuador-dropship-rates" aria-label="Info dropship Ecuador · carril">
      <div className="ecuador-dropship-rates-head">
        <p className="ecuador-dropship-rates-kicker">Carril · contacto directo con vendedor</p>
        <span className="ecuador-dropship-rates-fx-badge">{fxStatus} FX</span>
      </div>

      <ul className="ecuador-dropship-rates-grid" role="list">
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Moneda carril</p>
          <p className="ecuador-dropship-rates-value">{config.currencyCode} · dólar Ecuador</p>
          <p className="ecuador-dropship-rates-note">Referencia de lista · precio final con el vendedor</p>
        </li>
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Cómo comprar</p>
          <p className="ecuador-dropship-rates-value">Contactar vendedor</p>
          <p className="ecuador-dropship-rates-note">Sin pago en esta web · pagas al vendedor fuera del sitio</p>
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
        <li className="ecuador-dropship-rates-cell" role="listitem">
          <p className="ecuador-dropship-rates-label">Nota del carril</p>
          <p className="ecuador-dropship-rates-value">Ecuador</p>
          <p className="ecuador-dropship-rates-note">{config.legalShort}</p>
        </li>
      </ul>

      <p className="ecuador-dropship-rates-foot">
        Sin inventario en la arena · sin cobro en el sitio · contacta al vendedor y paga fuera · el socio en Ecuador
        envía a tu puerta.
      </p>
    </div>
  );
}
