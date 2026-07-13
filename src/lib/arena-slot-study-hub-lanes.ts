export type ArenaSlotStudyHubLane = {
  emoji: string;
  label: string;
  hint: string;
};

export type ArenaSlotStudyHubPanel = {
  kicker: string;
  title: string;
  description: string;
  lanes: ArenaSlotStudyHubLane[];
};

const studyHubByCountryId: Record<string, ArenaSlotStudyHubPanel> = {
  uk: {
    kicker: "UK study · London · campus lane",
    title: "United Kingdom · Study Hub",
    description: "Library lanes, campus life, and live study prompts wired for the UK room.",
    lanes: [
      { emoji: "📚", label: "London campus · library lane", hint: "Holland Park · study lounge" },
      { emoji: "🎓", label: "GCSE · A-Level prep hub", hint: "Exam season · live revision" },
      { emoji: "💻", label: "Remote study · arena desk", hint: "Cotswolds · quiet focus" },
      { emoji: "🗣️", label: "English practice circle", hint: "Speaking · essay prompts" }
    ]
  },
  china: {
    kicker: "中国研学 · 上海 · 直播课堂",
    title: "中国 · 学习中心",
    description: "直播课堂、普通话练习与上海研学路线，为中国房间而生。",
    lanes: [
      { emoji: "📖", label: "普通话 · 直播课堂", hint: "上海舞台 · 口语练习" },
      { emoji: "🖌️", label: "书法 · 文化研学", hint: "传统文脉 · 现代舞台" },
      { emoji: "💻", label: "编程 · 科技研学", hint: "霓虹城市 · 技能路线" },
      { emoji: "🍵", label: "茶艺 · 静心自习", hint: "茶文化 · 专注时段" }
    ]
  },
  japan: {
    kicker: "日本研学 · 東京 · ライブキャンパス",
    title: "日本 · 学習ハブ",
    description: "Matcha focus lanes, language drills, and arena study nights for the JAPAN room.",
    lanes: [
      { emoji: "📘", label: "日本語 · live drill", hint: "Kanji · conversation lane" },
      { emoji: "🎋", label: "Matcha focus · quiet desk", hint: "Minimal study · stage calm" },
      { emoji: "⚔️", label: "Kendo discipline · study ethic", hint: "Focus · routine lane" },
      { emoji: "💡", label: "Tech · culture notes", hint: "JAPAN wired · live recap" }
    ]
  },
  colombia: {
    kicker: "Estudio Colombia · campus · Bogotá",
    title: "Colombia · Centro de estudio",
    description: "Clases, amigos, campus life y tips de estudio para la sala Colombia.",
    lanes: [
      { emoji: "🎓", label: "Campus life · clases en vivo", hint: "Bogotá · Medellín wired" },
      { emoji: "📱", label: "Study tips · creator lane", hint: "Assistant topics · live Q&A" },
      { emoji: "🎵", label: "Salsa break · focus reset", hint: "Rhythm · return to books" },
      { emoji: "☕", label: "Café estudio · arepa fuel", hint: "Late-night revision" }
    ]
  },
  ecuador: {
    kicker: "Estudio Ecuador · Quito · campus",
    title: "Ecuador · Centro de estudio",
    description: "Energía de campus en los Andes, círculos de estudio en español y repaso en vivo para la sala Ecuador.",
    lanes: [
      { emoji: "🏔️", label: "Quito campus · Andes study", hint: "Altitude focus · library lane" },
      { emoji: "📚", label: "Español · essay circle", hint: "Live prompts · peer review" },
      { emoji: "🌊", label: "Guayaquil coast · night desk", hint: "Coastal calm · revision" },
      { emoji: "⚽", label: "Ecuavóley break · team study", hint: "Court energy · group prep" }
    ]
  }
};

export function getArenaSlotStudyHubPanel(countryId: string) {
  return studyHubByCountryId[countryId] ?? studyHubByCountryId.uk!;
}