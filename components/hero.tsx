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
import { useI18n } from "@/components/locale-provider";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const badgeIcons = [Award, ShieldCheck, CheckCircle2, Sparkles];

export function Hero() {
  const { openBooking } = useLead();
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
            {t.hero.kicker}
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {t.hero.h1}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">{t.hero.sub}</p>
          <p className="mt-4 max-w-xl text-base text-slate-400">{t.hero.coverage}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={PHONE_TEL}
              id="btn-call-hero"
              data-track="phone-call"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-base font-semibold text-[#0B0F17] glow-cyan transition hover:brightness-110"
            >
              <Phone className="h-5 w-5" />
              {t.hero.call}
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3.5 text-base font-semibold text-gold glow-gold transition hover:bg-gold/20"
            >
              <Calculator className="h-5 w-5" />
              {t.hero.calculator}
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.hero.badges.map((label, index) => {
              const Icon = badgeIcons[index] ?? Sparkles;
              return (
                <div key={label} className="glass rounded-2xl px-3 py-4 text-center">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-gold" />
                  <p className="text-xs font-medium leading-snug text-slate-200">{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <div className="floor-after-metallic absolute inset-0 opacity-50" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan">
              {t.hero.featuredKicker}
            </p>
            <p className="font-display mt-2 text-3xl text-white">{t.hero.featuredTitle}</p>
            <p className="mt-3 text-slate-300">{t.hero.featuredBody}</p>
            <button
              type="button"
              onClick={() => openBooking({ projectType: t.projectTypes.metallic })}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0F17] transition hover:bg-slate-100"
            >
              {t.hero.featuredCta}
            </button>
            <div className="relative mt-5 h-48 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-56">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/flooring/after-metallic.jpg"
                alt="Luxury metallic marble epoxy flooring with high-gloss glass reflection"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-3 bottom-3 rounded-full border border-white/20 bg-[#0B0F17]/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                Luxury Marble Finish • High Gloss
              </span>
            </div>
            <span className="sr-only">{PHONE_DISPLAY}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
