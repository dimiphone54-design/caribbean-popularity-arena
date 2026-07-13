"use client";

import Link from "next/link";

/**
 * Three size/layout options for the UK football prediction header panel.
 * Pick A / B / C — then we wire that style into the live UK room.
 */
export function UkFootballPanelSizePreview() {
  return (
    <main className="uk-fp-preview-page">
      <header className="uk-fp-preview-head">
        <p className="uk-fp-preview-eyebrow">UK ROOM · FOOTBALL PANEL</p>
        <h1 className="uk-fp-preview-title">3 smaller · organised layouts</h1>
        <p className="uk-fp-preview-sub">
          Same content: <strong>🇬🇧 UK football lane · Predict &amp; climb</strong> +{" "}
          <strong>Football prediction arena</strong>. Pick one — we apply it live.
        </p>
        <p className="uk-fp-preview-back">
          <Link href="/rooms/uk-flag-cotswolds">← Back to UK room</Link>
        </p>
      </header>

      <div className="uk-fp-preview-grid">
        {/* ── A · Compact toolbar ── */}
        <article className="uk-fp-preview-card" data-option="A">
          <div className="uk-fp-preview-card-label">
            <span className="uk-fp-preview-option">A</span>
            <div>
              <h2>Compact toolbar</h2>
              <p>One slim horizontal bar · title + live + filter in a row</p>
            </div>
          </div>

          <div className="uk-fp-mock uk-fp-mock--a" aria-label="Option A mock">
            <div className="uk-fp-mock-a-bar">
              <span className="uk-fp-mock-a-kicker">🇬🇧 UK football · Predict &amp; climb</span>
              <span className="uk-fp-mock-a-live" aria-hidden="true" />
              <span className="uk-fp-mock-a-title">Football prediction arena</span>
              <span className="uk-fp-mock-a-pill">All competitions</span>
            </div>
            <div className="uk-fp-mock-a-pills">
              <span className="is-on">All</span>
              <span>PL</span>
              <span>UCL</span>
              <span>EFL</span>
              <span>FA</span>
            </div>
            <div className="uk-fp-mock-a-tabs">
              <span className="is-on">Matches</span>
              <span>Board</span>
              <span>Tourneys</span>
            </div>
            <div className="uk-fp-mock-body">
              <div className="uk-fp-mock-row" />
              <div className="uk-fp-mock-row" />
              <div className="uk-fp-mock-row short" />
            </div>
          </div>

          <ul className="uk-fp-preview-pros">
            <li>Smallest header height</li>
            <li>Everything scannable on one line</li>
            <li>Best on mobile dock space</li>
          </ul>
        </article>

        {/* ── B · Two-line chip stack ── */}
        <article className="uk-fp-preview-card" data-option="B">
          <div className="uk-fp-preview-card-label">
            <span className="uk-fp-preview-option">B</span>
            <div>
              <h2>Two-line chip stack</h2>
              <p>Tight title row · chips under · still compact</p>
            </div>
          </div>

          <div className="uk-fp-mock uk-fp-mock--b" aria-label="Option B mock">
            <div className="uk-fp-mock-b-head">
              <div className="uk-fp-mock-b-left">
                <p className="uk-fp-mock-b-kicker">🇬🇧 UK football lane · Predict &amp; climb</p>
                <h3 className="uk-fp-mock-b-title">Football prediction arena</h3>
              </div>
              <span className="uk-fp-mock-b-pill">All competitions</span>
            </div>
            <div className="uk-fp-mock-b-pills">
              <span className="is-on">All</span>
              <span>Premier League</span>
              <span>UCL</span>
              <span>Championship</span>
            </div>
            <div className="uk-fp-mock-b-tabs">
              <span className="is-on">Matches</span>
              <span>Leaderboard</span>
              <span>Tournaments</span>
            </div>
            <div className="uk-fp-mock-body">
              <div className="uk-fp-mock-row" />
              <div className="uk-fp-mock-row" />
              <div className="uk-fp-mock-row short" />
            </div>
          </div>

          <ul className="uk-fp-preview-pros">
            <li>Clear hierarchy · kicker then title</li>
            <li>Still much smaller than today</li>
            <li>Balanced desktop + phone</li>
          </ul>
        </article>

        {/* ── C · Mini card rail ── */}
        <article className="uk-fp-preview-card" data-option="C">
          <div className="uk-fp-preview-card-label">
            <span className="uk-fp-preview-option">C</span>
            <div>
              <h2>Mini card rail</h2>
              <p>Left mini identity card · right filter + tabs · board below full width</p>
            </div>
          </div>

          <div className="uk-fp-mock uk-fp-mock--c" aria-label="Option C mock">
            <div className="uk-fp-mock-c-top">
              <div className="uk-fp-mock-c-id">
                <span className="uk-fp-mock-c-flag">🇬🇧</span>
                <div>
                  <p className="uk-fp-mock-c-kicker">Predict &amp; climb</p>
                  <p className="uk-fp-mock-c-title">Prediction arena</p>
                </div>
                <span className="uk-fp-mock-c-live" aria-hidden="true" />
              </div>
              <div className="uk-fp-mock-c-controls">
                <div className="uk-fp-mock-c-pills">
                  <span className="is-on">All</span>
                  <span>PL</span>
                  <span>UCL</span>
                </div>
                <div className="uk-fp-mock-c-tabs">
                  <span className="is-on">Matches</span>
                  <span>Board</span>
                  <span>Cups</span>
                </div>
              </div>
            </div>
            <div className="uk-fp-mock-body">
              <div className="uk-fp-mock-row" />
              <div className="uk-fp-mock-row" />
              <div className="uk-fp-mock-row short" />
            </div>
          </div>

          <ul className="uk-fp-preview-pros">
            <li>Identity on left · tools on right</li>
            <li>Organised like a mini command strip</li>
            <li>Looks pro on wide screens</li>
          </ul>
        </article>
      </div>

      <p className="uk-fp-preview-foot">
        Reply with <strong>A</strong>, <strong>B</strong>, or <strong>C</strong> — we lock that layout into the live UK
        room panel.
      </p>

      <style jsx global>{`
        .uk-fp-preview-page {
          min-height: 100vh;
          padding: 1.5rem 1rem 3rem;
          background: linear-gradient(180deg, #020617 0%, #0b1220 50%, #020617 100%);
          color: #e2e8f0;
        }
        .uk-fp-preview-head {
          max-width: 56rem;
          margin: 0 auto 1.5rem;
          text-align: center;
        }
        .uk-fp-preview-eyebrow {
          margin: 0 0 0.35rem;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #67e8f9;
        }
        .uk-fp-preview-title {
          margin: 0 0 0.45rem;
          font-size: clamp(1.35rem, 3vw, 1.85rem);
          font-weight: 900;
          color: #f8fafc;
        }
        .uk-fp-preview-sub {
          margin: 0 auto;
          max-width: 36rem;
          font-size: 0.88rem;
          line-height: 1.5;
          color: #94a3b8;
        }
        .uk-fp-preview-sub strong {
          color: #e2e8f0;
        }
        .uk-fp-preview-back {
          margin: 0.85rem 0 0;
          font-size: 0.85rem;
        }
        .uk-fp-preview-back a {
          color: #67e8f9;
          text-decoration: underline;
          text-underline-offset: 0.15em;
        }
        .uk-fp-preview-grid {
          display: grid;
          gap: 1.25rem;
          max-width: 56rem;
          margin: 0 auto;
        }
        @media (min-width: 900px) {
          .uk-fp-preview-grid {
            grid-template-columns: 1fr;
          }
        }
        .uk-fp-preview-card {
          border-radius: 1.1rem;
          border: 1px solid rgba(103, 232, 249, 0.18);
          background: rgba(15, 23, 42, 0.75);
          padding: 1rem 1rem 1.1rem;
        }
        .uk-fp-preview-card-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .uk-fp-preview-option {
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          flex-shrink: 0;
          border-radius: 0.55rem;
          border: 1px solid rgba(247, 231, 170, 0.45);
          background: rgba(247, 231, 170, 0.12);
          font-weight: 900;
          color: #f7e7aa;
        }
        .uk-fp-preview-card-label h2 {
          margin: 0;
          font-size: 1rem;
          font-weight: 900;
          color: #f8fafc;
        }
        .uk-fp-preview-card-label p {
          margin: 0.15rem 0 0;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .uk-fp-preview-pros {
          margin: 0.75rem 0 0;
          padding-left: 1.1rem;
          font-size: 0.75rem;
          line-height: 1.45;
          color: #9fb4d4;
        }

        /* shared mock shell */
        .uk-fp-mock {
          border-radius: 0.9rem;
          border: 1px solid rgba(0, 245, 255, 0.2);
          background: linear-gradient(165deg, rgba(6, 12, 24, 0.95), rgba(3, 8, 16, 0.88));
          padding: 0.55rem 0.65rem 0.7rem;
          overflow: hidden;
        }
        .uk-fp-mock-body {
          display: grid;
          gap: 0.35rem;
          margin-top: 0.55rem;
        }
        .uk-fp-mock-row {
          height: 1.65rem;
          border-radius: 0.45rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .uk-fp-mock-row.short {
          width: 72%;
        }

        /* ── A ── */
        .uk-fp-mock-a-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem 0.5rem;
          padding: 0.28rem 0.15rem 0.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .uk-fp-mock-a-kicker {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #67e8f9;
        }
        .uk-fp-mock-a-live {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 999px;
          background: #b8ff3c;
          box-shadow: 0 0 8px rgba(184, 255, 60, 0.9);
        }
        .uk-fp-mock-a-title {
          font-size: 0.72rem;
          font-weight: 900;
          color: #f7e7aa;
        }
        .uk-fp-mock-a-pill {
          margin-left: auto;
          border-radius: 999px;
          border: 1px solid rgba(184, 255, 60, 0.35);
          background: rgba(184, 255, 60, 0.1);
          padding: 0.08rem 0.4rem;
          font-size: 0.55rem;
          font-weight: 800;
          color: #b8ff3c;
        }
        .uk-fp-mock-a-pills,
        .uk-fp-mock-a-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.28rem;
          margin-top: 0.4rem;
        }
        .uk-fp-mock-a-pills span,
        .uk-fp-mock-a-tabs span {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.28);
          padding: 0.18rem 0.45rem;
          font-size: 0.55rem;
          font-weight: 800;
          color: #9fb4d4;
        }
        .uk-fp-mock-a-pills span.is-on,
        .uk-fp-mock-a-tabs span.is-on {
          border-color: rgba(184, 255, 60, 0.45);
          background: rgba(184, 255, 60, 0.12);
          color: #b8ff3c;
        }

        /* ── B ── */
        .uk-fp-mock-b-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .uk-fp-mock-b-kicker {
          margin: 0;
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #67e8f9;
        }
        .uk-fp-mock-b-title {
          margin: 0.15rem 0 0;
          font-size: 0.82rem;
          font-weight: 900;
          color: #f7e7aa;
          line-height: 1.2;
        }
        .uk-fp-mock-b-pill {
          flex-shrink: 0;
          border-radius: 999px;
          border: 1px solid rgba(184, 255, 60, 0.35);
          background: rgba(184, 255, 60, 0.1);
          padding: 0.12rem 0.45rem;
          font-size: 0.55rem;
          font-weight: 800;
          color: #b8ff3c;
        }
        .uk-fp-mock-b-pills,
        .uk-fp-mock-b-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.28rem;
          margin-top: 0.4rem;
        }
        .uk-fp-mock-b-pills span,
        .uk-fp-mock-b-tabs span {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.28);
          padding: 0.2rem 0.5rem;
          font-size: 0.58rem;
          font-weight: 800;
          color: #9fb4d4;
        }
        .uk-fp-mock-b-pills span.is-on,
        .uk-fp-mock-b-tabs span.is-on {
          border-color: rgba(184, 255, 60, 0.45);
          background: rgba(184, 255, 60, 0.12);
          color: #b8ff3c;
        }

        /* ── C ── */
        .uk-fp-mock-c-top {
          display: grid;
          gap: 0.45rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        @media (min-width: 640px) {
          .uk-fp-mock-c-top {
            grid-template-columns: auto minmax(0, 1fr);
            align-items: center;
          }
        }
        .uk-fp-mock-c-id {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.5rem;
          border-radius: 0.65rem;
          border: 1px solid rgba(0, 245, 255, 0.2);
          background: rgba(0, 0, 0, 0.28);
        }
        .uk-fp-mock-c-flag {
          font-size: 1.15rem;
          line-height: 1;
        }
        .uk-fp-mock-c-kicker {
          margin: 0;
          font-size: 0.52rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #67e8f9;
        }
        .uk-fp-mock-c-title {
          margin: 0.08rem 0 0;
          font-size: 0.72rem;
          font-weight: 900;
          color: #f7e7aa;
        }
        .uk-fp-mock-c-live {
          width: 0.4rem;
          height: 0.4rem;
          margin-left: 0.15rem;
          border-radius: 999px;
          background: #b8ff3c;
          box-shadow: 0 0 8px rgba(184, 255, 60, 0.9);
        }
        .uk-fp-mock-c-controls {
          display: grid;
          gap: 0.35rem;
          min-width: 0;
        }
        .uk-fp-mock-c-pills,
        .uk-fp-mock-c-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.28rem;
        }
        .uk-fp-mock-c-pills span,
        .uk-fp-mock-c-tabs span {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.28);
          padding: 0.18rem 0.45rem;
          font-size: 0.55rem;
          font-weight: 800;
          color: #9fb4d4;
        }
        .uk-fp-mock-c-pills span.is-on,
        .uk-fp-mock-c-tabs span.is-on {
          border-color: rgba(184, 255, 60, 0.45);
          background: rgba(184, 255, 60, 0.12);
          color: #b8ff3c;
        }

        .uk-fp-preview-foot {
          max-width: 56rem;
          margin: 1.5rem auto 0;
          text-align: center;
          font-size: 0.88rem;
          color: #94a3b8;
        }
        .uk-fp-preview-foot strong {
          color: #f7e7aa;
        }
      `}</style>
    </main>
  );
}
