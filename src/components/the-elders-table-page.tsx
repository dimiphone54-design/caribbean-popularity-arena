"use client";

import { useSearchParams } from "next/navigation";
import { EldersTableComingSoonFreeze } from "@/components/elders-table-coming-soon-freeze";
import { EldersTableTokyo2030HeaderLink } from "@/components/elders-table-tokyo2030-header-link";
import { TheEldersRoomLiveWidget } from "@/components/the-elders-room-live-widget";
import { TheEldersTableGamesPanel } from "@/components/the-elders-table-games-panel";
import { TheEldersTableGatherPage } from "@/components/the-elders-table-gather-page";
import { TheEldersTableNoirBackdrop } from "@/components/the-elders-table-noir-backdrop";
import { TheEldersTableNoirPhotoPage } from "@/components/the-elders-table-noir-photo-page";
import { TheEldersTableOptionsRail } from "@/components/the-elders-table-options-rail";
import { TheEldersTableQuestionsPanel } from "@/components/the-elders-table-questions-panel";
import { TheEldersTableVersionPicker } from "@/components/the-elders-table-version-picker";
import { TheEldersTableWorldPage } from "@/components/the-elders-table-world-page";
import {
  eldersTableBlackWomen,
  eldersTableGames,
  eldersTableNoirTagline,
  eldersTableRegionLabels,
  eldersTableSceneLabels,
  eldersTableWomen,
  type EldersTableRegion
} from "@/lib/the-elders-table";
import { getEldersTableVersionConfig, isEldersTableClientView, parseEldersTableVersion, showEldersTableVersionPicker } from "@/lib/the-elders-table-versions";

const regionChipClass: Record<EldersTableRegion, string> = {
  tokyo: "elders-table-noir-region-tokyo",
  "south-africa": "elders-table-noir-region-sa",
  asia: "elders-table-noir-region-asia",
  jamaica: "elders-table-noir-region-jamaica"
};

function TheEldersTableQuartetPage() {
  const searchParams = useSearchParams();
  const version = parseEldersTableVersion(searchParams.get("v"));
  const config = getEldersTableVersionConfig(version);
  const clientView = isEldersTableClientView(version, searchParams);
  const showPicker = showEldersTableVersionPicker(version, searchParams);
  const regions: EldersTableRegion[] = ["tokyo", "south-africa", "asia", "jamaica"];

  const heroClassName = config.useContentPanel
    ? "elders-table-noir-hero elders-table-noir-hero-panel flex flex-col px-5 pb-24 text-left sm:px-8 lg:pb-28 lg:pr-[5.5rem]"
    : config.compactTitle
      ? config.showQuestionsPanel
        ? "elders-table-noir-hero flex flex-1 flex-col px-5 pb-6 pt-[8.5rem] text-left sm:px-8 sm:pt-[9rem] lg:pb-10 lg:pr-4 lg:pt-[9.5rem]"
        : "elders-table-noir-hero elders-table-noir-hero-compact flex flex-col px-5 pb-24 pt-[8.5rem] text-left sm:px-8 sm:pt-[9rem] lg:pb-28 lg:pr-[5.5rem] lg:pt-[9.5rem]"
      : config.showQuestionsPanel
        ? "elders-table-noir-hero flex flex-1 flex-col px-5 pb-6 pt-[11.5rem] text-left sm:px-8 sm:pt-[12.5rem] lg:pb-10 lg:pr-4 lg:pt-[13rem]"
        : "elders-table-noir-hero elders-table-noir-hero-classic flex flex-col px-5 pb-24 pt-[11.5rem] text-left sm:px-8 sm:pt-[12.5rem] lg:pb-28 lg:pr-[5.5rem] lg:pt-[13rem]";

  const content = (
    <>
      <section className="elders-table-noir-scenes-box w-full overflow-visible">
        <ul className="elders-table-noir-scenes flex flex-wrap justify-start gap-2">
          {(Object.keys(eldersTableSceneLabels) as Array<keyof typeof eldersTableSceneLabels>).map((scene) => (
            <li
              key={scene}
              className="elders-table-noir-scene-chip rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px]"
            >
              {eldersTableSceneLabels[scene]}
            </li>
          ))}
        </ul>

        {config.showGamesPanel ? <TheEldersTableGamesPanel config={config} className="mt-3" /> : null}

        {!config.showGamesPanel ? (
          <ul className="elders-table-noir-games mt-3 flex flex-wrap justify-start gap-2">
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
        ) : null}
      </section>

      <section className="elders-table-noir-catalog mt-4 w-full overflow-visible lg:mt-5">
        {regions.map((region) => {
          const group = eldersTableWomen.filter((woman) => woman.region === region);

          return (
            <div key={region} className="mt-4">
              <p
                className={`elders-table-noir-region-label text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] ${regionChipClass[region]}`}
              >
                {eldersTableRegionLabels[region]}
              </p>
              <ul className="elders-table-noir-women mt-2 flex flex-wrap justify-start gap-2">
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

        <ul className="elders-table-noir-women mt-4 flex flex-wrap justify-start gap-2">
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
    </>
  );

  return (
    <main
      className={`elders-table-noir relative min-h-screen overflow-x-hidden${clientView ? " elders-table-noir-client" : ""}`}
      data-elders-version={version}
    >
      <TheEldersTableNoirBackdrop config={config} />
      {config.showOptionsRail ? <TheEldersTableOptionsRail config={config} clientAnchor={clientView} /> : null}
      {showPicker ? <TheEldersTableVersionPicker current={version} /> : null}
      {clientView ? <TheEldersRoomLiveWidget /> : null}

      <header
        className={`elders-table-noir-header pointer-events-none absolute inset-x-0 top-0 z-20 px-5 pt-5 sm:px-8 sm:pt-6${
          clientView ? " elders-table-noir-header-client" : ""
        }`}
      >
        <div className="max-w-2xl text-left lg:max-w-xl">
          <p className="elders-table-noir-brand">{eldersTableNoirTagline}</p>
          <EldersTableTokyo2030HeaderLink compactTitle={config.compactTitle} />
        </div>
      </header>

      <div className={config.showQuestionsPanel ? "relative z-10 flex min-h-screen flex-col lg:flex-row" : "relative z-10 min-h-screen pb-8 sm:pb-10"}>
        <div className={heroClassName}>
          {config.useContentPanel ? (
            <div className="elders-table-noir-content-panel w-full lg:mx-0">{content}</div>
          ) : (
            content
          )}
        </div>
        {config.showQuestionsPanel ? <TheEldersTableQuestionsPanel config={config} /> : null}
      </div>
    </main>
  );
}

export function TheEldersTablePage() {
  const searchParams = useSearchParams();
  const version = parseEldersTableVersion(searchParams.get("v"));
  const config = getEldersTableVersionConfig(version);

  let page: React.ReactNode;
  switch (config.shell) {
    case "gather-classic":
      page = <TheEldersTableGatherPage variant="classic" version={version} />;
      break;
    case "gather-morocco":
      page = <TheEldersTableGatherPage variant="morocco" version={version} />;
      break;
    case "noir-photo":
      page = <TheEldersTableNoirPhotoPage version={version} />;
      break;
    case "world":
      page = <TheEldersTableWorldPage version={version} />;
      break;
    case "quartet":
      page = <TheEldersTableQuartetPage />;
      break;
    default:
      page = <TheEldersTableGatherPage variant="classic" version={version} />;
  }

  return (
    <div className="elders-table-coming-soon-shell">
      {page}
      <EldersTableComingSoonFreeze />
    </div>
  );
}
