"use client";

const ZH_FONT =
  '"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';

const CHINA_GAMING_SECTIONS = [
  {
    title: "王者竞技场",
    description: "英雄对战锦标赛、排位赛与形象定制。",
    icon: "👑"
  },
  {
    title: "赛季通行证",
    description: "赛季奖励、等级进度与限定解锁。",
    icon: "🎫"
  },
  {
    title: "战场精英",
    description: "直播赛事、竞技活动与外观奖励。",
    icon: "⚔️"
  },
  {
    title: "创造者天地",
    description: "用户可创建房间并主持免费游玩体验。",
    icon: "🏯"
  },
  {
    title: "福运扭蛋",
    description: "限时收藏胶囊与特别季节掉落。",
    icon: "🎊"
  },
  {
    title: "每日财神",
    description: "每日登录连胜与免费游玩加成。",
    icon: "🧧"
  },
  {
    title: "消消乐园",
    description: "休闲解谜体验与免费挑战。",
    icon: "🧩"
  },
  {
    title: "三国争霸",
    description: "策略对战、阵营竞争与排行榜。",
    icon: "🐉"
  },
  {
    title: "精英赛事",
    description: "锦标赛、特别竞技与直播活动（免费预览）。",
    icon: "🏆"
  },
  {
    title: "甜蜜消除",
    description: "休闲匹配挑战与可收集强化道具。",
    icon: "🍬"
  }
] as const;

/** Paid/premium wording catalog for Command Center freeze */
export const CHINA_GAMING_HUB_FREEZE_NOTES = [
  "Season Pass premium unlocks",
  "Earn rewards / special offers monetization",
  "Premium tournaments paid entry (when enabled)",
  "Booster packs as paid IAPs (future)"
] as const;

/** China room gaming hub · Chinese copy */
export function RoomChinaGamingHub() {
  return (
    <section
      id="china-room-gaming-hub"
      className="room-china-gaming-hub country-room-section w-full overflow-hidden rounded-2xl border border-[#ff4466]/35 bg-[#18040e]/75 p-4 shadow-[0_0_40px_rgba(255,68,102,0.12)] backdrop-blur-md sm:p-5"
      aria-label="中国游戏中心"
      lang="zh-CN"
      style={{ fontFamily: ZH_FONT }}
    >
      <header className="mb-4 border-b border-[#ffb3c1]/15 pb-4">
        <p className="text-[10px] font-black tracking-[0.12em] text-[#ff8099]">🇨🇳 游戏中心</p>
        <h2 className="mt-1 text-xl font-black tracking-tight text-[#fff1f4] sm:text-2xl">中国游戏中心</h2>
        <p className="mt-1 text-sm text-[#fbb6c5]">
          竞技场、赛季免费游玩、创作者房间与休闲游戏。
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {CHINA_GAMING_SECTIONS.map((section, index) => (
          <article
            key={section.title}
            className="group rounded-xl border border-[#ffb3c1]/15 bg-[#300817]/55 p-3.5 transition-colors hover:border-[#ff8099]/45 hover:bg-[#480b20]/65"
          >
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#ff8099]/25 bg-[#ff4466]/10 text-lg" aria-hidden="true">
                {section.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-black tracking-[0.12em] text-[#ff8099]">
                  游戏 {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-0.5 text-sm font-black text-[#fff1f4]">{section.title}</h3>
                <p className="mt-1 text-xs leading-5 text-[#f5b7c4]">{section.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
