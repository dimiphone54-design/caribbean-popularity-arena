"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  enterAsSavedArenaMember,
  goToMainArenaInterface,
  readArenaMemberId,
  readArenaMemberProfile,
  type ArenaMemberSavedProfile
} from "@/lib/arena-member-access";
import { arenaOnboardingCountries, detectBrowserCountryCode } from "@/lib/arena-onboarding-countries";
import { useArenaMemberLanguage } from "@/components/use-arena-member-language";
import {
  saveAiVoiceLanguage,
  type AiVoiceLanguage
} from "@/lib/ai-voice-language";
import {
  formatRoomLocaleOptionLabel,
  roomLocaleRegionLabels
} from "@/lib/room-world-languages";
import {
  groupRoomLocaleOptions,
  roomLocaleOptions,
  storeRoomLocale,
  type RoomLocaleId
} from "@/lib/room-locale";

type MemberRegistrationWizardProps = {
  title: string;
  onSubmitted: () => void;
  embedded?: boolean;
};

const regionOrder = ["popular", "americas", "europe", "asia", "africa", "middle-east", "oceania"] as const;

/** Match “Member Sign In” cyan tone · #7dd3fc */
const memberCyan = "text-[#7dd3fc]";
const inputClass =
  "mt-0.5 w-full rounded-lg border border-[#7dd3fc]/25 bg-[#111830]/80 px-3 py-1.5 text-sm font-semibold text-[#7dd3fc] placeholder:text-[#7dd3fc]/45 focus:outline-none focus:border-[#7dd3fc]/70";
const labelClass = `text-[10px] font-bold uppercase tracking-[0.12em] ${memberCyan}`;

