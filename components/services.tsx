import { CheckCircle2, Sparkles } from "lucide-react";

const services = [
  {
    title: "Full Flake Broadcast System",
    subtitle: "Garages & Basements",
    price: "~$7–$9 / sq ft · Basements with prep ~$13–$15 / sq ft",
    steps: [
      "Mechanical diamond grinding",
      "100% solids pigmented epoxy base",
      "Full vinyl flake broadcast to refusal",
      "Scrape & vacuum",
      "High-durability clear polyaspartic seal coat",
    ],
  },
  {
    title: "Commercial Quartz System",
    subtitle: "Ultra-durable, sanitary, non-slip",
    price: "~$9–$11 / sq ft",
    steps: [
      "Single & double broadcast heavy-duty aggregate",
      "Polyaspartic grout & topcoat",
      "Industrial wear, sanitation, and traction performance",
    ],
  },
  {
    title: "Luxury 3D Metallic & Marble Epoxy",
    subtitle: "Artistic showpiece floors",
    price: "~$17–$21 / sq ft",
    steps: [
      "Multi-tone artistic metallic pigments",
      "Custom veins",
      "Deep glass reflection with polyaspartic protection",
    ],
  },
  {
    title: "Custom Countertops & Tables",
    subtitle: "Seamless furniture-grade resin",
    price: "Starting from $3,500 CAD",
    steps: [
      "Seamless waterfall edges",
      "Scratch and heat-resistant mirror finishes",
      "Bespoke colorways and metallic movement",
    ],
  },
  {
    title: "Cove Base & Stem Walls",
    subtitle: "Sanitary vertical protection",
    price: "$20–$25 / linear ft",
    steps: [
      "Seamless sanitary vertical curves",
      "Wall protection for wash-down and commercial spaces",
      "Fully integrated with floor broadcast systems",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        Accurate systems
      </p>
      <h2 className="font-display mt-2 text-4xl text-white">
        Commercial-grade epoxy & polyaspartic systems
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="glass rounded-3xl p-6">
            <Sparkles className="h-5 w-5 text-gold" />
            <h3 className="mt-3 text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{service.subtitle}</p>
            <p className="mt-3 text-sm font-semibold text-cyan">{service.price}</p>
            <ul className="mt-4 space-y-2">
              {service.steps.map((step) => (
                <li key={step} className="flex gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                  {step}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
