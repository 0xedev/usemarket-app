import type { Metadata } from "next";

export const SITE_URL = "https://usemarket.store";
export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/usemarket-hero.png`, width: 1536, height: 1024,
  type: "image/png", alt: "usemarket — local shopping delivered to your door",
};
export const WHATSAPP_URL = "https://wa.me/message/JQ5GZ2TAK6JFA1";
export const APP_URLS = {
  customer: "https://play.google.com/store/apps/details?id=usemarket.store",
  vendor: "https://play.google.com/store/apps/details?id=com.usemarket.usemarketvendor",
  rider: "https://play.google.com/store/apps/details?id=usemarket.rider",
};
export const CITIES = [
  { name: "Ibadan", region: "Oyo State" },
  { name: "Akure", region: "Ondo State" },
  { name: "Sango Ota", region: "Ogun State" },
];

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: {
      type: "website", siteName: "usemarket", locale: "en_NG",
      url: `${SITE_URL}${path}`, title: `${title} | usemarket`, description,
      images: [SOCIAL_IMAGE],
    },
    twitter: { card: "summary_large_image", title: `${title} | usemarket`, description, images: [SOCIAL_IMAGE] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
