"use client";

import { SiteFooterLegalMicro } from "@/components/site-footer-legal-micro";

/** Id for optional layout hooks · footer lower-right is legal only (AI stays on fixed rail). */
export const SITE_FOOTER_MICRO_ANCHOR_ID = "site-footer-micro-anchor";

/** Footer lower-right · Legal / Terms only — AI Agent lives on the fixed ✦ rail, not here. */
export function SiteFooterLowerRightStack() {
  return <SiteFooterLegalMicro />;
}
