"use client";

import Link from "next/link";
import {
  describeEldersTableVersionSettings,
  eldersTableVersionConfigs,
  eldersTableVersionList,
  type EldersTableVersionId
} from "@/lib/the-elders-table-versions";

type TheEldersTableVersionPickerProps = {
  current: EldersTableVersionId;
};

export function TheEldersTableVersionPicker({ current }: TheEldersTableVersionPickerProps) {
  const active = eldersTableVersionList.find((version) => version.id === current) ?? eldersTableVersionConfigs[5];
  const activeSettings = describeEldersTableVersionSettings(active);

  return (
    <div className="elders-table-version-picker pointer-events-auto fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-[min(26rem,calc(100vw-1.5rem))]">
      <div className="elders-table-version-picker-card rounded-2xl border border-[rgba(212,175,55,0.38)] bg-[rgba(4,3,2,0.94)] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.55)] backdrop-blur-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(212,175,55,0.88)]">
          Compare versions · #5 is your base
        </p>
        <p className="mt-1 text-sm font-semibold text-[#f4e4bc]">{active.name}</p>
        <p className="mt-1 text-[11px] leading-5 text-[rgba(244,228,188,0.78)]">{active.summary}</p>

        <ul className="elders-table-version-picker-settings mt-2 space-y-1">
          {activeSettings.map((line) => (
            <li key={line} className="text-[10px] leading-4 text-[rgba(244,228,188,0.62)]">
              · {line}
            </li>
          ))}
        </ul>

        <div className="elders-table-version-picker-grid mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-11">
          {eldersTableVersionList.map((version) => {
            const isActive = version.id === current;

            return (
              <Link
                key={version.id}
                href={`/rooms/the-elders-table?v=${version.id}`}
                className={`elders-table-version-picker-btn rounded-lg border px-0 py-2 text-center text-[11px] font-bold transition ${
                  isActive
                    ? "border-[rgba(244,214,130,0.85)] bg-[rgba(212,175,55,0.18)] text-[#f4e4bc]"
                    : "border-[rgba(212,175,55,0.24)] bg-[rgba(6,5,4,0.55)] text-[rgba(244,228,188,0.72)] hover:border-[rgba(212,175,55,0.45)]"
                }`}
                title={`${version.name} — ${version.summary}`}
              >
                {version.id}
              </Link>
            );
          })}
        </div>

        <div className="elders-table-version-picker-catalog mt-3 max-h-[min(34vh,16rem)] space-y-2 overflow-y-auto pr-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[rgba(212,175,55,0.72)]">
            All versions · settings written
          </p>
          {eldersTableVersionList.map((version) => {
            const isActive = version.id === current;
            const settings = describeEldersTableVersionSettings(version);

            return (
              <Link
                key={version.id}
                href={`/rooms/the-elders-table?v=${version.id}`}
                className={`elders-table-version-picker-row block rounded-xl border px-3 py-2.5 transition ${
                  isActive
                    ? "border-[rgba(244,214,130,0.75)] bg-[rgba(212,175,55,0.12)]"
                    : "border-[rgba(212,175,55,0.18)] bg-[rgba(6,5,4,0.45)] hover:border-[rgba(212,175,55,0.35)]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex min-w-[1.65rem] justify-center rounded-md border border-[rgba(212,175,55,0.35)] px-1 py-0.5 text-[10px] font-black text-[#f4e4bc]">
                    {version.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold leading-5 text-[#f4e4bc]">
                      {version.name}
                      {version.id === 5 ? " · locked" : ""}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-4 text-[rgba(244,228,188,0.68)]">{version.summary}</p>
                    <ul className="mt-1.5 space-y-0.5">
                      {settings.map((line) => (
                        <li key={`${version.id}-${line}`} className="text-[9px] leading-4 text-[rgba(244,228,188,0.52)]">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-2 text-[10px] leading-4 text-[rgba(244,228,188,0.58)]">
          Tap a row or number to preview. Tell me what settings to add back into #5.
        </p>
      </div>
    </div>
  );
}
