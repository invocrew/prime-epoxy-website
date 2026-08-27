"use client";

import { Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLead } from "@/components/lead-provider";
import {
  CITIES,
  EMAILS,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROJECT_TYPES,
} from "@/lib/site";

export function ContactForm() {
  const { prefill } = useLead();
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
        body: JSON.stringify({ ...data, source: "contact-form" }),
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
            Lead capture
          </p>
          <h2 className="font-display mt-2 text-4xl text-white">
            Contact & Free Estimate
          </h2>
          <p className="mt-3 text-slate-300">
            Tell us about the slab, the system you want, and the square footage.
            We reply with inspection availability for Montreal, Laval, West
            Island, South Shore, Gatineau, and Ottawa.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 text-cyan hover:underline"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAILS.sales}`}
              className="flex items-center gap-2 text-slate-200 hover:text-white"
            >
              <Mail className="h-4 w-4 text-gold" />
              Sales: {EMAILS.sales}
            </a>
            <a
              href={`mailto:${EMAILS.info}`}
              className="flex items-center gap-2 text-slate-200 hover:text-white"
            >
              <Mail className="h-4 w-4 text-gold" />
              Info: {EMAILS.info}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass grid gap-3 rounded-3xl p-6">
          <input
            required
            name="name"
            placeholder="Name"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <input
            required
            name="phone"
            type="tel"
            placeholder="Phone number"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <select
            name="city"
            defaultValue={prefill.city ?? ""}
            key={prefill.city ?? "city"}
            className="rounded-xl border border-white/10 bg-[#0B0F17] px-4 py-3 outline-none focus:border-cyan"
          >
            <option value="">City / Area</option>
            {CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <select
            name="projectType"
            defaultValue={prefill.projectType ?? ""}
            key={prefill.projectType ?? "type"}
            className="rounded-xl border border-white/10 bg-[#0B0F17] px-4 py-3 outline-none focus:border-cyan"
          >
            <option value="">Project type</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            name="sqft"
            type="number"
            min={50}
            placeholder="Estimated sq ft"
            defaultValue={prefill.sqft ?? ""}
            key={prefill.sqft ?? "sqft"}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          <textarea
            name="notes"
            rows={4}
            placeholder="Notes"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
          />
          {status === "error" ? (
            <p className="text-sm text-red-300">
              Could not send. Please call {PHONE_DISPLAY}.
            </p>
          ) : null}
          {status === "sent" ? (
            <p className="text-sm text-cyan">
              Thank you. Your estimate request is in.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-gold py-3.5 font-semibold text-[#0B0F17] glow-gold disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Request Free Estimate"}
          </button>
        </form>
      </div>
    </section>
  );
}
