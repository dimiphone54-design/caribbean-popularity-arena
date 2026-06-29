type PackageBillingCycle = "weekly" | "monthly";
import {
  type AiVoiceLanguage
} from "@/lib/ai-voice-language";
import { getArenaMasterCountryTitle, isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { localeToUtteranceLang, type RoomLocaleId } from "@/lib/room-locale";
import { formatWelcomeVoiceGreeting, formatArenaSiteWelcomeVoice } from "@/lib/member-username-storage";

function cleanName(username: string) {
  return username.trim().replace(/^@+/, "");
}

export type GreetingSegment = {
  text: string;
  rate: number;
  pitch: number;
  volume?: number;
  pauseAfterMs?: number;
};

export type RideStartVoiceInput = {
  memberName: string;
  driverName: string;
  driverCallsign: string;
  packageName: string;
  billingCycle: PackageBillingCycle;
};

/** Country room entry — welcome in the visitor's auto-detected room locale. */
export function buildCountryRoomWelcomeSegments(
  countryName: string,
  locale: RoomLocaleId
): GreetingSegment[] {
  const text = countryRoomWelcomeText(countryName, locale);

  return [
    {
      text,
      rate: 0.92,
      pitch: 1.02
    }
  ];
}

function countryRoomWelcomeText(countryName: string, locale: RoomLocaleId): string {
  const tag = locale.trim().toLowerCase().replace("_", "-");
  const language = tag.split("-")[0] ?? "en";
  const localizedCountry =
    language === "fr"
      ? "Colombie"
      : language === "de"
        ? "Kolumbien"
        : language === "pt"
          ? "Colômbia"
          : countryName;

  if (language === "es") {
    return `Bienvenida a ${localizedCountry}.`;
  }

  if (language === "pt") {
    return `Bem-vinda a ${localizedCountry}.`;
  }

  if (language === "fr") {
    return `Bienvenue en ${localizedCountry}.`;
  }

  if (language === "de") {
    return `Willkommen in ${localizedCountry}.`;
  }

  if (language === "it") {
    return `Benvenuta in ${localizedCountry}.`;
  }

  if (language === "nl") {
    return `Welkom in ${localizedCountry}.`;
  }

  return `Welcome to ${countryName}.`;
}

function resolveRoomLocaleUtteranceLang(locale: RoomLocaleId): string {
  return localeToUtteranceLang(locale);
}

function localeLanguageFamily(locale: RoomLocaleId): string {
  return locale.trim().toLowerCase().replace("_", "-").split("-")[0] ?? "en";
}

export async function speakCountryRoomWelcome(countryName: string, locale: RoomLocaleId) {
  await speakCountryRoomSegments(buildCountryRoomWelcomeSegments(countryName, locale), locale);
}

const COLOMBIA_ROOM_UTTERANCE_LANG = "es-CO";

/** Known Colombian / Latin American women's voices across browsers. */
const colombianWomanVoicePatterns = [
  /español de Colombia/i,
  /Spanish \(Colombia\)/i,
  /Google español de Colombia/i,
  /Colombia/i,
  /Salome/i,
  /Paulina/i,
  /Sabina/i,
  /Helena/i,
  /Elvira/i,
  /Monica/i,
  /Penelope/i,
  /Isabella/i,
  /Marcela/i,
  /Gloria/i,
  /Maria/i,
  /Soledad/i,
  /Luciana/i,
  /Google español de México/i,
  /Google español de Estados Unidos/i,
  /Google español/i,
  /español de México/i,
  /español de América/i,
  /Microsoft Sabina/i,
  /Microsoft Helena/i,
  /Microsoft Elvira/i,
  /female/i,
  /mujer/i
];

const spanishMaleVoicePatterns = [
  /male/i,
  /Jorge/i,
  /Diego/i,
  /Juan/i,
  /Carlos/i,
  /Pablo/i,
  /Enrique/i,
  /Tomás/i,
  /Raul/i,
  /Google español Male/i
];

/** Colombia Room — Bienvenido a Columbia · or El Maestro for owner. */
export function buildColombiaRoomWelcomeSegments(): GreetingSegment[] {
  if (isArenaPrimaryMasterRecognized()) {
    return [
      {
        text: getArenaMasterCountryTitle("colombia"),
        rate: 0.9,
        pitch: 1.06,
        volume: 1
      }
    ];
  }

  return [
    {
      text: "Bienvenido a Columbia.",
      rate: 0.88,
      pitch: 1.06
    }
  ];
}

function normalizeVoiceLang(lang: string) {
  return lang.trim().toLowerCase().replace("_", "-");
}

function isSpanishMaleVoice(name: string) {
  return spanishMaleVoicePatterns.some((pattern) => pattern.test(name));
}

function scoreColombianWomanVoice(voice: SpeechSynthesisVoice) {
  let score = 0;
  const lang = normalizeVoiceLang(voice.lang);
  const name = voice.name;

  if (lang === "es-co") score += 120;
  if (/colombia/i.test(name)) score += 100;
  if (lang === "es-419") score += 80;
  if (lang.startsWith("es-mx")) score += 70;
  if (colombianWomanVoicePatterns.some((pattern) => pattern.test(name))) score += 60;
  if (/female|mujer|woman/i.test(name)) score += 40;
  if (lang.startsWith("es-") && !lang.startsWith("es-es")) score += 25;
  if (/Paulina|Sabina|Salome|Monica|Penelope|Helena|Maria|Marcela|Isabella|Gloria/i.test(name)) score += 35;

  return score;
}

function pickColombianFemaleVoice(voices: SpeechSynthesisVoice[]) {
  const spanishWomen = voices.filter((voice) => {
    if (isAvoidedVoice(voice.name) || isSpanishMaleVoice(voice.name)) return false;
    if (!normalizeVoiceLang(voice.lang).startsWith("es")) return false;

    return (
      colombianWomanVoicePatterns.some((pattern) => pattern.test(voice.name)) ||
      isLikelyFemaleVoice(voice.name) ||
      normalizeVoiceLang(voice.lang) === "es-co" ||
      normalizeVoiceLang(voice.lang) === "es-419"
    );
  });

  if (spanishWomen.length > 0) {
    return [...spanishWomen].sort((a, b) => scoreColombianWomanVoice(b) - scoreColombianWomanVoice(a))[0]!;
  }

  const anySpanishNonMale = voices.filter(
    (voice) =>
      !isAvoidedVoice(voice.name) &&
      !isSpanishMaleVoice(voice.name) &&
      normalizeVoiceLang(voice.lang).startsWith("es")
  );

  if (anySpanishNonMale.length > 0) {
    return [...anySpanishNonMale].sort((a, b) => scoreColombianWomanVoice(b) - scoreColombianWomanVoice(a))[0]!;
  }

  return null;
}

async function speakColombiaRoomSegments(segments: GreetingSegment[]) {
  if (segments.length === 0 || !isAiVoiceSupported()) return;

  const synth = window.speechSynthesis;
  synth.cancel();
  synth.getVoices();

  const voices = await waitForVoices(4800);
  const voice = pickColombianFemaleVoice(voices);

  for (const segment of segments) {
    await speakSegmentWithLang(segment, voice, COLOMBIA_ROOM_UTTERANCE_LANG);
    if (segment.pauseAfterMs) {
      await delay(segment.pauseAfterMs);
    }
  }
}

export async function speakColombiaRoomWelcome() {
  await speakColombiaRoomSegments(buildColombiaRoomWelcomeSegments());
}

const ECUADOR_ROOM_UTTERANCE_LANG = "es-EC";

/** Ecuador Room — Bienvenidos a Ecuador · or El Maestro for owner. */
export function buildEcuadorRoomWelcomeSegments(): GreetingSegment[] {
  if (isArenaPrimaryMasterRecognized()) {
    return [
      {
        text: getArenaMasterCountryTitle("ecuador"),
        rate: 1.02,
        pitch: 1.12,
        volume: 1
      }
    ];
  }

  return [
    {
      text: "Bienvenidos a Ecuador.",
      rate: 1.05,
      pitch: 1.14,
      volume: 1
    }
  ];
}

async function speakEcuadorRoomSegments(segments: GreetingSegment[]) {
  if (segments.length === 0 || !isAiVoiceSupported()) return;

  const synth = window.speechSynthesis;
  synth.cancel();
  // Chrome can leave the engine paused after cancel()/navigation — force it awake.
  synth.resume();
  synth.getVoices();

  const voices = await waitForVoices(4800);
  const voice =
    pickColombianFemaleVoice(voices) ??
    voices.find((v) => v.lang.toLowerCase().startsWith("es")) ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
    voices[0] ??
    null;

  for (const segment of segments) {
    synth.resume();
    await speakSegmentWithLang(segment, voice, ECUADOR_ROOM_UTTERANCE_LANG);
    synth.resume();
    if (segment.pauseAfterMs) {
      await delay(segment.pauseAfterMs);
    }
  }
}

export async function speakEcuadorRoomWelcome() {
  await speakEcuadorRoomSegments(buildEcuadorRoomWelcomeSegments());
}

const countryRoomUtteranceLang: Record<string, string> = {
  colombia: "es-CO",
  ecuador: "es-EC",
  venezuela: "es-419",
  uk: "en-GB",
  japan: "ja-JP",
  china: "zh-CN",
  lithuania: "lt-LT",
  poland: "pl-PL",
  tunisia: "fr-FR",
  trinidad: "en-GB",
  jamaica: "en-GB",
  guyana: "en-GB"
};

function resolveCountryRoomName(countryId: string) {
  return internationalSuiteCountries.find((entry) => entry.id === countryId)?.name ?? countryId;
}

/** Any country room · master title or standard welcome. */
export function buildCountryRoomVoiceSegments(countryId: string, locale: RoomLocaleId = "en"): GreetingSegment[] {
  if (isArenaPrimaryMasterRecognized()) {
    return [
      {
        text: getArenaMasterCountryTitle(countryId),
        rate: 0.92,
        pitch: 1.06,
        volume: 1
      }
    ];
  }

  if (countryId === "colombia") return buildColombiaRoomWelcomeSegments();
  if (countryId === "ecuador") return buildEcuadorRoomWelcomeSegments();

  return buildCountryRoomWelcomeSegments(resolveCountryRoomName(countryId), locale);
}

async function speakCountryRoomVoiceSegments(segments: GreetingSegment[], countryId: string) {
  if (segments.length === 0 || !isAiVoiceSupported()) return;

  const synth = window.speechSynthesis;
  synth.cancel();
  synth.resume();
  synth.getVoices();

  const voices = await waitForVoices(4800);
  const utteranceLang = countryRoomUtteranceLang[countryId] ?? "en-US";
  const spanishLane = countryId === "colombia" || countryId === "ecuador" || countryId === "venezuela";
  const voice = spanishLane
    ? pickColombianFemaleVoice(voices)
    : voices.find((entry) => entry.lang.toLowerCase().startsWith(utteranceLang.split("-")[0] ?? "en")) ??
      voices[0] ??
      null;

  for (const segment of segments) {
    synth.resume();
    await speakSegmentWithLang(segment, voice, utteranceLang);
    synth.resume();
    if (segment.pauseAfterMs) {
      await delay(segment.pauseAfterMs);
    }
  }
}

export async function speakCountryRoomVoice(countryId: string, locale: RoomLocaleId = "en") {
  await speakCountryRoomVoiceSegments(buildCountryRoomVoiceSegments(countryId, locale), countryId);
}

/** Silently prime the speech engine on a user gesture so auto-greetings are allowed. */
export function primeAiVoice() {
  if (!isAiVoiceSupported()) return;
  try {
    const synth = window.speechSynthesis;
    synth.resume();
    const warmup = new SpeechSynthesisUtterance(" ");
    warmup.volume = 0;
    warmup.rate = 1;
    synth.speak(warmup);
  } catch {
    // no-op
  }
}

/** Arena entry — welcome voice matches panel (e.g. WELCOME DIMITRI). */
export function buildWelcomeSegments(username: string, language: AiVoiceLanguage = "en"): GreetingSegment[] {
  const text = formatWelcomeVoiceGreeting(username, language);
  if (!text) return [];

  const family = localeLanguageFamily(language);

  return [
    {
      text,
      rate: 0.94,
      pitch: ["es", "pt", "it", "fr"].includes(family) ? 1.08 : 1.06
    }
  ];
}

/** Site launch · other users · Welcome to Caribbean Freedom Arena. */
export function buildArenaSiteWelcomeSegments(language: AiVoiceLanguage = "en"): GreetingSegment[] {
  const text = formatArenaSiteWelcomeVoice(language);
  const family = localeLanguageFamily(language);

  return [
    {
      text,
      rate: 0.92,
      pitch: ["es", "pt", "it", "fr"].includes(family) ? 1.08 : 1.06
    }
  ];
}

/** He and she start the ride — welcome + weekly or monthly assigned driver. */
export function buildRideStartSegments(
  input: RideStartVoiceInput,
  language: AiVoiceLanguage = "en"
): GreetingSegment[] {
  const name = cleanName(input.memberName);
  if (!name) return [];

  const cycleLabel = input.billingCycle === "monthly" ? "monthly" : "weekly";
  const driverShort = input.driverName.replace(/^Agent\s+/i, "");
  const family = localeLanguageFamily(language);

  if (family === "es") {
    const cycleEs = input.billingCycle === "monthly" ? "mensual" : "semanal";
    return [
      {
        text: `Bienvenido, ${name}.`,
        rate: 0.95,
        pitch: 1.08,
        pauseAfterMs: 420
      },
      {
        text: `Tu conductor asignado del paquete ${cycleEs} ${input.packageName}, ${driverShort}, callsign ${input.driverCallsign}, está listo para este viaje en Trinidad.`,
        rate: 0.92,
        pitch: 1.05
      }
    ];
  }

  return [
    {
      text: `Welcome, ${name}.`,
      rate: 0.95,
      pitch: 1.06,
      pauseAfterMs: 420
    },
    {
      text: `Your ${cycleLabel} ${input.packageName} package driver, ${driverShort}, callsign ${input.driverCallsign}, is assigned for this ride.`,
      rate: 0.92,
      pitch: 1.04
    }
  ];
}

const premiumEnglishVoicePatterns = [
  /Samantha/i,
  /Karen/i,
  /Victoria/i,
  /Tessa/i,
  /Serena/i,
  /Kate/i,
  /Moira/i,
  /Fiona/i,
  /Google UK English Female/i,
  /Google US English/i,
  /Microsoft Sonia/i,
  /Microsoft Aria/i,
  /Microsoft Jenny/i,
  /Microsoft Zira/i,
  /Microsoft Hazel/i
];

const premiumSpanishVoicePatterns = [
  /Paulina/i,
  /Monica/i,
  /Microsoft Sabina/i,
  /Microsoft Helena/i,
  /Microsoft Elvira/i,
  /Google español/i,
  /español de México/i,
  /español de Colombia/i,
  /español de Estados Unidos/i,
  /Luciana/i,
  /Penelope/i,
  /Isabella/i
];

const premiumPortugueseVoicePatterns = [/Luciana/i, /Microsoft Francisca/i, /Google português do Brasil/i, /Portuguese \(Brazil\)/i];

const premiumFrenchVoicePatterns = [/Amélie/i, /Microsoft Denise/i, /Microsoft Julie/i, /Google français/i];

const premiumGermanVoicePatterns = [/Anna/i, /Microsoft Katja/i, /Google Deutsch/i];

const premiumItalianVoicePatterns = [/Alice/i, /Microsoft Elsa/i, /Google italiano/i];

const premiumDutchVoicePatterns = [/Ellen/i, /Microsoft Colette/i, /Google Nederlands/i];

const femaleVoiceNamePatterns = [
  /female/i,
  /woman/i,
  /Samantha/i,
  /Karen/i,
  /Victoria/i,
  /Tessa/i,
  /Serena/i,
  /Paulina/i,
  /Monica/i,
  /Sabina/i,
  /Helena/i,
  /Elvira/i,
  /Luciana/i,
  /Penelope/i,
  /Isabella/i,
  /Sonia/i,
  /Aria/i,
  /Jenny/i,
  /Kate/i,
  /Moira/i,
  /Fiona/i,
  /Francisca/i,
  /Amélie/i,
  /Denise/i,
  /Julie/i,
  /Katja/i,
  /Elsa/i,
  /Alice/i,
  /Ellen/i,
  /Colette/i,
  /Zira/i,
  /Hazel/i,
  /Veena/i,
  /Susan/i,
  /Allison/i,
  /Ava/i,
  /Emma/i
];

const maleVoiceNamePatterns = [
  /male/i,
  /\bman\b/i,
  /Daniel/i,
  /Jorge/i,
  /Fred/i,
  /Ralph/i,
  /Bruce/i,
  /Albert/i,
  /David/i,
  /James/i,
  /Tom/i,
  /Mark/i,
  /Oliver/i,
  /Google UK English Male/i
];

const avoidVoicePatterns = [/Fred/i, /Ralph/i, /Bruce/i, /Albert/i, /Bad News/i, /Bahh/i, /Bells/i, /Boing/i, /Cellos/i, /Junior/i, /Kathy/i, /Whisper/i];

function isAvoidedVoice(name: string) {
  return avoidVoicePatterns.some((pattern) => pattern.test(name));
}

function isLikelyFemaleVoice(name: string) {
  if (maleVoiceNamePatterns.some((pattern) => pattern.test(name))) return false;
  if (femaleVoiceNamePatterns.some((pattern) => pattern.test(name))) return true;
  return !/^(Daniel|Jorge|Fred|Ralph|Bruce|Albert|Tom|James|David|Mark|Oliver)\b/i.test(name);
}

function voiceMatchesLocale(voice: SpeechSynthesisVoice, utteranceLang: string) {
  const voiceLang = voice.lang.toLowerCase();
  const target = utteranceLang.toLowerCase();
  if (voiceLang === target) return true;

  const [language, region] = target.split("-");
  if (region && voiceLang.startsWith(`${language}-${region}`)) return true;

  return voiceLang.startsWith(`${language}-`);
}

function premiumPatternsForLocale(utteranceLang: string) {
  const language = utteranceLang.split("-")[0]?.toLowerCase() ?? "en";

  if (language === "es") return premiumSpanishVoicePatterns;
  if (language === "pt") return premiumPortugueseVoicePatterns;
  if (language === "fr") return premiumFrenchVoicePatterns;
  if (language === "de") return premiumGermanVoicePatterns;
  if (language === "it") return premiumItalianVoicePatterns;
  if (language === "nl") return premiumDutchVoicePatterns;

  return premiumEnglishVoicePatterns;
}

function pickLocalFemaleVoice(voices: SpeechSynthesisVoice[], locale: RoomLocaleId) {
  const utteranceLang = resolveRoomLocaleUtteranceLang(locale);
  const language = utteranceLang.split("-")[0]?.toLowerCase() ?? "en";
  const region = utteranceLang.split("-")[1]?.toLowerCase();
  const usable = voices.filter((voice) => !isAvoidedVoice(voice.name) && isLikelyFemaleVoice(voice.name));
  const patterns = premiumPatternsForLocale(utteranceLang);

  for (const pattern of patterns) {
    const match = usable.find((voice) => pattern.test(voice.name) && voiceMatchesLocale(voice, utteranceLang));
    if (match) return match;
  }

  for (const pattern of patterns) {
    const match = usable.find((voice) => pattern.test(voice.name));
    if (match) return match;
  }

  if (region) {
    const regional = usable.find((voice) => voice.lang.toLowerCase().startsWith(`${language}-${region}`));
    if (regional) return regional;
  }

  const languageMatch = usable.find((voice) => voice.lang.toLowerCase().startsWith(language));
  if (languageMatch) return languageMatch;

  return (
    usable.find((voice) => voice.lang.toLowerCase().startsWith("en-gb")) ??
    usable.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
    voices.find((voice) => isLikelyFemaleVoice(voice.name)) ??
    null
  );
}

function waitForVoices(timeoutMs = 3200): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.resolve([]);
  }

  const existing = window.speechSynthesis.getVoices();
  if (existing.length > 0) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;

    const finish = (voices: SpeechSynthesisVoice[]) => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener("voiceschanged", onChange);
      resolve(voices);
    };

    const onChange = () => finish(window.speechSynthesis.getVoices());

    window.speechSynthesis.addEventListener("voiceschanged", onChange);
    window.setTimeout(() => finish(window.speechSynthesis.getVoices()), timeoutMs);
  });
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function speakSegmentWithLang(
  segment: GreetingSegment,
  voice: SpeechSynthesisVoice | null,
  utteranceLang: string
) {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(segment.text);
    utterance.lang = voice?.lang ?? utteranceLang;
    utterance.rate = segment.rate;
    utterance.pitch = segment.pitch;
    utterance.volume = segment.volume ?? 1;
    if (voice) utterance.voice = voice;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

async function speakCountryRoomSegments(segments: GreetingSegment[], locale: RoomLocaleId) {
  if (segments.length === 0 || !isAiVoiceSupported()) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const voices = await waitForVoices();
  const voice = pickLocalFemaleVoice(voices, locale);
  const utteranceLang = resolveRoomLocaleUtteranceLang(locale);

  for (const segment of segments) {
    await speakSegmentWithLang(segment, voice, utteranceLang);
    if (segment.pauseAfterMs) {
      await delay(segment.pauseAfterMs);
    }
  }
}

async function speakSegments(segments: GreetingSegment[], language: AiVoiceLanguage) {
  if (segments.length === 0 || !isAiVoiceSupported()) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const voices = await waitForVoices();
  const voice = pickLocalFemaleVoice(voices, language);
  const utteranceLang = resolveRoomLocaleUtteranceLang(language);

  for (const segment of segments) {
    await speakSegmentWithLang(segment, voice, utteranceLang);
    if (segment.pauseAfterMs) {
      await delay(segment.pauseAfterMs);
    }
  }
}

export function stopAiVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function isAiVoiceSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export async function speakWelcomeGreeting(username: string, language: AiVoiceLanguage = "en") {
  await speakSegments(buildWelcomeSegments(username, language), language);
}

export async function speakArenaSiteWelcome(language: AiVoiceLanguage = "en") {
  await speakSegments(buildArenaSiteWelcomeSegments(language), language);
}

export async function speakRideStartGreeting(input: RideStartVoiceInput, language: AiVoiceLanguage = "en") {
  await speakSegments(buildRideStartSegments(input, language), language);
}

/** @deprecated Use speakWelcomeGreeting */
export async function speakAiGreeting(username: string) {
  await speakWelcomeGreeting(username);
}
