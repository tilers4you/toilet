"use client";

import { ArrowRight, Check } from "lucide-react";

const serviceOptions = [
  {
    name: "Toilet repair visit",
    description: "For running toilets, slow fills, weak flushes, handles, flappers, fill valves, and visible tank leaks.",
    price: "Estimate first",
    features: [
      "Tank-part diagnosis",
      "Repair vs replacement advice",
      "Shutoff and supply line check",
      "Clear option before work begins",
      "Urgent leak guidance",
    ],
    cta: "Request repair",
    popular: false,
  },
  {
    name: "Toilet replacement",
    description: "For old, cracked, inefficient, wobbling, or repeatedly repaired toilets that are ready to be replaced.",
    price: "Most requested",
    features: [
      "Old toilet removal",
      "Flange and floor check",
      "Wax or waxless seal set",
      "Water test and cleanup",
      "Haul-away when included",
      "WaterSense upgrade guidance",
    ],
    cta: "Plan replacement",
    popular: true,
  },
  {
    name: "Install-only / property work",
    description: "For customer-supplied toilets, remodel installs, rental turns, and repeat property-manager needs.",
    price: "Scope-based",
    features: [
      "Customer-supplied toilet install",
      "Comfort-height and dual-flush installs",
      "Bidet-ready seat discussion",
      "Photo documentation available",
      "Multiple-unit scheduling",
    ],
    cta: "Discuss install",
    popular: false,
  },
];

const costFactors = [
  "Toilet type: two-piece, one-piece, comfort-height, dual-flush, smart, or bidet-ready.",
  "Condition of the flange, wax seal, shutoff valve, supply line, and floor around the toilet.",
  "Whether the old toilet must be removed, hauled away, or carried through stairs/elevator access.",
  "Whether the toilet location is staying the same or plumbing needs to be moved.",
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">Cost and options</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            No fake
            <br />
            <span className="text-stroke">one-price promise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Toilet work depends on what is under the bowl and inside the tank. The site should explain cost factors before a customer asks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {serviceOptions.map((option, idx) => (
            <div key={option.name} className={`relative p-8 lg:p-12 bg-background ${option.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-primary" : ""}`}>
              {option.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most common
                </span>
              )}

              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-3xl text-foreground mt-2">{option.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{option.description}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-foreground/10">
                <span className="font-display text-4xl text-foreground">{option.price}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${option.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-foreground/20 text-foreground hover:border-primary hover:bg-primary/[0.04]"}`}>
                {option.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-[0.65fr_1fr] gap-10 border border-foreground/10 p-8 lg:p-10">
          <div>
            <h3 className="font-display text-3xl mb-4">What changes the price?</h3>
            <p className="text-muted-foreground">
              This content supports users who compare DIY, repair, and replacement before calling.
            </p>
          </div>
          <ul className="grid gap-4">
            {costFactors.map((factor) => (
              <li key={factor} className="flex items-start gap-3 text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
