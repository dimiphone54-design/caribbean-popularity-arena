import type { ContentLocaleId } from "@/lib/room-locale";
import { ecuadorTrendActivities } from "@/lib/ecuador-country";

export type CountryTrendActivity = {
  id: string;
  kicker?: { en: string; es?: string; esCO?: string; esEC?: string; ja?: string; zh?: string };
  label: { en: string; es: string; esCO?: string; esEC?: string; ja?: string; zh?: string };
  vibe: { en: string; es: string; esCO?: string; esEC?: string; ja?: string; zh?: string };
};

export type TrendPanelLocale = ContentLocaleId | "ja" | "zh" | "es-EC";

export const ecuadorTrendPanelUi = {
  pollBadge: "Encuesta",
  panelTitle: "Actividades tendencia",
  panelHint: "Ecuador · 5 cada uno",
  voiceTitle: "Voz AI",
  voiceHint: "Voz de bienvenida",
  scrollPollUp: "Desplazar encuesta arriba",
  scrollPollDown: "Desplazar encuesta abajo"
} as const;

export const japanTrendPanelUi = {
  pollBadge: "投票",
  panelTitle: "トレンドアクティビティ",
  panelHint: "日本 · 5つずつ",
  voiceTitle: "AIボイス",
  voiceHint: "ウェルカムボイス",
  scrollPollUp: "投票を上にスクロール",
  scrollPollDown: "投票を下にスクロール"
} as const;

export const chinaTrendPanelUi = {
  pollBadge: "投票",
  panelTitle: "趋势活动",
  panelHint: "中国 · 5项",
  voiceTitle: "AI语音",
  voiceHint: "欢迎语音",
  scrollPollUp: "向上滚动投票",
  scrollPollDown: "向下滚动投票"
} as const;

export const ukTrendActivities: CountryTrendActivity[] = [
  {
    id: "uk-pub-football",
    label: { en: "Pub football watch", es: "Fútbol en el pub", zh: "酒馆足球观赛" },
    vibe: { en: "Match day · pints · terrace chants", es: "Día de partido · pintas · cánticos", zh: "比赛日 · 品脱 · 看台口号" }
  },
  {
    id: "uk-sunday-roast",
    label: { en: "Sunday roast & park", es: "Roast dominical y parque", zh: "周日烤肉与公园" },
    vibe: { en: "Roast dinner · green walk · mates", es: "Roast · paseo verde · amigos", zh: "烤肉晚餐 · 绿地漫步 · 好友" }
  },
  {
    id: "uk-park-run",
    label: { en: "Park run Saturday", es: "Park run sábado", zh: "周六公园跑" },
    vibe: { en: "5K community · coffee after", es: "5K comunitario · café después", zh: "5公里社区 · 跑后咖啡" }
  },
  {
    id: "uk-gig-night",
    label: { en: "Gig & indie night out", es: "Noche de concierto indie", zh: "演出与独立音乐之夜" },
    vibe: { en: "Live band · last train · city lights", es: "Banda en vivo · último tren · luces", zh: "现场乐队 · 末班列车 · 城市灯火" }
  },
  {
    id: "uk-afternoon-tea",
    label: { en: "Afternoon tea run", es: "Té de la tarde", zh: "下午茶时光" },
    vibe: { en: "Tea rooms · high street · catch-up", es: "Salones de té · centro · charla", zh: "茶室 · 商业街 · 叙旧" }
  }
];

export const colombiaTrendActivities: CountryTrendActivity[] = [
  {
    id: "co-reggaeton-club",
    label: {
      en: "Reggaeton club night",
      es: "Noche de reggaetón",
      esCO: "Noche de reggaetón en el club"
    },
    vibe: {
      en: "Perreo · Medellín/Bogotá · late set",
      es: "Perreo · Medellín/Bogotá · tarde noche",
      esCO: "Perreo · Medellín/Bogotá · rumba hasta tarde"
    }
  },
  {
    id: "co-salsa-social",
    label: {
      en: "Salsa social",
      es: "Social de salsa",
      esCO: "Social de salsa"
    },
    vibe: {
      en: "Cali footwork · live band · dance floor",
      es: "Paso Cali · banda en vivo · pista",
      esCO: "Footwork de Cali · banda en vivo · pista de baile"
    }
  },
  {
    id: "co-arepa-tinto",
    label: {
      en: "Arepa & tinto morning",
      es: "Arepa y tinto mañanero",
      esCO: "Arepa y tinto mañanero"
    },
    vibe: {
      en: "Street arepas · café · barrio buzz",
      es: "Arepas calle · café · barrio vivo",
      esCO: "Arepas callejeras · café · barrio animado"
    }
  },
  {
    id: "co-futbol-asado",
    label: {
      en: "Fútbol + family BBQ",
      es: "Fútbol + asado familiar",
      esCO: "Fútbol + asado familiar"
    },
    vibe: {
      en: "Match on TV · grill · vallenato",
      es: "Partido en TV · parrilla · vallenato",
      esCO: "Partido en TV · parrilla · vallenato"
    }
  },
  {
    id: "co-ruta-paisa",
    label: {
      en: "Ruta paisa weekend",
      es: "Ruta paisa fin de semana",
      esCO: "Ruta paisa de fin de semana"
    },
    vibe: {
      en: "Mountains · bandeja paisa · road trip",
      es: "Montaña · bandeja paisa · carretera",
      esCO: "Montaña · bandeja paisa · viaje por carretera"
    }
  }
];

