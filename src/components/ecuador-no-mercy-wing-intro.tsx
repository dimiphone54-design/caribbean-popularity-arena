"use client";

import { EcuadorDropshipRatesPanel } from "@/components/dropshipping/ecuador-dropship-rates-panel";
import { getDropshipMarketCopy } from "@/lib/dropship-market-copy";

type EcuadorNoMercyWingIntroProps = {
  className?: string;
  variant?: "default" | "obsidian-row";
  flag?: string;
  countryName?: string;
};

/** Ecuador · dropship intro panel */
export function EcuadorNoMercyWingIntro({
  className = "",
  variant = "default",
  flag = "🇪🇨",
  countryName = "Ecuador"
}: EcuadorNoMercyWingIntroProps) {
  const copy = getDropshipMarketCopy("ecuador");
  const obsidian = variant === "obsidian-row";

  return (
    <div
      className={`dropship-market-room-intro dropship-market-room-intro--no-mercy-wing${
        obsidian ? " dropship-market-room-intro--obsidian-row" : ""
      }${className ? ` ${className}` : ""}`}
    >
      <header className="dropship-market-room-head dropship-no-mercy-wing-head">
        <div className="dropship-market-room-head-copy">
          <p className="a2030-glossy-lotto-ball-line dropship-market-room-kicker">
            <strong>{copy.title}</strong>
          </p>
          <p className="dropship-market-room-sub dropship-no-mercy-wing-sub">
            {copy.roomSub(flag, countryName)}
          </p>
        </div>
        <span className="dropship-market-badge dropship-market-badge--room dropship-no-mercy-wing-badge">
          {copy.marketOnlyBadge}
        </span>
      </header>

      <ol className="dropship-market-room-steps" role="list">
        {copy.steps.map((step) => (
          <li key={step.title} className="dropship-market-room-step" role="listitem">
            <p className="dropship-market-room-step-title">{step.title}</p>
            <p className="dropship-market-room-step-body">{step.body}</p>
          </li>
        ))}
      </ol>

      <EcuadorDropshipRatesPanel />
    </div>
  );
}
