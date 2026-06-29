const SLOT_TITLE = "12 SLOTS";
const SLOT_BIRTHDAY = "🎂 Birthday Queen · 5 Extra Live Hours · Own The Night · All Eyes On Her";
const SLOT_SUB =
  "FROZEN NATIONS LOCKED · GIRL SIGN-IN OPEN · UK · ECUADOR · TRINIDAD · 3-HOUR LIVE RUN";

const JACKPOT_REEL_NUMBERS = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));

function JackpotReelTwelve() {
  return (
    <span className="ai-real-slot-cine-jackpot-reel" aria-label="12">
      <span className="ai-real-slot-cine-jackpot-reel-window" aria-hidden="true">
        <span className="ai-real-slot-cine-jackpot-reel-strip">
          {JACKPOT_REEL_NUMBERS.map((value) => (
            <span key={value} className="ai-real-slot-cine-jackpot-reel-digit">
              {value}
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
          <JackpotReelTwelve />
          <span className="ai-real-slot-cine-title-word">SLOTS</span>
        </span>
      </span>
    </div>
  );
}

function ScrollSubtitle() {
  const scrollCopy = (
    <>
      <span className="ai-real-slot-cine-birthday-inline">{SLOT_BIRTHDAY}</span>
      <span className="ai-real-slot-cine-scroll-sep"> · </span>
      {SLOT_SUB}
    </>
  );

  return (
    <div className="ai-real-slot-cine-scroll-row ai-real-slot-cine-scroll-row-sub">
      <div
        className="ai-real-slot-cine-scroll-track"
        style={{ ["--ai-slot-scroll-duration" as string]: "16s" }}
      >
        <span className="ai-real-slot-cine-scroll-item">
          <span className="ai-real-slot-cine-movie-project ai-real-slot-cine-movie-project-sub">{scrollCopy}</span>
        </span>
        <span className="ai-real-slot-cine-scroll-item" aria-hidden="true">
          <span className="ai-real-slot-cine-movie-project ai-real-slot-cine-movie-project-sub">{scrollCopy}</span>
        </span>
      </div>
    </div>
  );
}

export function ArenaSlotsCinematicPanel() {
  return (
    <div className="ai-real-slot-cine" aria-label="12 slots · pending until player sign-in">
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
              {SLOT_TITLE}. {SLOT_BIRTHDAY}. {SLOT_SUB}
            </p>
            <TitleLine />
            <ScrollSubtitle />
          </div>
        </div>
      </div>
    </div>
  );
}
