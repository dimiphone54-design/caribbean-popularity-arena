"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { CreatorApplyForm, MemberRegistrationForm } from "@/components/compliance-registration-forms";
import { ReportAbuseButton } from "@/components/report-abuse-flow";
import { wipayTrinidad } from "@/config/wipay";
import {
  arenaCreators,
  arenaFeaturedQuote,
  boostPacks,
  islandTabs,
  tickerItems,
  type ArenaCreatorSlot,
  type BoostPack
} from "@/lib/arena-experience";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  hue: number;
};

type SlotState = ArenaCreatorSlot & {
  hasVoted?: boolean;
};

const freeEntryAmountUsd = "0";

type ToastState = {
  message: string;
  tone?: "gold" | "warning";
};

const formatVotes = (votes: number) => votes.toLocaleString("en-US");

const formatCountdown = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const rankClass = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-br from-[#f5c842] to-[#e8a800] text-[#0a0e1f]";
  if (rank === 2) return "bg-gradient-to-br from-[#c0c0c0] to-[#888] text-[#0a0e1f]";
  if (rank === 3) return "bg-gradient-to-br from-[#cd7f32] to-[#8b4513] text-white";
  return "bg-[#161d36] text-[#7a82a8]";
};

const applyCardTilt = (event: MouseEvent<HTMLElement>) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  card.style.transform = `perspective(900px) rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) translateY(-10px) scale(1.04)`;
};

const resetCardTilt = (event: MouseEvent<HTMLElement>) => {
  event.currentTarget.style.transform = "";
};

