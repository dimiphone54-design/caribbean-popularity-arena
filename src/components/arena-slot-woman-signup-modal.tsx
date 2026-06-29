"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ArenaCreatorSlot } from "@/lib/arena-experience";
import { saveArenaSlotWomanApplication } from "@/lib/arena-slot-woman-application";
import { claimArenaSlot } from "@/lib/arena-slot-occupancy";
import { claimArenaEngineLiveSession } from "@/components/use-arena-engine";
import { arenaSlotSignInOpenLabel, isArenaSlotSignInOpen } from "@/lib/arena-slot-sign-in-access";
import { markGirlEntryStart } from "@/lib/girl-entry-session";
import { saveMemberGender } from "@/lib/member-gender-storage";
import { readMemberUsername, saveMemberUsername } from "@/lib/member-username-storage";
import {
  MemberDemoFillButtons,
  applyDemoMemberProfile
} from "@/components/member-demo-fill-buttons";
import { WomenCreatorLanePicker } from "@/components/women-creator-lane-picker";
import type { WomenCreatorLane } from "@/lib/arena-women-creator-lanes";

type ArenaSlotWomanSignupModalProps = {
  slot: ArenaCreatorSlot;
  onClose: () => void;
  onSignedIn: (message: string) => void;
};

const formatSlotLabel = (rank: number) => `SLOT ${rank} - available`;

export function ArenaSlotWomanSignupModal({ slot, onClose, onSignedIn }: ArenaSlotWomanSignupModalProps) {
  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [lane, setLane] = useState<WomenCreatorLane | "">("");
  const [planDescription, setPlanDescription] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
    if (!isArenaSlotSignInOpen(slot.islandCode)) {
      setError(`This slot is frozen · girl sign-in open for ${arenaSlotSignInOpenLabel} only.`);
      return;
    }

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
          country: slot.country,
          islandCode: slot.islandCode,
          lane,
          planDescription: planDescription.trim(),
          slotId: slot.id,
          slotRank: slot.rank,
          category: slot.category
        })
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Could not save application");
        return;
      }

      saveMemberUsername(name);
      saveMemberGender("female");
      markGirlEntryStart();

      saveArenaSlotWomanApplication({
        slotId: slot.id,
        rank: slot.rank,
        country: slot.country,
        islandCode: slot.islandCode,
        displayName: name,
        age: ageNumber,
        category: slot.category,
        appliedAt: Date.now()
      });

      const engineClaim = await claimArenaEngineLiveSession({
        slotId: slot.id,
        islandCode: slot.islandCode,
        displayName: name
      });

      if (!engineClaim.ok) {
        setError(engineClaim.error);
        return;
      }

      claimArenaSlot({
        slotId: slot.id,
        islandCode: slot.islandCode,
        displayName: name
      });

      onSignedIn(`${name} is live in ${slot.country} · ${planDescription.trim()}`);
      onClose();
    } catch {
      setError("Network error · try again");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[95] grid place-items-center bg-black/78 p-4 backdrop-blur-lg"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="a2030-modal a2030-modal--signup-bg relative w-full max-w-md rounded-[1.25rem] p-6 text-left sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="arena-slot-woman-signup-title"
      >
        <div
          className="a2030-modal-signup-bg-image pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-35"
          style={{ backgroundImage: "url(/caribbean-freedom-arena-signup-bg.png)" }}
          aria-hidden="true"
        />
        <div className="a2030-modal-signup-bg-scrim pointer-events-none absolute inset-0 rounded-[1.25rem]" aria-hidden="true" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 z-10 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
          aria-label="Close girl sign-in"
        >
          ×
        </button>

        <div className="relative z-[1] a2030-signup-panel-head text-center">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">
            {slot.flag} {slot.country} · {slot.islandCode}
          </p>
          <h2 id="arena-slot-woman-signup-title" className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-widest text-[#eef6ff]">
            {formatSlotLabel(slot.rank)}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#9fb4d4]">
            Women-only · step {step} of 3 · lock this nation slot
          </p>
        </div>

        {step === 1 ? (
          <div className="relative z-[1] mt-6 space-y-4">
            <MemberDemoFillButtons
              onFill={(profile) => {
                const demo = applyDemoMemberProfile(profile);
                if (profile.id !== "woman") return;
                setDisplayName(demo.username);
                setAge("24");
                setIsAdult(demo.confirmedAge);
                setAcceptedTerms(demo.acceptedPolicies);
              }}
            />

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
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">SLOT {slot.rank}</span>
                <input
                  readOnly
                  value={`${slot.flag} ${slot.country} · ${slot.categoryIcon} ${slot.category}`}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-[#c5d0e8]"
                />
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
              className="ai-real-slot-btn-sign-in disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue · pick your lane →
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="relative z-[1] mt-6 space-y-4">
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
                className="flex-[2] ai-real-slot-btn-sign-in disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <form className="relative z-[1] mt-6 space-y-4" onSubmit={handleSubmit}>
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
                className="flex-[2] ai-real-slot-btn-sign-in disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saving ? "Saving…" : `Girl sign-in · go live · ${formatSlotLabel(slot.rank)}`}
              </button>
            </div>

            <p className="text-center text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#7a82a8]">
              Saved to arena database · production verification when API keys connect
            </p>
          </form>
        ) : null}
      </div>
    </div>
  );
}
