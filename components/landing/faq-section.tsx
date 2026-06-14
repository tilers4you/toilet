"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "Do I need toilet repair or toilet replacement?",
    answer: "Repair usually makes sense for a good toilet with a worn flapper, fill valve, handle, supply line, or simple tank leak. Replacement starts making more sense when the toilet is cracked, repeatedly clogging, wobbling because of flange or floor issues, wasting water, or costing too much in repeat repairs.",
  },
  {
    question: "Why does my toilet keep running?",
    answer: "A running toilet is commonly caused by a flapper that does not seal, a chain with the wrong slack, a fill valve that will not shut off, or water set too high and spilling into the overflow tube.",
  },
  {
    question: "Why is my toilet leaking at the base?",
    answer: "Water at the base can mean a failed wax ring or waxless seal, a loose bowl, a damaged flange, condensation, or a crack. Stop using the toilet if water appears at the floor until the cause is found.",
  },
  {
    question: "Can you install a toilet I already bought?",
    answer: "Yes, the page is structured to support customer-supplied toilet installs. The final business process should confirm model compatibility, rough-in size, seat, supply line, and whether old toilet haul-away is included.",
  },
  {
    question: "Are WaterSense toilets powerful enough?",
    answer: "Modern WaterSense-labeled toilets are designed to use less water while meeting performance standards. They are a strong option when replacing older, high-gallon toilets, especially where water bills matter.",
  },
  {
    question: "What should I do if the toilet is overflowing?",
    answer: "Turn the shutoff valve behind the toilet clockwise, remove the tank lid and lift the float if needed, avoid flushing again, and call for urgent help if water continues or other drains are backing up.",
  },
];

export function FaqSection() {
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
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-primary/60" />
            Denver toilet service FAQ
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Questions customers ask
            <br />
            before they book.
          </h2>
        </div>

        <div className="grid gap-px bg-foreground/10">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group bg-background p-6 lg:p-8" open={index === 0}>
              <summary className="cursor-pointer list-none text-xl lg:text-2xl font-display flex items-center justify-between gap-6">
                {faq.question}
                <span className="font-mono text-muted-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
