"use client";

import { useEffect, useRef, useState } from "react";
import { LiveSlotMarketRateCard } from "@/components/live-slot-market-rate-card";
import {
  EMPTY_MAKEUP_SIGNUP,
  MAKEUP_GIFT_TIERS,
  MAKEUP_PAYOUT_METHODS,
  MAKEUP_SLOT_DURATION_MS,
  MAKEUP_STYLES,
  MAKEUP_TOURNAMENT_SEED,
  makeupSlotMeta,
  type MakeupGiftTier,
  type MakeupLiveSlot,
  type MakeupSlotSignupForm,
  type MakeupTournamentEntry,
} from "@/lib/uk-makeup-live-slot";

/* ─── Countdown hook ─────────────────────────────────── */
function useCountdown(startedAt: number | null) {
  const [remaining, setRemaining] = useState(MAKEUP_SLOT_DURATION_MS);

  useEffect(() => {
    if (!startedAt) return;
    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const left = Math.max(0, MAKEUP_SLOT_DURATION_MS - elapsed);
      setRemaining(left);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  const totalSec = Math.floor(remaining / 1000);
  const mins = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const secs = String(totalSec % 60).padStart(2, "0");
  return { label: `${mins}:${secs}`, isExpired: remaining === 0, remaining };
}

/* ─── Gift toast ─────────────────────────────────────── */
function GiftToast({ tier, creatorName, onDone }: { tier: MakeupGiftTier; creatorName: string; onDone: () => void }) {
  return (
    <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-sm rounded-2xl border border-[#ff2bd6]/50 bg-[#0a0010]/95 p-4 text-center shadow-[0_0_40px_rgba(255,43,214,0.3)] backdrop-blur-md" role="alert">
      <p className="text-4xl">{tier.emoji}</p>
      <p className="mt-2 text-sm font-black text-[#fef9c3]">You sent {tier.label} to <span className="text-[#ff2bd6]">{creatorName}</span>!</p>
      <p className="mt-1 text-xs text-[#86efac]">Platform checkout processes £{tier.amountGbp}. Creator share is paid out by the platform 💖</p>
      <p className="mt-1 text-[10px] text-[#64748b]">{tier.effect}</p>
      <button type="button" onClick={onDone} className="mt-3 rounded-lg border border-[#ff2bd6]/30 px-4 py-1.5 text-xs font-bold text-[#fef9c3] hover:border-[#ff2bd6]/60 transition">Close</button>
    </div>
  );
}

/* ─── Signup form ────────────────────────────────────── */
const SIGNUP_STEPS = ["Personal", "Payout", "Profile"] as const;

function SignupStepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {SIGNUP_STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black border transition
            ${i < current ? "border-[#ff2bd6] bg-[#1a0020] text-[#ff2bd6]" :
              i === current ? "border-[#ff2bd6] bg-[#ff2bd6] text-[#0a0010]" :
              "border-[#2d0040] bg-transparent text-[#374151]"}`}>
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-[0.1em] hidden sm:inline ${i === current ? "text-[#ff2bd6]" : "text-[#374151]"}`}>{label}</span>
          {i < SIGNUP_STEPS.length - 1 && <span className={`mx-1 text-[10px] ${i < current ? "text-[#ff2bd6]" : "text-[#2d0040]"}`}>—</span>}
        </div>
      ))}
    </div>
  );
}

