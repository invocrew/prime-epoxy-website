import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Portal",
  description: "Private Prime Epoxy Flooring contractor estimation engine.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
