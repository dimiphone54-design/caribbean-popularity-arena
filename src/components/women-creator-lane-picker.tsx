"use client";

import {
  WOMEN_CREATOR_LANE_LABELS,
  type WomenCreatorLane
} from "@/lib/arena-women-creator-lanes";

type WomenCreatorLanePickerProps = {
  lane: WomenCreatorLane | "";
  planDescription: string;
  onLaneChange: (lane: WomenCreatorLane) => void;
  onPlanChange: (plan: string) => void;
};

export function WomenCreatorLanePicker({
  lane,
  planDescription,
  onLaneChange,
  onPlanChange
}: WomenCreatorLanePickerProps) {
  const lanes = Object.entries(WOMEN_CREATOR_LANE_LABELS) as [
    WomenCreatorLane,
    (typeof WOMEN_CREATOR_LANE_LABELS)[WomenCreatorLane]
  ][];

  return (
    <div className="space-y-4">
      <p className="text-xs leading-5 text-[#9aa8c6]">
        Women-only · pick your lane in the world&apos;s biggest arena ecosystem. One path at a time.
      </p>

      <div className="space-y-2">
        {lanes.map(([id, meta]) => (
          <button
            key={id}
            type="button"
            aria-pressed={lane === id}
            onClick={() => onLaneChange(id)}
            className={`w-full rounded-xl border px-4 py-3 text-left transition ${
              lane === id
                ? "border-[#7dd3fc]/55 bg-[#7dd3fc]/12 text-[#eef6ff]"
                : "border-white/10 bg-black/20 text-[#d9e4f2] hover:border-white/20"
            }`}
          >
            <span className="block text-sm font-black uppercase tracking-[0.08em]">{meta.title}</span>
            <span className="mt-1 block text-xs leading-5 text-[#9aa8c6]">{meta.hint}</span>
            <span className="mt-1 block text-[0.65rem] italic text-[#7dd3fc]">e.g. {meta.example}</span>
          </button>
        ))}
      </div>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Your plan · straight answer</span>
        <textarea
          value={planDescription}
          onChange={(event) => onPlanChange(event.target.value)}
          className="mt-2 min-h-[88px] w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
          placeholder="Tell us exactly what you will do on cam or in the market…"
          required
          minLength={8}
        />
      </label>
    </div>
  );
}
