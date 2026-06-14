"use client";

import { useEffect, useState, useRef } from "react";

const serviceItems = [
  { name: "Kohler", category: "Common brand" },
  { name: "TOTO", category: "Common brand" },
  { name: "American Standard", category: "Common brand" },
  { name: "Glacier Bay", category: "Common brand" },
  { name: "Mansfield", category: "Common brand" },
  { name: "Niagara", category: "Water-saving toilets" },
  { name: "Fill valve", category: "Running toilet repair" },
  { name: "Flapper", category: "Silent leak repair" },
  { name: "Wax ring", category: "Leak at base" },
  { name: "Closet flange", category: "Loose toilet fix" },
  { name: "Supply line", category: "Drip repair" },
  { name: "Shutoff valve", category: "Water control" },
];

export function IntegrationsSection() {
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
    <section id="brands" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-primary/60" />
            Toilets, parts, and problems
            <span className="w-8 h-px bg-primary/60" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Focused on the fixture
            <br />
            most plumbers treat as one small line item.
          </h2>
          <p className="text-xl text-muted-foreground">
            Use this section to show search engines and customers exactly what the business handles without pretending to be an unrelated full-stack plumbing brand.
          </p>
        </div>
      </div>

      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {serviceItems.map((item) => (
                <div key={`${item.name}-${setIndex}`} className="shrink-0 px-8 py-6 border border-foreground/10 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300 group">
                  <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...serviceItems].reverse().map((item) => (
                <div key={`${item.name}-reverse-${setIndex}`} className="shrink-0 px-8 py-6 border border-foreground/10 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300 group">
                  <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
