import type { Metadata } from "next";
import { LegalChrome } from "@/components/legal-chrome";
import { COMPANY, EMAILS, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prime Epoxy Flooring collects and uses contact information for quotes and site visits, in compliance with Quebec Law 25 and PIPEDA.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalChrome>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          Legal
        </p>
        <h1 className="font-display mt-2 text-4xl text-white">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-400">Last updated: September 2, 2026</p>
        <div className="mt-8 space-y-6 text-slate-300 leading-relaxed">
          <p>
            {COMPANY} (“we”, “us”) is a flooring contractor serving Greater Montreal,
            Laval, the West Island, and the South Shore. This policy explains how we
            handle personal information in line with Quebec’s Act respecting the
            protection of personal information in the private sector (Law 25) and
            Canada’s Personal Information Protection and Electronic Documents Act
            (PIPEDA).
          </p>
          <h2 className="font-display text-2xl text-white">Information we collect</h2>
          <p>
            When you request a free estimate, book an on-site inspection, or use our
            contact forms, we may collect your name, email address, phone number,
            city or project address, project type, estimated square footage, and any
            notes you choose to share.
          </p>
          <h2 className="font-display text-2xl text-white">How we use it</h2>
          <p>
            Client contact information submitted through our free estimate and
            inspection forms is used solely to prepare service quotes, schedule site
            visits, assess concrete conditions, and communicate with you about your
            project. We do not use this information for unrelated marketing lists.
          </p>
          <h2 className="font-display text-2xl text-white">Sharing</h2>
          <p>
            We do not sell personal information. We do not share it with unauthorized
            third parties. Limited processors (for example, email delivery tools used
            to receive form submissions) may handle data only as needed to complete
            your quote request, under confidentiality obligations.
          </p>
          <h2 className="font-display text-2xl text-white">Retention and rights</h2>
          <p>
            We keep quote-related records only as long as needed to complete the
            project, honour warranties, or meet legal accounting requirements. You
            may request access, correction, or deletion of your personal information,
            or withdraw consent for future contact, by reaching us at the details
            below. Quebec residents may also contact the Commission d’accès à
            l’information du Québec.
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
