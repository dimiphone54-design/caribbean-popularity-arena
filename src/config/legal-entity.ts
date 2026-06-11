/**
 * Legal entity details for Caribbean Popularity Arena.
 *
 * NEXT WEEK — after Trinidad sole trader registration, fill in:
 * - registeredBusinessName (exact name on certificate)
 * - businessRegistrationNumber (BN / sole trader reference)
 * - registeredBusinessAddress (registered address in T&T)
 * - effectiveDate + lastUpdatedDate
 * - emails (legal@, support@, privacy@, safety@ your domain)
 * - disputeResolution (after counsel confirms courts/arbitration)
 * - attorneyReviewComplete: true (only after lawyer sign-off)
 */
export const legalEntity = {
  /** Your registered sole trader / business name from Trinidad registration */
  registeredBusinessName: "[REGISTERED BUSINESS NAME]",

  /** Business registration or sole trader reference number */
  businessRegistrationNumber: "[BUSINESS REGISTRATION NUMBER]",

  /** Registered business address in Trinidad and Tobago */
  registeredBusinessAddress: "[REGISTERED BUSINESS ADDRESS]",

  /** Official platform timezone for promotions and rotations */
  platformTimezone: "America/Port_of_Spain",

  /** Legal document effective date (ISO or readable date) */
  effectiveDate: "[EFFECTIVE DATE]",

  /** Last updated date for legal documents */
  lastUpdatedDate: "[LAST UPDATED DATE]",

  emails: {
    legal: "[LEGAL@EXAMPLE.COM]",
    support: "[SUPPORT@EXAMPLE.COM]",
    privacy: "[PRIVACY@EXAMPLE.COM]",
    billing: "[BILLING@EXAMPLE.COM]",
    safety: "[SAFETY@EXAMPLE.COM]",
    abuse: "[ABUSE@EXAMPLE.COM]",
    creators: "[CREATORS@EXAMPLE.COM]",
    ip: "[IP@EXAMPLE.COM]",
    security: "[SECURITY@EXAMPLE.COM]"
  },

  /** Confirm with Trinidad counsel before launch */
  disputeResolution:
    "[ARBITRATION OR COURTS — TO BE CONFIRMED BY COUNSEL]",

  /** Primary payment processor for Trinidad launch */
  paymentProcessor: "WiPay Financial (Trinidad & Tobago)",

  jurisdiction: "Republic of Trinidad and Tobago",

  /** Set true once a Trinidad attorney has reviewed and approved the legal framework */
  attorneyReviewComplete: false
} as const;

export function applyLegalEntityPlaceholders(content: string) {
  return content
    .replaceAll("[REGISTERED BUSINESS NAME]", legalEntity.registeredBusinessName)
    .replaceAll("[BUSINESS REGISTRATION NUMBER]", legalEntity.businessRegistrationNumber)
    .replaceAll("[REGISTERED BUSINESS ADDRESS]", legalEntity.registeredBusinessAddress)
    .replaceAll("[EFFECTIVE DATE]", legalEntity.effectiveDate)
    .replaceAll("[LAST UPDATED DATE]", legalEntity.lastUpdatedDate)
    .replaceAll("[LEGAL@EXAMPLE.COM]", legalEntity.emails.legal)
    .replaceAll("[SUPPORT@EXAMPLE.COM]", legalEntity.emails.support)
    .replaceAll("[PRIVACY@EXAMPLE.COM]", legalEntity.emails.privacy)
    .replaceAll("[BILLING@EXAMPLE.COM]", legalEntity.emails.billing)
    .replaceAll("[SAFETY@EXAMPLE.COM]", legalEntity.emails.safety)
    .replaceAll("[ABUSE@EXAMPLE.COM]", legalEntity.emails.abuse)
    .replaceAll("[CREATORS@EXAMPLE.COM]", legalEntity.emails.creators)
    .replaceAll("[IP@EXAMPLE.COM]", legalEntity.emails.ip)
    .replaceAll("[SECURITY@EXAMPLE.COM]", legalEntity.emails.security)
    .replaceAll(
      "[PLATFORM TIMEZONE PLACEHOLDER — e.g., America/Port_of_Spain]",
      legalEntity.platformTimezone
    )
    .replaceAll(
      "[ARBITRATION OR COURTS — TO BE CONFIRMED BY COUNSEL]",
      legalEntity.disputeResolution
    )
    .replaceAll("[USD/EQUIVALENT AMOUNT PLACEHOLDER]", "TTD equivalent to be confirmed by counsel");
}

export function isLegalEntityConfigured() {
  return !legalEntity.registeredBusinessName.includes("[REGISTERED");
}
