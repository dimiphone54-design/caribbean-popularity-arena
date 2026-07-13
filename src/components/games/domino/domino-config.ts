/** Domino theme + Spanish strings — re-skin per country room later */

export type DominoLocaleStrings = {
  gameTitle: string;
  gameSubtitle: string;
  yourTurn: string;
  aiThinking: string;
  youWinDomino: string;
  aiWinsDomino: string;
  youWinBlocked: string;
  aiWinsBlocked: string;
  draw: string;
  pass: string;
  newGame: string;
  boneyard: string;
  openEnds: string;
  tiles: string;
  yourHand: string;
  aiHand: string;
  chain: string;
  pipTotal: string;
  playHint: string;
  drawHint: string;
  passHint: string;
  blocked: string;
  roundOver: string;
  vsAi: string;
  originalGame: string;
  vibe: string;
  /** Copa / tournament */
  copaTitle: string;
  tablaDelMes: string;
  campeonDelMes: string;
  salonFama: string;
  puntos: string;
  racha: string;
  retalo: string;
  yourName: string;
  namePlaceholder: string;
  saveName: string;
  nameToClimb: string;
  emptyBoard: string;
  emptyFame: string;
  pointsToNext: string;
  leading: string;
  you: string;
  winsShort: string;
  freeEntry: string;
  premioStatus: string;
  prizeLegal: string;
};

export type DominoTheme = {
  id: string;
  locale: DominoLocaleStrings;
  /** CSS class hook on root */
  themeClass: string;
  flag: string;
  countryName: string;
};

export const ecuadorDominoTheme: DominoTheme = {
  id: "ecuador",
  themeClass: "domino-theme-ecuador",
  flag: "🇪🇨",
  countryName: "Ecuador",
  locale: {
    gameTitle: "Dominó Ecuatoriano",
    gameSubtitle: "Bloque · doble seis · contra la IA",
    yourTurn: "Tu turno",
    aiThinking: "IA pensando…",
    youWinDomino: "¡Dominó! Ganaste",
    aiWinsDomino: "La IA hizo Dominó",
    youWinBlocked: "Bloqueo · ganas por puntos",
    aiWinsBlocked: "Bloqueo · gana la IA por puntos",
    draw: "Roba ficha",
    pass: "Paso",
    newGame: "Nueva partida",
    boneyard: "Pozo",
    openEnds: "Extremos abiertos",
    tiles: "Fichas",
    yourHand: "Tu mano",
    aiHand: "IA",
    chain: "Mesa",
    pipTotal: "Puntos en mano",
    playHint: "Toca una ficha jugable",
    drawHint: "No puedes jugar · roba del pozo",
    passHint: "Pozo vacío · toca Paso",
    blocked: "Partida bloqueada",
    roundOver: "Fin de ronda",
    vsAi: "vs IA",
    originalGame: "Juego original · Caribbean Freedom Arena",
    vibe: "¡Dale pues, pilas!",
    copaTitle: "Copa Dominó Ecuatoriano",
    tablaDelMes: "Tabla del mes",
    campeonDelMes: "Campeón del mes",
    salonFama: "Salón de la fama",
    puntos: "Puntos",
    racha: "Racha",
    retalo: "Rétalo",
    yourName: "Tu nombre en la copa",
    namePlaceholder: "Ej. PilasQuito",
    saveName: "Guardar",
    nameToClimb: "Pon tu nombre (gratis) y gana a la IA para subir en la tabla",
    emptyBoard: "Nadie en la tabla aún · ¡sé el primero!",
    emptyFame: "Aún no hay campeones · el primero se corona a fin de mes",
    pointsToNext: "Para el siguiente",
    leading: "Vas primero · ¡pilas!",
    you: "tú",
    winsShort: "W",
    freeEntry: "Gratis · sin pago",
    premioStatus: "Premio: estatus · sin dinero",
    prizeLegal:
      "Entrada gratis. Premios de estatus (badge, salón de la fama). Sin premios en efectivo. Juego original CFA."
  }
};

export const DEFAULT_DOMINO_THEME = ecuadorDominoTheme;

/** AI think delay so the opponent feels alive */
export const DOMINO_AI_THINK_MS = 650;
