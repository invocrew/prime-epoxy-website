"use client";

import { usePointerDrag } from "@/components/use-pointer-drag";

export function BeforeAfter() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        Transformations
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">
        Before & After Visual Comparison Gallery
      </h2>
      <p className="mt-3 max-w-2xl text-slate-300">
        Drag each slider to reveal dustless diamond-ground concrete versus a
        sealed flake or metallic polyaspartic system.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Comparison title="Full flake garage" afterClass="floor-after-flake" initial={62} />
        <Comparison
          title="Metallic marble showroom"
          afterClass="floor-after-metallic"
          initial={55}
        />
      </div>
    </section>
  );
}

function Comparison({
  title,
  afterClass,
  initial,
}: {
  title: string;
  afterClass: string;
  initial: number;
}) {
  const { value, bind, trackRef } = usePointerDrag(initial);

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div
        ref={trackRef}
        className="relative h-[320px] cursor-ew-resize select-none touch-none sm:h-[380px]"
        {...bind}
      >
        <div className="floor-before absolute inset-0" />
        <div
          className={`${afterClass} absolute inset-y-0 left-0`}
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute inset-y-0 z-10 w-1 bg-white shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          style={{ left: `${value}%` }}
        >
          <div className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-[#0B0F17]">
            ⇆
          </div>
        </div>
        <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs uppercase tracking-wider">
          Before
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-cyan/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0B0F17]">
          After
        </span>
      </div>
      <p className="px-5 py-4 text-sm font-medium text-slate-200">{title}</p>
    </div>
  );
}
