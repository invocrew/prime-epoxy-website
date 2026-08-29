"use client";

import { Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { FormSuccess } from "@/components/form-success";
import { useLead } from "@/components/lead-provider";
import { useI18n } from "@/components/locale-provider";
import {
  CITIES,
  EMAILS,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROJECT_TYPE_IDS,
  SPACES,
  SYSTEMS,
} from "@/lib/site";

export function ContactForm() {
  const { prefill } = useLead();
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact-form", locale }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            {t.contact.kicker}
          </p>
          <h2 className="font-display mt-2 text-4xl text-white">{t.contact.h2}</h2>
          <p className="mt-3 text-slate-300">{t.contact.intro}</p>
          <div className="mt-6 space-y-3 text-sm">
            <a href={PHONE_TEL} className="flex items-center gap-2 text-cyan hover:underline">
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAILS.sales}`}
              className="flex items-center gap-2 text-slate-200 hover:text-white"
            >
              <Mail className="h-4 w-4 text-gold" />
              {EMAILS.sales}
            </a>
            <a
              href={`mailto:${EMAILS.info}`}
              className="flex items-center gap-2 text-slate-200 hover:text-white"
            >
              <Mail className="h-4 w-4 text-gold" />
              {EMAILS.info}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass grid gap-3 rounded-3xl p-6">
          <input
            required
            name="name"
            placeholder={t.contact.name}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <input
            required
            name="phone"
            type="tel"
            placeholder={t.contact.phone}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <input
            required
            name="email"
            type="email"
            placeholder={t.contact.email}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <select
            name="city"
            defaultValue={prefill.city ?? ""}
            key={prefill.city ?? "city"}
            className="rounded-xl border border-white/10 bg-[#0B0F17] px-4 py-3 outline-none focus:border-cyan"
          >
            <option value="">{t.contact.city}</option>
            {CITIES.map((city) => {
              const name = locale === "fr" ? city.nameFr : city.nameEn;
              return (
                <option key={city.id} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <select
            name="spaceType"
            defaultValue={prefill.spaceType ?? ""}
            key={prefill.spaceType ?? "space"}
            className="rounded-xl border border-white/10 bg-[#0B0F17] px-4 py-3 outline-none focus:border-cyan"
          >
            <option value="">{t.contact.spaceType}</option>
            {SPACES.map((space) => (
              <option key={space.id} value={t.calculator.spaces[space.id]}>
                {t.calculator.spaces[space.id]}
              </option>
            ))}
          </select>
          <select
            name="system"
            defaultValue={prefill.system ?? ""}
            key={prefill.system ?? "system"}
            className="rounded-xl border border-white/10 bg-[#0B0F17] px-4 py-3 outline-none focus:border-cyan"
          >
            <option value="">{t.contact.system}</option>
            {SYSTEMS.map((system) => (
              <option key={system.id} value={t.calculator.systems[system.id]}>
                {t.calculator.systems[system.id]}
              </option>
            ))}
          </select>
          <select
            name="projectType"
            defaultValue={prefill.projectType ?? ""}
            key={prefill.projectType ?? "type"}
            className="rounded-xl border border-white/10 bg-[#0B0F17] px-4 py-3 outline-none focus:border-cyan"
          >
            <option value="">{t.contact.project}</option>
            {PROJECT_TYPE_IDS.map((id) => (
              <option key={id} value={t.projectTypes[id]}>
                {t.projectTypes[id]}
              </option>
            ))}
          </select>
          <input
            name="sqft"
            type="number"
            min={50}
            placeholder={t.contact.sqft}
            defaultValue={prefill.sqft ?? ""}
            key={prefill.sqft ?? "sqft"}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <textarea
            name="notes"
            rows={4}
            placeholder={t.contact.notes}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          {status === "error" ? (
            <p className="text-sm text-red-300">{t.contact.error}</p>
          ) : null}
          {status === "sent" ? <FormSuccess message={t.contact.sent} /> : null}
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-gold py-3.5 font-semibold text-[#0B0F17] glow-gold disabled:opacity-60"
          >
            {status === "sending" ? t.contact.sending : t.contact.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
