"use client";

import Link from "next/link";
import { useState } from "react";

type CreatorApplyFormProps = {
  onSubmitted: () => void;
};

export function CreatorApplyForm({ onSubmitted }: CreatorApplyFormProps) {
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCreatorAgreement, setAcceptedCreatorAgreement] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [island, setIsland] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = isAdult && acceptedTerms && acceptedCreatorAgreement && displayName.trim().length >= 2 && island.trim().length >= 2;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
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
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Display name</span>
        <input
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
          placeholder="Your creator name"
          required
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
};

export function MemberRegistrationForm({ title, onSubmitted }: MemberRegistrationFormProps) {
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = isAdult && acceptedTerms && email.includes("@");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    onSubmitted();
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-sm leading-6 text-[#d9f7ef]">
        {title} registration preview accepted. Full account creation will activate after production keys are connected.
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4 text-left" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
          placeholder="you@example.com"
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

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue Registration Preview
      </button>
    </form>
  );
}
