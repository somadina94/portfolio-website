import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.replace(/\/$/, "");
  const routes = ["", "/projects", "/about", "/contact", "/certs", "/extrack-privacy-policy"];
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
