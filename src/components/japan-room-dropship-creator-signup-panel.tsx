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
  japanDropshipCreatorSignupDefaults,
  japanDropshipCreatorSlotRules
} from "@/lib/japan-room-dropship-creator";

type JapanRoomDropshipCreatorSignupPanelProps = {
  slot: ArenaCreatorSlot;
  onEntered: (displayName: string) => void;
};

/** Japan room live slot · women-only inline signup · dropship lane · terms + rules */
export function JapanRoomDropshipCreatorSignupPanel({
  slot,
  onEntered
}: JapanRoomDropshipCreatorSignupPanelProps) {
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [planDescription, setPlanDescription] = useState(japanDropshipCreatorSignupDefaults.planPlaceholder);
  const [isWomanAdult, setIsWomanAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const signInOpen = isArenaSlotSignInOpen(slot.islandCode);
  const ageNumber = Number.parseInt(age, 10);
  const canSubmit =
    signInOpen &&
    displayName.trim().length >= 2 &&
    Number.isFinite(ageNumber) &&
    ageNumber >= 18 &&
    isWomanAdult &&
    acceptedTerms &&
    acceptedRules &&
    planDescription.trim().length >= 8 &&
    !saving;

  useEffect(() => {
    const existing = readMemberUsername();
    if (existing) setDisplayName(existing);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    if (!isArenaSlotSignInOpen(slot.islandCode)) {
      setError(`Slot frozen · girl sign-in open for ${arenaSlotSignInOpenLabel} only.`);
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
          lane: japanDropshipCreatorSignupDefaults.lane,
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

      const claimed = claimArenaSlot({
        slotId: slot.id,
        islandCode: slot.islandCode,
        displayName: name
      });

      if (!claimed) {
        setError("Slot already taken · refresh and try again.");
        return;
      }

      onEntered(name);
    } catch {
      setError("Network error · try again");
    } finally {
      setSaving(false);
    }
  }

  if (!signInOpen) {
    return (
      <p className="japan-dropship-creator-slot-frozen">
        Frozen · girl sign-in open · {arenaSlotSignInOpenLabel} only
      </p>
    );
  }

  return (
    <form className="japan-dropship-creator-signup" onSubmit={(event) => void handleSubmit(event)}>
      <div className="japan-dropship-creator-signup-rules" aria-label="Creator rules">
        <p className="japan-dropship-creator-signup-rules-title">Rules · read before you enter</p>
        <ul className="japan-dropship-creator-signup-rules-list" role="list">
          {japanDropshipCreatorSlotRules.map((rule) => (
            <li key={rule} role="listitem">
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <label className="japan-dropship-creator-signup-field">
        <span>Arena username</span>
        <input
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Your name on cam"
          required
          minLength={2}
          autoComplete="nickname"
        />
      </label>

      <label className="japan-dropship-creator-signup-field">
        <span>Age · 18+</span>
        <input
          type="number"
          min={18}
          max={99}
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="18+"
          required
        />
      </label>

      <label className="japan-dropship-creator-signup-field">
        <span>Your dropship live plan</span>
        <textarea
          value={planDescription}
          onChange={(event) => setPlanDescription(event.target.value)}
          required
          minLength={8}
          rows={3}
        />
      </label>

      <label className="japan-dropship-creator-signup-check">
        <input type="checkbox" checked={isWomanAdult} onChange={(event) => setIsWomanAdult(event.target.checked)} />
        <span>I confirm I am a woman · at least 18 years old.</span>
      </label>

      <label className="japan-dropship-creator-signup-check">
        <input type="checkbox" checked={acceptedRules} onChange={(event) => setAcceptedRules(event.target.checked)} />
        <span>I read the rules above · dropshipping lane · Japan SLOT 12 only.</span>
      </label>

      <label className="japan-dropship-creator-signup-check">
        <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
        <span>
          I agree to the{" "}
          <Link href="/legal/terms" target="_blank" rel="noopener noreferrer">
            Terms
          </Link>
          ,{" "}
          <Link href="/legal/community" target="_blank" rel="noopener noreferrer">
            Community Guidelines
          </Link>
          , and{" "}
          <Link href="/legal/creator-agreement" target="_blank" rel="noopener noreferrer">
            Creator Agreement
          </Link>
          .
        </span>
      </label>

      {error ? <p className="japan-dropship-creator-signup-error">{error}</p> : null}

      <button type="submit" disabled={!canSubmit} className="japan-dropship-creator-signup-submit">
        {saving ? "Entering slot…" : `Enter SLOT 12 · go live · dropship`}
      </button>

      <p className="japan-dropship-creator-signup-legal">
        Gift terms · revenue disclosure →{" "}
        <Link href="/legal" target="_blank" rel="noopener noreferrer">
          /legal
        </Link>
      </p>
    </form>
  );
}
