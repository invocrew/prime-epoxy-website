"use client";

import { MapPin } from "lucide-react";
import { useLead } from "@/components/lead-provider";
import { useI18n } from "@/components/locale-provider";
import { CITIES } from "@/lib/site";

export function ServiceAreas() {
  const { setCity, openBooking, prefill } = useLead();
  const { locale, t } = useI18n();

  return (
    <section id="areas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        {t.areas.kicker}
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">{t.areas.h2}</h2>
      <p className="mt-3 max-w-2xl text-slate-300">{t.areas.intro}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((city) => {
          const name = locale === "fr" ? city.nameFr : city.nameEn;
          const region = locale === "fr" ? city.regionFr : city.regionEn;
          const active = prefill.city === name;
          return (
            <button
              key={city.id}
              type="button"
              onClick={() => {
                setCity(name);
                openBooking({ city: name });
              }}
              className={`glass flex items-center justify-between rounded-2xl px-5 py-4 text-left transition ${
                active ? "glow-cyan border-cyan/50" : "hover:border-white/25"
              }`}
            >
              <span>
                <span className="block font-semibold text-white">{name}</span>
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  {region}
                </span>
              </span>
              <MapPin className="h-5 w-5 text-gold" />
            </button>
          );
        })}
      </div>
      <p className="mt-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300">
        {t.areas.maps}
      </p>
    </section>
  );
}
