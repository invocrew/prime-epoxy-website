"use client";

import { useState } from "react";
import { useI18n } from "@/components/locale-provider";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        {t.faq.kicker}
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">{t.faq.h2}</h2>
      <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10">
        {t.faq.items.map((item, index) => {
          const active = open === index;
          return (
            <div key={item.q} className="bg-white/5">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={active}
                >
                  <span className="font-medium text-white">{item.q}</span>
                  <span className="text-cyan">{active ? "–" : "+"}</span>
                </button>
              </h3>
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
