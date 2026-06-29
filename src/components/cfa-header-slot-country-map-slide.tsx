import { CfaHeaderCountryAiStrobe } from "@/components/cfa-header-country-ai-strobe";
import { getCfaHeaderSlotFlagFill } from "@/lib/cfa-header-slot-flag-fills";
import type { CfaHeaderSlotCountryMap } from "@/lib/cfa-header-slot-country-maps";
import { arenaSlotSignInFrozenShortCopy, isArenaSlotFrozen } from "@/lib/arena-slot-sign-in-access";

type CfaHeaderSlotCountryMapSlideProps = {
  country: CfaHeaderSlotCountryMap;
  withJoinAnchor?: boolean;
  /** Hero flip backdrop · full flag colours · no slot frozen UX */
  backdrop?: boolean;
};

/** One Front 12 nation · real shape · flag colours only · no labels */
export function CfaHeaderSlotCountryMapSlide({
  country,
  withJoinAnchor = false,
  backdrop = false,
}: CfaHeaderSlotCountryMapSlideProps) {
  const gradientId = `cfa-slot-flag-fill-${country.islandCode}`;
  const clipId = `cfa-slot-flag-clip-${country.islandCode}`;
  const flagFill = getCfaHeaderSlotFlagFill(country.islandCode);
  const diagonal = flagFill.direction === "diagonal";
  const frozen = isArenaSlotFrozen(country.islandCode);
  const showFrozenSlotUx = frozen && !backdrop;

  return (
    <div
      className={`cfa-elite-ai-header-slot-map-wrap${showFrozenSlotUx ? " cfa-slot-frozen-surface" : ""}${backdrop ? " cfa-elite-ai-header-slot-map-wrap--backdrop" : ""}`}
      data-island-code={country.islandCode}
      data-slot-frozen={showFrozenSlotUx ? "true" : undefined}
    >
      <svg
        className="cfa-elite-ai-header-tt-map cfa-elite-ai-header-slot-map"
        viewBox={`0 0 ${country.width} ${country.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={diagonal ? country.width : 0}
          y2={diagonal ? country.height : country.height}
        >
          {flagFill.stops.map((stop) => (
            <stop key={`${stop.offset}-${stop.color}`} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        {!country.mapImage ? (
          <clipPath id={clipId}>
            {country.silhouettePaths.map((path, index) => (
              <path key={`${country.islandCode}-clip-${index}`} d={path} />
            ))}
          </clipPath>
        ) : null}
      </defs>

      {country.mapImage ? (
        <g className="cfa-elite-ai-header-slot-map-image">
          <image
            className="cfa-trinidad-island-micro-flag"
            href={country.mapImage}
            width={country.width}
            height={country.height}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      ) : (
        <g className="cfa-elite-ai-header-slot-silhouette" clipPath={`url(#${clipId})`}>
          {country.silhouettePaths.map((path, index) => (
            <path
              key={`${country.islandCode}-fill-${index}`}
              d={path}
              className="cfa-elite-ai-header-slot-silhouette-fill"
              fill={`url(#${gradientId})`}
            />
          ))}
          {country.islandCode === "JP" ? (
            <circle
              cx={country.joinAnchor.cx}
              cy={country.joinAnchor.cy}
              r={Math.min(country.width, country.height) * 0.105}
              fill="#BC002D"
            />
          ) : null}
          {country.islandCode === "TN" ? (
            <circle
              cx={country.joinAnchor.cx}
              cy={country.joinAnchor.cy}
              r={Math.min(country.width, country.height) * 0.12}
              fill="#FFFFFF"
            />
          ) : null}
        </g>
      )}

      {!country.mapImage
        ? country.silhouettePaths.map((path, index) => (
            <path
              key={`${country.islandCode}-edge-${index}`}
              d={path}
              className="cfa-elite-ai-header-slot-silhouette-edge"
              fill="none"
            />
          ))
        : null}

      <CfaHeaderCountryAiStrobe country={country} withJoinAnchor={withJoinAnchor} />
      </svg>

      {showFrozenSlotUx ? (
        <div className="cfa-slot-frozen-overlay" aria-hidden="true">
          <span className="cfa-slot-frozen-badge">Frozen</span>
          <p className="cfa-slot-frozen-overlay-copy">{arenaSlotSignInFrozenShortCopy}</p>
        </div>
      ) : null}
    </div>
  );
}
