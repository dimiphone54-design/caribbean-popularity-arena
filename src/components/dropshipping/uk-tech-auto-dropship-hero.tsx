"use client";

/** Public UK room · Tech & Automotive lane face (no fee % — Command Center only) */
export function UkTechAutoDropshipHero({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`uk-tech-auto-dropship-hero${compact ? " uk-tech-auto-dropship-hero--compact" : ""}`}
      aria-label="United Kingdom Tech and Automotive Lane"
    >
      <div className="uk-tech-auto-dropship-hero-glow" aria-hidden="true" />
      <p className="uk-tech-auto-dropship-hero-kicker">🇬🇧 United Kingdom</p>
      <h2 className="uk-tech-auto-dropship-hero-title">Tech &amp; Automotive Lane</h2>
      <p className="uk-tech-auto-dropship-hero-sub">
        Premium Dropship • Supplier Ships Direct from UK
      </p>
      <p className="uk-tech-auto-dropship-hero-foot">
        Secure USD checkout on the Arena • UK supplier ships direct • Tracking provided
      </p>
    </div>
  );
}
