"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Arena2030Backdrop } from "@/components/arena-2030-backdrop";
import { ArenaFront12EliteSlots } from "@/components/arena-front12-elite-slots";
import { ArenaMicroRightRail } from "@/components/arena-micro-right-rail";
import { CaribbeanFreedomArenaEliteHeader } from "@/components/caribbean-freedom-arena-elite-header";
import { CaribbeanFreedomArenaInstallApp } from "@/components/caribbean-freedom-arena-install-app";
import { CreatorApplyForm, MemberRegistrationForm } from "@/components/compliance-registration-forms";
import { ArenaLoungeScrollPanel } from "@/components/arena-lounge-scroll-panel";
import { ReportAbuseButton } from "@/components/report-abuse-flow";
import { fygaro, fygaroSetupChecklist } from "@/config/fygaro";
import {
  arenaCreators,
  boostPacks,
  islandTabs,
  tickerItems,
  type ArenaCreatorSlot,
  type BoostPack
} from "@/lib/arena-experience";
import { isCommandCenterEnabled } from "@/lib/command-center-access";
import { arenaGiftCopy, formatArenaGiftAmount } from "@/lib/arena-gifts";

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

const snowFlakes = [
  { left: "4%", size: "3px", opacity: 0.9, duration: "3.2s", delay: "0s", drift: "6px" },
  { left: "12%", size: "2px", opacity: 0.7, duration: "4.1s", delay: "0.8s", drift: "-5px" },
  { left: "21%", size: "4px", opacity: 0.85, duration: "3.6s", delay: "1.6s", drift: "8px" },
  { left: "30%", size: "2px", opacity: 0.6, duration: "4.6s", delay: "0.3s", drift: "-7px" },
  { left: "39%", size: "3px", opacity: 0.95, duration: "3.0s", delay: "2.1s", drift: "5px" },
  { left: "48%", size: "2px", opacity: 0.7, duration: "4.3s", delay: "1.1s", drift: "-6px" },
  { left: "57%", size: "4px", opacity: 0.8, duration: "3.4s", delay: "0.6s", drift: "7px" },
  { left: "66%", size: "2px", opacity: 0.65, duration: "4.8s", delay: "1.9s", drift: "-4px" },
  { left: "74%", size: "3px", opacity: 0.9, duration: "3.1s", delay: "0.2s", drift: "6px" },
  { left: "82%", size: "2px", opacity: 0.7, duration: "4.4s", delay: "1.3s", drift: "-8px" },
  { left: "90%", size: "4px", opacity: 0.85, duration: "3.7s", delay: "2.4s", drift: "5px" },
  { left: "96%", size: "2px", opacity: 0.6, duration: "4.0s", delay: "0.9s", drift: "-5px" }
];

type ToastState = {
  message: string;
  tone?: "gold" | "warning";
};