export type CountryTrendId = "uk" | "colombia" | "ecuador" | "japan" | "china";

export const chinaTrendActivities: CountryTrendActivity[] = [
  {
    id: "cn-wushu-duilian",
    label: { en: "Wushu Duilian stage", es: "Escenario Wushu Duilian", zh: "武术对练舞台" },
    vibe: { en: "Duo sparring · sword + staff · live arena", es: "Dúo · espada y bastón · arena", zh: "双人套路 · 剑棍 · 直播舞台" }
  },
  {
    id: "cn-shanghai-night",
    label: { en: "Shanghai night walk", es: "Paseo nocturno Shanghai", zh: "上海夜游" },
    vibe: { en: "Bund lights · neon · river breeze", es: "Luces del Bund · neón · río", zh: "外滩灯火 · 霓虹 · 江风" }
  },
  {
    id: "cn-tea-house",
    label: { en: "Tea house afternoon", es: "Tarde en casa de té", zh: "茶馆午后" },
    vibe: { en: "Jasmine tea · mahjong chat · old street", es: "Té jazmín · mahjong · calle vieja", zh: "茉莉花茶 · 麻将闲聊 · 老街" }
  },
  {
    id: "cn-kungfu-class",
    label: { en: "Kung fu morning class", es: "Clase matutina kung fu", zh: "晨练功夫" },
    vibe: { en: "Forms · breathing · park squad", es: "Formas · respiración · parque", zh: "套路 · 呼吸 · 公园小队" }
  },
  {
    id: "cn-talk-show-games",
    label: { en: "Talk-show game night", es: "Noche talk-show juegos", zh: "脱口秀游戏夜" },
    vibe: { en: "Variety games · Mandarin banter · live chat", es: "Juegos variedad · charla mandarín", zh: "综艺游戏 · 普通话互动 · 直播聊天" }
  }
];

export const japanTrendActivities: CountryTrendActivity[] = [
  {
    id: "jp-izakaya-sports",
    label: {
      en: "Izakaya sports watch",
      es: "Deportes en izakaya",
      ja: "居酒屋でスポーツ観戦"
    },
    vibe: {
      en: "Game night · yakitori · terrace cheer",
      es: "Noche de partido · yakitori · cánticos",
      ja: "試合の夜 · 焼き鳥 · テラス応援"
    }
  },
  {
    id: "jp-ramen-park",
    label: {
      en: "Sunday ramen & park",
      es: "Ramen dominical y parque",
      ja: "日曜ラーメンと公園"
    },
    vibe: {
      en: "Ramen bowl · green walk · mates",
      es: "Ramen · paseo verde · amigos",
      ja: "ラーメン · 緑の散歩 · 仲間"
    }
  },
  {
    id: "jp-park-run",
    label: {
      en: "Park run Saturday",
      es: "Park run sábado",
      ja: "土曜パークラン"
    },
    vibe: {
      en: "5K community · matcha after",
      es: "5K comunitario · matcha después",
      ja: "5Kコミュニティ · 後は抹茶"
    }
  },
  {
    id: "jp-live-house",
    label: {
      en: "Live house night out",
      es: "Noche en live house",
      ja: "ライブハウスナイト"
    },
    vibe: {
      en: "J-rock band · last train · city neon",
      es: "Banda en vivo · último tren · neón",
      ja: "Jロック · 終電 · 街のネオン"
    }
  },
  {
    id: "jp-kissaten",
    label: {
      en: "Kissaten afternoon run",
      es: "Tarde en kissaten",
      ja: "喫茶店アフタヌーン"
    },
    vibe: {
      en: "Coffee kissaten · shotengai · catch-up",
      es: "Café kissaten · calle comercial · charla",
      ja: "喫茶 · 商店街 · 近況トーク"
    }
  }
];

