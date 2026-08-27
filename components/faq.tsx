"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does epoxy and polyaspartic flooring take to cure?",
    a: "Most Prime Epoxy Flooring systems are installed in 1–2 days. Polyaspartic topcoats typically allow light foot traffic the same evening and vehicle return the next day, depending on temperature, humidity, and film thickness. We confirm exact return-to-service during your on-site inspection.",
  },
  {
    q: "Will the floor survive Quebec and Ottawa winter salt?",
    a: "Yes. Our commercial-grade 100% solids resins and polyaspartic lock coats are specified for freeze-thaw, de-icing salts, hot-tire pickup, and garage chemicals. Mechanical diamond grinding is what makes that resistance last — not a thin peel-and-stick coating.",
  },
  {
    q: "What does the multi-year warranty cover?",
    a: "Installations include a multi-year adhesion and delamination warranty when we control surface preparation: dustless diamond grinding, moisture evaluation, crack repair, and manufacturer-aligned film builds. Cosmetic wear from abuse, standing water, or unapproved chemicals is reviewed case by case.",
  },
  {
    q: "Do you moisture-test the concrete before coating?",
    a: "Yes. Slabs that outgas or hold residual moisture can cause bubbles and delamination. We assess moisture and porosity before specifying flake, quartz, or metallic systems, and we will not coat a slab that cannot accept a commercial resin system.",
  },
  {
    q: "Can you coat basements as well as garages?",
    a: "Basements are a core system. Full flake with additional mechanical prep typically prices around $13–$15 / sq ft because of moisture, patching, and access. Garages using the same flake system generally fall around $7–$9 / sq ft.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        FAQ
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">
        Answers before you book
      </h2>
      <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
        {faqs.map((item, index) => {
          const active = open === index;
          return (
            <div key={item.q} className="bg-white/5">
              <button
                type="button"
                onClick={() => setOpen(active ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={active}
              >
                <span className="font-medium text-white">{item.q}</span>
                <span className="text-cyan">{active ? "–" : "+"}</span>
              </button>
              {active ? (
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-300">
                  {item.a}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
