import type { ReactNode } from "react";
import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";

type ArenaLoungeFrostPanelProps = {
  children: ReactNode;
  className?: string;
  /** slight = room holo panels · full = intl frozen nation cards */
  variant?: "slight" | "full";
  as?: "section" | "div" | "article";
};

/** Ice frost shell · matches home lounge nav tabs → room panels */
export function ArenaLoungeFrostPanel({
  children,
  className = "",
  variant = "slight",
  as: Tag = "section",
}: ArenaLoungeFrostPanelProps) {
  const shellClass = variant === "full" ? "a2030-intl-panel-frost" : "a2030-lounge-panel-frost";

  return (
    <Tag className={`${shellClass}${className ? ` ${className}` : ""}`}>
      <ArenaSlotIceFrostOverlay variant={variant === "slight" ? "slight" : "full"} hideStamp />
      {children}
    </Tag>
  );
}

/** Room header chip · same ice-frost lane as home nav */
export function ArenaLoungeFrostBadge({ label = "Ice Frost · Preview lane" }: { label?: string }) {
  return (
    <span className="cfa-slot-frozen-badge arena-lounge-frost-room-badge mt-3 inline-flex">{label}</span>
  );
}
