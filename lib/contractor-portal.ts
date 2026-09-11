export const CONTRACTOR_PIN = "7799";
export const CONTRACTOR_AUTH_KEY = "contractor_auth";

export const SQFT_PER_SQM = 10.7639104;

export type Unit = "sqft" | "sqm";
export type SystemId = "flake" | "metallic" | "quartz";
export type PrepId = "good" | "moderate" | "heavy";
export type Sheen = "High Gloss" | "Satin" | "Matte";
export type Mohs = "soft" | "medium" | "hard";
export type TabId = "specs" | "prep" | "labor";
export type AreaMode = "total" | "dimensions";
export type CureId = "standard" | "slow";
export type DiscountMode = "amount" | "percent";
export type SpaceId =
  | "garage"
  | "basement"
  | "living"
  | "commercial"
  | "stairs"
  | "restroom"
  | "exterior";
export type KitExtraKey = "epoxyExtra" | "flakeExtra" | "flowExtra" | "polyExtra";

export type PickLine = {
  id: string;
  label: string;
  subtitle?: string;
  qty: number;
  suggested: number;
  unit: string;
  cost: number;
  extraKey: KitExtraKey | null;
};

export const SYSTEMS: Record<
  SystemId,
  { name: string; shortName: string; rate: number; tag: string; desc: string }
> = {
  flake: {
    name: "Full Flake Decorative System",
    shortName: "Full Flake",
    rate: 6.5,
    tag: "Garage",
    desc: "100% Broadcast",
  },
  metallic: {
    name: "Metallic Marble Epoxy",
    shortName: "Metallic Marble",
    rate: 10,
    tag: "Designer",
    desc: "Marble Flow",
  },
  quartz: {
    name: "Quartz Dual Broadcast",
    shortName: "Quartz",
    rate: 9,
    tag: "Heavy Duty",
    desc: "Dual Sand",
  },
};

export const SPACES: Record<SpaceId, { label: string; ref: string }> = {
  garage: { label: "Garage", ref: "GARAGE" },
  basement: { label: "Basement", ref: "BASEMENT" },
  living: { label: "Living Space / Salon", ref: "LIVING SPACE / SALON" },
  commercial: { label: "Commercial / Retail", ref: "COMMERCIAL / RETAIL" },
  stairs: { label: "Stairs / Steps", ref: "STAIRS / STEPS" },
  restroom: { label: "Restroom / Wet Area", ref: "RESTROOM / WET AREA" },
  exterior: { label: "Exterior / Patio", ref: "EXTERIOR / PATIO" },
};

export const SPACE_ORDER: SpaceId[] = [
  "garage",
  "basement",
  "living",
  "commercial",
  "stairs",
  "restroom",
  "exterior",
];

export const PRESETS = [
  { id: "single", label: "Single Car", sqft: 250 },
  { id: "std", label: "Std 2-Car", sqft: 400 },
  { id: "large", label: "Large 2-Car", sqft: 500 },
] as const;

export const PREP: Record<PrepId, { name: string; fee: number; detail: string }> = {
  good: {
    name: "Good / Standard Prep",
    fee: 0,
    detail: "Standard CSP-2 grind & micro-fill",
  },
  moderate: {
    name: "Moderate Cracks",
    fee: 150,
    detail: "Diamond chase & polyurea weld",
  },
  heavy: {
    name: "Heavy Pitting & Spalling",
    fee: 350,
    detail: "Epoxy mortar patching & scarification",
  },
};

export const MOHS: Record<Mohs, { name: string; tooling: string }> = {
  soft: {
    name: "Mohs 2-3 (Soft)",
    tooling: "Hard Bond 16/30 Grit (High Porosity)",
  },
  medium: {
    name: "Mohs 4-5.5 (Medium)",
    tooling: "Medium Bond 30 Grit (Standard CSP-2)",
  },
  hard: {
    name: "Mohs 6+ (Hard / Burnished)",
    tooling: "Soft Bond Diamonds + Fusion Primer required",
  },
};

