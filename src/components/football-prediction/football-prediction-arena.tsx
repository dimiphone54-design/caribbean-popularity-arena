"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import "@/components/football-prediction/football-prediction.css";
import {
  FOOTBALL_COMPETITIONS,
  FOOTBALL_PREDICTION_POINTS,
  formatKickoffCountdown,
  isMatchLocked,
  type FootballCompetitionId,
  type FootballLeaderboardKind,
  type FootballMatch,
  type FootballPredictionInput,
  type FootballPredictionRow,
  type FootballPredictedWinner
} from "@/lib/football-prediction-arena";
import { getDemoFootballFixtures } from "@/lib/football-prediction-fixtures";
import {
  computeUserFootballStats,
  filterFootballLeaderboard,
  readLocalFootballRankings,
  scoreLocalPredictions,
  upsertLocalFootballPrediction,
  writeLocalFootballRankings,
  buildLocalFootballRankings
} from "@/lib/football-prediction-storage";
import { readTargetShooterUserId, readTargetShooterUsername } from "@/lib/target-shooter-user";
import { UkFootballFifaWinsScreen } from "@/components/uk-football-fifa-wins-screen";

type TabId = "matches" | "active" | "leaderboard" | "stats" | "tournaments";

const CLUB_BACKDROP_CLASS: Record<string, string> = {
  "pl-arsenal-chelsea": " football-prediction-match--arsenal-chelsea",
  "ucl-real-bayern": " football-prediction-match--real-bayern",
  "uel-roma-sevilla": " football-prediction-match--roma-sevilla",
  "fac-manutd-liverpool": " football-prediction-match--manutd-liverpool",
  "intl-england-trinidad": " football-prediction-match--england-trinidad",
  "wc-brazil-france": " football-prediction-match--brazil-france"
};

function clubBackdropClass(matchId: string) {
  return CLUB_BACKDROP_CLASS[matchId] ?? "";
}

const defaultPrediction = (): FootballPredictionInput => ({
  predicted_winner: "home",
  predicted_score_home: 1,
  predicted_score_away: 0,
  first_goal_scorer: "",
  total_goals: 1,
  clean_sheet: false
});

type FootballPredictionArenaProps = {
  countryId?: string;
  countryName?: string;
  flag?: string;
  initialTab?: TabId;
  initialCompetitionFilter?: FootballCompetitionId | "all";
  embeddedInUkHub?: boolean;
  embedLeagueLabel?: string;
  leagueStrip?: ReactNode;
  onClose?: () => void;
};

