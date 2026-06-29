"use client";

import { eldersTableNoirBrand } from "@/lib/the-elders-table";

type EldersTableTokyo2030HeaderLinkProps = {
  compactTitle?: boolean;
};

export function EldersTableTokyo2030HeaderLink({ compactTitle = false }: EldersTableTokyo2030HeaderLinkProps) {
  function handleActivate() {
    const target = document.querySelector(".elders-table-noir-scenes-box");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      type="button"
      className="elders-table-tokyo2030-head-link pointer-events-auto"
      onClick={handleActivate}
      aria-label="THE ELDERS TABLE · Caribbean Freedom Arena all in one — enter the room"
    >
      <span className="elders-table-tokyo2030-head-aurora" aria-hidden="true" />
      <span className="elders-table-tokyo2030-head-scan" aria-hidden="true" />

      <span className="elders-table-tokyo2030-head-badge">
        <span className="elders-table-tokyo2030-head-badge-dot" aria-hidden="true" />
        🇯🇵 Elite Tokyo · 2030
      </span>

      <h1 className={`elders-table-noir-title elders-table-tokyo2030-head-title${compactTitle ? " elders-table-noir-title-compact" : ""}`}>
        {compactTitle ? (
          <span className="elders-table-noir-title-line">THE ELDERS TABLE</span>
        ) : (
          <>
            THE <span className="elders-table-noir-title-elders-table">ELDERS TABLE</span>
          </>
        )}
      </h1>

      <p className="elders-table-noir-subbrand elders-table-tokyo2030-head-sub mt-2">{eldersTableNoirBrand}</p>

      <span className="elders-table-tokyo2030-head-hint">Hover · click to enter all-in-one lane</span>
    </button>
  );
}
