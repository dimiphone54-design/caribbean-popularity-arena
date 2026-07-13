import type { NavLiveSportEvent } from "@/lib/api-sports-nav-feed";
import type { ApiSportsNavSportId } from "@/lib/api-sports-sport-meta";
import { NAV_SPORTS_RECAP_LANES } from "@/lib/nav-sports-recap-lanes";

export type NavSportsFinalsFallback = {
  sport: ApiSportsNavSportId;
  title: string;
  kickoff: string;
  venue: string;
};

function formatFinalsKickoff(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

/** Curated upcoming major finals · shown when live API has no fixture in window */
export const NAV_SPORTS_FINALS_FALLBACK: NavSportsFinalsFallback[] = [
  {
    sport: "football",
    title: "FIFA World Cup 2026 Final",
    kickoff: "2026-07-19T19:00:00-04:00",
    venue: "MetLife Stadium · USA"
  },
  {
    sport: "basketball",
    title: "EuroLeague Final Four",
    kickoff: "2027-05-22T20:00:00+02:00",
    venue: "Abu Dhabi · UAE"
  },
  {
    sport: "formula-1",
    title: "Belgian Grand Prix",
    kickoff: "2026-07-26T15:00:00+02:00",
    venue: "Spa-Francorchamps · Belgium"
  },
  {
    sport: "volleyball",
    title: "Volleyball Nations League Finals",
    kickoff: "2026-07-18T18:00:00+08:00",
    venue: "Ningbo · China"
  },
  {
    sport: "nba",
    title: "NBA Finals · Game 7",
    kickoff: "2027-06-20T20:00:00-04:00",
    venue: "TBD · USA"
  },
  {
    sport: "baseball",
    title: "MLB World Series · Game 7",
    kickoff: "2026-10-31T20:00:00-04:00",
    venue: "TBD · USA"
  },
  {
    sport: "hockey",
    title: "Stanley Cup Finals · Game 7",
    kickoff: "2027-06-18T20:00:00-04:00",
    venue: "TBD · USA/Canada"
  },
  {
    sport: "rugby",
    title: "Rugby World Cup 2027 Final",
    kickoff: "2027-10-30T19:00:00+00:00",
    venue: "Twickenham · England"
  },
  {
    sport: "nfl",
    title: "Super Bowl LXI",
    kickoff: "2027-02-14T18:30:00-08:00",
    venue: "SoFi Stadium · Los Angeles"
  },
  {
    sport: "handball",
    title: "IHF World Championship Final",
    kickoff: "2027-02-06T18:00:00+01:00",
    venue: "Zagreb · Croatia"
  },
  {
    sport: "afl",
    title: "AFL Grand Final",
    kickoff: "2026-09-26T14:30:00+10:00",
    venue: "MCG · Melbourne"
  },
  {
    sport: "mma",
    title: "UFC 320 · Main Event",
    kickoff: "2026-10-04T22:00:00-04:00",
    venue: "T-Mobile Arena · Las Vegas"
  }
];

const finalsBySport = Object.fromEntries(
  NAV_SPORTS_FINALS_FALLBACK.map((entry) => [entry.sport, entry])
) as Partial<Record<ApiSportsNavSportId, NavSportsFinalsFallback>>;

export function getNavSportsFinalsFallback(sport: ApiSportsNavSportId) {
  return finalsBySport[sport] ?? null;
}

export function formatNavSportsFinalsSentence(fallback: NavSportsFinalsFallback) {
  return `${fallback.title} · ${formatFinalsKickoff(fallback.kickoff)} · ${fallback.venue}`;
}

export function getNavSportsFinalsFallbackEvents(now = Date.now()): NavLiveSportEvent[] {
  return NAV_SPORTS_FINALS_FALLBACK.filter((entry) => new Date(entry.kickoff).getTime() > now).map(
    (entry) => ({
      id: `finals-fallback-${entry.sport}`,
      sport: entry.sport,
      status: "scheduled" as const,
      bucket: "upcoming" as const,
      title: entry.title,
      scoreline: "Final",
      meta: `${formatFinalsKickoff(entry.kickoff)} · ${entry.venue}`,
      kickoff: entry.kickoff
    })
  );
}

/** One finals line per recap lane sport */
export function getNavSportsFinalsFallbackLines() {
  return NAV_SPORTS_RECAP_LANES.map((lane) => {
    const fallback = getNavSportsFinalsFallback(lane.sport);
    return {
      sport: lane.sport,
      fallback
    };
  });
}