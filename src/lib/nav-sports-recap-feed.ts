import type { NavLiveSportEvent, NavLiveSportsFeed } from "@/lib/api-sports-nav-feed";
import { buildUpcomingSportLines, fetchNavLiveSportsFeed } from "@/lib/api-sports-nav-feed";
import type { ApiSportsNavSportId } from "@/lib/api-sports-sport-meta";
import { fetchApiSportsFootballFixtures, getApiSportsFootballKey } from "@/lib/api-sports-football";
import { isFootballApiOnCooldown } from "@/lib/api-sports-rate-limit";
import type { FootballMatch } from "@/lib/football-prediction-arena";
import {
  cleanBasketballDisplayTitle,
  cleanF1DisplayTitle,
  cleanFootballDisplayTitle,
  discoverLatestBasketballHighlights,
  discoverLatestF1Highlights,
  discoverLatestFootballHighlights,
  findF1HighlightVideo,
  findFootballPitchHighlightVideo,
  cleanGenericSportDisplayTitle,
  discoverSportHighlights,
  findSportsHighlightVideo,
  isQualityBasketballVideoTitle,
  isQualityF1VideoTitle,
  isQualityFootballVideoTitle,
  isQualityHandballVideoTitle,
  isQualityMmaVideoTitle
} from "@/lib/sports-highlight-youtube";

export type NavSportsRecapSportFilter = "all" | "basketball" | ApiSportsNavSportId;
export type NavSportsRecapMode = "default" | "highlights" | "pitch-slideshow";

const BASKETBALL_SPORTS = new Set<ApiSportsNavSportId>(["basketball", "nba"]);
const BASKETBALL_HIGHLIGHTS_MAX = 6;
const FOOTBALL_HIGHLIGHTS_MAX = 6;
const FOOTBALL_TODAY_PITCH_MAX = 12;

const CURATED_FOOTBALL_PITCH_CLIPS: NavSportsRecapClip[] = [
  {
    id: "football-curated-eng-congo",
    bucket: "today",
    status: "recap",
    title: "England vs Congo DR",
    scoreline: "2-1",
    meta: "Final · FIFA World Cup",
    sport: "football",
    youtubeId: "T6MYUQgpCv8",
    recapLine: "Highlights | England 2-1 Congo DR | FIFA World Cup"
  },
  {
    id: "football-curated-che-mci",
    bucket: "today",
    status: "recap",
    title: "Chelsea vs Manchester City",
    scoreline: "0-1",
    meta: "Final · Emirates FA Cup",
    sport: "football",
    youtubeId: "vdwBG5mWFcs",
    recapLine: "Chelsea 0-1 Man City | HIGHLIGHTS - Extended | FA Cup 2025/26"
  }
];

const CURATED_BASKETBALL_RECAP_CLIPS: NavSportsRecapClip[] = [
  {
    id: "basketball-curated-lal-sas",
    bucket: "today",
    status: "recap",
    title: "Lakers vs Spurs",
    scoreline: "FT",
    meta: "Final · NBA Summer League",
    sport: "basketball",
    youtubeId: "qUidn1IJjF4",
    recapLine: "Lakers vs Spurs | Lakers Highlights | NBA Summer League"
  },
  {
    id: "basketball-curated-nbl-warwick",
    bucket: "today",
    status: "recap",
    title: "Warwick vs SW Slammers",
    scoreline: "FT",
    meta: "Final · NBL1",
    sport: "basketball",
    youtubeId: "W_tY4Z0D4Qw",
    recapLine: "NBL1 Men | Warwick vs. SW Slammers - Game Highlights"
  }
];

const CURATED_F1_RECAP_CLIPS: NavSportsRecapClip[] = [
  {
    id: "f1-curated-abu-dhabi",
    bucket: "today",
    status: "recap",
    title: "Abu Dhabi Grand Prix",
    scoreline: "Race",
    meta: "Final · Yas Marina · 2024",
    sport: "formula-1",
    youtubeId: "7QJ-N-AQJYc",
    recapLine: "Abu Dhabi Grand Prix · Yas Marina Circuit · Race highlights"
  },
  {
    id: "f1-curated-qatar",
    bucket: "today",
    status: "recap",
    title: "Qatar Grand Prix",
    scoreline: "Race",
    meta: "Final · Losail · 2024",
    sport: "formula-1",
    youtubeId: "BeaVJggQ2dc",
    recapLine: "Qatar Grand Prix · Losail International Circuit · Race highlights"
  },
  {
    id: "f1-curated-las-vegas",
    bucket: "today",
    status: "recap",
    title: "Las Vegas Grand Prix",
    scoreline: "Race",
    meta: "Final · Las Vegas · 2024",
    sport: "formula-1",
    youtubeId: "uQc-pW3QLuI",
    recapLine: "Las Vegas Grand Prix · Las Vegas Strip Circuit · Race highlights"
  }
];

const F1_HIGHLIGHTS_MAX = 6;
const F1_API_SEASON = 2024;
const SPORT_HIGHLIGHTS_MAX = 6;

