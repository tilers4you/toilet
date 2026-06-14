"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Copy } from "lucide-react";

const diyGuides = [
  {
    label: "Running",
    title: "Toilet keeps running",
    code: `1. Remove the tank lid carefully.
2. Check whether the flapper fully seals.
3. Lift the float to see if the fill valve stops.
4. Make sure the chain has slight slack.
5. If water reaches the overflow tube, call for diagnosis.`,
  },
  {
    label: "Leak",
    title: "Water around the base",
    code: `1. Stop using the toilet if water appears at the floor.
2. Turn the shutoff valve clockwise.
3. Dry the floor and watch where water returns.
4. Do not keep tightening bolts on a rocking toilet.
5. Call if the wax ring, flange, or subfloor may be involved.`,
  },
  {
    label: "Clog",
    title: "Weak flush or clog",
    code: `1. Use a toilet flange plunger, not a flat sink plunger.
2. Avoid chemical drain cleaners in the toilet.
3. Try one firm plunge cycle, then flush only if water drops.
4. Repeated clogs can signal vent, trapway, or sewer issues.
5. Call if tubs or showers gurgle when the toilet flushes.`,
  },
];

const audiences = [
  { title: "Homeowners", description: "Straight answers on whether a toilet should be repaired, reset, or replaced." },
  { title: "Landlords", description: "Turnover-friendly replacement, haul-away, and clean documentation for rental units." },
  { title: "Property managers", description: "Repeatable service language for occupied units, vacant units, and urgent leak calls." },
  { title: "DIYers", description: "Useful checks before booking, with clear warnings when a pro should take over." },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(diyGuides[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="diy" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-primary/60" />
              DIY checks before you call
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Helpful advice
              <br />
              <span className="text-muted-foreground">without hiding the risks.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Many toilet issues start with simple tank parts. Leaks at the base,
              wobbling bowls, sewer smells, cracked porcelain, and repeated clogs
              are different: those can damage floors or point to drain problems.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {audiences.map((audience, index) => (
                <div
                  key={audience.title}
                  className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{audience.title}</h3>
                  <p className="text-sm text-muted-foreground">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="border border-foreground/10">
              <div className="flex items-center border-b border-foreground/10 overflow-x-auto">
                {diyGuides.map((guide, idx) => (
                  <button
                    key={guide.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${activeTab === idx ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {guide.label}
                    {activeTab === idx && <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />}
                  </button>
                ))}
                <div className="flex-1" />
                <button type="button" onClick={handleCopy} className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors" aria-label="Copy DIY checklist">
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-8 font-mono text-sm bg-foreground/[0.01] min-h-[280px]">
                <p className="font-sans text-2xl font-display mb-6">{diyGuides[activeTab].title}</p>
                <pre className="text-foreground/80 whitespace-pre-wrap">
                  {diyGuides[activeTab].code.split("\n").map((line, lineIndex) => (
                    <div key={`${activeTab}-${lineIndex}`} className="leading-loose dev-code-line" style={{ animationDelay: `${lineIndex * 80}ms` }}>
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Emergency note: if water is actively overflowing, turn off the shutoff valve behind the toilet and avoid flushing again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
