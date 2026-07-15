"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { markArenaMemberAccess, readArenaMemberId, saveArenaMemberId } from "@/lib/arena-member-access";
import { arenaOnboardingCountries, detectBrowserCountryCode } from "@/lib/arena-onboarding-countries";
import { readMemberUsername, saveMemberUsername } from "@/lib/member-username-storage";

type MemberRegistrationWizardProps = {
  title: string;
  onSubmitted: () => void;
  embedded?: boolean;
};

// Standard styling used for normal steps
const standardInputClass =
  "mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2 text-sm text-[#f0edf8]";
const standardLabelClass = "text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]";

// Extra small styling used ONLY for Step 4
const step4InputClass =
  "mt-0.5 w-full rounded border border-white/10 bg-[#111830] px-2 py-1 text-[11px] text-[#f0edf8] focus:outline-none focus:border-[#38bdf8]/50";
const step4LabelClass = "text-[9px] font-bold uppercase tracking-[0.12em] text-[#7a82a8]";

const liveOptions = [
  "Sell products live",
  "Talk show / Q&A",
  "Dance performance",
  "Culture showcase",
  "Fashion try-on",
  "Beauty demo",
  "Music session",
  "Cooking / food demo",
  "Travel stories",
  "Motivation talk",
  "Product review / unboxing",
  "Games / interactive chat"
] as const;

