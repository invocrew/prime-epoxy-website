import { ShieldCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Diamond Grinding (Mechanical Profiling)",
    body: "Dustless diamond grinding opens the concrete, removes contaminants, and creates a mechanical profile so industrial resins lock into the slab — not just sit on top of it.",
  },
  {
    n: "02",
    title: "Crack & Joint Industrial Repair",
    body: "Control joints, spalls, and structural cracks are filled with commercial repair compounds so the broadcast system reads as one seamless, high-build surface.",
  },
  {
    n: "03",
    title: "Commercial Basecoat & Broadcast",
    body: "100% solids pigmented epoxy is rolled, then vinyl flake or quartz aggregate is broadcast to refusal for full hide, texture, and long-term wear.",
  },
  {
    n: "04",
    title: "Polyaspartic Clear Topcoat Seal",
    body: "A high-durability clear polyaspartic lock coat seals the system, delivering UV stability, chemical resistance, and 1–2 day return-to-service.",
  },
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-gold" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            Preparation that lasts
          </p>
          <h2 className="font-display text-4xl text-white">
            4-Step Professional Preparation Process
          </h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <article key={step.n} className="glass rounded-3xl p-6">
            <p className="font-display text-3xl text-gold">{step.n}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-slate-300">{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
