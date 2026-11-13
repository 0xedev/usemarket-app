import { InformationPage } from "../_components/InformationPage";
import { pageMetadata } from "../../lib/site";
import { PUBLIC_PAGES } from "../../lib/public-pages";

const page = {
  path: "/sitemap", label: "Website sitemap", eyebrow: "Find your way around",
  title: "Everything on usemarket's website.",
  description: "Explore the official usemarket website: ordering, delivery areas, vendor and rider guides, customer support, FAQs and terms.",
  intro: "Find the page you need, from your first order to vendor onboarding and delivery support.",
  sections: [
    { title: "Shopping, delivery and company information", paragraphs: ["Start with the homepage or explore a guide below."], links: PUBLIC_PAGES.filter(p => !p.path.startsWith("/terms") && p.path !== "/sitemap").map(p => [p.path, p.label] as [string,string]) },
    { title: "Terms and privacy", paragraphs: ["Review the terms for your role on usemarket."], links: [...PUBLIC_PAGES.filter(p => p.path.startsWith("/terms")).map(p => [p.path, p.label] as [string,string]), ["https://policy.usemarket.store", "Privacy policy"] as [string,string]] },
  ],
};
export const metadata = pageMetadata(page.path, page.label, page.description);
export default function Page() { return <InformationPage page={page} />; }
