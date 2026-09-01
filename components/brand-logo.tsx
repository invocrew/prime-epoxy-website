"use client";

import { useState } from "react";
import { COMPANY, LOGO_ALT, LOGO_PATH } from "@/lib/site";

export function BrandLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-display text-lg font-semibold tracking-wide text-white">
        {COMPANY}
      </span>
    );
  }

  return (
    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950/90 ring-1 ring-cyan/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_PATH}
        alt={LOGO_ALT}
        width={64}
        height={64}
        decoding="async"
        className="h-[4.75rem] w-[4.75rem] object-cover object-center [mix-blend-mode:multiply]"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
