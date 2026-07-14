"use client";

import { getArenaSlotStudyHubPanel } from "@/lib/arena-slot-study-hub-lanes";
import { UKStudyHubTeacherLiveSlot } from "@/components/uk-study-hub-teacher-live-slot";

type CountryRoomStudyHubTabPanelProps = {
  countryId: string;
};

/** Country room · Study Hub lanes inside Study Hub tab */
export function CountryRoomStudyHubTabPanel({ countryId }: CountryRoomStudyHubTabPanelProps) {
  const panel = getArenaSlotStudyHubPanel(countryId);

  return (
    <div className="country-room-study-hub-tab-panel space-y-5">
      <section
        className="country-room-section relative overflow-hidden rounded-2xl"
        aria-label={panel.title}
        style={countryId === "uk" ? {
          backgroundImage:
            "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        } : undefined}
      >
        {countryId === "uk" && (
          <div className="absolute inset-0 bg-[#020c06]/30" aria-hidden="true" />
        )}
        <div className="relative z-10">
          <header className="text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">{panel.kicker}</p>
            <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
              {panel.title}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">{panel.description}</p>
          </header>

          <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
            {panel.lanes.map((lane) => (
              <span
                key={lane.label}
                className="inline-flex max-w-full items-start gap-1.5 rounded-full border border-[#94a3b8]/25 px-3 py-1.5 text-[10px] font-semibold text-[#cbd5e1]"
                role="listitem"
                title={lane.hint}
              >
                <span aria-hidden="true">{lane.emoji}</span>
                <span>{lane.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* UK-only: teacher live slots with gift system */}
      {countryId === "uk" && (
        <section
          className="country-room-section relative overflow-hidden rounded-2xl"
          aria-label="UK teacher live slots"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#020c06]/30" aria-hidden="true" />
          <div className="relative z-10">
            <UKStudyHubTeacherLiveSlot />
          </div>
        </section>
      )}
    </div>
  );
}