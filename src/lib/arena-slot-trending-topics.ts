/** Front 12 · trendy culture-exchange prompts · each nation's language */
export type ArenaSlotTrendTopic = {
  id: string;
  emoji: string;
  /** Primary line · native language */
  label: string;
  /** Short activity hint · often English for scanability */
  hint: string;
};

const slotPrompts = (
  code: string,
  prefix: string,
  items: Omit<ArenaSlotTrendTopic, "id">[]
): ArenaSlotTrendTopic[] =>
  items.map((item, index) => ({
    id: `${code}-${prefix}-${index}`,
    ...item
  }));

const cultureExchangeTopics = (code: string, topics: Omit<ArenaSlotTrendTopic, "id">[]) =>
  slotPrompts(code, "topic", topics);

export const arenaSlotTrendingTopicsByCode: Record<string, ArenaSlotTrendTopic[]> = {
  CO: cultureExchangeTopics("CO", [
    { emoji: "🌍", label: "Intercambiemos cultura · cuéntame tu país", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Cambiemos los chistes favoritos de tu país", hint: "Swap your country's funniest jokes" },
    { emoji: "💃", label: "Enséñame tus pasos · yo te muestro los míos", hint: "Let's exchange dance moves" },
    { emoji: "🍽️", label: "Arepas, bandeja o empanadas · ¿qué comes hoy?", hint: "Tonight's menu · food culture" }
  ]),
  UK: cultureExchangeTopics("UK", [
    { emoji: "🌍", label: "Let's exchange culture talk", hint: "Your country · my country · proud stories" },
    { emoji: "😂", label: "Swap your country's favourite jokes", hint: "Banter · punchlines · pub humour" },
    { emoji: "💃", label: "Let's exchange dance moves", hint: "Show me your steps · I'll show mine" },
    { emoji: "⚽", label: "Football banter · your club · match-day chat", hint: "Sunday league · Premier League vibes" }
  ]),
  LT: cultureExchangeTopics("LT", [
    { emoji: "🌍", label: "Pabandykime keistis kultūra · papasakok apie savo šalį", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Pasidalykime juokais iš savo šalies", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "Parodyk savo šokius · aš parodysiu savo", hint: "Let's exchange dance moves" },
    { emoji: "🎨", label: "Vilnius vakarai · kas šiandien populiaru?", hint: "Art · city · what's trending" }
  ]),
  EC: cultureExchangeTopics("EC", [
    { emoji: "🌍", label: "Intercambiemos cultura · tu país y el mío", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Compartamos los chistes favoritos de tu país", hint: "Swap your country's funniest jokes" },
    { emoji: "💃", label: "Pasillo · sanjuanito · cumbia · cambiemos pasos", hint: "Let's exchange dance moves" },
    { emoji: "🍲", label: "Encebollado · llapingachos · hornado · ¿qué cocinas?", hint: "Ecuadorian food culture tonight" }
  ]),
  TT: cultureExchangeTopics("TT", [
    { emoji: "🌍", label: "Ley we exchange culture talk · tell me bout your country", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Share yuh country favourite jokes · I go share mine", hint: "Swap your country's funniest jokes" },
    { emoji: "💃", label: "Exchange dance moves · soca, wine and your vibes", hint: "Let's exchange dance moves" },
    { emoji: "🥙", label: "Doubles debate · what yuh eating tonight?", hint: "Street food · lime culture" }
  ]),
  JM: cultureExchangeTopics("JM", [
    { emoji: "🌍", label: "Mek we exchange culture talk · wha yuh country like?", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Swap yuh country baddest jokes · mi have some too", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "Teach mi yuh dance moves · dancehall to yard", hint: "Let's exchange dance moves" },
    { emoji: "🎵", label: "Wi playlist swap · what's trending in your ends?", hint: "Music · vibes · sound clash" }
  ]),
  VE: cultureExchangeTopics("VE", [
    { emoji: "🌍", label: "Intercambiemos cultura y tradiciones", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Los mejores chistes de tu país · compartamos", hint: "Swap your country's funniest jokes" },
    { emoji: "💃", label: "Cambiemos pasos · merengue, salsa y tu ritmo", hint: "Let's exchange dance moves" },
    { emoji: "🌆", label: "Caracas de noche · qué está de moda hoy", hint: "City nights · what's trending" }
  ]),
  PL: cultureExchangeTopics("PL", [
    { emoji: "🌍", label: "Wymieńmy się kulturą · opowiedz o swoim kraju", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Zamieńmy się ulubionymi żartami", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "Pokaż swoje tańce · ja pokażę swoje", hint: "Let's exchange dance moves" },
    { emoji: "🏙️", label: "Warszawa live · co jest teraz na topie?", hint: "City · fashion · what's trending" }
  ]),
  TN: cultureExchangeTopics("TN", [
    { emoji: "🌍", label: "لنتبادل الحديث عن ثقافاتنا", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "لنتبادل أطرف نكات بلدك", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "لنتبادل حركات الرقص · أرني خطواتك", hint: "Let's exchange dance moves" },
    { emoji: "☕", label: "Échangeons nos traditions · thé, musique, ville", hint: "Culture · Tunis nights · trending" }
  ]),
  GY: cultureExchangeTopics("GY", [
    { emoji: "🌍", label: "Mek we exchange culture talk · wha yuh homeland like?", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "Share yuh country best jokes · ah got plenty", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "Swap dance moves · chutney, soca and your style", hint: "Let's exchange dance moves" },
    { emoji: "🍲", label: "Pepperpot stories · wha cooking in your country?", hint: "Food · family · home vibes" }
  ]),
  CN: cultureExchangeTopics("CN", [
    { emoji: "🌍", label: "来交换文化聊天吧 · 说说你的国家", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "说说你国家最好笑的笑话", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "交换舞步 · 我教你我的，你教我你的", hint: "Let's exchange dance moves" },
    { emoji: "🔥", label: "今晚流行什么 · 你的家乡故事", hint: "Trending · city · what's hot" }
  ]),
  JP: cultureExchangeTopics("JP", [
    { emoji: "🌍", label: "文化トークを交換しよう · あなたの国の話", hint: "Let's exchange culture talk" },
    { emoji: "😂", label: "各国のジョークを交換しよう", hint: "Swap your country's favourite jokes" },
    { emoji: "💃", label: "ダンスの動きを交換しよう", hint: "Let's exchange dance moves" },
    { emoji: "🌸", label: "今夜のトレンド · あなたの街の話", hint: "Trending · JAPAN · local culture" }
  ])
};

/** Favourite online games · viral talk-show & party games · per nation */
export const arenaSlotViralGamesByCode: Record<string, ArenaSlotTrendTopic[]> = {
  CO: slotPrompts("CO", "game", [
    { emoji: "🔫", label: "Free Fire · ranked con la sala", hint: "Colombia's most-played mobile battle royale" },
    { emoji: "🧱", label: "Roblox · parkour y roleplay viral", hint: "Top online worlds · TikTok viral games" },
    { emoji: "🍺", label: "Yo Nunca · juego de talk-show en vivo", hint: "Never have I ever · party talk-show classic" },
    { emoji: "🧠", label: "Preguntados · trivia en español", hint: "Trivia Crack · viral quiz showdown" }
  ]),
  UK: slotPrompts("UK", "game", [
    { emoji: "🎮", label: "Fortnite · squads tonight", hint: "UK favourite online battle royale" },
    { emoji: "⚽", label: "EA FC · Ultimate Team banter", hint: "Football game · match-day online" },
    { emoji: "🎭", label: "Would I Lie to You? · live talk-show game", hint: "BBC banter format · viral party version" },
    { emoji: "👽", label: "Among Us · pub crew lobby", hint: "Viral online party deduction game" }
  ]),
  LT: slotPrompts("LT", "game", [
    { emoji: "🎯", label: "Counter-Strike 2 · ranked vakar", hint: "Lithuania's top competitive online shooter" },
    { emoji: "⛏️", label: "Minecraft · serveriai ir build-off", hint: "Creative online worlds · viral builds" },
    { emoji: "📺", label: "Familiada · talk-show viktorina", hint: "Family Feud style · national TV game format" },
    { emoji: "🟣", label: "Among Us · vakarėlio kambarys", hint: "Viral online party game" }
  ]),
  EC: slotPrompts("EC", "game", [
    { emoji: "🏐", label: "Ecuavoley · partido en la cancha", hint: "Ecuador's three-player volleyball classic" },
    { emoji: "🔫", label: "Free Fire · sala ecuatoriana", hint: "Most viral mobile shooter in the region" },
    { emoji: "🍻", label: "Yo Nunca · talk-show de fiesta", hint: "Never have I ever · live party game" },
    { emoji: "⚽", label: "LigaPro · FIFA · banter online", hint: "Barcelona SC · Liga de Quito · football nights" }
  ]),
  TT: slotPrompts("TT", "game", [
    { emoji: "⚽", label: "FIFA · we playing tonight?", hint: "Caribbean football game nights online" },
    { emoji: "🎲", label: "Ludo King · family board online", hint: "Viral mobile board game in the Caribbean" },
    { emoji: "🃏", label: "All Fours · domino talk-show lime", hint: "Classic Caribbean card game · online tables" },
    { emoji: "👽", label: "Among Us · lime party lobby", hint: "Viral online party game" }
  ]),
  JM: slotPrompts("JM", "game", [
    { emoji: "🎯", label: "Call of Duty Mobile · ranked yard", hint: "Top mobile shooter online" },
    { emoji: "⚽", label: "FIFA · Premier League vibes online", hint: "Football game · online match chat" },
    { emoji: "🎲", label: "Ludo King · board game online", hint: "Viral Caribbean mobile classic" },
    { emoji: "🍺", label: "Never Have I Ever · talk-show yard game", hint: "Party talk-show game · live banter" }
  ]),
  VE: slotPrompts("VE", "game", [
    { emoji: "🔫", label: "Free Fire · ranked con el crew", hint: "Venezuela's viral mobile battle royale" },
    { emoji: "🧱", label: "Roblox · mundos virales", hint: "Online viral worlds · TikTok trends" },
    { emoji: "🧠", label: "Preguntados · trivia talk-show", hint: "Trivia Crack · quiz showdown" },
    { emoji: "👽", label: "Among Us · sala en vivo", hint: "Online party deduction game" }
  ]),
  PL: slotPrompts("PL", "game", [
    { emoji: "🎯", label: "Counter-Strike 2 · ranked online", hint: "Poland's favourite competitive shooter" },
    { emoji: "⛏️", label: "Minecraft · serwery i viral build", hint: "Creative online · trending servers" },
    { emoji: "📺", label: "Familiada · gra talk-show na żywo", hint: "Family Feud · national talk-show game" },
    { emoji: "🟣", label: "Among Us · imprezowy lobby", hint: "Viral online party game" }
  ]),
  TN: slotPrompts("TN", "game", [
    { emoji: "🔫", label: "PUBG Mobile · ranked Tunisie", hint: "Top mobile battle royale online" },
    { emoji: "🔥", label: "Free Fire · squad Maghreb", hint: "Viral mobile shooter in North Africa" },
    { emoji: "📺", label: "Khamsa w Khamsa · jeu talk-show viral", hint: "Classic Maghreb party talk-show game" },
    { emoji: "🧠", label: "لعبة المعلومات · trivia en ligne", hint: "Arabic viral quiz · online trivia" }
  ]),
  GY: slotPrompts("GY", "game", [
    { emoji: "🎲", label: "Ludo King · board game online", hint: "Viral mobile board game" },
    { emoji: "⚽", label: "FIFA · we kicking ball online", hint: "Football game nights" },
    { emoji: "🧱", label: "Roblox · viral challenge games", hint: "Online worlds · trending games" },
    { emoji: "🃏", label: "Dominoes · talk-show table lime", hint: "Caribbean domino classic · online tables" }
  ]),
  CN: slotPrompts("CN", "game", [
    { emoji: "🥋", label: "武术对练 · 今晚舞台", hint: "Wushu Duilian · choreographed duo sparring on live stage" },
    { emoji: "🌟", label: "原神 · 联机探索", hint: "Genshin Impact · viral online co-op" },
    { emoji: "🥚", label: "蛋仔派对 ·  viral 综艺游戏", hint: "Eggy Party · viral variety-style online game" },
    { emoji: "📺", label: "奔跑吧兄弟 · talk-show 游戏夜", hint: "Running Man style · viral talk-show games" }
  ]),
  JP: slotPrompts("JP", "game", [
    { emoji: "⚡", label: "モンスト · マルチクエスト", hint: "Monster Strike · Japan's #1 mobile online game" },
    { emoji: "📺", label: "バラエティトーク · しゃべくり系ゲーム", hint: "Variety talk-show games · viral TV format online" },
    { emoji: "⛏️", label: "マイクラ ·  viral サーバー", hint: "Minecraft · trending online servers" },
    { emoji: "🎯", label: "Monster Strike · co-op online", hint: "Monster Strike · viral mobile online RPG" }
  ])
};

export function getArenaSlotTrendingTopics(islandCode: string): ArenaSlotTrendTopic[] {
  return (
    arenaSlotTrendingTopicsByCode[islandCode] ??
    cultureExchangeTopics("INT", [
      { emoji: "🌍", label: "Let's exchange culture talk", hint: "Your country · stories · proud moments" },
      { emoji: "😂", label: "Swap your country's favourite jokes", hint: "Humour · banter · laugh together" },
      { emoji: "💃", label: "Let's exchange dance moves", hint: "Show your steps · learn mine" },
      { emoji: "✨", label: "What's trending in your city tonight?", hint: "Activities · music · local vibes" }
    ])
  );
}

export function getArenaSlotViralGames(islandCode: string): ArenaSlotTrendTopic[] {
  return (
    arenaSlotViralGamesByCode[islandCode] ??
    slotPrompts("INT", "game", [
      { emoji: "🎮", label: "Fortnite · squads tonight", hint: "Global viral online battle royale" },
      { emoji: "👽", label: "Among Us · party lobby", hint: "Viral online talk-party game" },
      { emoji: "🧠", label: "Trivia talk-show · live quiz", hint: "Viral quiz showdown format" },
      { emoji: "🎲", label: "Ludo King · board game online", hint: "Mobile board game · worldwide viral" }
    ])
  );
}
