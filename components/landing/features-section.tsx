"use client";

import { useEffect, useRef, useState } from "react";
import { ServiceIcon, type ServiceIconType } from "./service-icon";

const services: {
  number: string;
  title: string;
  description: string;
  icon: ServiceIconType;
}[] = [
  {
    number: "01",
    title: "Toilet replacement",
    description: "Remove the old toilet, inspect the flange, set a new wax or waxless seal, install the new bowl and tank, test every connection, and haul away the old unit.",
    icon: "replacement",
  },
  {
    number: "02",
    title: "Toilet installation",
    description: "Install customer-supplied or recommended toilets for remodels, rentals, basement baths, comfort-height upgrades, bidet-ready seats, and WaterSense replacements.",
    icon: "installation",
  },
  {
    number: "03",
    title: "Running toilet repair",
    description: "Stop water waste caused by worn flappers, tangled chains, incorrect tank levels, failing fill valves, overflow tube issues, and silent leaks.",
    icon: "repair",
  },
  {
    number: "04",
    title: "Leaks, clogs, and weak flushes",
    description: "Fix leaks at the base, loose toilets, shutoff valve problems, supply line drips, mineral-blocked rim jets, repeated clogs, and low bowl water.",
    icon: "leaks",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
      onFocus={() => setIsPlaying(true)}
      onBlur={() => setIsPlaying(false)}
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
            <ServiceIcon
              type={service.icon}
              playing={isPlaying}
              style={{
                width: "11rem",
                height: "11rem",
                color: "var(--foreground)",
                ["--icon-accent" as string]: "var(--primary)",
              }}
            />
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
