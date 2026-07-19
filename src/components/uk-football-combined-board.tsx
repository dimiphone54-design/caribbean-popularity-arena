"use client";

import { useEffect, useState } from "react";
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

/* ── FIFA recent wins · sub-components ── */

function FifaWinFlag({ game, side }: { game: FifaRecentResult; side: "home" | "away" }) {
  const team = side === "home" ? game.homeTeam : game.awayTeam;
  return (
    <span className="uk-fifa-flag" aria-label={`${team} flag`}>
      {side === "home" ? game.homeFlag : game.awayFlag}
    </span>
  );
}

function FifaStripFlag({ game, side }: { game: FifaRecentResult; side: "home" | "away" }) {
  const team = side === "home" ? game.homeTeam : game.awayTeam;
  const stripSide =
    game.flagStripAwayLeft === true
      ? side === "home" ? "right" : "left"
      : side === "home" ? "left" : "right";

  return (
    <span
      className={`uk-fifa-flag-strip uk-fifa-flag-strip--${stripSide}`}
      style={{ backgroundImage: `url(${game.flagStripUrl})` }}
      role="img"
      aria-label={`${team} flag`}
    />
  );
}

function FifaWinSideFlag({ game, side }: { game: FifaRecentResult; side: "home" | "away" }) {
  if (game.flagStripUrl) return <FifaStripFlag game={game} side={side} />;
  return <FifaWinFlag game={game} side={side} />;
}

function FifaWinRow({ game }: { game: FifaRecentResult }) {
  return (
    <li className="uk-fifa-card" role="listitem">
      <div className="uk-fifa-card-head">
        <span className="uk-fifa-card-league">{game.league}</span>
        <span className="uk-fifa-card-time" suppressHydrationWarning>
          {formatFifaPlayedAt(game.playedAt)}
        </span>
      </div>
      <div className="uk-fifa-card-match">
        <div className="uk-fifa-card-team uk-fifa-card-team--home">
          <FifaWinSideFlag game={game} side="home" />
          <span className="uk-fifa-card-name">{game.homeTeam}</span>
        </div>
        <div className="uk-fifa-card-score-center">
          <span className="uk-fifa-card-score">{game.homeScore}</span>
          <span className="uk-fifa-card-sep">–</span>
          <span className="uk-fifa-card-score">{game.awayScore}</span>
        </div>
        <div className="uk-fifa-card-team uk-fifa-card-team--away">
          <span className="uk-fifa-card-name">{game.awayTeam}</span>
          <FifaWinSideFlag game={game} side="away" />
        </div>
      </div>
    </li>
  );
}

/* ── Status pill helper ── */

function MatchStatusPill({ match, isLocked }: { match: FootballMatch; isLocked: boolean }) {
  // Stable first paint label — live countdown only after mount (avoids Date.now SSR mismatch)
  const [countdown, setCountdown] = useState("Upcoming");

  useEffect(() => {
    if (match.status !== "scheduled") return;
    const tick = () => setCountdown(formatKickoffCountdown(match.kickoff));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [match.kickoff, match.status]);

  if (match.status === "live") {
    return (
      <span className="uk-fixture-status uk-fixture-status--live">
        <span className="uk-fixture-status-dot uk-fixture-status-dot--live" />
        LIVE
      </span>
    );
  }
  if (match.status === "finished") {
    return <span className="uk-fixture-status uk-fixture-status--ft">FT</span>;
  }
  if (isLocked) {
    return <span className="uk-fixture-status uk-fixture-status--upcoming">Locked</span>;
  }
  return (
    <span className="uk-fixture-status uk-fixture-status--upcoming" suppressHydrationWarning>
      {countdown}
    </span>
  );
}

/* ── Kickoff time display ── */

function KickoffTimeDisplay({ match }: { match: FootballMatch }) {
  // Defer locale formatting until mount — Node vs browser Intl can disagree on first paint
  const [label, setLabel] = useState<{ time: string; day: string } | null>(null);

  useEffect(() => {
    const date = new Date(match.kickoff);
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      hourCycle: "h23"
    }).formatToParts(date);
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? "";
    setLabel({
      time: `${get("hour").padStart(2, "0")}:${get("minute").padStart(2, "0")}`,
      day: `${get("weekday")} ${get("day")} ${get("month")}`
    });
  }, [match.kickoff]);

  return (
    <span className="uk-fixture-kickoff">
      <span className="uk-fixture-kickoff-time">{label?.time ?? "--:--"}</span>
      <span className="uk-fixture-kickoff-date">{label?.day ?? "London"}</span>
    </span>
  );
}

