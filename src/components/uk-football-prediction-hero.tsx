"use client";

const showcaseMatches = [
  {
    id: "pl-city-liverpool",
    comp: "Premier League",
    home: "Manchester City",
    away: "Liverpool",
    when: "Thu 25 Jun · 15:30",
    pulse: true
  },
  {
    id: "pl-arsenal-chelsea",
    comp: "London Derby",
    home: "Arsenal",
    away: "Chelsea",
    when: "Thu 25 Jun · 18:15",
    pulse: true
  },
  {
    id: "fac-united-spurs",
    comp: "FA Cup",
    home: "Manchester United",
    away: "Tottenham",
    when: "Fri 26 Jun · 20:00",
    pulse: false
  },
  {
    id: "ucl-villa-newcastle",
    comp: "Champions League",
    home: "Aston Villa",
    away: "Newcastle",
    when: "Wed 24 Jun · 21:00",
    pulse: false
  }
] as const;

/** Free public lanes — no cash / paid battles on public UI */
const freePlayLanes = [
  {
    emoji: "🎯",
    title: "Correct Predictions",
    body: "Earn Arena Points for accuracy"
  },
  {
    emoji: "🏆",
    title: "Top Leaderboard",
    body: "Climb weekly · monthly · country boards free"
  },
  {
    emoji: "⚔️",
    title: "Prediction Battles",
    body: "Challenge mode UI · free play (paid entries frozen)"
  },
  {
    emoji: "📡",
    title: "Creator Mode",
    body: "Top predictors showcase · gifts frozen until later"
  }
] as const;

/**
 * Money catalog for Command Center FREEZE COMING SOON only.
 * Not rendered on the public UK prediction hero.
 */
export const UK_FOOTBALL_PREDICTION_FREEZE_CATALOG = {
  panelTitle: "🇬🇧 UK · LIVE PREDICTION LANE · Football Prediction Arena",
  publicStatus: "LIVE for public · free predict · money removed",
  room: "/rooms/uk-flag-cotswolds · Football Prediction Arena",
  freePublic: [
    "🇬🇧 UK · LIVE PREDICTION LANE hero + match showcase",
    "Predict fixtures · lock picks · score points",
    "Active predictions · leaderboard · stats · tournaments tabs",
    "Premier League · FA Cup · UCL boards (free play)",
    "Climb Arena Points boards (no cash prize on public)"
  ],
  frozenMoney: [
    "Weekly cash prizes (paid in USD)",
    "Optional paid prediction battle entries",
    "Creator mode fan gifts on prediction streams",
    "Paid battles & prize pools via platform checkout",
    "Real-money earn copy on public hero"
  ],
  moneyLanes: [
    {
      emoji: "🎯",
      title: "Correct Predictions",
      body: "Win prizes & Arena Points"
    },
    {
      emoji: "🏆",
      title: "Top Leaderboard",
      body: "Weekly cash prizes (paid in USD)"
    },
    {
      emoji: "⚔️",
      title: "Prediction Battles",
      body: "Bet against other players (optional paid entries)"
    },
    {
      emoji: "📡",
      title: "Creator Mode",
      body: "Top predictors can go live and get gifted by fans"
    }
  ],
  checkoutNote:
    "Paid battles & prize pools run through secure platform checkout (frozen until NEXT_PUBLIC_REAL_MONEY_ENABLED=true).",
  reopenNote:
    "When ready: restore money lanes on hero + enable platform checkout for prize pools / paid battles."
} as const;

/** UK room hero · free Predict & climb (money catalog in Command Center freeze) */
export function UkFootballPredictionHero() {
  return (
    <div className="uk-fp-hero" aria-label="UK Football Prediction Arena">
      <div className="uk-fp-hero-aurora" aria-hidden="true" />
      <div className="uk-fp-hero-pitch" aria-hidden="true" />

      <header className="uk-fp-hero-head">
        <div className="uk-fp-hero-live-row">
          <span className="uk-fp-hero-live-dot" aria-hidden="true" />
          <p className="uk-fp-hero-kicker">🇬🇧 UK · LIVE PREDICTION LANE</p>
        </div>
        <h2 className="uk-fp-hero-title">🇬🇧 UK Football Prediction Arena</h2>
        <p className="uk-fp-hero-leagues">Premier League • FA Cup • Champions League</p>
        <p className="uk-fp-hero-lead">
          Climb the leaderboard and earn Arena Points.
        </p>
      </header>

      <section className="uk-fp-hero-matches" aria-label="Live and upcoming matches UK focus">
        <div className="uk-fp-hero-section-head">
          <p className="uk-fp-hero-section-title">Live &amp; Upcoming Matches (UK Focus)</p>
          <span className="uk-fp-hero-pulse-badge">PULSE</span>
        </div>
        <ul className="uk-fp-hero-match-grid" role="list">
          {showcaseMatches.map((match, index) => (
            <li
              key={match.id}
              className={`uk-fp-hero-match${match.pulse ? " uk-fp-hero-match--pulse" : ""}`}
              role="listitem"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <p className="uk-fp-hero-match-comp">{match.comp}</p>
              <p className="uk-fp-hero-match-teams">
                {match.home} <span className="uk-fp-hero-match-vs">vs</span> {match.away}
              </p>
              <p className="uk-fp-hero-match-when">{match.when}</p>
            </li>
          ))}
        </ul>
        <p className="uk-fp-hero-more-comps">
          More competitions: Premier League, FA Cup, EFL Championship, Champions League, Europa League.
        </p>
      </section>

      <section className="uk-fp-hero-money" aria-label="How free play works">
        <p className="uk-fp-hero-section-title">How free play works</p>
        <div className="uk-fp-hero-money-grid">
          {freePlayLanes.map((lane) => (
            <article key={lane.title} className="uk-fp-hero-money-card">
              <p className="uk-fp-hero-money-title">
                <span aria-hidden="true">{lane.emoji} </span>
                {lane.title}
              </p>
              <p className="uk-fp-hero-money-body">{lane.body}</p>
            </article>
          ))}
        </div>
        <p className="uk-fp-hero-money-note">
          Free predictions &amp; Arena Points only · cash prizes and paid battles stay in Command Center until launch.
        </p>
      </section>
    </div>
  );
}
