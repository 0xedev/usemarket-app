import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usemarket.store"),
  title: {
    default: "usemarket | Local shopping, delivered",
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
      maxImagePreview: "large",
    },
  },
  openGraph: {
    type: "website",
    siteName: "usemarket",
    locale: "en_NG",
    url: "https://usemarket.store/",
    title: "usemarket | Local shopping, delivered",
    description:
      "Shop groceries, food, pharmacy essentials and everyday goods from local stores in Ibadan, Akure and Sango Ota.",
  },
  twitter: {
    card: "summary",
    title: "usemarket | Local shopping, delivered",
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
      name: "USEMARKET LTD",
      alternateName: "usemarket",
      url: "https://usemarket.store/",
      logo: "https://usemarket.store/usemarket-logo.png",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
