export type CookieConsentLevel = "all" | "essential";

export type ComplianceState = {
  ageVerified: boolean;
  termsAccepted: boolean;
  cookieConsent: CookieConsentLevel | null;
};

const ageKey = "cpa_age_verified";
const termsKey = "cpa_terms_accepted";
const cookieKey = "cpa_cookie_consent";

export function readComplianceState(): ComplianceState {
  if (typeof window === "undefined") {
    return { ageVerified: false, termsAccepted: false, cookieConsent: null };
  }

  return {
    ageVerified: window.localStorage.getItem(ageKey) === "true",
    termsAccepted: window.localStorage.getItem(termsKey) === "true",
    cookieConsent: (window.localStorage.getItem(cookieKey) as CookieConsentLevel | null) ?? null
  };
}

export function saveAgeAndTermsAcceptance() {
  window.localStorage.setItem(ageKey, "true");
  window.localStorage.setItem(termsKey, "true");
}

export function saveCookieConsent(level: CookieConsentLevel) {
  window.localStorage.setItem(cookieKey, level);
}

export function clearComplianceState() {
  window.localStorage.removeItem(ageKey);
  window.localStorage.removeItem(termsKey);
  window.localStorage.removeItem(cookieKey);
}
