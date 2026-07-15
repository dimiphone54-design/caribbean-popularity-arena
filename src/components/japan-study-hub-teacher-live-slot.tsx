"use client";

import { useState } from "react";
import {
  EMPTY_JAPAN_TEACHER_APPLICATION,
  JAPAN_TEACHER_GIFT_TIERS,
  JAPAN_TEACHER_LEVELS,
  JAPAN_TEACHER_SLOTS,
  JAPAN_TEACHER_SUBJECTS,
  japanTeacherSlotMeta,
  type JapanTeacherApplicationForm,
  type JapanTeacherGiftTier,
  type JapanTeacherProfile,
} from "@/lib/japan-study-hub-teacher-slot";

/* ─────────────────────────────────────────────────────────
   GIFT BUTTON
───────────────────────────────────────────────────────── */
function GiftButton({
  tier,
  onGift,
}: {
  tier: JapanTeacherGiftTier;
  onGift: (t: JapanTeacherGiftTier) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onGift(tier)}
      className="flex flex-col items-center gap-1 rounded-xl border border-[#ff4466]/25 bg-[#1a0810]/70 px-3 py-2 transition hover:border-[#ff4466]/60 hover:bg-[#1a0810] active:scale-95"
      title={tier.effect}
    >
      <span className="text-xl" aria-hidden="true">{tier.emoji}</span>
      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#fff0f3]">{tier.label}</span>
      <span className="text-[10px] font-bold text-[#ff4466]">¥{tier.amountYen.toLocaleString()}</span>
      <span className="text-[9px] text-[#fca5a5]/70">{tier.effect}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   GIFT TOAST
───────────────────────────────────────────────────────── */
function GiftToast({
  tier,
  teacherName,
  onDone,
}: {
  tier: JapanTeacherGiftTier;
  teacherName: string;
  onDone: () => void;
}) {
  return (
    <div
      className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-sm rounded-2xl border border-[#ff4466]/50 bg-[#1a0810]/95 p-4 text-center shadow-[0_0_40px_rgba(255,68,102,0.25)] backdrop-blur-md"
      role="alert"
    >
      <p className="text-3xl" aria-hidden="true">{tier.emoji}</p>
      <p className="mt-2 text-sm font-black text-[#fff0f3]">
        You sent {tier.label} to {teacherName}!
      </p>
      <p className="mt-1 text-xs text-[#fca5a5]">¥{tier.amountYen.toLocaleString()} sent 🎉</p>
      <p className="mt-1 text-[10px] text-[#64748b]">{tier.effect}</p>
      <button
        type="button"
        onClick={onDone}
        className="mt-3 rounded-lg border border-[#ff4466]/30 px-4 py-1.5 text-xs font-bold text-[#fff0f3] transition hover:border-[#ff4466]/60"
      >
        Close
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MULTI-STEP APPLY FORM
   Step 1 · Personal  Step 2 · Academic  Step 3 · Teaching  Step 4 · Payment
───────────────────────────────────────────────────────── */
const STEPS = ["Personal", "Academic", "Teaching", "Payment"] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black border transition
              ${i < current ? "border-[#fca5a5] bg-[#2d0a14] text-[#fca5a5]" :
                i === current ? "border-[#ff4466] bg-[#ff4466] text-[#fff0f3]" :
                "border-[#3d1520] bg-transparent text-[#374151]"}`}
          >
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-[0.1em] hidden sm:inline
            ${i === current ? "text-[#ff4466]" : "text-[#374151]"}`}>
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span className={`mx-1 text-[10px] ${i < current ? "text-[#ff4466]" : "text-[#3d1520]"}`}>—</span>
          )}
        </div>
      ))}
    </div>
  );
}

