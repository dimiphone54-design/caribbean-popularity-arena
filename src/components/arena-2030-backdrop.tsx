import type { ReactNode } from "react";

const STAR_FIELD = [
  { left: "8%", top: "12%", size: 2, delay: "0s", duration: "3.2s" },
  { left: "18%", top: "28%", size: 1, delay: "0.8s", duration: "4.1s" },
  { left: "31%", top: "8%", size: 2, delay: "1.4s", duration: "3.6s" },
  { left: "44%", top: "18%", size: 1, delay: "0.3s", duration: "5s" },
  { left: "57%", top: "10%", size: 2, delay: "2s", duration: "3.8s" },
  { left: "69%", top: "24%", size: 1, delay: "1.1s", duration: "4.4s" },
  { left: "78%", top: "14%", size: 2, delay: "0.5s", duration: "3.3s" },
  { left: "88%", top: "32%", size: 1, delay: "1.8s", duration: "4.8s" },
  { left: "12%", top: "52%", size: 1, delay: "2.4s", duration: "4.2s" },
  { left: "26%", top: "62%", size: 2, delay: "0.9s", duration: "3.9s" },
  { left: "52%", top: "48%", size: 1, delay: "1.6s", duration: "5.2s" },
  { left: "73%", top: "58%", size: 2, delay: "0.2s", duration: "3.5s" },
  { left: "91%", top: "66%", size: 1, delay: "2.8s", duration: "4.6s" }
];

type Arena2030BackdropProps = {
  image?: string;
  imageOpacity?: string;
  intensity?: "standard" | "deep";
  photoFocus?: boolean;
  /** Full-bleed hero photo — Dubai 2030 arena scene behind the whole homepage UI */
  heroBg?: boolean;
};

