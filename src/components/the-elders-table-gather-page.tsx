"use client";

import { useState } from "react";
import { Arena2030Header } from "@/components/arena-2030-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { TheEldersTableGatherBackdrop } from "@/components/the-elders-table-gather-backdrop";
import { TheEldersTableVersionPicker } from "@/components/the-elders-table-version-picker";
import {
  eldersTableLegacyGroups,
  eldersTableLegacyMembersClassic,
  eldersTableLegacyMembersMorocco,
  eldersTableLegacyMoroccoRoomDescription,
  eldersTableLegacyPrompts,
  eldersTableLegacyRegions,
  eldersTableLegacyRoomDescription,
  type EldersTableLegacyGroup,
  type EldersTableLegacyMember
} from "@/lib/the-elders-table-legacy";
import type { EldersTableVersionId } from "@/lib/the-elders-table-versions";

type TheEldersTableGatherPageProps = {
  variant: "classic" | "morocco";
  version: EldersTableVersionId;
};

const groupOrder: EldersTableLegacyGroup[] = [
  "antigua-women",
  "gym-men",
  "morocco-rich-men",
  "japan-women",
  "curvy-elder"
];

function groupMembers(members: EldersTableLegacyMember[], group: EldersTableLegacyGroup) {
  return members.filter((member) => member.group === group);
}

