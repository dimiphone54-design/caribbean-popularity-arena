import { LockKeyhole, ShieldCheck, Vote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const memberTrustPoints = [
  {
    icon: Vote,
    title: "Secure voting",
    description: "Member ballots are recorded with care — built for fair arena rankings and verified activity."
  },
  {
    icon: LockKeyhole,
    title: "Member-grade security",
    description: "Accounts, votes, and room access are designed for protected participation on the Platform."
  },
  {
    icon: ShieldCheck,
    title: "Fair arena scores",
    description:
      "Weekly rankings blend fan votes, streaks, verified activity, and category momentum into one arena score."
  }
];

/** Public home · member trust only — operator Firebase wiring lives in Command Center */
export function FirebaseIntegration() {
  return (
    <section id="firebase" className="w-full py-20">
      <div className="firebase-infrastructure-panel w-full overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <Image
          src="/firebase-infrastructure-panel-bg.png"
          alt=""
          fill
          className="firebase-infrastructure-panel-bg"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="firebase-infrastructure-panel-scrim" aria-hidden="true" />

        <div className="firebase-infrastructure-copy relative z-[1] mx-auto max-w-3xl text-center">
          <p className="luxury-section-eyebrow">Member security</p>
          <h2 className="luxury-section-title mt-3 text-4xl sm:text-5xl">
            Real-time votes. Member-grade security.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--luxury-mist)]">
            Your votes and membership activity run on secured infrastructure designed for fair arena rankings and
            protected participation — not purchases of personal access or time with any individual.
          </p>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {memberTrustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="luxury-glass-card firebase-infrastructure-step-card p-5"
                >
                  <span className="relative z-[1] grid size-11 place-items-center rounded-2xl border border-[var(--glass-border)] bg-[var(--luxury-gold)]/10 text-[var(--luxury-gold-bright)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="relative z-[1] mt-4 font-luxury-serif text-lg text-[var(--luxury-champagne)]">
                    {point.title}
                  </h3>
                  <p className="relative z-[1] mt-2 text-sm leading-6 text-[var(--luxury-mist)]">
                    {point.description}
                  </p>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-xs leading-5 text-[var(--luxury-mist)]">
            Gifts are voluntary contributions for digital platform access and community features.{" "}
            <Link href="/legal/terms" className="text-[var(--luxury-champagne)] underline underline-offset-2">
              Terms
            </Link>
            {" · "}
            <Link href="/legal/refunds" className="text-[var(--luxury-champagne)] underline underline-offset-2">
              Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
