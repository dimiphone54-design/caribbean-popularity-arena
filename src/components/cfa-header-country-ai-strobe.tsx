import type { CfaHeaderSlotCountryMap } from "@/lib/cfa-header-slot-country-maps";

type CfaHeaderCountryAiStrobeProps = {
  country: CfaHeaderSlotCountryMap;
  withJoinAnchor?: boolean;
};

/** AI white strobe coast rings · Trinidad-exact + slot nation silhouettes */
export function CfaHeaderCountryAiStrobe({ country, withJoinAnchor = false }: CfaHeaderCountryAiStrobeProps) {
  const primaryPath = country.silhouettePaths[0] ?? "";

  return (
    <g className="cfa-elite-ai-header-tt-strobe" aria-hidden="true">
      <defs>
        <filter id={`cfaSlotStrobeGlow-${country.islandCode}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.2 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {withJoinAnchor ? (
        <circle
          id="cfa-slot-join-anchor"
          cx={country.joinAnchor.cx}
          cy={country.joinAnchor.cy}
          r="1.5"
          fill="none"
          stroke="none"
        />
      ) : null}

      {country.silhouettePaths.map((path, index) => (
        <g key={`${country.islandCode}-${index}`}>
          <path
            d={path}
            className={`cfa-elite-ai-header-tt-strobe-coast${index > 0 ? " cfa-elite-ai-header-tt-strobe-coast-tobago" : ""}`}
          />
          <path
            d={path}
            className={`cfa-elite-ai-header-tt-strobe-halo${index > 0 ? " cfa-elite-ai-header-tt-strobe-halo-tobago" : ""}`}
          />
          <path
            d={path}
            className={`cfa-elite-ai-header-tt-strobe-track${index > 0 ? " cfa-elite-ai-header-tt-strobe-track-tobago" : ""}`}
          />
        </g>
      ))}

      {primaryPath ? (
        <circle r="3.2" className="cfa-elite-ai-header-tt-strobe-node">
          <animateMotion dur="5.6s" repeatCount="indefinite" path={primaryPath} />
        </circle>
      ) : null}

      {country.silhouettePaths[1] ? (
        <circle r="2.4" className="cfa-elite-ai-header-tt-strobe-node cfa-elite-ai-header-tt-strobe-node-tobago">
          <animateMotion dur="2.8s" repeatCount="indefinite" path={country.silhouettePaths[1]} />
        </circle>
      ) : null}
    </g>
  );
}
