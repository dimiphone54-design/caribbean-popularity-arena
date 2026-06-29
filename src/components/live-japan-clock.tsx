"use client";

import { useEffect, useState } from "react";

const JAPAN_TIME_ZONE = "Asia/Tokyo";

function pad2(value: string) {
  return value.padStart(2, "0");
}

function getJapanParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: JAPAN_TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: get("year"),
    weekday: get("weekday"),
    day: get("day"),
    month: get("month"),
    hour: pad2(get("hour")),
    minute: pad2(get("minute")),
    second: pad2(get("second"))
  };
}

export function formatJapanHeroTimeLine(date: Date) {
  const { hour, minute, second } = getJapanParts(date);
  return `${hour}:${minute}:${second}`;
}

export function formatJapanHeroDateLine(date: Date) {
  const { year, weekday, day, month } = getJapanParts(date);
  return `${year}年${month}月${day}日(${weekday})`;
}

type LiveJapanClockProps = {
  className?: string;
  variant?: "compact" | "panel";
};

/** Japan room · real Asia/Tokyo clock · exact compact panel */
export function LiveJapanClock({ className = "", variant = "compact" }: LiveJapanClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const shellClass =
    variant === "compact"
      ? "cfa-arena-japan-clock japan-live-clock-compact"
      : "cfa-arena-japan-clock";

  if (!now) {
    return (
      <div className={`${shellClass} ${className}`.trim()} aria-live="polite">
        <p className="cfa-arena-japan-clock-label">🇯🇵 日本時間 · ライブ · JAPAN</p>
        <p className="cfa-arena-japan-clock-time">--:--:--</p>
        <p className="cfa-arena-japan-clock-date">読み込み中…</p>
      </div>
    );
  }

  return (
    <div className={`${shellClass} ${className}`.trim()} aria-live="polite" aria-atomic="true">
      <p className="cfa-arena-japan-clock-label">🇯🇵 日本時間 · ライブ · JAPAN</p>
      <p className="cfa-arena-japan-clock-time">{formatJapanHeroTimeLine(now)}</p>
      <p className="cfa-arena-japan-clock-date">{formatJapanHeroDateLine(now)} · JST</p>
    </div>
  );
}
