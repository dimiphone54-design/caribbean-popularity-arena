"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const ZH_FONT =
  '"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';

const chinaFashionLanes = [
  { emoji: "👘", label: "上海街头风 · 霓虹赛道", hint: "东亚内容周边" },
  { emoji: "🧥", label: "赛博编辑 · 舞台灯光", hint: "上海供应链" },
  { emoji: "📱", label: "科技皮肤包 · 城市印花", hint: "手机皮肤 · 霓虹城市" },
  { emoji: "🛍️", label: "普通话直播 · 穿搭带货", hint: "中国房 · 代发赛道" }
] as const;

const chinaCultureHighlights = [
  { emoji: "👘", title: "汉服", detail: "传统轮廓混搭上海街头风格。", tone: "from-[#ff4466]/35 to-[#ff9a3d]/10" },
  { emoji: "🫖", title: "茶文化", detail: "茶馆、慢仪式与当代城市咖啡馆。", tone: "from-[#fbbf24]/30 to-[#84cc16]/10" },
  { emoji: "🖌️", title: "书法", detail: "笔触、文字艺术与平面印花表达。", tone: "from-[#a78bfa]/30 to-[#38bdf8]/10" },
  { emoji: "🦁", title: "舞狮", detail: "节庆节奏、色彩与狂欢能量。", tone: "from-[#fb7185]/35 to-[#fbbf24]/10" },
  { emoji: "🧧", title: "春节", detail: "红包、团圆与新年新气象。", tone: "from-[#ef4444]/35 to-[#f97316]/10" },
  { emoji: "🥟", title: "街头美食", detail: "夜市、共享餐桌与深夜风味。", tone: "from-[#f97316]/30 to-[#ec4899]/10" }
] as const;

/** China room · fashion · Chinese copy */
export function ChinaRoomFashionTabPanel() {
  const fashionProducts = getAllDropshipProductsForCountry("china").filter((product) =>
    product.category.toLowerCase().includes("fashion")
  );

  return (
    <div
      className="china-room-fashion-tab-panel space-y-2"
      lang="zh-CN"
      style={{ fontFamily: ZH_FONT }}
    >
      <section className="a2030-holo-panel country-room-section relative overflow-hidden" aria-label="中国时尚">
        <Image
          src="/china-great-wall-gift-gateway.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-center opacity-52"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,5,17,0.78),rgba(24,4,14,0.5),rgba(6,12,25,0.73))]" aria-hidden="true" />

        <div className="relative z-10">
          <header className="text-center">
            <p className="text-[9px] font-black tracking-[0.12em] text-[#fbbf24]">
              中国时尚 · 上海 · 街头风格
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-wide text-[#eef6ff] sm:text-3xl">
              中国 · 上海街头高级成衣
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
              东亚内容赛道周边、霓虹城市印花，以及为舞台准备的穿搭。
            </p>
          </header>

          <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
            {chinaFashionLanes.map((lane) => (
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

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#ff4466]/30 bg-[#10040d]/65 p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 text-[9px] font-black tracking-[0.12em] text-[#ff8099]">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4466] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8099]" />
                  </span>
                  文化脉搏直播 · 中国文化
                </p>
                <h3 className="mt-1 text-lg font-black tracking-tight text-[#fff1f4]">流动中的上海文化</h3>
              </div>
              <span className="rounded-full border border-[#fbbf24]/35 bg-[#fbbf24]/10 px-2.5 py-1 text-[9px] font-black tracking-[0.08em] text-[#fde68a]">
                6 个文化掉落
              </span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {chinaCultureHighlights.map((culture) => (
                <article
                  key={culture.title}
                  className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${culture.tone} p-3 transition duration-300 hover:-translate-y-1 hover:border-[#ff8099]/60 hover:shadow-[0_10px_28px_rgba(255,68,102,0.18)]`}
                >
                  <span className="absolute -right-2 -top-3 text-5xl opacity-15 transition-transform duration-300 group-hover:scale-125" aria-hidden="true">
                    {culture.emoji}
                  </span>
                  <div className="relative">
                    <span className="text-xl" aria-hidden="true">{culture.emoji}</span>
                    <h4 className="mt-2 text-sm font-black text-[#fff7f8]">{culture.title}</h4>
                    <p className="mt-1 text-[11px] leading-5 text-[#ffe0e5]/90">{culture.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {fashionProducts.length > 0 ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {fashionProducts.map((product) => (
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
        </div>
      </section>
    </div>
  );
}
