"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArenaGiftCardFields } from "@/components/arena-gift-card-fields";
import { arenaGiftCopy, formatArenaGiftAmount } from "@/lib/arena-gifts";
import {
  buildArenaGiftCardMeta,
  emptyArenaGiftCardInput,
  validateArenaGiftCard,
  type ArenaGiftCardInput
} from "@/lib/arena-gift-card";
import { redirectArenaGiftCheckout, submitArenaGiftCheckout } from "@/lib/arena-gift-checkout-submit";
import { useAiVoiceGreeting } from "@/components/ai-voice-greeting-provider";
import { readMemberUsername } from "@/lib/member-username-storage";
import { aiVoiceLanguageOptions } from "@/lib/ai-voice-language";
import { markArenaMemberAccess, saveArenaMemberId, readArenaMemberId } from "@/lib/arena-member-access";
import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { arenaOnboardingCountries } from "@/lib/arena-onboarding-countries";

type MemberRegistrationWizardProps = {
  title: string;
  onSubmitted: () => void;
  embedded?: boolean;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]";
const labelClass = "text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]";

export function MemberRegistrationWizard({ title, onSubmitted, embedded = false }: MemberRegistrationWizardProps) {
  const { saveUsername, greetMember, voiceEnabled, voiceLanguage, setVoiceLanguage } = useAiVoiceGreeting();
  const [step, setStep] = useState(1);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [islandCode, setIslandCode] = useState(arenaOnboardingCountries[0]?.islandCode ?? "co");
  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [card, setCard] = useState<ArenaGiftCardInput>(emptyArenaGiftCardInput);
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof ArenaGiftCardInput, string>>>({});

  const countryEntry =
    arenaOnboardingCountries.find((entry) => entry.islandCode === islandCode) ?? arenaOnboardingCountries[0]!;

  useEffect(() => {
    const existing = readMemberUsername();
    if (existing) setDisplayName(existing);
    const savedId = readArenaMemberId();
    if (savedId) setMemberId(savedId);
  }, []);

  useEffect(() => {
    if (!bankCountry && countryEntry) setBankCountry(countryEntry.country);
  }, [bankCountry, countryEntry]);

  const step1Valid = displayName.trim().length >= 2 && email.includes("@") && islandCode.length >= 2;
  const step2Valid =
    bankName.trim().length >= 2 &&
    accountHolderName.trim().length >= 2 &&
    accountNumber.trim().length >= 4 &&
    bankCountry.trim().length >= 2;
  const step3Valid = isAdult && acceptedTerms;

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
        bankName: bankName.trim(),
        accountHolderName: accountHolderName.trim(),
        accountNumber: accountNumber.trim(),
        bankCountry: bankCountry.trim(),
        voiceLanguage
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

  const handleContinueStep1 = async () => {
    if (!step1Valid || saving) return;
    setSaving(true);
    setNotice(null);
    try {
      await persistMember();
      setStep(2);
    } catch {
      setNotice("Could not save your profile · check connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleContinueStep2 = async () => {
    if (!step2Valid || saving) return;
    setSaving(true);
    setNotice(null);
    try {
      await persistMember();
      setStep(3);
    } catch {
      setNotice("Could not save bank details · check connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!step3Valid || checkingOut) return;

    const validation = validateArenaGiftCard(card);
    setCardErrors(validation.errors);
    if (!validation.valid) {
      setNotice("Enter valid card details.");
      return;
    }

    const cardMeta = buildArenaGiftCardMeta(card);
    if (!cardMeta) {
      setNotice("Enter valid card details.");
      return;
    }

    const name = displayName.trim();
    saveUsername(name);

    if (isArenaMasterKeyActive()) {
      greetMember(name);
      markArenaMemberAccess();
      setSubmitted(true);
      onSubmitted();
      setNotice("🔑 Master key · member access granted");
      return;
    }

    setCheckingOut(true);
    setNotice(null);

    try {
      const id = await persistMember();
      const payload = await submitArenaGiftCheckout({
        endpoint: "/api/payments/member-sign-in/checkout",
        cardMeta,
        payload: { displayName: name, email: email.trim(), memberId: id }
      });

      if (!payload.ok) {
        setNotice(arenaGiftCopy.giftUnavailable);
        return;
      }

      if (redirectArenaGiftCheckout(payload)) {
        if (voiceEnabled) void greetMember(name);
        onSubmitted();
        return;
      }

      await fetch("/api/members/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: id })
      });
      markArenaMemberAccess();
      if (voiceEnabled) void greetMember(name);
      setSubmitted(true);
      onSubmitted();
      setNotice(payload.message ?? arenaGiftCopy.giftQueued);
    } catch {
      setNotice(arenaGiftCopy.giftNetworkError);
    } finally {
      setCheckingOut(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-sm leading-6 text-[#d9f7ef]">
        {title} sign-in complete · {formatArenaGiftAmount(6)} saved to arena database. Your name is live on the welcome
        panel.
      </div>
    );
  }

  return (
    <div className={`space-y-4 text-left${embedded ? "" : " mt-6"}`}>
      {!embedded ? (
        <div className="rounded-xl border border-[#38bdf8]/25 bg-[#38bdf8]/8 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">Arena Member Gift</p>
          <p className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-wider text-[#eef6ff]">
            {formatArenaGiftAmount(6)}
          </p>
          <p className="mt-1 text-xs leading-5 text-[#9aa8c6]">
            Step {step} of 3 · one screen at a time · profile saved to arena database before checkout
          </p>
        </div>
      ) : (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">Step {step} of 3</p>
      )}

      {step === 1 ? (
        <div className="space-y-4">
          <label className="block">
            <span className={labelClass}>Full name</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className={inputClass}
              placeholder="Your arena name"
              required
              minLength={2}
              autoFocus
            />
          </label>

          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Country</span>
            <select
              value={islandCode}
              onChange={(event) => setIslandCode(event.target.value)}
              className={inputClass}
            >
              {arenaOnboardingCountries.map((entry) => (
                <option key={entry.islandCode} value={entry.islandCode}>
                  {entry.flag} {entry.country}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            disabled={!step1Valid || saving}
            onClick={() => void handleContinueStep1()}
            className="w-full rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Saving…" : "Continue · bank details →"}
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <p className="text-xs leading-5 text-[#9aa8c6]">
            Bank info for your {formatArenaGiftAmount(6)} member gift · stored securely in the arena database for
            payouts and access verification.
          </p>

          <label className="block">
            <span className={labelClass}>Bank name</span>
            <input
              value={bankName}
              onChange={(event) => setBankName(event.target.value)}
              className={inputClass}
              placeholder="e.g. Republic Bank"
              required
              autoFocus
            />
          </label>

          <label className="block">
            <span className={labelClass}>Account holder name</span>
            <input
              value={accountHolderName}
              onChange={(event) => setAccountHolderName(event.target.value)}
              className={inputClass}
              placeholder="Name on the account"
              required
            />
          </label>

          <label className="block">
            <span className={labelClass}>Account number</span>
            <input
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              className={inputClass}
              placeholder="Account or IBAN"
              required
              minLength={4}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Bank country</span>
            <input
              value={bankCountry}
              onChange={(event) => setBankCountry(event.target.value)}
              className={inputClass}
              placeholder="Country where bank is registered"
              required
            />
          </label>

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
              disabled={!step2Valid || saving}
              onClick={() => void handleContinueStep2()}
              className="flex-[2] rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving…" : "Continue · $6 gift →"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <form className="space-y-4" onSubmit={handleCheckout}>
          <fieldset className="rounded-xl border border-white/10 bg-black/20 p-3">
            <legend className="px-1 text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">I speak</legend>
            <div className="mt-3 grid max-h-40 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
              {aiVoiceLanguageOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={voiceLanguage === option.id}
                  onClick={() => setVoiceLanguage(option.id)}
                  className={`rounded-lg border px-3 py-2 text-left transition ${
                    voiceLanguage === option.id
                      ? "border-[#38bdf8]/55 bg-[#38bdf8]/12 text-[#eef6ff]"
                      : "border-white/10 bg-[#111830] text-[#d9e4f2] hover:border-white/20"
                  }`}
                >
                  <span className="block text-sm font-bold">
                    {option.flag} {option.nativeLabel}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

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
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-[#f7e7aa] underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <div className="arena-gift-card-cta-head">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">
              🎁 Send Gift · {formatArenaGiftAmount(6)}
            </p>
          </div>

          <ArenaGiftCardFields disabled={checkingOut} value={card} errors={cardErrors} onChange={setCard} />

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
              disabled={!step3Valid || checkingOut}
              className="flex-[2] rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {checkingOut ? arenaGiftCopy.openingGift : `Pay ${formatArenaGiftAmount(6)} · unlock view`}
            </button>
          </div>
        </form>
      ) : null}

      {notice ? <p className="text-xs leading-5 text-[#f7e7aa]">{notice}</p> : null}
    </div>
  );
}