export const EPOXY_KIT_SQFT = 400;
export const EPOXY_KIT_PRICE = 275;
export const FLAKE_LB_PER_SQFT = 0.17;
export const FLAKE_BOX_LB = 50;
export const FLAKE_BOX_PRICE = 75;
export const POLY_KIT_SQFT = 450;
export const POLY_KIT_PRICE = 496.8;
export const PIGMENT_COVERAGE = 200;
export const PIGMENT_PRICE = 85;
export const FLOW_COVERAGE = 200;
export const FLOW_PRICE = 275;
export const QUARTZ_LB_PER_SQFT = 0.5;
export const QUARTZ_BAG_LB = 50;
export const QUARTZ_BAG_PRICE = 65;
export const QUARTZ_EPOXY_SQFT = 200;
export const DIAMOND_TOOLING = 75;
export const CONSUMABLES = 75;
export const MVB_RATE = 1.25;
export const COATING_REMOVAL_RATE = 1.75;
export const STEM_RATE = 18;
export const DEFAULT_CREW = 2;
export const DEFAULT_DAYS = 1.5;
export const DEFAULT_DAY_RATE = 450;

export const SYSTEM_LAYERS: Record<
  SystemId,
  { step: string; title: string; detail: string }[]
> = {
  flake: [
    {
      step: "1",
      title: "Base",
      detail: "100% Solids Moisture-Tolerant Epoxy Primer",
    },
    {
      step: "2",
      title: "Aggregate",
      detail: "Industrial Vinyl Flake Blend (0.17 lb/sq ft)",
    },
    {
      step: "3",
      title: "Armor",
      detail: "Non-yellowing Polyaspartic Clear Topcoat (Hot-Tire & Salt Resistant)",
    },
  ],
  metallic: [
    {
      step: "1",
      title: "Base",
      detail: "Black/Tinted Primer Base",
    },
    {
      step: "2",
      title: "Core",
      detail: "High-Build Self-Leveling Epoxy with Metallic Pearl Flow",
    },
    {
      step: "3",
      title: "Armor",
      detail: "Crystal Clear High-Gloss Armor Topcoat",
    },
  ],
  quartz: [
    {
      step: "1",
      title: "Base",
      detail: "100% Solids High-Bond Epoxy",
    },
    {
      step: "2",
      title: "Aggregate",
      detail: "Double Broadcast Colored Quartz Sand",
    },
    {
      step: "3",
      title: "Armor",
      detail: "Chemical-Resistant Clear Polyaspartic Shield",
    },
  ],
};

export const CURES: Record<CureId, { label: string; detail: string }> = {
  standard: {
    label: "Standard Poly (Cool / Spring)",
    detail: "Rapid 24h return-to-service",
  },
  slow: {
    label: "Slow-Cure (Hot / Summer)",
    detail: "Extended pot life for hot slabs",
  },
};

export const FLAKE_BLENDS = [
  "Domino",
  "Nightfall",
  "Creekbed",
  "Glacier",
  "Custom",
] as const;

