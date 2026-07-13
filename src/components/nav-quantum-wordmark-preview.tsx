"use client";

import Link from "next/link";

const snowFlakes = [
  { left: "4%", size: "3px", opacity: 0.9, duration: "3.2s", delay: "0s", drift: "6px" },
  { left: "12%", size: "2px", opacity: 0.7, duration: "4.1s", delay: "0.8s", drift: "-5px" },
  { left: "21%", size: "4px", opacity: 0.85, duration: "3.6s", delay: "1.6s", drift: "8px" },
  { left: "30%", size: "2px", opacity: 0.6, duration: "4.6s", delay: "0.3s", drift: "-7px" },
  { left: "39%", size: "3px", opacity: 0.95, duration: "3s", delay: "2.1s", drift: "5px" },
  { left: "48%", size: "2px", opacity: 0.7, duration: "4.3s", delay: "1.1s", drift: "-6px" },
  { left: "57%", size: "4px", opacity: 0.8, duration: "3.4s", delay: "0.6s", drift: "7px" },
  { left: "66%", size: "2px", opacity: 0.65, duration: "4.8s", delay: "1.9s", drift: "-4px" },
  { left: "74%", size: "3px", opacity: 0.9, duration: "3.1s", delay: "0.2s", drift: "6px" },
  { left: "82%", size: "2px", opacity: 0.7, duration: "4.4s", delay: "1.3s", drift: "-8px" },
  { left: "90%", size: "4px", opacity: 0.85, duration: "3.7s", delay: "2.4s", drift: "5px" },
  { left: "96%", size: "2px", opacity: 0.6, duration: "4s", delay: "0.9s", drift: "-5px" }
] as const;

type QuantumVariant = {
  id: string;
  name: string;
  tagline: string;
  lockupClass: string;
  freedomClass: string;
  popularityClass: string;
  freedomTextClass: string;
  popularityTextClass: string;
};

const variants: QuantumVariant[] = [
  {
    id: "current",
    name: "Current",
    tagline: "Caribbean gradient pill + ice snow — live on site now",
    lockupClass: "",
    freedomClass: "cfa-nav-wordmark-pill",
    popularityClass: "cfa-nav-wordmark-pill cfa-nav-wordmark-pill--snow",
    freedomTextClass: "cfa-nav-wordmark-pill-text",
    popularityTextClass: "cfa-nav-wordmark-pill-text cfa-nav-wordmark-pill-text--snow relative z-10"
  },
  {
    id: "A",
    name: "A · Plasma Core",
    tagline: "Rotating quantum plasma ring · cyan-magenta reactor glow",
    lockupClass: "cfa-nav-quantum-lockup--plasma",
    freedomClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom",
    popularityClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--snow",
    freedomTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom",
    popularityTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10"
  },
  {
    id: "B",
    name: "B · Holo Chrome",
    tagline: "4K holographic chrome sweep · prismatic glass refraction",
    lockupClass: "cfa-nav-quantum-lockup--holo",
    freedomClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom",
    popularityClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--snow",
    freedomTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom",
    popularityTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10"
  },
  {
    id: "C",
    name: "C · Scan Grid",
    tagline: "CRT scanlines + quantum HUD grid · elite 4K terminal",
    lockupClass: "cfa-nav-quantum-lockup--scan",
    freedomClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom",
    popularityClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--snow",
    freedomTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom",
    popularityTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10"
  },
  {
    id: "D",
    name: "D · Electric Trace",
    tagline: "Live conic lightning border · International SUITE energy",
    lockupClass: "cfa-nav-quantum-lockup--trace",
    freedomClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom",
    popularityClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--snow",
    freedomTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom",
    popularityTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10"
  },
  {
    id: "E",
    name: "E · Void Ring",
    tagline: "Singularity void core · pulsing quantum orbit rings",
    lockupClass: "cfa-nav-quantum-lockup--void",
    freedomClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom",
    popularityClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--snow",
    freedomTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom",
    popularityTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10"
  },
  {
    id: "F",
    name: "F · Elite 4K",
    tagline: "Broadcast gold bezel · luxury arena slot-grade 4K finish",
    lockupClass: "cfa-nav-quantum-lockup--elite",
    freedomClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom",
    popularityClass: "cfa-nav-quantum-pill cfa-nav-quantum-pill--popularity cfa-nav-quantum-pill--snow",
    freedomTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom",
    popularityTextClass: "cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--popularity relative z-10"
  }
];

function PopularitySnow() {
  return (
    <span className="cfa-nav-wordmark-snow-layer cfa-nav-quantum-snow-layer" aria-hidden="true">
      {snowFlakes.map((flake, index) => (
        <span
          key={`preview-snow-${index}`}
          className="cfa-nav-quantum-snow-flake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            ["--snow-drift" as string]: flake.drift
          }}
        />
      ))}
    </span>
  );
}

function TwinPills({ variant }: { variant: QuantumVariant }) {
  const lockupClasses = ["a2030-nav-brand-group", "cfa-nav-quantum-lockup", variant.lockupClass].filter(Boolean).join(" ");

  return (
    <div className={lockupClasses}>
      <span className={`a2030-brand ${variant.freedomClass} min-w-0 shrink`}>
        <span className={variant.freedomTextClass}>CARIBBEANFREEDOMARENA</span>
      </span>
      <span className={`a2030-brand ${variant.popularityClass} min-w-0 shrink`} aria-label="Caribbean Popularity Arena">
        <PopularitySnow />
        <span className={variant.popularityTextClass}>CARIBBEAN POPULARITY ARENA</span>
      </span>
    </div>
  );
}

export function NavQuantumWordmarkPreview() {
  return (
    <div className="nav-quantum-preview-page arena-2030">
      <div className="nav-quantum-preview-hero">
        <p className="nav-quantum-preview-kicker">4K Quantum Nav Wordmark · Pick Your Lockup</p>
        <h1 className="nav-quantum-preview-title">Twin Panel Style Gallery</h1>
        <p className="nav-quantum-preview-lead">
          Seven looks for <strong>CARIBBEANFREEDOMARENA</strong> + <strong>CARIBBEAN POPULARITY ARENA</strong> in the same nav
          slot. Reply with the letter (<strong>A</strong>–<strong>F</strong>) or <strong>Current</strong> to apply it live.
        </p>
      </div>

      <div className="nav-quantum-preview-grid">
        {variants.map((variant) => (
          <article key={variant.id} className="nav-quantum-preview-card" id={`variant-${variant.id}`}>
            <header className="nav-quantum-preview-card-head">
              <span className="nav-quantum-preview-badge">{variant.id}</span>
              <div>
                <h2 className="nav-quantum-preview-card-title">{variant.name}</h2>
                <p className="nav-quantum-preview-card-tag">{variant.tagline}</p>
              </div>
            </header>

            <div className="nav-quantum-preview-stage" aria-label={`${variant.name} preview`}>
              <div className="nav-quantum-preview-nav-mock">
                <TwinPills variant={variant} />
                <span className="nav-quantum-preview-nav-fake-cta">Sign In</span>
              </div>
            </div>

            <p className="nav-quantum-preview-pick">
              Choose: <code>{variant.id}</code>
            </p>
          </article>
        ))}
      </div>

      <p className="nav-quantum-preview-footer">
        <Link href="/" className="nav-quantum-preview-home-link">
          ← Back to live arena
        </Link>
      </p>
    </div>
  );
}