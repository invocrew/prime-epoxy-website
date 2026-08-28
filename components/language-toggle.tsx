"use client";

import Link from "next/link";
import { useI18n } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale } = useI18n();

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      <Link
        href={localePath("en")}
        hrefLang="en-CA"
        className={`rounded-full px-2.5 py-1 ${
          locale === "en" ? "bg-cyan text-[#0B0F17]" : "text-slate-300"
        }`}
      >
        EN
      </Link>
      <Link
        href={localePath("fr")}
        hrefLang="fr-CA"
        className={`rounded-full px-2.5 py-1 ${
          locale === "fr" ? "bg-cyan text-[#0B0F17]" : "text-slate-300"
        }`}
      >
        FR
      </Link>
    </div>
  );
}
