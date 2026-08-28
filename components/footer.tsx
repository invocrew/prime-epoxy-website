"use client";

import { Award, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { useI18n } from "@/components/locale-provider";
import {
  COMPANY,
  EMAILS,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIAL,
} from "@/lib/site";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v3.1c-1.6 0-3.1-.5-4.4-1.4v6.4c0 3.6-2.8 6.2-6.3 6.2S2 19.4 2 15.8c0-3.5 2.8-6.2 6.3-6.2.5 0 1 .1 1.5.2v3.3c-.5-.3-1-.4-1.5-.4-1.8 0-3.2 1.4-3.2 3.1s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2V3h3z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6L16 12h-3V10c0-.6.4-1 1-1z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 7.1a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9z"
      />
    </svg>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10 bg-[#070a10]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#top" className="inline-flex h-16 items-center">
            <BrandLogo />
          </a>
          <p className="mt-3 max-w-md text-sm text-slate-400">{t.footer.blurb}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white hover:border-cyan hover:text-cyan"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white hover:border-cyan hover:text-cyan"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white hover:border-cyan hover:text-cyan"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t.footer.contact}
          </p>
          <a href={PHONE_TEL} className="mt-3 flex items-center gap-2 text-cyan">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${EMAILS.sales}`}
            className="mt-2 flex items-center gap-2 text-sm text-slate-300"
          >
            <Mail className="h-4 w-4" />
            {EMAILS.sales}
          </a>
          <a
            href={`mailto:${EMAILS.info}`}
            className="mt-2 flex items-center gap-2 text-sm text-slate-300"
          >
            <Mail className="h-4 w-4" />
            {EMAILS.info}
          </a>
          <p className="mt-3 flex items-start gap-2 text-sm text-slate-400">
            <MapPin className="mt-0.5 h-4 w-4 text-gold" />
            Montréal, Laval, West Island, Brossard, Longueuil, Pointe-Claire
          </p>
          <p className="mt-3 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
            {t.footer.maps}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t.footer.explore}
          </p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {t.nav[link.key]}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-6 sm:px-6">
          {t.trust.map((badge, index) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs text-gold"
            >
              {index === 0 ? (
                <Award className="h-3.5 w-3.5" />
              ) : (
                <ShieldCheck className="h-3.5 w-3.5" />
              )}
              {badge}
            </span>
          ))}
        </div>
        <p className="px-4 pb-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {COMPANY}. {t.footer.legal}
        </p>
      </div>
    </footer>
  );
}
