"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { ecuadorCulturePanel, type EcuadorCulturePanelItem } from "@/lib/ecuador-country";

/** Full-screen one-photo view · Back to The Arena */
function EcuadorCulturePhotoFocus({
  item,
  onClose
}: {
  item: EcuadorCulturePanelItem & { imageUrl: string };
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="ecuador-culture-photo-focus fixed inset-0 z-[200] flex flex-col bg-[#040a08]"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
    >
      <div className="pointer-events-auto fixed left-0 top-0 z-[210] max-w-sm px-4 py-4 sm:px-6">
        <RoomBackToArena fixed={false} showHint={false} />
        <button
          type="button"
          onClick={onClose}
          className="mt-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#c5cfe8] backdrop-blur-sm hover:border-[#fcd116]/40 hover:text-[#fef9c3]"
        >
          ← Volver al panel de cultura
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-10 pt-28 sm:px-8">
        <p className="mb-4 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
          🇪🇨 {item.label}
        </p>
        <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.25rem] border border-[#fcd116]/30 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            <Image
              src={item.imageUrl}
              alt={item.label}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
        <p className="mt-4 max-w-lg text-center text-sm font-semibold text-[#d4d4d8]">{item.label}</p>
        <p className="mt-1 text-center text-[11px] text-[#8fa3bf]">1 foto · cultura de Ecuador</p>
      </div>
    </div>
  );
}

/** Ecuador · Elite 2028 · cities & culture · 1-click single photo focus */
export function EcuadorCulture2028Panel() {
  const [focus, setFocus] = useState<(EcuadorCulturePanelItem & { imageUrl: string }) | null>(null);

  const openPhoto = useCallback((item: EcuadorCulturePanelItem) => {
    if (!item.imageUrl) return;
    setFocus({ label: item.label, imageUrl: item.imageUrl });
  }, []);

  return (
    <>
      <section
        className="ecuador-elite-2028-panel ecuador-cities-culture-panel country-room-section relative w-full overflow-hidden rounded-[1.5rem] px-4 py-5 sm:px-6 sm:py-6"
        aria-label={ecuadorCulturePanel.title}
      >
        <div className="ecuador-elite-2028-panel-shine ecuador-cities-culture-panel-shine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="ecuador-elite-2028-panel-grid ecuador-cities-culture-panel-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        <header className="relative z-[1] text-center">
          <h2 className="ecuador-elite-2028-title ecuador-cities-culture-title">{ecuadorCulturePanel.title}</h2>
          <p className="mt-2 text-[11px] text-[#a5b4fc]">1 clic · abre una foto a pantalla completa</p>
        </header>

        <div className="relative z-[1] mt-4 grid gap-2 sm:grid-cols-2">
          {ecuadorCulturePanel.items.map((item) => {
            const clickable = Boolean(item.imageUrl);
            const ChipTag = clickable ? "button" : "div";

            return (
              <ChipTag
                key={item.label}
                type={clickable ? "button" : undefined}
                onClick={clickable ? () => openPhoto(item) : undefined}
                className={`ecuador-elite-2028-chip ecuador-cities-culture-chip text-left transition${
                  item.imageUrl ? " ecuador-elite-2028-chip--photo" : ""
                }${clickable ? " ecuador-elite-2028-chip--clickable cursor-pointer hover:border-[#818cf8]/55 hover:brightness-110" : ""}`}
                aria-label={clickable ? `Abrir foto · ${item.label}` : item.label}
              >
                {item.imageUrl ? (
                  <div className="ecuador-elite-2028-chip-photo">
                    <Image
                      src={item.imageUrl}
                      alt={item.label}
                      width={120}
                      height={80}
                      className="ecuador-elite-2028-chip-photo-img"
                    />
                  </div>
                ) : (
                  <span className="ecuador-elite-2028-chip-dot" aria-hidden="true" />
                )}
                <span className="ecuador-elite-2028-chip-label">{item.label}</span>
              </ChipTag>
            );
          })}
        </div>
      </section>

      {focus ? <EcuadorCulturePhotoFocus item={focus} onClose={() => setFocus(null)} /> : null}
    </>
  );
}
