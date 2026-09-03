import { getDictionary } from "@/lib/i18n";
import { Footer } from "@/components/footer";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteShell } from "@/components/site-shell";
import type { ReactNode } from "react";

export function LegalChrome({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider locale="en" dictionary={getDictionary("en")}>
      <SiteShell>
        <main className="flex flex-1 flex-col bg-deep pb-16 md:pb-0">
          {children}
          <Footer />
        </main>
      </SiteShell>
    </LocaleProvider>
  );
}