export function Arena2030Backdrop({
  image,
  imageOpacity = "opacity-[0.22] sm:opacity-[0.26]",
  intensity = "deep",
  photoFocus = false,
  heroBg = false
}: Arena2030BackdropProps) {
  const deep = intensity === "deep";
  const photo = photoFocus || heroBg;
  const resolvedOpacity = heroBg ? "opacity-100" : imageOpacity;

  return (
    <div
      className={`pointer-events-none overflow-hidden${
        heroBg ? " a2030-backdrop-wrap--hero-bg fixed inset-0 z-0" : " absolute inset-0"
      }${photo ? " a2030-backdrop-wrap--photo" : ""}`}
      aria-hidden="true"
    >
      <div className="a2030-aurora absolute inset-0" />
      <div className="a2030-stars absolute inset-0" />
      <div className="a2030-starfield absolute inset-0">
        {STAR_FIELD.map((star, index) => (
          <span
            key={index}
            className="a2030-star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: star.duration,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>
      <div className="a2030-grid absolute inset-0 opacity-80" />
      <div className="a2030-horizon absolute inset-x-0 bottom-[18%] h-px" />
      <div className="a2030-beam a2030-beam-left absolute -left-24 top-[8%] h-[72vh] w-[38vw] rotate-[14deg]" />
      <div className="a2030-beam a2030-beam-right absolute -right-24 top-[4%] h-[68vh] w-[34vw] -rotate-[12deg]" />
      {image ? (
        <div
          className={`${photo ? "a2030-backdrop-photo" : "a2030-backdrop"} absolute inset-0 bg-cover bg-center bg-no-repeat ${resolvedOpacity}${
            heroBg ? " a2030-backdrop-photo-hero" : ""
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ) : null}
      {heroBg ? null : (
        <>
          <div className="a2030-fog a2030-fog-a absolute -left-[10%] bottom-[8%] h-[42vh] w-[55vw] rounded-full" />
          <div className="a2030-fog a2030-fog-b absolute -right-[12%] bottom-[14%] h-[36vh] w-[48vw] rounded-full" />
        </>
      )}
      <div
        className={`absolute inset-0 ${
          heroBg
            ? "a2030-hero-bg-scrim"
            : photo
              ? "a2030-photo-scrim"
              : deep
                ? "bg-[radial-gradient(ellipse_at_center,rgba(3,4,12,0.05)_0%,rgba(3,4,12,0.82)_52%,rgba(1,2,8,0.99)_100%)]"
                : "bg-[radial-gradient(ellipse_at_center,rgba(3,4,12,0.08)_0%,rgba(3,4,12,0.72)_58%,rgba(3,4,12,0.98)_100%)]"
        }`}
      />
      <div className={`a2030-vignette absolute inset-0${heroBg ? " a2030-vignette-hero" : ""}`} />
      {heroBg ? null : <div className="a2030-scanlines absolute inset-0 opacity-90" />}
      {heroBg ? null : <div className="a2030-noise absolute inset-0 opacity-[0.14]" />}
      <div
        className={`absolute inset-x-0 top-0 bg-gradient-to-b from-[#010208] via-[#010208]/88 to-transparent${
          heroBg ? " h-28 from-[#010208]/72 via-[#010208]/28 to-transparent" : " h-52"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#010208] via-[#010208]/92 to-transparent${
          heroBg ? " a2030-bottom-fade--hero h-40 from-[#010208]/78 via-[#010208]/32 to-transparent" : photo ? " a2030-bottom-fade--photo h-56" : " h-56"
        }`}
      />
      {heroBg ? null : (
        <>
          <div className="a2030-orb a2030-orb-cyan absolute left-[6%] top-[16%] h-52 w-52 rounded-full" />
          <div className="a2030-orb a2030-orb-magenta absolute right-[8%] top-[20%] h-60 w-60 rounded-full" />
          <div className="a2030-orb a2030-orb-violet absolute left-[42%] top-[62%] h-44 w-44 rounded-full" />
        </>
      )}
    </div>
  );
}

type JumpingTitleProps = {
  text: string;
};

export function JumpingTitle({ text }: JumpingTitleProps) {
  const words = text.trim().split(/\s+/);
  let letterIndex = 0;

  return (
    <span className="a2030-title-letters inline-flex flex-wrap items-end" aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="a2030-title-word inline-flex items-end">
          {word.split("").map((char) => {
            const delay = letterIndex * 0.28;
            letterIndex += 1;

            return (
              <span
                key={`${char}-${letterIndex}`}
                className="a2030-title a2030-title-breathe a2030-title-letter inline-block"
                style={{ animationDelay: `${delay}s` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/** One letter per line · same gold gradient + h1 size as a2030-title */
export function VerticalStackTitle({ text }: JumpingTitleProps) {
  const letters = text.replace(/\s+/g, "").split("");

  return (
    <span className="a2030-title-vertical inline-flex flex-col items-start" aria-label={text}>
      {letters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="a2030-title a2030-title-breathe a2030-title-letter a2030-title-vertical-letter"
          style={{ animationDelay: `${index * 0.22}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/** Horizontal jump title · sakura word break · Tokyo lane styling */
export function JapanJumpingTitle({ text }: JumpingTitleProps) {
  const words = text.trim().split(/\s+/);
  let letterIndex = 0;

  return (
    <span className="japan-room-title-letters a2030-title-letters inline-flex flex-wrap items-end" aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="japan-room-title-word-group inline-flex items-end">
          {wordIndex > 0 ? (
            <span className="japan-room-title-sep" aria-hidden="true">
              <span className="japan-room-title-sakura">🌸</span>
              <span className="japan-room-title-hinomaru" />
            </span>
          ) : null}
          <span className="a2030-title-word japan-room-title-word inline-flex items-end">
            {word.split("").map((char) => {
              const delay = letterIndex * 0.28;
              letterIndex += 1;

              return (
                <span
                  key={`${char}-${letterIndex}`}
                  className="a2030-title a2030-title-breathe a2030-title-letter japan-room-title-letter inline-block"
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Horizontal jump title · red-star word break · war-fear flash */
export function ChinaWarFearFlashTitle({ text }: JumpingTitleProps) {
  const words = text.trim().split(/\s+/);
  let letterIndex = 0;

  return (
    <span className="china-war-fear-flash-wrap inline-block">
      <span
        className="china-war-fear-flash-letters a2030-title-letters inline-flex flex-wrap items-end"
        aria-label={text}
      >
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="china-war-fear-flash-word-group inline-flex items-end">
            {wordIndex > 0 ? (
              <span className="china-war-fear-flash-sep" aria-hidden="true">
                ★
              </span>
            ) : null}
            <span className="a2030-title-word china-war-fear-flash-word inline-flex items-end">
              {word.split("").map((char) => {
                const delay = letterIndex * 0.28;
                letterIndex += 1;

                return (
                  <span
                    key={`${char}-${letterIndex}`}
                    className="a2030-title-letter china-war-fear-flash-letter inline-block"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

type Arena2030HeaderProps = {
  title: string;
  description: ReactNode;
  liveBadge?: string;
  titleJump?: boolean;
  /** inline · jump · vertical · japan · china (war-fear flash) */
  titleVariant?: "inline" | "jump" | "vertical" | "japan" | "china";
  japanTitleKicker?: string;
  yearLabel?: string;
  yearExtra?: ReactNode;
  showYearBadge?: boolean;
};

export function Arena2030Header({
  title,
  description,
  liveBadge = "Atmospheric · Live",
  titleJump = false,
  titleVariant,
  japanTitleKicker = "日本 · ジャパン · ライブステージ",
  yearLabel = "2030",
  yearExtra,
  showYearBadge = true
}: Arena2030HeaderProps) {
  const resolvedVariant = titleVariant ?? (titleJump ? "jump" : "inline");

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {showYearBadge ? (
          <span className="a2030-badge a2030-micro inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase">
            {yearLabel}
          </span>
        ) : null}
        {yearExtra}
        <span
          className={`a2030-live a2030-micro inline-flex items-center gap-2 rounded-full border border-[#ff2bd6]/30 bg-[#ff2bd6]/8 px-3 py-1 text-[10px] font-bold text-[#ffb8ef]${resolvedVariant === "japan" ? " japan-room-live-badge" : " uppercase"}`}
        >
          <span className="a2030-pulse-ring inline-flex h-1.5 w-1.5 rounded-full bg-[#ff2bd6]" />
          {liveBadge}
        </span>
      </div>
      <h1 className="mt-5 text-4xl font-black sm:text-6xl">
        {resolvedVariant === "japan" ? (
          <>
            <p className="japan-room-title-kicker">{japanTitleKicker}</p>
            <JapanJumpingTitle text={title} />
          </>
        ) : resolvedVariant === "vertical" ? (
          <VerticalStackTitle text={title} />
        ) : resolvedVariant === "jump" ? (
          <JumpingTitle text={title} />
        ) : resolvedVariant === "china" ? (
          <ChinaWarFearFlashTitle text={title} />
        ) : (
          <span className="a2030-title a2030-title-breathe inline-block">{title}</span>
        )}
      </h1>
      <p className="a2030-atmo-copy mt-4 max-w-2xl text-sm leading-7">{description}</p>
    </>
  );
}
