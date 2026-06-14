"use client";

import { useEffect, useState } from "react";

const cases = [
  {
    quote: "A toilet that runs every few minutes is usually a tank-part problem, but the visit should still check water level, overflow height, chain slack, and the shutoff valve.",
    author: "Common call",
    role: "Running toilet",
    company: "Fill valve / flapper",
    metric: "Often repairable",
  },
  {
    quote: "Water at the base is not a cosmetic issue. The bowl may need to be pulled so the wax seal, flange, and floor can be inspected before damage spreads.",
    author: "Common call",
    role: "Leak at base",
    company: "Wax ring / flange",
    metric: "Stop using it",
  },
  {
    quote: "When an old toilet has repeated clogs, weak flushes, cracks, or expensive recurring repairs, replacement can be the more practical long-term fix.",
    author: "Common call",
    role: "Replacement decision",
    company: "Old inefficient toilet",
    metric: "Repair vs replace",
  },
  {
    quote: "For rental turns, the best install is predictable: stable bowl, new supply line when needed, water test, photos, cleanup, and old toilet removal.",
    author: "Common call",
    role: "Property turnover",
    company: "Landlords / managers",
    metric: "Clean install",
  },
];

const topicMarquee = [
  "Running toilet",
  "Weak flush",
  "Ghost flushing",
  "Base leak",
  "Rocking toilet",
  "Cracked tank",
  "Flapper",
  "Fill valve",
  "Wax ring",
  "Closet flange",
  "Supply line",
  "Shutoff valve",
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % cases.length);
        setIsAnimating(false);
      }, 300);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const activeCase = cases[activeIndex];

  return (
    <section className="relative py-32 lg:py-40 border-t border-foreground/10 lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Service education</span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <blockquote className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <p className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
                “{activeCase.quote}”
              </p>
            </blockquote>

            <div className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="font-display text-2xl text-primary">{activeCase.role.charAt(0)}</span>
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{activeCase.role}</p>
                <p className="text-muted-foreground">{activeCase.company}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className={`p-8 border border-foreground/10 transition-all duration-300 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">Customer decision</span>
              <p className="font-display text-3xl md:text-4xl text-foreground">{activeCase.metric}</p>
            </div>

            <div className="flex gap-2 mt-8">
              {cases.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-2 transition-all duration-300 ${idx === activeIndex ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
                  aria-label={`Show service education item ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-foreground/10">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
            Common Denver toilet service searches
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-16 items-center marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0">
              {topicMarquee.map((topic) => (
                <span key={`${setIdx}-${topic}`} className="font-display text-xl md:text-2xl text-foreground/30 whitespace-nowrap hover:text-foreground transition-colors duration-300">
                  {topic}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
