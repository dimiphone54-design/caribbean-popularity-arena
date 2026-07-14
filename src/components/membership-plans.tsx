import { membershipPlans } from "@/lib/data";
import { MembershipPlanCard } from "@/components/membership-plan-card";

export function MembershipPlans() {
  return (
    <section id="plans" className="w-full py-20">
      <div className="w-full">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-section-eyebrow">Community rooms</p>
          <h2 className="luxury-section-title mt-3 text-4xl sm:text-5xl">
            Exclusive rooms. Open access.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--luxury-mist)]">
            Free community rooms on the platform. Browse, watch, and join — no purchase required on this site.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <MembershipPlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-[var(--luxury-mist)]">
          Payments processed securely via PayPal. Community and entertainment only.
        </p>
      </div>
    </section>
  );
}
