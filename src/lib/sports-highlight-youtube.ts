/** Find real highlight clips on YouTube · server-side search + cache */

const CACHE_MS = 6 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; youtubeId: string | null }>();
const embedCache = new Map<string, { at: number; ok: boolean }>();
const EMBED_CACHE_MS = 24 * 60 * 60 * 1000;

function extractVideoIds(html: string, limit = 6) {
  const ids: string[] = [];
  const pattern = /videoId":"([a-zA-Z0-9_-]{11})/g;
  let match: RegExpExecArray | null = pattern.exec(html);
  while (match && ids.length < limit) {
    const id = match[1];
    if (!ids.includes(id)) ids.push(id);
    match = pattern.exec(html);
  }
  return ids;
}

function tokensFromTitle(title: string) {
  return title
    .replace(/\s+vs\.?\s+/gi, " ")
    .split(/\s+/)
    .map((token) => token.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
    .filter((token) => token.length > 3);
}

function sportKeywords(sport: string, meta: string) {
  const bag = `${sport} ${meta}`.toLowerCase();
  const keywords = [
    "highlight",
    "highlights",
    "recap",
    "final",
    "full",
    "game",
    "match",
    sport.toLowerCase(),
    "football",
    "soccer",
    "basketball",
    "baseball",
    "hockey",
    "rugby",
    "volleyball",
    "nbl",
    "nba",
    "mlb",
    "nfl",
    "f1",
    "formula",
    "ufc",
    "mma",
    "bellator",
    "knockout"
  ];
  return keywords.filter((word) => bag.includes(word) || word.length > 4);
}

export function youtubeEmbedSrc(youtubeId: string, origin?: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    loop: "1",
    playlist: youtubeId,
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1"
  });
  if (origin) params.set("origin", origin);
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

export function isQualityFootballVideoTitle(title: string) {
  const normalized = title.trim();
  if (!normalized || normalized.length < 12) return false;
  if (/#\w+/i.test(normalized)) return false;
  if (/^football\s+hi\b|^soccer\s+hi\b|^football highlights$/i.test(normalized)) return false;
  if (/^football highlights/i.test(normalized)) return false;
  if (/best.*goals|every goal|all goals|season so far/i.test(normalized)) return false;
  const hasMatch =
    /\bvs\.?\b|\bv\b/i.test(normalized) ||
    /\d+\s*[-–]\s*\d+/.test(normalized) ||
    /highlights\s*\|/i.test(normalized);
  const hasFootball = /football|soccer|premier league|champions league|fa cup|fifa|world cup|la liga|bundesliga|mls|uefa/i.test(
    normalized
  );
  return hasMatch && hasFootball;
}

export async function isYoutubeEmbeddable(youtubeId: string) {
  const cached = embedCache.get(youtubeId);
  if (cached && Date.now() - cached.at < EMBED_CACHE_MS) return cached.ok;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtubeId}`)}&format=json`,
      { cache: "no-store", signal: controller.signal }
    );
    clearTimeout(timer);
    const ok = res.ok;
    embedCache.set(youtubeId, { at: Date.now(), ok });
    return ok;
  } catch {
    embedCache.set(youtubeId, { at: Date.now(), ok: true });
    return true;
  }
}

