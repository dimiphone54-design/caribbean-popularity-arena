/** Beginner-friendly dropshipping explainer · shown in country market panels */
export function DropshipHowItWorks() {
  const steps = [
    {
      title: "1 · Browse",
      body: "Pick a trending product from this country lane — scarves, food kits, merch, and more."
    },
    {
      title: "2 · Pay + ship address",
      body: "Enter where you want it delivered. You pay on the arena — no warehouse, no inventory for you."
    },
    {
      title: "3 · Supplier ships",
      body: "A partner in that country gets the order and ships direct to your door (classic dropshipping)."
    },
    {
      title: "4 · Track here",
      body: "Use the same email to see status: payment → preparing → shipped → delivered."
    }
  ];

  return (
    <div className="dropship-how-it-works a2030-holo-panel">
      <div className="dropship-how-it-works-glow" aria-hidden="true" />
      <div className="dropship-how-it-works-head">
        <div>
          <p className="dropship-how-it-works-kicker a2030-electric-flash">New to dropshipping?</p>
          <p className="dropship-how-it-works-lead">
            You sell or buy without holding stock — the supplier handles packing and delivery.
          </p>
        </div>
        <span className="dropship-how-it-works-badge">4-STEP LANE</span>
      </div>
      <ol className="dropship-how-it-works-steps" role="list">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`dropship-how-it-works-step dropship-how-it-works-step--${index + 1}`}
            role="listitem"
          >
            <p className="dropship-how-it-works-step-title">{step.title}</p>
            <p className="dropship-how-it-works-step-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