function FieldInput({ id, label, placeholder, value, onChange, type = "text", required = true }:
  { id: string; label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input id={id} type={type} required={required} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[#2d0040] bg-[#0a0010] px-3 py-2 text-sm text-[#fef9c3] placeholder-[#374151] outline-none focus:border-[#ff2bd6]/50" />
    </div>
  );
}

function SlotSignupForm({ slotNumber, onSubmit, onCancel }: {
  slotNumber: 1 | 2;
  onSubmit: (form: MakeupSlotSignupForm) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<MakeupSlotSignupForm>(EMPTY_MAKEUP_SIGNUP);
  const set = (key: keyof MakeupSlotSignupForm) => (val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < SIGNUP_STEPS.length - 1) { setStep((s) => s + 1); return; }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-[#ff2bd6]/25 bg-[#0a0010]/95 p-4">
      <header>
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#ff2bd6]">Slot {slotNumber} · Apply to go live</p>
        <h4 className="mt-0.5 text-sm font-black text-[#fef9c3]">Enter your details to claim this slot</h4>
        <p className="mt-0.5 text-[10px] text-[#94a3b8]">1 hour live · gifts paid through the platform · creator payout handled by the platform worldwide</p>
      </header>

      <SignupStepIndicator current={step} />

      {/* Step 1 · Personal */}
      {step === 0 && (
        <div className="space-y-3">
          <FieldInput id="ms-name" label="Full name" placeholder="e.g. Jade Monroe" value={form.fullName} onChange={set("fullName")} />
          <FieldInput id="ms-email" label="Email" placeholder="you@example.com" type="email" value={form.email} onChange={set("email")} />
          <FieldInput id="ms-country" label="Country you are in" placeholder="e.g. United Kingdom" value={form.country} onChange={set("country")} />
        </div>
      )}

      {/* Step 2 · Payout */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[#fbbf24]/20 bg-[#1c1200]/50 p-3">
            <p className="text-[10px] font-bold text-[#fbbf24]">🎁 Gifts are processed through the platform this month</p>
            <p className="mt-1 text-[10px] text-[#94a3b8]">Choose how you want to receive your creator payout — the platform sends your share worldwide after your session ends.</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">Payout method<span className="text-red-400 ml-0.5">*</span></p>
            <div className="grid grid-cols-3 gap-2">
              {MAKEUP_PAYOUT_METHODS.map((m) => (
                <button key={m.id} type="button"
                  onClick={() => set("payoutMethod")(m.id)}
                  className={`rounded-xl border py-2 text-xs font-black transition ${form.payoutMethod === m.id ? "border-[#ff2bd6]/70 bg-[#1a0020] text-[#ff2bd6]" : "border-[#2d0040] text-[#64748b] hover:border-[#ff2bd6]/30"}`}>
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>
          {form.payoutMethod === "paypal" && (
            <FieldInput id="ms-paypal" label="PayPal email" placeholder="paypal@yourmail.com" type="email" value={form.paypalEmail} onChange={set("paypalEmail")} />
          )}
          {form.payoutMethod === "bank" && (
            <FieldInput id="ms-iban" label="Bank IBAN / account number" placeholder="GB29 NWBK 6016 1331 9268 19" value={form.bankIban} onChange={set("bankIban")} />
          )}
          {form.payoutMethod === "card" && (
            <div className="space-y-3">
              <FieldInput id="ms-cardholder" label="Cardholder name" placeholder="Name on card" value={form.cardholderName} onChange={set("cardholderName")} />
              <FieldInput id="ms-cardnum" label="Card number" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={set("cardNumber")} />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput id="ms-expiry" label="Expiry" placeholder="MM / YY" value={form.cardExpiry} onChange={set("cardExpiry")} />
                <FieldInput id="ms-cvc" label="CVC" placeholder="123" value={form.cardCvc} onChange={set("cardCvc")} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3 · Profile */}
      {step === 2 && (
        <div className="space-y-3">
          <FieldInput id="ms-handle" label="Instagram / TikTok handle" placeholder="@yourhandle" value={form.instagramHandle} onChange={set("instagramHandle")} />
          <div className="flex flex-col gap-1">
            <label htmlFor="ms-style" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">Makeup style<span className="text-red-400 ml-0.5">*</span></label>
            <select id="ms-style" required value={form.makeupStyle} onChange={(e) => set("makeupStyle")(e.target.value)}
              className="rounded-lg border border-[#2d0040] bg-[#0a0010] px-3 py-2 text-sm text-[#fef9c3] outline-none focus:border-[#ff2bd6]/50">
              <option value="">Choose your style…</option>
              {MAKEUP_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-[#2d0040] px-4 py-2.5 text-xs font-bold text-[#64748b] hover:border-[#374151] transition">← Back</button>
        )}
        <button type="submit"
          className="flex-1 rounded-xl border border-[#ff2bd6]/40 bg-gradient-to-r from-[#1a0020]/90 to-[#2d0040]/60 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#ff2bd6] hover:border-[#ff2bd6]/70 hover:brightness-110 transition">
          {step < SIGNUP_STEPS.length - 1 ? "Next →" : "🎤 Claim slot & go live"}
        </button>
        <button type="button" onClick={onCancel}
          className="rounded-xl border border-[#2d0040] px-4 py-2.5 text-xs font-bold text-[#64748b] hover:border-[#374151] transition">Cancel</button>
      </div>
    </form>
  );
}

/* ─── Live slot card ─────────────────────────────────── */
function LiveSlotCard({ slot, onClaim, onGift }: {
  slot: MakeupLiveSlot;
  onClaim: (slotNumber: 1 | 2) => void;
  onGift: (slotNumber: 1 | 2, tier: MakeupGiftTier) => void;
}) {
  const { label: timeLabel, isExpired } = useCountdown(slot.startedAt);
  const [showGifts, setShowGifts] = useState(false);
  const [toast, setToast] = useState<MakeupGiftTier | null>(null);
  const isOpen = slot.status === "open";
  const isLive = slot.status === "live";
  const isEnded = slot.status === "ended" || isExpired;

  const handleGift = (tier: MakeupGiftTier) => {
    setToast(tier);
    onGift(slot.slotNumber, tier);
  };

  return (
    <article className={`relative overflow-hidden rounded-2xl border p-4 transition
      ${isLive ? "border-[#ff2bd6]/50 bg-gradient-to-br from-[#0a0010]/95 to-[#1a0020]/90 shadow-[0_0_32px_rgba(255,43,214,0.15)]" :
        isOpen ? "border-[#ff2bd6]/20 bg-[#0a0010]/80" :
        "border-[#2d0040]/50 bg-[#0a0010]/60 opacity-70"}`}>

      {/* Slot number badge */}
      <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#ff2bd6]/40 bg-[#1a0020] text-[10px] font-black text-[#ff2bd6]">
        {slot.slotNumber}
      </div>

      {/* Live / Open / Ended badge */}
      <div className="absolute top-3 right-3">
        {isLive && !isExpired && (
          <div className="flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.12em] text-red-400">Live</span>
          </div>
        )}
        {isOpen && <span className="rounded-full border border-[#ff2bd6]/30 bg-[#1a0020] px-2 py-0.5 text-[9px] font-black uppercase text-[#ff2bd6]">Open</span>}
        {isEnded && <span className="rounded-full border border-[#374151] bg-[#0a0010] px-2 py-0.5 text-[9px] font-black uppercase text-[#64748b]">Ended</span>}
      </div>

      {/* Creator info */}
      <div className="mt-6">
        {slot.creator ? (
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#ff2bd6]/40 bg-[#1a0020] text-xl">💄</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-[#fef9c3]">{slot.creator.fullName}</p>
              <p className="truncate text-[10px] font-bold text-[#ff2bd6]">{slot.creator.makeupStyle}</p>
              <p className="truncate text-[9px] text-[#64748b]">{slot.creator.instagramHandle} · {slot.creator.country}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#ff2bd6]/25 bg-[#1a0020] text-2xl">+</div>
            <div>
              <p className="text-sm font-black text-[#fef9c3]">Slot {slot.slotNumber} · Open</p>
              <p className="text-[10px] text-[#64748b]">Waiting for a makeup creator</p>
            </div>
          </div>
        )}
      </div>

      {/* Countdown */}
      {isLive && !isExpired && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-[#ff2bd6]/20 bg-[#1a0020]/60 px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">⏱ Time left</span>
          <span className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#ff2bd6]">{timeLabel}</span>
        </div>
      )}

      {isEnded && slot.creator && (
        <div className="mt-3 rounded-xl border border-[#fbbf24]/20 bg-[#1c1200]/60 px-3 py-2 text-center">
          <p className="text-[10px] font-black text-[#fbbf24]">Session ended · £{slot.totalGiftsGbp.toFixed(2)} earned</p>
          <p className="text-[9px] text-[#64748b]">Email sent to {slot.creator.email} · slot now open</p>
        </div>
      )}

      {/* Gift total */}
      {isLive && (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-[#94a3b8]">🎁 Total gifted</span>
          <span className="text-sm font-black text-[#fbbf24]">£{slot.totalGiftsGbp.toFixed(2)}</span>
        </div>
      )}

      {/* Recent gifts */}
      {slot.giftLog.length > 0 && (
        <div className="mt-2 space-y-1 max-h-20 overflow-y-auto">
          {[...slot.giftLog].reverse().slice(0, 4).map((g, i) => (
            <p key={i} className="text-[9px] text-[#94a3b8]">
              <span>{g.emoji}</span> <span className="font-bold text-[#fef9c3]">{g.senderName}</span> sent {g.label} · £{g.amountGbp}
            </p>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 space-y-2">
        {isOpen && (
          <button type="button" onClick={() => onClaim(slot.slotNumber)}
            className="w-full rounded-xl border border-[#ff2bd6]/40 bg-gradient-to-r from-[#1a0020]/90 to-[#2d0040]/60 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#ff2bd6] transition hover:border-[#ff2bd6]/70 hover:brightness-110">
            🎤 Claim this slot
          </button>
        )}
        {isLive && !isExpired && (
          <>
            <button type="button" onClick={() => setShowGifts((v) => !v)}
              className="w-full rounded-xl border border-[#ff2bd6]/30 bg-[#1a0020]/60 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#ff2bd6] transition hover:border-[#ff2bd6]/55">
              {showGifts ? "Hide gifts ↑" : "🎁 Send a gift"}
            </button>
            {showGifts && (
              <div className="grid grid-cols-3 gap-2">
                {MAKEUP_GIFT_TIERS.map((tier) => (
                  <button key={tier.id} type="button" onClick={() => handleGift(tier)} title={tier.effect}
                    className="flex flex-col items-center gap-1 rounded-xl border border-[#ff2bd6]/20 bg-[#0a0010]/70 py-2 transition hover:border-[#ff2bd6]/50 active:scale-95">
                    <span className="text-xl">{tier.emoji}</span>
                    <span className="text-[9px] font-black text-[#fef9c3]">{tier.label}</span>
                    <span className="text-[9px] font-bold text-[#ff2bd6]">£{tier.amountGbp}</span>
                    <span className="text-[8px] text-[#86efac]/60">Platform payout share</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {toast && slot.creator && (
        <GiftToast tier={toast} creatorName={slot.creator.fullName} onDone={() => setToast(null)} />
      )}
    </article>
  );
}

/* ─── Tournament table ───────────────────────────────── */
function TournamentTable({ entries }: { entries: MakeupTournamentEntry[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ff2bd6]/20 bg-[#0a0010]/80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#ff2bd6]/15">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#ff2bd6]">🏆 Makeup Live · Tournament</p>
          <p className="text-[10px] text-[#64748b]">All-time champions · most gifted wins</p>
        </div>
        <span className="text-2xl">👑</span>
      </div>
      <div className="divide-y divide-[#ff2bd6]/10">
        {entries.map((entry) => (
          <div key={entry.id} className={`flex items-center gap-3 px-4 py-3 ${entry.isChampion ? "bg-[#1a0020]/60" : ""}`}>
            <span className={`w-6 text-center text-sm font-black ${entry.rank === 1 ? "text-[#fbbf24]" : entry.rank === 2 ? "text-[#94a3b8]" : entry.rank === 3 ? "text-[#cd7f32]" : "text-[#374151]"}`}>
              {entry.rank === 1 ? "👑" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-black text-[#fef9c3]">{entry.fullName}
                {entry.isChampion && <span className="ml-1.5 text-[9px] font-black text-[#fbbf24]">CHAMP</span>}
              </p>
              <p className="truncate text-[9px] text-[#64748b]">{entry.instagramHandle} · {entry.makeupStyle} · {entry.country}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-black text-[#fbbf24]">£{entry.totalGiftsGbp}</p>
              <p className="text-[9px] text-[#374151]">{entry.sessionDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────── */
export function UKMakeupLiveSlots() {
  const [slots, setSlots] = useState<MakeupLiveSlot[]>([
    { slotNumber: 1, status: "open", creator: null, startedAt: null, totalGiftsGbp: 0, giftLog: [] },
    { slotNumber: 2, status: "open", creator: null, startedAt: null, totalGiftsGbp: 0, giftLog: [] },
  ]);
  const [claimingSlot, setClaimingSlot] = useState<1 | 2 | null>(null);
  const [tournament, setTournament] = useState<MakeupTournamentEntry[]>(MAKEUP_TOURNAMENT_SEED);

  // Watch for expired slots and end them
  useEffect(() => {
    const id = window.setInterval(() => {
      setSlots((prev) => prev.map((slot) => {
        if (slot.status !== "live" || !slot.startedAt) return slot;
        const elapsed = Date.now() - slot.startedAt;
        if (elapsed >= MAKEUP_SLOT_DURATION_MS) {
          // Add to tournament
          if (slot.creator) {
            setTournament((t) => {
              const newEntry: MakeupTournamentEntry = {
                id: `t-${Date.now()}-${slot.slotNumber}`,
                rank: 0,
                fullName: slot.creator!.fullName,
                instagramHandle: slot.creator!.instagramHandle || "@unknown",
                makeupStyle: slot.creator!.makeupStyle,
                country: slot.creator!.country,
                totalGiftsGbp: slot.totalGiftsGbp,
                sessionDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                isChampion: false,
              };
              const updated = [...t, newEntry]
                .sort((a, b) => b.totalGiftsGbp - a.totalGiftsGbp)
                .map((e, i) => ({ ...e, rank: i + 1, isChampion: i === 0 }));
              return updated;
            });
          }
          return { ...slot, status: "ended" as const };
        }
        return slot;
      }));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleClaim = (slotNumber: 1 | 2) => setClaimingSlot(slotNumber);

  const handleSignupSubmit = (form: import("@/lib/uk-makeup-live-slot").MakeupSlotSignupForm) => {
    if (!claimingSlot) return;
    setSlots((prev) => prev.map((s) =>
      s.slotNumber === claimingSlot
        ? { ...s, status: "live", creator: { fullName: form.fullName, instagramHandle: form.instagramHandle, makeupStyle: form.makeupStyle, country: form.country, email: form.email, payoutMethod: form.payoutMethod }, startedAt: Date.now(), totalGiftsGbp: 0, giftLog: [] }
        : s
    ));
    setClaimingSlot(null);
  };

  const handleGift = (slotNumber: 1 | 2, tier: MakeupGiftTier) => {
    setSlots((prev) => prev.map((s) => {
      if (s.slotNumber !== slotNumber) return s;
      return {
        ...s,
        totalGiftsGbp: s.totalGiftsGbp + tier.amountGbp,
        giftLog: [...s.giftLog, { emoji: tier.emoji, label: tier.label, amountGbp: tier.amountGbp, senderName: "You", ts: Date.now() }],
      };
    }));
  };

  const meta = makeupSlotMeta;

  return (
    <section className="uk-makeup-live-slots space-y-5" aria-label="UK Makeup Live Slots">
      {/* Header */}
      <header className="text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#ff2bd6]">{meta.kicker}</p>
        <h2 className="mt-1 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#fef9c3] sm:text-3xl">{meta.title}</h2>
        <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#94a3b8]">{meta.description}</p>
        {/* Rules */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {meta.slotRules.map((rule) => (
            <span key={rule} className="inline-flex items-center gap-1 rounded-full border border-[#ff2bd6]/20 bg-[#1a0020]/60 px-3 py-1 text-[9px] font-bold text-[#94a3b8]">{rule}</span>
          ))}
        </div>
      </header>

      {/* Signup form overlay */}
      {claimingSlot && (
        <SlotSignupForm slotNumber={claimingSlot} onSubmit={handleSignupSubmit} onCancel={() => setClaimingSlot(null)} />
      )}

      {/* 2 live slots */}
      {!claimingSlot && (
        <div className="grid gap-4 sm:grid-cols-2">
          {slots.map((slot) => (
            <LiveSlotCard key={slot.slotNumber} slot={slot} onClaim={handleClaim} onGift={handleGift} />
          ))}
        </div>
      )}

      {/* Tournament table */}
      <LiveSlotMarketRateCard countryId="uk" title="UK makeup live rates · 5% below public reference" />
      <TournamentTable entries={tournament} />
    </section>
  );
}
