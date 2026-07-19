"use client";

import { useState } from "react";
import { EastAsiaStageGameSimulator } from "@/components/east-asia-stage-game-simulator";
import { getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";
import type { EastAsiaRoomGameLane } from "@/lib/east-asia-room-games";

type EastAsiaRoomGamesPanelProps = {
  lane: EastAsiaRoomGameLane;
};

/** Japan / China · live on-stage game row + viral game chips */
export function EastAsiaRoomGamesPanel({ lane }: EastAsiaRoomGamesPanelProps) {
  const [simOpen, setSimOpen] = useState(false);
  const games = getArenaSlotViralGames(lane.islandCode);
  const isChina = lane.islandCode === "CN";
  const isJapan = lane.islandCode === "JP";
  const primary = games.find((game) =>
    isChina
      ? game.label.includes("对练") || game.label.toLowerCase().includes("wushu")
      : game.label.includes("剣道") ||
        game.label.includes("モンスト") ||
        game.label.toLowerCase().includes("kendo") ||
        game.label.includes("パークラン")
  );
  const stageCaption = isChina
    ? `${lane.hostLabel} · 剑棍 · 对练`
    : `${lane.hostLabel} · 剣 · 炎`;
  const kicker = isChina ? "热门游戏 · 直播舞台" : isJapan ? "バイラルゲーム · ライブステージ" : "Viral games · live on stage";
  const ready = 88;

  return (
    <>
      <section
        className={`${lane.panelClass} w-full rounded-2xl border p-4 backdrop-blur-md sm:p-5`}
        aria-label={`${lane.countryName}: ${lane.primaryGameName}`}
      >
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            {kicker}
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            {isJapan
              ? `${lane.flag} 日本: 剣道ステージデュエル`
              : isChina
                ? `${lane.flag} 中国: 武术对练`
                : `${lane.flag} ${lane.countryName}: ${lane.primaryGameName}`}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">{lane.primaryGameTag}</p>
          {isJapan ? (
            <p className="mt-2 text-[11px] font-semibold text-[#fbbf24]">
              ⚔️ 剣道ステージデュエル · PLAYをタップ、または下でライブプレイ
            </p>
          ) : null}
        </header>

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
          <p className="east-asia-live-stage-caption">{stageCaption}</p>
        </div>

        <div className="cotswolds-game-board mt-4 space-y-2.5" role="list">
          <button
            type="button"
            onClick={() => setSimOpen(true)}
            aria-pressed={simOpen}
            className={`cotswolds-game-row ${lane.rowClass}${simOpen ? " cotswolds-game-row--live" : ""}`}
          >
            <span className="cotswolds-hero-rank cotswolds-game-rank" aria-hidden="true">
              <span className="cotswolds-hero-rank-word">{isJapan ? "セット" : isChina ? "组" : "SET"}</span>
              <span className="cotswolds-hero-rank-num">01</span>
            </span>
            <span className="cotswolds-game-main">
              <span className="cotswolds-game-tag">{lane.primaryGameTag}</span>
              <span className="cotswolds-game-name">
                <span className="cotswolds-game-flag" aria-hidden="true">
                  {lane.islandCode === "CN" ? "🥋" : "⚔️"}
                </span>
                {isJapan ? "剣道ステージデュエル" : isChina ? "武术对练" : lane.primaryGameName}
              </span>
              <span className="cotswolds-game-host">
                {lane.hostLabel}
                {isJapan || isChina ? null : ` · ${primary?.hint ?? "Live stage duel"}`}
              </span>
              <span className="cotswolds-game-graph" aria-hidden="true">
                <span
                  className="cotswolds-game-graph-fill"
                  style={{ width: `${simOpen ? 100 : ready}%` }}
                />
              </span>
              <span className="cotswolds-game-meter">
                {isJapan
                  ? simOpen
                    ? "ステージ上 · ライブプレイ"
                    : `${ready}% 準備完了 · タップでプレイ`
                  : isChina
                    ? simOpen
                      ? "舞台上 · 直播游玩"
                      : `${ready}% 就绪 · 点击游玩`
                    : simOpen
                      ? "On stage · play live"
                      : `${ready}% ready · tap to play`}
              </span>
            </span>
            <span className={`cotswolds-game-cta${simOpen ? " cotswolds-game-cta--live" : ""}`}>
              {isJapan
                ? simOpen
                  ? "● プレイ中"
                  : "▶ ゲームをプレイ"
                : isChina
                  ? simOpen
                    ? "● 游玩中"
                    : "▶ 开始游戏"
                  : simOpen
                    ? "● PLAYING"
                    : "▶ PLAY GAME"}
            </span>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {games.map((game) => (
            <span
              key={game.id}
              className={`${lane.chipClass} inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold`}
              role="listitem"
              title={game.hint}
            >
              <span aria-hidden="true">{game.emoji}</span>
              <span>{game.label}</span>
            </span>
          ))}
        </div>
      </section>

      {simOpen ? (
        <EastAsiaStageGameSimulator
          gameName={lane.primaryGameName}
          host={lane.hostLabel}
          roomKicker={lane.roomKicker}
          countryLabel={lane.countryName}
          onClose={() => setSimOpen(false)}
        />
      ) : null}
    </>
  );
}
