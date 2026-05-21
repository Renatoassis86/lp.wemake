import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
    ],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
