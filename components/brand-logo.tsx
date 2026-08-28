"use client";

import Image from "next/image";
import { useState } from "react";
import { COMPANY, LOGO_ALT, LOGO_PATH } from "@/lib/site";

export function BrandLogo({
  priority = false,
  className = "h-16 w-auto object-contain",
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
    <Image
      src={LOGO_PATH}
      alt={LOGO_ALT}
      width={256}
      height={256}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
