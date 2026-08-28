"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { useI18n } from "@/components/locale-provider";

export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        {t.services.kicker}
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">{t.services.h2}</h2>
      <p className="mt-3 max-w-3xl text-slate-300">{t.services.intro}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {t.services.items.map((service) => (
          <article key={service.title} className="glass rounded-3xl p-6">
            <Sparkles className="h-5 w-5 text-gold" />
            <h3 className="mt-3 text-xl font-semibold text-white">{service.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{service.subtitle}</p>
            <p className="mt-3 text-sm font-semibold text-cyan">{service.price}</p>
            <ul className="mt-4 space-y-2">
              {service.steps.map((step) => (
                <li key={step} className="flex gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                  {step}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
