"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useLead } from "@/components/lead-provider";
import { useI18n } from "@/components/locale-provider";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const { openBooking } = useLead();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F17]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="/" className="flex h-16 shrink-0 items-center">
          <BrandLogo />
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <a
            href={PHONE_TEL}
            id="btn-call-header"
            data-track="phone-call"
            className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan glow-cyan transition hover:bg-cyan/20"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={() => openBooking()}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-[#0B0F17] glow-gold transition hover:brightness-110"
          >
            {t.header.estimate}
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t.header.closeMenu : t.header.openMenu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0B0F17] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-200"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <LanguageToggle />
            <a
              href={PHONE_TEL}
              data-track="phone-call"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-4 py-3 font-semibold text-[#0B0F17]"
            >
              <Phone className="h-4 w-4" />
              {t.header.call} {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="rounded-full bg-gold px-4 py-3 font-semibold text-[#0B0F17]"
            >
              {t.header.estimate}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
