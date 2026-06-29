"use client";

import {
  cotswoldsBodyMixFeed,
  cotswoldsBodyMixGirls,
  cotswoldsCaribbeanWomen,
  cotswoldsDroneSnowFeed,
  cotswoldsDroneSnowGirls,
  cotswoldsEliteSnowIndoorFeeds,
  cotswoldsEliteSnowIndoorGirls,
  cotswoldsEveryoneUnifiedFeed,
  cotswoldsGamePairs,
  cotswoldsGamesNightGirls,
  cotswoldsMeetupLine,
  cotswoldsMenActivityPanels,
  cotswoldsMovieFeeds,
  cotswoldsNationalDishCrowdFeed,
  cotswoldsOxfordPartyDronesFeed,
  cotswoldsOxfordPartyMen,
  cotswoldsParkSeasonFeeds,
  cotswoldsParkTrio,
  cotswoldsPartyBoys,
  cotswoldsPromptResponses,
  cotswoldsQuarterSlideSets,
  cotswoldsShoppingGirls,
  cotswoldsSixPhotoSlideshow,
  cotswoldsSnowCardFeeds,
  cotswoldsUniversityMix,
  cotswoldsWhiteGirls,
  type CotswoldsParkMember
} from "@/lib/cotswolds";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

function MemberChips({ members }: { members: CotswoldsParkMember[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {members.map((member) => (
        <span
          key={member.id}
          className="a2030-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#eef6ff] backdrop-blur-sm"
        >
          <span>{member.flag}</span>
          <span>{member.name.split(" ")[0]}</span>
          <span className="text-[#a5b4fc]">· {member.area.split("-")[0].trim()}</span>
          <span className="text-[#b8ff3c]">· {member.game}</span>
        </span>
      ))}
    </div>
  );
}

/** Full UK park archive · Command Center locked room only */
export function UkRoomArchivePanel() {
  return (
    <div className="uk-room-archive-panel space-y-6">
      <section className={UK_ROOM_PANEL}>
        <blockquote className="a2030-micro text-[10px] font-bold uppercase italic text-[#b8ff3c] underline decoration-[#00f5ff]/60 underline-offset-4 sm:text-xs">
          &ldquo;Master photo // everyone aligned&rdquo;
        </blockquote>
        <p className="mt-2 text-sm font-bold text-white">{cotswoldsEveryoneUnifiedFeed.label}</p>
        <p className="mt-2 text-xs leading-6 text-[#9fb4d4]">{cotswoldsEveryoneUnifiedFeed.caption}</p>
      </section>

      <section className={UK_ROOM_PANEL}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff] sm:text-xs">
            🇬🇧 UK park · 4 quarters · fast fade
          </p>
          <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#b8ff3c]" />
        </div>
        <p className="mt-2 text-xs text-[#8fa3c4]">{cotswoldsMeetupLine}</p>
      </section>

      <section className={UK_ROOM_PANEL}>
        <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff]">
          2 Oxford party men // drones · snow in the air
        </p>
        <MemberChips members={cotswoldsOxfordPartyMen} />
        <p className="mt-2 text-xs text-[#9fb4d4]">{cotswoldsOxfordPartyDronesFeed.caption}</p>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#b8ff3c]">
          UK national dish // fish & chips for everybody
        </p>
        <p className="mt-2 text-xs text-[#9fb4d4]">{cotswoldsNationalDishCrowdFeed.caption}</p>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">7 UK girls</p>
        <MemberChips members={cotswoldsWhiteGirls} />

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
          3 Girls // London games night
        </p>
        <MemberChips members={cotswoldsGamesNightGirls} />

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
          3 Park trio // light snow
        </p>
        <MemberChips members={cotswoldsParkTrio} />

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
          3 Beautiful mix // slim · gym · curvy
        </p>
        <MemberChips members={cotswoldsBodyMixGirls} />
        <p className="mt-2 text-xs text-[#9fb4d4]">{cotswoldsBodyMixFeed.caption}</p>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#00f5ff]">
          3 Girls · 19 & 20 // drone snow blast
        </p>
        <MemberChips members={cotswoldsDroneSnowGirls} />
        <p className="mt-2 text-xs text-[#9fb4d4]">{cotswoldsDroneSnowFeed.caption}</p>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#b8ff3c]">
          Quarter slide sets // 3 pages · 4 panels each
        </p>
        <ol className="mt-3 max-h-48 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-[#9fb4d4]">
          {cotswoldsQuarterSlideSets.map((set, setIndex) => (
            <li key={`set-${setIndex}`}>
              <span className="font-bold text-[#b8ff3c]">Set {String(setIndex + 1).padStart(2, "0")}.</span>
              <ul className="mt-1 space-y-0.5 pl-3">
                {set.map((feed, index) => (
                  <li key={`${feed.id}-${index}`}>
                    <span className="text-white">{feed.label}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="a2030-micro mt-4 text-[10px] font-bold uppercase text-[#7a82a8]">
          Archive movie // 16 scenes
        </p>
        <ol className="mt-2 max-h-32 space-y-1 overflow-y-auto rounded-xl border border-white/5 bg-black/15 px-3 py-2 text-[10px] text-[#8fa3c4]">
          {cotswoldsMovieFeeds.map((feed, index) => (
            <li key={`${feed.id}-${index}`}>
              {String(index + 1).padStart(2, "0")}. {feed.label}
            </li>
          ))}
        </ol>

        <p className="a2030-micro mt-4 text-[10px] font-bold uppercase text-[#7a82a8]">
          Core six (safe park set)
        </p>
        <ol className="mt-2 space-y-1 rounded-xl border border-white/5 bg-black/15 px-3 py-2 text-[10px] text-[#8fa3c4]">
          {cotswoldsSixPhotoSlideshow.map((feed, index) => (
            <li key={feed.id}>
              {String(index + 1).padStart(2, "0")}. {feed.label}
            </li>
          ))}
        </ol>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#00f5ff]">
          Real park slideshow // leaves & light snow
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {cotswoldsParkSeasonFeeds.map((feed) => (
            <div
              key={feed.id}
              className="rounded-xl border border-[#00f5ff]/15 bg-black/25 px-3 py-2 text-[11px] text-[#c8d8f0]"
            >
              <span className="font-bold text-white">{feed.label}</span>
              <span className="mt-1 block text-[#9fb4d4]">{feed.caption}</span>
            </div>
          ))}
        </div>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
          3 Girls // shopping in the mix
        </p>
        <MemberChips members={cotswoldsShoppingGirls} />

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
          4 Elite snow indoor // pure blue UK eyes · public games
        </p>
        <MemberChips members={cotswoldsEliteSnowIndoorGirls} />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {cotswoldsEliteSnowIndoorFeeds.map((feed) => (
            <div
              key={feed.id}
              className="rounded-xl border border-[#b8ff3c]/15 bg-black/25 px-3 py-2 text-[11px] text-[#c8d8f0]"
            >
              <span className="font-bold text-white">{feed.label}</span>
              <span className="mt-1 block text-[#9fb4d4]">{feed.caption}</span>
            </div>
          ))}
        </div>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#00f5ff]">5 Caribbean women</p>
        <MemberChips members={cotswoldsCaribbeanWomen} />

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#eef6ff]">
          6 snow backyard // cards in the snow
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {cotswoldsSnowCardFeeds.map((feed) => (
            <div
              key={feed.id}
              className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-[#c8d8f0]"
            >
              <span className="font-bold text-white">{feed.label}</span>
              <span className="mt-1 block text-[#9fb4d4]">{feed.caption}</span>
            </div>
          ))}
        </div>

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#00f5ff]">3 Cotswolds party boys</p>
        <MemberChips members={cotswoldsPartyBoys} />

        <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#b8ff3c]">University mix</p>
        <MemberChips members={cotswoldsUniversityMix} />

        <p className="a2030-micro mt-6 text-[10px] font-bold uppercase text-[#eef6ff]">Games in pairs</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {cotswoldsGamePairs.map((pair) => (
            <div
              key={pair.id}
              className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-[#c8d8f0]"
            >
              <span className="font-bold text-white">
                {pair.playerA} + {pair.playerB}
              </span>
              <span className="text-[#b8ff3c]"> · {pair.game}</span>
              <span className="text-[#7a82a8]"> · Feed 0{pair.feed}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={UK_ROOM_PANEL} aria-label="Men's entry UK games archive">
        <div className="flex items-center gap-2">
          <span className="a2030-uk-flag-flash" aria-hidden="true">
            🇬🇧
          </span>
          <p className="a2030-uk-title-flash a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
            Men&apos;s entry // UK games · archive
          </p>
        </div>
        <div className="cotswolds-men-game-panels mt-3">
          {cotswoldsMenActivityPanels.map((panel) => (
            <article
              key={panel.id}
              className="cotswolds-men-game-panel a2030-prompt rounded-xl px-4 py-3"
            >
              <div className="cotswolds-men-game-panel-head">
                <span className="cotswolds-men-game-panel-emoji" aria-hidden="true">
                  {panel.emoji}
                </span>
                <h3 className="cotswolds-men-game-panel-title">{panel.title}</h3>
              </div>
              <p className="cotswolds-men-game-panel-question">{panel.question}</p>
              <p className="cotswolds-men-game-panel-body">{cotswoldsPromptResponses[panel.id]}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