export function FootballPredictionArena({
  countryId = "uk",
  countryName = "United Kingdom",
  flag = "🇬🇧",
  initialTab = "matches",
  initialCompetitionFilter = "all",
  embeddedInUkHub = false,
  embedLeagueLabel = "All competitions",
  leagueStrip,
  onClose
}: FootballPredictionArenaProps) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const [matches, setMatches] = useState<FootballMatch[]>(getDemoFootballFixtures());
  const [predictions, setPredictions] = useState<FootballPredictionRow[]>([]);
  const [rankings, setRankings] = useState(readLocalFootballRankings());
  const [leaderboardKind, setLeaderboardKind] = useState<FootballLeaderboardKind>("global");
  const [competitionFilter, setCompetitionFilter] = useState<string>(initialCompetitionFilter);
  const [drafts, setDrafts] = useState<Record<string, FootballPredictionInput>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const userId = readTargetShooterUserId();
  const username = readTargetShooterUsername();

  const refresh = useCallback(() => {
    const scored = scoreLocalPredictions();
    setPredictions(scored);
    const ranks = buildLocalFootballRankings(scored);
    writeLocalFootballRankings(ranks);
    setRankings(ranks);
  }, []);

  useEffect(() => {
    setCompetitionFilter(initialCompetitionFilter);
  }, [initialCompetitionFilter]);

  useEffect(() => {
    void fetch("/api/games/football-prediction/fixtures")
      .then((r) => r.json())
      .then((json: { matches?: FootballMatch[] }) => {
        if (json.matches?.length) setMatches(json.matches);
      })
      .catch(() => setMatches(getDemoFootballFixtures()));

    refresh();
  }, [refresh]);

  const stats = useMemo(
    () => computeUserFootballStats(userId, predictions, rankings),
    [userId, predictions, rankings]
  );

  const myPredictions = predictions.filter((p) => p.user_id === userId);
  const upcoming = matches.filter((m) => m.status === "scheduled" && !isMatchLocked(m));
  const filteredMatches =
    competitionFilter === "all"
      ? matches
      : matches.filter((m) => m.competition === competitionFilter);

  const leaderboardRows = filterFootballLeaderboard(rankings, leaderboardKind, countryId);

  const getDraft = (matchId: string) => drafts[matchId] ?? defaultPrediction();

  const setDraft = (matchId: string, patch: Partial<FootballPredictionInput>) => {
    setDrafts((prev) => ({ ...prev, [matchId]: { ...getDraft(matchId), ...patch } }));
  };

  const submitPrediction = async (match: FootballMatch) => {
    if (isMatchLocked(match)) {
      setNotice("Predictions locked before kickoff.");
      return;
    }

    const draft = getDraft(match.id);
    const row: FootballPredictionRow = {
      ...draft,
      id: `local-${match.id}-${Date.now()}`,
      user_id: userId,
      username,
      country: countryId,
      match_id: match.id,
      points_awarded: 0,
      created_at: new Date().toISOString(),
      locked: false
    };

    try {
      const res = await fetch("/api/games/football-prediction/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, user_id: userId, username, country: countryId, match_id: match.id })
      });
      const json = (await res.json()) as { prediction?: FootballPredictionRow; error?: string };
      if (!res.ok) {
        setNotice(json.error ?? "Could not save prediction");
        return;
      }
      if (json.prediction) {
        upsertLocalFootballPrediction({ ...row, ...json.prediction, locked: false });
      } else {
        upsertLocalFootballPrediction(row);
      }
      setNotice(`Prediction locked in for ${match.homeTeam} vs ${match.awayTeam}`);
      refresh();
    } catch {
      upsertLocalFootballPrediction(row);
      setNotice("Saved locally · Supabase offline");
      refresh();
    }
  };

  const predictionTabs = (
    <nav className="football-prediction-tabs" aria-label="Football prediction sections">
      {(
        [
          ["matches", "Upcoming"],
          ["active", "My picks"],
          ["leaderboard", "Leaderboards"],
          ["stats", "Statistics"],
          ["tournaments", "Tournaments"]
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          className={`football-prediction-tab${tab === id ? " football-prediction-tab--active" : ""}`}
          onClick={() => setTab(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );

  const scoringFooter = (
    <footer className="football-prediction-scoring">
      Scoring: winner {FOOTBALL_PREDICTION_POINTS.matchWinner} · draw {FOOTBALL_PREDICTION_POINTS.draw} ·
      score {FOOTBALL_PREDICTION_POINTS.correctScore} · FGS {FOOTBALL_PREDICTION_POINTS.firstGoalScorer} ·
      goals {FOOTBALL_PREDICTION_POINTS.totalGoals} · perfect +{FOOTBALL_PREDICTION_POINTS.perfectBonus}
    </footer>
  );

  const mainContent = (
    <>
      {tab === "matches" ? (
        embeddedInUkHub ? (
          <UkFootballFifaWinsScreen />
        ) : (
        <div className="football-prediction-panel">
          <div className="football-prediction-filters">
            <label className="football-prediction-filter-label">
              Competition
              <select
                className="football-prediction-select"
                value={competitionFilter}
                onChange={(e) => setCompetitionFilter(e.target.value)}
              >
                <option value="all">All competitions</option>
                {FOOTBALL_COMPETITIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </label>
            <p className="football-prediction-open-count">{upcoming.length} open fixtures</p>
          </div>

          <div className="football-prediction-match-list">
            {filteredMatches.map((match) => {
              const locked = isMatchLocked(match);
              const existing = myPredictions.find((p) => p.match_id === match.id);
              const draft = getDraft(match.id);

              return (
                <article
                  key={match.id}
                  className={`football-prediction-match${
                    match.homeCrestUrl && match.awayCrestUrl
                      ? ` football-prediction-match--club-backdrop${clubBackdropClass(match.id)}`
                      : ""
                  }`}
                >
                  {match.homeCrestUrl && match.awayCrestUrl ? (
                    <div className="football-prediction-match-backdrop" aria-hidden="true">
                      <img
                        src={match.homeCrestUrl}
                        alt=""
                        className="football-prediction-match-crest football-prediction-match-crest--home"
                      />
                      <img
                        src={match.awayCrestUrl}
                        alt=""
                        className="football-prediction-match-crest football-prediction-match-crest--away"
                      />
                    </div>
                  ) : null}

                  <div className="football-prediction-match-body">
                  <header className="football-prediction-match-head">
                    <span className="football-prediction-comp">{match.competitionLabel}</span>
                    <span className={`football-prediction-lock${locked ? " football-prediction-lock--locked" : ""}`}>
                      {locked ? "🔒 Locked" : formatKickoffCountdown(match.kickoff)}
                    </span>
                  </header>
                  <div className="football-prediction-teams">
                    <span className="football-prediction-team football-prediction-team--home">
                      {match.homeCrestUrl ? (
                        <img src={match.homeCrestUrl} alt="" className="football-prediction-team-crest" />
                      ) : (
                        <span aria-hidden="true">{match.homeFlag}</span>
                      )}
                      <span>{match.homeTeam}</span>
                    </span>
                    <span className="football-prediction-vs">vs</span>
                    <span className="football-prediction-team football-prediction-team--away">
                      {match.awayCrestUrl ? (
                        <img src={match.awayCrestUrl} alt="" className="football-prediction-team-crest" />
                      ) : (
                        <span aria-hidden="true">{match.awayFlag}</span>
                      )}
                      <span>{match.awayTeam}</span>
                    </span>
                  </div>
                  {match.status === "finished" ? (
                    <p className="football-prediction-result">
                      Final {match.homeScore}-{match.awayScore}
                      {match.firstGoalScorer ? ` · FGS ${match.firstGoalScorer}` : ""}
                    </p>
                  ) : null}
                  {existing ? (
                    <p className="football-prediction-saved">
                      Your pick: {existing.predicted_winner} {existing.predicted_score_home}-{existing.predicted_score_away}
                      {existing.points_awarded > 0 ? ` · +${existing.points_awarded} pts` : ""}
                    </p>
                  ) : null}

                  {!locked && !existing ? (
                    <div className="football-prediction-form">
                      <div className="football-prediction-form-row">
                        <label>
                          Winner
                          <select
                            className="football-prediction-select"
                            value={draft.predicted_winner}
                            onChange={(e) =>
                              setDraft(match.id, { predicted_winner: e.target.value as FootballPredictedWinner })
                            }
                          >
                            <option value="home">Home</option>
                            <option value="draw">Draw</option>
                            <option value="away">Away</option>
                          </select>
                        </label>
                        <label>
                          Score
                          <span className="football-prediction-score-inputs">
                            <input
                              type="number"
                              min={0}
                              max={15}
                              className="football-prediction-input"
                              value={draft.predicted_score_home}
                              onChange={(e) => {
                                const h = Number(e.target.value);
                                setDraft(match.id, {
                                  predicted_score_home: h,
                                  total_goals: h + draft.predicted_score_away
                                });
                              }}
                            />
                            <span>-</span>
                            <input
                              type="number"
                              min={0}
                              max={15}
                              className="football-prediction-input"
                              value={draft.predicted_score_away}
                              onChange={(e) => {
                                const a = Number(e.target.value);
                                setDraft(match.id, {
                                  predicted_score_away: a,
                                  total_goals: draft.predicted_score_home + a
                                });
                              }}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="football-prediction-form-row">
                        <label>
                          First goal scorer
                          <input
                            type="text"
                            className="football-prediction-input football-prediction-input--wide"
                            placeholder="Player name"
                            value={draft.first_goal_scorer}
                            onChange={(e) => setDraft(match.id, { first_goal_scorer: e.target.value })}
                          />
                        </label>
                        <label>
                          Total goals
                          <input
                            type="number"
                            min={0}
                            max={20}
                            className="football-prediction-input"
                            value={draft.total_goals}
                            onChange={(e) => setDraft(match.id, { total_goals: Number(e.target.value) })}
                          />
                        </label>
                      </div>
                      <label className="football-prediction-check">
                        <input
                          type="checkbox"
                          checked={draft.clean_sheet}
                          onChange={(e) => setDraft(match.id, { clean_sheet: e.target.checked })}
                        />
                        Clean sheet prediction
                      </label>
                      <button
                        type="button"
                        className="football-prediction-submit"
                        onClick={() => submitPrediction(match)}
                      >
                        Lock prediction
                      </button>
                    </div>
                  ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        )
      ) : null}

      {tab === "active" ? (
        <div className="football-prediction-panel">
          {myPredictions.length === 0 ? (
            <p className="football-prediction-empty">No active predictions — pick upcoming matches.</p>
          ) : (
            <ul className="football-prediction-active-list">
              {myPredictions.map((p) => {
                const match = matches.find((m) => m.id === p.match_id);
                return (
                  <li key={p.id} className="football-prediction-active-row">
                    <span>{match?.competitionLabel ?? p.match_id}</span>
                    <span>
                      {p.predicted_winner} {p.predicted_score_home}-{p.predicted_score_away}
                    </span>
                    <span className="football-prediction-points">+{p.points_awarded} pts</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}

      {tab === "leaderboard" ? (
        <div className="football-prediction-panel">
          <div className="football-prediction-leader-tabs">
            {(["global", "country", "league", "monthly", "season"] as FootballLeaderboardKind[]).map((kind) => (
              <button
                key={kind}
                type="button"
                className={`football-prediction-tab football-prediction-tab--sm${
                  leaderboardKind === kind ? " football-prediction-tab--active" : ""
                }`}
                onClick={() => setLeaderboardKind(kind)}
              >
                {kind}
              </button>
            ))}
          </div>
          <ol className="football-prediction-rank-list">
            {leaderboardRows.length === 0 ? (
              <li className="football-prediction-empty">No rankings yet — play to climb.</li>
            ) : (
              leaderboardRows.map((row, i) => (
                <li key={row.id} className="football-prediction-rank-row">
                  <span className="football-prediction-rank-num">#{i + 1}</span>
                  <span>
                    <span className="football-prediction-rank-name">{row.username}</span>
                    <span className="football-prediction-rank-meta">{row.country}</span>
                  </span>
                  <span className="football-prediction-rank-pts">{row.total_points} pts</span>
                </li>
              ))
            )}
          </ol>
        </div>
      ) : null}

      {tab === "stats" ? (
        <div className="football-prediction-panel football-prediction-stats-grid">
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Total predictions</span>
            <span className="football-prediction-stat-value">{stats.totalPredictions}</span>
          </div>
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Correct</span>
            <span className="football-prediction-stat-value">{stats.correctPredictions}</span>
          </div>
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Accuracy</span>
            <span className="football-prediction-stat-value">{stats.accuracy}%</span>
          </div>
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Total points</span>
            <span className="football-prediction-stat-value">{stats.totalPoints}</span>
          </div>
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Global rank</span>
            <span className="football-prediction-stat-value">#{stats.globalRank || "—"}</span>
          </div>
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Country rank</span>
            <span className="football-prediction-stat-value">#{stats.countryRank || "—"}</span>
          </div>
          <div className="football-prediction-stat-card">
            <span className="football-prediction-stat-label">Championship titles</span>
            <span className="football-prediction-stat-value">{stats.championshipTitles}</span>
          </div>
        </div>
      ) : null}

      {tab === "tournaments" ? (
        <div className="football-prediction-panel football-prediction-tournaments">
          <article className="football-prediction-tournament-card">
            <h3>Daily Challenge</h3>
            <p>Top scorer each day earns Arena Points bonus.</p>
          </article>
          <article className="football-prediction-tournament-card">
            <h3>Weekly Tournament</h3>
            <p>Weekly board resets Sunday · top 3 earn champion badges.</p>
          </article>
          <article className="football-prediction-tournament-card">
            <h3>Monthly Championship</h3>
            <p>Monthly crown · featured profile placement.</p>
          </article>
          <article className="football-prediction-tournament-card football-prediction-tournament-card--highlight">
            <h3>Country vs Country</h3>
            <p>England 🇬🇧 vs Trinidad & Tobago 🇹🇹 — points count for your nation board.</p>
          </article>
        </div>
      ) : null}

      {scoringFooter}
    </>
  );

  return (
    <section
      className={`football-prediction-arena${embeddedInUkHub ? " football-prediction-arena--uk-embed" : ""}`}
      aria-label="Football Prediction Arena"
    >
      {embeddedInUkHub ? (
        <div className="uk-football-hub-split">
          <div className="uk-football-command-pane" aria-label="Football prediction controls">
            {leagueStrip}
            <header className="uk-football-command-head">
              <div className="uk-football-command-head-top">
                <p className="uk-football-command-kicker">🇬🇧 UK football lane · Predict &amp; climb</p>
                <span className="uk-football-command-live" aria-hidden="true" />
              </div>
              <div className="uk-football-command-copy">
                <h2 className="uk-football-command-title">
                  {flag} Football prediction arena
                </h2>
                <p className="uk-football-command-filter">
                  League filter · <span className="uk-football-hub-filter-pill">{embedLeagueLabel}</span>
                </p>
              </div>
            </header>
            {predictionTabs}
            {tab === "matches" ? (
              <div className="uk-football-command-board-intro">
                <h3 className="uk-football-combined-section-title">Recent FIFA wins</h3>
                <p className="uk-football-combined-section-sub">Real scores · country flags · arena nights</p>
              </div>
            ) : null}
          </div>
          <div className="uk-football-board-pane" aria-label="Football prediction board">
            {notice ? (
              <p className="football-prediction-notice" role="status">{notice}</p>
            ) : null}
            {mainContent}
          </div>
        </div>
      ) : (
        <>
          <header className="football-prediction-head">
            <div>
              <p className="football-prediction-kicker">Game Module #4 · Caribbean Freedom Arena</p>
              <h2 className="football-prediction-title">
                {flag} Football Prediction Arena
              </h2>
              <p className="football-prediction-sub">
                {countryName} · predict real fixtures · climb global & country boards
              </p>
            </div>
            <div className="football-prediction-head-actions">
              {onClose ? (
                <button type="button" className="football-prediction-close" onClick={onClose} aria-label="Close game">
                  ×
                </button>
              ) : null}
            </div>
          </header>
          {notice ? (
            <p className="football-prediction-notice" role="status">{notice}</p>
          ) : null}
          {predictionTabs}
          {mainContent}
        </>
      )}
    </section>
  );
}
