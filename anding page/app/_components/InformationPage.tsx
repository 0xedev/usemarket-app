import "../landing.css";
import "../information.css";
import type { InfoPage } from "../../lib/content";
import { INFO_PAGES } from "../../lib/content";
import { APP_URLS, SITE_URL, WHATSAPP_URL, jsonLd } from "../../lib/site";

function Arrow() {
  return <svg className="info-arrow" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 16 16 4M5 4h11v11" /></svg>;
}

export function InformationPage({ page }: { page: InfoPage }) {
  const url = `${SITE_URL}${page.path}`;
  const app = page.path === "/vendors" ? APP_URLS.vendor : page.path === "/riders" ? APP_URLS.rider : APP_URLS.customer;
  const appRole = page.path === "/vendors" ? "vendor" : page.path === "/riders" ? "rider" : "customer";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": page.path === "/about" ? "AboutPage" : page.path === "/contact" ? "ContactPage" : page.path === "/faq" ? "FAQPage" : "WebPage",
        "@id": `${url}#webpage`, url, name: page.label, description: page.description,
        inLanguage: "en-NG", isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(page.path === "/faq" ? { mainEntity: page.sections.map(s => ({
          "@type": "Question", name: s.title,
          acceptedAnswer: { "@type": "Answer", text: s.paragraphs.join(" ") },
        })) } : {}),
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "usemarket", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
    ],
  };

  return <div className="lp info-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <header className="info-nav lp-wrap">
      <a className="lp-brand" href="/" aria-label="usemarket home"><img src="/usemarket-logo.png" width="44" height="44" alt="" />usemarket</a>
      <nav aria-label="Main navigation"><a href="/how-it-works">How it works</a><a href="/delivery-areas">Delivery areas</a><a href="/faq">FAQs</a></nav>
      <a className="lp-btn lp-btn-dark" href="/#apps">Get the app</a>
    </header>
    <main id="main-content" className="info-main lp-wrap">
      <nav className="info-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{page.label}</span></nav>
      <div className="info-heading"><p className="lp-kicker">{page.eyebrow}</p><h1>{page.title}</h1><p className="info-intro">{page.intro}</p></div>
      <div className="info-layout">
        <aside className="info-aside"><p>Explore usemarket</p><nav aria-label="Explore usemarket">{INFO_PAGES.map(p => <a key={p.path} href={p.path} aria-current={p.path === page.path ? "page" : undefined}>{p.label}<Arrow /></a>)}</nav></aside>
        <div className="info-body">{page.sections.map((section, index) => <section key={section.title} id={`answer-${index + 1}`}>
          <h2>{section.title}</h2>
          {section.paragraphs.map(p => <p key={p}>{p}</p>)}
          {section.links && <ul className="info-links">{section.links.map(([href, text]) => <li key={href}><a href={href}>{text}<Arrow /></a></li>)}</ul>}
        </section>)}</div>
      </div>
      <section className="info-cta"><div><p className="lp-kicker">Market without stress</p><h2>{appRole === "vendor" ? "Ready to open your shop?" : appRole === "rider" ? "Ready for your next delivery?" : "Ready to shop near you?"}</h2></div><div className="info-cta-actions"><a className="lp-badge" href={app} aria-label={`Get the usemarket ${appRole} app on Google Play`}><img src="/google-play-badge.png" width="646" height="250" alt="Get it on Google Play" /></a>{appRole === "customer" && <a className="lp-btn lp-btn-wa" href={WHATSAPP_URL}><img src="/whatsapp-mark.svg" width="22" height="22" alt="" />Order on WhatsApp</a>}</div></section>
    </main>
    <footer className="lp-footer"><div className="lp-wrap"><a className="lp-brand" href="/">usemarket</a><nav aria-label="Footer"><a href="/about">About</a><a href="/contact">Contact &amp; support</a><a href="/terms">Terms</a><a href="https://policy.usemarket.store">Privacy policy</a><a href="/sitemap">Sitemap</a></nav><address>Area 1, Providence Estate, Eleyele, Ibadan, Oyo State, Nigeria.</address></div></footer>
  </div>;
}
