"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { markArenaMemberAccess, readArenaMemberId, saveArenaMemberId } from "@/lib/arena-member-access";
import { arenaOnboardingCountries, detectBrowserCountryCode } from "@/lib/arena-onboarding-countries";
import { detectRoomLocale, resolveContentLocale } from "@/lib/room-locale";
import { readMemberUsername, saveMemberUsername } from "@/lib/member-username-storage";

type MemberRegistrationWizardProps = {
  title: string;
  onSubmitted: () => void;
  embedded?: boolean;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]";
const labelClass = "text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]";

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

const liveOptionsEs = [
  "Vender productos en vivo",
  "Programa de charla / preguntas",
  "Baile",
  "Muestra cultural",
  "Prueba de moda",
  "Demostración de belleza",
  "Sesión musical",
  "Cocina / comida",
  "Historias de viaje",
  "Charla motivacional",
  "Reseña / unboxing",
  "Juegos / chat interactivo"
] as const;

export function MemberRegistrationWizard({ title, onSubmitted, embedded = false }: MemberRegistrationWizardProps) {
  const [contentLocale, setContentLocale] = useState<"en" | "es">("en");
  const [memberId, setMemberId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [islandCode, setIslandCode] = useState("US");
  const [liveFocusIndex, setLiveFocusIndex] = useState(0);
  const [liveFocusOpen, setLiveFocusOpen] = useState(false);
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
  const isSpanish = contentLocale === "es";
  const copy = {
    badge: isSpanish ? "Registro de creador" : "Creator sign-up",
    intro: isSpanish
      ? "Términos, información del creador y formulario en paneles iguales · autodetección para teléfono o computadora"
      : "Terms, creator info, and form in matching panels · auto-detect for phone or computer",
    termsTitle: isSpanish ? "1 · Términos y condiciones" : "1 · Terms and conditions",
    termsBody: isSpanish
      ? "Solo puedes usar este registro si aceptas las reglas de la plataforma y el requisito de edad."
      : "You can use this creator signup only if you accept the platform rules and age requirement.",
    termsAgree: isSpanish ? "Acepto los términos y condiciones." : "I agree to the terms and conditions.",
    infoTitle: isSpanish ? "2 · Información del creador" : "2 · Creator info",
    name: isSpanish ? "Nombre del creador" : "Creator name",
    email: isSpanish ? "Correo electrónico" : "Email",
    country: isSpanish ? "País" : "Country",
    liveTitle: isSpanish ? "3 · En vivo" : "3 · Live focus",
    liveHint: isSpanish ? "Elige qué harás en la transmisión en vivo." : "Pick what you will do on the live stream.",
    dropshippingTitle: isSpanish ? "Opcional · Producto de dropshipping" : "Optional · Dropshipping item",
    dropshippingHint: isSpanish
      ? "Añádelo solo si quieres mostrar un producto durante la transmisión en vivo."
      : "Add this only if you want to showcase a product during the live stream.",
    itemName: isSpanish ? "Nombre del producto" : "Item name",
    itemLink: isSpanish ? "Enlace de la tienda o proveedor" : "Store or supplier link",
    itemNotes: isSpanish ? "Notas para mostrar" : "Showcase notes",
    formTitle: isSpanish ? "4 · Formulario" : "4 · Form",
    ageConfirm: isSpanish ? "Confirmo que tengo al menos 18 años." : "I confirm I am at least 18 years old.",
    submit: isSpanish ? "Crear perfil de creador" : "Create creator profile",
    saving: isSpanish ? "Guardando…" : "Saving…",
    saved: isSpanish ? "Registro guardado · términos aceptados" : "Creator signup saved · terms accepted",
    error: isSpanish
      ? "No se pudo guardar tu registro · revisa la conexión e inténtalo de nuevo."
      : "Could not save your creator signup · check connection and try again.",
    autoDetect: isSpanish ? "Auto-detección" : "Auto-detect",
    detected: isSpanish ? "Detectado desde tu dispositivo" : "Detected from your device",
    liveOptions: isSpanish ? liveOptionsEs : liveOptions
  };

  useEffect(() => {
    const existing = readMemberUsername();
    if (existing) setDisplayName(existing);

    const savedId = readArenaMemberId();
    if (savedId) setMemberId(savedId);

    const detectedCountry = detectBrowserCountryCode();
    if (detectedCountry) setIslandCode(detectedCountry);

    const detected = resolveContentLocale(detectRoomLocale());
    setContentLocale(detected === "es" || detected === "es-CO" ? "es" : "en");
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
      setNotice(copy.saved);
    } catch {
      setNotice(copy.error);
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-sm leading-6 text-[#d9f7ef]">
        {title} sign-up complete · your creator profile is live on the welcome panel.
      </div>
    );
  }

  return (
    <div className={`space-y-4 text-left${embedded ? "" : " mt-6"}`}>
      {!embedded ? (
        <div className="rounded-xl border border-[#38bdf8]/25 bg-[#38bdf8]/8 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">{copy.badge}</p>
          <p className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-wider text-[#eef6ff]">{title}</p>
          <p className="mt-1 text-xs leading-5 text-[#9aa8c6]">
            {copy.intro}
          </p>
          <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#7dd3fc]">
            {copy.autoDetect} · {copy.detected}
          </p>
        </div>
      ) : null}

      <section className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">{copy.termsTitle}</p>
          <span className="rounded-full border border-white/10 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#9aa8c6]">
            {copy.autoDetect}
          </span>
        </div>
        <div className="mt-3 space-y-2 text-sm leading-6 text-[#d9e4f2]">
          <p>{copy.termsBody}</p>
          <p>
            Read the <Link href="/legal/terms" className="text-[#f7e7aa] underline underline-offset-2">Terms</Link>{" "}
            and <Link href="/legal/privacy" className="text-[#f7e7aa] underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
        <label className="mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1"
          />
          <span className="text-sm leading-6 text-[#d9e4f2]">{copy.termsAgree}</span>
        </label>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">{copy.infoTitle}</p>
        <div className="mt-3 space-y-4">
          <label className="block">
            <span className={labelClass}>{copy.name}</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className={inputClass}
              placeholder={copy.name}
              required
              minLength={2}
              autoFocus
            />
          </label>

          <label className="block">
            <span className={labelClass}>{copy.email}</span>
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
            <span className={labelClass}>{copy.country}</span>
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
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">{copy.liveTitle}</p>
            <p className="mt-2 text-sm leading-6 text-[#d9e4f2]">{copy.liveHint}</p>
            <div className="mt-3 rounded-xl border border-white/10 bg-[#111830]">
              <button
                type="button"
                aria-expanded={liveFocusOpen}
                onClick={() => setLiveFocusOpen((open) => !open)}
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-semibold text-[#eef6ff]"
              >
                <span>{copy.liveOptions[liveFocusIndex]}</span>
                <span className="text-xs text-[#9aa8c6]">{liveFocusOpen ? "Close" : "More +"}</span>
              </button>

              <div className={`${liveFocusOpen ? "block" : "hidden"} max-h-72 overflow-y-auto border-t border-white/10 p-2`}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {copy.liveOptions.map((option, index) => {
                    const active = liveFocusIndex === index;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setLiveFocusIndex(index)}
                        className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                          active
                            ? "border-[#38bdf8]/60 bg-[#38bdf8]/12 text-[#eef6ff]"
                            : "border-white/10 bg-[#111830] text-[#d9e4f2] hover:border-white/20"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">{copy.dropshippingTitle}</p>
            <p className="mt-2 text-sm leading-6 text-[#d9e4f2]">
              {copy.dropshippingHint}
            </p>
            <div className="mt-3 space-y-4">
              <label className="block">
                <span className={labelClass}>{copy.itemName}</span>
                <input
                  value={showcaseItem}
                  onChange={(event) => setShowcaseItem(event.target.value)}
                  className={inputClass}
                  placeholder={copy.itemName}
                />
              </label>

              <label className="block">
                <span className={labelClass}>{copy.itemLink}</span>
                <input
                  type="url"
                  value={showcaseStore}
                  onChange={(event) => setShowcaseStore(event.target.value)}
                  className={inputClass}
                  placeholder="https://..."
                />
              </label>

              <label className="block">
                <span className={labelClass}>{copy.itemNotes}</span>
                <textarea
                  value={showcaseNotes}
                  onChange={(event) => setShowcaseNotes(event.target.value)}
                  className={`${inputClass} min-h-[92px] resize-y`}
                  placeholder={copy.itemNotes}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <form className="rounded-xl border border-white/10 bg-black/20 p-4" onSubmit={handleSubmit}>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">{copy.formTitle}</p>
        <div className="mt-3 space-y-4">
          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <input
              type="checkbox"
              checked={isAdult}
              onChange={(event) => setIsAdult(event.target.checked)}
              className="mt-1"
            />
            <span className="text-sm leading-6 text-[#d9e4f2]">{copy.ageConfirm}</span>
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!formValid || saving}
              className="w-full rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] px-4 py-3 text-sm font-black text-[#0a0e1f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? copy.saving : copy.submit}
            </button>
          </div>

          {notice ? <p className="text-xs leading-5 text-[#f7e7aa]">{notice}</p> : null}
        </div>
      </form>
    </div>
  );
}
