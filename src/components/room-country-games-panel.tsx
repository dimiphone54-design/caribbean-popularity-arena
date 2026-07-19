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
  /** Auto-open a stage/simulator game on first paint (e.g. "Kendo Stage Duel") */
  defaultActiveGame?: string | null;
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
  stageCaption,
  defaultActiveGame = null
}: RoomCountryGamesPanelProps) {
  const [activeGame, setActiveGame] = useState<string | null>(() => {
    if (!defaultActiveGame) return null;
    const row = config.games.find(
      (entry) => entry.name === defaultActiveGame || entry.id === defaultActiveGame || rowLaunchId(entry) === defaultActiveGame
    );
    return row ? rowLaunchId(row) : null;
  });
  const viralGames = getArenaSlotViralGames(config.islandCode);
  const wiredNames = new Set(config.games.map((row) => row.name.toLowerCase()));

  useEffect(() => {
    if (!requestedGameId) return;
    const row = config.games.find((entry) => entry.id === requestedGameId || entry.name === requestedGameId);
    if (!row) {
      onRequestedGameHandled?.();
      return;
    }
    setActiveGame(rowLaunchId(row));
    onRequestedGameHandled?.();
  }, [requestedGameId, config.games, onRequestedGameHandled]);

  const activeRow = config.games.find((row) => rowLaunchId(row) === activeGame);
  const isJapan = config.roomSlug === "japan-room";
  const isChina = config.roomSlug === "china-room";
  const isEcuador = config.roomSlug === "ecuador-room";
  const isColombia = config.roomSlug === "colombia-room";

  const readyLabelFor = (playing: boolean, ready: number) =>
    isJapan
      ? playing
        ? "シミュレーター中 · ライブプレイ"
        : `${ready}% 準備完了 · タップでプレイ`
      : isChina
        ? playing
          ? "模拟中 · 直播游玩"
          : `${ready}% 就绪 · 点击游玩`
        : isEcuador || isColombia
          ? playing
            ? "En cancha · juega en vivo"
            : `${ready}% listo · ¡dale y juega!`
          : playing
            ? "In simulator · play live"
            : `${ready}% ready · tap to play`;

  const ctaFor = (playing: boolean) =>
    isJapan
      ? playing
        ? "● プレイ中"
        : "▶ ゲームをプレイ"
      : isChina
        ? playing
          ? "● 游玩中"
          : "▶ 开始游戏"
        : isEcuador || isColombia
          ? playing
            ? "● EN CANCHA"
            : "▶ ENTRAR"
          : playing
            ? "● PLAYING"
            : "▶ PLAY GAME";

  const setWord = isJapan ? "セット" : isChina ? "组" : "SET";

  const viralOnly = viralGames.filter(
    (game) => !wiredNames.has(game.label.split("·")[0]?.trim().toLowerCase() ?? "")
  );

  /* Ecuador · one clean play panel (Ecuavoley only) */
  if (isEcuador) {
    return (
      <>
        <div
          id={`${config.roomSlug}-live-games`}
          className="ecuador-pit-separate space-y-3"
          lang="es"
          aria-label="Ecuavoley · The Pit"
        >
          {config.games.map((row) => {
            const playing = activeGame === rowLaunchId(row);
            return (
              <section
                key={row.id}
                className="ecuador-pit-card overflow-hidden rounded-2xl border border-[#fcd116]/50 bg-[radial-gradient(circle_at_top,rgba(252,209,22,0.12),transparent_50%),linear-gradient(155deg,rgba(8,4,4,0.97),rgba(16,8,6,0.95))] p-4 shadow-[0_0_28px_rgba(206,17,38,0.18)] sm:p-5"
              >
                <header className="mb-3 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
                    SET {row.set} · cancha de barrio
                  </p>
                  <h3 className="mt-1 font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-[0.08em] text-[#fef9c3] drop-shadow-[0_0_14px_rgba(252,209,22,0.35)] sm:text-3xl">
                    🏐 {row.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold text-[#ffe8a3]">{row.tag}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-[#c4b89a]">{row.host}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#ff6b6b]">
                    Toca y entra a la cancha
                  </p>
                </header>
                <button
                  type="button"
                  onClick={() => setActiveGame(rowLaunchId(row))}
                  aria-pressed={playing}
                  className={`cotswolds-game-row ecuador-game-room-row w-full${playing ? " cotswolds-game-row--live" : ""}`}
                >
                  <GameRowContent
                    row={row}
                    playing={playing}
                    setWord={setWord}
                    readyLabel={readyLabelFor(playing, row.ready)}
                    cta={ctaFor(playing)}
                  />
                </button>
              </section>
            );
          })}
        </div>

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

  return (
    <>
      <section
        id={`${config.roomSlug}-live-games`}
        className={config.panelClass}
        aria-label={
          isJapan
            ? "日本 · スポーツゲーム"
            : isChina
              ? "中国 · 体育游戏"
              : `${config.countryName}: country sports games`
        }
        lang={isJapan ? "ja" : isChina ? "zh-CN" : undefined}
      >
        {config.roomSlug === "colombia-room" ? <div className="colombia-game-room-panel-bg" aria-hidden="true" /> : null}
        {config.roomSlug === "spain-room" ? <div className="spain-game-panel-bg" aria-hidden="true" /> : null}
        <header className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff4466] sm:text-xs">
            {config.panelKicker}
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl" dangerouslySetInnerHTML={{ __html: config.panelTitle }} />
          {config.panelSubtitle ? (
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">{config.panelSubtitle}</p>
          ) : null}
          {isJapan ? (
            <p className="mt-2 text-[11px] font-semibold text-[#fbbf24]">
              ⚔️ 剣道ステージデュエル · PLAYをタップ、または下でライブプレイ
            </p>
          ) : null}
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
                  setWord={setWord}
                  readyLabel={readyLabelFor(playing, row.ready)}
                  cta={ctaFor(playing)}
                />
              </button>
            );
          })}
        </div>

        <div className={`mt-4 flex flex-wrap justify-center gap-2 ${config.chipClass ? "" : ""}`} role="list">
          {viralOnly.map((game) => (
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
  cta,
  setWord = "SET"
}: {
  row: RoomCountryGameRow;
  playing: boolean;
  readyLabel: string;
  cta: string;
  setWord?: string;
}) {
  return (
    <>
      {row.image ? (
        <div
          className="cotswolds-game-bg"
          style={{
            backgroundImage: `url("${row.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          aria-hidden="true"
        />
      ) : null}
      <span className="cotswolds-hero-rank cotswolds-game-rank" aria-hidden="true">
        <span className="cotswolds-hero-rank-word">{setWord}</span>
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