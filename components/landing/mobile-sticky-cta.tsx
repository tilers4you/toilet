"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useLead } from "@/components/lead/lead-provider";

/**
 * Mobile-only sticky action bar pinned to the bottom of the viewport.
 * Appears once the user scrolls past the hero so it doesn't duplicate the
 * hero/nav CTAs at the top. Hidden on md+ (desktop nav already has the CTA).
 */
export function MobileStickyCta() {
  const { open } = useLead();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 bg-background/90 backdrop-blur-xl border-t border-foreground/10 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <Button
          asChild
          variant="outline"
          className="rounded-full h-12 px-4 shrink-0"
        >
          <a href="tel:+17207173990" aria-label="Call (720) 717-3990">
            <Phone className="h-5 w-5" />
          </a>
        </Button>
        <Button
          onClick={() => open("Mobile sticky bar — Request service")}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-base"
        >
          Request service
        </Button>
      </div>
    </div>
  );
}
