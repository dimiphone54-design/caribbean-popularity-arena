"use client";

import Link from "next/link";
import { useState } from "react";
import { legalEntity } from "@/config/legal-entity";
import { useCompliance } from "@/components/compliance-provider";

const reportCategories = [
  "Harassment or bullying",
  "Hate speech or threats",
  "Fraud or scam",
  "Impersonation",
  "Non-consensual content",
  "Spam or vote manipulation",
  "Other safety concern"
] as const;

export function ReportAbuseModal() {
  const { reportOpen, closeReportAbuse } = useCompliance();
  const [category, setCategory] = useState<(typeof reportCategories)[number]>(reportCategories[0]);
  const [details, setDetails] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!reportOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`CPA Safety Report — ${category}`);
    const body = encodeURIComponent(
      [
        "Caribbean Popularity Arena — Abuse Report",
        "",
        `Category: ${category}`,
        `Contact email: ${contactEmail || "Not provided"}`,
        "",
        "Details:",
        details || "No additional details provided.",
        "",
        "Submitted from in-app report form."
      ].join("\n")
    );

    window.location.href = `mailto:${legalEntity.emails.safety}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[195] grid place-items-center bg-black/75 p-4 backdrop-blur-lg" onClick={closeReportAbuse}>
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#ff5c2b]/30 bg-[#0d1225] p-6 shadow-2xl shadow-black/40 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeReportAbuse}
          className="absolute right-4 top-3 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
          aria-label="Close report form"
        >
          ×
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8060]">Report Abuse</p>
        <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-3xl tracking-wide text-[#f0edf8]">Safety Report</h2>
        <p className="mt-2 text-sm leading-6 text-[#b8c9e1]">
          Report harassment, fraud, impersonation, or other violations. See our{" "}
          <Link href="/legal/safety" className="text-[#f7e7aa] underline underline-offset-2">
            Safety, Reporting and Moderation Policy
          </Link>
          .
        </p>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-4 text-sm leading-6 text-[#d9f7ef]">
            Your report draft was opened in your email app. If it did not open, email{" "}
            <a href={`mailto:${legalEntity.emails.safety}`} className="underline underline-offset-2">
              {legalEntity.emails.safety}
            </a>{" "}
            with the same details.
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as (typeof reportCategories)[number])}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
              >
                {reportCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Details</span>
              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                required
                minLength={12}
                rows={4}
                placeholder="Describe what happened, include usernames, links, or timestamps if available."
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Your email (optional)</span>
              <input
                type="email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#111830] px-3 py-2.5 text-sm text-[#f0edf8]"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#ff5c2b] to-[#e8a800] px-4 py-3 text-sm font-black text-[#0a0e1f]"
            >
              Submit Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ReportAbuseButton({
  className = "",
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const { openReportAbuse } = useCompliance();

  return (
    <button
      type="button"
      onClick={openReportAbuse}
      className={className}
    >
      {compact ? "Report" : "Report Abuse"}
    </button>
  );
}
