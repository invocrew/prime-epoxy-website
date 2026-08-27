export const COMPANY = "Prime Epoxy Flooring";

export const PHONE_DISPLAY = "438-815-8815";
export const PHONE_TEL = "tel:+14388158815";

export const EMAILS = {
  sales: "Sales@PrimeEpoxyFlooring.ca",
  info: "info@primeEpoxyFlooring.ca",
} as const;

export const SOCIAL = {
  tiktok: "https://tiktok.com/@primeepoxyflooring.ca",
  facebook: "https://www.facebook.com/share/14tEoi1eDbs/",
  instagram:
    "https://www.instagram.com/primeepoxyflooring.ca?igsi=ODZxaHN4YTFlMzNy",
} as const;

export const CITIES = [
  { name: "Montreal", region: "Quebec" },
  { name: "Laval", region: "Quebec" },
  { name: "West Island", region: "Quebec" },
  { name: "South Shore", region: "Quebec" },
  { name: "Gatineau QC", region: "Quebec" },
  { name: "Ottawa ON", region: "Ontario" },
] as const;

export const TRUST_BADGES = [
  "Certified Professional Epoxy Installer (XPS Express Trained)",
  "100% Commercial-Grade Industrial Resins & Polyaspartics",
  "Multi-Year Adhesion & Delamination Warranty",
  "Dustless Diamond Grinding Mechanical Preparation",
] as const;

export const NAV_LINKS = [
  { href: "#services", label: "Systems" },
  { href: "#calculator", label: "Pricing" },
  { href: "#process", label: "Process" },
  { href: "#gallery", label: "Gallery" },
  { href: "#areas", label: "Service Areas" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const SIZE_PRESETS = [
  { id: "1-car", label: "1-Car Garage", sqft: 250 },
  { id: "2-car", label: "2-Car Garage", sqft: 450 },
  { id: "3-car", label: "3-Car Garage", sqft: 650 },
  { id: "basement", label: "Basement", sqft: 800 },
  { id: "custom", label: "Custom Sq Ft", sqft: 400 },
] as const;

export type SizePresetId = (typeof SIZE_PRESETS)[number]["id"];

export const SYSTEMS = [
  {
    id: "flake",
    name: "Full Flake Broadcast",
    avg: 8,
    low: 7,
    high: 9,
    basementLow: 13,
    basementHigh: 15,
    basementAvg: 14,
  },
  {
    id: "quartz",
    name: "Commercial Quartz",
    avg: 10,
    low: 9,
    high: 11,
  },
  {
    id: "metallic",
    name: "Metallic Marble",
    avg: 19,
    low: 17,
    high: 21,
  },
] as const;

export type SystemId = (typeof SYSTEMS)[number]["id"];

export const COVE = {
  low: 20,
  high: 25,
  avg: 22.5,
} as const;

export const PROJECT_TYPES = [
  "Full Flake Broadcast (Garage / Basement)",
  "Commercial Quartz System",
  "Luxury 3D Metallic & Marble",
  "Custom Countertops & Tables",
  "Cove Base & Stem Walls",
  "Not sure — need a recommendation",
] as const;
