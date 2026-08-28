import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
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
