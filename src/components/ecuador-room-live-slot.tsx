"use client";

import { LiveSlot } from "@/components/live-slot";
import { ecuadorFlashLiveConfig } from "@/lib/ecuador-room-live";

/** Ecuador (EC) · Arena Flash Live slot under the room header */
export function EcuadorRoomLiveSlot() {
  const config = ecuadorFlashLiveConfig;

  return (
    <LiveSlot
      id="ecuador-live-slot"
      isLive={config.isLive}
      viewers={config.viewers}
      link={config.link}
      title={config.title}
      subtext={config.subtext}
      thumbnailSrc={config.thumbnailSrc}
      videoSrc={config.videoSrc}
      nextLiveLabel={config.nextLiveLabel}
    />
  );
}
