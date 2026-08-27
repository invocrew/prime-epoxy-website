import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
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
  title: "Prime Epoxy Flooring | Garage & Metallic Epoxy Specialists",
  description:
    "Quebec & Eastern Ontario's premier garage and metallic epoxy flooring specialists. XPS certified, 100% solids resins, polyaspartic topcoats, and a multi-year adhesion warranty. Call 438-815-8815.",
  metadataBase: new URL("https://primeepoxyflooring.ca"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-deep text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
