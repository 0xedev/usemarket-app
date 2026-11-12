import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "../LegalLayout";

export const metadata: Metadata = {
  title: "Vendor terms",
  description:
    "Read usemarket's vendor terms for onboarding, product listings, pricing, fulfilment, fees, settlements and compliance.",
  alternates: { canonical: "/terms/vendors" },
  openGraph: {
    type: "website",
    siteName: "usemarket",
    locale: "en_NG",
    url: "/terms/vendors",
    title: "usemarket Vendor Terms",
    description:
      "Terms for businesses that list products, receive orders and use usemarket vendor tools.",
  },
  twitter: {
    card: "summary",
    title: "usemarket Vendor Terms",
    description:
      "Terms for businesses that list products, receive orders and use usemarket vendor tools.",
  },
};

const sections = [["#onboarding", "Onboarding"], ["#catalogue", "Listings"], ["#fulfilment", "Fulfilment"], ["#fees", "Fees and settlements"], ["#promotions", "Promotions"], ["#refunds", "Refunds and disputes"], ["#compliance", "Compliance"], ["#suspension", "Suspension"]] as Array<[string, string]>;

export default function VendorTermsPage() {
  return <LegalLayout kicker="Vendor agreement" title="A fairer storefront for local business" intro="These Vendor Terms apply when a business lists products or services, receives orders or uses usemarket tools. Commercial schedules in your onboarding or dashboard form part of this agreement." index={sections}>
    <div className="legal-grid"><div><nav className="legal-index"><Link href="/terms">General terms</Link><Link href="/terms/customers">Customer terms</Link><Link href="/terms/riders">Rider agreement</Link></nav></div><div className="legal-content">
      <div className="legal-note"><p>Vendor onboarding is subject to verification. Being listed does not transfer responsibility for your products, staff, premises, licences, taxes or customer obligations to usemarket.</p></div>
      <section id="onboarding"><h2>1. Onboarding and verification</h2><p>You must provide accurate business, ownership, identity, bank, tax, location, licence and contact information requested by usemarket. You authorise reasonable verification and must keep your records current. We may require additional documents for food, pharmacy, alcohol, cosmetics, frozen goods or other regulated categories.</p><p>You must operate from the approved premises, maintain required permits and tell us about material changes. You may not transfer your account or allow unauthorised staff to use the vendor dashboard.</p></section>
      <section id="catalogue"><h2>2. Listings, pricing and inventory</h2><p>You are responsible for accurate names, descriptions, images, ingredients, allergens, sizes, quantities, prices, taxes, preparation times, stock status, expiry information and lawful claims. Prices and availability shown on usemarket must be kept current.</p><p>You grant usemarket permission to display, resize, translate and promote your catalogue content to operate the marketplace. You warrant that you own or have permission to use all submitted content and that it does not infringe another person's rights.</p></section>
      <section id="fulfilment"><h2>3. Order acceptance and fulfilment</h2><p>Monitor the vendor tools, accept or reject orders promptly and prepare accepted orders within the stated time. Keep the premises open and inventory available during published hours. Package products securely, hygienically and in a way suitable for the selected delivery method.</p><p>You must hand over the correct, complete order to the assigned rider, verify order details where required and report delays, stock-outs or safety issues immediately. Repeated late preparation, rejected orders, missing items or inaccurate listings may affect ranking, promotions, fees or continued access.</p></section>
      <section id="fees"><h2>4. Commissions and settlements</h2><p>Your commercial schedule or dashboard will state the applicable commission, payment-processing charge, delivery or fulfilment charge, taxes, promotional contribution and settlement timing. We may deduct agreed fees, refunds, chargebacks, payment reversals, approved adjustments and amounts owed from settlements.</p><p>Where usemarket collects payment as your limited agent, settlement to the verified bank account is treated as payment to you to the extent received and not reversed. You are responsible for bank details, taxes, invoices and reconciliation. We may delay or hold settlement where required for fraud, chargeback, compliance or a genuine dispute.</p></section>
      <section id="promotions"><h2>5. Promotions and marketing</h2><p>Promotions must state their funding source, dates, eligibility, stock limits and redemption rules. A vendor-funded promotion requires your approval or a clear standing instruction; a usemarket-funded promotion may be offered under its own conditions. You must honour promotions accepted through the platform unless support authorises a correction.</p><p>We may rank, feature or advertise your storefront using performance, relevance, customer experience and paid-placement rules. We will not make a misleading claim about your business or products.</p></section>
      <section id="refunds"><h2>6. Refunds, complaints and chargebacks</h2><p>You are responsible for product quality, accuracy, packaging, food safety, lawful sale and fulfilment issues attributable to your business. You must cooperate with customer complaints, provide evidence promptly and accept a reasonable replacement, refund or adjustment where the issue is your responsibility.</p><p>We may issue a customer remedy under the customer policy and recover the vendor-attributable amount from settlement, subject to review and applicable law. You must not ask customers to bypass usemarket to avoid a refund, fee or record.</p></section>
      <section id="compliance"><h2>7. Prohibited products and compliance</h2><p>You must not list counterfeit, stolen, unsafe, recalled, illegal or restricted goods, or any product that violates a platform rule. Regulated products must be sold only with the required approvals and controls. Pharmacy listings are catalogue-only unless usemarket expressly enables a compliant prescription workflow.</p><p>Follow applicable consumer-protection, food-safety, labelling, advertising, tax, data-protection, employment and anti-bribery laws. You must promptly notify us of a recall, regulator notice, serious incident or suspected fraud involving a listed product.</p></section>
      <section id="suspension"><h2>8. Suspension and ending the relationship</h2><p>We may pause a listing, remove a product, restrict payouts or suspend a vendor for inaccurate information, unsafe or unlawful products, fraud, non-payment, poor fulfilment, customer harm, repeated complaints or breach of this agreement. Where appropriate, we will give notice and an opportunity to respond, but urgent safety or legal issues may require immediate action.</p><p>On termination, you must complete or safely cancel outstanding orders, pay amounts due, stop using usemarket branding and return any equipment. Clauses on payments, product liability, data, confidentiality, intellectual property and indemnity survive.</p></section>
    </div></div>
  </LegalLayout>;
}
