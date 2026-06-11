"use client";

import Link from "next/link";
import { Crown, Heart } from "lucide-react";
import { ReportAbuseButton } from "@/components/report-abuse-flow";
import { brand } from "@/config/brand";
import { legalDocuments } from "@/lib/legal-documents";

const footerLegalLinks = [
  { label: "Legal Center", href: "/legal" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Community", href: "/legal/community" },
  { label: "Refunds", href: "/legal/refunds" },
  { label: "Safety", href: "/legal/safety" },
  { label: "Birthday Promo", href: "/legal/birthday-promotion" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d7b46a]/20 bg-[#050d1d]/70 px-4 py-10 shadow-2xl shadow-black/20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl border border-[#d7b46a]/30 bg-[#d7b46a]/10 text-[#f7e7aa]">
                <Crown className="size-5" aria-hidden="true" />
              </span>
              <span className="font-luxury-serif text-[#f7efe0]">{brand.name}</span>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-[#b8c9e1]">
              {brand.tagline}
              <Heart className="size-4 fill-[#d7b46a] text-[#d7b46a]" aria-hidden="true" />
            </p>
            <ReportAbuseButton className="mt-4 rounded-lg border border-[#ff8060]/30 bg-[#ff8060]/10 px-4 py-2 text-sm font-semibold text-[#ff8060] transition hover:border-[#ff8060]/50" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d7b46a]">Legal</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-1.5 text-sm text-[#b8c9e1] transition hover:bg-white/5 hover:text-[#f7e7aa]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-[#d7b46a]">
                All legal documents ({legalDocuments.length})
              </summary>
              <div className="mt-3 grid gap-1 sm:grid-cols-2">
                {legalDocuments.map((document) => (
                  <Link
                    key={document.slug}
                    href={`/legal/${document.slug}`}
                    className="rounded-lg px-2 py-1 text-sm text-[#8fa3bf] transition hover:text-[#f7e7aa]"
                  >
                    {document.title}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </footer>
  );
}
