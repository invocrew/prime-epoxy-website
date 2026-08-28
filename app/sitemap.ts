import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/logo.png`],
      alternates: {
        languages: {
          "en-CA": SITE_URL,
          "fr-CA": `${SITE_URL}/fr`,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/fr`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/logo.png`],
      alternates: {
        languages: {
          "en-CA": SITE_URL,
          "fr-CA": `${SITE_URL}/fr`,
          "x-default": SITE_URL,
        },
      },
    },
  ];
}
