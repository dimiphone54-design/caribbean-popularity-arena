"use client";

import { useEffect, useState } from "react";

import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { EastAsiaStageGameSimulator } from "@/components/east-asia-stage-game-simulator";
import { getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";
import type { RoomCountryGameRow, RoomGamesConfig } from "@/lib/room-games-registry";

type RoomCountryGamesPanelProps = {
  config: RoomGamesConfig;
  requestedGameId?: string | null;
  onRequestedGameHandled?: () => void;
  showStagePreview?: boolean;
  stageCaption?: string;
};

function rowLaunchId(row: RoomCountryGameRow) {
  return row.launch.type === "simulator" || row.launch.type === "east-asia-stage"
    ? row.launch.gameName
    : row.id;
}

/** Shared country games panel · registry-driven · all sports wired */
export function RoomCountryGamesPanel({
  config,
  requestedGameId = null,
  onRequestedGameHandled,
  showStagePreview = false,
  stageCaption
}: RoomCountryGamesPanelProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const viralGames = getArenaSlotViralGames(config.islandCode);
  const wiredNames = new Set(config.games.map((row) => row.name.toLowerCase()));

  useEffect(() => {
    if (!requestedGameId) return;
    const row = config.games.find((entry) => entry.id === requestedGameId || entry.name === requestedGameId);
    if (!row) {
      onRequestedGameHandled?.();
      return;
    }
    if (row.launch.type === "freedom-drive") {
      onRequestedGameHandled?.();
      return;
    }
    setActiveGame(rowLaunchId(row));
    onRequestedGameHandled?.();
  }, [requestedGameId, config.games, onRequestedGameHandled]);

  const activeRow = config.games.find((row) => rowLaunchId(row) === activeGame);

  return (
    <>
      <section
        id={`${config.roomSlug}-live-games`}
        className={config.panelClass}
        aria-label={`${config.countryName}: country sports games`}
      >
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">{config.panelKicker}</p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            {config.panelTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">{config.panelSubtitle}</p>
        </header>

        {showStagePreview ? (
          <div className="east-asia-live-stage east-asia-live-stage--preview mt-4" aria-hidden="true">
            <div className="east-asia-live-stage-lights" />
            <div className="east-asia-live-stage-floor" />
            <div className="east-asia-live-stage-fighter east-asia-live-stage-fighter--left">
              <span className="east-asia-live-stage-fighter-icon">🥋</span>
              <span className="east-asia-live-stage-fighter-sword">⚔️</span>
            </div>
            <div className="east-asia-live-stage-fighter east-asia-live-stage-fighter--right">
              <span className="east-asia-live-stage-fighter-icon">🥋</span>
              <span className="east-asia-live-stage-fighter-sword">⚔️</span>
            </div>
            <div className="east-asia-live-stage-clash east-asia-live-stage-clash--idle">
              <span className="east-asia-live-stage-flame" />
            </div>
            {stageCaption ? <p className="east-asia-live-stage-caption">{stageCaption}</p> : null}
          </div>
        ) : null}

        <div className="cotswolds-game-board mt-4 space-y-2.5" role="list">
          {config.games.map((row) => {
            const playing = activeGame === rowLaunchId(row);

            if (row.launch.type === "freedom-drive") {
              return (
                <a
                  key={row.id}
                  href={row.launch.anchor}
                  className={`cotswolds-game-row ${config.rowClass} block no-underline`}
                >
                  <GameRowContent row={row} playing={false} readyLabel={`${row.ready}% ready · open 3D simulator`} cta="▶ DRIVE" />
                </a>
              );
            }

            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setActiveGame(rowLaunchId(row))}
                aria-pressed={playing}
                className={`cotswolds-game-row ${config.rowClass}${playing ? " cotswolds-game-row--live" : ""}`}
              >
                <GameRowContent
                  row={row}
                  playing={playing}
                  readyLabel={
                    playing ? "In simulator · play live" : `${row.ready}% ready · tap to play`
                  }
                  cta={playing ? "● PLAYING" : "▶ PLAY GAME"}
                />
              </button>
            );
          })}
        </div>

        <div className={`mt-4 flex flex-wrap justify-center gap-2 ${config.chipClass ? "" : ""}`} role="list">
          {viralGames
            .filter((game) => !wiredNames.has(game.label.split("·")[0]?.trim().toLowerCase() ?? ""))
            .map((game) => (
              <span key={game.id} className={config.chipClass} role="listitem" title={game.hint}>
                <span aria-hidden="true">{game.emoji}</span>
                <span>{game.label}</span>
              </span>
            ))}
        </div>
      </section>

      {activeRow && activeRow.launch.type === "simulator" ? (
        <CotswoldsGameSimulator
          gameName={activeRow.launch.gameName}
          host={config.host}
          roomKicker={config.roomKicker}
          onClose={() => setActiveGame(null)}
        />
      ) : null}

      {activeRow && activeRow.launch.type === "east-asia-stage" ? (
        <EastAsiaStageGameSimulator
          gameName={activeRow.launch.gameName}
          host={config.host}
          roomKicker={config.roomKicker}
          countryLabel={config.countryName}
          onClose={() => setActiveGame(null)}
        />
      ) : null}
    </>
  );
}

function GameRowContent({
  row,
  playing,
  readyLabel,
  cta
}: {
  row: RoomCountryGameRow;
  playing: boolean;
  readyLabel: string;
  cta: string;
}) {
  return (
    <>
      <span className="cotswolds-hero-rank cotswolds-game-rank" aria-hidden="true">
        <span className="cotswolds-hero-rank-word">SET</span>
        <span className="cotswolds-hero-rank-num">{row.set}</span>
      </span>
      <span className="cotswolds-game-main">
        <span className="cotswolds-game-tag">{row.tag}</span>
        <span className="cotswolds-game-name">
          <span className="cotswolds-game-flag" aria-hidden="true">
            {row.emoji}
          </span>
          {row.name}
        </span>
        <span className="cotswolds-game-host">{row.host}</span>
        {playing ? <span className="cotswolds-game-host">{row.hint}</span> : null}
        <span className="cotswolds-game-graph" aria-hidden="true">
          <span className="cotswolds-game-graph-fill" style={{ width: `${playing ? 100 : row.ready}%` }} />
        </span>
        <span className="cotswolds-game-meter">{readyLabel}</span>
      </span>
      <span className={`cotswolds-game-cta${playing ? " cotswolds-game-cta--live" : ""}`}>{cta}</span>
    </>
  );
}