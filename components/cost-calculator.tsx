"use client";

import { Calculator, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { useLead } from "@/components/lead-provider";
import {
  COVE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SIZE_PRESETS,
  SYSTEMS,
  type SizePresetId,
  type SystemId,
} from "@/lib/site";

function formatCad(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CostCalculator() {
  const { openBooking } = useLead();
  const [sizeId, setSizeId] = useState<SizePresetId>("2-car");
  const [customSqft, setCustomSqft] = useState(400);
  const [systemId, setSystemId] = useState<SystemId>("flake");
  const [coveFt, setCoveFt] = useState(0);

  const preset = SIZE_PRESETS.find((item) => item.id === sizeId)!;
  const sqft = sizeId === "custom" ? customSqft : preset.sqft;
  const system = SYSTEMS.find((item) => item.id === systemId)!;
  const isBasementFlake = sizeId === "basement" && systemId === "flake";

  const estimate = useMemo(() => {
    const lowRate = isBasementFlake ? 13 : system.low;
    const highRate = isBasementFlake ? 15 : system.high;
    const avgRate = isBasementFlake ? 14 : system.avg;
    const floorLow = sqft * lowRate;
    const floorHigh = sqft * highRate;
    const floorAvg = sqft * avgRate;
    const coveLow = coveFt * COVE.low;
    const coveHigh = coveFt * COVE.high;
    const coveAvg = coveFt * COVE.avg;
    return {
      low: Math.round(floorLow + coveLow),
      high: Math.round(floorHigh + coveHigh),
      avg: Math.round(floorAvg + coveAvg),
      rateLabel: isBasementFlake
        ? "~$13–$15 / sq ft (basement prep)"
        : `~$${system.low}–$${system.high} / sq ft`,
    };
  }, [coveFt, isBasementFlake, sqft, system]);

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          Instant pricing
        </p>
        <h2 className="font-display mt-2 text-4xl text-white">
          Interactive Instant Cost Calculator
        </h2>
        <p className="mt-3 text-slate-300">
          Real-time CAD ranges based on typical garage sizes, broadcast systems,
          and optional cove base. Final pricing is confirmed after a free on-site
          inspection.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
            1. Floor size
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {SIZE_PRESETS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSizeId(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  sizeId === item.id
                    ? "border-cyan bg-cyan/15 text-white glow-cyan"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                }`}
              >
                <span className="block font-medium">{item.label}</span>
                <span className="text-xs text-slate-400">
                  {item.id === "custom" ? "Use the slider" : `~${item.sqft} sq ft`}
                </span>
              </button>
            ))}
          </div>

          {sizeId === "custom" ? (
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm text-slate-300">
                <span>Custom square footage</span>
                <span className="font-semibold text-white">{customSqft} sq ft</span>
              </div>
              <input
                type="range"
                min={150}
                max={2500}
                step={10}
                value={customSqft}
                onChange={(event) => setCustomSqft(Number(event.target.value))}
                className="w-full"
                aria-label="Custom square footage"
              />
            </div>
          ) : null}

          <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-200">
            2. System
          </h3>
          <div className="grid gap-2">
            {SYSTEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSystemId(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  systemId === item.id
                    ? "border-gold bg-gold/10 text-white glow-gold"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gold">
                    ${item.avg}/sq ft avg
                  </span>
                </span>
              </button>
            ))}
          </div>

          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-200">
            3. Add-on: cove base
          </h3>
          <div className="mb-2 flex justify-between text-sm text-slate-300">
            <span>${COVE.avg.toFixed(2)} / linear ft</span>
            <span className="font-semibold text-white">{coveFt} lf</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            step={1}
            value={coveFt}
            onChange={(event) => setCoveFt(Number(event.target.value))}
            className="w-full"
            aria-label="Cove base linear feet"
          />
        </div>

        <div className="glass flex flex-col justify-between rounded-3xl p-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan">
              <Calculator className="h-3.5 w-3.5" />
              Live estimate
            </div>
            <p className="text-slate-400">Estimated range</p>
            <p className="font-display mt-1 text-5xl text-white">
              {formatCad(estimate.low)} – {formatCad(estimate.high)}
            </p>
            <p className="mt-2 text-sm text-gold">Typical mid: {formatCad(estimate.avg)}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>
                {sqft} sq ft · {system.name}
              </li>
              <li>{estimate.rateLabel}</li>
              {coveFt > 0 ? (
                <li>
                  Cove base: {coveFt} lf at ${COVE.low}–${COVE.high} / lf
                </li>
              ) : (
                <li>Cove base not included</li>
              )}
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                openBooking({
                  sqft,
                  system: system.name,
                  estimateLow: estimate.low,
                  estimateHigh: estimate.high,
                  projectType: system.name,
                  notes: `Calculator estimate ${formatCad(estimate.low)}–${formatCad(estimate.high)} CAD for ${sqft} sq ft ${system.name}${coveFt ? `, ${coveFt} lf cove base` : ""}.`,
                })
              }
              className="rounded-full bg-gold px-5 py-3.5 font-semibold text-[#0B0F17] glow-gold transition hover:brightness-110"
            >
              Book Free On-Site Inspection
            </button>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan/40 px-5 py-3 font-semibold text-cyan"
            >
              <Phone className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