export function TheEldersTableGatherPage({ variant, version }: TheEldersTableGatherPageProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const isMorocco = variant === "morocco";
  const members = isMorocco ? eldersTableLegacyMembersMorocco : eldersTableLegacyMembersClassic;
  const description = isMorocco ? eldersTableLegacyMoroccoRoomDescription : eldersTableLegacyRoomDescription;
  const regions = isMorocco ? "Antigua · Japan · Morocco riad · curvy seat" : eldersTableLegacyRegions;
  const activePrompt = eldersTableLegacyPrompts.find((prompt) => prompt.id === selectedPrompt);
  const visibleGroups = isMorocco
    ? (["antigua-women", "morocco-rich-men", "japan-women", "curvy-elder"] as EldersTableLegacyGroup[])
    : (["antigua-women", "gym-men", "japan-women", "curvy-elder"] as EldersTableLegacyGroup[]);

  const mainClass = isMorocco
    ? "arena-2030 arena-2030-elders-table arena-2030-marrakech-zellige"
    : "arena-2030 arena-2030-elders-table";

  return (
    <>
      <main className={`${mainClass} relative min-h-screen overflow-hidden pb-56`} data-elders-version={version}>
        <TheEldersTableGatherBackdrop members={members} />
        <div
          className={`${isMorocco ? "marrakech-zellige-overlay" : "elders-table-warm-haze"} pointer-events-none absolute inset-0 z-[1]`}
          aria-hidden="true"
        />

        <div className="relative z-10 px-4 pt-[11.5rem] sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {isMorocco ? (
              <div className="marrakech-zellige-header-wrap">
                <div className="marrakech-zellige-arch pointer-events-none" aria-hidden="true" />
                <Arena2030Header
                  liveBadge="Le Marrakech · Zellige · 12-seat mosaic · Live"
                  title="THE ELDERS TABLE"
                  titleJump
                  description={description}
                />
              </div>
            ) : (
              <Arena2030Header
                liveBadge="Elders hold court · 12-person mosaic · Live"
                title="THE ELDERS TABLE"
                titleJump
                description={description}
              />
            )}

            <section
              className={`${isMorocco ? "marrakech-zellige-panel marrakech-zellige-panel-women" : "elders-table-panel"} mt-8 rounded-[1.75rem] p-4 sm:p-5`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p
                  className={`a2030-micro text-[10px] font-bold uppercase sm:text-xs ${
                    isMorocco ? "marrakech-zellige-label-teal" : "text-[#f5c842]"
                  }`}
                >
                  Table roster // {members.length} gathered // {regions}
                </p>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
                    isMorocco ? "marrakech-zellige-badge marrakech-zellige-badge-women" : "elders-table-live"
                  }`}
                >
                  <span
                    className={`a2030-pulse-ring inline-flex h-1.5 w-1.5 rounded-full ${
                      isMorocco ? "bg-[#7ecfc0]" : "bg-[#f5c842]"
                    }`}
                  />
                  All seats full
                </span>
              </div>

              {visibleGroups.map((group) => {
                const roster = groupMembers(members, group);
                if (roster.length === 0) {
                  return null;
                }

                return (
                  <div key={group} className="mt-4">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                        isMorocco ? "marrakech-zellige-sublabel" : "text-[#d4b896]"
                      }`}
                    >
                      {eldersTableLegacyGroups[group].rowLabel}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {roster.map((member) => (
                        <span
                          key={member.id}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                            isMorocco
                              ? group === "morocco-rich-men"
                                ? "marrakech-zellige-chip marrakech-zellige-chip-man"
                                : group === "curvy-elder"
                                  ? "marrakech-zellige-chip marrakech-zellige-chip-black"
                                  : "marrakech-zellige-chip marrakech-zellige-chip-white"
                              : "elders-table-chip"
                          }`}
                        >
                          <span>{member.flag}</span>
                          <span className={isMorocco ? "text-[#f4e4bc]" : "text-white"}>
                            {member.name.split(" ")[0]}
                          </span>
                          <span className={isMorocco ? "text-[#d4af37]" : "text-[#d4b896]"}>· {member.age}</span>
                          <span className={isMorocco ? "text-[#7ecfc0]" : "text-[#f5c842]"}>· {member.role}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>

            <section
              className={`${isMorocco ? "marrakech-zellige-panel" : "elders-table-panel"} mt-6 rounded-[1.75rem] p-4 sm:p-5`}
            >
              <p
                className={`a2030-micro text-[10px] font-bold uppercase sm:text-xs ${
                  isMorocco ? "marrakech-zellige-label-teal" : "text-[#d4b896]"
                }`}
              >
                Background // Ken Burns mosaic behind the table
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {groupOrder
                  .filter((group) => visibleGroups.includes(group))
                  .map((group) => (
                    <li
                      key={group}
                      className={`rounded-xl px-3 py-2.5 text-xs font-semibold leading-6 ${
                        isMorocco
                          ? group === "morocco-rich-men" || group === "gym-men"
                            ? "marrakech-zellige-row marrakech-zellige-row-men"
                            : group === "curvy-elder"
                              ? "marrakech-zellige-row marrakech-zellige-row-black"
                              : "marrakech-zellige-row marrakech-zellige-row-white"
                          : "elders-table-row text-[#eef6ff]"
                      }`}
                    >
                      {eldersTableLegacyGroups[group].rowLabel}
                    </li>
                  ))}
              </ul>
            </section>

            {activePrompt ? (
              <section
                className={`${isMorocco ? "marrakech-zellige-transmission" : "elders-table-transmission"} mt-6 rounded-[1.5rem] p-5 backdrop-blur-md`}
              >
                <p
                  className={`a2030-micro text-[10px] font-bold uppercase sm:text-xs ${
                    isMorocco ? "marrakech-zellige-label-gold" : "text-[#f5c842]"
                  }`}
                >
                  Transmission // your pick
                </p>
                <p className={`mt-2 text-lg font-black ${isMorocco ? "text-[#f4e4bc]" : "text-white"}`}>
                  {activePrompt.label}
                </p>
                <p className={`mt-3 text-sm leading-7 ${isMorocco ? "text-[#d8ece8]" : "text-[#e8dcc8]"}`}>
                  {activePrompt.answer}
                </p>
              </section>
            ) : null}
          </div>
        </div>

        <div
          className={`${isMorocco ? "marrakech-zellige-dock" : "elders-table-dock"} a2030-dock fixed inset-x-0 bottom-16 z-20 sm:bottom-[4.5rem]`}
        >
          {isMorocco ? (
            <div className="marrakech-zellige-dock-line pointer-events-none absolute inset-x-0 top-0 h-1" aria-hidden="true" />
          ) : null}
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p
                  className={`a2030-micro text-[10px] font-bold uppercase sm:text-xs ${
                    isMorocco ? "marrakech-zellige-label-gold" : "text-[#f5c842]"
                  }`}
                >
                  {isMorocco ? "Riad entry // Le Marrakech" : "Men's entry // the elders table"}
                </p>
                <p className={`text-sm ${isMorocco ? "text-[#b8d4cc]" : "text-[#c8b89a]"}`}>
                  Pick a table prompt — elder wisdom replies above
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen((open) => !open)}
                className={`${isMorocco ? "marrakech-zellige-btn" : "elders-table-btn"} a2030-micro rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] sm:text-xs`}
              >
                {panelOpen ? "Hide" : "Show"}
              </button>
            </div>

            {panelOpen ? (
              <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pb-1">
                {eldersTableLegacyPrompts.map((prompt) => {
                  const active = selectedPrompt === prompt.id;

                  return (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => setSelectedPrompt(active ? null : prompt.id)}
                      className={`${isMorocco ? "marrakech-zellige-prompt" : "elders-table-prompt"} a2030-micro w-full rounded-xl px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] sm:text-xs${
                        active ? (isMorocco ? " marrakech-zellige-prompt-active" : " elders-table-prompt-active") : ""
                      }`}
                    >
                      {prompt.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <TheEldersTableVersionPicker current={version} />
      </main>
      <SiteFooter />
    </>
  );
}
