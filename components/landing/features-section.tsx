"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Toilet replacement",
    description: "Remove the old toilet, inspect the flange, set a new wax or waxless seal, install the new bowl and tank, test every connection, and haul away the old unit.",
    visual: "replacement",
  },
  {
    number: "02",
    title: "Toilet installation",
    description: "Install customer-supplied or recommended toilets for remodels, rentals, basement baths, comfort-height upgrades, bidet-ready seats, and WaterSense replacements.",
    visual: "install",
  },
  {
    number: "03",
    title: "Running toilet repair",
    description: "Stop water waste caused by worn flappers, tangled chains, incorrect tank levels, failing fill valves, overflow tube issues, and silent leaks.",
    visual: "running",
  },
  {
    number: "04",
    title: "Leaks, clogs, and weak flushes",
    description: "Fix leaks at the base, loose toilets, shutoff valve problems, supply line drips, mineral-blocked rim jets, repeated clogs, and low bowl water.",
    visual: "leak",
  },
];

function ReplacementVisual() {
  return (
    <svg viewBox="0 0 220 160" className="w-full h-full" aria-hidden="true">
      <rect x="38" y="118" width="144" height="10" rx="5" fill="currentColor" opacity="0.12" />
      <path d="M82 30h58v52c0 20-13 36-29 36s-29-16-29-36V30Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M74 26h74v18H74z" fill="currentColor" opacity="0.12" />
      <path d="M76 118h70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M154 52l12 12 24-28" fill="none" stroke="oklch(0.78 0.12 165)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" values="0 80;80 0;80 0" dur="2.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function InstallVisual() {
  return (
    <svg viewBox="0 0 220 160" className="w-full h-full" aria-hidden="true">
      <path d="M58 124h104" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 38h60v68H80z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M92 24h36v18H92z" fill="currentColor" opacity="0.12" />
      <path d="M78 106c7 18 57 18 64 0" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="42" y1="62" x2="178" y2="62" stroke="oklch(0.46 0.145 232)" strokeWidth="2" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" values="0;-28" dur="1.2s" repeatCount="indefinite" />
      </line>
      <circle cx="42" cy="62" r="6" fill="oklch(0.46 0.145 232)" />
      <circle cx="178" cy="62" r="6" fill="oklch(0.46 0.145 232)" />
    </svg>
  );
}

function RunningVisual() {
  return (
    <svg viewBox="0 0 220 160" className="w-full h-full" aria-hidden="true">
      <rect x="58" y="22" width="104" height="58" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M80 78v52h60V78" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="90" cy="49" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M128 34v30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M128 64c12 0 12 12 0 12s-12-12 0-12Z" fill="oklch(0.78 0.12 165)" opacity="0.85">
        <animate attributeName="opacity" values="0.35;1;0.35" dur="1.4s" repeatCount="indefinite" />
      </path>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${92 + i * 15} 88v24`} stroke="oklch(0.46 0.145 232)" strokeWidth="3" strokeLinecap="round" opacity="0.25">
          <animate attributeName="opacity" values="0.15;0.8;0.15" dur="1.6s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

function LeakVisual() {
  return (
    <svg viewBox="0 0 220 160" className="w-full h-full" aria-hidden="true">
      <path d="M76 34h68v40c0 19-15 34-34 34S76 93 76 74V34Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M68 110h84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M84 122c16-7 36-7 52 0" fill="none" stroke="oklch(0.62 0.17 28)" strokeWidth="4" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 70;70 0;70 0" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M152 82c11 14 11 23 0 23s-11-9 0-23Z" fill="oklch(0.46 0.145 232)" opacity="0.65">
        <animate attributeName="transform" values="translate(0 0);translate(0 8);translate(0 0)" dur="1.3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "replacement":
      return <ReplacementVisual />;
    case "install":
      return <InstallVisual />;
    case "running":
      return <RunningVisual />;
    case "leak":
      return <LeakVisual />;
    default:
      return <ReplacementVisual />;
  }
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{service.number}</span>
        </div>
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {service.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-56 h-44 text-foreground">
              <AnimatedVisual type={service.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-primary/60" />
            Toilet services
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            The toilet-specific work
            <br />
            <span className="text-muted-foreground">Denver homeowners search for.</span>
          </h2>
        </div>

        <div>
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
