/** Freedom Drive Simulator · locale themes */

export type FreedomDriveLocale = "uk" | "ecuador";

export type FreedomDriveTheme = {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  flag: string;
  description: string;
  controlsHint: string;
  controlsHintDesktop: string;
  startDrive: string;
  pause: string;
  launchSimulator: string;
  livePreview: string;
  fullPageLabel: string;
  leaderboardKicker: string;
  leaderboardTitle: string;
  leaderboardSubmit: string;
  leaderboardSubmitting: string;
  hudSpeed: string;
  hudPlayer: string;
  hudRank: string;
  hudPoints: string;
  hudDrift: string;
  hudImpacts: string;
  hudKmDriven: string;
  leaderboardLoading: string;
  leaderboardEmpty: string;
  leaderboardOffline: string;
  leaderboardDriveMore: string;
  leaderboardPosted: string;
  leaderboardPostedLocal: string;
  leaderboardSaveError: string;
  leaderboardNetworkError: string;
};

export const FREEDOM_DRIVE_THEMES: Record<FreedomDriveLocale, FreedomDriveTheme> = {
  uk: {
    id: "uk-freedom-drive",
    title: "Freedom Drive Simulator",
    subtitle: "UK Freedom Drive Arena · London 2030",
    country: "United Kingdom",
    flag: "🇬🇧",
    description:
      "London 2030 open-world preview · W/A/S/D on desktop · touch pedals on mobile · drift at speed · chase cam",
    controlsHint: "Drift above 40 mph · collisions slow you · post your run to the arena board",
    controlsHintDesktop: "W accelerate · S brake · A/D steer · ",
    startDrive: "▶ Start Drive",
    pause: "Pause",
    launchSimulator: "▶ Launch Simulator",
    livePreview: "Live preview",
    fullPageLabel: "Full page →",
    leaderboardKicker: "Arena Board",
    leaderboardTitle: "UK Freedom Drive",
    leaderboardSubmit: "Post Run to Leaderboard",
    leaderboardSubmitting: "Saving…",
    hudSpeed: "Current Speed",
    hudPlayer: "Player",
    hudRank: "Driving Rank",
    hudPoints: "Arena Points",
    hudDrift: "DRIFT",
    hudImpacts: "Impacts",
    hudKmDriven: "km driven",
    leaderboardLoading: "Loading scores…",
    leaderboardEmpty: "No runs yet · be the first legend",
    leaderboardOffline: "Leaderboard offline · scores saved locally when you submit",
    leaderboardDriveMore: "Drive a little further before submitting",
    leaderboardPosted: "Score posted to arena board",
    leaderboardPostedLocal: "Score saved · local preview mode",
    leaderboardSaveError: "Could not save score",
    leaderboardNetworkError: "Network error · try again"
  },
  ecuador: {
    id: "ecuador-drive",
    title: "Ecuador Drive Simulator",
    subtitle: "Arena Ecuador Drive · Quito · Guayaquil 2030",
    country: "Ecuador",
    flag: "🇪🇨",
    description:
      "Vista previa mundo abierto · W/A/S/D en desktop · pedales táctiles en móvil · derrape a velocidad · cámara chase",
    controlsHint: "Derrape arriba de 40 mph · choques te frenan · publica tu run en la tabla arena",
    controlsHintDesktop: "W acelerar · S frenar · A/D girar · ",
    startDrive: "▶ Iniciar carrera",
    pause: "Pausa",
    launchSimulator: "▶ Lanzar simulador",
    livePreview: "Clip en vivo",
    fullPageLabel: "Página completa →",
    leaderboardKicker: "Tabla Arena",
    leaderboardTitle: "Ecuador Drive",
    leaderboardSubmit: "Publicar carrera",
    leaderboardSubmitting: "Guardando…",
    hudSpeed: "Velocidad",
    hudPlayer: "Jugador",
    hudRank: "Rango",
    hudPoints: "Puntos Arena",
    hudDrift: "DERRAPE",
    hudImpacts: "Impactos",
    hudKmDriven: "km recorridos",
    leaderboardLoading: "Cargando puntajes…",
    leaderboardEmpty: "Sin carreras aún · sé el primero",
    leaderboardOffline: "Tabla offline · puntaje local al publicar",
    leaderboardDriveMore: "Conduce un poco más antes de publicar",
    leaderboardPosted: "Carrera publicada en la tabla arena",
    leaderboardPostedLocal: "Puntaje guardado · modo preview local",
    leaderboardSaveError: "No se pudo guardar el puntaje",
    leaderboardNetworkError: "Error de red · intenta de nuevo"
  }
};

/** @deprecated use getFreedomDriveTheme("uk") */
export const FREEDOM_DRIVE_THEME = FREEDOM_DRIVE_THEMES.uk;

export function getFreedomDriveTheme(locale: FreedomDriveLocale = "uk") {
  return FREEDOM_DRIVE_THEMES[locale];
}

export const DRIVE_PHYSICS = {
  maxSpeed: 48,
  acceleration: 28,
  brakeForce: 42,
  reverseMax: 14,
  friction: 8,
  lateralGrip: 14,
  driftGrip: 4.2,
  driftSpeedThreshold: 18,
  steerSpeed: 2.4,
  collisionDamping: 0.35
} as const;

export const MS_TO_MPH = 2.23694;

export const ARENA_POINTS_PER_METER = 0.45;
export const ARENA_POINTS_PER_TOP_MPH = 1.8;
