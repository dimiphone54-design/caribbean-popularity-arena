"use client";

import { useEffect, useState } from "react";

const CHINA_TIME_ZONE = "Asia/Shanghai";

function pad2(value: string) {
  return value.padStart(2, "0");
}

function getChinaParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: CHINA_TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    day: get("day"),
    month: get("month"),
    hour: pad2(get("hour")),
    minute: pad2(get("minute")),
    second: pad2(get("second"))
  };
}

export function formatChinaHeroTimeLine(date: Date) {
  const { hour, minute, second } = getChinaParts(date);
  return `${hour}:${minute}:${second}`;
}

/** Fri 26 Jun → 周五 6月26日 */
export function formatChinaHeroDateLine(date: Date) {
  const { weekday, day, month } = getChinaParts(date);
  return `${weekday} ${month}月${day}日`;
}

type LiveChinaClockProps = {
  className?: string;
  variant?: "compact" | "panel";
};

/** China room · real Asia/Shanghai clock · Chinese date line */
export function LiveChinaClock({ className = "", variant = "compact" }: LiveChinaClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const shellClass =
    variant === "compact"
      ? "cfa-arena-china-clock china-live-clock-compact"
      : "cfa-arena-china-clock";

  if (!now) {
    return (
      <div className={`${shellClass} ${className}`.trim()} aria-live="polite">
        <p className="cfa-arena-china-clock-label">🇨🇳 中国 · 直播</p>
        <p className="cfa-arena-china-clock-time">--:--:--</p>
        <p className="cfa-arena-china-clock-date">加载中…</p>
      </div>
    );
  }

  return (
    <div className={`${shellClass} ${className}`.trim()} aria-live="polite" aria-atomic="true">
      <p className="cfa-arena-china-clock-label">🇨🇳 中国 · 直播</p>
      <p className="cfa-arena-china-clock-time">{formatChinaHeroTimeLine(now)}</p>
      <p className="cfa-arena-china-clock-date">{formatChinaHeroDateLine(now)}</p>
    </div>
  );
}
