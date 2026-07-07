"use client";

type CfaNavFreedomElite2050PillProps = {
  onOpenWorldMap: () => void;
};

/** CARIBBEANFREEDOMARENA nav tab · pure still · opens world map */
export function CfaNavFreedomElite2050Pill({ onOpenWorldMap }: CfaNavFreedomElite2050PillProps) {
  return (
    <button
      type="button"
      className="a2030-brand cfa-nav-quantum-pill cfa-nav-quantum-pill--freedom cfa-nav-quantum-pill--freedom-2050 cfa-nav-quantum-pill--freedom-still min-w-0 shrink"
      aria-label="Caribbean Freedom Arena · open world map"
      aria-haspopup="dialog"
      onClick={onOpenWorldMap}
    >
      <span className="cfa-nav-quantum-pill-text cfa-nav-quantum-pill-text--freedom-2050 cfa-nav-quantum-pill-text--freedom-still relative z-10">
        CARIBBEANFREEDOMARENA
      </span>
    </button>
  );
}