function FieldInput({
  id, label, placeholder, value, onChange, type = "text", required = true,
}: {
  id: string; label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={id} type={type} required={required} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[#3d1520] bg-[#0d0408] px-3 py-2 text-sm text-[#fff0f3] placeholder-[#374151] outline-none focus:border-[#ff4466]/50"
      />
    </div>
  );
}

function TeacherApplyForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<JapanTeacherApplicationForm>(EMPTY_JAPAN_TEACHER_APPLICATION);

  const set = (key: keyof JapanTeacherApplicationForm) => (val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#ff4466]/30 bg-[#1a0810]/90 p-5 text-center space-y-3">
        <p className="text-3xl">🎌</p>
        <p className="text-sm font-black text-[#fff0f3]">Application received!</p>
        <p className="text-xs leading-5 text-[#fca5a5]/80">
          We&apos;ll review your profile and add you to the Japan Study Hub live slots.
          Approved creator payouts will be sent by the platform using the payout details you provided.
        </p>
        <button type="button" onClick={onClose}
          className="mt-2 rounded-lg border border-[#ff4466]/30 px-4 py-1.5 text-xs font-bold text-[#ff4466] transition hover:border-[#ff4466]/60">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}
      className="rounded-2xl border border-[#ff4466]/25 bg-[#1a0810]/90 p-5 space-y-4"
      aria-label="Apply to teach in the Japan Study Hub">

      <header>
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#ff4466]">
          Japan Study Hub · Teacher Application
        </p>
        <h3 className="mt-1 text-base font-black text-[#fff0f3]">Apply to go live</h3>
        <p className="mt-1 text-xs leading-5 text-[#94a3b8]">
          Free to go live. Students pay through platform checkout and approved teacher payouts are handled by the platform.
        </p>
      </header>

      <StepIndicator current={step} />

      {/* ── STEP 1 · Personal ── */}
      {step === 0 && (
        <div className="space-y-3">
          <FieldInput id="jhf-fullname" label="Full name" placeholder="e.g. Yuki Tanaka"
            value={form.fullName} onChange={set("fullName")} />
          <FieldInput id="jhf-email" label="Email address" placeholder="you@example.com"
            type="email" value={form.email} onChange={set("email")} />
        </div>
      )}

      {/* ── STEP 2 · Academic ── */}
      {step === 1 && (
        <div className="space-y-3">
          <FieldInput id="jhf-uni" label="University / language school attended or attending"
            placeholder="e.g. Waseda University · JLI Tokyo" value={form.university} onChange={set("university")} />
          <FieldInput id="jhf-degree" label="Degree / certification subject"
            placeholder="e.g. Japanese Language · JLPT N1 · Education"
            value={form.degreeSubject} onChange={set("degreeSubject")} />
          <FieldInput id="jhf-years-study" label="Years of study completed"
            placeholder="e.g. 4 years · or currently in year 2"
            value={form.yearsOfStudy} onChange={set("yearsOfStudy")} />
          <div className="flex items-center gap-2">
            <input id="jhf-currently-studying" type="checkbox"
              checked={form.isCurrentlyStudying}
              onChange={(e) => set("isCurrentlyStudying")(e.target.checked)}
              className="h-4 w-4 rounded border-[#3d1520] accent-[#ff4466]" />
            <label htmlFor="jhf-currently-studying" className="text-xs text-[#94a3b8]">
              I am currently enrolled / attending
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="jhf-teacher-level" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
              Teaching / proficiency level<span className="text-red-400 ml-0.5">*</span>
            </label>
            <select id="jhf-teacher-level" required
              value={form.teacherLevel}
              onChange={(e) => set("teacherLevel")(e.target.value)}
              className="rounded-lg border border-[#3d1520] bg-[#0d0408] px-3 py-2 text-sm text-[#fff0f3] outline-none focus:border-[#ff4466]/50">
              <option value="">Select your level…</option>
              {JAPAN_TEACHER_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── STEP 3 · Teaching ── */}
      {step === 2 && (
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="jhf-subject-teach" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
              Subject you want to teach<span className="text-red-400 ml-0.5">*</span>
            </label>
            <select id="jhf-subject-teach" required
              value={form.subjectToTeach}
              onChange={(e) => set("subjectToTeach")(e.target.value)}
              className="rounded-lg border border-[#3d1520] bg-[#0d0408] px-3 py-2 text-sm text-[#fff0f3] outline-none focus:border-[#ff4466]/50">
              <option value="">Choose a subject…</option>
              {JAPAN_TEACHER_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>
              ))}
            </select>
          </div>
          <FieldInput id="jhf-years-teach" label="Years of teaching experience"
            placeholder="e.g. 3 years · or first year as tutor"
            value={form.yearsTeaching} onChange={set("yearsTeaching")} />
          <FieldInput id="jhf-availability" label="When you can go live"
            placeholder="e.g. Weekday evenings JST · Saturday mornings"
            value={form.availability} onChange={set("availability")} />
          <div className="flex flex-col gap-1">
            <label htmlFor="jhf-bio" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
              Short bio
            </label>
            <textarea id="jhf-bio" rows={3}
              placeholder="e.g. Native Japanese speaker, JLPT N1 certified, 4 years teaching Japanese to beginners online."
              value={form.shortBio}
              onChange={(e) => set("shortBio")(e.target.value)}
              className="rounded-lg border border-[#3d1520] bg-[#0d0408] px-3 py-2 text-sm text-[#fff0f3] placeholder-[#374151] outline-none focus:border-[#ff4466]/50 resize-none" />
          </div>
        </div>
      )}

      {/* ── STEP 4 · Payment ── */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[#fbbf24]/20 bg-[#1c1200]/50 p-3">
            <p className="text-[10px] font-bold text-[#fbbf24]">
              🎁 Gifts from students are processed through the platform this month
            </p>
            <p className="mt-1 text-[10px] text-[#94a3b8]">
              Enter payout details so the platform can send your approved creator earnings.
              Sensitive payment information should be tokenized by a real payout provider before production use.
            </p>
          </div>
          <FieldInput id="jhf-cardholder" label="Cardholder name"
            placeholder="Name exactly as on your card"
            value={form.cardholderName} onChange={set("cardholderName")} />
          <FieldInput id="jhf-cardnum" label="Card number"
            placeholder="1234 5678 9012 3456" type="text"
            value={form.cardNumber} onChange={set("cardNumber")} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput id="jhf-expiry" label="Expiry date"
              placeholder="MM / YY" value={form.cardExpiry} onChange={set("cardExpiry")} />
            <FieldInput id="jhf-cvc" label="CVC"
              placeholder="123" value={form.cardCvc} onChange={set("cardCvc")} />
          </div>
          <FieldInput id="jhf-payout-email" label="Payout email (PayPal or bank link)"
            placeholder="payments@yourmail.com" type="email"
            value={form.payoutEmail} onChange={set("payoutEmail")} />
        </div>
      )}

      {/* ── Nav buttons ── */}
      <div className="flex gap-2 pt-1">
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-[#3d1520] px-4 py-2.5 text-xs font-bold text-[#64748b] transition hover:border-[#374151]">
            ← Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)}
            className="flex-1 rounded-xl border border-[#ff4466]/40 bg-gradient-to-r from-[#2d0a14]/90 to-[#5c1528]/60 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#ff4466] transition hover:border-[#ff4466]/70 hover:brightness-110">
            Next →
          </button>
        ) : (
          <button type="submit"
            className="flex-1 rounded-xl border border-[#fbbf24]/50 bg-gradient-to-r from-[#1c1200]/90 to-[#451a03]/60 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#fbbf24] transition hover:border-[#fbbf24]/80 hover:brightness-110">
            Submit & go live 🎌
          </button>
        )}
        <button type="button" onClick={onClose}
          className="rounded-xl border border-[#3d1520] px-4 py-2.5 text-xs font-bold text-[#64748b] transition hover:border-[#374151]">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────
   TEACHER CARD
