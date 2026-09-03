import type { Metadata } from "next";
import { LegalChrome } from "@/components/legal-chrome";
import { COMPANY, EMAILS, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Estimate, inspection, scheduling, and warranty terms for Prime Epoxy Flooring installations in Quebec and Eastern Ontario.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <LegalChrome>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          Legal
        </p>
        <h1 className="font-display mt-2 text-4xl text-white">Terms of Service</h1>
        <p className="mt-3 text-sm text-slate-400">Last updated: September 2, 2026</p>
        <div className="mt-8 space-y-6 text-slate-300 leading-relaxed">
          <p>
            These terms apply to quotes, site inspections, and installation work
            performed by {COMPANY}. By requesting a quote or booking an inspection,
            you agree to the following contractor conditions.
          </p>
          <h2 className="font-display text-2xl text-white">Estimates</h2>
          <p>
            Online calculator figures and written ranges are budgeting guides only.
            They are not a fixed contract price. Final pricing is confirmed after a
            free on-site inspection that assesses concrete condition, moisture,
            cracks, access, and diamond-grind requirements.
          </p>
          <h2 className="font-display text-2xl text-white">Site inspection</h2>
          <p>
            You agree to provide safe access to the slab, disclose known moisture
            issues, and keep vehicles and stored items clear of the work area as
            directed. We may decline to coat a slab that cannot accept a commercial
            resin system.
          </p>
          <h2 className="font-display text-2xl text-white">Scheduling</h2>
          <p>
            Installation dates depend on weather, slab temperature, humidity, and
            crew availability. We will confirm a window in writing. You are
            responsible for removing vehicles and belongings before the scheduled
            start time.
          </p>
          <h2 className="font-display text-2xl text-white">Warranty</h2>
          <p>
            Installations include a multi-year adhesion and delamination warranty
            when we control surface preparation, including dustless diamond grinding,
            moisture evaluation, and manufacturer-aligned film builds. Coverage is
            subject to surface evaluation at inspection. Cosmetic wear, abuse,
            standing water, unapproved chemicals, or work performed by others are
            excluded unless agreed in writing.
          </p>
          <h2 className="font-display text-2xl text-white">Contact</h2>
          <p>
            {COMPANY}
            <br />
            Phone:{" "}
            <a
              className="text-cyan hover:underline"
              href={PHONE_TEL}
              data-track="phone-call"
            >
              {PHONE_DISPLAY}
            </a>
            <br />
            Email:{" "}
            <a className="text-cyan hover:underline" href={`mailto:${EMAILS.sales}`}>
              {EMAILS.sales}
            </a>
          </p>
        </div>
      </article>
    </LegalChrome>
  );
}