/* ── Main export ── */

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
      {/* ── Recent FIFA wins ── */}
      <section className="uk-football-combined-section" aria-label="Recent FIFA wins">
        {hideFifaSectionHead ? null : (
          <header className="uk-football-combined-section-head">
            <h3 className="uk-football-combined-section-title">Recent FIFA wins</h3>
            <p className="uk-football-combined-section-sub">Real scores · country flags · arena nights</p>
          </header>
        )}
        <div className="uk-football-fifa-wins-split">
          <ul className="uk-fifa-list" role="list">
            {FIFA_RECENT_RESULTS.map((game) => (
              <FifaWinRow key={game.id} game={game} />
            ))}
          </ul>
          <UkFootballFifaHighlightsMiniScreen />
        </div>
      </section>

      {/* ── Upcoming fixtures ── */}
      <section className="uk-football-combined-section" aria-label="Upcoming games">
        <header className="uk-football-combined-section-head">
          <h3 className="uk-football-combined-section-title">Upcoming games</h3>
          <p className="uk-football-combined-section-sub">{upcoming.length} open · pick winner before lock</p>
        </header>

        {upcoming.length === 0 ? (
          <p className="uk-football-combined-empty">No open fixtures for this league filter.</p>
        ) : (
          <ul className="uk-fixture-list" role="list">
            {upcoming.map((match) => (
              <FixtureCard
                key={match.id}
                match={match}
                isLocked={locked(match)}
                existing={myPredictions.find((pick) => pick.match_id === match.id)}
                draft={getDraft(match.id)}
                setDraft={setDraft}
                onSubmit={onSubmit}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ── Fixture card with expandable pick form ── */

function FixtureCard({
  match,
  isLocked,
  existing,
  draft,
  setDraft,
  onSubmit
}: {
  match: FootballMatch;
  isLocked: boolean;
  existing?: FootballPredictionRow;
  draft: FootballPredictionInput;
  setDraft: (matchId: string, patch: Partial<FootballPredictionInput>) => void;
  onSubmit: (match: FootballMatch) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li role="listitem">
      <article className="uk-fixture-card">
        {/* Top bar: competition + status */}
        <header className="uk-fixture-head">
          <span className="uk-fixture-comp">{match.competitionLabel}</span>
          <MatchStatusPill match={match} isLocked={isLocked} />
        </header>

        {/* Teams row */}
        <div className="uk-fixture-teams">
          <div className="uk-fixture-team uk-fixture-team--home">
            {match.homeCrestUrl ? (
              <img src={match.homeCrestUrl} alt="" className="uk-fixture-crest" />
            ) : (
              <span className="uk-fixture-flag" aria-hidden="true">{match.homeFlag}</span>
            )}
            <span className="uk-fixture-name">{match.homeTeam}</span>
          </div>

          {match.status === "scheduled" ? (
            <KickoffTimeDisplay match={match} />
          ) : (
            <div className="uk-fixture-score-center">
              <span className="uk-fixture-score">{match.homeScore ?? 0}</span>
              <span className="uk-fixture-sep">–</span>
              <span className="uk-fixture-score">{match.awayScore ?? 0}</span>
            </div>
          )}

          <div className="uk-fixture-team uk-fixture-team--away">
            <span className="uk-fixture-name">{match.awayTeam}</span>
            {match.awayCrestUrl ? (
              <img src={match.awayCrestUrl} alt="" className="uk-fixture-crest" />
            ) : (
              <span className="uk-fixture-flag" aria-hidden="true">{match.awayFlag}</span>
            )}
          </div>
        </div>

        {/* Prediction row */}
        {existing ? (
          <div className="uk-fixture-saved">
            <span className="uk-fixture-saved-label">Your pick</span>
            <span className="uk-fixture-saved-pick">
              {existing.predicted_winner} {existing.predicted_score_home}–{existing.predicted_score_away}
            </span>
            {existing.points_awarded > 0 ? (
              <span className="uk-fixture-saved-pts">+{existing.points_awarded} pts</span>
            ) : null}
          </div>
        ) : !isLocked ? (
          <>
            <button
              type="button"
              className="uk-fixture-expand-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Close" : "Pick match"}
            </button>

            {expanded ? (
              <div className="uk-fixture-pick">
                <label className="uk-fixture-pick-label">
                  Winner
                  <select
                    className="uk-fixture-select"
                    value={draft.predicted_winner}
                    onChange={(e) =>
                      setDraft(match.id, { predicted_winner: e.target.value as FootballPredictedWinner })
                    }
                  >
                    <option value="home">{match.homeTeam}</option>
                    <option value="draw">Draw</option>
                    <option value="away">{match.awayTeam}</option>
                  </select>
                </label>
                <label className="uk-fixture-pick-label">
                  Score
                  <span className="uk-fixture-score-inputs">
                    <input
                      type="number"
                      min={0}
                      max={15}
                      className="uk-fixture-input"
                      value={draft.predicted_score_home}
                      onChange={(e) => {
                        const home = Number(e.target.value);
                        setDraft(match.id, {
                          predicted_score_home: home,
                          total_goals: home + draft.predicted_score_away
                        });
                      }}
                    />
                    <span className="uk-fixture-sep" aria-hidden="true">–</span>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      className="uk-fixture-input"
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
                  className="uk-fixture-submit"
                  onClick={() => onSubmit(match)}
                >
                  Lock pick
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </article>
    </li>
  );
}