const CURATED_HANDBALL_RECAP_CLIPS: NavSportsRecapClip[] = [
  {
    id: "handball-curated-barca-psg",
    bucket: "today",
    status: "recap",
    title: "Barça vs Paris Saint-Germain",
    scoreline: "FT",
    meta: "Final · EHF Champions League",
    sport: "handball",
    youtubeId: "8noap_2K3VI",
    recapLine: "Barça vs Paris Saint-Germain Handball | EHF Champions League"
  },
  {
    id: "handball-curated-den-fra",
    bucket: "today",
    status: "recap",
    title: "Denmark vs France",
    scoreline: "FT",
    meta: "Final · Olympic handball",
    sport: "handball",
    youtubeId: "7x0xwegHBG8",
    recapLine: "Denmark v France - Full Handball Final - Rio 2016"
  }
];

const CURATED_MMA_RECAP_CLIPS: NavSportsRecapClip[] = [
  {
    id: "mma-curated-ufc302",
    bucket: "today",
    status: "recap",
    title: "Islam Makhachev vs Dustin Poirier",
    scoreline: "FT",
    meta: "Final · UFC 302",
    sport: "mma",
    youtubeId: "1xNOytcH2ho",
    recapLine: "UFC 302: Islam Makhachev vs Dustin Poirier Highlights"
  },
  {
    id: "mma-curated-ufc300",
    bucket: "today",
    status: "recap",
    title: "Alex Pereira vs Jamahal Hill",
    scoreline: "FT",
    meta: "Final · UFC 300",
    sport: "mma",
    youtubeId: "LYWxhzFbpgA",
    recapLine: "Alex Pereira vs Jamahal Hill fight highlights, Ufc300"
  },
  {
    id: "mma-curated-ufc262",
    bucket: "today",
    status: "recap",
    title: "Charles Oliveira vs Michael Chandler",
    scoreline: "FT",
    meta: "Final · UFC 262",
    sport: "mma",
    youtubeId: "F1TFl-poHy8",
    recapLine: "UFC 262: Charles Oliveira VS Michael Chandler (Full Highlights)"
  },
  {
    id: "mma-curated-ufc305",
    bucket: "today",
    status: "recap",
    title: "Dricus Du Plessis vs Israel Adesanya",
    scoreline: "FT",
    meta: "Final · UFC 305",
    sport: "mma",
    youtubeId: "IRIwozQnjTg",
    recapLine: "FULL FIGHT REPLAY! Dricus Du Plessis vs Israel Adesanya UFC 305"
  }
];

const GENERIC_SPORT_HIGHLIGHTS = new Set<ApiSportsNavSportId>([
  "volleyball",
  "nba",
  "baseball",
  "hockey",
  "rugby",
  "nfl",
  "afl"
]);

export type NavSportsRecapClip = {
  id: string;
  bucket: "today" | "tomorrow";
  status: "recap" | "upcoming";
  title: string;
  scoreline: string;
  meta: string;
  sport: string;
  kickoff?: string;
  homeLogo?: string;
  awayLogo?: string;
  youtubeId?: string;
  recapLine: string;
};

export type NavSportsRecapFeed = {
  fetchedAt: string;
  windowLabel: string;
  today: NavSportsRecapClip[];
  tomorrow: NavSportsRecapClip[];
  all: NavSportsRecapClip[];
};

function startOfLocalDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isSameLocalDay(iso: string | undefined, day: Date) {
  if (!iso) return false;
  const kickoff = new Date(iso);
  return startOfLocalDay(kickoff).getTime() === startOfLocalDay(day).getTime();
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
}

function recapLineFor(event: NavLiveSportEvent) {
  if (event.bucket === "upcoming") {
    return `${event.title} · ${event.meta}`;
  }
  return `${event.title} · ${event.scoreline} · ${event.meta}`;
}

function mapEventToClip(event: NavLiveSportEvent, bucket: "today" | "tomorrow"): NavSportsRecapClip {
  return {
    id: event.id,
    bucket,
    status: bucket === "today" ? "recap" : "upcoming",
    title: event.title,
    scoreline: event.scoreline,
    meta: event.meta,
    sport: event.sport,
    kickoff: event.kickoff,
    homeLogo: event.homeLogo,
    awayLogo: event.awayLogo,
    recapLine: recapLineFor(event)
  };
}

function matchesSportFilter(event: NavLiveSportEvent, sportFilter: NavSportsRecapSportFilter) {
  if (sportFilter === "all") return true;
  if (sportFilter === "basketball") return BASKETBALL_SPORTS.has(event.sport);
  return event.sport === sportFilter;
}

function sportFilterLabel(sportFilter: NavSportsRecapSportFilter) {
  if (sportFilter === "all") return "";
  if (sportFilter === "basketball") return " · Basketball";
  return ` · ${sportFilter}`;
}