export function getCountryTrendPanelOrder(roomSlug: string): CountryTrendId[] {
  if (roomSlug.includes("japan")) return ["japan"];
  if (roomSlug.includes("china")) return ["china"];
  if (roomSlug.includes("colombia")) return ["colombia", "ecuador", "uk"];
  if (roomSlug.includes("ecuador")) return ["ecuador", "colombia", "uk"];
  if (
    roomSlug.includes("uk-flag") ||
    roomSlug.includes("football-lads") ||
    roomSlug.includes("cotswolds")
  ) {
    return ["uk", "ecuador", "colombia"];
  }
  return ["uk", "colombia", "ecuador"];
}

export function resolveTrendPanelLocale(roomSlug: string, locale: ContentLocaleId): TrendPanelLocale {
  if (roomSlug.includes("china")) return "zh";
  if (roomSlug.includes("japan")) return "ja";
  if (roomSlug.includes("colombia")) return "es-CO";
  if (roomSlug.includes("ecuador")) return "es-EC";
  return locale;
}

function isSpanishTrendLocale(locale: TrendPanelLocale) {
  return locale === "es" || locale === "es-CO" || locale === "es-EC";
}

export function pickTrendCopy(
  locale: TrendPanelLocale,
  activity: CountryTrendActivity
): { kicker?: string; label: string; vibe: string } {
  const pickKicker = () => {
    if (!activity.kicker) return undefined;
    if (locale === "zh" && activity.kicker.zh) return activity.kicker.zh;
    if (locale === "ja" && activity.kicker.ja) return activity.kicker.ja;
    if (locale === "es-CO") return activity.kicker.esCO ?? activity.kicker.es ?? activity.kicker.en;
    if (locale === "es-EC") return activity.kicker.esEC ?? activity.kicker.es ?? activity.kicker.en;
    if (isSpanishTrendLocale(locale)) return activity.kicker.es ?? activity.kicker.en;
    return activity.kicker.en;
  };

  if (locale === "zh" && activity.label.zh && activity.vibe.zh) {
    return { kicker: pickKicker(), label: activity.label.zh, vibe: activity.vibe.zh };
  }
  if (locale === "ja" && activity.label.ja && activity.vibe.ja) {
    return { kicker: pickKicker(), label: activity.label.ja, vibe: activity.vibe.ja };
  }
  if (locale === "es-CO") {
    return {
      kicker: pickKicker(),
      label: activity.label.esCO ?? activity.label.es,
      vibe: activity.vibe.esCO ?? activity.vibe.es
    };
  }
  if (locale === "es-EC") {
    return {
      kicker: pickKicker(),
      label: activity.label.esEC ?? activity.label.es,
      vibe: activity.vibe.esEC ?? activity.vibe.es
    };
  }
  const useSpanish = isSpanishTrendLocale(locale);
  return {
    kicker: pickKicker(),
    label: useSpanish ? activity.label.es : activity.label.en,
    vibe: useSpanish ? activity.vibe.es : activity.vibe.en
  };
}

export function getCountryTrendMeta(country: CountryTrendId, locale: TrendPanelLocale) {
  if (locale === "zh") {
    if (country === "uk") return { flag: "🇬🇧", title: "英国 · 趋势", kicker: "5项直播" };
    if (country === "ecuador") return { flag: "🇪🇨", title: "厄瓜多尔 · 趋势", kicker: "5项直播" };
    if (country === "japan") return { flag: "🇯🇵", title: "日本 · 趋势", kicker: "5项直播" };
    if (country === "china") return { flag: "🇨🇳", title: "中国 · 趋势", kicker: "5项直播" };
    return { flag: "🇨🇴", title: "哥伦比亚 · 趋势", kicker: "5项直播" };
  }

  if (country === "uk") {
    return isSpanishTrendLocale(locale)
      ? { flag: "🇬🇧", title: "UK · tendencias", kicker: "5 en vivo" }
      : { flag: "🇬🇧", title: "UK · trending", kicker: "5 live now" };
  }

  if (country === "ecuador") {
    return isSpanishTrendLocale(locale)
      ? { flag: "🇪🇨", title: "Ecuador · tendencias", kicker: "5 en vivo" }
      : { flag: "🇪🇨", title: "Ecuador · trending", kicker: "5 live now" };
  }

  if (country === "japan") {
    return isSpanishTrendLocale(locale)
      ? { flag: "🇯🇵", title: "Japan · tendencias", kicker: "5 en vivo" }
      : { flag: "🇯🇵", title: "Japan · trending", kicker: "5 live now" };
  }

  if (country === "china") {
    return isSpanishTrendLocale(locale)
      ? { flag: "🇨🇳", title: "China · tendencias", kicker: "5 en vivo" }
      : { flag: "🇨🇳", title: "China · trending", kicker: "5 live now" };
  }

  return isSpanishTrendLocale(locale)
    ? { flag: "🇨🇴", title: "Colombia · tendencias", kicker: "5 en vivo" }
    : { flag: "🇨🇴", title: "Colombia · trending", kicker: "5 live now" };
}

