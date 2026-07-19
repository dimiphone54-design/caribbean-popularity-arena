"use client";

const ZH_FONT =
  '"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';

/** Free public campus programs (money copy lives in FREEZE COMING SOON) */
const campusProgramsFree = [
  {
    emoji: "🎓",
    title: "直播课堂",
    subtitle: "🗣 学 · 教 · 免费加入",
    items: [
      "普通话课程 · 入门到进阶",
      "商务中文",
      "文化与烹饪课",
      "茶道课",
      "会话与发音练习室"
    ]
  },
  {
    emoji: "👩‍🏫",
    title: "教师创作者房间",
    subtitle: "创建你自己的学习房间",
    items: [
      "免费资料页 + 基础课程",
      "直播教室界面",
      "学生会话工具",
      "推广与预约工具（预览）",
      "主厨 · 茶艺师 · 导师"
    ]
  },
  {
    emoji: "🌏",
    title: "虚拟中国体验",
    subtitle: "文化房间 · 免费浏览",
    items: [
      "上海虚拟导览",
      "茶道体验",
      "中华烹饪工坊",
      "节庆与文化活动",
      "商务区漫步"
    ]
  },
  {
    emoji: "📜",
    title: "学习路径",
    subtitle: "可免费探索的轨道",
    items: [
      "中国探索者 1 级+",
      "普通话基础路径",
      "文化 · 美食 · 传统",
      "课程概览解锁",
      "结业证书（预览）"
    ]
  }
] as const;

/** Money catalog for Command Center FREEZE COMING SOON */
export const CHINA_STUDY_HUB_FREEZE_CATALOG = {
  panelTitle: "🇨🇳 China Study Hub · Shanghai Campus · paid model",
  publicStatus: "LIVE free culture campus · money removed from public",
  room: "/rooms/china-room#china-study-hub",
  freePublic: [
    "Shanghai campus header · free learn/teach/join copy",
    "Live classes · teacher rooms · virtual experiences · learning paths (culture browse)"
  ],
  campusProgramsPaid: [
    {
      title: "Paid Live Classes",
      footer: "Example: $20/class · teacher $17 · platform $3 service fee."
    },
    {
      title: "Teacher Creator Accounts",
      footer: "Monthly platform fee for premium teacher tools."
    },
    {
      title: "Virtual China Experiences",
      footer: "Users buy tickets · hosts run the show · campus takes a cut."
    },
    {
      title: "Certificates & Learning Paths",
      footer: "Pay for course access, certificates, and advanced levels."
    }
  ],
  platformLanes: [
    {
      title: "Business Partnerships",
      body: "Schools, orgs & companies pay for featured placement, sponsored classes, cultural events, and recruitment showcases."
    },
    {
      title: "Global Community Membership",
      body: "Premium members get unlimited language rooms, exclusive events, special communities, and member discounts."
    }
  ],
  revenueEngine:
    "Classes · creator plans · experience tickets · certificates · sponsorships · premium memberships.",
  reopenNote: "Restore paid footers + revenue engine when NEXT_PUBLIC_REAL_MONEY_ENABLED=true."
} as const;

/** China Study Hub · free public · Chinese copy */
export function ChinaStudyHubTabPanel() {
  return (
    <div
      className="china-study-hub-tab-panel space-y-2"
      lang="zh-CN"
      style={{ fontFamily: ZH_FONT }}
    >
      <section
        className="country-room-section relative overflow-hidden rounded-[1.25rem] border border-[#fbbf24]/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_36%),linear-gradient(135deg,rgba(35,8,22,0.92),rgba(7,17,38,0.9))]"
        aria-label="中国研学 · 上海校园"
      >
        <div className="absolute -right-12 -top-16 text-[11rem] opacity-[0.07]" aria-hidden="true">
          🎓
        </div>
        <div className="relative z-10">
          <header className="text-center">
            <p className="text-[10px] font-black tracking-[0.12em] text-[#fbbf24]">
              🇨🇳 中国研学 · 上海校园
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-wide text-[#fff7df] sm:text-3xl">
              中国研学 · 上海 · 未来课堂
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#d7e3f6]">
              一个实时校园：人们可以{" "}
              <span className="font-bold text-[#fff7df]">免费学习、教学与加入</span>
              。学生、旅行者、教师与文化探索者共享一座上海数字校园。
            </p>
          </header>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {campusProgramsFree.map((program) => (
              <article
                key={program.title}
                className="rounded-2xl border border-white/10 bg-[#050a18]/55 p-4 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/10 text-xl"
                    aria-hidden="true"
                  >
                    {program.emoji}
                  </span>
                  <div>
                    <h3 className="text-base font-black text-[#fff7df]">{program.title}</h3>
                    <p className="mt-0.5 text-[10px] font-black tracking-[0.1em] text-[#67e8f9]">
                      {program.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="mt-3 grid gap-1.5 text-[11px] leading-5 text-[#d7e3f6] sm:grid-cols-2">
                  {program.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
