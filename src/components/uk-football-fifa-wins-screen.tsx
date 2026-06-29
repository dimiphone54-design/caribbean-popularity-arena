"use client";

import { FIFA_RECENT_RESULTS, formatFifaPlayedAt, type FifaRecentResult } from "@/lib/football-fifa-recent";

function FifaWinFlag({ game, side }: { game: FifaRecentResult; side: "home" | "away" }) {
  const team = side === "home" ? game.homeTeam : game.awayTeam;

  return (
    <span className="uk-football-fifa-win-flag" aria-label={`${team} flag`}>
      {side === "home" ? game.homeFlag : game.awayFlag}
    </span>
  );
}

function FifaStripFlag({ game, side }: { game: FifaRecentResult; side: "home" | "away" }) {
  const team = side === "home" ? game.homeTeam : game.awayTeam;
  const stripSide =
    game.flagStripAwayLeft === true
      ? side === "home"
        ? "right"
        : "left"
      : side === "home"
        ? "left"
        : "right";

  return (
    <span
      className={`uk-football-fifa-win-flag-photo uk-football-fifa-win-flag-photo--${stripSide}`}
      style={{ backgroundImage: `url(${game.flagStripUrl})` }}
      role="img"
      aria-label={`${team} flag`}
    />
  );
}

function FifaWinSideFlag({ game, side }: { game: FifaRecentResult; side: "home" | "away" }) {
  if (game.flagStripUrl) {
    return <FifaStripFlag game={game} side={side} />;
  }
  return <FifaWinFlag game={game} side={side} />;
}

function FifaWinRow({ game }: { game: FifaRecentResult }) {
  return (
    <li className="uk-football-fifa-win-row uk-football-fifa-win-row--4k" role="listitem">
      <div className="uk-football-fifa-win-head">
        <span className="uk-football-fifa-win-league">{game.league}</span>
        <span className="uk-football-fifa-win-mode">{game.mode}</span>
      </div>
      <div className="uk-football-fifa-win-4k-match">
        <div className="uk-football-fifa-win-4k-team">
          <FifaWinSideFlag game={game} side="home" />
          <span className="uk-football-fifa-win-name">{game.homeTeam}</span>
        </div>
        <div className="uk-football-fifa-win-4k-mid">
          <span className="uk-football-fifa-win-score">
            {game.homeScore} – {game.awayScore}
          </span>
          <span className="uk-football-fifa-win-vs">vs</span>
        </div>
        <div className="uk-football-fifa-win-4k-team">
          <FifaWinSideFlag game={game} side="away" />
          <span className="uk-football-fifa-win-name">{game.awayTeam}</span>
        </div>
      </div>
      <p className="uk-football-fifa-win-time">{formatFifaPlayedAt(game.playedAt)}</p>
    </li>
  );
}

/** Recent FIFA wins only · 4K board screen */
export function UkFootballFifaWinsScreen() {
  return (
    <div className="uk-football-fifa-wins-screen" aria-label="Recent FIFA wins">
      <ul className="uk-football-fifa-wins-list uk-football-fifa-wins-list--4k" role="list">
        {FIFA_RECENT_RESULTS.map((game) => (
          <FifaWinRow key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
}
