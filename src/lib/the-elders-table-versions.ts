import type { EldersTableFeaturedPanelId } from "@/lib/the-elders-table";

export type EldersTableVersionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type EldersTableVersionShell =
  | "quartet"
  | "gather-classic"
  | "gather-morocco"
  | "noir-photo"
  | "world";

export type EldersTableVersionPhoto = {
  id: number;
  image: string;
  label: string;
  focus?: string;
  size?: string;
};

export type EldersTableVersionFrame = {
  id: number;
  label: string;
  indices: [number, number, number, number];
};

export type EldersTableBackdropKind = "quartet" | "composite-v5";

export type EldersTableVersionConfig = {
  id: EldersTableVersionId;
  name: string;
  summary: string;
  shell: EldersTableVersionShell;
  backdropKind: EldersTableBackdropKind;
  photos: EldersTableVersionPhoto[];
  frames: EldersTableVersionFrame[];
  rotateSlideshow: boolean;
  showOptionsRail: boolean;
  optionsHoverOnly: boolean;
  optionsItems: "all" | EldersTableFeaturedPanelId[];
  showGamesPanel: boolean;
  gamesItems: "all" | EldersTableFeaturedPanelId[];
  showQuestionsPanel: boolean;
  useContentPanel: boolean;
  compactTitle: boolean;
};

const originalMockupPhotos: EldersTableVersionPhoto[] = [
  {
    id: 2,
    image: "/elders-table-caribbean-freedom-arena-slideshow.png",
    label: "01 · Grand Salon",
    focus: "0% 0%",
    size: "200% 200%"
  },
  {
    id: 3,
    image: "/elders-table-caribbean-freedom-arena-slideshow.png",
    label: "02 · Elite Strategy Club",
    focus: "100% 0%",
    size: "200% 200%"
  },
  {
    id: 4,
    image: "/elders-table-caribbean-freedom-arena-slideshow.png",
    label: "03 · Caribbean Rooftop Nights",
    focus: "0% 100%",
    size: "200% 200%"
  },
  {
    id: 5,
    image: "/elders-table-caribbean-freedom-arena-slideshow.png",
    label: "04 · International Members Club",
    focus: "100% 100%",
    size: "200% 200%"
  },
  {
    id: 1,
    image: "/elders-table-caribbean-freedom-arena.png",
    label: "Caribbean Freedom Arena",
    focus: "center 36%"
  }
];

const rotatingFrames: EldersTableVersionFrame[] = Array.from({ length: 5 }, (_, start) => ({
  id: start + 1,
  label: `Rich salon · ${String(start + 1).padStart(2, "0")} / 05`,
  indices: [0, 1, 2, 3].map((offset) => (start + offset) % 5) as [number, number, number, number]
}));

const staticMockupFrame: EldersTableVersionFrame[] = [
  {
    id: 1,
    label: "Caribbean Freedom Arena · 01 / 04",
    indices: [0, 1, 2, 3]
  }
];

const croppedPhotos: EldersTableVersionPhoto[] = [
  {
    id: 1,
    image: "/elders-table-q-tl.jpg",
    label: "01 · Welcome",
    focus: "center center",
    size: "cover"
  },
  {
    id: 2,
    image: "/elders-table-q-tr.jpg",
    label: "02 · Arena Live",
    focus: "center center",
    size: "cover"
  },
  {
    id: 3,
    image: "/elders-table-q-bl.jpg",
    label: "03 · Grand Salon",
    focus: "center center",
    size: "cover"
  },
  {
    id: 4,
    image: "/elders-table-q-br.jpg",
    label: "04 · Salon Games Night",
    focus: "center center",
    size: "cover"
  }
];

const featuredItems: EldersTableFeaturedPanelId[] = ["chess", "business-sim", "tokyo-lane"];

const legacyShellDefaults: Pick<
  EldersTableVersionConfig,
  | "backdropKind"
  | "photos"
  | "frames"
  | "rotateSlideshow"
  | "showOptionsRail"
  | "optionsHoverOnly"
  | "optionsItems"
  | "showGamesPanel"
  | "gamesItems"
  | "showQuestionsPanel"
  | "useContentPanel"
  | "compactTitle"
> = {
  backdropKind: "quartet",
  photos: [],
  frames: [],
  rotateSlideshow: false,
  showOptionsRail: false,
  optionsHoverOnly: true,
  optionsItems: "all",
  showGamesPanel: false,
  gamesItems: "all",
  showQuestionsPanel: false,
  useContentPanel: false,
  compactTitle: false
};

