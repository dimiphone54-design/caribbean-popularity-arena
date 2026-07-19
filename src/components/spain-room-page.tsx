"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RoomCountryGamesPanel } from "@/components/room-country-games-panel";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { isSpanishContentLocale } from "@/lib/room-locale";
import { getRoomGamesConfig } from "@/lib/room-games-registry";

const SPAIN_ROOM_BG = "#0a0408";

type SpainFood = {
  name: string;
  emoji: string;
  description: { es: string; en: string };
  origin: { es: string; en: string };
  /** Hover FX · steam · chocolate drip · cheese grate */
  steam?: boolean;
  chocolate?: boolean;
  cheese?: boolean;
};

type SpainTrend = {
  emoji: string;
  title: { es: string; en: string };
  accent: string;
  body: { es: string; en: string };
  stats: { es: string; en: string };
  image?: string;
  href?: string;
};

const SPAIN_FOODS: SpainFood[] = [
  {
    name: "Paella",
    emoji: "🥘",
    description: {
      es: "El arroz emblemático de España. En Valencia con pollo y conejo; en la costa, con marisco fresco. Se reconoce por el azafrán dorado y el socarrat crujiente del fondo de la paella.",
      en: "Spain's quintessential rice dish. Traditionally made in Valencia with chicken and rabbit, or coastal regions with fresh seafood, it is recognizable by its golden saffron color and the prized crispy layer at the bottom of the pan."
    },
    origin: { es: "Valencia", en: "Valencia" },
    steam: true
  },
  {
    name: "Jamón Ibérico",
    emoji: "🥩",
    description: {
      es: "Jamón curado premium de cerdos ibéricos de bellota en libertad: textura que se deshace y sabor intenso y salado.",
      en: "A premium cured ham made from acorn-fed free-range Iberian pigs, known for its rich, melt-in-the-mouth texture and savory flavor."
    },
    origin: { es: "Extremadura y Huelva", en: "Extremadura & Huelva" },
    steam: true
  },
  {
    name: "Tortilla Española",
    emoji: "🥚",
    description: {
      es: "La tortilla de patatas: gruesa y contundente, solo con huevos, patatas y a menudo cebolla pochada a fuego lento.",
      en: "Often called a Spanish omelette, this thick and hearty dish is made simply with eggs, potatoes, and often slowly cooked onions."
    },
    origin: { es: "Todo el país", en: "Nationwide" }
  },
  {
    name: "Croquetas",
    emoji: "🧀",
    description: {
      es: "Frituras crujientes con bechamel espesa rellena de jamón, pollo o setas silvestres.",
      en: "Crispy, deep-fried fritters featuring a thick béchamel base stuffed with ingredients like diced jamón (ham), chicken, or wild mushrooms."
    },
    origin: { es: "Todo el país", en: "Nationwide" },
    cheese: true
  },
  {
    name: "Gazpacho Andaluz",
    emoji: "🍅",
    description: {
      es: "Sopa fría andaluza de tomate, pepino, pimiento, ajo, aceite de oliva y vinagre: fresca y perfecta en verano.",
      en: "A refreshing, cold-blended soup from Andalusia, made with ripe tomatoes, cucumbers, bell peppers, garlic, olive oil, and vinegar."
    },
    origin: { es: "Andalucía", en: "Andalucía" }
  },
  {
    name: "Patatas Bravas",
    emoji: "🥔",
    description: {
      es: "Tapa clásica de patatas fritas crujientes con salsa brava ahumada y un hilo de alioli.",
      en: "A staple tapa of crispy fried potato cubes, typically topped with a spicy, smoky tomato sauce and a drizzle of aioli."
    },
    origin: { es: "Madrid y todo el país", en: "Madrid & Nationwide" },
    steam: true
  },
  {
    name: "Gambas al Ajillo",
    emoji: "🦐",
    description: {
      es: "Gambas al estilo español, chisporroteando en cazuela de barro con aceite de oliva, ajo y un toque de guindilla.",
      en: "Spanish-style garlic shrimp, sizzling in a clay pot filled with high-quality olive oil, plenty of garlic, and a touch of chili."
    },
    origin: { es: "Andalucía y costa", en: "Andalucía & Coast" },
    steam: true
  },
  {
    name: "Pimientos de Padrón",
    emoji: "🫑",
    description: {
      es: "Pequeños pimientos verdes, casi todos suaves pero con algún picante; salteados en aceite y sal gruesa.",
      en: "Small, green frying peppers, mostly mild but with an occasional spicy kick, blistered in olive oil and generously sprinkled with coarse sea salt."
    },
    origin: { es: "Padrón, Galicia", en: "Padrón, Galicia" }
  },
  {
    name: "Churros con Chocolate",
    emoji: "🍫",
    description: {
      es: "Masa frita en crestas gruesas, servida con un chocolate a la taza espeso y caliente.",
      en: "A beloved fried-dough pastry, typically shaped into thick ridges and served alongside a cup of thick, rich, hot drinking chocolate."
    },
    origin: { es: "Madrid", en: "Madrid" },
    chocolate: true
  },
  {
    name: "Fabada Asturiana",
    emoji: "🫘",
    description: {
      es: "Estofado robusto de fabes de Asturias, cocido a fuego lento con chorizo, morcilla y tocino.",
      en: "A robust and comforting traditional bean stew from the Asturias region, slow-cooked with creamy white beans, chorizo, morcilla (blood sausage), and pork belly."
    },
    origin: { es: "Asturias", en: "Asturias" },
    steam: true
  }
];

