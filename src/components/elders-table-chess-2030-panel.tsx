"use client";

import { eldersTableChess2030 } from "@/lib/elders-table-chess";

type EldersTableChess2030PanelProps = {
  className?: string;
  variant?: "rail-drop" | "inline";
  deploy?: boolean;
};

export function EldersTableChess2030Panel({
  className = "",
  variant = "rail-drop",
  deploy = true
}: EldersTableChess2030PanelProps) {
  const chess = eldersTableChess2030;
  const shellClass =
    variant === "rail-drop"
      ? "elders-table-chess-2030-robot-drop"
      : "elders-table-chess-2030-robot-inline";

  return (
    <div
      className={`elders-table-chess-2030-panel arena-2030 pointer-events-auto${deploy ? " elders-table-chess-2030-panel-deploy" : ""}${className ? ` ${className}` : ""}`}
      role="region"
      aria-label="Chess · automated AI scroll panel"
    >
      <div className={shellClass}>
        <div className="elders-table-chess-robot-cap" aria-hidden="true">
          <div className="elders-table-chess-robot-face">
            <span className="elders-table-chess-robot-eye" />
            <span className="elders-table-chess-robot-eye" />
            <span className="elders-table-chess-robot-mouth" />
          </div>
          <div className="elders-table-chess-robot-cap-bar">
            <span className="elders-table-chess-robot-pip" />
            <span className="elders-table-chess-robot-cap-text">Automated AI · scroll deploy</span>
            <span className="elders-table-chess-robot-cap-code">BOT-2030</span>
          </div>
          <div className="elders-table-chess-robot-scroll-edge elders-table-chess-robot-scroll-edge-left" />
          <div className="elders-table-chess-robot-scroll-edge elders-table-chess-robot-scroll-edge-right" />
        </div>

        <div className="elders-table-chess-robot-scroll-roll">
          <div className="elders-table-chess-robot-scroll-paper">
            <section className="a2030-holo-panel elders-table-chess-2030-holo relative overflow-hidden rounded-b-xl rounded-t-none p-3 sm:p-3.5">
              <div
                className="elders-table-chess-2030-scan a2030-scanlines pointer-events-none absolute inset-0 rounded-[inherit] opacity-30"
                aria-hidden="true"
              />
              <div
                className="elders-table-chess-2030-grid pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.08]"
                aria-hidden="true"
              />

              <div className="elders-table-chess-robot-type relative z-[1] flex flex-wrap items-center gap-2">
                <span className="a2030-badge a2030-micro inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase">
                  2030
                </span>
                <span className="a2030-live a2030-micro inline-flex items-center gap-1.5 rounded-full border border-[#b8ff3c]/30 bg-[#b8ff3c]/8 px-2 py-0.5 text-[9px] font-bold uppercase text-[#b8ff3c]">
                  <span className="a2030-pulse-ring inline-flex h-1.5 w-1.5 rounded-full bg-[#b8ff3c]" />
                  {chess.liveBadge}
                </span>
              </div>

              <div className="elders-table-chess-robot-block relative z-[1] mt-2 flex items-end gap-2">
                <span className="text-lg leading-none text-[#f7e7aa]" aria-hidden="true">
                  {chess.symbol}
                </span>
                <h2 className="a2030-title a2030-title-breathe text-base font-black tracking-[0.14em] sm:text-lg">
                  {chess.title}
                </h2>
              </div>

              <p className="elders-table-chess-robot-block relative z-[1] mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d7b46a]/85">
                {chess.gameType}
              </p>

              <div className="elders-table-chess-robot-block relative z-[1] mt-2.5 flex flex-wrap gap-1.5">
                {chess.openings.map((opening, index) => (
                  <span
                    key={opening.id}
                    className="a2030-chip inline-flex flex-col items-start rounded-lg px-2 py-1 text-left"
                    title={opening.note}
                    style={{ animationDelay: `${0.45 + index * 0.12}s` }}
                  >
                    <span className="text-[10px] font-bold text-[#f7efe0]">{opening.label}</span>
                    <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#a5b4fc]">
                      {opening.note}
                    </span>
                  </span>
                ))}
              </div>

              <dl className="elders-table-chess-robot-block relative z-[1] mt-2.5 grid grid-cols-3 gap-1.5">
                {chess.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-[#d7b46a]/20 bg-[#0a0e1f]/45 px-1.5 py-1 text-center"
                    style={{ animationDelay: `${0.55 + index * 0.1}s` }}
                  >
                    <dt className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7a82a8]">{stat.label}</dt>
                    <dd className="mt-0.5 text-[9px] font-bold text-[#f7efe0]">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="elders-table-chess-robot-block relative z-[1] mt-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#00f5ff]/85">
                Hosts // {chess.available}
              </p>

              <div className="elders-table-chess-robot-block relative z-[1] mt-1.5 flex flex-wrap gap-1">
                {chess.hosts.map((host, index) => (
                  <span
                    key={host.name}
                    className="a2030-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold text-[#eef6ff]"
                    style={{ animationDelay: `${0.7 + index * 0.08}s` }}
                  >
                    <span aria-hidden="true">{host.flag}</span>
                    <span>
                      {host.name} · {host.age}
                    </span>
                    <span className="text-[#a5b4fc]">· {host.lane}</span>
                  </span>
                ))}
              </div>

              <p className="elders-table-chess-robot-block elders-table-chess-robot-blurb relative z-[1] mt-2.5 text-[10px] leading-relaxed text-[#eef6ff]/92">
                {chess.blurb}
              </p>
            </section>
          </div>
        </div>

        <div className="elders-table-chess-robot-tail" aria-hidden="true">
          <span className="elders-table-chess-robot-tail-curl" />
        </div>
      </div>
    </div>
  );
}