export const eldersTableVersionConfigs: Record<EldersTableVersionId, EldersTableVersionConfig> = {
  1: {
    id: 1,
    name: "Arena mockup · rotating",
    summary: "Original 2×2 slideshow that rotates. Simple page — no options rail.",
    shell: "quartet",
    backdropKind: "quartet",
    photos: originalMockupPhotos,
    frames: rotatingFrames,
    rotateSlideshow: true,
    showOptionsRail: false,
    optionsHoverOnly: true,
    optionsItems: "all",
    showGamesPanel: false,
    gamesItems: "all",
    showQuestionsPanel: false,
    useContentPanel: false,
    compactTitle: false
  },
  2: {
    id: 2,
    name: "Rotating + options rail",
    summary: "Same slideshow + lower-right options rail (all 11, hover).",
    shell: "quartet",
    backdropKind: "quartet",
    photos: originalMockupPhotos,
    frames: rotatingFrames,
    rotateSlideshow: true,
    showOptionsRail: true,
    optionsHoverOnly: true,
    optionsItems: "all",
    showGamesPanel: false,
    gamesItems: "all",
    showQuestionsPanel: false,
    useContentPanel: false,
    compactTitle: false
  },
  3: {
    id: 3,
    name: "Rotating + hover games",
    summary: "Original slideshow + hover game descriptions (all games).",
    shell: "quartet",
    backdropKind: "quartet",
    photos: originalMockupPhotos,
    frames: rotatingFrames,
    rotateSlideshow: true,
    showOptionsRail: true,
    optionsHoverOnly: true,
    optionsItems: "all",
    showGamesPanel: true,
    gamesItems: "all",
    showQuestionsPanel: false,
    useContentPanel: false,
    compactTitle: false
  },
  4: {
    id: 4,
    name: "Chess · Business sim · Tokyo",
    summary: "Original slideshow + only 3 games/options on hover. Clean layout.",
    shell: "quartet",
    backdropKind: "quartet",
    photos: originalMockupPhotos,
    frames: rotatingFrames,
    rotateSlideshow: true,
    showOptionsRail: true,
    optionsHoverOnly: true,
    optionsItems: featuredItems,
    showGamesPanel: true,
    gamesItems: featuredItems,
    showQuestionsPanel: false,
    useContentPanel: false,
    compactTitle: true
  },
  5: {
    id: 5,
    name: "The Elders Table · locked layout",
    summary: "#5 settings + slideshow: #7 → #8 → #10 (exact assets).",
    shell: "quartet",
    backdropKind: "composite-v5",
    photos: [],
    frames: [],
    rotateSlideshow: false,
    showOptionsRail: true,
    optionsHoverOnly: false,
    optionsItems: featuredItems,
    showGamesPanel: true,
    gamesItems: featuredItems,
    showQuestionsPanel: false,
    useContentPanel: false,
    compactTitle: true
  },
  6: {
    id: 6,
    name: "Your new photos · 4 quarters",
    summary: "Your uploaded mockups cropped into 4 quarters + 3 games.",
    shell: "quartet",
    backdropKind: "quartet",
    photos: croppedPhotos,
    frames: staticMockupFrame,
    rotateSlideshow: false,
    showOptionsRail: true,
    optionsHoverOnly: true,
    optionsItems: featuredItems,
    showGamesPanel: true,
    gamesItems: featuredItems,
    showQuestionsPanel: false,
    useContentPanel: false,
    compactTitle: true
  },
  7: {
    id: 7,
    name: "Latest (glass panel)",
    summary: "New photos + dark glass panel over the bottom — current messy one.",
    shell: "quartet",
    backdropKind: "quartet",
    photos: croppedPhotos,
    frames: staticMockupFrame,
    rotateSlideshow: false,
    showOptionsRail: true,
    optionsHoverOnly: true,
    optionsItems: featuredItems,
    showGamesPanel: true,
    gamesItems: featuredItems,
    showQuestionsPanel: false,
    useContentPanel: true,
    compactTitle: true
  },
  8: {
    ...legacyShellDefaults,
    id: 8,
    name: "B — 12-person mosaic",
    summary: "6 Antigua women, 3 gym men (45), 2 Japan women, 1 curvy elder — Ken Burns grid.",
    shell: "gather-classic"
  },
  9: {
    ...legacyShellDefaults,
    id: 9,
    name: "C — Morocco style",
    summary: "Same mosaic + Morocco gold/teal UI with Hassan, Karim, Youssef hosts.",
    shell: "gather-morocco"
  },
  10: {
    ...legacyShellDefaults,
    id: 10,
    name: "D — Tokyo × Marrakech Noir",
    summary: "Single full photo backdrop + gold questions panel on the right.",
    shell: "noir-photo",
    showQuestionsPanel: true,
    optionsItems: "all"
  },
  11: {
    ...legacyShellDefaults,
    id: 11,
    name: "E — World slideshow",
    summary: "4-quarter world scene slides — Tokyo, Sandton, Asia, Dubai park.",
    shell: "world",
    showQuestionsPanel: true,
    optionsItems: "all"
  }
};

