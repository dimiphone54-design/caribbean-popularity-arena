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
    kicker: "🇨🇳 中国研学 · 上海校园",
    title: "中国研学 · 上海 · 未来课堂",
    description: "面向学生、旅行者、语言学习者、教师与中国文化探索者的数字校园。",
    lanes: [
      { emoji: "📖", label: "普通话 · 直播课堂", hint: "上海舞台 · 口语练习" },
      { emoji: "🖌️", label: "书法 · 文化研学", hint: "传统文脉 · 现代舞台" },
      { emoji: "💻", label: "编程 · 科技研学", hint: "霓虹城市 · 技能路线" },
      { emoji: "🍵", label: "茶艺 · 静心自习", hint: "茶文化 · 专注时段" }
    ]
  },
  japan: {
    kicker: "日本学習ハブ · 東京 · ライブキャンパス",
    title: "日本 · 学習ハブ",
    description: "抹茶フォーカス · 語学ドリル · アリーナ学習ナイト。",
    lanes: [
      { emoji: "📘", label: "日本語 · ライブドリル", hint: "漢字 · 会話レーン" },
      { emoji: "🎋", label: "抹茶フォーカス · 静かなデスク", hint: "ミニマル自習 · ステージの静けさ" },
      { emoji: "⚔️", label: "剣道の規律 · 学習の心得", hint: "集中 · ルーティンレーン" },
      { emoji: "💡", label: "テック · カルチャーノート", hint: "日本発 · ライブまとめ" }
    ]
  },
  colombia: {
    kicker: "Estudio Colombia · campus gratis · Bogotá",
    title: "Colombia · Centro de estudio",
    description:
      "Campus gratis: clases, amigos, vida universitaria y tips de estudio para la sala Colombia — sin asientos de pago en público.",
    lanes: [
      { emoji: "🎓", label: "Vida en campus · clases en vivo", hint: "Bogotá · Medellín · únete gratis" },
      { emoji: "📱", label: "Tips de estudio · pista creator", hint: "Temas del asistente · Q&A en vivo gratis" },
      { emoji: "🎵", label: "Pausa de salsa · reset de foco", hint: "Ritmo · de vuelta a los libros" },
      { emoji: "☕", label: "Café estudio · arepa fuel", hint: "Repaso de madrugada · círculo gratis" }
    ]
  },

  ecuador: {
    kicker: "🇪🇨 Centro de estudio · Quito · Guayaquil",
    title: "Centro de estudio Ecuador",
    description:
      "Aprendizaje en vivo con profes reales — enfoque andino, escritorios nocturnos de la costa, círculos de ensayo y tutorías.",
    lanes: [
      { emoji: "🏔️", label: "Campus Andes · Quito", hint: "Estilo universitario · concentración profunda" },
      { emoji: "📚", label: "Ensayo y conversación en español", hint: "Feedback en vivo · escritura · oralidad" },
      { emoji: "🌊", label: "Escritorio nocturno · Guayaquil", hint: "Clases de noche · productividad costera" },
      { emoji: "⚽", label: "Pausas de Ecuavóley", hint: "Estudio + cancha · profes de la comunidad" },
      { emoji: "👩‍🏫", label: "Profes y tutores", hint: "Profes certificados EC · sesiones 1:1" },
      { emoji: "🔐", label: "Acceso premium", hint: "Salas cerradas · grabaciones · tickets de clase" }
    ]
  }
};

/** Colombia Study Hub money · Command Center FREEZE COMING SOON only */
export const COLOMBIA_STUDY_HUB_FREEZE_CATALOG = {
  panelTitle: "🇨🇴 Colombia Study Hub · paid model",
  publicStatus: "LIVE free campus · money removed from public",
  room: "/rooms/colombia-room#colombia-study-hub",
  freePublic: [
    "Bogotá · Medellín campus life · free clases en vivo",
    "Study tips · salsa break · café estudio free circles",
    "No premium seats / paid tutoring on public panel"
  ],
  moneyLanes: [
    {
      label: "Premium tutoring",
      value: "Platform cut on paid 1:1 and group lessons"
    },
    {
      label: "Teacher listing",
      value: "Optional monthly teacher subscription to list on campus"
    },
    {
      label: "Premium student access",
      value: "Locked rooms · recordings · materials · monthly pass"
    },
    {
      label: "Ticketed workshops",
      value: "Commission on live class tickets and campus events"
    }
  ],
  reopenNote: "Restore premium Study Hub money UI when NEXT_PUBLIC_REAL_MONEY_ENABLED=true."
} as const;

export function getArenaSlotStudyHubPanel(countryId: string) {
  return studyHubByCountryId[countryId] ?? studyHubByCountryId.uk!;
}