function pickTodayRecaps(
  feed: NavLiveSportsFeed,
  now = new Date(),
  sportFilter: NavSportsRecapSportFilter = "all"
) {
  return feed.recent
    .filter((event) => isSameLocalDay(event.kickoff, now))
    .filter((event) => matchesSportFilter(event, sportFilter))
    .sort((a, b) => new Date(b.kickoff ?? 0).getTime() - new Date(a.kickoff ?? 0).getTime())
    .slice(0, 8)
    .map((event) => mapEventToClip(event, "today"));
}

function pickLastGamesForSport(
  feed: NavLiveSportsFeed,
  now: Date,
  sportMatcher: (event: NavLiveSportEvent) => boolean
) {
  const today = startOfLocalDay(now);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return feed.recent
    .filter(sportMatcher)
    .filter((event) => {
      if (!event.kickoff) return false;
      const kickoffDay = startOfLocalDay(new Date(event.kickoff));
      return kickoffDay.getTime() === today.getTime() || kickoffDay.getTime() === yesterday.getTime();
    })
    .sort((a, b) => new Date(b.kickoff ?? 0).getTime() - new Date(a.kickoff ?? 0).getTime())
    .slice(0, 10)
    .map((event) => mapEventToClip(event, "today"));
}

function pickLastBasketballGames(feed: NavLiveSportsFeed, now = new Date()) {
  return pickLastGamesForSport(feed, now, (event) => BASKETBALL_SPORTS.has(event.sport));
}

function pickLastFootballGames(feed: NavLiveSportsFeed, now = new Date()) {
  return pickLastGamesForSport(feed, now, (event) => event.sport === "football");
}

function pickRecentF1RacesFromFeed(feed: NavLiveSportsFeed, now = new Date()) {
  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - 8);

  return feed.recent
    .filter((event) => event.sport === "formula-1")
    .filter((event) => {
      if (!event.kickoff) return true;
      return new Date(event.kickoff).getTime() >= cutoff.getTime();
    })
    .sort((a, b) => new Date(b.kickoff ?? 0).getTime() - new Date(a.kickoff ?? 0).getTime())
    .slice(0, F1_HIGHLIGHTS_MAX)
    .map((event) => mapEventToClip(event, "today"));
}

type F1ApiRace = {
  id: number;
  date: string;
  time: string;
  type: string;
  competition: { name: string };
  circuit: { name: string; country: string };
  season: number;
};

async function fetchF1RacesFromApi() {
  const apiKey = getApiSportsFootballKey();
  if (!apiKey) return [] as NavSportsRecapClip[];

  const res = await fetch(
    `https://v1.formula-1.api-sports.io/races?season=${F1_API_SEASON}`,
    { headers: { "x-apisports-key": apiKey }, cache: "no-store" }
  );
  if (!res.ok) return [];

  const json = (await res.json()) as { response?: F1ApiRace[] };
  const races = json.response ?? [];
  const seen = new Set<string>();

  return races
    .filter((race) => race.type?.toLowerCase() === "race")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((race) => {
      const key = race.competition.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, F1_HIGHLIGHTS_MAX)
    .map((race) => {
      const title = `${race.competition.name} · ${race.circuit.name}`;
      return {
        id: `formula-1-${race.id}`,
        bucket: "today" as const,
        status: "recap" as const,
        title,
        scoreline: "Race",
        meta: `Final · ${race.circuit.name} · ${race.season}`,
        sport: "formula-1",
        kickoff: `${race.date}T${(race.time || "00:00:00").replace(/\+.*/, "")}`,
        recapLine: `${race.competition.name} · Race · ${race.circuit.name}`
      };
    });
}

function isDisplayableF1Clip(clip: NavSportsRecapClip) {
  const title = cleanF1DisplayTitle(clip.title);
  return /grand prix/i.test(title) && title !== "Grand Prix recap";
}

function polishF1Clip(clip: NavSportsRecapClip): NavSportsRecapClip {
  return {
    ...clip,
    title: cleanF1DisplayTitle(clip.title),
    meta: clip.meta.replace(/undefined/g, "").replace(/\s+·\s+·/g, " · ").trim(),
    recapLine: clip.recapLine ? cleanF1DisplayTitle(clip.recapLine) : clip.recapLine
  };
}

async function attachF1HighlightVideos(clips: NavSportsRecapClip[]) {
  const settled = await Promise.allSettled(
    clips.map(async (clip) => {
      if (clip.youtubeId) return polishF1Clip(clip);
      const youtubeId = await findF1HighlightVideo({ title: clip.title, meta: clip.meta });
      if (!youtubeId) return null;
      return polishF1Clip({ ...clip, youtubeId });
    })
  );

  return settled
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((clip): clip is NavSportsRecapClip => Boolean(clip?.youtubeId));
}

function youtubeF1ToClip(highlight: Awaited<ReturnType<typeof discoverLatestF1Highlights>>[number]) {
  return {
    id: `formula-1-yt-${highlight.youtubeId}`,
    bucket: "today" as const,
    status: "recap" as const,
    title: highlight.matchTitle,
    scoreline: highlight.scoreline,
    meta: highlight.meta,
    sport: "formula-1",
    kickoff: new Date().toISOString(),
    youtubeId: highlight.youtubeId,
    recapLine: highlight.videoTitle
  };
}

function youtubeClipFromHighlight(
  highlight: Awaited<ReturnType<typeof discoverLatestF1Highlights>>[number],
  sport: string
): NavSportsRecapClip {
  return {
    id: `${sport}-yt-${highlight.youtubeId}`,
    bucket: "today",
    status: "recap",
    title: highlight.matchTitle,
    scoreline: highlight.scoreline,
    meta: highlight.meta,
    sport,
    kickoff: new Date().toISOString(),
    youtubeId: highlight.youtubeId,
    recapLine: highlight.videoTitle
  };
}

function pickTodayFootballOnly(feed: NavLiveSportsFeed, now = new Date()) {
  return feed.recent
    .filter((event) => event.sport === "football")
    .filter((event) => isSameLocalDay(event.kickoff, now))
    .sort((a, b) => new Date(b.kickoff ?? 0).getTime() - new Date(a.kickoff ?? 0).getTime())
    .slice(0, FOOTBALL_TODAY_PITCH_MAX)
    .map((event) => mapEventToClip(event, "today"));
}

function footballMatchToClip(match: FootballMatch): NavSportsRecapClip {
  const homeScore = match.homeScore ?? 0;
  const awayScore = match.awayScore ?? 0;
  const title = `${match.homeTeam} vs ${match.awayTeam}`;

  return {
    id: match.id,
    bucket: "today",
    status: "recap",
    title,
    scoreline: `${homeScore}-${awayScore}`,
    meta: `Final · ${match.competitionLabel}`,
    sport: "football",
    kickoff: match.kickoff,
    homeLogo: match.homeCrestUrl,
    awayLogo: match.awayCrestUrl,
    recapLine: `${title} · ${homeScore}-${awayScore} · ${match.competitionLabel}`
  };
}

async function pickFootballFromDirectApi(now = new Date(), todayOnly = false) {
  const matches = await fetchApiSportsFootballFixtures();
  const today = startOfLocalDay(now);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return matches
    .filter((match) => match.status === "finished")
    .filter((match) => {
      const kickoffDay = startOfLocalDay(new Date(match.kickoff));
      if (todayOnly) return kickoffDay.getTime() === today.getTime();
      return kickoffDay.getTime() === today.getTime() || kickoffDay.getTime() === yesterday.getTime();
    })
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime())
    .slice(0, todayOnly ? FOOTBALL_TODAY_PITCH_MAX : 10)
    .map(footballMatchToClip);
}

