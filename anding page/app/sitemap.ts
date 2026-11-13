import type { MetadataRoute } from "next";
import { PUBLIC_PAGES } from "../lib/public-pages";
import { SITE_URL } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGES.map(({path, modified}) => ({
    url: `${SITE_URL}${path}`,
    ...(modified ? { lastModified: modified } : {}),
  }));
}
