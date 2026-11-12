import type { MetadataRoute } from "next";

const siteUrl = "https://usemarket.store";
const publicPages = [
  "/",
  "/terms",
  "/terms/customers",
  "/terms/vendors",
  "/terms/riders",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
