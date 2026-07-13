"use client";

import { useCallback, useEffect, useState } from "react";
import type { DominoTheme } from "@/components/games/domino/domino-config";
import {
  formatDominoMonthLabel,
  getDominoProfile,
  getHallOfFame,
  getMonthlyBoard,
  saveDominoProfile,
  type DominoChampion,
  type MonthlyBoardView
} from "@/components/games/domino/domino-tournament-store";

type DominoTournamentPanelProps = {
  theme: DominoTheme;
  /** bump to refresh board after a scored win */
  refreshKey?: number;
  lastScoreLines?: string[] | null;
  lastPoints?: number | null;
};

export function DominoTournamentPanel({
  theme,
  refreshKey = 0,
  lastScoreLines = null,
  lastPoints = null
}: DominoTournamentPanelProps) {
  const L = theme.locale;
  const [board, setBoard] = useState<MonthlyBoardView | null>(null);
  const [fame, setFame] = useState<DominoChampion[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [profileName, setProfileName] = useState<string | null>(null);

  const reload = useCallback(() => {
    const profile = getDominoProfile();
    setProfileName(profile?.name ?? null);
    if (profile?.name) setNameInput(profile.name);
    setBoard(getMonthlyBoard(10));
    setFame(getHallOfFame(8));
  }, []);

  useEffect(() => {
    reload();
  }, [reload, refreshKey]);

  const saveName = () => {
    const p = saveDominoProfile(nameInput || "Jugador", theme.flag);
    setProfileName(p.name);
    reload();
  };

  if (!board) return null;

  return (
    <aside className="domino-copa" aria-label={L.copaTitle}>
      <header className="domino-copa-head">
        <div>
          <p className="domino-copa-kicker">{theme.flag} {L.copaTitle}</p>
          <h3 className="domino-copa-title">{L.tablaDelMes}</h3>
          <p className="domino-copa-sub">
            {board.monthLabel} · {L.premioStatus}
          </p>
        </div>
        <span className="domino-badge">{L.freeEntry}</span>
      </header>

      <div className="domino-copa-identity">
        <label className="domino-copa-label" htmlFor="domino-player-name">
          {L.yourName}
        </label>
        <div className="domino-copa-name-row">
          <input
            id="domino-player-name"
            className="domino-copa-input"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder={L.namePlaceholder}
            maxLength={24}
            autoComplete="nickname"
          />
          <button type="button" className="domino-btn domino-btn--primary" onClick={saveName}>
            {L.saveName}
          </button>
        </div>
        {profileName ? (
          <p className="domino-copa-hint">
            {theme.flag} {profileName}
            {board.userRank ? ` · #${board.userRank}` : ""}
            {board.userEntry ? ` · ${board.userEntry.points} ${L.puntos}` : ` · 0 ${L.puntos}`}
            {board.pointsToNext != null && board.userRank && board.userRank > 1
              ? ` · ${L.pointsToNext}: ${board.pointsToNext}`
              : board.userRank === 1
                ? ` · ${L.leading}`
                : ""}
          </p>
        ) : (
          <p className="domino-copa-hint">{L.nameToClimb}</p>
        )}
      </div>

      {lastPoints != null && lastPoints > 0 && lastScoreLines ? (
        <div className="domino-copa-scoreflash" role="status">
          <p className="domino-copa-scoreflash-title">
            +{lastPoints} {L.puntos}
          </p>
          {lastScoreLines.map((line) => (
            <p key={line} className="domino-copa-scoreflash-line">
              {line}
            </p>
          ))}
        </div>
      ) : null}

      <div className="domino-copa-board">
        <p className="domino-copa-section-label">{L.tablaDelMes}</p>
        {board.entries.length === 0 ? (
          <p className="domino-copa-empty">{L.emptyBoard}</p>
        ) : (
          <ol className="domino-copa-list">
            {board.entries.map((entry, i) => {
              const isYou = board.userEntry?.playerId === entry.playerId;
              return (
                <li
                  key={entry.playerId}
                  className={`domino-copa-row${isYou ? " is-you" : ""}${i === 0 ? " is-lead" : ""}`}
                >
                  <span className="domino-copa-rank">#{i + 1}</span>
                  <span className="domino-copa-name">
                    {entry.flag} {entry.playerName}
                    {isYou ? ` · ${L.you}` : ""}
                  </span>
                  <span className="domino-copa-pts">
                    {entry.points} {L.puntos}
                  </span>
                  <span className="domino-copa-wins">
                    {entry.wins} {L.winsShort}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <div className="domino-copa-fame">
        <p className="domino-copa-section-label">{L.salonFama}</p>
        {fame.length === 0 ? (
          <p className="domino-copa-empty">{L.emptyFame}</p>
        ) : (
          <ul className="domino-copa-fame-list">
            {fame.map((c) => (
              <li key={c.monthKey} className="domino-copa-fame-row">
                <span className="domino-copa-fame-month">{formatDominoMonthLabel(c.monthKey)}</span>
                <span className="domino-copa-fame-champ">
                  👑 {c.flag} {c.playerName}
                </span>
                <span className="domino-copa-fame-pts">
                  {c.points} {L.puntos}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="domino-copa-legal">{L.prizeLegal}</p>
    </aside>
  );
}
