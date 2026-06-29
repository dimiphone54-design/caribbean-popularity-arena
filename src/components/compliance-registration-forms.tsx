"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAiVoiceGreeting } from "@/components/ai-voice-greeting-provider";
import { readMemberUsername } from "@/lib/member-username-storage";
import { markArenaMemberAccess } from "@/lib/arena-member-access";
import { saveMemberGender } from "@/lib/member-gender-storage";
import { MemberRegistrationWizard } from "@/components/member-registration-wizard";
import { WomenCreatorLanePicker } from "@/components/women-creator-lane-picker";
import { arenaOnboardingCountries } from "@/lib/arena-onboarding-countries";
import type { WomenCreatorLane } from "@/lib/arena-women-creator-lanes";

type CreatorApplyFormProps = {
  onSubmitted: () => void;
};

export function CreatorApplyForm({ onSubmitted }: CreatorApplyFormProps) {
  const { saveUsername, greetMember, voiceEnabled } = useAiVoiceGreeting();
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCreatorAgreement, setAcceptedCreatorAgreement] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [island, setIsland] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const existing = readMemberUsername();
    if (existing) setDisplayName(existing);
  }, []);

  const canSubmit =
    isAdult && acceptedTerms && acceptedCreatorAgreement && displayName.trim().length >= 2 && island.trim().length >= 2;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const name = displayName.trim();
    saveUsername(name);
    if (voiceEnabled) {
      void greetMember(name);
    }

    setSubmitted(true);
    onSubmitted();
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-sm leading-6 text-[#d9f7ef]">
        Creator application preview saved locally for this session. Production onboarding will require verification
        after real API keys are connected next week.
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4 text-left" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Arena username</span>
        <input
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
          placeholder="Your creator name"
          required
          minLength={2}
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Primary island</span>
        <input
          value={island}
          onChange={(event) => setIsland(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
          placeholder="e.g. Trinidad & Tobago"
          required
        />
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <input type="checkbox" checked={isAdult} onChange={(event) => setIsAdult(event.target.checked)} className="mt-1" />
        <span className="text-sm leading-6 text-[#d9e4f2]">I confirm I am at least 18 years old.</span>
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
          className="mt-1"
        />
        <span className="text-sm leading-6 text-[#d9e4f2]">
          I agree to the{" "}
          <Link href="/legal/terms" className="text-[#f7e7aa] underline underline-offset-2">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-[#f7e7aa] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <input
          type="checkbox"
          checked={acceptedCreatorAgreement}
          onChange={(event) => setAcceptedCreatorAgreement(event.target.checked)}
          className="mt-1"
        />
        <span className="text-sm leading-6 text-[#d9e4f2]">
          I agree to the{" "}
          <Link href="/legal/creator-agreement" className="text-[#f7e7aa] underline underline-offset-2">
            Creator Participation Agreement
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Creator Application Preview
      </button>
    </form>
  );
}

type MemberRegistrationFormProps = {
  title: string;
  onSubmitted: () => void;
  /** site gate · skip top gift card duplicate */
  embedded?: boolean;
};

export function MemberRegistrationForm({ title, onSubmitted, embedded = false }: MemberRegistrationFormProps) {
  return <MemberRegistrationWizard title={title} onSubmitted={onSubmitted} embedded={embedded} />;
}

type WomanSiteSignupFormProps = {
  onSubmitted: () => void;
};

/** Woman sign-in · site entry gate (no slot required) */
export function WomanSiteSignupForm({ onSubmitted }: WomanSiteSignupFormProps) {
  const { saveUsername, greetMember, voiceEnabled } = useAiVoiceGreeting();
  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [islandCode, setIslandCode] = useState(arenaOnboardingCountries[0]?.islandCode ?? "co");
  const [lane, setLane] = useState<WomenCreatorLane | "">("");
  const [planDescription, setPlanDescription] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const countryEntry =
    arenaOnboardingCountries.find((entry) => entry.islandCode === islandCode) ?? arenaOnboardingCountries[0]!;

  useEffect(() => {
    const existing = readMemberUsername();
    if (existing) setDisplayName(existing);
  }, []);

  const ageNumber = Number.parseInt(age, 10);
  const step1Valid =
    displayName.trim().length >= 2 &&
    Number.isFinite(ageNumber) &&
    ageNumber >= 18 &&
    isAdult;
  const step2Valid = lane !== "" && planDescription.trim().length >= 8;
  const step3Valid = acceptedTerms;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!step3Valid || saving) return;

    const name = displayName.trim();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/women-creators/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: name,
          age: ageNumber,
          country: countryEntry.country,
          islandCode,
          lane,
          planDescription: planDescription.trim()
        })
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Could not save application");
        return;
      }

      saveUsername(name);
      saveMemberGender("female");
      markArenaMemberAccess();
      if (voiceEnabled) void greetMember(name);
      setSubmitted(true);
      onSubmitted();
    } catch {
      setError("Network error · try again");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-sm leading-6 text-[#d9f7ef]">
        Woman sign-in complete · welcome {displayName.trim()}. Your lane plan is saved in the arena database.
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">Step {step} of 3 · women only</p>

      {step === 1 ? (
        <div className="space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Arena username</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
              placeholder="Your name on cam"
              required
              minLength={2}
              autoFocus
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Age</span>
              <input
                type="number"
                min={18}
                max={99}
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
                placeholder="18+"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Country</span>
              <select
                value={islandCode}
                onChange={(event) => setIslandCode(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
              >
                {arenaOnboardingCountries.map((entry) => (
                  <option key={entry.islandCode} value={entry.islandCode}>
                    {entry.flag} {entry.country}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <input type="checkbox" checked={isAdult} onChange={(event) => setIsAdult(event.target.checked)} className="mt-1" />
            <span className="text-sm leading-6 text-[#d9e4f2]">I confirm I am a woman · at least 18 years old.</span>
          </label>

          <button
            type="button"
            disabled={!step1Valid}
            onClick={() => setStep(2)}
            className="w-full rounded-xl bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue · pick your lane →
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <WomenCreatorLanePicker
            lane={lane}
            planDescription={planDescription}
            onLaneChange={setLane}
            onPlanChange={setPlanDescription}
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-[#eef6ff]"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!step2Valid}
              onClick={() => setStep(3)}
              className="flex-[2] rounded-xl bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-1"
            />
            <span className="text-sm leading-6 text-[#d9e4f2]">
              I agree to the{" "}
              <Link href="/legal/terms" className="text-[#f7e7aa] underline underline-offset-2">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/legal/community" className="text-[#f7e7aa] underline underline-offset-2">
                Community Guidelines
              </Link>
              .
            </span>
          </label>

          {error ? (
            <p className="rounded-lg border border-[#f59e0b]/35 bg-[#f59e0b]/10 px-3 py-2 text-sm text-[#fde68a]">{error}</p>
          ) : null}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-[#eef6ff]"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!step3Valid || saving}
              className="flex-[2] rounded-xl bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving…" : "Woman sign-in · enter arena"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
