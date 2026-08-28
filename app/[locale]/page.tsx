import { BeforeAfter } from "@/components/before-after";
import { ContactForm } from "@/components/contact-form";
import { CostCalculator } from "@/components/cost-calculator";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { ServiceAreas } from "@/components/service-areas";
import { Services } from "@/components/services";
import { TrustStrip } from "@/components/trust-strip";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-deep pb-16 md:pb-0">
      <Hero />
      <TrustStrip />
      <Services />
      <CostCalculator />
      <Process />
      <BeforeAfter />
      <ServiceAreas />
      <ContactForm />
      <Faq />
      <Footer />
    </main>
  );
}
