import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = {
    en: SITE_URL,
    fr: `${SITE_URL}/fr`,
    "en-CA": SITE_URL,
    "fr-CA": `${SITE_URL}/fr`,
    "x-default": SITE_URL,
  };

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/logo.png`],
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/fr`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/logo.png`],
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
