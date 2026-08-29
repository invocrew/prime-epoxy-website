"use client";

import Image from "next/image";
import { useState } from "react";
import { COMPANY, LOGO_ALT, LOGO_PATH } from "@/lib/site";

export function BrandLogo({
  priority = false,
  className = "h-14 w-auto object-contain mix-blend-multiply",
}: {
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-display text-lg font-semibold tracking-wide text-white">
        {COMPANY}
      </span>
    );
  }

  return (
    <span className="inline-flex h-16 items-center justify-center rounded-xl border border-white/10 bg-[#0B0F17] px-2.5 py-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
      <Image
        src={LOGO_PATH}
        alt={LOGO_ALT}
        width={256}
        height={256}
        priority={priority}
        className={className}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
