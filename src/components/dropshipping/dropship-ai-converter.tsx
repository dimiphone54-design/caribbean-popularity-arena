"use client";

import { useEffect, useMemo, useState } from "react";
import {
  computeDropshipLaneSplit,
  getAllDropshipCountryConfigs
} from "@/lib/dropship-country-config";
import {
  convertCountryToCountry,
  formatDropshipCurrency,
  formatUsd,
  refreshDropshipFxRates
} from "@/lib/dropship-fx";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { triggerIntlSuiteNeonFlash } from "@/lib/intl-suite-neon-flash";
import { getDropshipMarketCopy, isChinaDropshipMarket, isJapanDropshipMarket } from "@/lib/dropship-market-copy";

type DropshipAiConverterProps = {
  defaultCountryId: string;
  defaultToCountryId?: string;
  defaultUsd?: number;
  variant?: "compact" | "full";
};

/** LIVE AI GENERATOR · Dropshipping · compact China-tech panel · exact automated FX + split */
export function DropshipAiConverter({
  defaultCountryId,
  defaultToCountryId,
  defaultUsd = 29,
  variant = "full"
}: DropshipAiConverterProps) {
  const compact = variant === "compact";
  const copy = getDropshipMarketCopy(defaultCountryId);
  const japanAi = isJapanDropshipMarket(defaultCountryId);
  const chinaAi = isChinaDropshipMarket(defaultCountryId);

  const countries = useMemo(
    () =>
      internationalSuiteCountries.map((country) => {
        const config = getAllDropshipCountryConfigs().find((entry) => entry.countryId === country.id);
        return { ...country, config };
      }),
    []
  );

  const [fromCountryId, setFromCountryId] = useState(defaultCountryId);
  const [toCountryId, setToCountryId] = useState(
    defaultToCountryId ?? countries.find((c) => c.id !== defaultCountryId)?.id ?? "uk"
  );
  const [usdAmount, setUsdAmount] = useState(defaultUsd);
  const [fxLive, setFxLive] = useState(false);
  const [fxStatus, setFxStatus] = useState("SYNC");

  useEffect(() => {
    setFromCountryId(defaultCountryId);
  }, [defaultCountryId]);

  useEffect(() => {
    if (defaultToCountryId) {
      setToCountryId(defaultToCountryId);
    }
  }, [defaultToCountryId]);

  useEffect(() => {
    setUsdAmount(defaultUsd);
  }, [defaultUsd]);

  useEffect(() => {
    let active = true;

    const syncFx = async () => {
      const result = await refreshDropshipFxRates();
      if (!active) return;
      setFxLive(result.source === "live" || result.source === "cache");
      if (result.source === "live") setFxStatus("LIVE");
      else if (result.source === "cache") setFxStatus("CACHE");
      else setFxStatus("LOCAL");
    };

    syncFx();
    const timer = window.setInterval(syncFx, 15 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const [motionPulse, setMotionPulse] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const pulseTimer = window.setInterval(() => {
      setMotionPulse((value) => value + 1);
    }, 2800);

    return () => window.clearInterval(pulseTimer);
  }, []);

  const fromCountry = countries.find((c) => c.id === fromCountryId);
  const toCountry = countries.find((c) => c.id === toCountryId);

  const conversion = useMemo(() => {
    void fxLive;
    void motionPulse;
    return convertCountryToCountry(usdAmount, fromCountryId, toCountryId);
  }, [usdAmount, fromCountryId, toCountryId, fxLive, motionPulse]);

  const laneSplitBase = useMemo(
    () => computeDropshipLaneSplit(fromCountryId, usdAmount, 50),
    [fromCountryId, usdAmount]
  );

  const laneSplitL2 = useMemo(
    () => computeDropshipLaneSplit(fromCountryId, usdAmount, 70),
    [fromCountryId, usdAmount]
  );

  const tickerLine = useMemo(() => {
    const fromCode = conversion.fromCurrency;
    const toCode = conversion.toCurrency;
    return [
      `${fxStatus} FX`,
      `${fromCountry?.flag ?? ""} ${fromCode}→${toCountry?.flag ?? ""} ${toCode}`,
      formatUsd(conversion.usdAmount),
      formatDropshipCurrency(conversion.fromLocal, fromCode),
      formatDropshipCurrency(conversion.toLocal, toCode),
      `50/50 H ${formatUsd(laneSplitBase.hostUsd)}`,
      `70/30 H ${formatUsd(laneSplitL2.hostUsd)}`,
      "AI AUTOMATED · EXACT INFO"
    ].join(" · ");
  }, [conversion, fxStatus, fromCountry?.flag, laneSplitBase.hostUsd, laneSplitL2.hostUsd, toCountry?.flag]);

  return (
    <section
      className={`dropship-live-ai-gen dropship-live-ai-gen--motion${compact ? " dropship-live-ai-gen--compact" : ""}${fxLive ? " dropship-live-ai-gen--live" : ""}${japanAi ? " dropship-live-ai-gen--japan" : ""}${chinaAi ? " dropship-live-ai-gen--china" : ""}`}
      data-country-id={defaultCountryId}
      data-motion-pulse={motionPulse}
      aria-label={copy.aiAria}
    >
      <div className="dropship-live-ai-gen-chassis" aria-hidden="true" />
      <div className="dropship-live-ai-gen-grid" aria-hidden="true" />
      <div className="dropship-live-ai-gen-beam" aria-hidden="true" />
      <div className="dropship-live-ai-gen-scan" aria-hidden="true" />
      <div className="dropship-live-ai-gen-flow" aria-hidden="true">
        <span className="dropship-live-ai-gen-flow-bit dropship-live-ai-gen-flow-bit--a" />
        <span className="dropship-live-ai-gen-flow-bit dropship-live-ai-gen-flow-bit--b" />
        <span className="dropship-live-ai-gen-flow-bit dropship-live-ai-gen-flow-bit--c" />
      </div>

      <header className="dropship-live-ai-gen-head">
        <div className="dropship-live-ai-gen-title-block">
          <span className="dropship-live-ai-gen-core" aria-hidden="true">
            <span className="dropship-live-ai-gen-dot" />
          </span>
          <div className="min-w-0">
            <p className="dropship-live-ai-gen-title">{copy.aiTitle}</p>
            <p className="dropship-live-ai-gen-sub">{copy.aiSub}</p>
          </div>
        </div>
        <div className="dropship-live-ai-gen-badges">
          <span className="dropship-live-ai-gen-badge dropship-live-ai-gen-badge--live">{fxStatus}</span>
          <span
            className="dropship-live-ai-gen-badge dropship-live-ai-gen-badge--exact"
            onMouseEnter={(event) => triggerIntlSuiteNeonFlash(event.currentTarget)}
          >
            {copy.aiExact}
          </span>
        </div>
      </header>

      <div className="dropship-live-ai-gen-ticker" aria-hidden="true">
        <div className="dropship-live-ai-gen-ticker-track">
          <span>{tickerLine}</span>
          <span>{tickerLine}</span>
        </div>
      </div>

      {!compact ? (
        <p className="dropship-live-ai-gen-lead">{copy.aiLead}</p>
      ) : null}

      <div className={`dropship-live-ai-gen-controls${compact ? " dropship-live-ai-gen-controls--compact" : ""}`}>
        <label className="dropship-live-ai-gen-field">
          <span>{copy.aiFrom}</span>
          <select
            className="dropship-live-ai-gen-input"
            value={fromCountryId}
            onChange={(event) => setFromCountryId(event.target.value)}
          >
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.flag} {compact ? country.config?.currencyCode : `${country.name} · ${country.config?.currencyCode}`}
              </option>
            ))}
          </select>
        </label>

        <label className="dropship-live-ai-gen-field">
          <span>{copy.aiTo}</span>
          <select
            className="dropship-live-ai-gen-input"
            value={toCountryId}
            onChange={(event) => setToCountryId(event.target.value)}
          >
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.flag} {compact ? country.config?.currencyCode : `${country.name} · ${country.config?.currencyCode}`}
              </option>
            ))}
          </select>
        </label>

        <label className="dropship-live-ai-gen-field">
          <span>{copy.aiUsd}</span>
          <input
            type="number"
            min={0}
            step={0.01}
            className="dropship-live-ai-gen-input dropship-live-ai-gen-input--mono"
            value={usdAmount}
            onChange={(event) => setUsdAmount(Math.max(0, Number(event.target.value) || 0))}
          />
        </label>
      </div>

      <div className="dropship-live-ai-gen-stack">
        <div className="dropship-live-ai-gen-output dropship-live-ai-gen-output--live">
          {!compact ? (
            <p className="dropship-live-ai-gen-panel-label">
              <span className="dropship-live-ai-gen-panel-label-dot" aria-hidden="true" />
              {copy.aiFxLabel}
            </p>
          ) : null}
          <div className="dropship-live-ai-gen-fx-stack">
            <div className="dropship-live-ai-gen-fx-lane dropship-live-ai-gen-fx-lane--from">
              <span className="dropship-live-ai-gen-fx-tag">
                {fromCountry?.flag} {conversion.fromCurrency}
              </span>
              <strong className="dropship-live-ai-gen-exact dropship-live-ai-gen-exact--live dropship-live-ai-gen-exact--from">
                {formatDropshipCurrency(conversion.fromLocal, conversion.fromCurrency)}
              </strong>
              <span className="dropship-live-ai-gen-fx-shimmer" aria-hidden="true" />
            </div>

            <div className="dropship-live-ai-gen-fx-bridge" aria-hidden="true">
              <span className="dropship-live-ai-gen-fx-bridge-dot dropship-live-ai-gen-fx-bridge-dot--a" />
              <span className="dropship-live-ai-gen-fx-bridge-arrow">⇅</span>
              <span className="dropship-live-ai-gen-fx-bridge-dot dropship-live-ai-gen-fx-bridge-dot--b" />
            </div>

            <div className="dropship-live-ai-gen-fx-lane dropship-live-ai-gen-fx-lane--to">
              <span className="dropship-live-ai-gen-fx-tag">
                {toCountry?.flag} {conversion.toCurrency}
              </span>
              <strong className="dropship-live-ai-gen-exact dropship-live-ai-gen-exact--live dropship-live-ai-gen-exact--to">
                {formatDropshipCurrency(conversion.toLocal, conversion.toCurrency)}
              </strong>
              <span className="dropship-live-ai-gen-fx-shimmer dropship-live-ai-gen-fx-shimmer--delay" aria-hidden="true" />
            </div>

            <div className="dropship-live-ai-gen-fx-usd">
              <span className="dropship-live-ai-gen-fx-usd-beam" aria-hidden="true" />
              <strong className="dropship-live-ai-gen-base dropship-live-ai-gen-base--live dropship-live-ai-gen-exact--usd">
                {formatUsd(conversion.usdAmount)}
              </strong>
            </div>
          </div>
        </div>

        <div className="dropship-live-ai-gen-split">
          {!compact ? (
            <p className="dropship-live-ai-gen-panel-label dropship-live-ai-gen-panel-label--gold">
              <span className="dropship-live-ai-gen-panel-label-dot" aria-hidden="true" />
              {copy.aiSplitLabel}
            </p>
          ) : null}
          {compact ? (
            <p className="dropship-live-ai-gen-split-line dropship-live-ai-gen-split-line--tight dropship-live-ai-gen-split-line--live">
              {copy.aiSplitCompact(formatUsd(laneSplitBase.hostUsd), formatUsd(laneSplitL2.hostUsd))}
            </p>
          ) : (
            <>
              <p className="dropship-live-ai-gen-split-line">
                {copy.aiSplit5050(formatUsd(laneSplitBase.hostUsd), formatUsd(laneSplitBase.platformUsd))}
              </p>
              <p className="dropship-live-ai-gen-split-line">
                {copy.aiSplit7030(formatUsd(laneSplitL2.hostUsd), formatUsd(laneSplitL2.platformUsd))}
              </p>
              <p className="dropship-live-ai-gen-split-formula">
                {copy.aiSplitFormula(formatUsd(laneSplitBase.marginUsd), formatUsd(laneSplitBase.grossUsd))}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
