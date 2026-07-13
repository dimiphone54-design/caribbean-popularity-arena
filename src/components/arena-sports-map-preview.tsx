import Link from "next/link";

import {
  ARENA_ESPORTS_LIST,
  ARENA_SPORTS_MAP_STATS,
  ARENA_SPORTS_MAP_ZONES,
  ARENA_SPORTS_UNIQUE_LIST
} from "@/lib/arena-sports-map";

export function ArenaSportsMapPreview() {
  return (
    <div className="arena-sports-map-preview">
      <header className="arena-sports-map-preview-hero">
        <p className="arena-sports-map-preview-kicker">Caribbean Freedom Arena · site audit</p>
        <h1 className="arena-sports-map-preview-title">Sports Map Preview</h1>
        <p className="arena-sports-map-preview-lead">
          Every different sport and sport-style lane found across the live website — grouped by room and nav zone.
        </p>
        <Link href="/" className="arena-sports-map-preview-home">
          ← Back to arena
        </Link>
      </header>

      <section className="arena-sports-map-preview-stats" aria-label="Sports summary">
        <article className="arena-sports-map-preview-stat">
          <span className="arena-sports-map-preview-stat-num">{ARENA_SPORTS_MAP_STATS.uniqueSports}</span>
          <span className="arena-sports-map-preview-stat-label">Unique sports</span>
        </article>
        <article className="arena-sports-map-preview-stat">
          <span className="arena-sports-map-preview-stat-num">{ARENA_SPORTS_MAP_STATS.playableSimulators}</span>
          <span className="arena-sports-map-preview-stat-label">Playable simulators</span>
        </article>
        <article className="arena-sports-map-preview-stat">
          <span className="arena-sports-map-preview-stat-num">{ARENA_SPORTS_MAP_STATS.sportsRecordsTab}</span>
          <span className="arena-sports-map-preview-stat-label">Sports records tab</span>
        </article>
        <article className="arena-sports-map-preview-stat arena-sports-map-preview-stat--wide">
          <span className="arena-sports-map-preview-stat-num">⚽</span>
          <span className="arena-sports-map-preview-stat-label">
            Biggest sport · <strong>{ARENA_SPORTS_MAP_STATS.topSport}</strong>
          </span>
        </article>
      </section>

      <section className="arena-sports-map-preview-flow" aria-label="Sports flow sketch">
        <h2 className="arena-sports-map-preview-section-title">Flow sketch</h2>
        <div className="arena-sports-map-preview-flow-board">
          <div className="arena-sports-map-preview-flow-node arena-sports-map-preview-flow-node--root">
            <span>🔝 Nav Sports Panel</span>
          </div>
          <div className="arena-sports-map-preview-flow-branches">
            <div className="arena-sports-map-preview-flow-branch">
              <span className="arena-sports-map-preview-flow-connector" aria-hidden="true" />
              <div className="arena-sports-map-preview-flow-node">🇬🇧 UK Rooms</div>
              <div className="arena-sports-map-preview-flow-leaves">
                <span>Football Lads</span>
                <span>Cotswolds · park games</span>
                <span>Football prediction</span>
              </div>
            </div>
            <div className="arena-sports-map-preview-flow-branch">
              <span className="arena-sports-map-preview-flow-connector" aria-hidden="true" />
              <div className="arena-sports-map-preview-flow-node">🇨🇴 Colombia</div>
              <div className="arena-sports-map-preview-flow-leaves">
                <span>Fútbol</span>
                <span>Salsa</span>
                <span>Surf</span>
              </div>
            </div>
            <div className="arena-sports-map-preview-flow-branch">
              <span className="arena-sports-map-preview-flow-connector" aria-hidden="true" />
              <div className="arena-sports-map-preview-flow-node">🇪🇨 Ecuador</div>
              <div className="arena-sports-map-preview-flow-leaves">
                <span>Ecuavoley</span>
                <span>Free Fire EC</span>
              </div>
            </div>
            <div className="arena-sports-map-preview-flow-branch">
              <span className="arena-sports-map-preview-flow-connector" aria-hidden="true" />
              <div className="arena-sports-map-preview-flow-node">🇯🇵 Japan · 🇨🇳 China</div>
              <div className="arena-sports-map-preview-flow-leaves">
                <span>Kendo</span>
                <span>Wushu Duilian</span>
                <span>Wushu Sanda</span>
              </div>
            </div>
            <div className="arena-sports-map-preview-flow-branch">
              <span className="arena-sports-map-preview-flow-connector" aria-hidden="true" />
              <div className="arena-sports-map-preview-flow-node">📊 Sports Records</div>
              <div className="arena-sports-map-preview-flow-leaves">
                <span>Football</span>
                <span>Ecuavoley</span>
                <span>Kendo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="arena-sports-map-preview-zones" aria-label="Sports by zone">
        <h2 className="arena-sports-map-preview-section-title">By room & zone</h2>
        <div className="arena-sports-map-preview-grid">
          {ARENA_SPORTS_MAP_ZONES.map((zone) => (
            <article key={zone.id} className="arena-sports-map-preview-card">
              <header className="arena-sports-map-preview-card-head">
                <span className="arena-sports-map-preview-card-flag" aria-hidden="true">
                  {zone.flag}
                </span>
                <div>
                  <h3 className="arena-sports-map-preview-card-title">{zone.title}</h3>
                  <p className="arena-sports-map-preview-card-sub">{zone.subtitle}</p>
                </div>
                <span className="arena-sports-map-preview-card-count">{zone.sports.length}</span>
              </header>
              <ul className="arena-sports-map-preview-chips">
                {zone.sports.map((sport) => (
                  <li key={`${zone.id}-${sport.name}`} className="arena-sports-map-preview-chip">
                    <span aria-hidden="true">{sport.emoji}</span>
                    {sport.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="arena-sports-map-preview-master" aria-label="All unique sports">
        <h2 className="arena-sports-map-preview-section-title">All {ARENA_SPORTS_UNIQUE_LIST.length} unique sports</h2>
        <ul className="arena-sports-map-preview-master-list">
          {ARENA_SPORTS_UNIQUE_LIST.map((sport, index) => (
            <li key={sport.name} className="arena-sports-map-preview-master-item">
              <span className="arena-sports-map-preview-master-index">{index + 1}</span>
              <span className="arena-sports-map-preview-master-emoji" aria-hidden="true">
                {sport.emoji}
              </span>
              {sport.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="arena-sports-map-preview-esports" aria-label="Esports lanes">
        <h2 className="arena-sports-map-preview-section-title">Esports lanes (bonus)</h2>
        <ul className="arena-sports-map-preview-chips arena-sports-map-preview-chips--inline">
          {ARENA_ESPORTS_LIST.map((sport) => (
            <li key={sport.name} className="arena-sports-map-preview-chip arena-sports-map-preview-chip--esports">
              <span aria-hidden="true">{sport.emoji}</span>
              {sport.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}