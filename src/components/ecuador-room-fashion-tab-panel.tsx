"use client";

import Image from "next/image";
import { EcuadorCulture2028Panel } from "@/components/ecuador-culture-2028-panel";

const carnivalPhotos = [
  {
    src: "/ecuador-carnival-ready-1.jpg",
    alt: "Desfile del Carnaval de Ambato · Ecuador",
    label: "Desfile de Ambato"
  },
  {
    src: "/ecuador-carnival-ready-2.jpg",
    alt: "Diablada de Píllaro · traje de carnaval · Ecuador",
    label: "Diablada de Píllaro"
  },
  {
    src: "/ecuador-carnival-ready-3.jpg",
    alt: "Carnaval de Guaranda · Ecuador",
    label: "Carnaval de Guaranda"
  }
] as const;

const andesPhotos = [
  {
    src: "/ecuador-andes-artisan-1.jpg",
    alt: "Mercado artesanal de Otavalo · Andes · Ecuador",
    label: "Mercado de Otavalo"
  },
  {
    src: "/ecuador-andes-artisan-2.jpg",
    alt: "Mercado de los Ponchos · textiles tejidos · Ecuador",
    label: "Mercado de los Ponchos"
  },
  {
    src: "/ecuador-culture-otavalo-artisan-market.png",
    alt: "Puestos del mercado de Otavalo · artesanía tradicional",
    label: "Puestos artesanales"
  }
] as const;

const coastCityPhotos = [
  {
    src: "/ecuador-coast-city-1.jpg",
    alt: "Malecón de Guayaquil · costa del Pacífico · Ecuador",
    label: "Malecón de Guayaquil"
  },
  {
    src: "/ecuador-coast-city-2.jpg",
    alt: "Guayaquil frente al mar · ciudad costera · Ecuador",
    label: "Costa de Guayaquil"
  },
  {
    src: "/ecuador-coast-city-3.jpg",
    alt: "Centro histórico de Quito · elegancia andina",
    label: "Centro de Quito"
  }
] as const;

type RealLaneShowcaseProps = {
  kicker: string;
  emoji: string;
  title: string;
  body: string;
  bullets: readonly string[];
  cta: string;
  photos: readonly { src: string; alt: string; label: string }[];
  accentClass: string;
  borderClass: string;
};

function RealLaneShowcase({
  kicker,
  emoji,
  title,
  body,
  bullets,
  cta,
  photos,
  accentClass,
  borderClass
}: RealLaneShowcaseProps) {
  return (
    <article
      className={`relative z-10 mt-2 overflow-hidden rounded-[1.15rem] border bg-[#120818]/75 ${borderClass}`}
      aria-label={`${title} · moda y cultura de Ecuador`}
    >
      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid grid-cols-3 gap-1 p-2 sm:gap-1.5 sm:p-2.5">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`relative overflow-hidden rounded-lg border border-white/10 bg-black/40 ${
                index === 0 ? "col-span-2 row-span-2 min-h-[9.5rem] sm:min-h-[12rem]" : "min-h-[4.5rem] sm:min-h-[5.75rem]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? "(max-width:1024px) 66vw, 360px" : "(max-width:1024px) 33vw, 160px"}
                className="object-cover"
                priority={index === 0 && title.includes("Carnaval")}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#fef9c3] sm:text-[9px]">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
          <p className={`text-[9px] font-black uppercase tracking-[0.16em] ${accentClass}`}>{kicker}</p>
          <h3 className="mt-1.5 text-xl font-black text-[#fef9c3] sm:text-2xl">
            <span aria-hidden="true">{emoji} </span>
            {title}
          </h3>
          <p className="mt-2 text-[12px] leading-6 text-[#d7e3f6] sm:text-[13px]">{body}</p>
          <ul className="mt-3 space-y-1.5 text-[11px] leading-5 text-[#c4b89a]" role="list">
            {bullets.map((bullet) => (
              <li key={bullet} role="listitem">
                • {bullet}
              </li>
            ))}
          </ul>
          <p className="mt-3 inline-flex w-fit rounded-full border border-[#fcd116]/35 bg-[#fcd116]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#fcd116]">
            {cta}
          </p>
        </div>
      </div>
    </article>
  );
}

/** Ecuador room · Cultura y Moda · español ecuatoriano */
export function EcuadorRoomFashionTabPanel() {
  return (
    <div
      className="ecuador-room-fashion-tab-panel ecuador-moda-panel space-y-2"
      aria-label="Sala de cultura y moda de Ecuador"
      lang="es-EC"
    >
      <section className="country-room-section relative overflow-hidden rounded-[1.25rem] border border-[#fcd116]/35 bg-[radial-gradient(circle_at_top_right,rgba(252,209,22,0.12),transparent_40%),linear-gradient(145deg,rgba(22,10,28,0.94),rgba(4,10,8,0.96))] p-4 sm:p-5">
        <div className="absolute -right-10 -top-12 text-[10rem] opacity-[0.06]" aria-hidden="true">
          👗
        </div>

        <header className="relative z-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
            🇪🇨 Sala Ecuador
          </p>
          <h2 className="mt-1.5 font-['Bebas_Neue',sans-serif] text-2xl tracking-[0.06em] text-[#fef9c3] sm:text-3xl md:text-4xl">
            Cultura y moda de Ecuador
          </h2>
          <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#67e8f9]">
            Carnaval · artesanía · vibra costera
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#d4d4d8]">
            Métete en el estilo y la herencia del Ecuador — cultura gratis de creadores locales.
          </p>
        </header>

        <RealLaneShowcase
          kicker="Ecuador real · cultura en vivo"
          emoji="🎭"
          title="Listos pa'l carnaval"
          body="Colores de fiesta, looks de desfile y pura energía de calle — pista cultural gratis."
          bullets={[
            "Desfile del carnaval de Ambato · color de calle real",
            "Diablada de Píllaro · energía del traje",
            "Carnaval de Guaranda · espíritu de fiesta andina"
          ]}
          cta="Cultura de fiesta · explorar gratis"
          photos={carnivalPhotos}
          accentClass="text-[#ff7ad9]"
          borderClass="border-[#ff2bd6]/30"
        />

        <RealLaneShowcase
          kicker="Ecuador real · Otavalo · Andes"
          emoji="🧵"
          title="Artesanía andina"
          body="Textiles tejidos a mano, patrones de Otavalo y moda cultural auténtica."
          bullets={[
            "Mercado artesanal de Otavalo · montañas andinas",
            "Mercado de los Ponchos · herencia tejida",
            "Patrones tradicionales · moda cultural"
          ]}
          cta="Hecho a mano · pista de moda cultural"
          photos={andesPhotos}
          accentClass="text-[#86efac]"
          borderClass="border-[#22c55e]/30"
        />

        <RealLaneShowcase
          kicker="Ecuador real · Pacífico · capital"
          emoji="👗"
          title="Costa y ciudad"
          body="El flow nocturno de Guayaquil se encuentra con la elegancia diurna de Quito — looks ecuatorianos modernos con alma."
          bullets={[
            "Malecón de Guayaquil · energía de la costa",
            "Estilo de ciudad costera · flow de noche",
            "Centro de Quito · elegancia de la capital andina"
          ]}
          cta="Looks modernos con alma · de la costa a la capital"
          photos={coastCityPhotos}
          accentClass="text-[#67e8f9]"
          borderClass="border-[#00c9a7]/30"
        />
      </section>

      <EcuadorCulture2028Panel />
    </div>
  );
}
