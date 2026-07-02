import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: getSiteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