function isDisplayableFootballClip(clip: NavSportsRecapClip) {
  const title = cleanFootballDisplayTitle(clip.title);
  return /\bvs\b/i.test(title) && title !== "Football highlights";
}

function isDisplayableBasketballClip(clip: NavSportsRecapClip) {
  const title = cleanBasketballDisplayTitle(clip.title);
  return /\bvs\b/i.test(title) && title !== "Basketball highlights";
}

function polishBasketballClip(clip: NavSportsRecapClip): NavSportsRecapClip {
  return {
    ...clip,
    title: cleanBasketballDisplayTitle(clip.title),
    recapLine: clip.recapLine ? cleanBasketballDisplayTitle(clip.recapLine) : clip.recapLine
  };
}

function polishFootballClip(clip: NavSportsRecapClip): NavSportsRecapClip {
  return {
    ...clip,
    title: cleanFootballDisplayTitle(clip.title),
    recapLine: clip.recapLine ? cleanFootballDisplayTitle(clip.recapLine) : clip.recapLine
  };
}

async function attachPitchHighlightVideos(clips: NavSportsRecapClip[]) {
  const settled = await Promise.allSettled(
    clips.map(async (clip) => {
      if (clip.youtubeId) return polishFootballClip(clip);
      const youtubeId = await findFootballPitchHighlightVideo({
        title: clip.title,
        meta: clip.meta
      });
      if (!youtubeId) return null;
      return polishFootballClip({ ...clip, youtubeId });
    })
  );

  return settled
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((clip): clip is NavSportsRecapClip => Boolean(clip?.youtubeId));
}

function youtubeBasketballToClip(
  highlight: Awaited<ReturnType<typeof discoverLatestBasketballHighlights>>[number]
) {
  return {
    id: `basketball-yt-${highlight.youtubeId}`,
    bucket: "today" as const,
    status: "recap" as const,
    title: highlight.matchTitle,
    scoreline: highlight.scoreline,
    meta: highlight.meta,
    sport: "basketball",
    kickoff: new Date().toISOString(),
    youtubeId: highlight.youtubeId,
    recapLine: highlight.videoTitle
  };
}

async function attachBasketballHighlightVideos(clips: NavSportsRecapClip[]) {
  const settled = await Promise.allSettled(
    clips.map(async (clip) => {
      if (clip.youtubeId) return polishBasketballClip(clip);
      const youtubeId = await findSportsHighlightVideo({
        title: clip.title,
        sport: "basketball",
        meta: clip.meta,
        status: "recap"
      });
      if (!youtubeId) return null;
      return polishBasketballClip({ ...clip, youtubeId });
    })
  );

  return settled
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((clip): clip is NavSportsRecapClip => Boolean(clip?.youtubeId));
}

