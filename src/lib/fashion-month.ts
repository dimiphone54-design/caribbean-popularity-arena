export type FashionMonthLook = {
  id: number;
  name: string;
  age: number;
  flag: string;
  city: string;
  style: string;
  accent: string;
};

export const fashionMonthRoomDescription =
  "Fashion Month lounge — runway energy, island glam, street couture, and men's style prompts wired for the 2030 arena.";

export const fashionMonthRegions = "Caribbean · London · Paris · Milan · NYC";

export const fashionMonthLooks: FashionMonthLook[] = [
  { id: 1, name: "Amara Laurent", age: 23, flag: "🇹🇹", city: "Port of Spain", style: "Carnival couture", accent: "Gold mesh" },
  { id: 2, name: "Zuri Blake", age: 24, flag: "🇯🇲", city: "Kingston", style: "Dancehall glam", accent: "Neon silk" },
  { id: 3, name: "Leila Dupont", age: 22, flag: "🇬🇧", city: "London", style: "Street tailoring", accent: "Ivory blazer" },
  { id: 4, name: "Naomi Clarke", age: 25, flag: "🇧🇧", city: "Bridgetown", style: "Resort runway", accent: "Coral linen" },
  { id: 5, name: "Isla Mendez", age: 21, flag: "🇩🇴", city: "Santo Domingo", style: "Evening drape", accent: "Ruby satin" },
  { id: 6, name: "Chloe Renard", age: 23, flag: "🇫🇷", city: "Paris", style: "Haute minimal", accent: "Black chrome" },
  { id: 7, name: "Sienna Rossi", age: 24, flag: "🇮🇹", city: "Milan", style: "Tailored edge", accent: "White leather" },
  { id: 8, name: "Jade Monroe", age: 22, flag: "🇺🇸", city: "New York", style: "Editorial pop", accent: "Hot pink" }
];

export const fashionMonthMenPrompts = [
  { id: "runway-or-street", label: "Runway front row or street-style circle?" },
  { id: "colour-pop", label: "Bold colour pop or classic monochrome?" },
  { id: "accessory", label: "Statement chain or clean watch only?" },
  { id: "shoes", label: "Fresh trainers or polished loafers tonight?" },
  { id: "fit-check", label: "Relaxed drape or sharp fitted silhouette?" },
  { id: "theme-night", label: "Carnival glam night or couture minimal?" },
  { id: "photo-pose", label: "Power stance or candid laugh for the shot?" },
  { id: "afterparty", label: "Afterparty jacket on or send the look as-is?" }
] as const;

export type FashionMonthMenPromptId = (typeof fashionMonthMenPrompts)[number]["id"];

export const fashionMonthPromptResponses: Record<FashionMonthMenPromptId, string> = {
  "runway-or-street":
    "Front row if you want the full spectacle — street circle if you want the real pulse. Fashion Month runs both lanes live.",
  "colour-pop":
    "Colour pop turns heads under arena lights. Monochrome wins when the cut and fabric do the talking — pick one story, not two.",
  "accessory":
    "One statement piece max. Chain for drama, watch for quiet luxury — never stack both and fight the fit.",
  "shoes":
    "Trainers keep it street and sharp. Loafers lift the whole room when the rest of the look is clean and tailored.",
  "fit-check":
    "Sharp fitted reads confident on camera. Relaxed drape reads cool if the shoulders and length are intentional.",
  "theme-night":
    "Carnival glam brings heat and motion. Couture minimal lets the room breathe — match the mood, not the noise.",
  "photo-pose":
    "Power stance for the hero shot. Candid laugh for the shot people actually share — both belong in Fashion Month.",
  "afterparty":
    "If the look is already complete, send it. If the night turns up, one jacket layer is the pro move."
};
