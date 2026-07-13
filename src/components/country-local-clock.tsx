"use client";

import { useEffect, useState } from "react";

function pad2(value: string) {
  return value.padStart(2, "0");
}

function getTimeZoneParts(date: Date, timeZone: string, locale = "en-GB") {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone,
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

export function formatCountryLocalTime(date: Date, timeZone: string, locale = "en-GB") {
  const { hour, minute, second } = getTimeZoneParts(date, timeZone, locale);
  return `${hour}:${minute}:${second}`;
}

export function formatCountryLocalDate(date: Date, timeZone: string, locale = "en-GB") {
  const { weekday, day, month } = getTimeZoneParts(date, timeZone, locale);
  return `${weekday} ${day} ${month}`;
}

type CountryLocalClockProps = {
  capital: string;
  timeZone: string;
  tzAbbrev: string;
  className?: string;
  locale?: string;
};

export function CountryLocalClock({
  capital,
  timeZone,
  tzAbbrev,
  className = "",
  locale = "en-GB"
}: CountryLocalClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timeLine = now ? formatCountryLocalTime(now, timeZone, locale) : "--:--:--";
  const dateLine = now ? formatCountryLocalDate(now, timeZone, locale) : "…";

  return (
    <div className={`country-local-clock ${className}`.trim()} aria-live="polite">
      <span className="country-local-clock-city">{capital}</span>
      <time className="country-local-clock-time" dateTime={now ? timeLine : undefined} suppressHydrationWarning>
        {timeLine}
      </time>
      <span className="country-local-clock-tz">{tzAbbrev}</span>
      <span className="country-local-clock-date" suppressHydrationWarning>
        {dateLine}
      </span>
    </div>
  );
}
