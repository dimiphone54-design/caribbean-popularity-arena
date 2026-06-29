"use client";

import { useEffect, useState } from "react";
import { formatTimeZoneClockLine } from "@/components/live-uk-clock";
import type { CotswoldsParkFeed } from "@/lib/cotswolds";

type QuarterLocationLabelProps = {
  feed: CotswoldsParkFeed;
};

export function QuarterLocationLabel({ feed }: QuarterLocationLabelProps) {
  const [now, setNow] = useState<Date | null>(null);
  const hasLocationClock = Boolean(feed.location && feed.timeZone);

  useEffect(() => {
    if (!hasLocationClock) {
      return;
    }

    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [hasLocationClock]);

  return (
    <div className="cotswolds-quarter-label cotswolds-uk-glass-clock">
      {hasLocationClock ? (
        <>
          <p className="cotswolds-quarter-title">{feed.location}</p>
          <p className="cotswolds-quarter-timezone" aria-live="polite">
            {feed.region ?? feed.timeZone} · {now ? formatTimeZoneClockLine(now, feed.timeZone!) : "—:—:—"}
          </p>
        </>
      ) : (
        <p className="cotswolds-quarter-title">{feed.label}</p>
      )}
    </div>
  );
}