export function cleanFootballDisplayTitle(title: string) {
  const vsMatch = title.match(
    /([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,30}?)\s+(?:vs\.?|v)\s+([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,30}?)(?:\s+\d|\s*[-–|]|$)/i
  );
  if (vsMatch) {
    return `${vsMatch[1].trim()} vs ${vsMatch[2].trim()}`;
  }
  const pipeMatch = title.match(/highlights\s*\|\s*([^|]+)/i);
  if (pipeMatch) {
    const segment = pipeMatch[1].trim();
    const scoreSplit = segment.match(/^(.+?)\s+(\d+)\s*[-–]\s*(\d+)\s+(.+)$/);
    if (scoreSplit) {
      return `${scoreSplit[1].trim()} vs ${scoreSplit[4].trim()}`;
    }
    return segment.slice(0, 48);
  }
  const cleaned = title
    .replace(/#\w+/g, "")
    .split("|")[0]
    ?.trim()
    .slice(0, 48);
  if (!cleaned || cleaned.length < 8 || /^football\s+hi\b/i.test(cleaned)) {
    return "Football highlights";
  }
  return cleaned;
}

export function youtubeThumbnail(youtubeId: string, quality: "hq" | "max" = "max") {
  const file = quality === "max" ? "maxresdefault.jpg" : "hqdefault.jpg";
  return `https://i.ytimg.com/vi/${youtubeId}/${file}`;
}

async function searchYoutube(query: string) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9"
    },
    next: { revalidate: 3600 }
  });
  if (!res.ok) return [];
  return extractVideoIds(await res.text());
}

async function fetchVideoTitle(youtubeId: string) {
  const res = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtubeId}`)}&format=json`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const json = (await res.json()) as { title?: string };
  return json.title ?? null;
}

function scoreVideoTitle(
  videoTitle: string,
  matchTitle: string,
  sport: string,
  meta: string,
  status: "recap" | "upcoming"
) {
  const normalized = videoTitle.toLowerCase();
  const teamTokens = tokensFromTitle(matchTitle);
  const teamHits = teamTokens.filter((token) => normalized.includes(token)).length;
  const keywordHits = sportKeywords(sport, meta).filter((word) => normalized.includes(word)).length;
  const wantsHighlight =
    status === "recap"
      ? ["highlight", "highlights", "recap", "final", "full game", "full match", "game"].some((word) =>
          normalized.includes(word)
        )
      : ["preview", "preview", "upcoming", "live", "tip off", "kickoff"].some((word) =>
          normalized.includes(word)
        );

  let score = teamHits * 4 + keywordHits;
  if (wantsHighlight) score += 3;
  if (teamHits >= 2) score += 4;
  if (normalized.includes("fifa") && !matchTitle.toLowerCase().includes("fifa")) score -= 8;

  if (sport === "basketball" || sport === "nba") {
    const isBasketballClip = ["basketball", "nba", "nbl", "fiba", "mpbl", "euroleague"].some((word) =>
      normalized.includes(word)
    );
    if (!isBasketballClip) score -= 12;
    if (!wantsHighlight) score -= 6;
  }

  if (sport === "football-pitch") {
    const pitchAction = ["goal", "goals", "free kick", "penalty", "strike", "shot", "pitch", "viral", "highlights"].some(
      (word) => normalized.includes(word)
    );
    const isWrongSport = ["basketball", "baseball", "cricket", "rugby", "nfl", "hockey"].some((word) =>
      normalized.includes(word)
    );
    const isCompilation = ["every goal", "all goals", "all finals", "matchday"].some((word) =>
      normalized.includes(word)
    );
    if (!pitchAction) score -= 10;
    if (isWrongSport) score -= 14;
    if (isCompilation) score -= 12;
    if (/\bvs\.?\b|\bv\b/.test(normalized)) score += 4;
  }

  if (sport === "formula-1") {
    const isF1Clip = ["f1", "formula 1", "formula one", "grand prix", "gp highlights", "race highlights", "onboard"].some(
      (word) => normalized.includes(word)
    );
    const isWrongSport = ["basketball", "football", "soccer", "baseball", "nfl"].some((word) =>
      normalized.includes(word)
    );
    if (!isF1Clip) score -= 12;
    if (isWrongSport) score -= 14;
    if (!wantsHighlight) score -= 5;
  }

  if (sport === "mma") {
    const isMmaClip = [
      "mma",
      "ufc",
      "bellator",
      "pfl",
      "one championship",
      "one fc",
      "knockout",
      "ko ",
      "full fight",
      "octagon",
      "main event"
    ].some((word) => normalized.includes(word));
    const isWrongSport = [
      "football",
      "soccer",
      "basketball",
      "nba",
      "volleyball",
      "baseball",
      "nfl",
      "hockey",
      "cricket",
      "rugby",
      "handball",
      "f1",
      "formula 1",
      "wwe",
      "premier league",
      "la liga",
      "tennis",
      "golf"
    ].some((word) => normalized.includes(word));
    if (/\bboxing\b/.test(normalized) && !/\b(mma|ufc)\b/.test(normalized)) score -= 18;
    if (!isMmaClip) score -= 14;
    if (isWrongSport) score -= 16;
    if (!wantsHighlight) score -= 5;
    if (/\bvs\.?\b|\bv\b/.test(normalized)) score += 4;
    if (/ufc\s*\d+/i.test(normalized)) score += 3;
  }

  if (sport === "handball") {
    const isHandballClip = ["handball", "ehf", "ihf", "world championship", "world cup"].some((word) =>
      normalized.includes(word)
    );
    const isWrongSport = [
      "football",
      "soccer",
      "basketball",
      "nba",
      "volleyball",
      "baseball",
      "nfl",
      "hockey",
      "cricket",
      "rugby",
      "f1",
      "formula 1",
      "premier league",
      "la liga",
      "uefa soccer"
    ].some((word) => normalized.includes(word));
    if (!isHandballClip) score -= 14;
    if (isWrongSport) score -= 16;
    if (!wantsHighlight) score -= 5;
    if (/\bvs\.?\b|\bv\b/.test(normalized)) score += 4;
  }

  if (sport === "football") {
    const isFootballClip = [
      "football",
      "soccer",
      "premier league",
      "champions league",
      "la liga",
      "serie a",
      "bundesliga",
      "ligue 1",
      "uefa",
      "copa",
      "mls",
      "goal",
      "fifa"
    ].some((word) => normalized.includes(word));
    const isWrongSport = ["basketball", "baseball", "cricket", "rugby", "nfl", "hockey"].some((word) =>
      normalized.includes(word)
    );
    const isCompilation = ["every goal", "all goals", "all finals", "matchday 8", "semi-finals!"].some((word) =>
      normalized.includes(word)
    );
    const hasVersus = /\bvs\.?\b|\bv\b/.test(normalized);
    if (!isFootballClip) score -= 12;
    if (isWrongSport) score -= 14;
    if (!wantsHighlight) score -= 6;
    if (isCompilation) score -= 10;
    if (hasVersus) score += 5;
  }

  return score;
}

