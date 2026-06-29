import { arenaGiftCopy } from "@/lib/arena-gifts";
import { eldersTableGiftLegal } from "@/lib/elders-table-gift-legal";
import { eldersRoomMeta, eldersRoomWinClips } from "@/lib/the-elders-room";

/** Live data lines for The Elders Table gift panel ticker. */
export const eldersTableGiftTickerItems: string[] = [
  ...eldersTableGiftLegal.tickerItems,
  ...eldersRoomWinClips.map(
    (clip) =>
      `${clip.watching} watching · ${clip.winnerFlag} ${clip.winnerName} × ${clip.matchedFlag} ${clip.matchedFrom} · ${clip.game}`
  ),
  `${arenaGiftCopy.sendGift} · ${eldersRoomMeta.name}`
];

export const eldersTableGiftHref = "/rooms/the-elders-table";

export const eldersTableGiftLabel = `${arenaGiftCopy.sendGift} · ${eldersTableGiftLegal.productName} · digital access`;
