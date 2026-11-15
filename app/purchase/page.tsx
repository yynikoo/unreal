import type { Metadata } from "next";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = { title: "Purchase" };

// Checkout is intentionally not implemented: no payment provider is connected
// and the buttons are disabled.
export default function PurchasePage() {
  return (
    <div className="stack lg">
      <section className="stack center" style={{ gap: 10, paddingTop: 8 }}>
        <p className="eyebrow">Plans</p>
        <h1>Pick what fits</h1>
        <p className="muted">Simple pricing. No hidden extras.</p>
      </section>

      <p className="alert info center" role="status">
        Checkout is coming soon. Purchases aren&apos;t available yet.
      </p>

      <div className="grid-3">
        {PLANS.map((plan) => (
          <section key={plan.id} className={`card plan${plan.featured ? " featured" : ""}`} aria-labelledby={`plan-${plan.id}`}>
            <div className="spread">
              <h2 id={`plan-${plan.id}`}>{plan.name}</h2>
              {plan.featured && <span className="badge accent">Popular</span>}
            </div>
            <div className="price">
              {plan.price} <small>{plan.period}</small>
            </div>
            <p className="muted small">{plan.blurb}</p>
            <ul className="features">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button type="button" className="btn block" disabled aria-disabled="true" title="Checkout is coming soon">
              Coming soon
            </button>
          </section>
        ))}
      </div>
    </div>
  );
}