const SPAIN_TRENDS: SpainTrend[] = [
  {
    emoji: "🤖",
    title: { es: "POTENCIA IA", en: "AI POWERHOUSE" },
    accent: "cyan",
    body: {
      es: "España se consolida como uno de los ecosistemas de IA y tecnología más dinámicos de Europa. Barcelona y Madrid atraen startups globales, capital riesgo récord y talento de primer nivel en inteligencia artificial, fintech, robótica y transformación digital.",
      en: "Spain is rapidly becoming one of Europe's most dynamic AI and technology ecosystems. Barcelona and Madrid are attracting global startups, record venture capital, and world-class talent, driving breakthroughs in artificial intelligence, fintech, robotics, and digital transformation."
    },
    stats: { es: "El próximo gigante de la innovación en Europa", en: "Europe's Next Innovation Giant" },
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    href: "/rooms/ai-powerhouse-room"
  },
  {
    emoji: "🏎️",
    title: { es: "Fiebre Formula 7", en: "Formula 7 Enthusiasm" },
    accent: "red",
    body: {
      es: "El Gran Premio de Madrid tiene al país en vilo. España ya dio al mundo a Fernando Alonso y Carlos Sainz — ahora trae la Formula 7 a casa, a la capital.",
      en: "The Madrid Grand Prix has the entire country buzzing. Spain already gave the world Fernando Alonso and Carlos Sainz — now they're bringing Formula 7 home to the capital."
    },
    stats: { es: "GP Madrid · obsesión nacional", en: "Madrid Grand Prix · National obsession" },
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80"
  },
  {
    emoji: "👗",
    title: { es: "Streetwear holgado", en: "Baggy Streetwear" },
    accent: "purple",
    body: {
      es: "Cortes oversized, pantalones cargo y zapatillas chunky dominan las calles. De Malasaña en Madrid al Raval en Barcelona, lo holgado es el nuevo uniforme.",
      en: "Oversized fits, cargo pants, and chunky sneakers have taken over Spanish streets. From Madrid's Malasaña to Barcelona's El Raval, baggy is the new uniform."
    },
    stats: { es: "Tendencia casual dominante · Gen Z", en: "Dominant casual trend · Gen Z driven" }
  },
  {
    emoji: "🛍️",
    title: { es: "Compra híbrida", en: "Hybrid Shopping" },
    accent: "yellow",
    body: {
      es: "El comprador español mezcla la cultura del mercado de siempre con entrega online ultrarrápida. Boutiques locales y plataformas digitales se funden en una sola experiencia.",
      en: "Spanish shoppers are blending the old-school market culture with lightning-fast online delivery. Local boutiques and digital platforms are merging into one seamless experience."
    },
    stats: { es: "Quick commerce + online · evolución retail", en: "Quick commerce + online · Retail evolution" }
  },
  {
    emoji: "🌿",
    title: { es: "Negocio sostenible", en: "Sustainable Business" },
    accent: "emerald",
    body: {
      es: "España se convierte en la potencia verde del sur de Europa. Huertos solares, corredores eólicos y startups clean-tech reescriben cómo el país hace negocio con el mundo.",
      en: "Spain is becoming southern Europe's green energy powerhouse. Solar farms, wind corridors, and clean-tech startups are reshaping how the country does business with the world."
    },
    stats: { es: "Energía renovable · comercio internacional", en: "Renewable energy · International trade" }
  },
  {
    emoji: "🏡",
    title: { es: "Gadgets smart home", en: "Smart Home Gadgets" },
    accent: "blue",
    body: {
      es: "Cocinas conectadas y gadgets del hogar automatizados vuelan de las estanterías. Bandejas térmicas eléctricas, robots de limpieza y planchas inteligentes son lo más vendido.",
      en: "Connected kitchens and automated household gadgets are flying off shelves across Spain. Electric warming trays, robotic cleaners, and smart irons are the hottest sellers."
    },
    stats: { es: "Categoría top · ola de automatización", en: "Top seller category · Automation wave" }
  }
];

