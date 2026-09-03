"use client";

import { BookingModal } from "@/components/booking-modal";
import { ConversionTracker } from "@/components/conversion-tracker";
import { Header } from "@/components/header";
import { LeadProvider } from "@/components/lead-provider";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LeadProvider>
      <ConversionTracker />
      <Header />
      {children}
      <BookingModal />
      <a
        href={PHONE_TEL}
        data-track="phone-call"
        className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-3 text-sm font-semibold text-[#0B0F17] glow-cyan md:hidden"
      >
        <Phone className="h-4 w-4" />
        {PHONE_DISPLAY}
      </a>
    </LeadProvider>
  );
}
