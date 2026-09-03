"use client";

import { FormSuccess } from "@/components/form-success";
import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useLead } from "@/components/lead-provider";
import { useI18n } from "@/components/locale-provider";
import {
  CITIES,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROJECT_TYPE_IDS,
  SPACES,
  SYSTEMS,
} from "@/lib/site";
import { submitLead } from "@/lib/submit-lead";

export function BookingModal() {
  const { bookingOpen, closeBooking, prefill } = useLead();
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    if (!bookingOpen) {
      setStatus("idle");
      return;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeBooking();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookingOpen, closeBooking]);

  if (!bookingOpen) {
    return null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      await submitLead(data);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4"
      onClick={closeBooking}
    >
      <div
        className="glass max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-white">{t.booking.title}</h2>
            <p className="mt-1 text-sm text-slate-300">
              {t.booking.body}{" "}
              <a href={PHONE_TEL} data-track="phone-call" className="text-cyan underline">
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10"
            aria-label={t.booking.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "sent" ? (
          <FormSuccess message={t.booking.sent} />
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3">
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
              defaultValue={prefill.sqft ?? ""}
              placeholder={t.contact.sqft}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
            />
            <textarea
              name="notes"
              rows={3}
              defaultValue={prefill.notes ?? ""}
              placeholder={t.contact.notes}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
            />
            {prefill.estimateLow && prefill.estimateHigh ? (
              <input
                type="hidden"
                name="estimate"
                value={`${prefill.estimateLow}-${prefill.estimateHigh}`}
              />
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-red-300">{t.contact.error}</p>
            ) : null}
            <button
              type="submit"
              id="btn-quote-submit"
              data-track="quote-submit"
              disabled={status === "sending"}
              className="rounded-full bg-gold py-3 font-semibold text-[#0B0F17] disabled:opacity-60"
            >
              {status === "sending" ? t.contact.sending : t.booking.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
