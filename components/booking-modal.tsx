"use client";

import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useLead } from "@/components/lead-provider";
import { CITIES, PHONE_DISPLAY, PHONE_TEL, PROJECT_TYPES } from "@/lib/site";

export function BookingModal() {
  const { bookingOpen, closeBooking, prefill } = useLead();
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "booking-modal" }),
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
            <h2 className="font-display text-3xl text-white">
              Free On-Site Inspection
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Lock in a precise quote. Or call{" "}
              <a href={PHONE_TEL} className="text-cyan underline">
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10"
            aria-label="Close booking form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "sent" ? (
          <p className="rounded-2xl bg-cyan/10 p-4 text-cyan">
            Request received. We will confirm your inspection window shortly.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3">
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
              defaultValue={prefill.sqft ?? ""}
              placeholder="Estimated sq ft"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan"
            />
            <textarea
              name="notes"
              rows={3}
              defaultValue={prefill.notes ?? ""}
              placeholder="Notes"
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
              <p className="text-sm text-red-300">
                Could not send. Call {PHONE_DISPLAY} or email us directly.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-gold py-3 font-semibold text-[#0B0F17] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request Inspection"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
