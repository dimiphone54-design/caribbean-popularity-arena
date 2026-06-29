"use client";

import { useMemo, useState } from "react";
import {
  formatRoomLocaleOptionLabel,
  formatRoomLocaleSearchText,
  roomLocaleRegionLabels
} from "@/lib/room-world-languages";
import {
  groupRoomLocaleOptions,
  isSpanishContentLocale,
  roomLocaleOptions,
  type RoomLocaleId
} from "@/lib/room-locale";
import { useRoomLocale } from "@/components/room-locale-provider";

const regionOrder = ["popular", "americas", "europe", "asia", "africa", "middle-east", "oceania"] as const;

export function RoomLocalePicker({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useRoomLocale();
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return roomLocaleOptions;
    return roomLocaleOptions.filter((option) => formatRoomLocaleSearchText(option).includes(trimmed));
  }, [query]);

  const groupedOptions = useMemo(() => groupRoomLocaleOptions(filteredOptions), [filteredOptions]);
  const regionLabels = isSpanishContentLocale(locale) ? "es" : "en";
  const selected = roomLocaleOptions.find((option) => option.id === locale) ?? roomLocaleOptions[0]!;
  const searchPlaceholder = isSpanishContentLocale(locale) ? "Buscar idioma…" : "Search language…";

  return (
    <details className={`room-locale-picker ${className}`.trim()}>
      <summary className="room-locale-picker-summary cursor-pointer list-none rounded-2xl border px-3 py-2 text-[11px] font-semibold text-[#fecdd3] transition [&::-webkit-details-marker]:hidden">
        <span className="room-locale-picker-label block text-[9px] font-bold uppercase tracking-[0.16em] text-[#fda4af]/80">
          {t.localePickerLabel}
        </span>
        <span className="room-locale-picker-current mt-1 inline-flex items-center gap-1.5">
          {formatRoomLocaleOptionLabel(selected)}
          <span className="text-[#fb7185]/60" aria-hidden="true">
            ▾
          </span>
        </span>
      </summary>

      <div className="room-locale-picker-panel mt-2 rounded-2xl border p-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="room-locale-picker-search w-full rounded-full border px-3 py-1.5 text-[11px] text-[#fecdd3] outline-none transition placeholder:text-[#fb7185]/45"
          aria-label={searchPlaceholder}
        />

        <select
          value={locale}
          onChange={(event) => setLocale(event.target.value as RoomLocaleId)}
          className="room-locale-picker-select mt-2 w-full cursor-pointer rounded-xl border px-3 py-2 text-[11px] font-semibold text-[#fecdd3] outline-none transition"
          aria-label={t.localePickerLabel}
        >
          {regionOrder.map((region) => {
            const options = groupedOptions.get(region);
            if (!options?.length) return null;

            return (
              <optgroup key={region} label={roomLocaleRegionLabels[region][regionLabels]}>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {formatRoomLocaleOptionLabel(option)} · {option.englishLabel}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>

        <p className="room-locale-picker-meta mt-2 text-[10px] leading-5 text-[#fb7185]/65">
          {t.localePickerHint}
        </p>
      </div>
    </details>
  );
}
