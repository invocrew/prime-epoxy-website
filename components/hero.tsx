"use client";

import {
  Award,
  Calculator,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLead } from "@/components/lead-provider";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const badges = [
  { icon: Award, label: "XPS Certified" },
  { icon: ShieldCheck, label: "Multi-Year Warranty" },
  { icon: CheckCircle2, label: "1–2 Day Installation" },
  { icon: Sparkles, label: "100% Solid Solids" },
];

export function Hero() {
  const { openBooking } = useLead();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="floor-after-metallic absolute inset-x-0 bottom-0 h-1/2 opacity-30" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
            Luxury Industrial Flooring
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Quebec & Eastern Ontario&apos;s Premier Garage & Metallic Epoxy
            Flooring Specialists
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Dustless diamond grinding, 100% solids commercial resins, and
            polyaspartic topcoats — installed in 1–2 days with a multi-year
            adhesion & delamination warranty.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-base font-semibold text-[#0B0F17] glow-cyan transition hover:brightness-110"
            >
              <Phone className="h-5 w-5" />
              Call {PHONE_DISPLAY}
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3.5 text-base font-semibold text-gold glow-gold transition hover:bg-gold/20"
            >
              <Calculator className="h-5 w-5" />
              Instant Price Calculator
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="glass rounded-2xl px-3 py-4 text-center"
              >
                <badge.icon className="mx-auto mb-2 h-5 w-5 text-gold" />
                <p className="text-xs font-medium leading-snug text-slate-200">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <div className="floor-after-metallic absolute inset-0 opacity-50" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan">
              Featured Finish
            </p>
            <h2 className="font-display mt-2 text-3xl text-white">
              Deep-glass metallic marble
            </h2>
            <p className="mt-3 text-slate-300">
              Multi-tone artistic pigments, custom veins, and a high-durability
              polyaspartic seal — showroom floors for garages, basements, and
              commercial spaces.
            </p>
            <button
              type="button"
              onClick={() => openBooking({ projectType: "Luxury 3D Metallic & Marble" })}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0F17] transition hover:bg-slate-100"
            >
              Book a Free On-Site Inspection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
