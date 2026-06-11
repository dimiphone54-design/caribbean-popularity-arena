"use client";

import { AgeGateOverlay } from "@/components/age-gate-overlay";
import { ComplianceProvider } from "@/components/compliance-provider";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { ReportAbuseModal } from "@/components/report-abuse-flow";

export function ComplianceShell({ children }: { children: React.ReactNode }) {
  return (
    <ComplianceProvider>
      {children}
      <AgeGateOverlay />
      <CookieConsentBanner />
      <ReportAbuseModal />
    </ComplianceProvider>
  );
}
