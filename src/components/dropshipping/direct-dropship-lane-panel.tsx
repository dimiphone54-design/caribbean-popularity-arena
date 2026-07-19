"use client";

import { buildDirectDropshipPublicLane } from "@/lib/dropship-lane-template";
import { isPublicDropshipVisible } from "@/lib/real-money";

type DirectDropshipLanePanelProps = {
  countryId: string;
  /** compact = room tab; full = market page */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * Shared public Direct Dropship Lane UI for every country.
 * Template: title · how it works · meta · no inventory note.
 * Products render once in the parent market panel.
 */
export function DirectDropshipLanePanel({
  countryId,
  variant = "full",
  className = ""
}: DirectDropshipLanePanelProps) {
  if (!isPublicDropshipVisible()) return null;

  const lane = buildDirectDropshipPublicLane(countryId);
  const compact = variant === "compact";

  return (
    <div
      className={`direct-dropship-lane rounded-2xl border border-[#f5c842]/25 bg-[#050a18]/55 p-4 sm:p-5${
        compact ? " direct-dropship-lane--compact" : ""
      }${className ? ` ${className}` : ""}`}
      aria-label={lane.title}
    >
      <header className="text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#f5c842] sm:text-sm">
          {lane.title}
        </p>
        <p className="mt-1.5 text-[12px] font-semibold text-[#d7e3f6] sm:text-[13px]">
          {lane.subtitle}
        </p>
      </header>

      <section className="mt-4" aria-label={lane.howItWorksHeading}>
        <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-[#67e8f9]">
          {lane.howItWorksHeading}
        </p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2" role="list">
          {lane.steps.map((step) => (
            <li
              key={step.title}
              className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5"
              role="listitem"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#f5c842]">
                {step.title}
              </p>
              <p className="mt-1 whitespace-pre-line text-[11px] leading-5 text-[#d7e3f6]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-4 text-center text-[11px] font-semibold text-[#fde68a]">{lane.footer}</p>
    </div>
  );
}
