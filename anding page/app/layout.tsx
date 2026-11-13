import type { Metadata } from "next";
import "./globals.css";
import { CITIES, SITE_URL, SOCIAL_IMAGE, jsonLd } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://usemarket.store"),
  title: {
    default: "usemarket | Local Food & Grocery Delivery in Nigeria",
    template: "%s | usemarket",
  },
  description:
    "Shop groceries, food, pharmacy essentials and everyday goods from local stores in Ibadan, Akure and Sango Ota. Order your way and get them delivered.",
  applicationName: "usemarket",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "usemarket",
    locale: "en_NG",
    url: "https://usemarket.store/",
    images: [SOCIAL_IMAGE],
    title: "usemarket | Local Food & Grocery Delivery in Nigeria",
    description:
      "Shop groceries, food, pharmacy essentials and everyday goods from local stores in Ibadan, Akure and Sango Ota.",
  },
  twitter: {
    card: "summary_large_image",
    images: [SOCIAL_IMAGE],
    title: "usemarket | Local Food & Grocery Delivery in Nigeria",
    description:
      "Shop groceries, food, pharmacy essentials and everyday goods from local stores in Ibadan, Akure and Sango Ota.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://usemarket.store/#organization",
      name: "usemarket",
      legalName: "USEMARKET LTD",
      alternateName: ["useMarket", "use market"],
      description: "Nigerian local commerce platform connecting customers, local vendors and delivery riders in Ibadan, Akure and Sango Ota.",
      url: "https://usemarket.store/",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/usemarket-logo.png`, width: 512, height: 512 },
      image: SOCIAL_IMAGE.url,
      email: "support@usemarket.store",
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: "support@usemarket.store", url: `${SITE_URL}/contact`, availableLanguage: ["English"] }],
      areaServed: CITIES.map(city => ({ "@type": "City", name: city.name, containedInPlace: { "@type": "AdministrativeArea", name: city.region } })),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Area 1, Providence Estate, Eleyele",
        addressLocality: "Ibadan",
        addressRegion: "Oyo State",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://usemarket.store/#website",
      url: "https://usemarket.store/",
      name: "usemarket",
      alternateName: "useMarket",
      publisher: { "@id": "https://usemarket.store/#organization" },
      inLanguage: "en-NG",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