async function pickBestVideoId(
  ids: string[],
  matchTitle: string,
  sport: string,
  meta: string,
  status: "recap" | "upcoming"
) {
  let best: { id: string; score: number } | null = null;

  for (const id of ids.slice(0, 5)) {
    const title = await fetchVideoTitle(id);
    if (!title) continue;
    if (sport === "handball" && !isQualityHandballVideoTitle(title)) continue;
    if (sport === "mma" && !isQualityMmaVideoTitle(title)) continue;
    const score = scoreVideoTitle(title, matchTitle, sport, meta, status);
    if (!best || score > best.score) {
      best = { id, score };
    }
  }

  return best && best.score >= 5 ? best.id : null;
}

export async function findF1HighlightVideo(options: { title: string; meta: string }) {
  const key = `f1:${options.title}:${options.meta}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.youtubeId;

  const queries = [
    `${options.title} F1 race highlights`,
    `${options.title} Formula 1 highlights`,
    `${options.meta} F1 grand prix highlights`
  ];

  let youtubeId: string | null = null;
  for (const query of queries) {
    const ids = await searchYoutube(query);
    youtubeId = await pickBestVideoId(ids, options.title, "formula-1", options.meta, "recap");
    if (youtubeId) break;
  }

  cache.set(key, { at: Date.now(), youtubeId });
  return youtubeId;
}

export async function findFootballPitchHighlightVideo(options: { title: string; meta: string }) {
  const key = `pitch:${options.title}:${options.meta}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.youtubeId;

  const league = options.meta.split("·").pop()?.trim() ?? options.meta;
  const queries = [
    `${options.title} goals highlights pitch`,
    `${options.title} match highlights goals viral`,
    `${options.title} ${league} highlights goals`,
    `${options.title} free kick goal highlights`
  ];

  let youtubeId: string | null = null;
  for (const query of queries) {
    const ids = await searchYoutube(query);
    youtubeId = await pickBestVideoId(ids, options.title, "football-pitch", options.meta, "recap");
    if (youtubeId) break;
  }

  cache.set(key, { at: Date.now(), youtubeId });
  return youtubeId;
}

