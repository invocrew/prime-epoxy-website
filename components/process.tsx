"use client";

import { ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/locale-provider";

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-gold" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            {t.process.kicker}
          </p>
          <h2 className="font-display text-4xl text-white">{t.process.h2}</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {t.process.steps.map((step, index) => (
          <article key={step.title} className="glass rounded-3xl p-6">
            <p className="font-display text-3xl text-gold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-slate-300">{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
