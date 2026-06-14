"use client";

import { useEffect, useState, useRef } from "react";
import { BadgeDollarSign, FileCheck, Shield, Sparkles } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Licensed and insured messaging",
    description: "Show the Colorado plumbing license number here when the operating entity is finalized. Do not hide it in fine print.",
  },
  {
    icon: BadgeDollarSign,
    title: "Upfront repair options",
    description: "Explain the repair path, the replacement path, and when a flange or floor issue changes the estimate.",
  },
  {
    icon: Sparkles,
    title: "Bathroom protection and cleanup",
    description: "Protect flooring, remove the old toilet when included, test the flush, and leave the bathroom usable.",
  },
  {
    icon: FileCheck,
    title: "Warranty-backed work",
    description: "State the final parts and workmanship warranty clearly once the business policy is set.",
  },
];

const credibility = ["License # pending", "Insured", "Floor protection", "Written options", "Old unit haul-away"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" ref={sectionRef} className="relative py-24 lg:py-32 bg-primary/[0.04] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-primary/60" />
              Trust signals
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              A toilet plumber
              <br />
              should be easy to verify.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Local plumbing pages win when they are specific, verifiable, and useful.
              This section is designed for real license, insurance, warranty, and service
              policy details instead of vague “best in Denver” claims.
            </p>

            <div className="flex flex-wrap gap-3">
              {credibility.map((item, index) => (
                <span
                  key={item}
                  className={`px-4 py-2 border border-foreground/10 bg-background/70 text-sm font-mono transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {trustFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 bg-background/70 hover:border-primary/30 transition-all duration-500 group ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
