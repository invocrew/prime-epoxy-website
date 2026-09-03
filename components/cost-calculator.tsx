"use client";

import { Calculator, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { useLead } from "@/components/lead-provider";
import { useI18n } from "@/components/locale-provider";
import {
  COVE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SPACES,
  SYSTEMS,
  type SpaceCategory,
  type SpaceId,
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
  const { locale, t } = useI18n();
  const [category, setCategory] = useState<SpaceCategory>("residential");
  const [spaceId, setSpaceId] = useState<SpaceId>("2-car");
  const [customSqft, setCustomSqft] = useState(800);
  const [systemId, setSystemId] = useState<SystemId>("flake");
  const [coveFt, setCoveFt] = useState(0);

  const space = SPACES.find((item) => item.id === spaceId)!;
  const sqft = spaceId === "custom" ? customSqft : space.sqft;
  const system = SYSTEMS.find((item) => item.id === systemId)!;
  const isBasementFlake = space.basementPrep && systemId === "flake";
  const visibleSpaces = SPACES.filter((item) => item.category === category);

  const estimate = useMemo(() => {
    const lowRate = isBasementFlake ? 13 : system.low;
    const highRate = isBasementFlake ? 15 : system.high;
    const avgRate = isBasementFlake ? 14 : system.avg;
    return {
      low: Math.round(sqft * lowRate + coveFt * COVE.low),
      high: Math.round(sqft * highRate + coveFt * COVE.high),
      avg: Math.round(sqft * avgRate + coveFt * COVE.avg),
      rateLabel: isBasementFlake
        ? t.calculator.basementRate
        : `~$${system.low}–$${system.high} / sq ft`,
    };
  }, [coveFt, isBasementFlake, sqft, system, t.calculator.basementRate]);

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            {t.calculator.kicker}
          </p>
          <h2 className="font-display mt-2 text-4xl text-white">{t.calculator.h2}</h2>
          <p className="mt-3 text-slate-300">{t.calculator.intro}</p>
        </div>
        <p className="rounded-full border border-gold/50 bg-gold px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-[#0B0F17] glow-gold">
          {t.calculator.requiredBadge}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
            {t.calculator.size}
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {(["residential", "commercial", "custom"] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setCategory(id);
                  const first = SPACES.find((item) => item.category === id);
                  if (first) {
                    setSpaceId(first.id);
                  }
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  category === id
                    ? "bg-cyan text-[#0B0F17]"
                    : "border border-white/10 text-slate-300"
                }`}
              >
                {t.calculator.categories[id]}
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {visibleSpaces.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSpaceId(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  spaceId === item.id
                    ? "border-cyan bg-cyan/15 text-white glow-cyan"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                }`}
              >
                <span className="block font-medium">{t.calculator.spaces[item.id]}</span>
              </button>
            ))}
          </div>

          {spaceId === "custom" ? (
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm text-slate-300">
                <span>{t.calculator.customLabel}</span>
                <span className="font-semibold text-white">
                  {customSqft.toLocaleString()} sq ft
                </span>
              </div>
              <p className="mb-2 text-xs text-slate-400">{t.calculator.customHint}</p>
              <input
                type="range"
                min={150}
                max={12000}
                step={50}
                value={customSqft}
                onChange={(event) => setCustomSqft(Number(event.target.value))}
                className="w-full"
                aria-label={t.calculator.customLabel}
              />
            </div>
          ) : null}

          <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-200">
            {t.calculator.system}
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
                  <span className="font-medium">{t.calculator.systems[item.id]}</span>
                  <span className="text-sm text-gold">${item.avg}/sq ft avg</span>
                </span>
              </button>
            ))}
          </div>

          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-slate-200">
            {t.calculator.cove}
          </h3>
          <div className="mb-2 flex justify-between text-sm text-slate-300">
            <span>${COVE.avg.toFixed(2)} / lf</span>
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
            aria-label={t.calculator.cove}
          />
        </div>

        <div className="glass flex flex-col justify-between rounded-3xl p-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan">
              <Calculator className="h-3.5 w-3.5" />
              {t.calculator.live}
            </div>
            <p className="text-slate-400">{t.calculator.range}</p>
            <p className="font-display mt-1 text-4xl text-white sm:text-5xl">
              {formatCad(estimate.low)} – {formatCad(estimate.high)}
            </p>
            <p className="mt-2 text-sm text-gold">
              {t.calculator.typical}: {formatCad(estimate.avg)}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>
                {sqft.toLocaleString()} sq ft · {t.calculator.spaces[spaceId]} ·{" "}
                {t.calculator.systems[systemId]}
              </li>
              <li>{estimate.rateLabel}</li>
              {coveFt > 0 ? (
                <li>
                  {t.calculator.coveLine}: {coveFt} lf at ${COVE.low}–${COVE.high} / lf
                </li>
              ) : (
                <li>{t.calculator.coveNone}</li>
              )}
            </ul>
            <p className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-relaxed text-slate-200">
              {t.calculator.disclaimer}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                openBooking({
                  sqft,
                  system: t.calculator.systems[systemId],
                  spaceType: t.calculator.spaces[spaceId],
                  estimateLow: estimate.low,
                  estimateHigh: estimate.high,
                  projectType: t.calculator.systems[systemId],
                  notes: `Calculator ${locale.toUpperCase()} ${formatCad(estimate.low)}–${formatCad(estimate.high)} · ${sqft} sq ft · ${t.calculator.spaces[spaceId]} · ${t.calculator.systems[systemId]}${coveFt ? ` · ${coveFt} lf cove` : ""}.`,
                })
              }
              className="rounded-full bg-gold px-5 py-3.5 font-semibold text-[#0B0F17] glow-gold transition hover:brightness-110"
            >
              {t.calculator.book}
            </button>
            <a
              href={PHONE_TEL}
              data-track="phone-call"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan/40 px-5 py-3 font-semibold text-cyan"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
