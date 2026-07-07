"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CfaNavFifaRecap } from "@/components/cfa-nav-fifa-recap";
import {
  FIFA_RECAP_STYLE_KEY,
  FIFA_RECAP_STYLES,
  isFifaRecapStyle,
  type FifaRecapStyle
} from "@/lib/football-fifa-nav-recap";

export function FifaRecapStylesPreview() {
  const [activeStyle, setActiveStyle] = useState<FifaRecapStyle>("cinematic");
  const [savedStyle, setSavedStyle] = useState<FifaRecapStyle | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(FIFA_RECAP_STYLE_KEY);
    if (stored && isFifaRecapStyle(stored)) {
      setActiveStyle(stored);
      setSavedStyle(stored);
    }
  }, []);

  const applyStyle = (style: FifaRecapStyle) => {
    window.localStorage.setItem(FIFA_RECAP_STYLE_KEY, style);
    setActiveStyle(style);
    setSavedStyle(style);
  };

  return (
    <main className="fifa-recap-styles-page">
      <header className="fifa-recap-styles-head">
        <p className="fifa-recap-styles-kicker">LIVE SPORTS panel · today&apos;s games</p>
        <h1 className="fifa-recap-styles-title">Pick your clip style</h1>
        <p className="fifa-recap-styles-sub">
          Real highlight clips from the internet · games played today · tomorrow upcoming from
          API-Sports. Choose one style — it applies to the nav sports panel.
        </p>
        {savedStyle ? (
          <p className="fifa-recap-styles-saved">
            Active in nav: <strong>{FIFA_RECAP_STYLES.find((s) => s.id === savedStyle)?.label}</strong>
          </p>
        ) : null}
        <Link href="/" className="fifa-recap-styles-back">
          ← Back to arena
        </Link>
      </header>

      <div className="fifa-recap-styles-grid">
        {FIFA_RECAP_STYLES.map((style) => (
          <section
            key={style.id}
            className={`fifa-recap-styles-card${activeStyle === style.id ? " fifa-recap-styles-card--active" : ""}`}
          >
            <div className="fifa-recap-styles-card-head">
              <h2>{style.label}</h2>
              <p>{style.blurb}</p>
            </div>

            <div className="fifa-recap-styles-mock-panel" aria-hidden="true">
              <div className="fifa-recap-styles-mock-hud">
                <span>LIVE · SPORTS</span>
              </div>
              <CfaNavFifaRecap style={style.id} compact={false} />
              <div className="fifa-recap-styles-mock-strip">
                <span>API-Sports strip</span>
              </div>
            </div>

            <button
              type="button"
              className={`fifa-recap-styles-apply${savedStyle === style.id ? " fifa-recap-styles-apply--saved" : ""}`}
              onClick={() => applyStyle(style.id)}
            >
              {savedStyle === style.id ? "✓ Applied to nav panel" : `Use ${style.label}`}
            </button>
          </section>
        ))}
      </div>
    </main>
  );
}