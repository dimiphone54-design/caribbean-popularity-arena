"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { getAgoraChannelName, isAgoraConfigured } from "@/lib/agora-room";
import { WushuDuilianStagePreview } from "@/components/wushu-duilian-stage-preview";

type ArenaAgoraLiveStageProps = {
  roomSlug: string;
  countryName: string;
  flag: string;
  variant?: "japan" | "china" | "default";
  /** hero = full-width stage · top of room · go-live first */
  layout?: "default" | "hero";
  gameLabel?: string;
};

type LiveStatus = "idle" | "connecting" | "live" | "waiting" | "error";

function randomAgoraUid() {
  return Math.floor(Math.random() * 900_000) + 100_000;
}

export function ArenaAgoraLiveStage({
  roomSlug,
  countryName,
  flag,
  variant = "default",
  layout = "default",
  gameLabel
}: ArenaAgoraLiveStageProps) {
  const japan = variant === "japan";
  const china = variant === "china";
  const hero = layout === "hero";
  const videoRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localVideoRef = useRef<ICameraVideoTrack | null>(null);
  const localAudioRef = useRef<IMicrophoneAudioTrack | null>(null);
  const remoteVideoRef = useRef<IRemoteVideoTrack | null>(null);
  const uidRef = useRef(randomAgoraUid());

  const [status, setStatus] = useState<LiveStatus>("idle");
  const [error, setError] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [ownerMode, setOwnerMode] = useState(false);

  useEffect(() => {
    const sync = () => setOwnerMode(isArenaMasterKeyActive());
    sync();
    window.addEventListener("cpa:arena-master-key", sync);
    return () => window.removeEventListener("cpa:arena-master-key", sync);
  }, []);

  const leaveLive = useCallback(async () => {
    remoteVideoRef.current?.stop();
    remoteVideoRef.current = null;

    localVideoRef.current?.stop();
    localVideoRef.current?.close();
    localVideoRef.current = null;

    localAudioRef.current?.stop();
    localAudioRef.current?.close();
    localAudioRef.current = null;

    const client = clientRef.current;
    clientRef.current = null;

    if (client) {
      try {
        await client.leave();
      } catch {
        // already left
      }
    }

    setIsHost(false);
    setStatus("idle");
    setError("");
  }, []);

  useEffect(() => {
    return () => {
      void leaveLive();
    };
  }, [leaveLive]);

  async function fetchToken(asHost: boolean) {
    const masterKey = asHost ? window.sessionStorage.getItem("cfa_arena_master_key_value")?.trim() : undefined;

    const response = await fetch("/api/agora/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomSlug,
        uid: uidRef.current,
        role: asHost ? "host" : "audience",
        ...(asHost && masterKey ? { masterKey } : {})
      })
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      error?: string;
      token?: string;
      appId?: string;
      channelName?: string;
    };

    if (!response.ok || !payload.ok || !payload.token || !payload.appId) {
      throw new Error(payload.error ?? "Could not get live token");
    }

    return payload;
  }

  async function joinLive(asHost: boolean) {
    if (!isAgoraConfigured()) {
      setError(china ? "Agora 未配置" : japan ? "Agora 未設定" : "Agora not configured");
      setStatus("error");
      return;
    }

    if (asHost && !window.sessionStorage.getItem("cfa_arena_master_key_value")?.trim()) {
      setError(
        china
          ? "Command Center 输入主密钥"
          : japan
            ? "Command Centerでマスターキーを入力"
            : "Unlock master key in Command Center first"
      );
      setStatus("error");
      return;
    }

    setStatus("connecting");
    setError("");

    try {
      const payload = await fetchToken(asHost);
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      clientRef.current = client;

      client.on("user-published", async (user, mediaType) => {
        if (!clientRef.current) return;
        await clientRef.current.subscribe(user, mediaType);

        if (mediaType === "video" && user.videoTrack && videoRef.current) {
          remoteVideoRef.current = user.videoTrack;
          user.videoTrack.play(videoRef.current);
          setStatus("live");
        }

        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", () => {
        if (!isHost) {
          remoteVideoRef.current?.stop();
          remoteVideoRef.current = null;
          setStatus("waiting");
        }
      });

      await client.setClientRole(asHost ? "host" : "audience");
      await client.join(payload.appId!, payload.channelName ?? getAgoraChannelName(roomSlug), payload.token!, uidRef.current);

      if (!asHost) {
        for (const user of client.remoteUsers) {
          if (user.hasVideo) {
            await client.subscribe(user, "video");
            if (user.videoTrack && videoRef.current) {
              remoteVideoRef.current = user.videoTrack;
              user.videoTrack.play(videoRef.current);
              setStatus("live");
            }
          }
          if (user.hasAudio) {
            await client.subscribe(user, "audio");
            user.audioTrack?.play();
          }
        }
      }

      if (asHost) {
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        localAudioRef.current = audioTrack;
        localVideoRef.current = videoTrack;

        if (videoRef.current) {
          videoTrack.play(videoRef.current);
        }

        await client.publish([audioTrack, videoTrack]);
        setIsHost(true);
        setStatus("live");
        return;
      }

      setStatus("waiting");
    } catch (err) {
      await leaveLive();
      setError(err instanceof Error ? err.message : "Live join failed");
      setStatus("error");
    }
  }

  if (!isAgoraConfigured() && !china) {
    return null;
  }

  const agoraLive = isAgoraConfigured();
  const joined = status === "live" || status === "waiting" || status === "connecting";
  const liveNow = status === "live" && isHost;
  const showDuilianPreview =
    china && (status === "idle" || status === "waiting" || status === "error" || !agoraLive);

  return (
    <section
      className={`arena-agora-live-stage ${japan ? "arena-agora-live-stage--japan" : ""} ${china ? "arena-agora-live-stage--china" : ""} ${hero ? "arena-agora-live-stage--hero" : ""} country-room-section w-full`}
      aria-label={`${countryName} live stage`}
    >
      {hero ? (
        <header className="arena-agora-live-stage-hero-head text-center">
          <p className="arena-agora-live-stage-hero-kicker">
            {china ? "🔴 直播 · 游戏现场" : japan ? "🔴 ライブ · 今すぐ" : "🔴 Live · right now"}
          </p>
          <h2 className="arena-agora-live-stage-hero-title">
            {flag} {china ? "直播舞台" : japan ? "ライブステージ" : "Live stage"}
          </h2>
          {gameLabel ? (
            <div className="arena-agora-live-stage-hero-game-block mx-auto mt-1 max-w-2xl">
              <p className="arena-agora-live-stage-hero-game text-sm font-bold tracking-wide text-[#fde68a]">
                {gameLabel}
              </p>
            </div>
          ) : null}
        </header>
      ) : null}

      <div className="arena-agora-live-stage-shell relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#060a14]/90">
        <div
          ref={videoRef}
          className={`arena-agora-live-stage-video relative w-full bg-[#0a0f1c] ${hero ? "arena-agora-live-stage-video--hero" : "aspect-video"}`}
        />

        {showDuilianPreview ? (
          <div className="arena-agora-duilian-preview-layer absolute inset-0 z-[5] flex items-center justify-center px-3 py-4 sm:px-5">
            <WushuDuilianStagePreview />
          </div>
        ) : null}

        {liveNow ? (
          <div className="arena-agora-live-stage-live-pill absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
            <span className="arena-agora-live-stage-live-dot" />
            {japan ? "配信中" : china ? "直播中" : "Live"}
          </div>
        ) : null}

        {agoraLive && (!joined || (china && status === "waiting")) ? (
          <div
            className={`arena-agora-live-stage-idle absolute inset-0 z-10 flex flex-col items-center justify-end gap-3 px-4 pb-4 text-center sm:pb-5 ${
              china ? "arena-agora-live-stage-idle--china" : "justify-center gap-4 bg-[#040810]/70 backdrop-blur-[2px]"
            }`}
          >
            {status === "error" ? (
              <p className="max-w-sm rounded-lg bg-black/55 px-3 py-2 text-sm text-rose-300">{error}</p>
            ) : hero && !china ? (
              <p className="arena-agora-live-stage-hero-tagline">
                {japan ? "カメラON · 音楽ON · ダンスOK" : "Camera on · game on · live"}
              </p>
            ) : null}

            {china && status === "waiting" ? (
              <p className="arena-agora-live-stage-china-wait rounded-full bg-black/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#fde68a]">
                等待主播 · 先看对练示范
              </p>
            ) : null}

            <div className="flex flex-col items-center gap-2.5">
              {ownerMode ? (
                <button
                  type="button"
                  onClick={() => void joinLive(true)}
                  className="arena-agora-live-stage-go-live rounded-2xl px-8 py-3.5 text-sm font-black uppercase tracking-[0.18em] sm:px-12 sm:py-4 sm:text-base"
                >
                  {china ? "开始直播 · GO LIVE" : japan ? "配信開始 · GO LIVE" : "Go live"}
                </button>
              ) : (
                <p className="max-w-xs rounded-lg bg-black/45 px-3 py-2 text-[11px] leading-5 text-[#c4d4ef]/85">
                  {china
                    ? "主人 · Command Center 主密钥 → 开始直播"
                    : japan
                      ? "オーナー · Command Centerでマスターキー → 配信開始"
                      : "Owner · unlock master key in Command Center → Go live"}
                </p>
              )}

              {!joined ? (
                <button
                  type="button"
                  onClick={() => void joinLive(false)}
                  className="arena-agora-live-stage-watch rounded-xl px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#c4d4ef]/90"
                >
                  {china ? "观看直播" : japan ? "視聴する" : "Watch"}
                </button>
              ) : status === "waiting" ? (
                <button
                  type="button"
                  onClick={() => void leaveLive()}
                  className="rounded-lg border border-white/15 bg-black/45 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#c4d4ef]"
                >
                  {china ? "结束" : japan ? "終了" : "Leave"}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {joined ? (
          <div className="arena-agora-live-stage-bar flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-400">
              {status === "connecting"
                ? china
                  ? "连接中…"
                  : japan
                    ? "接続中…"
                    : "Connecting…"
                : status === "waiting"
                  ? china
                    ? "等待主播"
                    : japan
                      ? "ホスト待機中"
                      : "Waiting for host"
                  : isHost
                    ? china
                      ? "你在直播 · 游戏舞台"
                      : japan
                        ? "ステージはあなたのもの"
                        : "You own the stage"
                    : china
                      ? "观看中"
                      : japan
                        ? "視聴中"
                        : "Watching"}
            </p>
            <button
              type="button"
              onClick={() => void leaveLive()}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#c4d4ef] transition hover:bg-white/5"
            >
              {china ? "结束" : japan ? "終了" : "Leave"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
