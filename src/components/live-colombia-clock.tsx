"use client";

import { useEffect, useState } from "react";
import { isSpanishContentLocale } from "@/lib/room-locale";
import { useRoomLocale } from "@/components/room-locale-provider";

const COLOMBIA_TIME_ZONE = "America/Bogota";

function pad2(value: string) {
  return value.padStart(2, "0");
}

function getColombiaParts(date: Date, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: COLOMBIA_TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
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

type LiveColombiaClockProps = {
  className?: string;
  variant?: "default" | "compact";
};

export function LiveColombiaClock({ className = "", variant = "default" }: LiveColombiaClockProps) {
  const { locale } = useRoomLocale();
  const [now, setNow] = useState<Date | null>(null);
  const spanish = isSpanishContentLocale(locale);
  const dateLocale = spanish ? "es-CO" : "en-GB";

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const label = spanish ? "Colombia · en vivo" : "Colombia · live";
  const cityLine = spanish ? "Bogotá · Medellín · Cartagena" : "Bogotá · Medellín · Cartagena";

  if (!now) {
    return (
      <div
        className={`colombia-live-clock${variant === "compact" ? " colombia-live-clock-compact" : ""} ${className}`.trim()}
        aria-live="polite"
      >
        <p className="colombia-live-clock-label">{label}</p>
        <p className="colombia-live-clock-time mt-1 font-mono tabular-nums">--:--:--</p>
      </div>
    );
  }

  const { year, weekday, day, month, hour, minute, second } = getColombiaParts(now, dateLocale);

  return (
    <div
      className={`colombia-live-clock${variant === "compact" ? " colombia-live-clock-compact" : ""} ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="colombia-live-clock-label">🇨🇴 {label}</p>
      <p className="colombia-live-clock-time mt-1 font-mono font-bold tabular-nums">{hour}:{minute}:{second}</p>
      <p className="colombia-live-clock-date mt-1 text-[11px] font-semibold capitalize tabular-nums text-[#fda4af]/90 sm:text-xs">
        {weekday} {day} {month} {year}
      </p>
      {variant === "default" ? (
        <p className="colombia-live-clock-cities mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#fbbf24]/85">
          {cityLine}
        </p>
      ) : null}
    </div>
  );
}
