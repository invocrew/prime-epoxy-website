"use client";

import { Award, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/locale-provider";

export function TrustStrip() {
  const { t } = useI18n();

  return (
    <section className="border-y border-white/10 bg-[#1E293B]/40">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {t.trust.map((badge, index) => (
          <div key={badge} className="glass flex gap-3 rounded-2xl p-4">
            {index === 0 ? (
              <Award className="h-5 w-5 shrink-0 text-gold" />
            ) : (
              <ShieldCheck className="h-5 w-5 shrink-0 text-cyan" />
            )}
            <p className="text-sm leading-snug text-slate-200">{badge}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
