import { getArenaHeaderWorldCountryTracks, type WorldCountry } from "@/lib/world-countries-arena";

const TRACK_CONFIG = [
  { duration: "54s", reverse: false },
  { duration: "48s", reverse: true },
  { duration: "60s", reverse: false }
] as const;

function CountryChip({ country }: { country: WorldCountry }) {
  return (
    <span className="cfa-elite-ai-header-world-chip">
      <span className="cfa-elite-ai-header-world-flag" aria-hidden="true">
        {country.flag}
      </span>
      <span className="cfa-elite-ai-header-world-name">{country.name}</span>
    </span>
  );
}

function CountryTrack({
  countries,
  duration,
  reverse
}: {
  countries: WorldCountry[];
  duration: string;
  reverse: boolean;
}) {
  const loop = [...countries, ...countries];

  return (
    <div className="cfa-elite-ai-header-world-row">
      <div
        className={`cfa-elite-ai-header-world-track${reverse ? " cfa-elite-ai-header-world-track-reverse" : ""}`}
        style={{ ["--cfa-world-scroll-duration" as string]: duration }}
        aria-hidden="true"
      >
        {loop.map((country, index) => (
          <CountryChip key={`${country.code}-${index}`} country={country} />
        ))}
      </div>
    </div>
  );
}

export function CfaHeaderWorldCountriesSlideshow() {
  const tracks = getArenaHeaderWorldCountryTracks(TRACK_CONFIG.length);

  return (
    <div className="cfa-elite-ai-header-world-bg" aria-hidden="true">
      <div className="cfa-elite-ai-header-world-vignette" />
      <div className="cfa-elite-ai-header-world-scrim" />
      <div className="cfa-elite-ai-header-world-rows">
        {tracks.map((countries, index) => (
          <div key={index} className={`cfa-elite-ai-header-world-row-slot cfa-elite-ai-header-world-row-slot-${index}`}>
            <CountryTrack
              countries={countries}
              duration={TRACK_CONFIG[index]?.duration ?? "14s"}
              reverse={TRACK_CONFIG[index]?.reverse ?? false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