function youtubeFootballToClip(highlight: Awaited<ReturnType<typeof discoverLatestFootballHighlights>>[number]) {
  return {
    id: `football-yt-${highlight.youtubeId}`,
    bucket: "today" as const,
    status: "recap" as const,
    title: highlight.matchTitle,
    scoreline: highlight.scoreline,
    meta: highlight.meta,
    sport: "football",
    kickoff: new Date().toISOString(),
    youtubeId: highlight.youtubeId,
    recapLine: highlight.videoTitle
  };
}

function pickTomorrowUpcoming(
  feed: NavLiveSportsFeed,
  now = new Date(),
  sportFilter: NavSportsRecapSportFilter = "all"
) {
  const tomorrow = new Date(startOfLocalDay(now));
  tomorrow.setDate(tomorrow.getDate() + 1);

  return feed.upcoming
    .filter((event) => isSameLocalDay(event.kickoff, tomorrow))
    .filter((event) => matchesSportFilter(event, sportFilter))
    .sort((a, b) => new Date(a.kickoff ?? 0).getTime() - new Date(b.kickoff ?? 0).getTime())
    .slice(0, 8)
    .map((event) => mapEventToClip(event, "tomorrow"));
}

async function attachHighlightVideos(clips: NavSportsRecapClip[]) {
  const settled = await Promise.allSettled(
    clips.map(async (clip) => {
      const youtubeId = await findSportsHighlightVideo({
        title: clip.title,
        sport: clip.sport,
        meta: clip.meta,
        status: clip.status
      });
      return youtubeId ? { ...clip, youtubeId } : clip;
    })
  );

  return settled.map((result, index) =>
    result.status === "fulfilled" ? result.value : clips[index]
  );
}

const recapFeedCache = new Map<string, { at: number; feed: NavSportsRecapFeed }>();
const RECAP_FEED_CACHE_MS = 10 * 60 * 1000;

function cacheRecapFeed(key: string, feed: NavSportsRecapFeed) {
  if (feed.all.length) recapFeedCache.set(key, { at: Date.now(), feed });
}

function polishGenericSportClip(clip: NavSportsRecapClip): NavSportsRecapClip {
  return {
    ...clip,
    title: cleanGenericSportDisplayTitle(clip.title),
    recapLine: clip.recapLine ? cleanGenericSportDisplayTitle(clip.recapLine) : clip.recapLine
  };
}

function isDisplayableGenericSportClip(clip: NavSportsRecapClip) {
  const title = cleanGenericSportDisplayTitle(clip.title);
  return /\bvs\b/i.test(title) && title !== "Game highlights";
}

function isDisplayableMmaClip(clip: NavSportsRecapClip) {
  if (clip.sport !== "mma") return false;
  const blob = `${clip.title} ${clip.recapLine ?? ""} ${clip.meta}`;
  if (!isQualityMmaVideoTitle(blob)) return false;
  const title = cleanGenericSportDisplayTitle(clip.title);
  return /\bvs\b/i.test(title) || /\b(ufc|mma|bellator|pfl)\b/i.test(title);
}

function polishMmaClip(clip: NavSportsRecapClip): NavSportsRecapClip {
  return {
    ...clip,
    sport: "mma",
    title: cleanGenericSportDisplayTitle(clip.title),
    recapLine: clip.recapLine ? cleanGenericSportDisplayTitle(clip.recapLine) : clip.recapLine,
    meta: clip.meta.replace(/Football highlights/i, "MMA highlights")
  };
}

async function attachMmaHighlightVideos(clips: NavSportsRecapClip[]) {
  const settled = await Promise.allSettled(
    clips.map(async (clip) => {
      const youtubeId =
        clip.youtubeId ??
        (await findSportsHighlightVideo({
          title: clip.title,
          sport: "mma",
          meta: clip.meta,
          status: "recap"
        }));
      if (!youtubeId) return null;
      const polished = polishMmaClip({ ...clip, youtubeId, sport: "mma" });
      const blob = `${polished.title} ${polished.recapLine ?? ""} ${polished.meta}`;
      if (!isDisplayableMmaClip(polished) && !isQualityMmaVideoTitle(blob)) return null;
      return polished;
    })
  );

  return settled
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((clip): clip is NavSportsRecapClip => Boolean(clip?.youtubeId && clip.sport === "mma"));
}

function isDisplayableHandballClip(clip: NavSportsRecapClip) {
  if (clip.sport !== "handball") return false;
  const blob = `${clip.title} ${clip.recapLine ?? ""} ${clip.meta}`;
  if (!isQualityHandballVideoTitle(blob) && !/\bhandball\b/i.test(blob)) return false;
  const title = cleanGenericSportDisplayTitle(clip.title);
  return /\bvs\b/i.test(title) || /\bhandball\b/i.test(title);
}

