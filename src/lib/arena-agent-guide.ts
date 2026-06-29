import { formatArenaGiftAmount } from "@/lib/arena-gifts";
import { arenaLoungeRooms } from "@/lib/arena-lounge-rooms";
import { caribbeanFreedomArenaApp } from "@/lib/caribbean-freedom-arena-app";
import { countryRoomLiveAccessUsd, countryRoomLiveSessionHours } from "@/lib/country-room-access";
import { eldersTableGiftAmountUsd } from "@/lib/elders-table-gift-legal";
import { internationalSuiteCountries, internationalSuiteMeta } from "@/lib/international-suite";
import { legalDocuments } from "@/lib/legal-documents";

export type ArenaAgentGuideReply = {
  answer: string;
  topic: string;
};

type GuideEntry = {
  topic: string;
  keywords: string[];
  answer: string;
  priority?: number;
};

const SITE = caribbeanFreedomArenaApp.name;
const SITE_URL = "http://localhost:3004/#home";
const countryLiveGift = formatArenaGiftAmount(countryRoomLiveAccessUsd);
const eldersGift = formatArenaGiftAmount(eldersTableGiftAmountUsd);

const loungeList = arenaLoungeRooms.map((room) => `${room.label} (${room.href})`).join(" · ");
const countryNames = internationalSuiteCountries.map((c) => c.name).join(", ");
const builtRooms =
  "Colombia Room (/rooms/colombia-room) · Ecuador Room (/rooms/ecuador-room) · UK Cotswolds (/rooms/uk-flag-cotswolds) · Football Lads (/rooms/football-lads) · Japan Room (/rooms/japan-room) · China Room (/rooms/china-room)";
const legalCount = legalDocuments.length;

