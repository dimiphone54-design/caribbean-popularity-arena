import type { NavSportsRecapFeed } from "@/lib/nav-sports-recap-feed";

export async function fetchNavSportsRecapFeed(url: string): Promise<NavSportsRecapFeed | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 45000);
      const res = await fetch(url, { cache: "no-store", signal: controller.signal });
      window.clearTimeout(timeout);
      if (!res.ok) continue;
      const feed = (await res.json()) as NavSportsRecapFeed;
      if ((feed.all ?? []).some((clip) => clip.youtubeId)) return feed;
    } catch {
      /* retry */
    }
    await new Promise((resolve) => window.setTimeout(resolve, 1200 * (attempt + 1)));
  }
  return null;
}