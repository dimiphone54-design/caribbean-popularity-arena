const SLOT_TITLE = "FREEDOM";
const SLOT_SCROLL = "Welcome aboard — glad you're here🌍";

/** Same 12-step jackpot reel as the numbers — mini clap frames spin in the window */
const JACKPOT_REEL_CLAPS = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿", "👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"] as const;

function JackpotReelClap() {
  return (
    <span className="ai-real-slot-cine-jackpot-reel ai-real-slot-cine-jackpot-reel--clap" aria-label="FREEDOM">
      <span className="ai-real-slot-cine-jackpot-reel-window" aria-hidden="true">
        <span className="ai-real-slot-cine-jackpot-reel-strip">
          {JACKPOT_REEL_CLAPS.map((clap, index) => (
            <span key={`${clap}-${index}`} className="ai-real-slot-cine-jackpot-reel-digit ai-real-slot-cine-jackpot-reel-digit--clap">
              {clap}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

function TitleLine() {
  return (
    <div className="ai-real-slot-cine-title-row">
      <span className="ai-real-slot-cine-movie-project ai-real-slot-cine-movie-project-title">
        <span className="ai-real-slot-cine-title-hot">
          <JackpotReelClap />
          <span className="ai-real-slot-cine-title-word">FREEDOM</span>
        </span>
      </span>
    </div>
  );
}

function ScrollSubtitle() {
  return (
    <div className="ai-real-slot-cine-scroll-row ai-real-slot-cine-scroll-row-sub">
      <div
        className="ai-real-slot-cine-scroll-track"
        style={{ ["--ai-slot-scroll-duration" as string]: "16s" }}
      >
        <span className="ai-real-slot-cine-scroll-item">
          <span className="ai-real-slot-cine-movie-project ai-real-slot-cine-movie-project-sub">
            {SLOT_SCROLL}
          </span>
        </span>
        <span className="ai-real-slot-cine-scroll-item" aria-hidden="true">
          <span className="ai-real-slot-cine-movie-project ai-real-slot-cine-movie-project-sub">
            {SLOT_SCROLL}
          </span>
        </span>
      </div>
    </div>
  );
}

export function ArenaSlotsCinematicPanel() {
  return (
    <div className="ai-real-slot-cine" aria-label="FREEDOM">
      <span className="ai-real-slot-cine-letterbox ai-real-slot-cine-letterbox-top" aria-hidden="true" />
      <span className="ai-real-slot-cine-letterbox ai-real-slot-cine-letterbox-bottom" aria-hidden="true" />

      <div className="ai-real-slot-cine-viewport">
        <div className="ai-real-slot-cine-rig">
          <div className="ai-real-slot-cine-shake">
            <span className="ai-real-slot-cine-feed" aria-hidden="true" />
            <span className="ai-real-slot-cine-bokeh" aria-hidden="true" />
            <span className="ai-real-slot-cine-grain" aria-hidden="true" />
            <span className="ai-real-slot-cine-vignette" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="ai-real-slot-cine-hud">
        <div className="ai-real-slot-cine-project">
          <span className="ai-real-slot-cine-project-beam" aria-hidden="true" />
          <span className="ai-real-slot-cine-project-scan" aria-hidden="true" />

          <div className="ai-real-slot-cine-scroll-stage">
            <p className="sr-only">
              {SLOT_TITLE}. {SLOT_SCROLL}
            </p>
            <TitleLine />
            <ScrollSubtitle />
          </div>
        </div>
      </div>
    </div>
  );
}
