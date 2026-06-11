"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  readComplianceState,
  saveAgeAndTermsAcceptance,
  saveCookieConsent,
  type CookieConsentLevel
} from "@/lib/compliance-storage";

type ComplianceContextValue = {
  ready: boolean;
  ageVerified: boolean;
  termsAccepted: boolean;
  cookieConsent: CookieConsentLevel | null;
  reportOpen: boolean;
  acceptAgeAndTerms: () => void;
  setCookieConsent: (level: CookieConsentLevel) => void;
  openReportAbuse: () => void;
  closeReportAbuse: () => void;
};

const ComplianceContext = createContext<ComplianceContextValue | null>(null);

export function ComplianceProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cookieConsent, setCookieConsentState] = useState<CookieConsentLevel | null>(null);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    const state = readComplianceState();
    setAgeVerified(state.ageVerified);
    setTermsAccepted(state.termsAccepted);
    setCookieConsentState(state.cookieConsent);
    setReady(true);
  }, []);

  const acceptAgeAndTerms = useCallback(() => {
    saveAgeAndTermsAcceptance();
    setAgeVerified(true);
    setTermsAccepted(true);
  }, []);

  const setCookieConsent = useCallback((level: CookieConsentLevel) => {
    saveCookieConsent(level);
    setCookieConsentState(level);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      ageVerified,
      termsAccepted,
      cookieConsent,
      reportOpen,
      acceptAgeAndTerms,
      setCookieConsent,
      openReportAbuse: () => setReportOpen(true),
      closeReportAbuse: () => setReportOpen(false)
    }),
    [ready, ageVerified, termsAccepted, cookieConsent, reportOpen, acceptAgeAndTerms, setCookieConsent]
  );

  return <ComplianceContext.Provider value={value}>{children}</ComplianceContext.Provider>;
}

export function useCompliance() {
  const context = useContext(ComplianceContext);

  if (!context) {
    throw new Error("useCompliance must be used within ComplianceProvider");
  }

  return context;
}
