import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqJsonLd } from "@/components/json-ld";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteShell } from "@/components/site-shell";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES, SITE_URL, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const t = getDictionary(locale);
  const canonical = locale === "fr" ? `${SITE_URL}/fr` : SITE_URL;
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords.split(",").map((keyword) => keyword.trim()),
    alternates: {
      canonical,
      languages: {
        en: SITE_URL,
        fr: `${SITE_URL}/fr`,
        "en-CA": SITE_URL,
        "fr-CA": `${SITE_URL}/fr`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: canonical,
      siteName: "Prime Epoxy Flooring",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"],
      type: "website",
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
          alt: "Prime Epoxy Flooring Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dictionary = getDictionary(locale as Locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <FaqJsonLd locale={locale as Locale} />
      <SiteShell>{children}</SiteShell>
    </LocaleProvider>
  );
}
