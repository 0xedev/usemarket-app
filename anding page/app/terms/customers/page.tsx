import { SOCIAL_IMAGE } from "../../../lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "../LegalLayout";

export const metadata: Metadata = {
  title: "Customer terms",
  description:
    "Read usemarket's customer terms for orders, payments, substitutions, delivery, cancellations, refunds and support.",
  alternates: { canonical: "/terms/customers" },
  openGraph: {
    images: [SOCIAL_IMAGE],
    type: "website",
    siteName: "usemarket",
    locale: "en_NG",
    url: "/terms/customers",
    title: "usemarket Customer Terms",
    description:
      "Terms for ordering, paying, receiving deliveries, cancelling orders and getting support on usemarket.",
  },
  twitter: {
    card: "summary_large_image",
    images: [SOCIAL_IMAGE],
    title: "usemarket Customer Terms",
    description:
      "Terms for ordering, paying, receiving deliveries, cancelling orders and getting support on usemarket.",
  },
};

const sections = [["#ordering", "Ordering"], ["#payments", "Payments"], ["#changes", "Changes and cancellations"], ["#delivery", "Delivery"], ["#refunds", "Refunds"], ["#complaints", "Complaints"], ["#accounts", "Account rules"]] as Array<[string, string]>;

export default function CustomerTermsPage() {
  return <LegalLayout kicker="Customer terms" title="Order with confidence" intro="These Customer Terms explain how ordering, payment, delivery, cancellations, refunds and support work when you buy through usemarket." index={sections}>
    <div className="legal-grid"><div><nav className="legal-index"><Link href="/terms">General terms</Link><Link href="/terms/vendors">Vendor agreement</Link><Link href="/terms/riders">Rider agreement</Link></nav></div><div className="legal-content">
      <div className="legal-note"><p>These terms supplement the General Platform Terms. If there is a conflict, the more specific customer rule applies to the customer transaction, subject to applicable law.</p></div>
      <section id="ordering"><h2>1. Placing an order</h2><p>You may browse vendors, add products to a cart and submit an order through the app, website, WhatsApp or another approved channel. You are responsible for checking the vendor, items, quantities, options, address, contact details, delivery option and total before confirming.</p><p>Products may be unavailable, restricted by location or subject to age, prescription or other legal requirements. A pharmacy listing on usemarket does not mean usemarket dispenses medicines or handles prescriptions. Vendors remain responsible for lawful sale and fulfilment.</p></section>
      <section id="payments"><h2>2. Payments and fees</h2><p>We show the order total and applicable fees before confirmation. This may include item prices, delivery, service, taxes, payment-provider charges and an optional rider tip. The platform may apply a minimum order or city-specific pricing rule shown at checkout.</p><p>We support only the payment methods displayed at checkout. You authorise the selected provider to charge your payment method. Never send payment to a rider or vendor outside the approved checkout unless the order explicitly permits cash on delivery.</p></section>
      <section id="changes"><h2>3. Substitutions, changes and cancellations</h2><p>Inventory can change before a rider completes shopping or pickup. You may choose a substitution preference where available. A replacement should be reasonably similar and within any price or quantity limit shown in the app. If no acceptable replacement is available, the item may be removed and its amount refunded.</p><p>You may request cancellation before the vendor accepts or starts preparing the order, subject to the cancellation notice shown at checkout. After preparation, shopping or dispatch begins, a cancellation charge or loss of the affected item value may apply. We will show the outcome before confirming a cancellation where practicable.</p></section>
      <section id="delivery"><h2>4. Delivery and handover</h2><p>Delivery estimates are estimates, not guarantees. You must provide an accessible, safe address and a reachable phone number, respond to rider or support contact and be available during the delivery window.</p><p>For some orders, a delivery PIN or other confirmation is required. Do not share it before receiving the correct order. A rider may wait for a limited period at the address. If you are unreachable, provide an unsafe location or refuse a valid handover, the order may be cancelled, returned or redelivered at an additional charge.</p><p>Do not ask a rider to speed, break traffic rules, carry prohibited goods or make an unsafe stop. Report safety concerns immediately through support.</p></section>
      <section id="refunds"><h2>5. Missing, wrong, damaged or poor-quality items</h2><p>Contact support as soon as possible—normally within 24 hours of delivery, and immediately for perishable, damaged or safety-sensitive items. Include the order number, a clear description and photographs where relevant. We may ask for the item to be retained for inspection or collection.</p><p>Depending on the facts and applicable law, we may offer a replacement, partial refund, full refund, credit or other remedy. A refund may be reduced or declined where the issue resulted from customer unavailability, an incorrect address, misuse, an approved substitution, taste preference alone, or circumstances outside the responsible party's control.</p><p>Refund timing depends on the payment provider. Platform or payment fees may be treated separately where they have already been earned, unless a refund is required by law or the issue was caused by usemarket.</p></section>
      <section id="complaints"><h2>6. Complaints and support</h2><p>Use in-app support or email <a href="mailto:support@usemarket.store">support@usemarket.store</a>. We may share relevant order information with the vendor or rider to investigate. We aim to acknowledge complaints promptly and communicate the expected resolution path.</p></section>
      <section id="accounts"><h2>7. Customer account rules</h2><p>Keep your account and delivery details accurate. Do not create fake orders, abuse promotions or refunds, harass vendors or riders, or allow another person to use your account in a way that creates safety or payment risk. We may restrict ordering while we investigate suspected fraud or repeated failed deliveries.</p></section>
    </div></div>
  </LegalLayout>;
}
