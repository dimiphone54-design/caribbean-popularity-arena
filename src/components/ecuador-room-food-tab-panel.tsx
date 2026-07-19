"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { ecuadorFoodPanel, type EcuadorFoodPanelItem } from "@/lib/ecuador-country";

const comidaLanes = [
  {
    emoji: "🐟",
    title: "Clásicos de la costa",
    body: "Encebollado · ceviche de camarón · sabor del Pacífico"
  },
  {
    emoji: "🥔",
    title: "Sabor de los Andes",
    body: "Llapingachos · hornado · comida del alma serrana"
  },
  {
    emoji: "🥟",
    title: "Bocado de calle",
    body: "Empanadas de viento · bolón de verde · energía pa'l camino"
  }
] as const;

function EcuadorFoodPhotoFocus({
  item,
  onClose
}: {
  item: EcuadorFoodPanelItem;
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
      className="fixed inset-0 z-[200] flex flex-col bg-[#040a08]"
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
          ← Volver a Comida
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
        <p className="mt-1 text-center text-[11px] text-[#8fa3bf]">1 foto · Comida de Ecuador</p>
      </div>
    </div>
  );
}

/** Ecuador room · Comida as a full standalone panel */
export function EcuadorRoomFoodTabPanel() {
  const [focus, setFocus] = useState<EcuadorFoodPanelItem | null>(null);

  const openDish = useCallback((item: EcuadorFoodPanelItem) => {
    setFocus(item);
  }, []);

  return (
    <>
      <div
        className="ecuador-room-food-tab-panel ecuador-comida-panel space-y-2"
        aria-label="Panel de comida de Ecuador"
        lang="es-EC"
      >
        <section className="country-room-section relative overflow-hidden rounded-[1.25rem] border border-[#fcd116]/35 bg-[radial-gradient(circle_at_top_right,rgba(252,209,22,0.12),transparent_40%),linear-gradient(145deg,rgba(28,16,8,0.94),rgba(4,10,8,0.96))] p-4 sm:p-5">
          <div className="absolute -right-10 -top-12 text-[10rem] opacity-[0.06]" aria-hidden="true">
            🍽️
          </div>

          <header className="relative z-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
              🇪🇨 Sala Ecuador
            </p>
            <h2 className="mt-1.5 font-['Bebas_Neue',sans-serif] text-3xl tracking-[0.08em] text-[#fef9c3] sm:text-4xl">
              🍽️ Comida
            </h2>
            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#67e8f9]">
              Costa · Andes · bocado de calle
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#d4d4d8]">
              Platos reales del Ecuador — del encebollado mañanero al hornado del domingo.
            </p>
          </header>

          <ul className="relative z-10 mt-5 grid gap-3 sm:grid-cols-3" role="list">
            {comidaLanes.map((lane) => (
              <li
                key={lane.title}
                className="rounded-xl border border-[#fcd116]/20 bg-[#040a08]/70 px-3.5 py-3"
                role="listitem"
              >
                <p className="text-[13px] font-black text-[#fef9c3]">
                  <span className="mr-1.5" aria-hidden="true">
                    {lane.emoji}
                  </span>
                  {lane.title}
                </p>
                <p className="mt-1.5 text-[11px] leading-5 text-[#c4b89a]">{lane.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="ecuador-food-panel ecuador-elite-2028-panel country-room-section relative w-full overflow-hidden rounded-[1.5rem] px-4 py-5 sm:px-6 sm:py-6"
          aria-label={ecuadorFoodPanel.title}
        >
          <div className="ecuador-elite-2028-panel-shine pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="ecuador-elite-2028-panel-grid pointer-events-none absolute inset-0" aria-hidden="true" />

          <header className="relative z-[1] text-center">
            <h2 className="ecuador-elite-2028-title ecuador-food-panel-title">{ecuadorFoodPanel.title}</h2>
          </header>

          <div className="relative z-[1] mt-4 grid gap-2 sm:grid-cols-2">
            {ecuadorFoodPanel.items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => openDish(item)}
                className="ecuador-elite-2028-chip ecuador-elite-2028-chip--photo ecuador-food-panel-chip cursor-pointer text-left transition hover:border-[#fcd116]/50 hover:brightness-110"
                aria-label={`Abrir foto · ${item.label}`}
              >
                <div className="ecuador-elite-2028-chip-photo">
                  <Image
                    src={item.imageUrl}
                    alt={item.label}
                    width={120}
                    height={80}
                    className="ecuador-elite-2028-chip-photo-img"
                  />
                </div>
                <span className="ecuador-elite-2028-chip-label">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {focus ? <EcuadorFoodPhotoFocus item={focus} onClose={() => setFocus(null)} /> : null}
    </>
  );
}
