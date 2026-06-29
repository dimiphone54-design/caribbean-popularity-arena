"use client";

import Link from "next/link";
import { footerLegalMicroLinks } from "@/lib/legal-documents";

export function SiteFooterLegalMicro() {
  return (
    <aside className="site-footer-legal-micro" aria-label="Legal links">
      <div className="arena-micro-rail-mini-box site-footer-legal-micro-shell">
        <span className="arena-micro-rail-mini-notch" aria-hidden="true" />
        <p className="site-footer-legal-micro-head">Legal</p>
        <nav className="site-footer-legal-micro-grid" aria-label="Legal documents">
          {footerLegalMicroLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-footer-legal-micro-link${index === 0 ? " site-footer-legal-micro-link--center" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
