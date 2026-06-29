"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  colombiaRoomSlideCategoryLabels,
  colombiaRoomSlideMs,
  colombiaRoomSlides,
  type ColombiaRoomSlide
} from "@/lib/colombia-room-live";

function SlideFrame({
  slide,
  active,
  children
}: {
  slide: ColombiaRoomSlide;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!active}
    >
      <div className="colombia-room-slide-inner flex h-full min-h-[18rem] flex-col sm:min-h-[22rem] lg:min-h-[28rem]">
        <div className="colombia-romantic-slide-header flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 py-3">
          <span className="colombia-romantic-slide-badge rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
            {colombiaRoomSlideCategoryLabels[slide.category]}
          </span>
          <div className="text-right">
            <h2 className="colombia-romantic-slide-title text-base sm:text-xl">{slide.title}</h2>
            <p className="text-[11px] text-[#fda4af]/85 sm:text-xs">{slide.desc}</p>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function NightlifeSlide({ slide, active }: { slide: Extract<ColombiaRoomSlide, { category: "nightlife" }>; active: boolean }) {
  return (
    <SlideFrame slide={slide} active={active}>
      <img src={slide.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
      <ul className="colombia-slide-nightlife-list absolute inset-x-0 bottom-0 max-h-[55%] overflow-y-auto px-3 pb-4 pt-8 sm:px-5 sm:pb-5">
        {slide.hotspots.map((spot) => (
          <li key={spot.place} className="colombia-slide-nightlife-item">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fuchsia-300">{spot.city}</p>
            <p className="mt-0.5 text-sm font-bold text-white">{spot.place}</p>
            <p className="mt-0.5 text-[11px] leading-5 text-zinc-300">{spot.vibe}</p>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

function FoodSlide({ slide, active }: { slide: Extract<ColombiaRoomSlide, { category: "food" }>; active: boolean }) {
  return (
    <SlideFrame slide={slide} active={active}>
      <div className="colombia-slide-food-grid absolute inset-0 grid grid-cols-2 grid-rows-3 gap-1 bg-black p-1 sm:grid-cols-3 sm:grid-rows-2 sm:gap-1.5 sm:p-1.5">
        {slide.scenes.map((scene) => (
          <figure key={scene.id} className="colombia-slide-food-cell relative overflow-hidden rounded-lg">
            <img src={scene.image} alt={`${scene.dish} in ${scene.city}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-2 sm:p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-yellow-200/80 sm:text-[10px]">
                {scene.city} · {scene.region}
              </p>
              <p className="colombia-slide-plate-label mt-1.5 inline-block">{scene.dish}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </SlideFrame>
  );
}

function BeachSlide({ slide, active }: { slide: Extract<ColombiaRoomSlide, { category: "beach" }>; active: boolean }) {
  return (
    <SlideFrame slide={slide} active={active}>
      <img src={slide.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
      <div className="absolute right-3 top-3 hidden overflow-hidden rounded-lg border border-cyan-400/30 shadow-lg sm:block sm:w-28 lg:right-5 lg:top-4 lg:w-36">
        <img src="/colombia-beach-baru.png" alt="" className="aspect-[4/3] w-full object-cover" />
        <p className="bg-black/70 px-2 py-1 text-[9px] font-bold text-cyan-100">Barú · white sand</p>
      </div>
      <ul className="absolute inset-x-0 bottom-0 grid gap-2 px-4 pb-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {slide.beaches.map((beach, index) => (
          <li
            key={beach.name}
            className={`rounded-xl border border-cyan-400/25 bg-black/55 px-3 py-2 backdrop-blur-sm${
              index === slide.beaches.length - 1 && slide.beaches.length % 3 !== 0
                ? " lg:col-span-3 lg:mx-auto lg:max-w-sm"
                : ""
            }`}
          >
            <p className="text-xs font-bold text-cyan-200 sm:text-sm">{beach.name}</p>
            <p className="mt-0.5 text-[10px] leading-5 text-zinc-300 sm:text-[11px]">{beach.colour}</p>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

function ParkSlide({ slide, active }: { slide: Extract<ColombiaRoomSlide, { category: "park" }>; active: boolean }) {
  return (
    <SlideFrame slide={slide} active={active}>
      <img src={slide.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
      <ul className="absolute bottom-0 left-0 top-0 flex w-[min(100%,20rem)] flex-col justify-end gap-2 p-4 sm:p-6">
        {slide.activities.map((activity) => (
          <li
            key={activity}
            className="rounded-lg border border-emerald-400/30 bg-black/60 px-3 py-2 text-[11px] font-semibold text-emerald-100 backdrop-blur-sm sm:text-xs"
          >
            {activity}
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

const spotlightAccent: Record<
  "horses" | "coffee" | "cartagena-umbrellas" | "cartagena-church" | "medellin-metro",
  { border: string; title: string }
> = {
  horses: { border: "border-amber-400/30", title: "text-amber-200" },
  coffee: { border: "border-yellow-400/30", title: "text-yellow-200" },
  "cartagena-umbrellas": { border: "border-rose-400/35", title: "text-rose-200" },
  "cartagena-church": { border: "border-orange-400/35", title: "text-orange-200" },
  "medellin-metro": { border: "border-sky-400/35", title: "text-sky-200" }
};

function SpotlightSlide({
  slide,
  active
}: {
  slide: Extract<
    ColombiaRoomSlide,
    {
      category:
        | "horses"
        | "coffee"
        | "cartagena-umbrellas"
        | "cartagena-church"
        | "medellin-metro";
    }
  >;
  active: boolean;
}) {
  const accent = spotlightAccent[slide.category];

  return (
    <SlideFrame slide={slide} active={active}>
      <img src={slide.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <ul className="absolute inset-x-0 bottom-0 grid gap-2 px-4 pb-5 sm:grid-cols-2 sm:px-6">
        {slide.highlights.map((item) => (
          <li
            key={item.label}
            className={`rounded-xl border bg-black/55 px-3 py-2 backdrop-blur-sm ${accent.border}`}
          >
            <p className={`text-xs font-bold sm:text-sm ${accent.title}`}>{item.label}</p>
            <p className="mt-0.5 text-[10px] leading-5 text-zinc-300 sm:text-[11px]">{item.detail}</p>
          </li>
        ))}
      </ul>
    </SlideFrame>
  );
}

export function ColombiaRoomSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % colombiaRoomSlides.length);
    }, colombiaRoomSlideMs);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section>
      <p className="colombia-romantic-slideshow-kicker mb-3 text-[10px] font-bold uppercase tracking-[0.18em]">
        🇨🇴 Colombia · pasión en cada slide
      </p>
      <p className="mb-4 text-xs leading-5 text-[#fda4af]/80">
        Caballos · café #1 · Cartagena umbrellas & church · Medellín metro · playas · parque — gratis
        antes del live.
      </p>
      <div className="colombia-room-slideshow colombia-romantic-slideshow relative min-h-[18rem] overflow-hidden rounded-2xl sm:min-h-[22rem] lg:min-h-[28rem]">
        {colombiaRoomSlides.map((slide, i) => {
          const active = i === index;

          if (slide.category === "nightlife") {
            return <NightlifeSlide key={slide.title} slide={slide} active={active} />;
          }
          if (slide.category === "food") {
            return <FoodSlide key={slide.title} slide={slide} active={active} />;
          }
          if (slide.category === "beach") {
            return <BeachSlide key={slide.title} slide={slide} active={active} />;
          }
          if (
            slide.category === "horses" ||
            slide.category === "coffee" ||
            slide.category === "cartagena-umbrellas" ||
            slide.category === "cartagena-church" ||
            slide.category === "medellin-metro"
          ) {
            return <SpotlightSlide key={slide.title} slide={slide} active={active} />;
          }
          if (slide.category === "park") {
            return <ParkSlide key={slide.title} slide={slide} active={active} />;
          }
          return null;
        })}

        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
          {colombiaRoomSlides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              className={`h-2 w-2 rounded-full transition-colors ${i === index ? "bg-[#fb7185]" : "bg-[#7f1d1d]"}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
