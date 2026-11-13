import { INFO_PAGES } from "./content";

// Update an entry only when that page's content or metadata materially changes.
// Legal pages keep their own editorial dates rather than today's build date.
export const PUBLIC_PAGES = [
  { path: "/", label: "usemarket home", modified: "2026-11-13" },
  ...INFO_PAGES.map(page => ({ path: page.path, label: page.label, modified: "2026-11-13" })),
  { path: "/sitemap", label: "Website sitemap", modified: "2026-11-13" },
  { path: "/terms", label: "General terms", modified: undefined },
  { path: "/terms/customers", label: "Customer terms", modified: undefined },
  { path: "/terms/vendors", label: "Vendor terms", modified: undefined },
  { path: "/terms/riders", label: "Rider terms", modified: undefined },
];
