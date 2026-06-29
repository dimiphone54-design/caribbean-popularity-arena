/** Agora RTC channel helpers · country room live lanes */

export const agoraLiveRoomSlugs = new Set(["china-room"]);

export function isAgoraLiveRoom(roomSlug: string) {
  return agoraLiveRoomSlugs.has(roomSlug);
}

/** Agora channel names · letters/digits only · under 64 bytes */
export function getAgoraChannelName(roomSlug: string) {
  return `cfa${roomSlug.replace(/-/g, "")}`;
}

export function getAgoraAppId() {
  return process.env.NEXT_PUBLIC_AGORA_APP_ID?.trim() ?? "";
}

export function isAgoraConfigured() {
  return getAgoraAppId().length >= 16;
}

/** Match country-room 3h live session */
export const agoraTokenExpireSeconds = 3 * 60 * 60;