export function SpainRoomPage() {
  const { locale } = useRoomLocale();
  const es = isSpanishContentLocale(locale);
  const pick = <T,>(pair: { es: T; en: T }) => (es ? pair.es : pair.en);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    html.style.backgroundColor = SPAIN_ROOM_BG;
    body.style.backgroundColor = SPAIN_ROOM_BG;
    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <main
        className="arena-2030 spain-room relative flex min-h-screen flex-col overflow-hidden"
        style={{ backgroundColor: SPAIN_ROOM_BG }}
        lang={es ? "es-ES" : "en"}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1583422409516-2895a77efded?w=2400&q=95&fit=crop&crop=center")',
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0408]/15 via-[#0a0408]/5 to-[#0a0408]/60" />
        <div className="absolute inset-0 z-0 bg-[#0a0408]/10" aria-hidden="true" />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <header className="text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="text-7xl sm:text-9xl drop-shadow-[0_0_30px_rgba(255,200,0,0.4)]">🇪🇸</span>
              </div>
              <h1 className="font-['Bebas_Neue',sans-serif] text-6xl tracking-[0.06em] text-white sm:text-8xl">
                <span className="bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-300 bg-clip-text text-transparent">
                  SPAIN
                </span>
              </h1>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.3em] text-yellow-400/80">
                La Roja · Viva España
              </p>
              <p className="mt-3 mx-auto max-w-2xl text-center text-sm font-medium not-italic leading-relaxed text-white/90 sm:text-base sm:leading-7">
                &ldquo;Nacimos entre la Sagrada Familia y las calles de Sevilla — flamenco en la sangre, paella en el alma, y el fuego Mediterráneo que nunca se apaga.&rdquo;
              </p>
            </header>

            {(() => {
              const spainGames = getRoomGamesConfig("spain-room");
              return spainGames ? (
                <section className="w-full" aria-label={es ? "Juegos de España" : "Spain Games"}>
                  <RoomCountryGamesPanel config={spainGames} />
                </section>
              ) : null;
            })()}

            <section className="w-full" aria-label={es ? "Comida española" : "Spanish Food"}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-900/20 via-[#0a0408]/90 to-yellow-900/20 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍽️</span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-yellow-300 sm:text-3xl">
                    {es ? "COCINA ESPAÑOLA" : "SPANISH KITCHEN"}
                  </h2>
                  <span className="ml-auto text-xs font-black uppercase tracking-wider text-red-400/70">
                    {es ? "Sabores de España" : "Flavors of Spain"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">
                  {es
                    ? "Alma mediterránea · orgullo regional · siglos de tradición"
                    : "Mediterranean soul · regional pride · centuries of tradition"}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SPAIN_FOODS.map((food) => (
                    <article
                      key={food.name}
                      className={`group relative rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-yellow-500/30 hover:bg-black/60${
                        food.steam || food.chocolate || food.cheese
                          ? " overflow-visible"
                          : " overflow-hidden"
                      }${food.steam ? " spain-food-steam-card" : ""}${
                        food.chocolate ? " spain-food-chocolate-card" : ""
                      }${food.cheese ? " spain-food-cheese-card" : ""}`}
                    >
                      <div className="relative z-[1] flex items-start gap-3">
                        <span className="spain-food-emoji relative inline-flex shrink-0 text-3xl leading-none">
                          {food.emoji}
                          {food.steam ? (
                            <span className="spain-food-steam" aria-hidden="true">
                              <span className="spain-food-steam-wisp spain-food-steam-wisp--1" />
                              <span className="spain-food-steam-wisp spain-food-steam-wisp--2" />
                              <span className="spain-food-steam-wisp spain-food-steam-wisp--3" />
                              <span className="spain-food-steam-wisp spain-food-steam-wisp--4" />
                            </span>
                          ) : null}
                          {food.chocolate ? (
                            <span className="spain-food-chocolate" aria-hidden="true">
                              <span className="spain-food-chocolate-drop spain-food-chocolate-drop--1" />
                              <span className="spain-food-chocolate-drop spain-food-chocolate-drop--2" />
                              <span className="spain-food-chocolate-drop spain-food-chocolate-drop--3" />
                              <span className="spain-food-chocolate-drop spain-food-chocolate-drop--4" />
                            </span>
                          ) : null}
                          {food.cheese ? (
                            <span className="spain-food-cheese" aria-hidden="true">
                              <span className="spain-food-cheese-flake spain-food-cheese-flake--1" />
                              <span className="spain-food-cheese-flake spain-food-cheese-flake--2" />
                              <span className="spain-food-cheese-flake spain-food-cheese-flake--3" />
                              <span className="spain-food-cheese-flake spain-food-cheese-flake--4" />
                              <span className="spain-food-cheese-flake spain-food-cheese-flake--5" />
                              <span className="spain-food-cheese-flake spain-food-cheese-flake--6" />
                            </span>
                          ) : null}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-white">{food.name}</h3>
                          <p className="mt-0.5 text-[10px] font-black uppercase tracking-wider text-yellow-400/70">
                            {pick(food.origin)}
                          </p>
                        </div>
                      </div>
                      <p className="relative z-[1] mt-2 text-[11px] leading-5 text-white/50">
                        {pick(food.description)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="w-full" aria-label={es ? "Tendencias España" : "Spain Trends"}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 via-[#0a0408]/90 to-red-900/20 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇪🇸</span>
                  <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-yellow-300 sm:text-3xl">
                    {es ? "ESPAÑA AHORA" : "SPAIN NOW"}
                  </h2>
                  <span className="ml-auto text-xs font-black uppercase tracking-wider text-red-400/70">
                    {es ? "Top tendencias 2026" : "Top Trends 2026"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">
                  {es
                    ? "Crecimiento económico · adopción digital · pulso cultural"
                    : "Economic growth · digital adoption · cultural pulse"}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SPAIN_TRENDS.map((trend) => {
                    const accentMap: Record<string, string> = {
                      cyan: "border-cyan-500/30 hover:border-cyan-400/50",
                      red: "border-red-500/30 hover:border-red-400/50",
                      purple: "border-purple-500/30 hover:border-purple-400/50",
                      yellow: "border-yellow-500/30 hover:border-yellow-400/50",
                      emerald: "border-emerald-500/30 hover:border-emerald-400/50",
                      blue: "border-blue-500/30 hover:border-blue-400/50"
                    };
                    const textMap: Record<string, string> = {
                      cyan: "text-cyan-400",
                      red: "text-red-400",
                      purple: "text-purple-400",
                      yellow: "text-yellow-400",
                      emerald: "text-emerald-400",
                      blue: "text-blue-400"
                    };
                    const title = pick(trend.title);
                    const card = (
                      <article
                        key={title}
                        className={`relative overflow-hidden rounded-xl border p-4 transition-all ${trend.image ? "min-h-[180px]" : ""} ${accentMap[trend.accent] ?? "border-white/10"}`}
                      >
                        {trend.image && (
                          <div
                            className="absolute inset-0 z-0"
                            style={{
                              backgroundImage: `url("${trend.image}")`,
                              backgroundSize: "cover",
                              backgroundPosition: "center"
                            }}
                          />
                        )}
                        {trend.image && (
                          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                        )}
                        <div className={`relative z-10 ${trend.image ? "" : "bg-black/40"}`}>
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{trend.emoji}</span>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-bold text-white">{title}</h3>
                              <p className={`mt-0.5 text-[10px] font-black uppercase tracking-wider ${textMap[trend.accent] ?? "text-white/50"}`}>
                                {pick(trend.stats)}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2 text-[11px] leading-5 text-white/50">
                            {pick(trend.body)}
                          </p>
                        </div>
                      </article>
                    );
                    return trend.href ? (
                      <Link key={title} href={trend.href} className="block">
                        {card}
                      </Link>
                    ) : (
                      card
                    );
                  })}
                </div>
              </div>
            </section>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
