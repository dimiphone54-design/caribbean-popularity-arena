"use client";

import { useEffect, useState } from "react";

const ukPartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

function pad2(value: string) {
  return value.padStart(2, "0");
}

function getUkParts(date: Date) {
  const parts = ukPartsFormatter.formatToParts(date);
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

export function formatExactUkClockLine(date: Date) {
  const { year, hour, minute, second, weekday, day, month } = getUkParts(date);
  return `${year} · ${hour}:${minute}:${second} · ${weekday} ${day} ${month}`;
}

/** Hero 4K · HH:MM:SS */
export function formatUkHeroTimeLine(date: Date) {
  const { hour, minute, second } = getUkParts(date);
  return `${hour}:${minute}:${second}`;
}

/** Hero 4K · Fri 19 Jun 2026 */
export function formatUkHeroDateLine(date: Date) {
  const { weekday, day, month, year } = getUkParts(date);
  return `${weekday} ${day} ${month} ${year}`;
}

export function formatUkMidnightCountdown(date: Date) {
  const { hour, minute, second } = getUkParts(date);
  const elapsed = Number(hour) * 3600 + Number(minute) * 60 + Number(second);
  const remaining = 86400 - elapsed;
  const rh = pad2(String(Math.floor(remaining / 3600)));
  const rm = pad2(String(Math.floor((remaining % 3600) / 60)));
  const rs = pad2(String(remaining % 60));
  return `${rh}:${rm}:${rs}`;
}

export function formatTimeZoneClockLine(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${pad2(get("hour"))}:${pad2(get("minute"))}:${pad2(get("second"))}`;
}

type LiveUkClockProps = {
  className?: string;
  variant?: "badge" | "panel" | "hero4k" | "compact";
};

export function LiveUkClock({ className = "", variant = "panel" }: LiveUkClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) {
    if (variant === "hero4k" || variant === "compact") {
      return (
        <div
          className={`cfa-arena-uk-clock${variant === "compact" ? " uk-live-clock-compact" : ""} ${className}`.trim()}
          aria-live="polite"
        >
          <p className="cfa-arena-uk-clock-label">🇬🇧 UK time · live · London</p>
          <p className="cfa-arena-uk-clock-time">--:--:--</p>
          <p className="cfa-arena-uk-clock-date">Loading…</p>
        </div>
      );
    }

    return (
      <div className={`cotswolds-live-clock ${className}`} aria-live="polite">
        <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff]">Live UK // auto-updates</p>
        <p className="mt-1 font-mono text-sm font-bold tabular-nums text-white">Loading…</p>
      </div>
    );
  }

  const exactLine = formatExactUkClockLine(now);
  const { month } = getUkParts(now);
  const countdown = formatUkMidnightCountdown(now);
  const timeLine = formatUkHeroTimeLine(now);
  const dateLine = formatUkHeroDateLine(now);

  if (variant === "badge") {
    return (
      <span className={className} aria-live="polite" aria-atomic="true">
        {exactLine}
      </span>
    );
  }

  if (variant === "hero4k" || variant === "compact") {
    return (
      <div
        className={`cfa-arena-uk-clock${variant === "compact" ? " uk-live-clock-compact" : ""} ${className}`.trim()}
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="cfa-arena-uk-clock-label">🇬🇧 UK time · live · London</p>
        <p className="cfa-arena-uk-clock-time">{timeLine}</p>
        <p className="cfa-arena-uk-clock-date">{dateLine}</p>
      </div>
    );
  }

  return (
    <div className={`cotswolds-live-clock ${className}`} aria-live="polite" aria-atomic="true">
      <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff]">Live UK // auto-updates</p>
      <p className="mt-1 font-mono text-sm font-bold tabular-nums leading-snug text-white sm:text-base">
        {exactLine}
      </p>
      <p className="mt-1 text-[10px] tabular-nums text-[#9fb4d4]">
        {month} · <span className="text-[#b8ff3c]">{countdown}</span>
      </p>
    </div>
  );
}
