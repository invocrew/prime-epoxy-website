"use client";

import { MapPin } from "lucide-react";
import { useLead } from "@/components/lead-provider";
import { CITIES } from "@/lib/site";

export function ServiceAreas() {
  const { setCity, openBooking, prefill } = useLead();

  return (
    <section id="areas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        Coverage
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">
        Service Area & Cities Coverage
      </h2>
      <p className="mt-3 max-w-2xl text-slate-300">
        Select your city to pre-fill your inspection request. We serve Quebec and
        Eastern Ontario with commercial-grade garage and metallic systems.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((city) => {
          const active = prefill.city === city.name;
          return (
            <button
              key={city.name}
              type="button"
              onClick={() => {
                setCity(city.name);
                openBooking({ city: city.name });
              }}
              className={`glass flex items-center justify-between rounded-2xl px-5 py-4 text-left transition ${
                active ? "glow-cyan border-cyan/50" : "hover:border-white/25"
              }`}
            >
              <span>
                <span className="block font-semibold text-white">{city.name}</span>
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  {city.region}
                </span>
              </span>
              <MapPin className="h-5 w-5 text-gold" />
            </button>
          );
        })}
      </div>
      <p className="mt-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300">
        Google Maps Profile — Coming Soon
      </p>
    </section>
  );
}