const guideEntries: GuideEntry[] = [
  {
    topic: "overview",
    priority: 2,
    keywords: [
      "what is",
      "about",
      "caribbean freedom",
      "caribbeanfreedomarena",
      "caribbean popularity",
      "this site",
      "this website",
      "tell me",
      "explain",
      "describe",
      "platform",
      "website",
      "2030",
      "cfa",
      "cfa arena",
      "freedom or nothing",
      "fan arena",
      "creator arena"
    ],
    answer: `${SITE} is a fan-powered creator arena — 12 Front 12 nation slots, island lounges, live voting, member gifts, and country rooms. Tagline: "${caribbeanFreedomArenaApp.tagline}" Start at ${SITE_URL} · scroll lounges · enter International SUITE · ask me anything here.`
  },
  {
    topic: "brand",
    keywords: ["name", "called", "brand", "title", "caribbeanfreedomarena", "popularity arena"],
    answer: `This website is ${SITE} (also Caribbean Popularity Arena in legal docs). Short name: ${caribbeanFreedomArenaApp.shortName}. It installs as an app (PWA) — same site, add to home screen. Home anchor: #home.`
  },
  {
    topic: "members-gender",
    keywords: [
      "man",
      "woman",
      "men",
      "women",
      "guy",
      "girl",
      "male",
      "female",
      "boy",
      "lady",
      "gentleman",
      "he ",
      "she ",
      "him",
      "her",
      "dating",
      "match",
      "relationship",
      "single"
    ],
    answer: `${SITE} is for adult fans 18+ — men and women welcome. Member Sign In (${countryLiveGift}) sets your arena username on this Welcome panel (e.g. WELCOME WEEZY). Gifts unlock digital platform access — not guaranteed matches or meetings. See /legal for full terms.`
  },
  {
    topic: "slots",
    keywords: [
      "slot",
      "12 slot",
      "front 12",
      "front12",
      "nation",
      "pending",
      "available",
      "sign in to slot",
      "player",
      "player sign-in",
      "countdown",
      "vote",
      "fire up",
      "like",
      "live 3 hour",
      "3 hour",
      "three hour",
      "broadcast",
      "on air"
    ],
    answer: `Front 12 SLOTS on #home — one open nation each (${countryNames}). Players sign in and go live for 3 hours. Fans vote, send $0 Complimentary Gift (like), and Fire Up. Open slots show SLOT · available. Tap a slot card to engage.`
  },
  {
    topic: "member-sign-in",
    keywords: [
      "member sign",
      "sign in",
      "sign up",
      "signup",
      "register",
      "login",
      "log in",
      "username",
      "welcome panel",
      "welcome we",
      "my name",
      "gift member",
      "6 gift",
      "6 usd",
      "$6",
      "bank panel",
      "member gift"
    ],
    answer: `Member Sign In · ${countryLiveGift} member preview on the homepage (top nav bank panel). Set arena username + language — your name appears on this Welcome · Guide screen (WELCOME YOURNAME). Gifts are for digital platform access — see /legal/refunds.`
  },
  {
    topic: "country-live-gift",
    keywords: [
      "country gift",
      "live gift",
      "games",
      "talk-show",
      "funny banter",
      "activities",
      "unlock room",
      "send gift",
      "country live",
      "intl gift",
      "colombia gift",
      "ecuador gift",
      "uk gift",
      "japan gift",
      "china gift",
      "revenue",
      "host split",
      "arena plus host"
    ],
    answer: `Country live gift: ${countryLiveGift} · one-click · ${countryRoomLiveSessionHours}h games · talk-show · activities per country lane. Button: "Send Gift · ${countryLiveGift} · games & talk-show". Legal link on every panel → /legal (gift terms · revenue disclosure). Built gated rooms: ${builtRooms}. All 12 countries on International SUITE cards.`
  },
  {
    topic: "rooms",
    keywords: ["room", "lounge", "where go", "enter", "navigate", "find room", "open room"],
    answer: `Homepage lounge scroll: ${loungeList}. International SUITE (/rooms/international-suite) lists all 12 nations. Full built rooms: ${builtRooms}. Inside rooms use gold "← Back to Arena" — country rooms also link back to International SUITE.`
  },
  {
    topic: "elders",
    keywords: ["elder", "elders table", "elders room", "jamaica", "chess", "100 gift", "$100"],
    answer: `The Elders Table (/rooms/the-elders-table) — Jamaica ×3 Caribbean Freedom Arena vibe. The Elders Room unlock: ${eldersGift} digital room access gift. Live win clips, chess, games panels. Plan card on #plans section.`
  },
  {
    topic: "comedy",
    keywords: ["comedy", "laugh", "fest", "joke", "funny"],
    answer: "Comedy Fest (/rooms/comedy-fest) — Laugh belly full · 10 games · live. Enter from the homepage lounge scroll."
  },
  {
    topic: "pair-league",
    keywords: ["pair", "league", "match", "his flag", "her flag", "couple"],
    answer: "Pair League (/rooms/the-pair-room) — His country and flag beside hers on every choice box. Pick your match · pair league protocol."
  },
  {
    topic: "fashion",
    keywords: ["fashion", "runway", "couture", "style", "month"],
    answer: "Fashion Month (/rooms/fashion-month) — Runway glam · street couture · live looks. From homepage lounge rail."
  },
  {
    topic: "island-hub",
    keywords: ["island hub", "island lounge", "hub", "central"],
    answer: "Island Hub (/rooms/island-hub) — Central holo-lounge · island flags. /rooms redirects here."
  },
  {
    topic: "international",
    keywords: [
      "international",
      "suite",
      "intl",
      "global",
      "country room",
      "12 nation",
      "12 country",
      "all countries"
    ],
    answer: `${internationalSuiteMeta.name} (/rooms/international-suite) — ${internationalSuiteMeta.description} Nations: ${countryNames}. Each card: live gift row · dropship enter · revenue split. UK + Colombia have dedicated multi-room lanes.`
  },
  {
    topic: "colombia",
    keywords: ["colombia", "colombian", "medellin", "bogota", "cartagena", "arepa", "salsa", "reggaeton"],
    answer: `Colombia Room (/rooms/colombia-room) — live gate · dropship · games · food · culture · romantic atmosphere · local clock. ${countryLiveGift} one-click live gift (romantic pink gate). Front 12 slot: Colombia on #home.`
  },
  {
    topic: "ecuador",
    keywords: ["ecuador", "ecuadorian", "quito", "ecuavoley", "andes"],
    answer: `Ecuador Room (/rooms/ecuador-room) — live gate · dropship · culture · food panels · voice welcome. ${countryLiveGift} live gift. Andes · Pacific coast · Amazon highlights on International SUITE card.`
  },
  {
    topic: "uk",
    keywords: ["uk", "united kingdom", "britain", "british", "cotswold", "cotswolds", "london", "england"],
    answer: "UK rooms: Cotswolds (/rooms/uk-flag-cotswolds) — park slideshow · museum · football · live gate · dropship · archive. Football Lads (/rooms/football-lads) — squad · match-day · live gate. Both use ${countryLiveGift} country live gift."
  },
  {
    topic: "football",
    keywords: ["football", "soccer", "lads", "manchester", "premier", "sunday league"],
    answer: "Football Lads (/rooms/football-lads) — Sunday league squad · pub banter · men's match-day prompts · UK football energy. Live gift gate + dropship market. UK clock top-right."
  },
  {
    topic: "trinidad",
    keywords: ["trinidad", "tobago", "tt", "soca", "port of spain", "carnival"],
    answer: "Trinidad & Tobago — Front 12 slot on #home · Soca · Port of Spain · Carnival energy. Header features exact TT flag-map island + Caribbean globe + white AI strobe beam. Platform timezone: America/Port_of_Spain."
  },
  {
    topic: "jamaica",
    keywords: ["jamaica", "jamaican", "dancehall", "kingston"],
    answer: "Jamaica — Front 12 slot + The Elders Table lounge (Jamaica ×3). Dancehall · Kingston · island vibes on International SUITE card."
  },
  {
    topic: "dropship",
    keywords: ["dropship", "shop", "buy", "product", "market", "merch", "store"],
    answer: "Dropship market (/rooms/dropship-market?country=*) — per-country product panels. Enter from International SUITE cards or inside built country rooms. Room layout shows dropship after live gate."
  },
  {
    topic: "creator",
    keywords: ["apply", "creator", "free apply", "waiting list", "upload", "become creator", "join creator"],
    answer: "Apply as Creator — Free from homepage top nav. Upload profile preview · pick island + category · join waiting list. No gift required to apply. Creator Circle plan on #plans is complimentary. Terms: /legal/creator-agreement."
  },
  {
    topic: "voting",
    keywords: ["vote", "voting", "ballot", "leaderboard", "rank", "boost", "fire"],
    answer: "Voting on #home Front 12 slots + #vote Voting Arena section + #leaderboard Creator Leaderboard. Boost packs available in slot modals. Votes shape arena rankings — digital engagement only."
  },
  {
    topic: "plans",
    keywords: ["plan", "membership", "premium", "arena plus", "elders table plan", "pricing", "price", "cost", "how much"],
    answer: `#plans — The Elders Table (${eldersGift} digital room access) · Arena Plus (Coming Soon · $0 Gift preview) · Creator Circle (Complimentary). Country live gifts: ${countryLiveGift} for ${countryRoomLiveSessionHours}h. Member sign-in preview: ${countryLiveGift}.`
  },
  {
    topic: "payment",
    keywords: ["pay", "payment", "fygaro", "wipay", "scotiabank", "card", "checkout", "billing", "money"],
    answer: `Payments run through Fygaro (Trinidad & Tobago) → Scotiabank settlement when live keys are set. Gifts — not purchases of individuals. Disclosures: /legal/refunds · /legal/terms. Demo mode works locally without real keys.`
  },
  {
    topic: "language",
    keywords: [
      "language",
      "english",
      "spanish",
      "español",
      "detect",
      "auto-detect",
      "auto detect",
      "speak",
      "translate",
      "locale"
    ],
    answer: "AI Auto-detect box (lower-right micro rail + footer) — detects English or Spanish from browser before sign-in, or from your language choice after Member Sign In. Room locale picker on country room pages. AI voice greeting optional."
  },
  {
    topic: "voice-ai",
    keywords: ["voice", "ai voice", "greeting", "speak to me", "talk", "audio", "sound"],
    answer: "AI Voice ON/OFF toggle on lower-right micro rail and footer. Welcome voice after Member Sign In when supported by your browser. Ask me here in text — I am the AI Agent guide for CaribbeanFreedomArena."
  },
  {
    topic: "welcome-guide",
    keywords: ["welcome", "guide", "ai agent", "ask", "this panel", "weezy", "rec", "help me", "agent guide"],
    answer: `This is Welcome · Guide — AI AGENT panel on the lower-right micro rail. Type any question about ${SITE} and press Ask. Quick chips: 12 slots · Member Sign In · Rooms · Help. Swipe sideways for Birthday BlessTime promo slide.`
  },
  {
    topic: "birthday",
    keywords: ["birthday", "bless", "bless time", "blesstime", "5 hour", "five hour", "promotion", "birthday girl", "cake", "wizard"],
    answer: "Birthday BlessTime — birthday girl gets 5 extra hours. Swipe Welcome · Guide panel sideways for promo slide (🧙‍♂️ 🎁 🎂). Full rules: /legal/birthday-promotion."
  },
  {
    topic: "install",
    keywords: ["install", "app", "pwa", "phone", "home screen", "download", "mobile", "ios", "android"],
    answer: `${SITE} installs as an app — Install App in top nav. PWA manifest + service worker (public/sw.js). Same site at ${SITE_URL}. Works best on HTTPS in production.`
  },
  {
    topic: "legal",
    keywords: [
      "legal",
      "terms",
      "privacy",
      "policy",
      "report",
      "abuse",
      "guidelines",
      "cookie",
      "law",
      "rules",
      "age",
      "18",
      "adult",
      "safe"
    ],
    answer: `Legal Center: /legal — ${legalCount} documents (terms, privacy, community, refunds, safety, cookies, creator agreement, birthday promo, etc.). Report Abuse in top nav → /legal/safety. Must be 18+ to use ${SITE}.`
  },
  {
    topic: "command-center",
    keywords: ["command center", "dashboard", "admin", "ops", "owner"],
    answer: "Command Center (/command-center) — owner panel when NEXT_PUBLIC_COMMAND_CENTER_ENABLED=true in .env.local. Stats · votes · arena ops preview."
  },
  {
    topic: "firebase",
    keywords: ["firebase", "auth", "database", "backend", "cloud"],
    answer: "Public member security panel (#firebase) — secure voting and fair rankings for members. Firebase env, collections, and pipeline wiring live in Command Center (/command-center) when NEXT_PUBLIC_COMMAND_CENTER_ENABLED=true. Set NEXT_PUBLIC_FIREBASE_* in .env.local for production."
  },
  {
    topic: "information-ai",
    keywords: ["information ai", "info ai", "ai page"],
    answer: "Information AI page at /information-ai — platform AI infrastructure overview."
  },
  {
    topic: "footer",
    keywords: ["footer", "bottom", "match panel", "perfect match", "join now"],
    answer: "Site footer — match photo panel + legal micro links (Terms · Privacy · Community · Refunds · Safety) + AI auto-detect + voice stack. Scroll to bottom of #home."
  },
  {
    topic: "nav",
    keywords: ["nav", "menu", "top bar", "header", "button", "link"],
    answer: "Top nav on #home: brand · island tabs · Apply as Creator · Member Sign In · Command Center/Dashboard (if enabled) · Install App · Report Abuse. Lounge scroll below hero for rooms."
  },
  {
    topic: "hello",
    keywords: ["hi", "hello", "hey", "yo", "good morning", "good evening", "sup", "whats up", "what up"],
    answer: `Hey — I am the ${SITE} AI Agent guide. Ask me about Front 12 slots, Member Sign In, rooms, country live gifts, birthday promo, legal, or install app. Type anything about this website.`
  },
  {
    topic: "help",
    keywords: ["help", "how", "guide", "what can", "what do", "confused", "lost", "start", "begin"],
    answer: `I guide you around ${SITE}. Try: "What are the 12 slots?" · "How do I sign in?" · "Colombia room?" · "How much is live gift?" · "Legal?" · "Install app?" Type anything — I auto-reply with exact site info.`
  }
];

