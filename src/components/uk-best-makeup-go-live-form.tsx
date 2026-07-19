"use client";

import { useState } from "react";
import {
  EMPTY_UK_MAKEUP_GO_LIVE,
  ukBestMakeupLookEdition,
  ukMakeupGoLiveLocations,
  type UkMakeupGoLiveForm,
  type UkMakeupLiveQueueEntry
} from "@/lib/uk-best-makeup-look";
import { MAKEUP_STYLES } from "@/lib/uk-makeup-live-slot";

type UkBestMakeupGoLiveFormProps = {
  open: boolean;
  onClose: () => void;
  onJoined: (entry: UkMakeupLiveQueueEntry) => void;
};

/**
 * Private form · creators who want to go live makeup (before they go live)
 * How It Works rules live here only — not on the public panel face
 */
export function UkBestMakeupGoLiveForm({ open, onClose, onJoined }: UkBestMakeupGoLiveFormProps) {
  const e = ukBestMakeupLookEdition;
  const [form, setForm] = useState<UkMakeupGoLiveForm>(EMPTY_UK_MAKEUP_GO_LIVE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const set =
    (key: keyof UkMakeupGoLiveForm) =>
    (value: string | boolean) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setError(null);
    };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    if (!form.makeupStyle) {
      setError("Choose your makeup style.");
      return;
    }
    if (!form.liveFrom) {
      setError("Choose where you’ll go live from.");
      return;
    }
    if (!form.confirmHowItWorks) {
      setError("Confirm you understand How It Works before applying.");
      return;
    }
    if (!form.confirmAdult) {
      setError("You must confirm you are 18+ to join the live queue.");
      return;
    }

    setSubmitting(true);
    // Free public apply — paid boosts frozen in Command Center catalog
    const entry: UkMakeupLiveQueueEntry = {
      id: `muq-${Date.now()}`,
      fullName: form.fullName.trim(),
      makeupStyle: form.makeupStyle,
      liveFrom: form.liveFrom,
      joinedAtLabel: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/London"
      }),
      visibilityPoints: 0,
      boostsPurchased: 0,
      boostSpendGbp: 0
    };
    onJoined(entry);
    setForm(EMPTY_UK_MAKEUP_GO_LIVE);
    setSubmitting(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="uk-makeup-go-live-title"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#ff2bd6]/35 bg-[linear-gradient(160deg,rgba(12,0,16,0.98),rgba(6,2,12,0.98))] p-4 shadow-[0_0_48px_rgba(255,43,214,0.2)] sm:p-5"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
          aria-label="Close go-live form"
        >
          ×
        </button>

        <header className="pr-8">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#ff2bd6]">
            Private · Apply to go live makeup
          </p>
          <h3 id="uk-makeup-go-live-title" className="mt-1 text-base font-black text-[#fef9c3] sm:text-lg">
            Join the auto live queue
          </h3>
          <p className="mt-1 text-[11px] leading-5 text-[#94a3b8]">
            For creators who want to go live after {e.hostFirstName}. Fill this form before you go live —
            not shown on the public panel.
          </p>
        </header>

        {/* How It Works · private rules for applicants only */}
        <div className="mt-4 rounded-xl border border-[#67e8f9]/25 bg-[#041018]/70 px-3 py-2.5">
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#67e8f9]">
            {e.howItWorksHeading} · private
          </p>
          <ol className="mt-2 space-y-1.5" role="list">
            {e.howItWorks.map((step, i) => (
              <li key={step} className="flex gap-2 text-[11px] leading-5 text-[#d7e3f6]" role="listitem">
                <span className="shrink-0 font-black text-[#ff2bd6]">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[10px] leading-4 text-[#8fa3bf]">
            Free apply · free go live. Paid gifts, vote unlocks, and boosts are frozen (owner catalog in
            Command Center).
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <Field
            id="gl-name"
            label="Full name"
            placeholder="e.g. Bella Soho"
            value={form.fullName}
            onChange={set("fullName")}
          />
          <Field
            id="gl-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
          />
          <Field
            id="gl-country"
            label="Country"
            placeholder="e.g. United Kingdom"
            value={form.country}
            onChange={set("country")}
            required={false}
          />
          <Field
            id="gl-handle"
            label="Instagram / TikTok"
            placeholder="@yourhandle"
            value={form.instagramHandle}
            onChange={set("instagramHandle")}
            required={false}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="gl-style" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
              Makeup style <span className="text-red-400">*</span>
            </label>
            <select
              id="gl-style"
              required
              value={form.makeupStyle}
              onChange={(event) => set("makeupStyle")(event.target.value)}
              className="rounded-lg border border-[#2d0040] bg-[#0a0010] px-3 py-2 text-sm text-[#fef9c3] outline-none focus:border-[#ff2bd6]/50"
            >
              <option value="">Choose your style…</option>
              {MAKEUP_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="gl-from" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
              Going live from <span className="text-red-400">*</span>
            </label>
            <select
              id="gl-from"
              required
              value={form.liveFrom}
              onChange={(event) => set("liveFrom")(event.target.value)}
              className="rounded-lg border border-[#2d0040] bg-[#0a0010] px-3 py-2 text-sm text-[#fef9c3] outline-none focus:border-[#ff2bd6]/50"
            >
              <option value="">Choose location…</option>
              {ukMakeupGoLiveLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[11px] leading-5 text-[#d7e3f6]">
            <input
              type="checkbox"
              checked={form.confirmHowItWorks}
              onChange={(event) => set("confirmHowItWorks")(event.target.checked)}
              className="mt-0.5"
            />
            <span>
              I understand How It Works: 60-minute free live session · free watch/chat for viewers ·
              next creator in the auto queue goes live after the hour · no paid gifts or boosts on this
              public panel.
            </span>
          </label>

          <label className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[11px] leading-5 text-[#d7e3f6]">
            <input
              type="checkbox"
              checked={form.confirmAdult}
              onChange={(event) => set("confirmAdult")(event.target.checked)}
              className="mt-0.5"
            />
            <span>
              I confirm I am 18+ and agree to the{" "}
              <a
                href="/legal/creator-agreement"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#67e8f9] underline underline-offset-2"
              >
                Creator Agreement
              </a>{" "}
              and{" "}
              <a
                href="/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#67e8f9] underline underline-offset-2"
              >
                Terms of Service
              </a>
              .
            </span>
          </label>
        </div>

        {error ? (
          <p className="mt-3 text-[11px] font-semibold text-red-300" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl border border-[#ff2bd6]/45 bg-gradient-to-r from-[#1a0020] to-[#2d0040] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-[#ff2bd6] transition hover:border-[#ff2bd6]/70 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Join queue · go live next"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 px-4 py-2.5 text-[11px] font-bold text-[#94a3b8] hover:border-white/30"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = true
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
        {label}
        {required ? <span className="ml-0.5 text-red-400">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-[#2d0040] bg-[#0a0010] px-3 py-2 text-sm text-[#fef9c3] placeholder-[#374151] outline-none focus:border-[#ff2bd6]/50"
      />
    </div>
  );
}