export function MemberRegistrationWizard({ title, onSubmitted, embedded = false }: MemberRegistrationWizardProps) {
  const [step, setStep] = useState(0);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [islandCode, setIslandCode] = useState("US");
  const [liveFocusIndex, setLiveFocusIndex] = useState(0);
  const [showcaseItem, setShowcaseItem] = useState("");
  const [showcaseStore, setShowcaseStore] = useState("");
  const [showcaseNotes, setShowcaseNotes] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const countryEntry =
    arenaOnboardingCountries.find((entry) => entry.islandCode === islandCode) ?? arenaOnboardingCountries[0]!;

  useEffect(() => {
    const existing = readMemberUsername();
    if (existing) setDisplayName(existing);
    const savedId = readArenaMemberId();
    if (savedId) setMemberId(savedId);
    const detectedCountry = detectBrowserCountryCode();
    if (detectedCountry) setIslandCode(detectedCountry);
  }, []);

  const creatorInfoValid = displayName.trim().length >= 2 && email.includes("@") && islandCode.length >= 2;
  const formValid = creatorInfoValid && isAdult && acceptedTerms;

  const persistMember = async (nextMemberId?: string | null) => {
    const response = await fetch("/api/members/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: nextMemberId ?? memberId ?? undefined,
        displayName: displayName.trim(),
        email: email.trim(),
        country: countryEntry.country,
        islandCode,
        liveFocus: liveOptions[liveFocusIndex],
        dropshippingItemName: showcaseItem.trim(),
        dropshippingStoreUrl: showcaseStore.trim(),
        dropshippingNotes: showcaseNotes.trim(),
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        bankCountry: ""
      })
    });
    const payload = (await response.json()) as { ok?: boolean; memberId?: string; error?: string };
    if (!response.ok || !payload.ok || !payload.memberId) {
      throw new Error(payload.error ?? "Could not save member record");
    }
    setMemberId(payload.memberId);
    saveArenaMemberId(payload.memberId);
    return payload.memberId;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValid || saving) return;
    setSaving(true);
    setNotice(null);
    try {
      const id = await persistMember();
      saveMemberUsername(displayName.trim());
      markArenaMemberAccess();
      saveArenaMemberId(id);
      setSubmitted(true);
      onSubmitted();
      setNotice("Creator signup saved · terms accepted");
    } catch {
      setNotice("Could not save your creator signup · check connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 rounded-lg border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-3 text-xs leading-5 text-[#d9f7ef]">
        Signup complete. Profile live on welcome panel.
      </div>
    );
  }

  const steps = ["Terms", "Info", "Focus", "Dropship", "Finish"];

  return (
    <div className={`text-left${embedded ? "" : " mt-4"}`}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">
          Step {step + 1}/{steps.length} · {steps[step]}
        </p>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/20 p-2.5">
        {step === 0 ? (
          <div className="space-y-2 text-xs leading-5 text-[#d9e4f2]">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">1 · Terms</p>
            <p>Accept rules and age requirements to proceed.</p>
            <p>
              Read <Link href="/legal/terms" className="text-[#f7e7aa] underline">Terms</Link> & <Link href="/legal/privacy" className="text-[#f7e7aa] underline">Privacy</Link>.
            </p>
            <label className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 p-2">
              <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-0.5" />
              <span>I agree to terms.</span>
            </label>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">2 · Details</p>
            <label className="block">
              <span className={step4LabelClass}>Name</span>
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={step4InputClass} placeholder="Creator name" required minLength={2} autoFocus />
            </label>
            <label className="block">
              <span className={step4LabelClass}>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={step4InputClass} placeholder="you@example.com" required />
            </label>
            <label className="block">
              <span className={step4LabelClass}>Country</span>
              <select value={islandCode} onChange={(e) => setIslandCode(e.target.value)} className={step4InputClass}>
                {arenaOnboardingCountries.map((entry) => (
                  <option key={entry.islandCode} value={entry.islandCode}>{entry.flag} {entry.country}</option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">3 · Stream Focus</p>
            <p className="text-[11px] leading-tight text-[#7a82a8]">Select live stream theme.</p>
            <div className="grid grid-cols-3 gap-1 pt-1 sm:grid-cols-4">
              {liveOptions.map((option, index) => {
                const active = liveFocusIndex === index;
                return (
                  <button key={option} type="button" aria-pressed={active} onClick={() => setLiveFocusIndex(index)}
                    className={`rounded border px-1.5 py-1 text-left text-[10px] font-medium leading-tight transition ${active ? "border-[#38bdf8]/60 bg-[#38bdf8]/12 text-[#eef6ff]" : "border-white/5 bg-[#111830] text-[#d9e4f2] hover:border-white/20"}`}>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">4 · Dropship (Optional)</p>
            <p className="text-[11px] leading-tight text-[#7a82a8]">Feature products on stream.</p>
            <div className="space-y-1 pt-0.5">
              <label className="block">
                <span className={step4LabelClass}>Item</span>
                <input value={showcaseItem} onChange={(e) => setShowcaseItem(e.target.value)} className={step4InputClass} placeholder="Item name" />
              </label>
              <label className="block">
                <span className={step4LabelClass}>Link</span>
                <input type="url" value={showcaseStore} onChange={(e) => setShowcaseStore(e.target.value)} className={step4InputClass} placeholder="https://..." />
              </label>
              <label className="block">
                <span className={step4LabelClass}>Notes</span>
                <textarea value={showcaseNotes} onChange={(e) => setShowcaseNotes(e.target.value)} className={`${step4InputClass} min-h-[32px] resize-none`} placeholder="Showcase notes" />
              </label>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <form className="space-y-2" onSubmit={handleSubmit}>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">5 · Finish</p>
            <label className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 p-2">
              <input type="checkbox" checked={isAdult} onChange={(e) => setIsAdult(e.target.checked)} className="mt-0.5" />
              <span className="text-xs text-[#d9e4f2]">I am at least 18 years old.</span>
            </label>
            <button type="submit" disabled={!formValid || saving}
              className="w-full rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-3 py-2 text-xs font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40">
              {saving ? "Saving…" : "Create Profile"}
            </button>
            {notice ? <p className="text-[10px] text-[#f7e7aa]">{notice}</p> : null}
          </form>
        ) : null}
      </div>

      <div className="mt-2 flex gap-2">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#d9e4f2]">
            Back
          </button>
        ) : null}
        {step < 4 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)}
            className="ml-auto rounded-lg bg-[#38bdf8] px-4 py-1.5 text-xs font-black text-[#0a0e1f]">
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}
