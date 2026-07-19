import { buildDirectDropshipHowItWorks } from "@/lib/dropship-lane-template";

/** Shared Direct Dropship How It Works · same template for every country */
export function DropshipHowItWorks({ countryName = "this country" }: { countryName?: string }) {
  const steps = buildDirectDropshipHowItWorks(countryName);

  return (
    <div className="dropship-how-it-works a2030-holo-panel">
      <div className="dropship-how-it-works-glow" aria-hidden="true" />
      <div className="dropship-how-it-works-head">
        <div>
          <p className="dropship-how-it-works-kicker a2030-electric-flash">How It Works</p>
          <p className="dropship-how-it-works-lead">
            Supplier ships direct · secure USD checkout · no inventory on the Arena.
          </p>
        </div>
        <span className="dropship-how-it-works-badge">USD · DIRECT SHIP</span>
      </div>
      <ol className="dropship-how-it-works-steps" role="list">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`dropship-how-it-works-step dropship-how-it-works-step--${index + 1}`}
            role="listitem"
          >
            <p className="dropship-how-it-works-step-title">{step.title}</p>
            <p className="dropship-how-it-works-step-body whitespace-pre-line">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