const formatVotes = (votes: number) => votes.toLocaleString("en-US");

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
  const [slotTick, setSlotTick] = useState(0);

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
      setSlotTick((tick) => tick + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (hash === "signup" || hash === "member-sign-in" || hash === "bank") {
        setOpenDemoPanel("bank");
        return;
      }
      if (hash === "apply" || hash === "creator") {
        setOpenDemoPanel("apply");
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
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
      vx: (Math.random() - 0.5) * (burst ? 6 : 1.2),
      vy: -(Math.random() * (burst ? 8 : 2.4) + (burst ? 3 : 0.8)),
      life: 1,
      decay: Math.random() * 0.016 + (burst ? 0.022 : 0.006),
      size: Math.random() * (burst ? 10 : 4) + 1.5,
      hue: Math.random() * 80 + 170
    });

    const drawParticle = (particle: Particle) => {
      context.save();
      context.globalAlpha = Math.max(0, particle.life) * 0.55;

      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size
      );

      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 88%, 0.95)`);
      gradient.addColorStop(0.35, `hsla(${particle.hue + 18}, 100%, 62%, 0.65)`);
      gradient.addColorStop(1, `hsla(${particle.hue + 30}, 100%, 45%, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.55 && baseXRef.current.length > 0) {
        const baseX = baseXRef.current[Math.floor(Math.random() * baseXRef.current.length)];
        particlesRef.current.push(createParticle(baseX + (Math.random() - 0.5) * 80));
      }

      if (Math.random() < 0.08) {
        particlesRef.current.push(createParticle(Math.random() * canvas.width, canvas.height + 8));
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
        hue: Math.random() * 80 + 170
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
    showToast(`♡ Free entry opened for ${selectedEntrySlot.name} — ${formatArenaGiftAmount(freeEntryAmountUsd)}.`);
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

  const countrySlideItems = [...islandTabs, ...islandTabs];

  return (
    <>
    <section id="home" className="arena-2030 arena-2030--hero-dubai relative isolate min-h-screen overflow-hidden text-[#f7efe0]">
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
          .arena-title-glow {
            position: relative;
            display: inline-block;
          }
          .arena-title-glow::before {
            content: "";
            position: absolute;
            inset: -6px -14px;
            border-radius: 12px;
            background: radial-gradient(ellipse 85% 70% at 50% 50%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 42%, rgba(255,255,255,0) 72%);
            pointer-events: none;
            z-index: 0;
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
              box-shadow: 0 0 14px rgba(215,180,106,.18), inset 0 0 12px rgba(255,43,214,.06);
              border-color: rgba(215,180,106,.35);
            }
            50% {
              box-shadow: 0 0 32px rgba(255,43,214,.28), 0 0 44px rgba(215,180,106,.15), inset 0 0 16px rgba(168,85,247,.1);
              border-color: rgba(255,43,214,.75);
            }
          }
          @keyframes snowFall {
            0% { transform: translateY(-120%) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(120%) translateX(var(--snow-drift, 4px)); opacity: 0; }
          }
          @keyframes globeTurn {
            from { background-position: 0 0; }
            to { background-position: -200% 0; }
          }
          .globe-3d {
            position: relative;
            display: inline-block;
            width: 1.5em;
            height: 1.5em;
            border-radius: 50%;
            overflow: hidden;
            vertical-align: middle;
            box-shadow:
              inset -4px -4px 9px rgba(2,12,28,0.75),
              inset 3px 3px 8px rgba(173,216,255,0.35),
              0 0 6px rgba(120,190,255,0.65),
              0 0 12px rgba(90,160,255,0.4);
          }
          .globe-3d::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background-color: #0a3d7a;
            background-image:
              radial-gradient(ellipse 60% 90% at 50% 0%, #e8f4ff 0 7%, rgba(232,244,255,0) 11%),
              radial-gradient(ellipse 60% 90% at 50% 100%, #e8f4ff 0 7%, rgba(232,244,255,0) 11%),
              radial-gradient(ellipse 9% 16% at 10% 38%, #6b8e3a 0 60%, rgba(107,142,58,0) 75%),
              radial-gradient(ellipse 7% 22% at 14% 62%, #4f7a2e 0 60%, rgba(79,122,46,0) 78%),
              radial-gradient(ellipse 6% 9% at 22% 30%, #8a7a45 0 55%, rgba(138,122,69,0) 75%),
              radial-gradient(ellipse 11% 14% at 38% 52%, #5f8a35 0 60%, rgba(95,138,53,0) 76%),
              radial-gradient(ellipse 5% 8% at 46% 34%, #7d8e3f 0 55%, rgba(125,142,63,0) 75%),
              radial-gradient(ellipse 10% 16% at 64% 44%, #4f7a2e 0 60%, rgba(79,122,46,0) 77%),
              radial-gradient(ellipse 6% 12% at 72% 64%, #6b8e3a 0 58%, rgba(107,142,58,0) 76%),
              radial-gradient(ellipse 7% 10% at 86% 36%, #5f8a35 0 58%, rgba(95,138,53,0) 76%),
              radial-gradient(ellipse 5% 9% at 92% 58%, #7d8e3f 0 55%, rgba(125,142,63,0) 75%),
              linear-gradient(180deg, #1559a0 0%, #0a3d7a 45%, #07346b 100%);
            background-size: 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 200% 100%, 100% 100%;
            background-repeat: repeat-x;
            animation: globeTurn 7s linear infinite;
          }
          .globe-3d::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background:
              radial-gradient(circle at 30% 26%, rgba(255,255,255,0.5), rgba(255,255,255,0) 42%),
              radial-gradient(circle at 70% 78%, rgba(2,12,28,0.45), rgba(2,12,28,0) 55%);
            pointer-events: none;
          }
          @keyframes eliteSweep {
            0% { transform: translateX(-160%) skewX(-18deg); }
            100% { transform: translateX(160%) skewX(-18deg); }
          }
          @keyframes eliteGlow {
            0%, 100% { box-shadow: 0 0 8px rgba(245,200,66,.25), inset 0 0 8px rgba(245,200,66,.08); border-color: rgba(245,200,66,.45); }
            50% { box-shadow: 0 0 20px rgba(245,200,66,.6), 0 0 34px rgba(255,140,0,.25); border-color: rgba(255,200,90,.95); }
          }
          .snow-flake {
            position: absolute;
            top: 0;
            border-radius: 9999px;
            background: #ffffff;
            box-shadow: 0 0 4px rgba(255,255,255,0.85);
            animation: snowFall linear infinite;
          }
        `}
      </style>

      <Arena2030Backdrop
        heroBg
        photoFocus
        image="/caribbean-freedom-arena-dubai-2030-bg.png"
      />
      <canvas ref={canvasRef} className="fixed inset-0 z-[1] h-full w-full opacity-40 mix-blend-screen" aria-hidden="true" />

      <nav className="a2030-nav fixed inset-x-0 top-0 z-50 flex h-[58px] items-center justify-between px-4 sm:px-7">
        <a href="#home" className="a2030-brand a2030-brand-electric-trace flex items-center gap-2 text-[18px] font-bold sm:text-[20px]">
          <span className="a2030-badge rounded-full px-2 py-0.5 text-[9px]">2030</span>
          <span className="a2030-brand-accent">Caribbean</span>
          <span className="text-[#f7efe0]">Popularity</span>
          <span className="ml-1 hidden self-center rounded border border-[#d7b46a]/35 bg-[#d7b46a]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#d7b46a] sm:inline-flex">
            Arena
          </span>
        </a>

        <div className="flex items-center gap-2.5">
          <ArenaLoungeScrollPanel variant="nav" />
          <CaribbeanFreedomArenaInstallApp variant="nav" />
          {isCommandCenterEnabled ? (
            <Link
              href="/command-center"
              className="a2030-lounge-link a2030-micro hidden rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] lg:inline-flex"
            >
              Command Center
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setOpenDemoPanel("dashboard")}
            className="a2030-micro hidden rounded-lg border border-white/15 bg-transparent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b8c9e1] transition hover:border-[#d7b46a]/35 lg:inline-flex"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setOpenDemoPanel("bank")}
            className="a2030-micro hidden rounded-lg border border-white/15 bg-transparent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b8c9e1] transition hover:border-[#d7b46a]/35 md:inline-flex"
          >
            Member Sign In
          </button>
          <ReportAbuseButton className="hidden rounded-lg border border-[#c9a227]/30 bg-[#c9a227]/10 px-3 py-2 text-xs font-bold text-[#c9a227] transition hover:border-[#c9a227]/50 sm:inline-flex" compact />
          <button
            type="button"
            onClick={() => setOpenDemoPanel("apply")}
            className="a2030-cta a2030-micro rounded-lg px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] transition sm:px-5 sm:text-xs"
          >
            Apply as Creator — Free
          </button>
        </div>
      </nav>

      <div className="a2030-island-bar fixed inset-x-0 top-[58px] z-40 flex overflow-hidden">
        <div className="flex min-w-max hover:[animation-play-state:paused]" style={{ animation: "tick 60s linear infinite" }}>
          {countrySlideItems.map((island, index) => {
            const originalIndex = index % islandTabs.length;

            return (
            <button
              key={`${island.label}-${index}`}
              type="button"
              onClick={() => setActiveIsland(originalIndex)}
              className={`relative flex h-[46px] items-center gap-2 border-r border-[#d7b46a]/10 px-5 text-xs font-black uppercase tracking-wide transition ${
                activeIsland === originalIndex
                  ? "bg-[#d7b46a]/10 text-[#d7b46a]"
                  : "text-[#7a82a8] hover:bg-white/[0.04] hover:text-[#f7efe0]"
              }`}
            >
              <span className="text-lg">{island.flag}</span>
              {island.label}
              {activeIsland === originalIndex ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#d7b46a] to-[#c9a227]" />
              ) : null}
            </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 pt-[104px]">
        {tickerItems.length > 0 ? (
          <div className="a2030-ticker overflow-hidden py-2">
            <div className="flex w-max gap-10 whitespace-nowrap">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-2 text-xs font-black tracking-wide text-[#03040c]">
                  {item}
                  <span className="text-black/30">✦</span>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="a2030-content-column">
          <div className="flex flex-col gap-4 pt-5">
            <div className="w-full min-w-0 text-center">
              <p className="mt-2 inline-block text-xs leading-6 text-[#7a82a8]">
                <span className="relative inline-flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md px-2 py-1">
                  <span className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                    {snowFlakes.map((flake, index) => (
                      <span
                        key={index}
                        className="snow-flake"
                        style={{
                          left: flake.left,
                          width: flake.size,
                          height: flake.size,
                          opacity: flake.opacity,
                          animationDuration: flake.duration,
                          animationDelay: flake.delay,
                          ["--snow-drift" as string]: flake.drift
                        }}
                      />
                    ))}
                  </span>
                  <span className="globe-3d relative z-10" role="img" aria-label="Spinning globe" />
                  <span className="relative z-10 font-black uppercase tracking-[0.12em] text-[#f7efe0] drop-shadow-[0_0_16px_rgba(215,180,106,0.35)]">
                    International Friends Are Welcome
                  </span>
                  <span className="globe-3d relative z-10" role="img" aria-label="Spinning globe" />
                </span>
              </p>
            </div>

            <section className="cfa-elite-ai-header-outer-panel" aria-label="Caribbean Freedom Arena hero panel">
              <div className="cfa-elite-ai-header-stage">
                <CaribbeanFreedomArenaEliteHeader />
              </div>
            </section>
          </div>

          <div className="py-5 sm:pb-10">
            <ArenaFront12EliteSlots
              slots={slots}
              slotTick={slotTick}
              freeEntryAmountUsd={freeEntryAmountUsd}
              onVote={castVote}
              onFireUp={openFireUp}
              onMensEntry={openMensEntry}
              onCardTilt={applyCardTilt}
              onCardTiltReset={resetCardTilt}
              onSlotNotice={(message, tone) => showToast(message, tone ?? "gold")}
            />
          </div>

          <div className="pb-8 pt-2 sm:pb-12">
            <ArenaLoungeScrollPanel variant="hero" />
          </div>
        </div>
      </div>

      {selectedSlot ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={() => setSelectedSlotId(null)}>
          <div
            className="a2030-modal relative w-full max-w-sm rounded-[1.25rem] p-8 text-center"
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
                  <span className="text-base font-black text-[#f5c842]">{formatArenaGiftAmount(0)}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={confirmFireUp}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-4 py-3.5 text-sm font-black text-[#0a0e1f] transition hover:opacity-90"
              style={{ animation: "glowPulse 1.5s ease-in-out infinite" }}
            >
              🔥 Fire Up · {formatArenaGiftAmount(0)}
            </button>
          </div>
        </div>
      ) : null}

      {selectedEntrySlot ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={() => setSelectedEntrySlotId(null)}>
          <div
            className="a2030-modal relative w-full max-w-sm rounded-[1.25rem] p-8 text-center"
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
              This like opens a complimentary preview entry. Gift amount is {formatArenaGiftAmount(freeEntryAmountUsd)} on this website.
            </p>
            <div className="my-5 rounded-xl border border-white/[0.07] bg-[#111830] p-4 text-left">
              <p className="text-sm font-black text-[#f0edf8]">♡ Like {selectedEntrySlot.name}</p>
              <p className="mt-1 text-xs text-[#7a82a8]">
                {selectedEntrySlot.flag} {selectedEntrySlot.country} · free open access
              </p>
              <p className="mt-3 font-['Bebas_Neue',sans-serif] text-4xl tracking-wide text-[#f5c842]">
                {formatArenaGiftAmount(freeEntryAmountUsd)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleMensEntryCheckout}
              className="w-full rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-4 py-3.5 text-sm font-black text-[#0a0e1f] transition hover:opacity-90"
            >
              Open Complimentary Entry
            </button>
          </div>
        </div>
      ) : null}

      {openDemoPanel ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={() => setOpenDemoPanel(null)}>
          <div
            className={`a2030-modal relative w-full max-w-lg overflow-hidden rounded-[1.25rem] p-8${
              openDemoPanel === "bank" ? " a2030-modal--signup-bg" : ""
            }`}
            onClick={(event) => event.stopPropagation()}
            style={{ animation: "modalIn .25s ease-out both" }}
          >
            {openDemoPanel === "bank" ? (
              <>
                <span className="a2030-modal-signup-bg-image" aria-hidden="true" />
                <span className="a2030-modal-signup-bg-scrim" aria-hidden="true" />
              </>
            ) : null}
            <div className="relative z-[1]">
              <button
                type="button"
                onClick={() => setOpenDemoPanel(null)}
                className="absolute right-0 top-0 text-xl text-[#e8dcc0] hover:text-white"
                aria-label="Close free access panel"
              >
                ×
              </button>
              <FreeDemoPanel panel={openDemoPanel} onNotice={(message) => showToast(message, "gold")} />
            </div>
          </div>
        </div>
      ) : null}

    </section>

      <div
        className={`fixed bottom-7 left-1/2 z-[95] -translate-x-1/2 rounded-xl border border-[#d7b46a]/40 bg-[#03040c]/95 px-6 py-3 text-sm font-bold shadow-[0_0_30px_rgba(215,180,106,0.2)] backdrop-blur-xl transition-transform duration-300 ${
          toast ? "translate-y-0" : "translate-y-24"
        } ${toast?.tone === "warning" ? "text-[#ff8060]" : "text-[#d7b46a]"}`}
      >
        {toast?.message ?? "🔥 Fired up!"}
      </div>

      <ArenaMicroRightRail />
    </>
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
      items: ["Upload profile preview", "Choose island and category", "Join waiting list", arenaGiftCopy.noGiftRequired]
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
      subtitle: `Creator dashboard preview opens with ${formatArenaGiftAmount(0)}.`,
      items: ["Votes overview", "Country rank", "Waiting-list position", "12-hour rotation status"]
    },
    bank: {
      icon: "🏦",
      title: "Member Sign In",
      subtitle: `Arena Member Gift · ${formatArenaGiftAmount(6)}. Sign in with your arena name — it auto-appears on the welcome panel (e.g. WELCOME DIMITRI). Fygaro → Scotiabank when keys connect.`,
      items: [`${formatArenaGiftAmount(6)} member sign-in gift`, "Personalized welcome screen", "AI language detect", "Fygaro Links + Scotiabank payout"]
    }
  }[panel];

  return (
    <div>
      <div className={`text-center${panel === "bank" ? " a2030-signup-panel-head" : ""}`}>
        <div className="text-5xl">{content.icon}</div>
        <h2 className="mt-3 font-['Bebas_Neue',sans-serif] text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#f5c842] to-[#ff5c2b]">
          {content.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#7a82a8]">{content.subtitle}</p>
        <p className="mt-3 inline-flex rounded-full border border-[#00c9a7]/30 bg-[#00c9a7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00c9a7]">
          {formatArenaGiftAmount(0)} · Open Preview
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
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f5c842]">Operator — direct gift pipeline</p>
            <p className="mt-2 text-sm leading-6 text-[#b8c9e1]">
              Fygaro → your bank is the money pipe. No sole-trader block on checkout — add{" "}
              <code className="text-[#f7efe0]">FYGARO_*</code> keys and gifts go live. Business registration and{" "}
              <code className="text-[#f7efe0]">legal-entity.ts</code> are optional by country, not required for the pipe.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs leading-5 text-[#9aa8c6]">
              {fygaroSetupChecklist.slice(0, 4).map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
            <a
              href={fygaro.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-[#f7e7aa] underline underline-offset-2"
            >
              Open Fygaro dashboard
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
