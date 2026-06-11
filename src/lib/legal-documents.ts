export type LegalDocument = {
  slug: string;
  title: string;
  file: string;
  description: string;
};

export const legalDocuments: LegalDocument[] = [
  {
    slug: "terms",
    title: "Terms and Conditions",
    file: "terms-and-conditions.md",
    description: "Platform rules, eligibility, accounts, liability, and governing law."
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    file: "privacy-policy.md",
    description: "How personal data is collected, used, stored, and deleted."
  },
  {
    slug: "community",
    title: "Community Guidelines",
    file: "community-guidelines.md",
    description: "Community standards, prohibited conduct, and enforcement."
  },
  {
    slug: "creator-agreement",
    title: "Creator Participation Agreement",
    file: "creator-participation-agreement.md",
    description: "Creator eligibility, content standards, and licensing."
  },
  {
    slug: "refunds",
    title: "Refund and Payment Policy",
    file: "refund-and-payment-policy.md",
    description: "Billing, refunds, chargebacks, and digital service disclosures."
  },
  {
    slug: "safety",
    title: "Safety, Reporting and Moderation",
    file: "safety-reporting-moderation-policy.md",
    description: "Reporting tools, investigations, and safety enforcement."
  },
  {
    slug: "cookies",
    title: "Cookie and Analytics Policy",
    file: "cookie-and-analytics-policy.md",
    description: "Cookies, analytics, consent, and retention."
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    file: "acceptable-use-policy.md",
    description: "Permitted and prohibited uses of the platform."
  },
  {
    slug: "intellectual-property",
    title: "Content Ownership and IP",
    file: "content-ownership-ip-policy.md",
    description: "Ownership, licenses, trademarks, and copyright notices."
  },
  {
    slug: "data-retention",
    title: "Data Retention and Deletion",
    file: "data-retention-deletion-policy.md",
    description: "Retention schedules, deletion requests, and legal holds."
  },
  {
    slug: "birthday-promotion",
    title: "Birthday BlessTime Promotion Terms",
    file: "birthday-bless-time-promotion-terms.md",
    description: "Eligibility, duration, limits, and exclusions for the birthday BlessTime promotion."
  }
];

export function getLegalDocumentBySlug(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}
