import { RtcRole, RtcTokenBuilder } from "agora-token";
import { NextResponse } from "next/server";
import {
  agoraTokenExpireSeconds,
  getAgoraChannelName,
  isAgoraLiveRoom
} from "@/lib/agora-room";

type TokenRequest = {
  roomSlug?: string;
  uid?: number;
  role?: "audience" | "host";
  masterKey?: string;
};

export async function POST(request: Request) {
  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID?.trim();
  const appCertificate = process.env.AGORA_APP_CERTIFICATE?.trim();

  if (!appId || !appCertificate) {
    return NextResponse.json(
      { ok: false, error: "Agora not configured · set App ID + certificate in .env.local" },
      { status: 503 }
    );
  }

  let body: TokenRequest;
  try {
    body = (await request.json()) as TokenRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const roomSlug = body.roomSlug?.trim() ?? "";
  const uid = Number(body.uid);
  const role = body.role === "host" ? "host" : "audience";

  if (!roomSlug || !isAgoraLiveRoom(roomSlug)) {
    return NextResponse.json({ ok: false, error: "Unknown live room" }, { status: 400 });
  }

  if (!Number.isInteger(uid) || uid < 1 || uid > 2 ** 32 - 1) {
    return NextResponse.json({ ok: false, error: "Invalid uid" }, { status: 400 });
  }

  if (role === "host") {
    const masterKey = process.env.ARENA_MASTER_KEY?.trim();
    const submitted = body.masterKey?.trim() ?? "";
    if (!masterKey || submitted !== masterKey) {
      return NextResponse.json({ ok: false, error: "Host role requires owner master key" }, { status: 401 });
    }
  }

  const channelName = getAgoraChannelName(roomSlug);
  const rtcRole = role === "host" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const expire = agoraTokenExpireSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    rtcRole,
    expire,
    expire
  );

  return NextResponse.json({
    ok: true,
    token,
    appId,
    channelName,
    uid,
    role,
    expiresIn: expire
  });
}
