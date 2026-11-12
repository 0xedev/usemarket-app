import Link from "next/link";

export function LegalLayout({
  kicker,
  title,
  intro,
  updated = "13 August 2026",
  children,
  index = [],
}: {
  kicker: string;
  title: string;
  intro: string;
  updated?: string;
  children: React.ReactNode;
  index?: Array<[string, string]>;
}) {
  return <main className="legal-page" id="top">
    <nav className="legal-nav shell">
      <Link className="brand" href="/" aria-label="usemarket home"><span className="brand-mark" style={{ width: 34, height: 34, overflow: "hidden", borderRadius: 10, background: "transparent", transform: "none" }}><img src="/usemarket-logo.png" alt="" style={{ width: 42, height: 42, objectFit: "contain" }} /></span><span>use<span>market</span></span></Link>
      <Link className="legal-back" href="/">Back to usemarket ↗</Link>
    </nav>
    <div className="legal-wrap">
      <div className="legal-kicker">{kicker}</div>
      <h1>{title}</h1>
      <p className="legal-intro">{intro}</p>
      <div className="legal-meta">Last updated: {updated} · Governing contact: legal@usemarket.store</div>
      {children}
      <div className="legal-footer"><span>© 2026 usemarket · Area 1, Providence Estate, Eleyele, Ibadan, Oyo State.</span><Link href="https://policy.usemarket.store">Privacy policy ↗</Link></div>
    </div>
  </main>;
}

export function LegalIndex({ items }: { items: Array<[string, string]> }) {
  return <nav className="legal-index" aria-label="On this page">{items.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>;
}

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id}><h2>{title}</h2>{children}</section>;
}
