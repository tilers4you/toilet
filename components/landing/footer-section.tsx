"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Services: [
    { name: "Toilet replacement", href: "#features" },
    { name: "Toilet installation", href: "#features" },
    { name: "Toilet repair", href: "#features" },
    { name: "Running toilet repair", href: "#diy" },
  ],
  "Service Area": [
    { name: "Denver, CO", href: "#service-area" },
    { name: "Lakewood", href: "#service-area" },
    { name: "Aurora", href: "#service-area" },
    { name: "Arvada", href: "#service-area" },
  ],
  Resources: [
    { name: "DIY checks", href: "#diy" },
    { name: "Cost factors", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Repair vs replace", href: "#how-it-works" },
  ],
  Company: [
    { name: "License verification", href: "#" },
    { name: "Reviews", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy", href: "#" },
  ],
};

const socialLinks = [
  { name: "Google Business Profile", href: "#" },
  { name: "Yelp", href: "#" },
  { name: "Nextdoor", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display">Denver Toilet Pros</span>
                <span className="text-xs text-primary font-mono">CO</span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Toilet installation, replacement, and repair for Denver homes,
                rentals, and property managers. Replace placeholder phone, license,
                and review links before launch.
              </p>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-8">
                <span>Phone: (720) 555-0198</span>
                <span>Colorado plumbing license: pending</span>
                <span>Service-area business: Denver, CO</span>
              </div>

              <div className="flex flex-wrap gap-5">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">2026 Denver Toilet Pros. All rights reserved.</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Denver toilet repair, replacement, and installation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
