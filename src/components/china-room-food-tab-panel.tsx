"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import { isPublicDropshipVisible } from "@/lib/real-money";

const ZH_FONT =
  '"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';

const chinaFoodLanes = [
  { emoji: "🍵", label: "茶道 · 普通话卡片", hint: "散茶 · 茶杯 · 上海赛道" },
  { emoji: "🥟", label: "上海夜市 · 街头小吃", hint: "直播边吃边聊 · 舞台补给" },
  { emoji: "🍜", label: "面食赛道 · 脱口秀之夜", hint: "普通话游戏夜" },
  { emoji: "🫖", label: "茶具套装 · 文化赛道", hint: "茶友 · 上海文化" }
] as const;

const marketplaceCollectionsFree = [
  {
    emoji: "🍵",
    title: "茶道文化",
    description: "优质中国茶与茶道必备，供全球发现。",
    items: [
      "优质中国茶",
      "茶道套装",
      "手工茶壶",
      "传统茶杯与配件",
      "礼盒精选（浏览）",
      "茶会故事"
    ]
  },
  {
    emoji: "🥟",
    title: "上海街头厨房",
    description: "街头美食主理人、地方风味与直播烹饪体验。",
    items: [
      "上海街头小吃",
      "饺子",
      "面条",
      "小食",
      "地方特色",
      "主厨配方"
    ]
  },
  {
    emoji: "📦",
    title: "中国美食礼盒",
    description: "可探索、可烹饪、可分享的文化美食体验。",
    items: [
      "上海早餐礼盒",
      "新春礼盒",
      "茶与小食组合",
      "地方菜系礼盒",
      "烹饪食材包"
    ]
  }
] as const;

/** Money catalog for Command Center freeze */
export const CHINA_FOOD_FREEZE_CATALOG = {
  panelTitle: "🇨🇳 China food · tea · street kitchen · kits",
  publicStatus: "LIVE free culture browse · shop/seller money removed",
  room: "/rooms/china-room#china-food",
  freePublic: [
    "Tea ceremony · night market · noodle lanes",
    "Three culture collections · free discover lists",
    "Product tiles without prices when dropship frozen"
  ],
  frozenMoney: [
    "Business opportunities (storefronts, commissions, subscriptions)",
    "China Business Gateway advertising / become a seller",
    "Shop Tea & Food checkout links",
    "Food product USD prices on public panel"
  ],
  opportunitiesCatalog: [
    "Tea shops create storefronts · tea masters host ceremonies · brands promote · monthly tea clubs",
    "Restaurants join · chefs sell meal experiences · food creators build audiences · specialty orders",
    "Direct sales · seller commissions · subscription boxes"
  ],
  reopenNote: "Restore shop/seller CTAs + prices with dropship + real-money flags."
} as const;

export function getChinaFoodDropshipProducts() {
  return getAllDropshipProductsForCountry("china").filter((product) =>
    product.category.toLowerCase().includes("food")
  );
}

/** China room · food culture free · Chinese copy */
export function ChinaRoomFoodTabPanel() {
  const foodProducts = getChinaFoodDropshipProducts();
  const showShop = isPublicDropshipVisible();

  return (
    <div
      className="china-room-food-tab-panel space-y-2"
      lang="zh-CN"
      style={{ fontFamily: ZH_FONT }}
    >
      <section className="a2030-holo-panel country-room-section" aria-label="中国美食">
        <header className="text-center">
          <p className="text-[9px] font-black tracking-[0.12em] text-[#fbbf24]">
            中国美食 · 茶道 · 上海 · 免费浏览
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-wide text-[#eef6ff] sm:text-3xl">
            中国茶与街头厨房
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
            传统风味、现代美食创作者与茶文化 — 免费探索。
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {chinaFoodLanes.map((lane) => (
            <span
              key={lane.label}
              className="east-asia-game-chip east-asia-game-chip--china inline-flex max-w-full items-start gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold"
              role="listitem"
              title={lane.hint}
            >
              <span aria-hidden="true">{lane.emoji}</span>
              <span>{lane.label}</span>
            </span>
          ))}
        </div>

        <div id="china-food-marketplace" className="mt-5 grid gap-3 lg:grid-cols-3">
          {marketplaceCollectionsFree.map((collection) => (
            <article
              key={collection.title}
              className="rounded-2xl border border-[#fbbf24]/25 bg-[#090d1c]/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/10 text-xl"
                  aria-hidden="true"
                >
                  {collection.emoji}
                </span>
                <div>
                  <h3 className="text-sm font-black text-[#fff8dc]">{collection.title}</h3>
                  <p className="mt-1 text-[11px] leading-5 text-[#c4d4ef]/90">
                    {collection.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="text-[9px] font-black tracking-[0.12em] text-[#fbbf24]">
                  发现
                </p>
                <ul className="mt-2 space-y-1.5 text-[11px] text-[#e6edf9]">
                  {collection.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {showShop && foodProducts.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">
            {foodProducts.map((product) => (
              <figure
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#00f5ff]/20 bg-[#0f172a]/70"
              >
                <div className="relative aspect-[16/7] w-full sm:aspect-[5/2]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2">
                  <p className="text-[11px] font-bold text-[#eef6ff]">
                    {product.flag} {product.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{product.description}</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#b8ff3c]">
                    {product.currency} {product.price} · {product.shipsFrom}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : foodProducts.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {foodProducts.map((product) => (
              <figure
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#00f5ff]/20 bg-[#0f172a]/70"
              >
                <div className="relative aspect-[5/3] w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2">
                  <p className="text-[11px] font-bold text-[#eef6ff]">
                    {product.flag} {product.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{product.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
