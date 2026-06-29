import {
  colombiaCoffeeSpotlightImage,
  colombiaHorseShowSpotlightImage
} from "@/lib/colombia-room-live";

const spotlightCards = [
  {
    id: "horse-show",
    badge: "Horse show",
    title: "Feria de Manizales",
    caption: "Colombia's biggest horse show · arena · paso fino",
    image: colombiaHorseShowSpotlightImage,
    accent: "border-amber-400/35"
  },
  {
    id: "coffee-spot",
    badge: "#1 Coffee spot",
    title: "People dining with coffee",
    caption: "Eje Cafetero · tables full · fresh cups · mountain aroma",
    image: colombiaCoffeeSpotlightImage,
    accent: "border-yellow-400/35"
  }
] as const;

export function ColombiaRoomSpotlightPhotos() {
  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {spotlightCards.map((card) => (
        <figure
          key={card.id}
          className={`colombia-room-spotlight-card relative overflow-hidden rounded-2xl border ${card.accent} bg-black/40 shadow-lg`}
        >
          <img
            src={card.image}
            alt=""
            className="aspect-[16/10] w-full object-cover sm:aspect-[4/3]"
            loading="eager"
            decoding="async"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#fda4af]">{card.badge}</p>
            <p className="mt-1 text-base font-bold text-white sm:text-lg">{card.title}</p>
            <p className="mt-1 text-[11px] leading-5 text-zinc-300 sm:text-xs">{card.caption}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
