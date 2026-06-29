import { ArenaPlusIceFrostOverlay } from "@/components/arena-plus-ice-frost-overlay";
import { ArenaPlusSnowSprinkles } from "@/components/arena-plus-snow-sprinkles";

type ArenaSlotIceFrostOverlayProps = {
  variant?: "full" | "slight" | "tech-glass";
  frostSrc?: string;
  frostImageClassName?: string;
  /** Hide ❄ FROZEN stamp · lounge nav tabs */
  hideStamp?: boolean;
};

/** Front 12 frozen slot · exact Arena Plus ice frost stack */
export function ArenaSlotIceFrostOverlay({
  variant = "full",
  frostSrc,
  frostImageClassName,
  hideStamp = false,
}: ArenaSlotIceFrostOverlayProps) {
  const slight = variant === "slight" || variant === "tech-glass";
  const techGlass = variant === "tech-glass";

  if (techGlass) {
    return (
      <div
        className="ai-real-slot-frost-stack ai-real-slot-frost-stack-slight legal-bot-tech-frost-stack"
        aria-hidden="true"
      >
        <ArenaPlusIceFrostOverlay src={frostSrc} imageClassName={frostImageClassName} />
        <ArenaPlusSnowSprinkles />
        <span className="legal-bot-tech-glass-plate">
          <span className="legal-bot-tech-glass-grid" />
          <span className="legal-bot-tech-glass-sheen" />
          <span className="legal-bot-tech-glass-corners" />
        </span>
      </div>
    );
  }

  return (
    <div
      className={`ai-real-slot-frost-stack${slight ? " ai-real-slot-frost-stack-slight" : ""}`}
      aria-hidden="true"
    >
      <span className="luxury-plan-frost-glass ai-real-slot-frost-glass">
        <span className="luxury-plan-frost-rim" />
        <span className="luxury-plan-frost-crystals" />
        <span className="luxury-plan-frost-sheen" />
        <span className="luxury-plan-frost-darken ai-real-slot-frost-darken" />
        <ArenaPlusIceFrostOverlay src={frostSrc} imageClassName={frostImageClassName} />
        <ArenaPlusSnowSprinkles />
      </span>
      {!slight && !hideStamp ? <span className="ai-real-slot-frozen-stamp">❄ FROZEN</span> : null}
    </div>
  );
}