export const eldersTableVersionList = Object.values(eldersTableVersionConfigs).sort((left, right) => {
  if (left.id === 5) return -1;
  if (right.id === 5) return 1;
  return left.id - right.id;
});

export function parseEldersTableVersion(value: string | null | undefined): EldersTableVersionId {
  const parsed = Number(value);
  if (parsed >= 1 && parsed <= 11) {
    return parsed as EldersTableVersionId;
  }

  return 5;
}

export function getEldersTableVersionConfig(version: EldersTableVersionId): EldersTableVersionConfig {
  return eldersTableVersionConfigs[version] ?? eldersTableVersionConfigs[5];
}

type EldersTableSearchParams = { get: (key: string) => string | null } | null;

export function isEldersTableStudioMode(searchParams: EldersTableSearchParams): boolean {
  if (!searchParams) return false;
  return searchParams.get("studio") === "1" || searchParams.get("compare") === "1";
}

/** Locked #5 loads as the public client room unless studio/compare mode is on. */
export function isEldersTableClientView(
  version: EldersTableVersionId,
  searchParams: EldersTableSearchParams
): boolean {
  return version === 5 && !isEldersTableStudioMode(searchParams);
}

export function showEldersTableVersionPicker(
  version: EldersTableVersionId,
  searchParams: EldersTableSearchParams
): boolean {
  if (isEldersTableStudioMode(searchParams)) return true;
  return version !== 5;
}

export function describeEldersTableVersionSettings(config: EldersTableVersionConfig): string[] {
  const lines: string[] = [];

  if (config.backdropKind === "composite-v5") {
    lines.push("Backdrop slideshow: #7 → #8 → #10");
  } else if (config.shell === "gather-classic") {
    lines.push("Backdrop: #8 Ken Burns 12-photo mosaic");
  } else if (config.shell === "gather-morocco") {
    lines.push("Backdrop: #8 mosaic + Morocco gold/teal UI");
  } else if (config.shell === "noir-photo") {
    lines.push("Backdrop: #10 full Marrakech noir photo");
  } else if (config.shell === "world") {
    lines.push("Backdrop: #11 world 4-quarter slideshow");
  } else if (config.rotateSlideshow) {
    lines.push("Backdrop: rotating original 2×2 mockup");
  } else if (config.photos.some((photo) => photo.image.includes("elders-table-q-"))) {
    lines.push("Backdrop: static your 4 cropped quarters (#7 photos)");
  } else {
    lines.push("Backdrop: static original mockup 4 quarters");
  }

  if (config.showOptionsRail) {
    const interaction = config.optionsHoverOnly ? "hover" : "click open/close";
    lines.push(
      config.optionsItems === "all"
        ? `Options rail: lower-right · all 11 · ${interaction}`
        : `Options rail: lower-right · Chess · Business sim · Tokyo · ${interaction}`
    );
  } else {
    lines.push("Options rail: off");
  }

  if (config.showQuestionsPanel || config.shell === "noir-photo" || config.shell === "world") {
    lines.push(
      config.optionsItems === "all"
        ? "Questions: right gold panel (#10 style) · all games · click to expand"
        : "Questions: right gold panel (#10 style) · Chess · Business sim · Tokyo · click to expand"
    );
  } else {
    lines.push("Questions panel: off");
  }

  if (config.showGamesPanel) {
    lines.push(
      config.gamesItems === "all"
        ? "Games panel: all games · hover descriptions"
        : "Games panel: Chess · Business sim · Tokyo · hover"
    );
  } else {
    lines.push("Games panel: off (chips only)");
  }

  lines.push(config.compactTitle ? "Title: one line · THE ELDERS TABLE" : "Title: classic two-line header");
  lines.push(config.useContentPanel ? "Content: dark glass panel over bottom" : "Content: open layout · no glass box");

  if (config.shell === "gather-classic" || config.shell === "gather-morocco") {
    lines.push("Extra: 2030 roster panels + bottom prompt dock");
  }

  return lines;
}
