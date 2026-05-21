import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["/", "/sobre", "/manifesto", "/solucoes", "/casos", "/privacidade", "/termos"];
  return routes.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