export const arenaAgentGuideTips = [
  `Ask me anything about ${SITE} — slots, rooms, gifts, legal.`,
  "Type a question — I reply with exact website info.",
  "Try: How much is country live gift? · What rooms are open?",
  "Men and women 18+ — Member Sign In puts your name on Welcome.",
  "Quick chips below: 12 slots · Member Sign In · Rooms · Help."
] as const;

const richFallback = `${SITE} AI Agent guide — fan-powered creator arena with 12 Front 12 nation slots, lounges, International SUITE country rooms, ${countryLiveGift} live gifts (${countryRoomLiveSessionHours}h), and Member Sign In. Ask about: slots · rooms · Colombia · UK · Ecuador · gifts · legal · birthday promo · install app.`;

function normalizeGuideText(text: string) {
  return text
    .toLowerCase()
    .replace(/caribbeanfreedomarena/g, "caribbean freedom arena")
    .replace(/[^\w\s$?]/g, " ")
    .replace(/\?+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(query: string) {
  return query.split(" ").filter((word) => word.length >= 2);
}

function scoreEntry(query: string, tokens: string[], entry: GuideEntry) {
  let score = entry.priority ?? 0;

  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeGuideText(keyword);
    if (!normalizedKeyword) continue;

    if (query === normalizedKeyword) {
      score += 14;
      continue;
    }

    if (query.includes(normalizedKeyword)) {
      score += normalizedKeyword.split(" ").length >= 2 ? 9 : 5;
    }

    for (const word of normalizedKeyword.split(" ")) {
      if (word.length < 2) continue;
      if (tokens.includes(word)) score += 3;
      if (word.length >= 4) {
        for (const token of tokens) {
          if (token.startsWith(word) || word.startsWith(token)) score += 1;
        }
      }
    }
  }

  return score;
}

function pickReplies(query: string) {
  const tokens = tokenize(query);
  const ranked = guideEntries
    .map((entry) => ({ entry, score: scoreEntry(query, tokens, entry) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked;
}

function composeReply(ranked: ReturnType<typeof pickReplies>): ArenaAgentGuideReply | null {
  if (ranked.length === 0) return null;

  const best = ranked[0];
  if (best.score < 2) return null;

  const runner = ranked[1];
  if (runner && runner.score >= best.score - 2 && runner.score >= 4 && best.entry.topic !== runner.entry.topic) {
    return {
      topic: `${best.entry.topic}+${runner.entry.topic}`,
      answer: `${best.entry.answer} · ${runner.entry.answer}`
    };
  }

  return {
    topic: best.entry.topic,
    answer: best.entry.answer
  };
}

/** Arena Welcome AI Agent · keyword guide · auto-replies about CaribbeanFreedomArena. */
export function getArenaAgentGuideReply(question: string): ArenaAgentGuideReply {
  const query = normalizeGuideText(question);
  if (!query) {
    return { topic: "empty", answer: richFallback };
  }

  const composed = composeReply(pickReplies(query));
  if (composed) return composed;

  const tokens = tokenize(query);
  const mentionsBrand =
    tokens.some((t) => ["caribbean", "freedom", "arena", "cfa", "popularity", "freedomarena"].includes(t)) ||
    query.includes("caribbean freedom arena");

  if (mentionsBrand) {
    const overview = guideEntries.find((e) => e.topic === "overview");
    if (overview) {
      return {
        topic: "overview-fallback",
        answer: `${overview.answer} You asked: "${question.trim()}". Ask me something specific — rooms, gifts, slots, legal, or install.`
      };
    }
  }

  const weakMatches = pickReplies(query).filter((item) => item.score >= 1).slice(0, 2);
  if (weakMatches.length > 0) {
    return {
      topic: "partial",
      answer: weakMatches.map((item) => item.entry.answer).join(" · ")
    };
  }

  return {
    topic: "fallback",
    answer: `${richFallback} You asked: "${question.trim()}".`
  };
}

export function getArenaAgentGuideTip(index: number) {
  return arenaAgentGuideTips[index % arenaAgentGuideTips.length];
}
