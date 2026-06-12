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
import { isCommandCenterEnabled } from "@/lib/command-center-access";

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

const coconutsBack = [
  { left: "41%", top: "33%", size: "9px", duration: "1.7s", delay: "0.2s", fall: "56px" },
  { left: "54%", top: "32%", size: "8px", duration: "2.0s", delay: "0.6s", fall: "60px" },
  { left: "47%", top: "34%", size: "10px", duration: "1.8s", delay: "1.0s", fall: "58px" },
  { left: "44%", top: "35%", size: "3px", duration: "1.3s", delay: "0.4s", fall: "64px" },
  { left: "56%", top: "36%", size: "4px", duration: "1.2s", delay: "1.3s", fall: "66px" }
];

const coconutsFront = [
  { left: "49%", top: "35%", size: "9px", duration: "1.6s", delay: "0s", fall: "54px" },
  { left: "43%", top: "36%", size: "8px", duration: "1.9s", delay: "0.9s", fall: "58px" },
  { left: "52%", top: "34%", size: "10px", duration: "1.7s", delay: "1.5s", fall: "56px" },
  { left: "50%", top: "37%", size: "3px", duration: "1.1s", delay: "0.7s", fall: "62px" },
  { left: "46%", top: "33%", size: "4px", duration: "1.4s", delay: "1.8s", fall: "60px" }
];

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
              box-shadow: 0 0 12px rgba(245,200,66,.25), inset 0 0 12px rgba(255,92,43,.08);
              border-color: rgba(245,200,66,.45);
            }
            50% {
              box-shadow: 0 0 28px rgba(245,200,66,.55), 0 0 40px rgba(255,92,43,.2), inset 0 0 16px rgba(255,92,43,.12);
              border-color: rgba(255,140,0,.95);
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
          @keyframes coconutDrop {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            12% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(var(--coconut-fall, 46px)) scale(.8); opacity: 0; }
          }
          .coconut-drop {
            position: absolute;
            border-radius: 9999px;
            background: radial-gradient(circle at 32% 28%, #b5803f 0%, #7a4a1d 55%, #4f2d10 100%);
            box-shadow: 0 1px 2px rgba(0,0,0,0.45);
            animation: coconutDrop ease-in infinite;
          }
          @keyframes giftFly {
            0% { transform: translateX(0) translateY(0) scale(.55) rotate(-8deg); opacity: 0; }
            18% { opacity: 1; }
            82% { opacity: 1; transform: translateX(calc(var(--gift-dist, 30px) * .85)) translateY(-3px) scale(1) rotate(14deg); }
            100% { transform: translateX(var(--gift-dist, 30px)) translateY(0) scale(.4) rotate(22deg); opacity: 0; }
          }
          .gift-fly {
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -7px;
            animation: giftFly ease-in-out infinite;
          }
          @keyframes wizardCast {
            0%, 100% { transform: rotate(-4deg) translateY(0); }
            50% { transform: rotate(4deg) translateY(-1px); }
          }
          @keyframes cakeReceive {
            0%, 60%, 100% { transform: scale(1); }
            72% { transform: scale(1.28) translateY(-1px); }
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
          <Link
            href="/rooms/retro-sugar"
            className="relative hidden overflow-hidden rounded-lg border border-[#f5c842]/45 bg-gradient-to-b from-[#1a1330] to-[#0a0e1f] px-4 py-2 text-sm font-semibold text-[#f7e7aa] transition hover:text-[#fff4c2] lg:inline-flex"
            style={{ animation: "eliteGlow 2.4s ease-in-out infinite" }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#fff4c2]/70 to-transparent"
              style={{ animation: "eliteSweep 2.6s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <span className="relative z-10">Retro Sugar</span>
          </Link>
          <Link
            href="/rooms/the-pair-room"
            className="relative hidden overflow-hidden rounded-lg border border-[#f5c842]/45 bg-gradient-to-b from-[#1a1330] to-[#0a0e1f] px-4 py-2 text-sm font-semibold text-[#f7e7aa] transition hover:text-[#fff4c2] lg:inline-flex"
            style={{ animation: "eliteGlow 2.4s ease-in-out infinite" }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#fff4c2]/70 to-transparent"
              style={{ animation: "eliteSweep 2.6s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <span className="relative z-10">Pair League</span>
          </Link>
          <Link
            href="/rooms/comedy-fest"
            className="relative hidden overflow-hidden rounded-lg border border-[#f5c842]/45 bg-gradient-to-b from-[#1a1330] to-[#0a0e1f] px-4 py-2 text-sm font-semibold text-[#f7e7aa] transition hover:text-[#fff4c2] lg:inline-flex"
            style={{ animation: "eliteGlow 2.4s ease-in-out infinite" }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#fff4c2]/70 to-transparent"
              style={{ animation: "eliteSweep 2.6s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <span className="relative z-10">Comedy Fest</span>
          </Link>
          {isCommandCenterEnabled ? (
            <Link
              href="/command-center"
              className="relative hidden overflow-hidden rounded-lg border border-[#f5c842]/45 bg-gradient-to-b from-[#1a1330] to-[#0a0e1f] px-4 py-2 text-sm font-semibold text-[#f7e7aa] transition hover:text-[#fff4c2] lg:inline-flex"
              style={{ animation: "eliteGlow 2.4s ease-in-out infinite" }}
            >
              <span
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#fff4c2]/70 to-transparent"
                style={{ animation: "eliteSweep 2.6s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <span className="relative z-10">Command Center</span>
            </Link>
          ) : null}
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
            <p className="flex items-center gap-2 font-['Bebas_Neue',sans-serif] text-4xl leading-none tracking-[0.08em] sm:text-5xl">
              <span className="relative inline-flex shrink-0 items-end">
                <span className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                  {coconutsBack.map((coconut, index) => (
                    <span
                      key={`back-${index}`}
                      className="coconut-drop"
                      style={{
                        left: coconut.left,
                        top: coconut.top,
                        width: coconut.size,
                        height: coconut.size,
                        animationDuration: coconut.duration,
                        animationDelay: coconut.delay,
                        ["--coconut-fall" as string]: coconut.fall
                      }}
                    />
                  ))}
                </span>
                <img
                  src="/palm-tree.png?v=3"
                  alt="Palm tree"
                  className="relative z-10 h-16 w-auto drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] sm:h-20"
                />
                <span className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
                  {coconutsFront.map((coconut, index) => (
                    <span
                      key={`front-${index}`}
                      className="coconut-drop"
                      style={{
                        left: coconut.left,
                        top: coconut.top,
                        width: coconut.size,
                        height: coconut.size,
                        animationDuration: coconut.duration,
                        animationDelay: coconut.delay,
                        ["--coconut-fall" as string]: coconut.fall
                      }}
                    />
                  ))}
                </span>
              </span>
              <span className="arena-title-glow">
                <span className="relative z-10 bg-gradient-to-r from-[#ff5c2b] via-[#f5c842] to-[#ff8c00] bg-clip-text text-transparent [background-size:200%_auto]" style={{ animation: "shimmer 3s linear infinite" }}>
                  The Arena · 12 Islands · 12 Live
                </span>
              </span>
            </p>
            <p className="mt-2 text-xs leading-6 text-[#7a82a8]">
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
                <span className="relative z-10 font-black uppercase tracking-[0.12em] text-[#fffafa] drop-shadow-[0_1px_10px_rgba(255,255,255,0.45)]">
                  International Friends Are Welcome
                </span>
                <span className="globe-3d relative z-10" role="img" aria-label="Spinning globe" />
              </span>
            </p>
            <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-xl border-2 border-[#f5c842]/45 bg-gradient-to-r from-[#ff5c2b]/15 via-[#111830] to-[#f5c842]/10 px-3 py-2.5 shadow-[0_0_24px_rgba(245,200,66,.18)] sm:gap-2.5 sm:px-4 sm:py-3">
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#fff4c2] sm:text-sm">
                BIRTHDAY GIRL GETS 5 HOURS EXTRA OF BLESSTIME
              </p>
              <span
                className="inline-flex items-center gap-1 rounded-md border border-[#f5c842]/30 bg-[#0a0e1f]/60 px-1.5 py-1 text-[13px] leading-none sm:text-[15px]"
                aria-label="Magic man blowing gifts onto birthday cake"
                title="Magic man blowing gifts onto birthday cake"
              >
                <span className="inline-block origin-bottom" style={{ animation: "wizardCast 1.6s ease-in-out infinite" }}>
                  🧙‍♂️
                </span>
                <span
                  className="relative inline-block h-4 w-9 overflow-visible"
                  aria-hidden="true"
                >
                  <span className="gift-fly" style={{ ["--gift-dist" as string]: "34px", animationDuration: "1.8s", animationDelay: "0s" }}>🎁</span>
                  <span className="gift-fly" style={{ ["--gift-dist" as string]: "34px", animationDuration: "1.8s", animationDelay: "0.6s" }}>🎁</span>
                  <span className="gift-fly" style={{ ["--gift-dist" as string]: "34px", animationDuration: "1.8s", animationDelay: "1.2s" }}>✨</span>
                </span>
                <span className="inline-block origin-bottom" style={{ animation: "cakeReceive 1.8s ease-in-out infinite" }}>
                  🎂
                </span>
              </span>
              <Link
                href="/legal/birthday-promotion"
                className="rounded-md border border-[#f5c842]/35 bg-[#0a0e1f]/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#ffd978] transition hover:border-[#f5c842]/70 hover:text-[#fff4c2] sm:text-[11px]"
              >
                Promotion Terms
              </Link>
            </div>
          </div>
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
          <p className="mt-4 text-center text-xs font-medium leading-6 text-[#7a82a8]">
            Strict 1 creator per island · Rankings updated in real time
          </p>
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
