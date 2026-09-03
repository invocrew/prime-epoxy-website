import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
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
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2826500894396319');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2826500894396319&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <FaqJsonLd locale={locale as Locale} />
      <SiteShell>{children}</SiteShell>
    </LocaleProvider>
  );
}