export async function findSportsHighlightVideo(options: {
  title: string;
  sport: string;
  meta: string;
  status: "recap" | "upcoming";
}) {
  const key = `${options.status}:${options.title}:${options.meta}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.youtubeId;

  const league = options.meta.split("·").pop()?.trim() ?? options.meta;
  const queries =
    options.status === "recap"
      ? [
          `${options.title} ${league} highlights`,
          `${options.title} highlights`,
          `${league} ${options.title} highlights`,
          `${options.sport} ${options.title} highlights`
        ]
      : [`${options.title} ${league} preview`, `${options.title} preview`];

  let youtubeId: string | null = null;
  for (const query of queries) {
    const ids = await searchYoutube(query);
    youtubeId = await pickBestVideoId(ids, options.title, options.sport, options.meta, options.status);
    if (youtubeId) break;
  }

  cache.set(key, { at: Date.now(), youtubeId });
  return youtubeId;
}

export type FootballYoutubeHighlight = {
  youtubeId: string;
  videoTitle: string;
  matchTitle: string;
  scoreline: string;
  meta: string;
};

function parseFootballYoutubeTitle(title: string) {
  const normalized = title.replace(/\|/g, " - ");
  const vsMatch = normalized.match(/([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,40}?)\s+(?:vs\.?|v)\s+([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,40}?)(?:\s*[-–|]|$|\s+final|\s+highlights|\s+full)/i);
  const scoreMatch = normalized.match(/(\d+)\s*[-–]\s*(\d+)/);
  const leagueMatch = normalized.match(
    /(premier league|champions league|la liga|serie a|bundesliga|ligue 1|mls|uefa|fa cup|europa league|copa america|world cup|emirates fa cup)/i
  );

  if (vsMatch) {
    const home = vsMatch[1].trim().replace(/^full match\s*-?\s*/i, "");
    const away = vsMatch[2].trim();
    return {
      matchTitle: `${home} vs ${away}`,
      scoreline: scoreMatch ? `${scoreMatch[1]}-${scoreMatch[2]}` : "FT",
      meta: leagueMatch ? `Final · ${leagueMatch[1]}` : "Final · Football highlights"
    };
  }

  return {
    matchTitle: normalized.split(" - ").find((part) => / vs? /i.test(part))?.trim() || title,
    scoreline: scoreMatch ? `${scoreMatch[1]}-${scoreMatch[2]}` : "FT",
    meta: leagueMatch ? `Final · ${leagueMatch[1]}` : "Final · Football highlights"
  };
}

let footballDiscoveryCache: { at: number; highlights: FootballYoutubeHighlight[] } | null = null;
let basketballDiscoveryCache: { at: number; highlights: FootballYoutubeHighlight[] } | null = null;
let f1DiscoveryCache: { at: number; highlights: FootballYoutubeHighlight[] } | null = null;

/** Real football clips from YouTube when API-Sports football quota is exhausted */
export async function discoverLatestFootballHighlights(max = 6) {
  if (footballDiscoveryCache && Date.now() - footballDiscoveryCache.at < CACHE_MS) {
    return footballDiscoveryCache.highlights.slice(0, max);
  }

  const monthYear = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const dayLabel = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const queries = [
    `football goals highlights pitch ${dayLabel}`,
    "soccer goals viral pitch highlights today",
    "Premier League goals highlights pitch",
    "Champions League goals highlights pitch",
    "La Liga goals highlights pitch"
  ];

  const highlights: FootballYoutubeHighlight[] = [];
  const seen = new Set<string>();

  for (const query of queries) {
    if (highlights.length >= max) break;
    const ids = await searchYoutube(query);
    for (const id of ids.slice(0, 3)) {
      if (seen.has(id)) continue;
      const videoTitle = await fetchVideoTitle(id);
      if (!videoTitle || !isQualityFootballVideoTitle(videoTitle)) continue;
      const score = scoreVideoTitle(videoTitle, "", "football", "", "recap");
      if (score < 4) continue;
      if (!(await isYoutubeEmbeddable(id))) continue;

      const parsed = parseFootballYoutubeTitle(videoTitle);
      highlights.push({
        youtubeId: id,
        videoTitle,
        matchTitle: parsed.matchTitle,
        scoreline: parsed.scoreline,
        meta: parsed.meta
      });
      seen.add(id);
      if (highlights.length >= max) break;
    }
  }

  if (!highlights.length) {
    const fallbackQueries = [
      "football goals highlights pitch viral",
      "soccer match highlights goals today pitch",
      "Premier League goals highlights pitch",
      "World Cup goals highlights pitch 2026"
    ];
    for (const query of fallbackQueries) {
      if (highlights.length >= max) break;
      const fallbackIds = await searchYoutube(query);
      for (const id of fallbackIds.slice(0, 5)) {
        const videoTitle = await fetchVideoTitle(id);
        if (!videoTitle || !isQualityFootballVideoTitle(videoTitle)) continue;
        const score = scoreVideoTitle(videoTitle, "", "football-pitch", "", "recap");
        if (score < 4) continue;
        if (!(await isYoutubeEmbeddable(id))) continue;
        const parsed = parseFootballYoutubeTitle(videoTitle);
        highlights.push({
          youtubeId: id,
          videoTitle,
          matchTitle: parsed.matchTitle,
          scoreline: parsed.scoreline,
          meta: parsed.meta
        });
        if (highlights.length >= max) break;
      }
    }
  }

  if (highlights.length) {
    footballDiscoveryCache = { at: Date.now(), highlights };
  }
  return highlights.slice(0, max);
}

export function isQualityBasketballVideoTitle(title: string) {
  const normalized = title.trim();
  if (!normalized || normalized.length < 12) return false;
  if (/#\w+/i.test(normalized)) return false;
  if (/cricket|football|soccer|baseball|rugby|nfl|hockey|f1|formula 1/i.test(normalized)) return false;
  const hasMatch =
    /\bvs\.?\b|\bv\b/i.test(normalized) ||
    /\d+\s*[-–]\s*\d+/.test(normalized) ||
    /highlights/i.test(normalized);
  const hasBasketball = /basketball|nba|nbl|fiba|euroleague|wnba|mpbl|summer league/i.test(normalized);
  return hasMatch && hasBasketball;
}

export function cleanBasketballDisplayTitle(title: string) {
  const normalized = title
    .replace(/^NBL1\s+Men\s+-\s+/i, "")
    .replace(/\s+-\s+/g, " ")
    .replace(/#\w+/g, "")
    .trim();

  const vsMatch = normalized.match(
    /([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,34}?)\s+(?:vs\.?|v)\s+([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,34}?)(?:\s+\d|\s*[-–|]|$)/i
  );
  if (vsMatch) {
    return `${vsMatch[1].trim()} vs ${vsMatch[2].trim()}`;
  }

  const scoreSplit = normalized.match(/^(.+?)\s+(\d+)\s*[-–]\s*(\d+)\s+(.+)$/);
  if (scoreSplit) {
    return `${scoreSplit[1].trim()} vs ${scoreSplit[4].trim()}`;
  }

  const cleaned = normalized.split("|")[0]?.trim().slice(0, 48);
  if (!cleaned || !/\bvs\b/i.test(cleaned)) {
    return "Basketball highlights";
  }
  return cleaned;
}

function parseBasketballYoutubeTitle(title: string) {
  const parsed = parseFootballYoutubeTitle(title);
  return {
    ...parsed,
    meta: parsed.meta.includes("Basketball") ? parsed.meta : parsed.meta.replace("Football", "Basketball")
  };
}

/** Real basketball clips from YouTube when API-Sports data is unavailable */
export async function discoverLatestBasketballHighlights(max = 6) {
  if (basketballDiscoveryCache && Date.now() - basketballDiscoveryCache.at < CACHE_MS) {
    return basketballDiscoveryCache.highlights.slice(0, max);
  }

  const queries = [
    "basketball game highlights vs full game",
    "NBA highlights vs",
    "NBL1 basketball highlights vs",
    "FIBA basketball highlights vs"
  ];

  const highlights: FootballYoutubeHighlight[] = [];
  const seen = new Set<string>();

  for (const query of queries) {
    if (highlights.length >= max) break;
    const ids = await searchYoutube(query);
    for (const id of ids.slice(0, 3)) {
      if (seen.has(id)) continue;
      const videoTitle = await fetchVideoTitle(id);
      if (!videoTitle || !isQualityBasketballVideoTitle(videoTitle)) continue;
      const score = scoreVideoTitle(videoTitle, "", "basketball", "", "recap");
      if (score < 5) continue;
      if (!(await isYoutubeEmbeddable(id))) continue;

      const parsed = parseBasketballYoutubeTitle(videoTitle);
      highlights.push({
        youtubeId: id,
        videoTitle,
        matchTitle: parsed.matchTitle,
        scoreline: parsed.scoreline,
        meta: parsed.meta.replace("Football highlights", "Basketball highlights")
      });
      seen.add(id);
      if (highlights.length >= max) break;
    }
  }

  if (highlights.length) {
    basketballDiscoveryCache = { at: Date.now(), highlights };
  }
  return highlights.slice(0, max);
}

export function isQualityF1VideoTitle(title: string) {
  const normalized = title.trim();
  if (!normalized || normalized.length < 12) return false;
  if (/#\w+/i.test(normalized)) return false;
  if (/basketball|football|soccer|cricket|baseball|nfl|hockey/i.test(normalized)) return false;
  const hasF1 = /f1|formula 1|formula one|grand prix|gp highlights|race highlights/i.test(normalized);
  const hasRace = /grand prix|gp|race|highlights|onboard|overtake/i.test(normalized);
  return hasF1 && hasRace;
}

export function cleanGenericSportDisplayTitle(title: string) {
  const normalized = title.replace(/#\w+/g, "").trim();
  const vsMatch = normalized.match(
    /([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,34}?)\s+(?:vs\.?|v)\s+([A-Za-z0-9][A-Za-z0-9 &'.\-]{1,34}?)(?:\s+\d|\s*[-–|]|$)/i
  );
  if (vsMatch) {
    return `${vsMatch[1].trim()} vs ${vsMatch[2].trim()}`;
  }
  const cleaned = normalized.split("|")[0]?.trim().slice(0, 48);
  return cleaned && cleaned.length >= 8 ? cleaned : "Game highlights";
}

export function isQualityHandballVideoTitle(title: string) {
  const normalized = title.trim();
  if (!normalized || normalized.length < 12) return false;
  if (/#\w+/i.test(normalized)) return false;

  const lower = normalized.toLowerCase();
  const wrongSport = [
    "football",
    "soccer",
    "basketball",
    "nba",
    "volleyball",
    "baseball",
    "nfl",
    "hockey",
    "cricket",
    "rugby",
    "f1",
    "formula 1",
    "premier league",
    "la liga",
    "serie a",
    "bundesliga"
  ];
  if (wrongSport.some((word) => lower.includes(word))) return false;
  if (/champions league|uefa/i.test(lower) && !/ehf|handball|ihf/i.test(lower)) return false;

  const hasHandball = /handball|ehf|ihf|world championship/i.test(lower);
  const hasMatch =
    /\bvs\.?\b|\bv\b/i.test(lower) || /highlights|final|full match|full game/i.test(lower);
  return hasHandball && hasMatch;
}

export function isQualityMmaVideoTitle(title: string) {
  const normalized = title.trim();
  if (!normalized || normalized.length < 10) return false;
  if (/#\w+/i.test(normalized)) return false;

  const lower = normalized.toLowerCase();
  const wrongSport = [
    "football",
    "soccer",
    "basketball",
    "nba",
    "volleyball",
    "baseball",
    "nfl",
    "hockey",
    "cricket",
    "rugby",
    "handball",
    "f1",
    "formula 1",
    "wwe",
    "premier league",
    "la liga",
    "serie a",
    "bundesliga",
    "tennis",
    "golf",
    "nascar"
  ];
  if (wrongSport.some((word) => lower.includes(word))) return false;
  if (/\bboxing\b/.test(lower) && !/\b(mma|ufc)\b/.test(lower)) return false;

  const isMmaClip = /\b(mma|ufc|bellator|pfl|one championship|one fc|octagon|knockout|ko\b|submission|full fight|main event)\b/i.test(
    lower
  );
  const hasFight =
    /\bvs\.?\b|\bv\b/i.test(lower) ||
    /ufc\s*\d+/i.test(lower) ||
    /fight highlights|full fight|main event/i.test(lower);
  return isMmaClip && hasFight;
}

function parseMmaYoutubeTitle(title: string) {
  const normalized = title.replace(/\|/g, " - ");
  const vsMatch = normalized.match(
    /([A-Za-z0-9][A-Za-z0-9 '.\-]{1,40}?)\s+(?:vs\.?|v)\s+([A-Za-z0-9][A-Za-z0-9 '.\-]{1,40}?)(?:\s*[-–|:]|$|\s+UFC|\s+ufc|\s+highlights|\s+full)/i
  );
  if (vsMatch) {
    const home = vsMatch[1].trim().replace(/^ufc\s*\d+\s*:?\s*/i, "");
    const away = vsMatch[2].trim().replace(/\s+highlights?.*$/i, "");
    return {
      matchTitle: `${home} vs ${away}`,
      scoreline: "FT",
      meta: /ufc\s*\d+/i.test(normalized) ? "Final · UFC highlights" : "Final · MMA highlights"
    };
  }

  const ufcMatch = normalized.match(/UFC\s*(\d+)/i);
  if (ufcMatch) {
    const event = normalized
      .replace(/#\w+/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 72);
    return {
      matchTitle: event || `UFC ${ufcMatch[1]} Highlights`,
      scoreline: "FT",
      meta: "Final · UFC highlights"
    };
  }

  const cleaned = normalized.replace(/#\w+/g, "").trim();
  return {
    matchTitle: cleaned.slice(0, 72) || "MMA highlights",
    scoreline: "FT",
    meta: "Final · MMA highlights"
  };
}

const SPORT_DISCOVERY_QUERIES: Record<string, string[]> = {
  volleyball: ["volleyball match highlights vs", "volleyball highlights full game"],
  nba: ["NBA highlights vs full game", "NBA game highlights vs"],
  baseball: ["MLB highlights vs", "baseball game highlights vs"],
  hockey: ["NHL highlights vs", "hockey game highlights vs"],
  rugby: ["rugby match highlights vs", "rugby highlights full game"],
  nfl: ["NFL highlights vs", "NFL game highlights full"],
  handball: [
    "EHF handball highlights vs full game",
    "handball world championship highlights vs",
    "IHF handball match highlights goals"
  ],
  afl: ["AFL highlights vs", "AFL match highlights full game"],
  mma: [
    "UFC full fight highlights vs knockout",
    "UFC main event highlights KO",
    "MMA fight highlights UFC vs"
  ]
};

export async function discoverSportHighlights(sport: string, max = 6) {
  const queries = SPORT_DISCOVERY_QUERIES[sport] ?? [`${sport} highlights vs`, `${sport} game highlights`];
  const highlights: FootballYoutubeHighlight[] = [];
  const seen = new Set<string>();

  for (const query of queries) {
    if (highlights.length >= max) break;
    const ids = await searchYoutube(query);
    for (const id of ids.slice(0, 4)) {
      if (seen.has(id)) continue;
      const videoTitle = await fetchVideoTitle(id);
      if (!videoTitle || videoTitle.length < 12) continue;
      if (/#\w+/i.test(videoTitle)) continue;
      if (sport === "handball" && !isQualityHandballVideoTitle(videoTitle)) continue;
      if (sport === "mma" && !isQualityMmaVideoTitle(videoTitle)) continue;
      const scoreSport = sport === "nba" ? "basketball" : sport;
      const score = scoreVideoTitle(videoTitle, "", scoreSport, "", "recap");
      if (score < 4) continue;
      const parsed = sport === "mma" ? parseMmaYoutubeTitle(videoTitle) : parseFootballYoutubeTitle(videoTitle);
      highlights.push({
        youtubeId: id,
        videoTitle,
        matchTitle: parsed.matchTitle,
        scoreline: parsed.scoreline,
        meta: parsed.meta.replace("Football highlights", `${sport} highlights`)
      });
      seen.add(id);
      if (highlights.length >= max) break;
    }
  }

  return highlights.slice(0, max);
}

export function cleanF1DisplayTitle(title: string) {
  const normalized = title.replace(/#\w+/g, "").trim();
  const gpMatch = normalized.match(/([A-Za-z0-9' .-]+Grand Prix)/i);
  if (gpMatch) {
    return gpMatch[1].trim();
  }
  const split = normalized.split("·")[0]?.trim() || normalized.split("|")[0]?.trim();
  if (split && /grand prix/i.test(split)) {
    return split.slice(0, 48);
  }
  const cleaned = split?.slice(0, 48);
  if (!cleaned || cleaned.length < 8) {
    return "Grand Prix recap";
  }
  return cleaned;
}

function parseF1YoutubeTitle(title: string) {
  const gpMatch = title.match(/([A-Za-z0-9' .-]+Grand Prix)/i);
  const circuitMatch = title.match(/(Monza|Silverstone|Monaco|Spa|Suzuka|Interlagos|Yas Marina|Circuit)/i);
  return {
    matchTitle: gpMatch?.[1]?.trim() ?? title.split("|")[0]?.trim() ?? title,
    scoreline: "Race",
    meta: circuitMatch ? `Highlights · ${circuitMatch[0]}` : "Highlights · Formula 1"
  };
}

/** Real F1 race clips from YouTube */
export async function discoverLatestF1Highlights(max = 6) {
  if (f1DiscoveryCache && Date.now() - f1DiscoveryCache.at < CACHE_MS) {
    return f1DiscoveryCache.highlights.slice(0, max);
  }

  const queries = [
    "F1 race highlights grand prix",
    "Formula 1 race highlights onboard",
    "F1 highlights viral overtake",
    "Grand Prix race highlights Formula 1"
  ];

  const highlights: FootballYoutubeHighlight[] = [];
  const seen = new Set<string>();

  for (const query of queries) {
    if (highlights.length >= max) break;
    const ids = await searchYoutube(query);
    for (const id of ids.slice(0, 4)) {
      if (seen.has(id)) continue;
      const videoTitle = await fetchVideoTitle(id);
      if (!videoTitle || !isQualityF1VideoTitle(videoTitle)) continue;
      const score = scoreVideoTitle(videoTitle, "", "formula-1", "", "recap");
      if (score < 4) continue;
      if (!(await isYoutubeEmbeddable(id))) continue;
      const parsed = parseF1YoutubeTitle(videoTitle);
      highlights.push({
        youtubeId: id,
        videoTitle,
        matchTitle: parsed.matchTitle,
        scoreline: parsed.scoreline,
        meta: parsed.meta
      });
      seen.add(id);
      if (highlights.length >= max) break;
    }
  }

  if (highlights.length) {
    f1DiscoveryCache = { at: Date.now(), highlights };
  }
  return highlights.slice(0, max);
}