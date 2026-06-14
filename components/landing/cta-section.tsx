"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { ServiceModel } from "./service-model";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-primary transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
            style={{ background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, oklch(0.46 0.145 232 / 0.25), transparent 40%)` }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-4xl lg:text-7xl font-display tracking-tight mb-8 leading-[0.95]">
                  Ready to stop
                  <br />
                  the toilet problem?
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Schedule a Denver toilet repair, replacement, or installation visit.
                  Tell us what the toilet is doing and whether you already have the new unit.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group">
                    Request toilet service
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5">
                    <Phone className="w-4 h-4 mr-2" />
                    Call (720) 555-0198
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-mono">
                  Active overflow? Turn the shutoff valve clockwise before calling.
                </p>
              </div>

              <div className="hidden lg:flex items-center justify-center w-[460px] h-[460px] -mr-10">
                <ServiceModel
                  url="/models/plumber-wrench.glb"
                  label="Slowly rotating plumber wrench model"
                  scale={1.25}
                  rotationSpeed={0.22}
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/15" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-primary/15" />
        </div>
      </div>
    </section>
  );
}
