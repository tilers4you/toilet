"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { ServiceModel } from "./service-model";
import { useLead } from "@/components/lead/lead-provider";

const words = ["replacement", "installation", "repair", "leak fixes"];

const heroStats = [
  { value: "Same-day", label: "repair windows", detail: "Denver metro" },
  { value: "1.28 GPF", label: "WaterSense options", detail: "when replacing" },
  { value: "Clean haul-away", label: "old toilet removal", detail: "on installs" },
  { value: "Repair-first", label: "honest diagnosis", detail: "when it makes sense" },
];

export function HeroSection() {
  const { open } = useLead();
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute right-[-2%] xl:right-[2%] top-1/2 hidden h-[min(620px,72vh)] w-[min(620px,46vw)] -translate-y-1/2 lg:block">
        <ServiceModel
          url="/models/modern-toilet.glb"
          label="Modern toilet — drag to rotate"
          targetSize={2.6}
          interactive
          rotationSpeed={0.18}
          className="h-full w-full opacity-95"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><span>Denver Toilet Service</span></li>
          </ol>
        </nav>

        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-primary/60" />
            Denver, Colorado toilet plumbers
          </span>
        </div>

        <div className="mb-12 max-w-5xl">
          <h1
            className={`text-[clamp(3rem,10vw,8.5rem)] font-display leading-[0.92] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Toilet</span>
            <span className="block">
              <span className="relative inline-block min-w-[0]">
                <span key={wordIndex} className="inline-flex">
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{ animationDelay: `${i * 45}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-accent/35" />
              </span>
              <span className="block">in Denver</span>
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.5fr)] gap-12 lg:gap-20 items-end">
          <div>
            <p
              className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Denver Toilet Pros handles toilet installation, replacement, and focused
              toilet repair: running toilets, weak flushes, leaking bases, flappers,
              fill valves, shutoff valves, wax rings, and new WaterSense toilets.
            </p>

            <div
              className={`mt-8 flex flex-wrap gap-3 text-sm transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {["Repair before replacing", "Old toilet haul-away", "Landlords welcome"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 border border-foreground/10 bg-background/70 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="border border-foreground/10 bg-background/85 p-5 backdrop-blur">
              <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Book a toilet diagnosis</p>
                  <p className="text-sm text-muted-foreground">Repair, replace, or install.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Button onClick={() => open("Hero — Request service")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group">
                  Request service
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5">
                  <a href="tel:+17207173990">
                    <Phone className="w-4 h-4 mr-2" />
                    Call (720) 717-3990
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-0 right-0 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {heroStats.map((stat) => (
                <div key={`${stat.value}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-3xl lg:text-5xl font-display">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-xs mt-1">{stat.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
