"use client";

import Link from "next/link";
import { SiteFooterLowerRightStack, SITE_FOOTER_MICRO_ANCHOR_ID } from "@/components/site-footer-lower-right-stack";

export function SiteFooter() {
  return (
    <footer className="site-footer-panel-wrap">
      <div className="site-footer-panel">
        <div className="site-footer-panel-white-shell">
          <span className="site-footer-panel-white-notch" aria-hidden="true" />
          <span className="site-footer-panel-white-strobe" aria-hidden="true" />

          <div className="site-footer-terms" role="contentinfo">
            <nav className="site-footer-terms-links" aria-label="Legal">
              <Link href="/legal/terms">Terms</Link>
              <span aria-hidden="true">·</span>
              <Link href="/legal/privacy">Privacy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/legal/community">Community Guidelines</Link>
              <span aria-hidden="true">·</span>
              <Link href="/legal/creator-agreement">Creator Agreement</Link>
            </nav>
            <p className="site-footer-terms-copyright">© 2026 Caribbean Freedom Arena</p>
          </div>

          <div className="site-footer-legal-anchor" id={SITE_FOOTER_MICRO_ANCHOR_ID}>
            <SiteFooterLowerRightStack />
          </div>
        </div>
      </div>
    </footer>
  );
}