export function finite(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export function cadSafe(value: number, fallback = 75) {
  return cad.format(finite(value, fallback));
}

export const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export type PortalInputs = {
  unit: Unit;
  area: number;
  system: SystemId;
  rate: number;
  stemLf: number;
  prep: PrepId;
  mvb: boolean;
  coatingRemoval: boolean;
  buffer: boolean;
  antiSlip: boolean;
  sheen: Sheen;
  mohs: Mohs;
  crew: number;
  days: number;
  dayRate: number;
  travel: number;
  cure: CureId;
  discountMode: DiscountMode;
  discountValue: number;
  flakeBlend: string;
  metallicBase: string;
  metallicAccent: string;
  quartzBlend: string;
  epoxyExtra: number;
  flakeExtra: number;
  flowExtra: number;
  polyExtra: number;
  space: SpaceId;
};

export type PortalEstimate = {
  sqFt: number;
  sqM: number;
  effectiveRate: number;
  grossPrice: number;
  discountAmount: number;
  clientPrice: number;
  materials: number;
  labor: number;
  profit: number;
  margin: number;
  epoxyKits: number;
  epoxySuggested: number;
  epoxyCost: number;
  flakeBoxes: number;
  flakeSuggested: number;
  flakeLbs: number;
  flakeCost: number;
  polyKits: number;
  polySuggested: number;
  polyCost: number;
  pigmentJars: number;
  pigmentSuggested: number;
  pigmentCost: number;
  flowKits: number;
  flowSuggested: number;
  flowCost: number;
  quartzBags: number;
  quartzSuggested: number;
  quartzCost: number;
  pickList: PickLine[];
  consumables: number;
  mvbCost: number;
  coatingCost: number;
  stemCost: number;
  prepFee: number;
  manHours: number;
};

export function toSqFt(area: number, unit: Unit) {
  const raw = Number.isFinite(area) ? Math.max(0, area) : 0;
  return unit === "sqm" ? raw * SQFT_PER_SQM : raw;
}

export function toDisplayArea(sqFt: number, unit: Unit) {
  if (unit === "sqm") {
    return Math.round((sqFt / SQFT_PER_SQM) * 10) / 10;
  }
  return Math.round(sqFt);
}

export function calculatePortal(input: PortalInputs): PortalEstimate {
  const measured = toSqFt(finite(input.area), input.unit);
  const kitArea = measured * (input.buffer ? 1.1 : 1);
  const sqFt = measured;
  const sqM = sqFt / SQFT_PER_SQM;
  const system = input.system;

  const epoxyCoverage = system === "quartz" ? QUARTZ_EPOXY_SQFT : EPOXY_KIT_SQFT;
  const epoxySuggested = kitArea > 0 ? Math.ceil(kitArea / epoxyCoverage) : 0;
  const epoxyKits = Math.max(0, epoxySuggested + finite(input.epoxyExtra));
  const epoxyCost = epoxyKits * EPOXY_KIT_PRICE;

  let flakeLbs = 0;
  let flakeSuggested = 0;
  let flakeBoxes = 0;
  let flakeCost = 0;
  let pigmentSuggested = 0;
  let pigmentJars = 0;
  let pigmentCost = 0;
  let flowSuggested = 0;
  let flowKits = 0;
  let flowCost = 0;
  let quartzSuggested = 0;
  let quartzBags = 0;
  let quartzCost = 0;

  if (system === "flake") {
    flakeLbs = kitArea * FLAKE_LB_PER_SQFT;
    flakeSuggested = kitArea > 0 ? Math.ceil(flakeLbs / FLAKE_BOX_LB) : 0;
    flakeBoxes = Math.max(0, flakeSuggested + finite(input.flakeExtra));
    flakeCost = flakeBoxes * FLAKE_BOX_PRICE;
  }

  if (system === "metallic") {
    pigmentSuggested = kitArea > 0 ? Math.ceil(kitArea / PIGMENT_COVERAGE) : 0;
    pigmentJars = Math.max(0, pigmentSuggested + finite(input.flakeExtra));
    pigmentCost = pigmentJars * PIGMENT_PRICE;
    flowSuggested = kitArea > 0 ? Math.ceil(kitArea / FLOW_COVERAGE) : 0;
    flowKits = Math.max(0, flowSuggested + finite(input.flowExtra));
    flowCost = flowKits * FLOW_PRICE;
  }

  if (system === "quartz") {
    quartzSuggested = kitArea > 0 ? Math.ceil((kitArea * QUARTZ_LB_PER_SQFT) / QUARTZ_BAG_LB) : 0;
    quartzBags = Math.max(0, quartzSuggested + finite(input.flakeExtra));
    quartzCost = quartzBags * QUARTZ_BAG_PRICE;
  }

  const polySuggested = kitArea > 0 ? Math.ceil(kitArea / POLY_KIT_SQFT) : 0;
  const polyKits = Math.max(0, polySuggested + finite(input.polyExtra));
  const polyCost = polyKits * POLY_KIT_PRICE;
  const consumables = kitArea > 0 ? finite(CONSUMABLES, 75) || 75 : 0;
  const materials =
    epoxyCost + flakeCost + pigmentCost + flowCost + quartzCost + polyCost + consumables;

  const mvbCost = input.mvb ? sqFt * MVB_RATE : 0;
  const coatingCost = input.coatingRemoval ? sqFt * COATING_REMOVAL_RATE : 0;
  const stemCost = Math.max(0, finite(input.stemLf)) * STEM_RATE;
  const prepFee = PREP[input.prep].fee;
  const effectiveRate = finite(input.rate) + (input.mvb ? MVB_RATE : 0);
  const grossPrice = sqFt * effectiveRate + stemCost + prepFee + coatingCost;
  const rawDiscount = Math.max(0, finite(input.discountValue));
  const discountAmount = Math.min(
    grossPrice,
    input.discountMode === "percent"
      ? grossPrice * (Math.min(rawDiscount, 100) / 100)
      : rawDiscount,
  );
  const clientPrice = Math.max(0, grossPrice - discountAmount);

  const labor =
    Math.max(0, finite(input.crew)) *
      Math.max(0, finite(input.days)) *
      Math.max(0, finite(input.dayRate)) +
    Math.max(0, finite(input.travel));
  const profit = clientPrice - materials - labor;
  const margin = clientPrice > 0 ? (profit / clientPrice) * 100 : 0;
  const manHours = Math.max(0, finite(input.crew)) * Math.max(0, finite(input.days)) * 8;

  const pickList: PickLine[] = [
    {
      id: "epoxy",
      label:
        system === "quartz"
          ? "Double-broadcast epoxy base · 3-gal kit (~200 sq ft)"
          : system === "metallic"
            ? "Tinted primer base · 3-gal kit (~400 sq ft)"
            : "Epoxy base · 3-gal kit (~400 sq ft)",
      qty: epoxyKits,
      suggested: epoxySuggested,
      unit: "kits",
      cost: epoxyCost,
      extraKey: "epoxyExtra",
    },
  ];

  if (system === "flake") {
    pickList.push({
      id: "flakes",
      label: "Vinyl flakes · 50 lb",
      subtitle: "100% Broadcast to Rejection (Commercial Grade Flake)",
      qty: flakeBoxes,
      suggested: flakeSuggested,
      unit: "boxes",
      cost: flakeCost,
      extraKey: "flakeExtra",
    });
  }

  if (system === "metallic") {
    pickList.push(
      {
        id: "pigment",
        label: "Metallic pigment pods",
        subtitle: "1 jar per ~200 sq ft",
        qty: pigmentJars,
        suggested: pigmentSuggested,
        unit: "jars",
        cost: pigmentCost,
        extraKey: "flakeExtra",
      },
      {
        id: "flow",
        label: "Clear high-gloss flow coat",
        subtitle: "3-gal kit covers ~200 sq ft",
        qty: flowKits,
        suggested: flowSuggested,
        unit: "kits",
        cost: flowCost,
        extraKey: "flowExtra",
      },
    );
  }

  if (system === "quartz") {
    pickList.push({
      id: "quartz",
      label: "Colored quartz aggregate · 50 lb",
      subtitle: "Double broadcast @ 0.50 lb/sq ft",
      qty: quartzBags,
      suggested: quartzSuggested,
      unit: "bags",
      cost: quartzCost,
      extraKey: "flakeExtra",
    });
  }

  pickList.push({
    id: "poly",
    label:
      system === "metallic"
        ? "Rockhard T2000 / polyaspartic clear · 3-gal kit (~450 sq ft)"
        : "Polyaspartic topcoat · 3-gal kit (~450 sq ft)",
    qty: polyKits,
    suggested: polySuggested,
    unit: "kits",
    cost: polyCost,
    extraKey: "polyExtra",
  });

  pickList.push({
    id: "consumables",
    label: "Consumables & tooling",
    qty: 1,
    suggested: 1,
    unit: "allowance",
    cost: consumables,
    extraKey: null,
  });

  return {
    sqFt,
    sqM,
    effectiveRate,
    grossPrice,
    discountAmount,
    clientPrice,
    materials,
    labor,
    profit,
    margin,
    epoxyKits,
    epoxySuggested,
    epoxyCost,
    flakeBoxes,
    flakeSuggested,
    flakeLbs,
    flakeCost,
    polyKits,
    polySuggested,
    polyCost,
    pigmentJars,
    pigmentSuggested,
    pigmentCost,
    flowKits,
    flowSuggested,
    flowCost,
    quartzBags,
    quartzSuggested,
    quartzCost,
    pickList,
    consumables,
    mvbCost,
    coatingCost,
    stemCost,
    prepFee,
    manHours,
  };
}

export function projectRef(space: SpaceId, system: SystemId) {
  const systemRef =
    system === "metallic"
      ? "LUXURY METALLIC COATING"
      : system === "quartz"
        ? "COMMERCIAL QUARTZ COATING"
        : "FULL FLAKE COATING";
  return `${SPACES[space].ref} ${systemRef}`;
}

export function scopeOfWork(system: SystemId) {
  if (system === "metallic") {
    return `1. MECHANICAL PREPARATION:
   • Dustless diamond grinding (CSP-2 profile) to open concrete pores.
   • Joint & crack routing with structural polyurea mender.
2. BASE COAT:
   • Black/tinted high-bond primer base.
3. METALLIC FLOW CORE:
   • High-build self-leveling epoxy with metallic pearl flow.
4. PROTECTIVE ARMOR TOPCOAT:
   • Crystal-clear high-gloss Rockhard T2000 / polyaspartic armor (hot-tire, salt, gas & oil resistant).`;
  }
  if (system === "quartz") {
    return `1. MECHANICAL PREPARATION:
   • Dustless diamond grinding (CSP-2 profile) to open concrete pores.
   • Joint & crack routing with structural polyurea mender.
2. BASE COAT:
   • 100% solids high-bond epoxy receiver coat (double broadcast system).
3. AGGREGATE LAYER:
   • Double broadcast colored quartz sand to complete rejection.
4. PROTECTIVE ARMOR TOPCOAT:
   • Chemical-resistant clear polyaspartic shield (hot-tire, salt, gas & oil resistant).`;
  }
  return `1. MECHANICAL PREPARATION:
   • Dustless diamond grinding (CSP-2 profile) to open concrete pores.
   • Joint & crack routing with structural polyurea mender.
2. BASE COAT:
   • 100% Solids high-performance epoxy base coat.
3. BROADCAST LAYER:
   • 100% Full broadcast vinyl flakes to complete rejection.
4. PROTECTIVE ARMOR TOPCOAT:
   • High-solids, UV-stable clear Polyaspartic topcoat (Resistant to hot-tire pickup, road salt, gas, and oil).`;
}

export function styleSpec(input: PortalInputs) {
  if (input.system === "metallic") {
    return `Primary Base Color: ${input.metallicBase || "TBD"} · Accent Vein Color: ${input.metallicAccent || "TBD"}`;
  }
  if (input.system === "quartz") {
    return `Quartz Blend Code: ${input.quartzBlend || "TBD"}`;
  }
  return `Flake Blend / Color: ${input.flakeBlend || "TBD"}`;
}

export function clientQuoteText(input: PortalInputs, est: PortalEstimate) {
  const sys = SYSTEMS[input.system];
  const sqFt = Math.round(est.sqFt).toLocaleString("en-CA");
  const sqM = finite(est.sqM).toFixed(1);
  const original = finite(est.grossPrice).toFixed(2);
  const discount = finite(est.discountAmount).toFixed(2);
  const clientTotal = finite(est.clientPrice).toFixed(2);
  const discountLine =
    est.discountAmount > 0.004
      ? `Original Price: $${original} CAD
Discount: −$${discount} CAD${input.discountMode === "percent" ? ` (${finite(input.discountValue)}% off)` : ""}
TOTAL INVESTMENT: $${clientTotal} CAD`
      : `TOTAL INVESTMENT: $${clientTotal} CAD`;
  return `========================================
PRIME EPOXY FLOORING // OFFICIAL ESTIMATE
========================================
Project Ref: ${projectRef(input.space, input.system)}
Surface Area: ${sqFt} sq ft (${sqM} m²)
Selected System: ${sys.name} (Commercial Grade)
Project Space: ${SPACES[input.space].label}
Color / Blend: ${styleSpec(input)}
----------------------------------------
SCOPE OF WORK & APPLICATION:
${scopeOfWork(input.system)}

WARRANTY & ASSURANCE:
• 10-Year Limited Adhesion & Delamination Warranty.
• Industrial-grade formulation engineered for Canadian freeze/thaw cycles.

----------------------------------------
${discountLine}
(Applicable taxes TPS/TVQ calculated at invoice)
----------------------------------------
Valid for 30 days. To approve and lock in your installation date, reply directly to this estimate.
========================================`;
}

export function jobSheetText(input: PortalInputs, est: PortalEstimate) {
  const sys = SYSTEMS[input.system];
  return `================================================
INTERNAL INSTALLATION JOB SHEET
Prime Epoxy Flooring | Crew Dispatch
================================================
Project Size: ${Math.round(est.sqFt).toLocaleString()} sq ft (${finite(est.sqM).toFixed(1)} m²)
Project Space: ${SPACES[input.space].label}
System: ${sys.name}
Color / Blend to load: ${styleSpec(input)}
Polyaspartic Cure: ${CURES[input.cure].label}
Mohs Test: ${MOHS[input.mohs].name}
Tooling recommendation: ${MOHS[input.mohs].tooling}
Repair Condition: ${PREP[input.prep].name}

KITS TO LOAD (ADJUSTED):
${est.pickList.map((line) => `• ${line.label}: ${line.qty} ${line.unit} (${cadSafe(line.cost, 0)})`).join("\n")}
• Material total: ${cadSafe(est.materials, 0)}

CREW & PAYROLL:
• Crew Size: ${input.crew} technicians
• Duration: ${input.days} days (${est.manHours} man-hours)
• Day rate: ${cadSafe(input.dayRate, 0)} / tech
• Travel / overhead: ${cadSafe(input.travel, 0)}
• Labor expense: ${cadSafe(est.labor, 0)}

JOB FINANCIALS:
• Gross estimate: ${cadSafe(est.grossPrice, 0)}
• Discount: ${cadSafe(est.discountAmount, 0)}
• Final client price: ${cadSafe(est.clientPrice, 0)}
• Materials cost: ${cadSafe(est.materials, 0)}
• Labor expense: ${cadSafe(est.labor, 0)}
• CONTRACTOR NET TAKE-HOME: ${cadSafe(est.profit, 0)} (${finite(est.margin).toFixed(1)}% margin)`;
}

export function supplierPoText(input: PortalInputs, est: PortalEstimate) {
  const sys = SYSTEMS[input.system];
  return `================================================
SUPPLIER PURCHASE ORDER
Prime Epoxy Flooring | Montreal Facility
================================================
System: ${sys.name}
Project Space: ${SPACES[input.space].label}
Coverage: ${Math.round(est.sqFt)} sq ft${input.buffer ? " (+10% safety buffer)" : ""}
Finish: ${input.sheen}${input.antiSlip ? " + anti-slip grit" : ""}
• Color / Blend: ${styleSpec(input)}
Polyaspartic Cure: ${CURES[input.cure].label}

STAGED MATERIAL REQUISITION:
${est.pickList.map((line) => `• ${line.label}: ${line.qty} ${line.unit} = ${cadSafe(line.cost, 0)}`).join("\n")}
${input.mvb ? "• Moisture vapor barrier primer required (ASTM F2170)\n" : ""}${input.coatingRemoval ? "• PCD diamond scraping segments required for coating removal\n" : ""}
Please confirm staging and pickup window.`;
}
