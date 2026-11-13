import "./landing.css";
import "./information.css";
import { APP_URLS, SITE_URL, jsonLd } from "../lib/site";
import { INFO_PAGES } from "../lib/content";
import Effects from "./Effects";
import MarketScene from "./scene/MarketScene";

const STORE = "https://play.google.com/store/apps/details?id=";
const WHATSAPP = "https://wa.me/message/JQ5GZ2TAK6JFA1";
const APPS = {
  customer: "usemarket.store",
  vendor: "com.usemarket.usemarketvendor",
  rider: "usemarket.rider",
} as const;

function Download({ role }: { role: keyof typeof APPS }) {
  return (
    <a className="lp-badge" href={STORE + APPS[role]} aria-label={`Get the usemarket ${role} app on Google Play`}>
      <img src="/google-play-badge.png" alt="Get it on Google Play" width="646" height="250" />
    </a>
  );
}

function Brand() {
  return (
    <a className="lp-brand" href="/" aria-label="usemarket home">
      <img src="/usemarket-logo.png" alt="" width="44" height="44" />
      usemarket
    </a>
  );
}

function WhatsAppLink({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <a className={className} href={WHATSAPP}>
      <img src="/whatsapp-mark.svg" alt="" width="22" height="22" />
      {children}
    </a>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  shop: <path d="M4 10l1.5-5h13L20 10M4 10v9h16v-9M4 10c0 1.7 1.2 3 2.7 3s2.6-1.3 2.6-3c0 1.7 1.2 3 2.7 3s2.7-1.3 2.7-3c0 1.7 1.1 3 2.6 3S20 11.7 20 10M10 19v-4h4v4" />,
  basket: <path d="M3 10h18l-1.6 9H4.600L3 10zM8 10l3-6M16 10l-3-6M9 13v3M12 13v3M15 13v3" />,
  bike: <path d="M5.5 19a3 3 0 100-6 3 3 0 000 6zM18.5 19a3 3 0 100-6 3 3 0 000 6zM8.5 16h6l2-7h-3M16.5 9l2 7M5.5 16l3-5h5M7 8h4" />,
  list: <path d="M5 4h14v16H5zM9 9h6M9 12.500h6M9 16h3" />,
  bell: <path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16zM10 20.500h4" />,
  hand: <path d="M4 14l4-3 5 1h4a1.5 1.5 0 010 3h-4M4 19l5 1 9-3a1.6 1.6 0 00-1-3M9 5h8v5H9zM11.5 5v2h3V5" />,
  coins: <path d="M9 10.500c3.3 0 6-1 6-2.500S12.3 5.5 9 5.5 3 6.5 3 8s2.7 2.5 6 2.500zM3 8v4c0 1.5 2.7 2.5 6 2.500M15 8v2.500M21 14c0 1.5-2.7 2.5-6 2.500S9 15.5 9 14s2.7-2.5 6-2.5 6 1 6 2.500zM9 14v3c0 1.5 2.7 2.5 6 2.500s6-1 6-2.500v-3" />,
  eye: <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 100-6 3 3 0 000 6z" />,
  route: <path d="M6 8.500a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18 20.500a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM6 8.500V14a3 3 0 003 3h6.500M13 3.500h2a3 3 0 013 3v9" />,
  pot: <path d="M4 10h16v5a5 5 0 01-5 5H9a5 5 0 01-5-5v-5zM2.5 10h19M9 6.500c0-1.5 1.5-1.5 1.5-3M13.5 6.500c0-1.5 1.5-1.5 1.5-3" />,
  cross: <path d="M9.5 4h5v5.500H20v5h-5.500V20h-5v-5.500H4v-5h5.500V4z" />,
  bag: <path d="M5 8h14l-1 12H6L5 8zM9 8V6.500a3 3 0 016 0V8" />,
  leaf: <path d="M5 19C5 10 10 5 20 4.5 19.5 14.5 14.5 19 5 19zM5 19l8.5-8.5" />,
};
function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const TICKER = ["Fresh pepper", "Rice & beans", "Yam", "Plantain", "Hot food", "Bread", "Provisions", "Drinks", "Pharmacy", "Household"];

const STEPS = [
  { icon: "shop", title: "Pick a shop near you", body: "Food vendors, grocery sellers, pharmacies and everyday stores from your own area, all in one app." },
  { icon: "basket", title: "Fill your basket", body: "Add what you need and check out in the app. Rather chat? Send your list on WhatsApp instead." },
  { icon: "bike", title: "A rider brings it home", body: "A usemarket rider picks your order up from the shop and delivers it to your door." },
] as const;

const AISLES = [
  { icon: "leaf", title: "Foodstuff & groceries", tone: "green" },
  { icon: "pot", title: "Hot meals", tone: "red" },
  { icon: "cross", title: "Pharmacy essentials", tone: "blue" },
  { icon: "bag", title: "Everyday goods", tone: "yellow" },
] as const;

const VENDOR_POINTS = [
  { icon: "list", title: "Put your products up", body: "Add what you sell and keep your shop up to date from your phone." },
  { icon: "bell", title: "Orders come to you", body: "New orders land in the vendor app. Pack them and hand over to the rider." },
  { icon: "coins", title: "Watch your sales add up", body: "Follow your orders and your earnings in one place." },
] as const;

const RIDER_POINTS = [
  { icon: "eye", title: "See the job before you take it", body: "Pickup point, delivery area and estimated earnings are shown before you accept." },
  { icon: "route", title: "Pick up, drop off", body: "Collect the order from the vendor and hand it over at the customer's door." },
  { icon: "coins", title: "Know what you've made", body: "Delivery earnings and tips show up in the rider app." },
] as const;

export default function Home() {
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${SITE_URL}/#webpage`, url: `${SITE_URL}/`, name: "usemarket | Local Food & Grocery Delivery in Nigeria", description: "Shop local food, groceries and everyday goods in Ibadan, Akure and Sango Ota.", isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en-NG" },
      ...Object.entries(APP_URLS).map(([role, url]) => ({ "@type": "MobileApplication", "@id": `${SITE_URL}/#${role}-app`, name: `usemarket ${role} app`, operatingSystem: "Android", applicationCategory: role === "customer" ? "ShoppingApplication" : "BusinessApplication", downloadUrl: url, url, publisher: { "@id": `${SITE_URL}/#organization` } })),
    ],
  };
  return (
    <div className="lp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <link rel="preload" href="/fonts/bricolage.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/dm-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/market-poster.webp" as="image" media="(min-width: 861px)" />
      <link rel="preload" href="/market-poster-mobile.webp" as="image" media="(max-width: 860px)" />
      <Effects />

      <header className="lp-nav">
        <Brand />
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#vendors">For vendors</a>
          <a href="#riders">For riders</a>
        </nav>
        <a className="lp-btn lp-btn-dark" href="#apps">Get the app</a>
      </header>

      <main>
        <section className="lp-hero">
          <MarketScene />
          <div className="lp-hero-copy">
            <p className="lp-pill"><i />Delivering in Ibadan, Akure &amp; Sango Ota</p>
            <h1>
              Market without{" "}
              <span className="lp-strike">
                stress
                <svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true"><path d="M4 26C40 8 62 34 98 18s52 14 88 2 62 12 110-4" /></svg>
              </span>
              <b>.</b>
            </h1>
            <p className="lp-lede">
              The whole market, minus the sun and the traffic. Order foodstuff, hot meals and
              everyday essentials from shops near you, and a rider brings them to your door.
            </p>
            <div className="lp-actions">
              <Download role="customer" />
              <WhatsAppLink className="lp-btn lp-btn-wa">Order on WhatsApp</WhatsAppLink>
            </div>
          </div>
          <p className="lp-live" aria-hidden="true"><i />The market is open. Move your mouse to look around</p>
        </section>

        <div className="lp-ticker" aria-label="What you can order">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {TICKER.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ))}
        </div>

        <section className="lp-introduction" aria-labelledby="about-usemarket">
          <div className="lp-wrap">
            <h2 id="about-usemarket">usemarket brings your local market to your door.</h2>
            <div><p>usemarket is a Nigerian local commerce platform operated by USEMARKET LTD. Shop food, groceries, pharmacy essentials and everyday goods from local vendors in Ibadan, Akure and Sango Ota.</p><p>Order in the Android app or on WhatsApp. Shops and delivery options depend on your address.</p><a href="/about">Meet usemarket</a>{" · "}<a href="/delivery-areas">Check delivery areas</a></div>
          </div>
        </section>

        <section className="lp-how" id="how">
          <div className="lp-wrap">
            <header className="lp-head" data-reveal>
              <p className="lp-kicker">For shoppers</p>
              <h2>From the stall to your door in three moves.</h2>
            </header>
            <ol className="lp-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} data-reveal data-tilt="5" style={{ transitionDelay: i * 90 + "ms" }}>
                  <span className="lp-step-no">{i + 1}</span>
                  <span className="lp-step-icon"><Icon name={s.icon} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>

            <ul className="lp-aisles" data-reveal>
              {AISLES.map((a) => (
                <li key={a.title} className={"is-" + a.tone}><Icon name={a.icon} />{a.title}</li>
              ))}
            </ul>

            <aside className="lp-wa" data-reveal>
              <div>
                <p className="lp-kicker">No app? No wahala.</p>
                <h3>Send us your list on WhatsApp.</h3>
                <p>Type it the way you would tell your market woman. We take the order from there.</p>
                <WhatsAppLink className="lp-btn lp-btn-wa">Order on WhatsApp</WhatsAppLink>
              </div>
              <figure>
                <img src="/whatsapp-order.svg" width="170" height="170" alt="QR code that opens a WhatsApp chat with usemarket" loading="lazy" />
                <figcaption>Scan to chat</figcaption>
              </figure>
            </aside>
          </div>
        </section>

        <section className="lp-role lp-vendor" id="vendors">
          <div className="lp-wrap lp-role-grid">
            <div className="lp-stage" data-tilt="6" data-reveal>
              <img className="lp-stage-art" src="/market-vendor.webp" width="1536" height="1024" alt="A market stall stacked with fresh produce beside a phone showing the vendor app" loading="lazy" />
              <p className="lp-chip lp-chip-a" aria-hidden="true"><i />New order just came in</p>
              <p className="lp-chip lp-chip-b" aria-hidden="true">Packed. Rider on the way</p>
            </div>
            <div className="lp-role-copy" data-reveal>
              <p className="lp-kicker">For vendors</p>
              <h2>Your stall, open to the whole city.</h2>
              <p className="lp-role-lede">
                Stay where you sell. usemarket puts your products in front of customers nearby and
                sends a rider to carry each order to their door.
              </p>
              <ul className="lp-points">
                {VENDOR_POINTS.map((p) => (
                  <li key={p.title}><span><Icon name={p.icon} /></span><div><h3>{p.title}</h3><p>{p.body}</p></div></li>
                ))}
              </ul>
              <div className="lp-role-cta">
                <Download role="vendor" />
                <a className="lp-link" href="/terms/vendors">Read the vendor terms</a>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-role lp-rider" id="riders">
          <div className="lp-wrap lp-role-grid">
            <div className="lp-role-copy" data-reveal>
              <p className="lp-kicker">For riders</p>
              <h2>Ride. Deliver. Earn.</h2>
              <p className="lp-role-lede">
                Turn your bike into steady runs. The rider app sends you deliveries nearby and shows
                you what each one pays.
              </p>
              <ul className="lp-points">
                {RIDER_POINTS.map((p) => (
                  <li key={p.title}><span><Icon name={p.icon} /></span><div><h3>{p.title}</h3><p>{p.body}</p></div></li>
                ))}
              </ul>
              <div className="lp-role-cta">
                <Download role="rider" />
                <a className="lp-link" href="/terms/riders">Read the rider terms</a>
              </div>
            </div>
            <div className="lp-stage" data-tilt="6" data-reveal>
              <img className="lp-stage-art" src="/market-rider.webp" width="1536" height="1024" alt="A usemarket rider standing beside a green delivery scooter" loading="lazy" />
              <p className="lp-chip lp-chip-a" aria-hidden="true"><i />New delivery nearby</p>
              <p className="lp-chip lp-chip-b" aria-hidden="true">Delivered. Earnings added</p>
            </div>
          </div>
        </section>

        <section className="lp-cities" aria-label="Where usemarket delivers">
          <p className="lp-kicker" data-reveal>Now delivering in</p>
          <ul data-reveal>
            <li>Ibadan</li>
            <li>Akure</li>
            <li>Sango Ota</li>
          </ul>
        </section>

        <section className="lp-apps" id="apps">
          <div className="lp-wrap">
            <div className="lp-apps-panel" data-reveal>
              <img className="lp-apps-art" src="/market-hero.webp" width="1536" height="1024" alt="" loading="lazy" />
              <div className="lp-apps-copy">
                <h2>Oya, market is open.</h2>
                <p>Three apps, one market. Pick the one that is yours.</p>
              </div>
              <ul className="lp-apps-list">
                <li><h3>Shop</h3><p>Order from shops near you.</p><Download role="customer" /></li>
                <li><h3>Sell</h3><p>Take orders at your stall.</p><Download role="vendor" /></li>
                <li><h3>Deliver</h3><p>Earn on every drop-off.</p><Download role="rider" /></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-wrap">
          <Brand />
          <nav aria-label="Footer">
            {INFO_PAGES.map(page => <a key={page.path} href={page.path}>{page.label}</a>)}
            <a href="/terms">Terms</a>
            <a href="https://policy.usemarket.store">Privacy policy</a>
            <a href="mailto:support@usemarket.store">Contact support</a>
            <a href="/sitemap">Sitemap</a>
          </nav>
          <address>Area 1, Providence Estate, Eleyele, Ibadan, Oyo State, Nigeria.</address>
        </div>
      </footer>
    </div>
  );
}