───────────────────────────────────────────────────────── */
function TeacherCard({ teacher }: { teacher: JapanTeacherProfile }) {
  const [giftSent, setGiftSent] = useState<JapanTeacherGiftTier | null>(null);
  const [showGifts, setShowGifts] = useState(false);
  const isOpenSlot = teacher.subject === "Open slot";

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#ff4466]/40 bg-gradient-to-br from-[#1a0810]/90 to-[#2d0a14]/80 p-4 shadow-[0_0_24px_rgba(255,68,102,0.08)] transition hover:border-[#ff4466]/70 hover:shadow-[0_0_32px_rgba(255,68,102,0.18)]">
      {/* animated red corner accent */}
      <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-8 -right-8 h-16 w-16 rotate-45 bg-gradient-to-br from-[#ff4466]/20 to-transparent" />
      </div>

      {teacher.isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.12em] text-red-400">Live</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#ff4466]/50 bg-[#2d0a14] text-xl font-black text-[#ff4466] shadow-[0_0_12px_rgba(255,68,102,0.2)]">
          {teacher.avatarInitials}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="truncate text-sm font-black tracking-wide text-[#fff0f3]">{teacher.name}</p>
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff4466]/70">{teacher.subject}</p>
          {teacher.title !== "Your subject here" && (
            <p className="truncate text-[10px] text-[#64748b]">{teacher.title}</p>
          )}
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-[#94a3b8]">{teacher.bio}</p>

      {teacher.isLive && teacher.viewers > 0 && (
        <p className="mt-1 text-[10px] font-bold text-[#ff4466]">
          👁 {teacher.viewers.toLocaleString()} watching
        </p>
      )}
      {teacher.totalGiftsYen > 0 && (
        <p className="mt-1 text-[10px] text-[#fca5a5]/70">
          🎁 ¥{teacher.totalGiftsYen.toLocaleString()} gifted this session
        </p>
      )}

      {!isOpenSlot ? (
        <div className="mt-3 space-y-2">
          {teacher.isLive ? (
            <button type="button"
              className="w-full rounded-xl border border-[#ff4466]/40 bg-gradient-to-r from-[#2d0a14]/90 to-[#5c1528]/60 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#ff4466] transition hover:border-[#ff4466]/70">
              🔴 Join live session
            </button>
          ) : (
            <p className="rounded-xl border border-[#3d1520] py-2 text-center text-[10px] font-bold text-[#374151]">
              Not live right now
            </p>
          )}
          <button type="button" onClick={() => setShowGifts((v) => !v)}
            className="w-full rounded-xl border border-[#ff4466]/25 bg-[#1a0810]/60 py-2 text-xs font-bold text-[#ff4466] transition hover:border-[#ff4466]/50">
            {showGifts ? "Hide gifts ↑" : "🎁 Send a gift →"}
          </button>
          {showGifts && (
            <div className="grid grid-cols-3 gap-2 pt-1">
              {JAPAN_TEACHER_GIFT_TIERS.map((tier) => (
                <GiftButton key={tier.id} tier={tier} onGift={setGiftSent} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-[#ff4466]/30 bg-[#ff4466]/5 py-3 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ff4466]/60">
            🎌 Slot open
          </p>
          <p className="mt-0.5 text-[9px] text-[#64748b]">Waiting for a Japanese educator</p>
        </div>
      )}

      {giftSent && (
        <GiftToast tier={giftSent} teacherName={teacher.name} onDone={() => setGiftSent(null)} />
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */
export function JapanStudyHubTeacherLiveSlot() {
  const [showApply, setShowApply] = useState(false);
  const meta = japanTeacherSlotMeta;

  return (
    <section className="japan-study-hub-teacher-slot space-y-0" aria-label={meta.title}>
      <header className="text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff4466] sm:text-xs">{meta.kicker}</p>
        <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-widest text-[#eef6ff] sm:text-4xl">
          {meta.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">{meta.description}</p>
      </header>

      <div className="grid gap-0 sm:grid-cols-2 -mt-2">
        {JAPAN_TEACHER_SLOTS.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {!showApply ? (
        <div className="text-center pt-0">
          <button type="button" onClick={() => setShowApply(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ff4466]/35 bg-[#2d0a14]/60 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#ff4466] transition hover:border-[#ff4466]/65 hover:bg-[#2d0a14]/80">
            🎌 {meta.applyLabel}
          </button>
          <p className="mt-0 text-[10px] text-[#475569]">{meta.applyHint}</p>
        </div>
      ) : (
        <TeacherApplyForm onClose={() => setShowApply(false)} />
      )}
    </section>
  );
}
