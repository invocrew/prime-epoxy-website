import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SEO_KEYWORDS, SITE_URL } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prime Epoxy Flooring | Top Garage & Metallic Epoxy Montreal & Laval",
    template: "%s | Prime Epoxy Flooring",
  },
  description:
    "Professional epoxy flooring, garage flake systems & luxury metallic epoxy coatings in Montreal, Laval & West Island. Commercial grade resins & polyaspartics. Free quote.",
  keywords: [...SEO_KEYWORDS],
  applicationName: "Prime Epoxy Flooring",
  authors: [{ name: "Prime Epoxy Flooring" }],
  creator: "Prime Epoxy Flooring",
  publisher: "Prime Epoxy Flooring",
  category: "home and construction",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Prime Epoxy Flooring",
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    url: SITE_URL,
    title: "Prime Epoxy Flooring | Top Garage & Metallic Epoxy Montreal & Laval",
    description:
      "Professional epoxy flooring, garage flake systems & luxury metallic epoxy coatings in Montreal, Laval & West Island. Commercial grade resins & polyaspartics. Free quote.",
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
    title: "Prime Epoxy Flooring | Top Garage & Metallic Epoxy Montreal & Laval",
    description:
      "Professional epoxy flooring, garage flake systems & luxury metallic epoxy coatings in Montreal, Laval & West Island. Free quote.",
    images: [`${SITE_URL}/logo.png`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-CA": SITE_URL,
      "fr-CA": `${SITE_URL}/fr`,
      "x-default": SITE_URL,
    },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const localeHeader = (await headers()).get("x-locale");
  const lang = localeHeader === "fr" ? "fr-CA" : "en-CA";

  return (
    <html
      lang={lang}
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-deep text-foreground">{children}</body>
    </html>
  );
}