function polishHandballClip(clip: NavSportsRecapClip): NavSportsRecapClip {
  return {
    ...clip,
    sport: "handball",
    title: cleanGenericSportDisplayTitle(clip.title),
    recapLine: clip.recapLine ? cleanGenericSportDisplayTitle(clip.recapLine) : clip.recapLine,
    meta: clip.meta.replace(/Football highlights/i, "Handball highlights")
  };
}

async function attachHandballHighlightVideos(clips: NavSportsRecapClip[]) {
  const settled = await Promise.allSettled(
    clips.map(async (clip) => {
      const youtubeId =
        clip.youtubeId ??
        (await findSportsHighlightVideo({
          title: clip.title,
          sport: "handball",
          meta: clip.meta,
          status: "recap"
        }));
      if (!youtubeId) return null;
      const polished = polishHandballClip({ ...clip, youtubeId, sport: "handball" });
      const blob = `${polished.title} ${polished.recapLine ?? ""} ${polished.meta}`;
      if (!isDisplayableHandballClip(polished) && !isQualityHandballVideoTitle(blob)) return null;
      return polished;
    })
  );

  return settled
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((clip): clip is NavSportsRecapClip => Boolean(clip?.youtubeId && clip.sport === "handball"));
}

function youtubeGenericSportToClip(
  sport: ApiSportsNavSportId,
  highlight: Awaited<ReturnType<typeof discoverSportHighlights>>[number]
) {
  return {
    id: `${sport}-yt-${highlight.youtubeId}`,
    bucket: "today" as const,
    status: "recap" as const,
    title: highlight.matchTitle,
    scoreline: highlight.scoreline,
    meta: highlight.meta,
    sport,
    kickoff: new Date().toISOString(),
    youtubeId: highlight.youtubeId,
    recapLine: highlight.videoTitle
  };
}

