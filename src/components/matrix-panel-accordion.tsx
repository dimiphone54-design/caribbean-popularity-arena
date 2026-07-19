"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export type MatrixPanelRoom = {
  flag: string;
  name: string;
  href: string;
  note?: string;
};

export type MatrixPanel = {
  char: string;
  emoji: string;
  title: string;
  tone: string;
  border: string;
  variant?: "gold" | "default";
  /** Closed row shows only the green matrix number (no emoji / title / rooms count) */
  numberOnly?: boolean;
  items: ReadonlyArray<{ label: string; body: string }>;
  /** Country / suite rooms inside this matrix cell */
  rooms?: ReadonlyArray<MatrixPanelRoom>;
  footer?: ReactNode;
};

export function MatrixPanelAccordion({ panels }: { panels: MatrixPanel[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-1.5">
      {panels.map((panel) => {
        const isOpen = openId === panel.char;
        const rooms = panel.rooms ?? [];
        return (
          <div key={panel.char}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : panel.char)}
              aria-label={panel.numberOnly ? `Matrix ${panel.char}` : panel.title}
              className={`w-full text-left rounded-xl border transition-all duration-150 ${
                panel.numberOnly ? "p-2" : "p-2.5"
              } ${
                panel.variant === "gold"
                  ? "border-[#c9a84c]/50 bg-[#f5c842]/10"
                  : `${panel.border} bg-black/40`
              } ${isOpen ? "ring-1 ring-[#00ff41]/30" : ""}`}
            >
              {panel.numberOnly ? (
                <div className="flex items-center justify-center">
                  <span
                    className={`cc-matrix-char text-center text-[36px] leading-none font-mono font-black tabular-nums select-none sm:text-[42px] ${
                      panel.variant === "gold" ? "text-[#f5c842]" : "text-[#00ff41]"
                    } opacity-95`}
                    aria-hidden="true"
                  >
                    {panel.char}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span
                    className={`cc-matrix-char min-w-[2.4rem] text-center text-[28px] leading-none font-mono font-black tabular-nums select-none sm:text-[34px] ${
                      panel.variant === "gold" ? "text-[#f5c842]" : "text-[#00ff41]"
                    } opacity-95`}
                    aria-hidden="true"
                  >
                    {panel.char}
                  </span>
                  <span className="text-sm leading-none">{panel.emoji}</span>
                  <span className={`min-w-0 flex-1 text-[10px] font-black uppercase tracking-[0.1em] ${panel.tone}`}>
                    {panel.title}
                    {rooms.length > 0 ? (
                      <span className="ml-2 font-mono text-[8px] font-bold tracking-[0.12em] text-[#5f6b88] normal-case">
                        · {rooms.length} room{rooms.length === 1 ? "" : "s"}
                      </span>
                    ) : null}
                  </span>
                  <span className="ml-auto text-[9px] font-mono text-[#5f6b88]">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>
              )}
            </button>
            {isOpen ? (
              <div className="mt-1 rounded-xl border border-[#00ff41]/15 bg-black/50 p-3">
                <ul className="space-y-1 text-[10px] leading-4 text-[#7a82a8]">
                  {panel.items.map((item) => (
                    <li key={item.label}>
                      <strong className="text-[#b0bcd4]">{item.label}</strong>
                      {item.body ? ` · ${item.body}` : null}
                    </li>
                  ))}
                </ul>

                {rooms.length > 0 ? (
                  <div className="mt-3 border-t border-[#00ff41]/12 pt-2.5">
                    <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-[#00ff41]/80">
                      Matrix {panel.char} · rooms inside
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rooms.map((room) => (
                        <Link
                          key={`${panel.char}-${room.href}-${room.name}`}
                          href={room.href}
                          className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-[#00ff41]/25 bg-[#00ff41]/5 px-2 py-1 text-[10px] font-bold text-[#b8ffc8] transition hover:border-[#00ff41]/55 hover:bg-[#00ff41]/12 hover:text-[#e8ffe9]"
                          title={room.note ?? room.name}
                        >
                          <span className="text-sm leading-none" aria-hidden="true">
                            {room.flag}
                          </span>
                          <span className="truncate">{room.name}</span>
                          {room.note ? (
                            <span className="hidden truncate text-[8px] font-semibold text-[#5f6b88] sm:inline">
                              · {room.note}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {panel.footer ? <div className="mt-3">{panel.footer}</div> : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