export function LiveArenaExperience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const baseXRef = useRef<number[]>([]);
  const [activeIsland, setActiveIsland] = useState(0);
  const [slots, setSlots] = useState<SlotState[]>(arenaCreators);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [selectedEntrySlotId, setSelectedEntrySlotId] = useState<number | null>(null);
  const [openDemoPanel, setOpenDemoPanel] = useState<"apply" | "rooms" | "dashboard" | "bank" | null>(null);
  const [selectedBoost, setSelectedBoost] = useState<BoostPack>(boostPacks[0]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [slotTimerSeconds, setSlotTimerSeconds] = useState(12 * 60 * 60);

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.id === selectedSlotId) ?? null,
    [selectedSlotId, slots]
  );
  const selectedEntrySlot = useMemo(
    () => slots.find((slot) => slot.id === selectedEntrySlotId) ?? null,
    [selectedEntrySlotId, slots]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlotTimerSeconds((seconds) => (seconds <= 0 ? 12 * 60 * 60 : seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      baseXRef.current = Array.from({ length: 8 }, () => Math.random() * window.innerWidth);
    };

    const createParticle = (x?: number, y?: number, burst = false): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? canvas.height + 10,
      vx: (Math.random() - 0.5) * (burst ? 6 : 1.5),
      vy: -(Math.random() * (burst ? 8 : 3) + (burst ? 3 : 1)),
      life: 1,
      decay: Math.random() * 0.018 + (burst ? 0.025 : 0.008),
      size: Math.random() * (burst ? 10 : 5) + 2,
      hue: Math.random() * 40 + 10
    });

    const drawParticle = (particle: Particle) => {
      context.save();
      context.globalAlpha = Math.max(0, particle.life) * 0.7;

      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size
      );

      gradient.addColorStop(0, `hsl(${particle.hue + 30}, 100%, 90%)`);
      gradient.addColorStop(0.4, `hsl(${particle.hue + 10}, 100%, 60%)`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 40%, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.4 && baseXRef.current.length > 0) {
        const baseX = baseXRef.current[Math.floor(Math.random() * baseXRef.current.length)];
        particlesRef.current.push(createParticle(baseX + (Math.random() - 0.5) * 60));
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.04;
        particle.life -= particle.decay;
        particle.size *= 0.985;

        if (particle.life <= 0) return false;

        drawParticle(particle);
        return true;
      });

      animationRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const burstAt = (x: number, y: number, count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let index = 0; index < count; index += 1) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 8 + 3),
        life: 1,
        decay: Math.random() * 0.018 + 0.025,
        size: Math.random() * 10 + 2,
        hue: Math.random() * 40 + 10
      });
    }
  };

  const showToast = (message: string, tone?: ToastState["tone"]) => {
    setToast({ message, tone });
  };

  const castVote = (slotId: number) => {
    setSlots((currentSlots) =>
      currentSlots.map((slot) => {
        if (slot.id !== slotId) return slot;

        if (slot.hasVoted) {
          showToast("Already voted for this slot today! 🔥", "warning");
          return slot;
        }

        showToast(`⚡ Vote cast for ${slot.name}!`);
        return {
          ...slot,
          hasVoted: true,
          votes: slot.votes + 1,
          progress: Math.min(99, slot.progress + 0.2)
        };
      })
    );
  };

  const openFireUp = (slotId: number, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    burstAt(rect.left + rect.width / 2, rect.top, 30);
    setSelectedSlotId(slotId);
    setSelectedBoost(boostPacks[0]);
  };

  const openMensEntry = (slotId: number, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedEntrySlotId(slotId);
  };

  const handleMensEntryCheckout = () => {
    if (!selectedEntrySlot) return;
    showToast(`♡ Free entry opened for ${selectedEntrySlot.name} — $0 cost.`);
    setSelectedEntrySlotId(null);
  };

  const confirmFireUp = () => {
    if (!selectedSlot) return;

    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slot.id === selectedSlot.id
          ? {
              ...slot,
              isOnFire: true,
              votes: slot.votes + selectedBoost.votes,
              progress: Math.min(99, slot.progress + (selectedBoost.votes / 2000) * 20)
            }
          : slot
      )
    );

    if (typeof window !== "undefined") {
      burstAt(window.innerWidth / 2, window.innerHeight / 2, 60);
    }

    showToast(`🔥 FIRED UP ${selectedSlot.name} with ${selectedBoost.votes} votes!`);
    setSelectedSlotId(null);
  };

  const slotTimerLabel = formatCountdown(slotTimerSeconds);
  const countrySlideItems = [...islandTabs, ...islandTabs];

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-[#0a0e1f] text-[#f0edf8]">
      <style>
        {`
          @keyframes fireGlow {
            0%,100% { box-shadow: 0 4px 20px rgba(255,92,43,.2); }
            50% { box-shadow: 0 4px 40px rgba(255,92,43,.6), 0 0 60px rgba(245,200,66,.2); }
          }
          @keyframes flamePulse {
            0%,100% { text-shadow: 0 0 8px rgba(255,92,43,.5); }
            50% { text-shadow: 0 0 24px rgba(255,92,43,1), 0 0 48px rgba(245,200,66,.6); }
          }
          @keyframes glowPulse {
            0%,100% { box-shadow: 0 0 8px rgba(245,200,66,.3); }
            50% { box-shadow: 0 0 28px rgba(245,200,66,.7), 0 0 60px rgba(255,92,43,.3); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes tick {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes liveRing {
            0%,100% { box-shadow: inset 0 0 0 2px rgba(255,92,43,.5), 0 0 12px rgba(255,92,43,.2); }
            50% { box-shadow: inset 0 0 0 2px rgba(255,92,43,1), 0 0 30px rgba(255,92,43,.5); }
          }
          @keyframes borderFire {
            0%,100% { border-color: rgba(255,92,43,.4); }
            50% { border-color: rgba(255,140,0,.9); }
          }
          @keyframes hotSlot {
            0%,100% { background: #111830; }
            50% { background: rgba(255,92,43,.07); }
          }
          @keyframes blink {
            0%,100% { opacity: 1; }
            50% { opacity: .2; }
          }
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(1rem) scale(.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes float3d {
            0%, 100% { transform: rotateX(10deg) translateZ(14px) translateY(0); }
            50% { transform: rotateX(10deg) translateZ(22px) translateY(-5px); }
          }
          @keyframes quoteAttention {
            0%, 100% {
              box-shadow: 0 0 12px rgba(245,200,66,.25), inset 0 0 12px rgba(255,92,43,.08);
              border-color: rgba(245,200,66,.45);
            }
            50% {
              box-shadow: 0 0 28px rgba(245,200,66,.55), 0 0 40px rgba(255,92,43,.2), inset 0 0 16px rgba(255,92,43,.12);
              border-color: rgba(255,140,0,.95);
            }
          }
        `}
      </style>

      <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full opacity-35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-35" aria-hidden="true">
        <div className="absolute -left-10 bottom-20 text-[11rem] text-[#062512]/70 blur-[1px]">🌴</div>
        <div className="absolute -right-8 bottom-28 scale-x-[-1] text-[9rem] text-[#062512]/60 blur-[1px]">🌴</div>
        <div className="absolute left-[8%] top-32 h-20 w-72 bg-white/10 [clip-path:polygon(0_100%,18%_38%,28%_65%,42%_18%,58%_72%,72%_32%,100%_100%)]" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 flex h-[58px] items-center justify-between border-b border-[#ff5c2b]/25 bg-[#0a0e1f]/95 px-4 shadow-[0_1px_30px_rgba(255,92,43,.15)] backdrop-blur-2xl sm:px-7">
        <a href="#home" className="flex items-center font-['Bebas_Neue',sans-serif] text-[24px] tracking-[1px] sm:text-[26px]">
          <span className="text-[#f5c842]" style={{ animation: "flamePulse 3s ease-in-out infinite" }}>
            Caribbean
          </span>
          <span>Popularity</span>
          <span className="ml-2 self-center rounded bg-gradient-to-r from-[#ff5c2b] to-[#f5c842] px-2 py-1 font-sans text-[10px] font-black uppercase tracking-[0.08em] text-[#0a0e1f]">
            🔥 Arena
          </span>
        </a>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-1.5 rounded-lg border border-[#ff5c2b]/30 bg-[#111830] px-3 py-1.5 text-sm font-bold text-[#f5c842] sm:flex">
            🪙 0
          </div>
          <button
            type="button"
            onClick={() => setOpenDemoPanel("rooms")}
            className="hidden rounded-lg border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-[#f0edf8] transition hover:border-white/35 lg:inline-flex"
          >
            Rooms
          </button>
          <button
            type="button"
            onClick={() => setOpenDemoPanel("dashboard")}
            className="hidden rounded-lg border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-[#f0edf8] transition hover:border-white/35 lg:inline-flex"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setOpenDemoPanel("bank")}
            className="hidden rounded-lg border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-[#f0edf8] transition hover:border-white/35 md:inline-flex"
          >
            Member Sign In
          </button>
          <ReportAbuseButton className="hidden rounded-lg border border-[#ff8060]/30 bg-[#ff8060]/10 px-3 py-2 text-xs font-bold text-[#ff8060] transition hover:border-[#ff8060]/50 sm:inline-flex" compact />
          <button
            type="button"
            onClick={() => setOpenDemoPanel("apply")}
            className="rounded-lg bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-4 py-2 text-xs font-black tracking-wide text-[#0a0e1f] transition hover:opacity-85 sm:px-5 sm:text-sm"
            style={{ animation: "glowPulse 2.5s ease-in-out infinite" }}
          >
            Apply as Creator — Free
          </button>
        </div>
      </nav>

      <div className="fixed inset-x-0 top-[58px] z-40 flex overflow-hidden border-b-2 border-[#e8a800] bg-[#0d1225]">
        <div className="flex min-w-max hover:[animation-play-state:paused]" style={{ animation: "tick 60s linear infinite" }}>
          {countrySlideItems.map((island, index) => {
            const originalIndex = index % islandTabs.length;

            return (
            <button
              key={`${island.label}-${index}`}
              type="button"
              onClick={() => setActiveIsland(originalIndex)}
              className={`relative flex h-[46px] items-center gap-2 border-r border-white/[0.07] px-5 text-xs font-black uppercase tracking-wide transition ${
                activeIsland === originalIndex
                  ? "bg-[#f5c842]/10 text-[#f5c842]"
                  : "text-[#7a82a8] hover:bg-white/[0.04] hover:text-[#f0edf8]"
              }`}
            >
              <span className="text-lg">{island.flag}</span>
              {island.label}
              {activeIsland === originalIndex ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ff5c2b] to-[#f5c842]" />
              ) : null}
            </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 pt-[104px]">
        {tickerItems.length > 0 ? (
          <div className="overflow-hidden bg-gradient-to-r from-[#ff5c2b] via-[#e8a800] to-[#ff5c2b] py-2 [background-size:200%_auto]">
            <div className="flex w-max gap-10 whitespace-nowrap">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-2 text-xs font-black tracking-wide text-[#0a0e1f]">
                  {item}
                  <span className="text-black/30">✦</span>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 px-4 pt-7 sm:px-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-['Bebas_Neue',sans-serif] text-4xl tracking-[0.08em] text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-[#ff5c2b] via-[#f5c842] to-[#ff8c00] [background-size:200%_auto]" style={{ animation: "shimmer 3s linear infinite" }}>
              🔥 The Arena · 12 Islands · 12 Live
            </p>
            <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-xl border-2 border-[#f5c842]/45 bg-gradient-to-r from-[#ff5c2b]/15 via-[#111830] to-[#f5c842]/10 px-3 py-2.5 shadow-[0_0_24px_rgba(245,200,66,.18)] sm:gap-2.5 sm:px-4 sm:py-3">
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#fff4c2] sm:text-sm">
                BIRTHDAY GIRL GETS 5 HOURS EXTRA OF BLESSTIME
              </p>
              <span
                className="inline-flex items-end gap-px rounded-md border border-[#f5c842]/30 bg-[#0a0e1f]/60 px-1.5 py-1 text-[10px] leading-none sm:text-[11px]"
                aria-label="Magic man blowing gifts onto birthday cake"
                title="Magic man blowing gifts onto birthday cake"
              >
                <span>🧙‍♂️</span>
                <span className="pb-px">💨</span>
                <span>🎁</span>
                <span className="text-[12px] sm:text-[13px]">🎂</span>
              </span>
              <Link
                href="/legal/birthday-promotion"
                className="rounded-md border border-[#f5c842]/35 bg-[#0a0e1f]/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#ffd978] transition hover:border-[#f5c842]/70 hover:text-[#fff4c2] sm:text-[11px]"
              >
                Promotion Terms
              </Link>
            </div>
          </div>
          <p className="max-w-xs text-left text-xs leading-6 text-[#7a82a8] lg:text-right">
            Strict 1 creator per island · Rankings updated in real time
          </p>
        </div>

        <div className="px-4 py-5 sm:px-7 sm:pb-10 [perspective:1400px]">
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6 [transform-style:preserve-3d]">
            {slots.map((slot) => (
              <article
                key={slot.id}
                onClick={() => castVote(slot.id)}
                onMouseMove={applyCardTilt}
                onMouseLeave={resetCardTilt}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.07] bg-[#111830] transition-[transform,box-shadow,border-color] duration-300 [transform-style:preserve-3d] hover:border-[#ff5c2b]/60 hover:shadow-[0_20px_50px_rgba(255,92,43,.35)] ${
                  slot.rank <= 3 ? "border-[#f5c842]/30" : ""
                } ${slot.isOnFire ? "border-[#ff5c2b]/70" : ""}`}
                style={slot.isOnFire ? { animation: "hotSlot 1.5s ease-in-out infinite,borderFire 1s ease-in-out infinite" } : undefined}
              >
                <div className="relative flex h-40 items-end justify-center overflow-hidden [transform-style:preserve-3d]">
                  <div className="absolute inset-0" style={{ background: slot.avatarGradient, transform: "translateZ(-20px)" }} />
                  <div
                    className="absolute inset-x-0 top-4 mx-auto h-36 w-28 [transform-style:preserve-3d]"
                    style={{ animation: slot.rank <= 3 ? "float3d 4s ease-in-out infinite" : undefined }}
                  >
                    <div
                      className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-t-[2.5rem] rounded-b-[1.2rem] shadow-2xl"
                      style={{ backgroundColor: slot.portrait.hair, transform: "translateZ(28px)" }}
                    />
                    <div
                      className="absolute left-1/2 top-5 h-16 w-14 -translate-x-1/2 rounded-[42%] shadow-[inset_0_-10px_18px_rgba(0,0,0,.12)]"
                      style={{ backgroundColor: slot.portrait.skin, transform: "translateZ(36px)" }}
                    >
                      <span className="absolute left-4 top-6 size-1.5 rounded-full bg-[#1b1110]" />
                      <span className="absolute right-4 top-6 size-1.5 rounded-full bg-[#1b1110]" />
                      <span className="absolute bottom-4 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-[#6b241f]/70" />
                    </div>
                    <div
                      className="absolute left-1/2 top-[4.85rem] h-7 w-5 -translate-x-1/2 rounded-b-lg"
                      style={{ backgroundColor: slot.portrait.skin, transform: "translateZ(30px)" }}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 h-16 w-24 -translate-x-1/2 rounded-t-[2rem] border border-white/15 shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${slot.portrait.outfit}, ${slot.portrait.accent})`,
                        transform: "translateZ(18px)"
                      }}
                    />
                    <div
                      className="absolute bottom-8 left-0 h-4 w-12 -rotate-12 rounded-full"
                      style={{ backgroundColor: slot.portrait.skin, transform: "translateZ(12px) rotateZ(-12deg)" }}
                    />
                    <div
                      className="absolute bottom-8 right-0 h-4 w-12 rotate-12 rounded-full"
                      style={{ backgroundColor: slot.portrait.skin, transform: "translateZ(12px) rotateZ(12deg)" }}
                    />
                    <div className="absolute left-1/2 top-1 h-7 w-16 -translate-x-1/2 rounded-t-full bg-white/10 blur-sm" style={{ transform: "translateZ(40px)" }} />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-x-4 bottom-3 h-8 rounded-[100%] bg-black/40 blur-md"
                    style={{ transform: "translateZ(-8px) rotateX(75deg) scaleY(0.35)" }}
                    aria-hidden="true"
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-[#0a0e1f]/70 px-1.5 py-1 text-lg">
                    {slot.flag}
                  </span>
                  <span className={`absolute right-2 top-2 grid size-7 place-items-center rounded-full border border-white/20 font-['Bebas_Neue',sans-serif] text-sm ${rankClass(slot.rank)}`}>
                    {slot.rank}
                  </span>
                  {slot.rank <= 3 ? (
                    <span className="absolute inset-0" style={{ animation: "liveRing 2s ease-in-out infinite" }} />
                  ) : null}
                  {slot.isOnFire ? (
                    <span className="absolute bottom-11 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-3 py-1 text-[10px] font-black tracking-wider text-[#0a0e1f]">
                      🔥 ON FIRE
                    </span>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0e1f] to-transparent" />
                </div>

                <div className="p-2.5 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-[#f0edf8]">{slot.name}</h3>
                      <p className="mt-0.5 truncate text-[11px] text-[#7a82a8]">
                        Age {slot.age} · {slot.flag} {slot.country}
                      </p>
                    </div>
                    <span className="shrink-0 rounded bg-black/30 px-1.5 py-1 font-['Bebas_Neue',sans-serif] text-[13px] tracking-wide text-[#f5c842]">
                      {slotTimerLabel}
                    </span>
                  </div>
                  <blockquote
                    className="mt-2 min-h-[3.25rem] rounded-lg border-2 border-[#f5c842]/50 bg-gradient-to-br from-[#ff5c2b]/20 via-[#f5c842]/15 to-[#ff8c00]/10 px-2.5 py-2 text-[11px] font-bold leading-5 tracking-wide text-[#fff8dc] shadow-[0_0_18px_rgba(245,200,66,.2)] sm:text-xs"
                    style={{ animation: "quoteAttention 2.2s ease-in-out infinite" }}
                  >
                    “{arenaFeaturedQuote}”
                    <span className="mt-1 block text-[10px] font-semibold not-italic text-[#ffd978]">
                      {slot.language}
                    </span>
                  </blockquote>
                  <div className="mt-2 flex items-center justify-between gap-2 text-[11px] font-bold text-[#7a82a8]">
                    <button
                      type="button"
                      onClick={(event) => openMensEntry(slot.id, event)}
                      className="rounded-md border border-[#f5c842]/25 bg-[#f5c842]/10 px-2 py-1 text-[#f5c842] transition hover:border-[#f5c842]/60 hover:bg-[#f5c842]/20"
                    >
                      ♡ Like · Free ${freeEntryAmountUsd} Entry
                    </button>
                    <span>💬 Comments {slot.comments}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-black tabular-nums text-[#f5c842]">
                      {formatVotes(slot.votes)}
                    </span>
                    <span className={`text-xs ${slot.trendTone === "down" ? "text-[#ff8060]" : "text-[#00c9a7]"}`}>
                      {slot.trend}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded bg-white/[0.08]">
                    <div className="h-full rounded bg-gradient-to-r from-[#ff5c2b] to-[#f5c842]" style={{ width: `${slot.progress}%` }} />
                  </div>
                </div>

                <div className="flex gap-1.5 px-2.5 pb-2.5">
                  <button
                    type="button"
                    className={`flex-1 rounded-md px-2 py-2 text-xs font-bold transition ${
                      slot.hasVoted
                        ? "bg-[#00c9a7]/20 text-[#00c9a7]"
                        : "bg-[#f5c842]/15 text-[#f5c842] hover:bg-[#f5c842]/30"
                    }`}
                  >
                    {slot.hasVoted ? "✓ Voted!" : "⚡ Vote"}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => openFireUp(slot.id, event)}
                    className="rounded-md bg-gradient-to-br from-[#ff5c2b]/25 to-[#ff8c00]/20 px-2.5 py-2 text-sm text-[#ff5c2b] transition hover:scale-110 hover:from-[#ff5c2b]/50 hover:to-[#ff8c00]/40"
                    style={{ animation: "fireGlow 2s ease-in-out infinite" }}
                  >
                    🔥
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {selectedSlot ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={() => setSelectedSlotId(null)}>
          <div
            className="relative w-full max-w-sm rounded-[1.25rem] border border-[#ff5c2b]/40 bg-[#0d1225] p-8 text-center shadow-[0_0_60px_rgba(255,92,43,.3),0_0_120px_rgba(245,200,66,.1)]"
            onClick={(event) => event.stopPropagation()}
            style={{ animation: "modalIn .25s ease-out both, glowPulse 2s ease-in-out infinite" }}
          >
            <button
              type="button"
              onClick={() => setSelectedSlotId(null)}
              className="absolute right-4 top-3 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
              aria-label="Close Fire Up modal"
            >
              ×
            </button>
            <div className="mb-2 text-5xl">🔥</div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c2b] to-[#f5c842]">
              Fire Up
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#7a82a8]">
              Supercharge your creator&apos;s votes and blast them up the leaderboard — instantly.
            </p>
            <p className="my-5 text-base font-black">🔥 {selectedSlot.name}</p>

            <div className="mb-5 flex flex-col gap-2.5">
              {boostPacks.map((pack) => (
                <button
                  key={pack.votes}
                  type="button"
                  onClick={() => setSelectedBoost(pack)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                    selectedBoost.votes === pack.votes
                      ? "border-[#ff5c2b]/60 bg-[#ff5c2b]/10"
                      : "border-white/[0.07] bg-[#111830] hover:border-[#ff5c2b]/40"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-black">
                      {formatVotes(pack.votes)} free votes {pack.icon}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#7a82a8]">{pack.label}</span>
                  </span>
                  <span className="text-base font-black text-[#f5c842]">$0</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={confirmFireUp}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-4 py-3.5 text-sm font-black text-[#0a0e1f] transition hover:opacity-90"
              style={{ animation: "glowPulse 1.5s ease-in-out infinite" }}
            >
              🔥 Fire Up Free — $0
            </button>
          </div>
        </div>
      ) : null}

      {selectedEntrySlot ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={() => setSelectedEntrySlotId(null)}>
          <div
            className="relative w-full max-w-sm rounded-[1.25rem] border border-[#f5c842]/40 bg-[#0d1225] p-8 text-center shadow-[0_0_60px_rgba(245,200,66,.2),0_0_120px_rgba(255,92,43,.1)]"
            onClick={(event) => event.stopPropagation()}
            style={{ animation: "modalIn .25s ease-out both" }}
          >
            <button
              type="button"
              onClick={() => setSelectedEntrySlotId(null)}
              className="absolute right-4 top-3 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
              aria-label="Close Men's Entry modal"
            >
              ×
            </button>
            <div className="mb-2 text-5xl">♡</div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#f5c842] to-[#ff5c2b]">
              Men&apos;s Entry
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#7a82a8]">
              This like opens a free preview entry. Cost is ${freeEntryAmountUsd} on this website.
            </p>
            <div className="my-5 rounded-xl border border-white/[0.07] bg-[#111830] p-4 text-left">
              <p className="text-sm font-black text-[#f0edf8]">♡ Like {selectedEntrySlot.name}</p>
              <p className="mt-1 text-xs text-[#7a82a8]">
                {selectedEntrySlot.flag} {selectedEntrySlot.country} · free open access
              </p>
              <p className="mt-3 font-['Bebas_Neue',sans-serif] text-4xl tracking-wide text-[#f5c842]">
                ${freeEntryAmountUsd} USD
              </p>
            </div>
            <button
              type="button"
              onClick={handleMensEntryCheckout}
              className="w-full rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-4 py-3.5 text-sm font-black text-[#0a0e1f] transition hover:opacity-90"
            >
              Open Free Entry
            </button>
          </div>
        </div>
      ) : null}

      {openDemoPanel ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={() => setOpenDemoPanel(null)}>
          <div
            className="relative w-full max-w-lg rounded-[1.25rem] border border-[#f5c842]/40 bg-[#0d1225] p-8 shadow-[0_0_60px_rgba(245,200,66,.2),0_0_120px_rgba(255,92,43,.1)]"
            onClick={(event) => event.stopPropagation()}
            style={{ animation: "modalIn .25s ease-out both" }}
          >
            <button
              type="button"
              onClick={() => setOpenDemoPanel(null)}
              className="absolute right-4 top-3 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
              aria-label="Close free access panel"
            >
              ×
            </button>
            <FreeDemoPanel panel={openDemoPanel} onNotice={(message) => showToast(message, "gold")} />
          </div>
        </div>
      ) : null}

      <div
        className={`fixed bottom-7 left-1/2 z-[95] -translate-x-1/2 rounded-xl border border-[#ff5c2b]/50 bg-[#0d1225] px-6 py-3 text-sm font-bold shadow-[0_0_30px_rgba(255,92,43,.3)] transition-transform duration-300 ${
          toast ? "translate-y-0" : "translate-y-24"
        } ${toast?.tone === "warning" ? "text-[#ff8060]" : "text-[#f5c842]"}`}
      >
        {toast?.message ?? "🔥 Fired up!"}
      </div>
    </section>
  );
}

function FreeDemoPanel({
  panel,
  onNotice
}: {
  panel: "apply" | "rooms" | "dashboard" | "bank";
  onNotice: (message: string) => void;
}) {
  const content = {
    apply: {
      icon: "✨",
      title: "Apply as Creator — Free",
      subtitle: "Open to eligible adult creators aged 18+. Applications are reviewed without regard to gender, subject to verification and capacity.",
      items: ["Upload profile preview", "Choose island and category", "Join waiting list", "No payment required"]
    },
    rooms: {
      icon: "🏝️",
      title: "Rooms",
      subtitle: "Fan rooms are open to browse for free.",
      items: ["Soca room", "Dancehall room", "Carnival fashion room", "Island lounge"]
    },
    dashboard: {
      icon: "📊",
      title: "Dashboard",
      subtitle: "Creator dashboard preview is unlocked at $0 cost.",
      items: ["Votes overview", "Country rank", "Waiting-list position", "12-hour rotation status"]
    },
    bank: {
      icon: "🏦",
      title: "Member Sign In",
      subtitle: "Create or access a member account preview. Placeholder payment keys remain in place until production keys are connected next week.",
      items: ["Demo account access", "WiPay placeholder status", "Entry records preview", "Production keys added later"]
    }
  }[panel];

  return (
    <div>
      <div className="text-center">
        <div className="text-5xl">{content.icon}</div>
        <h2 className="mt-3 font-['Bebas_Neue',sans-serif] text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#f5c842] to-[#ff5c2b]">
          {content.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#7a82a8]">{content.subtitle}</p>
        <p className="mt-3 inline-flex rounded-full border border-[#00c9a7]/30 bg-[#00c9a7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00c9a7]">
          $0 Cost · Open Preview
        </p>
      </div>

      {panel === "apply" ? (
        <CreatorApplyForm onSubmitted={() => onNotice("Creator application preview submitted with required legal acceptances.")} />
      ) : panel === "bank" ? (
        <>
          <MemberRegistrationForm
            title="Member"
            onSubmitted={() => onNotice("Member registration preview submitted with Terms and Privacy acceptance.")}
          />
          <div className="mt-6 rounded-xl border border-[#f5c842]/20 bg-[#111830] p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5c842]">Operator — WiPay Trinidad setup</p>
            <p className="mt-2 text-sm leading-6 text-[#b8c9e1]">
              After your sole trader registration, link your Trinidad settlement bank in WiPay Profile → Bank,
              then add your live account number and Payment API key to <code className="text-[#f7efe0]">.env.local</code>.
            </p>
            <a
              href={wipayTrinidad.profileBankUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-[#f7e7aa] underline underline-offset-2"
            >
              Open WiPay Profile → Bank (Trinidad)
            </a>
          </div>
        </>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {content.items.map((item) => (
            <div key={item} className="rounded-xl border border-white/[0.07] bg-[#111830] p-4">
              <p className="text-sm font-black text-[#f0edf8]">{item}</p>
              <p className="mt-1 text-xs text-[#7a82a8]">Open demo access enabled</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
