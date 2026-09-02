"use client";

import { usePointerDrag } from "@/components/use-pointer-drag";
import { useI18n } from "@/components/locale-provider";

const FLAKE_BEFORE = "/images/flooring/after-garage.jpg";
const FLAKE_AFTER = "/images/flooring/before-garage.jpg";
const METALLIC_BEFORE = "/images/flooring/after-metallic.jpg";
const METALLIC_AFTER = "/images/flooring/before-metallic.jpg";

export function BeforeAfter() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        {t.gallery.kicker}
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">{t.gallery.h2}</h2>
      <p className="mt-3 max-w-2xl text-slate-300">{t.gallery.intro}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Comparison
          title={t.gallery.flakeTitle}
          beforeSrc={FLAKE_BEFORE}
          afterSrc={FLAKE_AFTER}
          beforeAlt={t.gallery.flakeBeforeAlt}
          afterAlt={t.gallery.flakeAlt}
          beforeLabel={t.gallery.before}
          afterLabel={t.gallery.after}
          initial={58}
        />
        <Comparison
          title={t.gallery.metallicTitle}
          beforeSrc={METALLIC_BEFORE}
          afterSrc={METALLIC_AFTER}
          beforeAlt={t.gallery.metallicBeforeAlt}
          afterAlt={t.gallery.metallicAlt}
          beforeLabel={t.gallery.before}
          afterLabel={t.gallery.after}
          initial={52}
        />
      </div>
    </section>
  );
}

function Comparison({
  title,
  beforeSrc,
  afterSrc,
  afterAlt,
  beforeAlt,
  beforeLabel,
  afterLabel,
  initial,
}: {
  title: string;
  beforeSrc: string;
  afterSrc: string;
  afterAlt: string;
  beforeAlt: string;
  beforeLabel: string;
  afterLabel: string;
  initial: number;
}) {
  const { value, bind, trackRef } = usePointerDrag(initial);

  return (
    <figure className="glass overflow-hidden rounded-3xl">
      <div
        ref={trackRef}
        className="relative h-[320px] cursor-ew-resize select-none touch-none sm:h-[400px]"
        {...bind}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterSrc}
            alt={afterAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-y-0 z-10 w-1 bg-white shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          style={{ left: `${value}%` }}
        >
          <div className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-[#0B0F17]">
            ⇆
          </div>
        </div>
        <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs uppercase tracking-wider">
          {beforeLabel}
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-cyan/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0B0F17]">
          {afterLabel}
        </span>
      </div>
      <figcaption className="px-5 py-4 text-sm font-medium leading-snug text-slate-200">
        {title}
      </figcaption>
    </figure>
  );
}