export function MemberRegistrationWizard({ title, onSubmitted, embedded = false }: MemberRegistrationWizardProps) {
  const { ready, locale: detectedLocale, meta, detectKicker } = useArenaMemberLanguage();
  const [memberId, setMemberId] = useState<string | null>(null);
  const [savedProfile, setSavedProfile] = useState<ArenaMemberSavedProfile | null>(null);
  const [forceNewSignIn, setForceNewSignIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [islandCode, setIslandCode] = useState("US");
  const [language, setLanguage] = useState<RoomLocaleId>("en");
  const [languageTouched, setLanguageTouched] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const countryEntry =
    arenaOnboardingCountries.find((entry) => entry.islandCode === islandCode) ?? arenaOnboardingCountries[0]!;

  const groupedLanguages = useMemo(() => groupRoomLocaleOptions(roomLocaleOptions), []);
  const selectedLanguage =
    roomLocaleOptions.find((option) => option.id === language) ?? roomLocaleOptions[0]!;

  const showReturnSignIn = Boolean(savedProfile) && !forceNewSignIn && !submitted;

  useEffect(() => {
    const profile = readArenaMemberProfile();
    if (profile) {
      setSavedProfile(profile);
      setMemberId(profile.memberId);
      return;
    }
    const savedId = readArenaMemberId();
    if (savedId) setMemberId(savedId);
    const detectedCountry = detectBrowserCountryCode();
    if (detectedCountry) setIslandCode(detectedCountry);
  }, []);

  // Auto-detect fills Language until the member picks one (first-time form only).
  useEffect(() => {
    if (!ready || languageTouched || showReturnSignIn) return;
    setLanguage(detectedLocale);
  }, [ready, detectedLocale, languageTouched, showReturnSignIn]);

  const persistLanguage = (next: RoomLocaleId) => {
    setLanguage(next);
    setLanguageTouched(true);
    setLanguageOpen(false);
    saveAiVoiceLanguage(next as AiVoiceLanguage);
    storeRoomLocale(next);
  };

  const finishEnter = (profile: ArenaMemberSavedProfile) => {
    enterAsSavedArenaMember(profile);
    setSavedProfile(profile);
    setMemberId(profile.memberId);
    setSubmitted(true);
    onSubmitted();
    goToMainArenaInterface();
  };

  /** Return member · one click · auto-detect past info · enter main + active countries */
  const handleReturnSignIn = () => {
    if (!savedProfile || saving) return;
    setSaving(true);
    setError("");
    try {
      finishEnter(savedProfile);
    } catch {
      setError("Could not restore session — try again");
    } finally {
      setSaving(false);
    }
  };

  const formValid = displayName.trim().length >= 2 && email.includes("@") && acceptedTerms && isAdult;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValid || saving) return;
    setSaving(true);
    setError("");

    saveAiVoiceLanguage(language as AiVoiceLanguage);
    storeRoomLocale(language);

    try {
      const response = await fetch("/api/members/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: memberId ?? undefined,
          displayName: displayName.trim(),
          email: email.trim(),
          country: countryEntry.country,
          islandCode,
          voiceLanguage: language
        })
      });

      const payload = (await response.json()) as { ok?: boolean; memberId?: string; error?: string };
      if (!response.ok || !payload.ok || !payload.memberId) {
        setError(payload.error ?? "Could not save — try again");
        return;
      }

      const profile: ArenaMemberSavedProfile = {
        memberId: payload.memberId,
        displayName: displayName.trim(),
        email: email.trim().toLowerCase(),
        country: countryEntry.country,
        islandCode,
        voiceLanguage: language,
        signedInAt: new Date().toISOString()
      };

      finishEnter(profile);
    } catch {
      setError("Network error — try again");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    const name = savedProfile?.displayName ?? displayName.trim();
    const langOption =
      roomLocaleOptions.find((option) => option.id === (savedProfile?.voiceLanguage ?? language)) ??
      selectedLanguage;
    return (
      <div className="rounded-lg border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-center">
        <p className="text-lg">🎉</p>
        <p className="mt-2 text-sm font-bold text-[#d9f7ef]">Welcome, {name}!</p>
        <p className="mt-1 text-xs text-[#7dd3fc]">
          Saved on this device · language {formatRoomLocaleOptionLabel(langOption)} · active countries open
        </p>
        <p className="mt-1 text-[10px] text-[#7dd3fc]/70">Entering main interface…</p>
      </div>
    );
  }

  if (showReturnSignIn && savedProfile) {
    const langOption =
      roomLocaleOptions.find((option) => option.id === savedProfile.voiceLanguage) ?? roomLocaleOptions[0]!;
    return (
      <div className={`${embedded ? "" : "mt-3"}`}>
        <div className="mb-2 flex items-center justify-between rounded-lg border border-[#7dd3fc]/20 bg-[#111830]/60 px-3 py-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">Member Sign In</p>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#7dd3fc]">
            Saved · this device
          </span>
        </div>

        <div className="rounded-lg border border-[#7dd3fc]/25 bg-[#111830]/70 px-3 py-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">Welcome back</p>
          <p className="mt-1.5 text-lg font-black text-[#7dd3fc]">{savedProfile.displayName}</p>
          <p className="mt-1 text-[11px] text-[#7dd3fc]/80">
            {langOption.flag} {langOption.nativeLabel}
            {savedProfile.country ? ` · ${savedProfile.country}` : ""}
          </p>
          <p className="mt-2 text-[9px] leading-4 text-[#7dd3fc]/65">
            Auto-detected from your past SIGN IN · no form again · active countries unlock on enter
          </p>
        </div>

        {error ? <p className="mt-2 text-[10px] text-red-400">{error}</p> : null}

        <button
          type="button"
          onClick={handleReturnSignIn}
          disabled={saving}
          className="mt-2 w-full rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-4 py-2 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Entering…" : "SIGN IN"}
        </button>

        <button
          type="button"
          onClick={() => {
            setForceNewSignIn(true);
            setDisplayName("");
            setEmail("");
            setAcceptedTerms(false);
            setIsAdult(false);
          }}
          className="mt-2 w-full text-center text-[9px] font-semibold uppercase tracking-wider text-[#7dd3fc]/70 underline-offset-2 hover:text-[#7dd3fc] hover:underline"
        >
          Different member? New sign-in
        </button>
      </div>
    );
  }

  return (
    <div className={`${embedded ? "" : "mt-3"}`}>
      <div className="mb-2 flex items-center justify-between rounded-lg border border-[#7dd3fc]/20 bg-[#111830]/60 px-3 py-1.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">Member Sign In</p>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{ready ? meta.flag : "…"}</span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#7dd3fc]">
            {ready ? detectKicker : "Detecting…"}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block">
          <span className={labelClass}>Your Name</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={inputClass}
            placeholder="Example Charlie"
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
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="@email.com"
            required
          />
        </label>

        <label className="block">
          <span className={labelClass}>Country</span>
          <select
            value={islandCode}
            onChange={(e) => setIslandCode(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            {arenaOnboardingCountries.map((entry) => (
              <option key={entry.islandCode} value={entry.islandCode} className="bg-[#111830] text-[#7dd3fc]">
                {entry.flag} {entry.country}
              </option>
            ))}
          </select>
        </label>

        <div className="block">
          <span className={labelClass}>Language</span>
          <div className="member-signin-lang mt-0.5">
            <button
              type="button"
              onClick={() => setLanguageOpen((open) => !open)}
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
              className="member-signin-lang-trigger flex w-full items-center justify-between gap-2 rounded-lg border border-[#7dd3fc]/25 bg-[#111830]/80 px-3 py-1.5 text-left text-sm font-semibold text-[#7dd3fc] transition hover:border-[#7dd3fc]/55 focus:outline-none focus:border-[#7dd3fc]/70"
            >
              <span className="inline-flex min-w-0 items-center gap-2 truncate">
                <span className="text-base leading-none" aria-hidden="true">
                  {selectedLanguage.flag}
                </span>
                <span className="truncate">{selectedLanguage.nativeLabel}</span>
                <span className="hidden text-[10px] font-bold uppercase tracking-wider text-[#7dd3fc]/70 sm:inline">
                  · {selectedLanguage.englishLabel}
                </span>
              </span>
              <span
                className={`shrink-0 text-[10px] font-black tracking-widest text-[#7dd3fc] transition-transform duration-200 ${languageOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {languageOpen ? (
              <div
                role="listbox"
                aria-label="World languages"
                className="member-signin-lang-panel mt-1 max-h-36 overflow-y-auto rounded-lg border border-[#7dd3fc]/30 bg-[#0a0e1a]/98 shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
              >
                {regionOrder.map((region) => {
                  const options = groupedLanguages.get(region);
                  if (!options?.length) return null;
                  return (
                    <div key={region}>
                      <p className="sticky top-0 z-[1] bg-[#111830] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#7dd3fc]">
                        {roomLocaleRegionLabels[region].en}
                      </p>
                      {options.map((option) => {
                        const active = option.id === language;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() => persistLanguage(option.id as RoomLocaleId)}
                            className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[12px] transition ${
                              active
                                ? "bg-[#7dd3fc]/15 font-bold text-[#7dd3fc]"
                                : "text-[#7dd3fc]/75 hover:bg-[#7dd3fc]/10 hover:text-[#7dd3fc]"
                            }`}
                          >
                            <span className="text-sm leading-none" aria-hidden="true">
                              {option.flag}
                            </span>
                            <span className="min-w-0 flex-1 truncate">{option.nativeLabel}</span>
                            <span className="shrink-0 text-[10px] text-[#7dd3fc]/55">{option.englishLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <span className="mt-0.5 block text-[9px] leading-3 text-[#7dd3fc]/70">
            Auto-detect · click to open · saves on pick · one-time only
          </span>
        </div>

        <div className="space-y-1.5 rounded-lg border border-white/10 bg-black/20 p-2">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-[11px] text-[#d9e4f2]">
              I agree to{" "}
              <Link href="/legal/terms" className="text-[#f7e7aa] underline">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/legal/privacy" className="text-[#f7e7aa] underline">
                Privacy
              </Link>
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-[11px] text-[#d9e4f2]">I am at least 18 years old.</span>
          </label>
        </div>

        {error ? <p className="text-[10px] text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={!formValid || saving}
          className="w-full rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-4 py-2 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving…" : "SIGN IN"}
        </button>
      </form>

      <p className="mt-2 text-center text-[9px] text-[#7dd3fc]/70">
        Sign in once · saved on this device · next time just tap SIGN IN
      </p>
    </div>
  );
}
