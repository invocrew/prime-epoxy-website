import {
  COMPANY,
  EMAILS,
  PHONE_DISPLAY,
  SCHEMA_AREAS,
  SITE_URL,
  type Locale,
} from "@/lib/site";
import { getDictionary } from "@/lib/i18n";

export function JsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pageUrl = locale === "fr" ? `${SITE_URL}/fr` : SITE_URL;

  const business = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    name: COMPANY,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    url: pageUrl,
    email: EMAILS.sales,
    telephone: PHONE_DISPLAY,
    priceRange: "$$–$$$",
    areaServed: SCHEMA_AREAS.map((name) => ({
      "@type": "City",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montreal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: [
      "https://tiktok.com/@primeepoxyflooring.ca",
      "https://www.facebook.com/share/14tEoi1eDbs/",
      "https://www.instagram.com/primeepoxyflooring.ca",
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
