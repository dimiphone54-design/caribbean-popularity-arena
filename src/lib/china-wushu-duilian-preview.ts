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
  titleEn: "IWUF 10th Sanda World Cup · Men's 70kg Final · Wushu Combat",
  titleZh: "第十届散打世界杯 · 男子70公斤级决赛 · 武术实战",
  detailEn: "Full-contact Sanda · punches, kicks & throws · IWUF official bout",
  detailZh: "散打实战 · 拳腿摔 · 国际武联官方决赛",
  durationLabel: "8:19",
  badgeLabel: "4K · WUSHU COMBAT"
} as const;

/** English origin copy · single octagon panel */
export const wushuDuilianOriginStory = {
  panelTitle: "Wushu Duilian",
  gameLabel: "Wushu Duilian · 武术对练",
  lead:
    "Wushu Duilian originated in ancient China as a blend of military training and theatrical entertainment.",
  sections: [
    {
      title: "Military Roots",
      body: "Thousands of years ago, soldiers used choreographed weapon routines to train troops safely without killing each other."
    },
    {
      title: "Opera & Street Theater",
      body: "During the Qing Dynasty, martial artists joined Chinese opera troupes, adding acrobatics and dramatic flair to entertain the public."
    },
    {
      title: "Modern Sport",
      body: "In 1958, China formalized it into a regulated, non-combat sport under the state's official Wushu system."
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
