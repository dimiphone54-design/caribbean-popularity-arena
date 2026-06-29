"use client";

import { useFreedomDrive } from "@/components/freedom-drive/freedom-drive-context";

function SpeedRing({ speedMph }: { speedMph: number }) {
  const max = 130;
  const pct = Math.min(1, speedMph / max);
  const circumference = 2 * Math.PI * 42;
  const dash = circumference * pct;

  return (
    <div className="fd-speed-ring" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="fd-speed-ring-svg">
        <circle cx="50" cy="50" r="42" className="fd-speed-ring-track" />
        <circle
          cx="50"
          cy="50"
          r="42"
          className="fd-speed-ring-fill"
          strokeDasharray={`${dash} ${circumference}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="fd-speed-ring-center">
        <span className="fd-speed-ring-value">{Math.round(speedMph)}</span>
        <span className="fd-speed-ring-unit">MPH</span>
      </div>
    </div>
  );
}

export function FreedomDriveHud() {
  const { stats, playerName, theme } = useFreedomDrive();

  return (
    <div className="fd-hud pointer-events-none absolute inset-0 z-20">
      <div className="fd-hud-corner fd-hud-top-left">
        <p className="fd-hud-label">{theme.hudSpeed}</p>
        <p className="fd-hud-value fd-hud-speed">{Math.round(stats.speedMph)} mph</p>
        {stats.driftActive ? <span className="fd-hud-drift">{theme.hudDrift}</span> : null}
      </div>

      <div className="fd-hud-corner fd-hud-top-right">
        <p className="fd-hud-label">{theme.hudPlayer}</p>
        <p className="fd-hud-value">{playerName}</p>
        <p className="fd-hud-sub">
          {theme.flag} {theme.country}
        </p>
      </div>

      <div className="fd-hud-corner fd-hud-bottom-left">
        <p className="fd-hud-label">{theme.hudRank}</p>
        <p className="fd-hud-value fd-hud-rank">{stats.drivingRank}</p>
        {stats.collisionCount > 0 ? (
          <p className="fd-hud-sub">
            {theme.hudImpacts} · {stats.collisionCount}
          </p>
        ) : null}
      </div>

      <div className="fd-hud-corner fd-hud-bottom-right">
        <p className="fd-hud-label">{theme.hudPoints}</p>
        <p className="fd-hud-value fd-hud-points">{stats.arenaPoints.toLocaleString()}</p>
        <p className="fd-hud-sub">
          {(stats.distanceM / 1000).toFixed(2)} {theme.hudKmDriven}
        </p>
      </div>

      <div className="fd-hud-speedometer">
        <SpeedRing speedMph={stats.speedMph} />
      </div>
    </div>
  );
}