export async function buildNavSportsRecapFeed(
  now = new Date(),
  sportFilter: NavSportsRecapSportFilter = "all",
  mode: NavSportsRecapMode = "default"
): Promise<NavSportsRecapFeed> {
  const cacheKey = `${sportFilter}:${mode}`;
  const cached = recapFeedCache.get(cacheKey);
  if (cached && Date.now() - cached.at < RECAP_FEED_CACHE_MS) {
    return cached.feed;
  }

  const liveFeed = await Promise.race([
    fetchNavLiveSportsFeed(),
    new Promise<Awaited<ReturnType<typeof fetchNavLiveSportsFeed>>>((resolve) => {
      setTimeout(
        () =>
          resolve({
            fetchedAt: new Date().toISOString(),
            cacheSeconds: 0,
            requestsUsed: 0,
            sportsWired: [],
            liveCount: 0,
            recentCount: 0,
            upcomingCount: 0,
            events: [],
            live: [],
            recent: [],
            upcoming: [],
            upcomingBySport: buildUpcomingSportLines([])
          }),
        5000
      );
    })
  ]);

  if (sportFilter === "formula-1" && mode === "highlights") {
    let f1Races = pickRecentF1RacesFromFeed(liveFeed, now);

    if (!f1Races.length) {
      f1Races = await fetchF1RacesFromApi();
    }

    const recapClips: NavSportsRecapClip[] = [];
    const seenIds = new Set<string>();
    const seenRaces = new Set<string>();

    const pushClip = (clip: NavSportsRecapClip | null) => {
      if (!clip?.youtubeId || seenIds.has(clip.youtubeId)) return;
      const polished = polishF1Clip(clip);
      if (!isDisplayableF1Clip(polished)) return;
      const raceKey = cleanF1DisplayTitle(polished.title).toLowerCase();
      if (seenRaces.has(raceKey)) return;
      seenIds.add(clip.youtubeId);
      seenRaces.add(raceKey);
      recapClips.push(polished);
    };

    for (const curated of CURATED_F1_RECAP_CLIPS) {
      pushClip(curated);
    }

    if (f1Races.length) {
      for (const clip of await attachF1HighlightVideos(f1Races)) pushClip(clip);
    }

    if (recapClips.length < 4) {
      const youtubeHighlights = await discoverLatestF1Highlights(F1_HIGHLIGHTS_MAX);
      for (const highlight of youtubeHighlights) {
        if (!isQualityF1VideoTitle(highlight.videoTitle)) continue;
        pushClip(youtubeF1ToClip(highlight));
      }
    }

    const dayLabel = formatDayLabel(now);

    const feed = {
      fetchedAt: new Date().toISOString(),
      windowLabel: `${dayLabel} · recent grand prix`,
      today: recapClips.slice(0, F1_HIGHLIGHTS_MAX),
      tomorrow: [],
      all: recapClips.slice(0, F1_HIGHLIGHTS_MAX)
    };
    cacheRecapFeed(cacheKey, feed);
    return feed;
  }

  if (sportFilter === "basketball" && mode === "highlights") {
    const lastGames = pickLastBasketballGames(liveFeed, now);
    const recapClips: NavSportsRecapClip[] = [];
    const seenIds = new Set<string>();

    const pushClip = (clip: NavSportsRecapClip | null) => {
      if (!clip?.youtubeId || seenIds.has(clip.youtubeId)) return;
      const polished = polishBasketballClip(clip);
      if (!isDisplayableBasketballClip(polished)) return;
      seenIds.add(clip.youtubeId);
      recapClips.push(polished);
    };

    for (const curated of CURATED_BASKETBALL_RECAP_CLIPS) {
      pushClip(curated);
    }

    if (lastGames.length) {
      for (const clip of await attachBasketballHighlightVideos(lastGames)) pushClip(clip);
    }

    if (recapClips.length < 4) {
      const youtubeHighlights = await discoverLatestBasketballHighlights(BASKETBALL_HIGHLIGHTS_MAX);
      for (const highlight of youtubeHighlights) {
        if (!isQualityBasketballVideoTitle(highlight.videoTitle)) continue;
        pushClip(youtubeBasketballToClip(highlight));
      }
    }

    const dayLabel = formatDayLabel(now);

    const feed = {
      fetchedAt: new Date().toISOString(),
      windowLabel: `${dayLabel} · recent games`,
      today: recapClips.slice(0, BASKETBALL_HIGHLIGHTS_MAX),
      tomorrow: [],
      all: recapClips.slice(0, BASKETBALL_HIGHLIGHTS_MAX)
    };
    cacheRecapFeed(cacheKey, feed);
    return feed;
  }

  if (sportFilter === "football" && mode === "pitch-slideshow") {
    let todayGames = pickTodayFootballOnly(liveFeed, now);

    if (!todayGames.length && !isFootballApiOnCooldown()) {
      todayGames = await pickFootballFromDirectApi(now, true);
    }

    const pitchClips: NavSportsRecapClip[] = [];
    const seenIds = new Set<string>();

    const pushClip = (clip: NavSportsRecapClip | null) => {
      if (!clip?.youtubeId || seenIds.has(clip.youtubeId)) return;
      const polished = polishFootballClip(clip);
      if (!isDisplayableFootballClip(polished)) return;
      seenIds.add(clip.youtubeId);
      pitchClips.push(polished);
    };

    for (const curated of CURATED_FOOTBALL_PITCH_CLIPS) {
      pushClip(curated);
    }

    if (todayGames.length) {
      for (const clip of await attachPitchHighlightVideos(todayGames)) pushClip(clip);
    }

    if (pitchClips.length < 4) {
      const youtubeHighlights = await discoverLatestFootballHighlights(FOOTBALL_TODAY_PITCH_MAX);
      for (const highlight of youtubeHighlights) {
        if (!isQualityFootballVideoTitle(highlight.videoTitle)) continue;
        pushClip(youtubeFootballToClip(highlight));
      }
    }

    const dayLabel = formatDayLabel(now);

    const feed = {
      fetchedAt: new Date().toISOString(),
      windowLabel: `${dayLabel} · pitch recaps`,
      today: pitchClips.slice(0, FOOTBALL_TODAY_PITCH_MAX),
      tomorrow: [],
      all: pitchClips.slice(0, FOOTBALL_TODAY_PITCH_MAX)
    };
    cacheRecapFeed(cacheKey, feed);
    return feed;
  }

  if (sportFilter === "handball" && mode === "highlights") {
    const lastGames = pickLastGamesForSport(liveFeed, now, (event) => event.sport === "handball");
    const recapClips: NavSportsRecapClip[] = [];
    const seenIds = new Set<string>();

    const pushClip = (clip: NavSportsRecapClip | null) => {
      if (!clip?.youtubeId || seenIds.has(clip.youtubeId)) return;
      const polished = polishHandballClip(clip);
      if (!isDisplayableHandballClip(polished)) return;
      seenIds.add(clip.youtubeId);
      recapClips.push(polished);
    };

    for (const curated of CURATED_HANDBALL_RECAP_CLIPS) {
      pushClip(curated);
    }

    if (lastGames.length) {
      for (const clip of await attachHandballHighlightVideos(lastGames)) pushClip(clip);
    }

    if (recapClips.length < 3) {
      const youtubeHighlights = await discoverSportHighlights("handball", SPORT_HIGHLIGHTS_MAX);
      for (const highlight of youtubeHighlights) {
        if (!isQualityHandballVideoTitle(highlight.videoTitle)) continue;
        pushClip(youtubeGenericSportToClip("handball", highlight));
      }
    }

    const dayLabel = formatDayLabel(now);
    const feed = {
      fetchedAt: new Date().toISOString(),
      windowLabel: `${dayLabel} · handball recaps`,
      today: recapClips.slice(0, SPORT_HIGHLIGHTS_MAX),
      tomorrow: [],
      all: recapClips.slice(0, SPORT_HIGHLIGHTS_MAX)
    };
    cacheRecapFeed(cacheKey, feed);
    return feed;
  }

  if (sportFilter === "mma" && mode === "highlights") {
    const lastGames = pickLastGamesForSport(liveFeed, now, (event) => event.sport === "mma");
    const recapClips: NavSportsRecapClip[] = [];
    const seenIds = new Set<string>();

    const pushClip = (clip: NavSportsRecapClip | null) => {
      if (!clip?.youtubeId || seenIds.has(clip.youtubeId)) return;
      const polished = polishMmaClip(clip);
      if (!isDisplayableMmaClip(polished)) return;
      seenIds.add(clip.youtubeId);
      recapClips.push(polished);
    };

    for (const curated of CURATED_MMA_RECAP_CLIPS) {
      pushClip(curated);
    }

    if (lastGames.length) {
      for (const clip of await attachMmaHighlightVideos(lastGames)) pushClip(clip);
    }

    if (recapClips.length < SPORT_HIGHLIGHTS_MAX) {
      const youtubeHighlights = await discoverSportHighlights("mma", SPORT_HIGHLIGHTS_MAX);
      for (const highlight of youtubeHighlights) {
        if (!isQualityMmaVideoTitle(highlight.videoTitle)) continue;
        pushClip(youtubeGenericSportToClip("mma", highlight));
        if (recapClips.length >= SPORT_HIGHLIGHTS_MAX) break;
      }
    }

    const dayLabel = formatDayLabel(now);
    const feed = {
      fetchedAt: new Date().toISOString(),
      windowLabel: `${dayLabel} · MMA recaps`,
      today: recapClips.slice(0, SPORT_HIGHLIGHTS_MAX),
      tomorrow: [],
      all: recapClips.slice(0, SPORT_HIGHLIGHTS_MAX)
    };
    cacheRecapFeed(cacheKey, feed);
    return feed;
  }

  if (
    mode === "highlights" &&
    sportFilter !== "all" &&
    sportFilter !== "basketball" &&
    GENERIC_SPORT_HIGHLIGHTS.has(sportFilter)
  ) {
    const sport = sportFilter;
    const lastGames = pickLastGamesForSport(liveFeed, now, (event) => event.sport === sport);
    const recapClips: NavSportsRecapClip[] = [];
    const seenIds = new Set<string>();

    const pushClip = (clip: NavSportsRecapClip | null) => {
      if (!clip?.youtubeId || seenIds.has(clip.youtubeId)) return;
      const polished = polishGenericSportClip(clip);
      if (!isDisplayableGenericSportClip(polished)) return;
      seenIds.add(clip.youtubeId);
      recapClips.push(polished);
    };

    if (lastGames.length) {
      const withVideo = await attachHighlightVideos(lastGames);
      for (const clip of withVideo) pushClip(clip);
    }

    if (recapClips.length < 3) {
      const youtubeHighlights = await discoverSportHighlights(sport, SPORT_HIGHLIGHTS_MAX);
      for (const highlight of youtubeHighlights) {
        pushClip(youtubeGenericSportToClip(sport, highlight));
      }
    }

    const dayLabel = formatDayLabel(now);
    const feed = {
      fetchedAt: new Date().toISOString(),
      windowLabel: `${dayLabel} · recent games`,
      today: recapClips.slice(0, SPORT_HIGHLIGHTS_MAX),
      tomorrow: [],
      all: recapClips.slice(0, SPORT_HIGHLIGHTS_MAX)
    };
    cacheRecapFeed(cacheKey, feed);
    return feed;
  }

  if (sportFilter === "football" && mode === "highlights") {
    let lastGames = pickLastFootballGames(liveFeed, now);

    if (!lastGames.length && !isFootballApiOnCooldown()) {
      lastGames = await pickFootballFromDirectApi(now);
    }

    let highlightClips: NavSportsRecapClip[] = [];

    if (lastGames.length) {
      const withVideo = await attachHighlightVideos(lastGames);
      highlightClips = withVideo
        .filter((clip) => Boolean(clip.youtubeId))
        .slice(0, FOOTBALL_HIGHLIGHTS_MAX);
    }

    if (!highlightClips.length) {
      const youtubeHighlights = await discoverLatestFootballHighlights(FOOTBALL_HIGHLIGHTS_MAX);
      highlightClips = youtubeHighlights.map(youtubeFootballToClip);
    }

    return {
      fetchedAt: new Date().toISOString(),
      windowLabel: "Latest highlights · last football games",
      today: highlightClips,
      tomorrow: [],
      all: highlightClips
    };
  }

  const today = pickTodayRecaps(liveFeed, now, sportFilter);
  const tomorrow = pickTomorrowUpcoming(liveFeed, now, sportFilter);

  const todayWithVideo = await attachHighlightVideos(today);
  const tomorrowWithVideo = await attachHighlightVideos(
    tomorrow.filter((clip) => clip.status === "upcoming")
  );

  const tomorrowDay = new Date(startOfLocalDay(now));
  tomorrowDay.setDate(tomorrowDay.getDate() + 1);

  const sportSuffix = sportFilterLabel(sportFilter);

  return {
    fetchedAt: new Date().toISOString(),
    windowLabel: `${formatDayLabel(now)} recaps · ${formatDayLabel(tomorrowDay)} upcoming${sportSuffix}`,
    today: todayWithVideo,
    tomorrow: tomorrowWithVideo,
    all: [...todayWithVideo, ...tomorrowWithVideo]
  };
}

export function formatNavSportsKickoff(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} · ${hours}:${minutes}`;
}