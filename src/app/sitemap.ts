import type { MetadataRoute } from "next";
import { projects } from "@/content/proyectos";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["/", "/proyectos", "/nosotros", "/contacto"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/proyectos/${project.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}