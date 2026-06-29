"use client";

import { usePathname } from "next/navigation";
import { useAiVoiceGreeting } from "@/components/ai-voice-greeting-provider";
import { isAiVoiceSupported } from "@/lib/ai-voice-greeting";
import { roomSlugFromPathname, shouldShowCountryTrendPanel } from "@/lib/country-trend-activities";

type AiVoiceGreetingToggleProps = {
  className?: string;
  variant?: "pill" | "footer" | "footer-micro" | "room-rail";
};

export function AiVoiceGreetingToggle({ className = "", variant = "pill" }: AiVoiceGreetingToggleProps) {
  const pathname = usePathname();
  const { voiceEnabled, isSpeaking, setVoiceEnabled, ready } = useAiVoiceGreeting();
  const roomSlug = roomSlugFromPathname(pathname);
  const ecuadorRoom = roomSlug.includes("ecuador");

  if (!ready || !isAiVoiceSupported()) return null;

  const hideFloatingVoice =
    variant === "pill" &&
    (pathname === "/" ||
      pathname === "/information-ai" ||
      shouldShowCountryTrendPanel(pathname));

  if (hideFloatingVoice) return null;

  const label = ecuadorRoom
    ? voiceEnabled
      ? "Voz AI ON"
      : "Voz AI OFF"
    : voiceEnabled
      ? "AI Voice ON"
      : "AI Voice OFF";

  if (variant === "room-rail") {
    return (
      <button
        type="button"
        aria-pressed={voiceEnabled}
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className={`country-trend-voice-btn inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.48rem] font-black uppercase tracking-[0.12em] transition ${
          voiceEnabled
            ? "border-emerald-400/45 bg-emerald-400/10 text-emerald-200"
            : "border-sky-400/28 bg-slate-950/55 text-sky-100/85"
        } ${className}`}
      >
        <span
          className={`inline-flex h-1.5 w-1.5 rounded-full ${voiceEnabled ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.85)]" : "bg-zinc-500"} ${isSpeaking ? "animate-pulse" : ""}`}
          aria-hidden="true"
        />
        {isSpeaking
          ? ecuadorRoom
            ? voiceEnabled
              ? "AI hablando…"
              : "Hablando…"
            : voiceEnabled
              ? "AI Speaking…"
              : "Speaking…"
          : label}
      </button>
    );
  }

  if (variant === "footer-micro") {
    return (
      <button
        type="button"
        aria-pressed={voiceEnabled}
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className={`site-footer-ai-micro-voice-btn inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-2 py-1 text-[0.34rem] font-black uppercase tracking-[0.1em] transition ${
          voiceEnabled
            ? "border-emerald-400/45 bg-emerald-400/10 text-emerald-200"
            : "border-sky-400/28 bg-slate-950/55 text-sky-100/85"
        } ${className}`}
      >
        <span
          className={`inline-flex h-1.5 w-1.5 rounded-full ${voiceEnabled ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.85)]" : "bg-zinc-500"}`}
          aria-hidden="true"
        />
        {isSpeaking ? "Speaking…" : label}
      </button>
    );
  }

  if (variant === "footer") {
    return (
      <button
        type="button"
        aria-pressed={voiceEnabled}
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
          voiceEnabled
            ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200 hover:border-emerald-400/55"
            : "border-white/15 bg-white/5 text-[#b8c9e1] hover:border-white/25"
        } ${className}`}
      >
        <span
          className={`inline-flex h-2 w-2 rounded-full ${voiceEnabled ? "bg-emerald-400" : "bg-zinc-500"} ${isSpeaking ? "animate-pulse" : ""}`}
          aria-hidden="true"
        />
        {label}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-24 right-4 z-[180] sm:bottom-6 sm:right-6 ${className}`}>
      <button
        type="button"
        aria-pressed={voiceEnabled}
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition ${
          voiceEnabled
            ? "border-emerald-400/45 bg-[#041510]/92 text-emerald-100 hover:border-emerald-300/65"
            : "border-white/15 bg-[#0a0e1f]/92 text-[#b8c9e1] hover:border-white/30"
        }`}
      >
        <span
          className={`inline-flex h-2.5 w-2.5 rounded-full ${voiceEnabled ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]" : "bg-zinc-500"}`}
          aria-hidden="true"
        />
        {isSpeaking ? "AI Speaking…" : label}
      </button>
    </div>
  );
}
