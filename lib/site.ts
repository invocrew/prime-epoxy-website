export const SITE_URL = "https://primeepoxyflooring.ca";
export const COMPANY = "Prime Epoxy Flooring";
export const LOGO_PATH = "/logo.png";
export const LOGO_ALT = "Prime Epoxy Flooring Logo";

export const PHONE_DISPLAY = "438-815-8815";
export const PHONE_TEL = "tel:438-815-8815";

export const EMAILS = {
  sales: "sales@primeepoxyflooring.ca",
  info: "info@primeepoxyflooring.ca",
} as const;

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const SOCIAL = {
  tiktok: "https://tiktok.com/@primeepoxyflooring.ca",
  facebook: "https://www.facebook.com/share/14tEoi1eDbs/",
  instagram:
    "https://www.instagram.com/primeepoxyflooring.ca?igsi=ODZxaHN4YTFlMzNy",
} as const;

export const CITIES = [
  { id: "montreal", nameEn: "Montreal", nameFr: "Montréal", regionEn: "Quebec", regionFr: "Québec" },
  { id: "laval", nameEn: "Laval", nameFr: "Laval", regionEn: "Quebec", regionFr: "Québec" },
  { id: "west-island", nameEn: "West Island", nameFr: "West Island", regionEn: "Quebec", regionFr: "Québec" },
  { id: "pointe-claire", nameEn: "Pointe-Claire", nameFr: "Pointe-Claire", regionEn: "West Island", regionFr: "West Island" },
  { id: "brossard", nameEn: "Brossard", nameFr: "Brossard", regionEn: "South Shore", regionFr: "Rive-Sud" },
  { id: "longueuil", nameEn: "Longueuil", nameFr: "Longueuil", regionEn: "South Shore", regionFr: "Rive-Sud" },
  { id: "south-shore", nameEn: "South Shore", nameFr: "Rive-Sud", regionEn: "Quebec", regionFr: "Québec" },
  { id: "gatineau", nameEn: "Gatineau QC", nameFr: "Gatineau QC", regionEn: "Quebec", regionFr: "Québec" },
  { id: "ottawa", nameEn: "Ottawa ON", nameFr: "Ottawa ON", regionEn: "Ontario", regionFr: "Ontario" },
] as const;

export const SCHEMA_AREAS = [
  "Montreal",
  "Laval",
  "West Island",
  "Brossard",
  "Longueuil",
  "Pointe-Claire",
] as const;

export const SPACES = [
  { id: "1-car", category: "residential", sqft: 250, basementPrep: false },
  { id: "2-car", category: "residential", sqft: 450, basementPrep: false },
  { id: "3-car", category: "residential", sqft: 650, basementPrep: false },
  { id: "basement", category: "residential", sqft: 800, basementPrep: true },
  { id: "living", category: "residential", sqft: 500, basementPrep: false },
  { id: "wet-room", category: "residential", sqft: 150, basementPrep: false },
  { id: "showroom", category: "commercial", sqft: 2000, basementPrep: false },
  { id: "restaurant", category: "commercial", sqft: 1200, basementPrep: false },
  { id: "retail", category: "commercial", sqft: 1500, basementPrep: false },
  { id: "warehouse", category: "commercial", sqft: 3500, basementPrep: false },
  { id: "custom", category: "custom", sqft: 800, basementPrep: false },
] as const;

export type SpaceId = (typeof SPACES)[number]["id"];
export type SpaceCategory = (typeof SPACES)[number]["category"];

export const SYSTEMS = [
  { id: "flake", avg: 8, low: 7, high: 9 },
  { id: "quartz", avg: 10, low: 9, high: 11 },
  { id: "metallic", avg: 19, low: 17, high: 21 },
] as const;

export type SystemId = (typeof SYSTEMS)[number]["id"];

export const COVE = { low: 20, high: 25, avg: 22.5 } as const;

export const PROJECT_TYPE_IDS = [
  "flake",
  "quartz",
  "metallic",
  "countertops",
  "cove",
  "unsure",
] as const;

export const NAV_LINKS = [
  { href: "#services", key: "services" },
  { href: "#calculator", key: "calculator" },
  { href: "#process", key: "process" },
  { href: "#gallery", key: "gallery" },
  { href: "#areas", key: "areas" },
  { href: "#faq", key: "faq" },
  { href: "#contact", key: "contact" },
] as const;
