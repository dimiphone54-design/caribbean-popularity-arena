"use client";

import { TheEldersTableQuestionsPanel } from "@/components/the-elders-table-questions-panel";
import { TheEldersTableVersionPicker } from "@/components/the-elders-table-version-picker";
import { TheEldersTableWorldSlideshow } from "@/components/the-elders-table-world-slideshow";
import {
  eldersTableBlackWomen,
  eldersTableGames,
  eldersTableNoirBrand,
  eldersTableNoirTagline,
  eldersTableRegionLabels,
  eldersTableSceneLabels,
  eldersTableWomen,
  type EldersTableRegion
} from "@/lib/the-elders-table";
import type { EldersTableVersionId } from "@/lib/the-elders-table-versions";

const regionChipClass: Record<EldersTableRegion, string> = {
  tokyo: "elders-table-noir-region-tokyo",
  "south-africa": "elders-table-noir-region-sa",
  asia: "elders-table-noir-region-asia",
  jamaica: "elders-table-noir-region-jamaica"
};

type TheEldersTableWorldPageProps = {
  version: EldersTableVersionId;
};

export function TheEldersTableWorldPage({ version }: TheEldersTableWorldPageProps) {
  const regions: EldersTableRegion[] = ["tokyo", "south-africa", "asia", "jamaica"];

  return (
    <main className="elders-table-noir relative min-h-screen overflow-hidden pb-24" data-elders-version={version}>
      <div className="elders-table-noir-scene pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <TheEldersTableWorldSlideshow />
        <div className="elders-table-noir-skyline absolute inset-x-0 top-0 h-[28%] opacity-70" />
        <div className="elders-table-noir-glow absolute inset-0" />
      </div>
      <div className="elders-table-noir-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="elders-table-noir-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
      <TheEldersTableVersionPicker current={version} />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <div className="elders-table-noir-hero flex flex-1 flex-col px-5 pb-6 pt-8 sm:px-8 sm:pt-10 lg:pb-10 lg:pr-4">
          <header className="elders-table-noir-header mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="elders-table-noir-brand">{eldersTableNoirTagline}</p>
            <h1 className="elders-table-noir-title">THE ELDERS TABLE</h1>
            <p className="elders-table-noir-subbrand mt-3 text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]">
              {eldersTableNoirBrand}
            </p>
          </header>

          <section className="elders-table-noir-catalog mx-auto mt-5 w-full max-w-2xl lg:mx-0">
            <ul className="elders-table-noir-scenes flex flex-wrap justify-center gap-2 lg:justify-start">
              {(Object.keys(eldersTableSceneLabels) as Array<keyof typeof eldersTableSceneLabels>).map((scene) => (
                <li
                  key={scene}
                  className="elders-table-noir-scene-chip rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px]"
                >
                  {eldersTableSceneLabels[scene]}
                </li>
              ))}
            </ul>

            <ul className="elders-table-noir-games mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {eldersTableGames.map((game) => (
                <li
                  key={game.id}
                  className="elders-table-noir-game-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:text-xs"
                >
                  <span aria-hidden="true">{game.symbol}</span>
                  <span>{game.label}</span>
                </li>
              ))}
            </ul>

            {regions.map((region) => {
              const group = eldersTableWomen.filter((woman) => woman.region === region);

              return (
                <div key={region} className="mt-4">
                  <p
                    className={`elders-table-noir-region-label text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] ${regionChipClass[region]}`}
                  >
                    {eldersTableRegionLabels[region]}
                  </p>
                  <ul className="elders-table-noir-women mt-2 flex flex-wrap justify-center gap-2 lg:justify-start">
                    {group.map((woman) => (
                      <li
                        key={woman.id}
                        className={`elders-table-noir-woman-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:text-xs ${regionChipClass[region]}`}
                      >
                        <span aria-hidden="true">{woman.flag}</span>
                        <span>
                          {woman.name.split(" ")[0]} · {woman.age} · {woman.game}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <ul className="elders-table-noir-women mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {eldersTableBlackWomen.map((woman) => (
                <li
                  key={woman.id}
                  className="elders-table-noir-woman-chip elders-table-noir-gold-table inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold sm:text-xs"
                >
                  <span aria-hidden="true">✨</span>
                  <span>
                    {woman.name.split(" ")[0]} · {woman.age} · gold table · {woman.game}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <TheEldersTableQuestionsPanel items="all" />
      </div>
    </main>
  );
}
