"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Tell us what the toilet is doing",
    description: "Running nonstop, leaking at the base, loose on the floor, weak flush, repeated clogs, cracked tank, or a new toilet waiting in the box.",
    checklist: ["Photos help", "Brand/model if known", "Any water on the floor"],
  },
  {
    number: "II",
    title: "We diagnose repair vs replacement",
    description: "A tech checks tank parts, shutoff valve, supply line, bowl movement, wax ring, flange height, floor condition, and whether the toilet is worth saving.",
    checklist: ["Flapper and fill valve", "Wax ring and flange", "Subfloor warning signs"],
  },
  {
    number: "III",
    title: "Repair, reset, or install cleanly",
    description: "Most tank-part repairs are straightforward. Full replacements include set, seal, water test, caulk decision, cleanup, and old toilet haul-away.",
    checklist: ["Water-tested connections", "Level and stable bowl", "Cleanup before we leave"],
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/55 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Process
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            A clean visit.
            <br />
            <span className="text-background/50">No guessing at the toilet.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-background/10 transition-all duration-500 group ${activeStep === index ? "opacity-100" : "opacity-45 hover:opacity-75"}`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                    <p className="text-background/65 leading-relaxed">{step.description}</p>
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-background/20 overflow-hidden">
                        <div className="h-full bg-accent w-0" style={{ animation: "progress 5s linear forwards" }} />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-background/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-background/10 flex items-center justify-between">
                <span className="text-xs font-mono text-background/45">service-checklist</span>
                <span className="text-xs font-mono text-accent">Denver, CO</span>
              </div>

              <div className="p-8 min-h-[300px]">
                <p className="text-sm font-mono text-background/45 mb-6">Active visit step</p>
                <h3 className="text-3xl lg:text-4xl font-display mb-6">{steps[activeStep].title}</h3>
                <ul className="space-y-4">
                  {steps[activeStep].checklist.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-background/75 code-line-reveal"
                      style={{ animationDelay: `${itemIndex * 100}ms` }}
                    >
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 py-4 border-t border-background/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-background/45">Ready for scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
