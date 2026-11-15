// PLACEHOLDER plans and prices shown on /purchase. Edit freely; nothing is charged.
export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$4.99",
    period: "/ month",
    blurb: "Try everything, cancel any time.",
    features: ["Full access", "All updates while active", "Standard support"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$11.99",
    period: "/ 3 months",
    blurb: "The usual pick.",
    features: ["Full access", "All updates while active", "Priority support", "Save 20% vs monthly"],
    featured: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$29.99",
    period: "once",
    blurb: "Pay once, keep it.",
    features: ["Full access forever", "All future updates", "Priority support"],
  },
];
