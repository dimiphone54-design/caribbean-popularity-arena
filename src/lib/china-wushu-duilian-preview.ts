/** China room · octagon arena backdrop · 4K panel */
export const chinaWushuOctagonArena = {
  imageSrc: "/china-wushu-octagon-arena-4k.png",
  alt: "Octagon combat arena · blue spotlights"
} as const;

/** China room · real Wushu Duilian stage preview · 13th World Wushu Championships */
export const wushuDuilianStagePreview = {
  youtubeId: "ebcXHbpNygU",
  titleEn: "1st Place China · Duilian · 13th World Wushu Championships 2015",
  titleZh: "中国第一名 · 武术对练 · 2015世界武术锦标赛",
  detailEn: "Empty hand vs spear · Xiao Long Wu & Long Long Shi · score 9.73",
  detailZh: "徒手对练枪 · 吴小龙 · 石龙龙 · 9.73分",
  durationLabel: "1:34"
} as const;

/** China room · octagon cage · real-life Wushu Sanda combat (full contact) */
export const wushuCombatOctagonPreview = {
  youtubeId: "ggN_grtKONo",
  titleEn: "第十届散打世界杯 · 男子70公斤级决赛 · 武术实战",
  titleZh: "第十届散打世界杯 · 男子70公斤级决赛 · 武术实战",
  detailEn: "散打实战 · 拳腿摔 · 国际武联官方决赛",
  detailZh: "散打实战 · 拳腿摔 · 国际武联官方决赛",
  durationLabel: "8:19",
  badgeLabel: "4K · 武术实战"
} as const;

/** Full origin copy · Chinese · always shown under 4K octagon */
export const wushuDuilianOriginStory = {
  panelTitle: "武术对练",
  gameLabel: "武术对练 · Wushu Duilian",
  lead: "武术对练起源于古代中国，融合了军事训练与舞台表演娱乐。",
  sections: [
    {
      title: "军事渊源",
      body: "数千年前，士兵用编排好的器械套路安全练兵，既能训练又不互相伤害。"
    },
    {
      title: "戏曲与街头表演",
      body: "清朝时期，武者加入戏班，加入杂技与戏剧张力，面向大众表演。"
    },
    {
      title: "现代体育",
      body: "1958年，中国将其规范为非对抗性竞技项目，纳入国家武术体系。"
    }
  ]
} as const;

export function getWushuDuilianPreviewEmbedSrc(youtubeId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "1",
    loop: "1",
    playlist: youtubeId,
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    start: "0"
  });

  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}
