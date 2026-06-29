"use client";

import {
  FIFA_RECENT_RESULTS,
  formatFifaPlayedAt,
  type FifaRecentResult
} from "@/lib/football-fifa-recent";
import { UkFootballFifaHighlightsMiniScreen } from "@/components/uk-football-fifa-highlights-mini-screen";
import {
  formatKickoffCountdown,
  type FootballMatch,
  type FootballPredictedWinner,
  type FootballPredictionInput,
  type FootballPredictionRow
} from "@/lib/football-prediction-arena";

type UkFootballCombinedBoardProps = {
  matches: FootballMatch[];
  locked: (match: FootballMatch) => boolean;
  myPredictions: FootballPredictionRow[];
  getDraft: (matchId: string) => FootballPredictionInput;
  setDraft: (matchId: string, patch: Partial<FootballPredictionInput>) => void;
  onSubmit: (match: FootballMatch) => void;
  hideFifaSectionHead?: boolean;
};

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
    <li className="uk-football-fifa-win-row uk-football-fifa-win-row--compact" role="listitem">
      <div className="uk-football-fifa-win-head">
        <span className="uk-football-fifa-win-league">{game.league}</span>
        <span className="uk-football-fifa-win-mode">{game.mode}</span>
      </div>
      <div className="uk-football-fifa-win-compact-match">
        <div className="uk-football-fifa-win-compact-team">
          <FifaWinSideFlag game={game} side="home" />
          <span className="uk-football-fifa-win-name">{game.homeTeam}</span>
        </div>
        <div className="uk-football-fifa-win-compact-mid">
          <span className="uk-football-fifa-win-score">
            {game.homeScore} – {game.awayScore}
          </span>
          <span className="uk-football-fifa-win-vs">vs</span>
        </div>
        <div className="uk-football-fifa-win-compact-team">
          <FifaWinSideFlag game={game} side="away" />
          <span className="uk-football-fifa-win-name">{game.awayTeam}</span>
        </div>
      </div>
      <p className="uk-football-fifa-win-time">{formatFifaPlayedAt(game.playedAt)}</p>
    </li>
  );
}

export function UkFootballCombinedBoard({
  matches,
  locked,
  myPredictions,
  getDraft,
  setDraft,
  onSubmit,
  hideFifaSectionHead = false
}: UkFootballCombinedBoardProps) {
  const upcoming = matches.filter((match) => match.status === "scheduled" && !locked(match));

  return (
    <div className="uk-football-combined-board">
      <section className="uk-football-combined-section" aria-label="Recent FIFA wins">
        {hideFifaSectionHead ? null : (
          <header className="uk-football-combined-section-head">
            <h3 className="uk-football-combined-section-title">Recent FIFA wins</h3>
            <p className="uk-football-combined-section-sub">Real scores · country flags · arena nights</p>
          </header>
        )}
        <div className="uk-football-fifa-wins-split">
          <ul className="uk-football-fifa-wins-list" role="list">
            {FIFA_RECENT_RESULTS.map((game) => (
              <FifaWinRow key={game.id} game={game} />
            ))}
          </ul>
          <UkFootballFifaHighlightsMiniScreen />
        </div>
      </section>

      <section className="uk-football-combined-section" aria-label="Upcoming games">
        <header className="uk-football-combined-section-head">
          <h3 className="uk-football-combined-section-title">Upcoming games</h3>
          <p className="uk-football-combined-section-sub">{upcoming.length} open · pick winner before lock</p>
        </header>

        {upcoming.length === 0 ? (
          <p className="uk-football-combined-empty">No open fixtures for this league filter.</p>
        ) : (
          <ul className="uk-football-fixture-list" role="list">
            {upcoming.map((match) => {
              const isLocked = locked(match);
              const existing = myPredictions.find((pick) => pick.match_id === match.id);
              const draft = getDraft(match.id);

              return (
                <li key={match.id} role="listitem">
                  <article className="uk-football-fixture-card">
                    <header className="uk-football-fixture-head">
                      <span className="uk-football-fixture-comp">{match.competitionLabel}</span>
                      <span className={`uk-football-fixture-lock${isLocked ? " uk-football-fixture-lock--locked" : ""}`}>
                        {isLocked ? "Locked" : formatKickoffCountdown(match.kickoff)}
                      </span>
                    </header>

                    <div className="uk-football-fixture-teams">
                      <div className="uk-football-fixture-team uk-football-fixture-team--home">
                        {match.homeCrestUrl ? (
                          <img src={match.homeCrestUrl} alt="" className="uk-football-fixture-crest" />
                        ) : (
                          <span className="uk-football-fixture-flag" aria-hidden="true">
                            {match.homeFlag}
                          </span>
                        )}
                        <span className="uk-football-fixture-name">{match.homeTeam}</span>
                      </div>
                      <span className="uk-football-fixture-vs">vs</span>
                      <div className="uk-football-fixture-team uk-football-fixture-team--away">
                        <span className="uk-football-fixture-name">{match.awayTeam}</span>
                        {match.awayCrestUrl ? (
                          <img src={match.awayCrestUrl} alt="" className="uk-football-fixture-crest" />
                        ) : (
                          <span className="uk-football-fixture-flag" aria-hidden="true">
                            {match.awayFlag}
                          </span>
                        )}
                      </div>
                    </div>

                    {existing ? (
                      <p className="uk-football-fixture-saved">
                        Your pick · {existing.predicted_winner} {existing.predicted_score_home}-
                        {existing.predicted_score_away}
                        {existing.points_awarded > 0 ? ` · +${existing.points_awarded} pts` : ""}
                      </p>
                    ) : !isLocked ? (
                      <div className="uk-football-fixture-pick">
                        <label className="uk-football-fixture-pick-label">
                          Winner
                          <select
                            className="uk-football-fixture-select"
                            value={draft.predicted_winner}
                            onChange={(e) =>
                              setDraft(match.id, {
                                predicted_winner: e.target.value as FootballPredictedWinner
                              })
                            }
                          >
                            <option value="home">{match.homeTeam}</option>
                            <option value="draw">Draw</option>
                            <option value="away">{match.awayTeam}</option>
                          </select>
                        </label>
                        <label className="uk-football-fixture-pick-label">
                          Score
                          <span className="uk-football-fixture-score">
                            <input
                              type="number"
                              min={0}
                              max={15}
                              className="uk-football-fixture-input"
                              value={draft.predicted_score_home}
                              onChange={(e) => {
                                const home = Number(e.target.value);
                                setDraft(match.id, {
                                  predicted_score_home: home,
                                  total_goals: home + draft.predicted_score_away
                                });
                              }}
                            />
                            <span aria-hidden="true">–</span>
                            <input
                              type="number"
                              min={0}
                              max={15}
                              className="uk-football-fixture-input"
                              value={draft.predicted_score_away}
                              onChange={(e) => {
                                const away = Number(e.target.value);
                                setDraft(match.id, {
                                  predicted_score_away: away,
                                  total_goals: draft.predicted_score_home + away
                                });
                              }}
                            />
                          </span>
                        </label>
                        <button
                          type="button"
                          className="uk-football-fixture-submit"
                          onClick={() => onSubmit(match)}
                        >
                          Lock pick
                        </button>
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
