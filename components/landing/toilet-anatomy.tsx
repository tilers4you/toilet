"use client";

/**
 * "Know your toilet" anatomy section.
 * Renders the tank-cutaway GLB; clicking a part in the legend spins the model
 * to face that part (via the faceYaw prop) and highlights the row.
 *
 * Tune the `yaw` values once against your actual cutaway model orientation.
 */
import { useState } from "react";
import { ServiceModel } from "./service-model";

type Part = {
  n: number;
  name: string;
  desc: string;
  fix: "diy" | "pro";
  fixText: string;
  yaw: number;
};

const PARTS: Part[] = [
  { n: 1, name: "Fill valve", desc: "Refills the tank after each flush", fix: "diy", fixText: "DIY $130–150", yaw: -0.2 },
  { n: 2, name: "Flapper", desc: "Seals the flush valve; #1 cause of running", fix: "diy", fixText: "DIY $90–130", yaw: 0.5 },
  { n: 3, name: "Overflow tube", desc: "Stops the tank from overfilling", fix: "diy", fixText: "DIY", yaw: 1.1 },
  { n: 4, name: "Supply line & shutoff", desc: "Feeds water; your emergency off-valve", fix: "diy", fixText: "DIY", yaw: -0.9 },
  { n: 5, name: "Bowl & trap", desc: "Where weak flushes & clogs show up", fix: "pro", fixText: "Pro", yaw: 2.0 },
  { n: 6, name: "Wax ring & flange", desc: "Seals the base; fails = water on floor", fix: "pro", fixText: "Pro $150–230", yaw: -1.7 },
];

export function ToiletAnatomy() {
  const [activeN, setActiveN] = useState<number | null>(null);
  const active = PARTS.find((p) => p.n === activeN);

  return (
    <section id="anatomy" className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-primary font-semibold">
          <span className="w-6 h-px bg-accent" />
          Know your toilet
        </span>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-display leading-tight">
          The six parts behind<br />almost every problem.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Drag the cutaway to look around, then tap a part to spin to it and see whether it's a quick
          DIY swap or a call for a pro.
        </p>

        <div className="mt-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div className="relative min-h-[420px] rounded-2xl border border-border overflow-hidden bg-gradient-to-b from-background to-muted">
            <ServiceModel
              url="/models/toilet-tank-cutaway.glb"
              label="Toilet tank cutaway"
              targetSize={2.5}
              fit="max"
              centerY
              interactive
              faceYaw={active?.yaw}
              cameraZ={4.4}
              cameraY={0}
              className="h-full w-full absolute inset-0"
            />
            <span className="absolute bottom-3.5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-background/70 border border-border px-3 py-1.5 rounded-full pointer-events-none">
              Cutaway · drag to rotate
            </span>
          </div>

          <div className="grid gap-2.5">
            {PARTS.map((p) => (
              <button
                key={p.n}
                onClick={() => setActiveN(p.n)}
                className={`grid grid-cols-[auto_1fr_auto] gap-3.5 items-center rounded-xl border p-3.5 text-left transition ${
                  activeN === p.n ? "border-primary bg-primary/5" : "border-border hover:border-primary hover:bg-primary/5"
                }`}
              >
                <span className={`grid h-7 w-7 place-items-center rounded-lg font-mono text-xs font-semibold text-white ${activeN === p.n ? "bg-primary" : "bg-foreground"}`}>
                  {p.n}
                </span>
                <span>
                  <b className="text-sm">{p.name}</b>
                  <small className="block text-muted-foreground text-xs">{p.desc}</small>
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-md ${p.fix === "diy" ? "bg-accent/15 text-accent-foreground" : "bg-primary/10 text-primary"}`}>
                  {p.fixText}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