export function getActivitiesForCountry(country: CountryTrendId) {
  if (country === "uk") return ukTrendActivities;
  if (country === "ecuador") return ecuadorTrendActivities;
  if (country === "japan") return japanTrendActivities;
  if (country === "china") return chinaTrendActivities;
  return colombiaTrendActivities;
}

function countryTrendLabel(country: CountryTrendId, locale?: TrendPanelLocale) {
  if (locale === "zh") {
    if (country === "uk") return "英国";
    if (country === "colombia") return "哥伦比亚";
    if (country === "ecuador") return "厄瓜多尔";
    if (country === "china") return "中国";
    return "日本";
  }
  if (country === "uk") return "UK";
  if (country === "colombia") return "Colombia";
  if (country === "ecuador") return "Ecuador";
  if (country === "china") return "China";
  return "Japan";
}

export function getCountryTrendPanelHint(order: CountryTrendId[], locale: TrendPanelLocale) {
  if (locale === "ja") return japanTrendPanelUi.panelHint;
  if (locale === "zh") return chinaTrendPanelUi.panelHint;
  const names = order.map((country) => countryTrendLabel(country, locale)).join(" · ");
  return locale === "es" || locale === "es-CO" || locale === "es-EC" ? `${names} · 5 cada uno` : `${names} · 5 each`;
}

export function getCountryTrendPanelUi(roomSlug: string, locale: ContentLocaleId) {
  const trendLocale = resolveTrendPanelLocale(roomSlug, locale);
  if (trendLocale === "es-EC") {
    return {
      trendLocale,
      pollBadge: ecuadorTrendPanelUi.pollBadge,
      panelTitle: ecuadorTrendPanelUi.panelTitle,
      panelHint: "",
      voiceTitle: ecuadorTrendPanelUi.voiceTitle,
      voiceHint: ecuadorTrendPanelUi.voiceHint,
      scrollPollUp: ecuadorTrendPanelUi.scrollPollUp,
      scrollPollDown: ecuadorTrendPanelUi.scrollPollDown
    };
  }

  if (trendLocale === "ja") {
    return {
      trendLocale,
      pollBadge: japanTrendPanelUi.pollBadge,
      panelTitle: japanTrendPanelUi.panelTitle,
      panelHint: japanTrendPanelUi.panelHint,
      voiceTitle: japanTrendPanelUi.voiceTitle,
      voiceHint: japanTrendPanelUi.voiceHint,
      scrollPollUp: japanTrendPanelUi.scrollPollUp,
      scrollPollDown: japanTrendPanelUi.scrollPollDown
    };
  }

  if (trendLocale === "zh") {
    return {
      trendLocale,
      pollBadge: chinaTrendPanelUi.pollBadge,
      panelTitle: chinaTrendPanelUi.panelTitle,
      panelHint: chinaTrendPanelUi.panelHint,
      voiceTitle: chinaTrendPanelUi.voiceTitle,
      voiceHint: chinaTrendPanelUi.voiceHint,
      scrollPollUp: chinaTrendPanelUi.scrollPollUp,
      scrollPollDown: chinaTrendPanelUi.scrollPollDown
    };
  }

  const useSpanish = isSpanishTrendLocale(trendLocale);
  return {
    trendLocale,
    pollBadge: useSpanish ? "Encuesta" : "Poll",
    panelTitle: useSpanish ? "Actividades tendencia" : "Trend activities",
    panelHint: "",
    voiceTitle: useSpanish ? "Voz AI" : "AI Voice",
    voiceHint: useSpanish ? "Voz de bienvenida" : "Welcome voice",
    scrollPollUp: useSpanish ? "Desplazar encuesta arriba" : "Scroll poll up",
    scrollPollDown: useSpanish ? "Desplazar encuesta abajo" : "Scroll poll down"
  };
}

export function shouldShowCountryTrendPanel(pathname: string | null) {
  if (!pathname?.startsWith("/rooms/")) return false;
  if (pathname.includes("/rooms/international-suite")) return false;
  return true;
}

export function roomSlugFromPathname(pathname: string | null) {
  if (!pathname?.startsWith("/rooms/")) return "";
  return pathname.replace(/^\/rooms\/?/, "").split("/")[0] ?? "";
}

const roomsWithBottomDock = new Set([
  "comedy-fest",
  "football-lads",
  "uk-flag-cotswolds",
  "fashion-month",
  "the-elders-table"
]);

export function roomHasBottomDock(roomSlug: string) {
  return roomsWithBottomDock.has(roomSlug);
}
