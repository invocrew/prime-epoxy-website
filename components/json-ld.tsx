import {
  COMPANY,
  EMAILS,
  GOOGLE_MAPS_URL,
  PHONE_E164,
  SCHEMA_AREAS,
  SCHEMA_OFFERS,
  SCHEMA_SERVICE_TYPES,
  SITE_URL,
  SOCIAL,
  type Locale,
} from "@/lib/site";
import { getDictionary } from "@/lib/i18n";

export function BusinessJsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: COMPANY,
    url: SITE_URL,
    telephone: PHONE_E164,
    email: EMAILS.sales,
    priceRange: "$$",
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    hasMap: GOOGLE_MAPS_URL,
    areaServed: SCHEMA_AREAS.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    serviceType: [...SCHEMA_SERVICE_TYPES],
    makesOffer: SCHEMA_OFFERS.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montreal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: [SOCIAL.tiktok, SOCIAL.facebook, SOCIAL.instagram, GOOGLE_MAPS_URL],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
    />
  );
}

export function FaqJsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}
