"use client";

import { useEffect, useState, useRef } from "react";

const neighborhoods = [
  { city: "Denver", region: "Central", note: "Capitol Hill, Cheesman Park, Wash Park" },
  { city: "Lakewood", region: "West metro", note: "Older homes and rental turns" },
  { city: "Aurora", region: "East metro", note: "Installations and weak-flush calls" },
  { city: "Arvada", region: "Northwest", note: "Base leaks and replacements" },
  { city: "Englewood", region: "South metro", note: "Bathroom remodel installs" },
  { city: "Littleton", region: "Southwest", note: "Comfort-height upgrades" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % neighborhoods.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="service-area" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-primary/60" />
              Service area
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Denver-first.
              <br />
              Nearby suburbs covered.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              The site is structured for Denver search intent first, with supporting
              service-area language for nearby homes, rentals, and property managers.
              Exact coverage should be tied to the final business address and dispatch radius.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">6</div>
                <div className="text-sm text-muted-foreground">Metro areas listed</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">802xx</div>
                <div className="text-sm text-muted-foreground">Denver ZIP intent</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">Local</div>
                <div className="text-sm text-muted-foreground">GBP alignment needed</div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="border border-foreground/10">
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Denver Toilet Pros Coverage</span>
                <span className="flex items-center gap-2 text-xs font-mono text-primary">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Local service business
                </span>
              </div>

              <div>
                {neighborhoods.map((location, index) => (
                  <div
                    key={location.city}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between gap-6 transition-all duration-300 ${
                      activeLocation === index ? "bg-primary/[0.05]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeLocation === index ? "bg-primary" : "bg-foreground/20"}`} />
                      <div className="min-w-0">
                        <div className="font-medium">{location.city}</div>
                        <div className="text-sm text-muted-foreground">{location.note}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground shrink-0">{location.region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
