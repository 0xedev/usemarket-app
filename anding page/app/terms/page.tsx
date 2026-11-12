import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "./LegalLayout";

export const metadata: Metadata = {
  title: "Platform terms",
  description:
    "Read usemarket's general platform terms for visitors, customers, vendors and riders using the local commerce marketplace.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    siteName: "usemarket",
    locale: "en_NG",
    url: "/terms",
    title: "usemarket Platform Terms",
    description:
      "General platform terms for visitors, customers, vendors and riders using usemarket.",
  },
  twitter: {
    card: "summary",
    title: "usemarket Platform Terms",
    description:
      "General platform terms for visitors, customers, vendors and riders using usemarket.",
  },
};

const sections = [
  ["#scope", "Scope and acceptance"],
  ["#roles", "How usemarket works"],
  ["#accounts", "Accounts and security"],
  ["#payments", "Prices, fees and payments"],
  ["#failed-deliveries", "Failed deliveries, redelivery and returns"],
  ["#conduct", "Acceptable use"],
  ["#content", "Content, feedback and intellectual property"],
  ["#suspension", "Suspension and termination"],
  ["#liability", "Disclaimers, liability and indemnity"],
  ["#disputes", "Governing law and disputes"],
] as Array<[string, string]>;

export default function TermsPage() {
  return <LegalLayout kicker="Legal framework" title="Terms of usemarket" updated="3 November 2026" intro="These General Platform Terms apply to everyone who accesses or uses usemarket, including customers, vendors, riders and visitors. Role-specific terms below form part of this agreement when you use that part of the platform." index={sections}>
    <div className="legal-grid"><div><nav className="legal-index" aria-label="Legal documents"><Link href="/terms/customers">Customer terms</Link><Link href="/terms/vendors">Vendor agreement</Link><Link href="/terms/riders">Rider agreement</Link><Link href="https://policy.usemarket.store">Privacy policy</Link></nav></div><div className="legal-content">
      <div className="legal-note"><p><strong>Important:</strong> usemarket is a marketplace and logistics platform. Vendors are responsible for the products and services they offer. Riders provide delivery services under their applicable rider agreement. Please read the role-specific terms that apply to you.</p></div>

      <section id="scope"><h2>1. Scope and acceptance</h2><p>These terms are an agreement between you and USEMARKET LTD ("usemarket", "we", "us" or "our"), a company operating from Area 1, Providence Estate, Eleyele, Ibadan, Oyo State, Nigeria. By visiting our website, creating an account, placing an order, listing products, accepting a delivery or using any usemarket service, you agree to these terms and the policies incorporated into them.</p><p>If you do not agree, do not use the platform. If you use usemarket for a business, you confirm that you have authority to bind that business.</p></section>

      <section id="roles"><h2>2. How usemarket works</h2><p>usemarket helps customers discover vendors, place orders and arrange delivery. We may provide the technology, payment collection, customer support and delivery coordination, but a purchase of a product is ordinarily a contract between the customer and the vendor. The applicable vendor, rider and customer terms explain each party's responsibilities.</p><p>We may act as a limited payment collection agent for a vendor where the checkout, vendor agreement or applicable law says so. Payment to usemarket or our payment provider then satisfies the customer's payment obligation to that vendor to the extent received and settled.</p><p>Product availability, delivery estimates and prices can change. An order is accepted only when the platform or vendor confirms it.</p></section>

      <section id="accounts"><h2>3. Accounts and security</h2><p>You must provide accurate, current information and keep your login details secure. You are responsible for activity under your account and must tell us promptly if you suspect unauthorised access. We may verify identity, phone numbers, business details, licences or other information before enabling a feature.</p><p>Users must be at least 18, or use the service with the involvement and responsibility of a parent or legal guardian where permitted by law. One person may not operate multiple accounts to evade restrictions, promotions or investigations.</p></section>

      <section id="payments"><h2>4. Prices, fees and payments</h2><p>Before confirmation, checkout will show the applicable product prices, delivery fee, service fee, taxes, discounts and other charges. Fees may depend on distance, city, order size, delivery option, payment method, demand and vendor terms. A displayed estimate is not a guarantee until the order is confirmed.</p><p>Payments are processed by the selected payment provider. You authorise the applicable charge when you confirm an order. Failed, reversed, duplicated or disputed payments may be investigated and corrected. We may place a temporary authorisation or hold where supported by the payment provider.</p><p>Tips designated for a rider belong to that rider, subject to payment-provider corrections, lawful deductions and the rider agreement. Promotions are subject to their stated conditions and may be funded by usemarket, a vendor or a partner.</p></section>

      <section id="failed-deliveries"><h2>5. Failed deliveries, redelivery and returns</h2>
        <p><strong>5.1 Being available at drop-off.</strong> When you place an order, you agree to be reachable on the phone number on your account and available at the delivery address. When the rider arrives, they will mark their arrival. They will then wait up to 10 minutes and try to call you through the app. The app records the time of the rider's arrival, their calls and their waiting time.</p>
        <p><strong>5.2 When a delivery fails.</strong> If you can't be reached by the end of the waiting time, the rider may record the delivery as failed and take a photo of the delivery point as evidence. For 5 minutes after that, you can tap "I'm here" in the app, and the rider may come back to complete the delivery. After that, the rider may return the order to the vendor. The rider's delivery fee is still payable, because the rider made the trip.</p>
        <p><strong>5.3 Redelivery.</strong> While a failed order is on its way back to the vendor, you may ask for it to be delivered again. To do so, you must pay the return fee shown in the app. Once it is paid, the rider will bring the order back to you rather than returning it to the vendor. The return fee is charged only once for each failed delivery.</p>
        <p><strong>5.4 Return fee.</strong> When an order has to be taken back to the vendor, a return fee is charged to cover the rider's return trip. The fee is 50% of the order's delivery fee. Who pays it depends on the reason for the return:</p>
        <ul>
          <li><strong>The customer</strong> pays if they could not be reached or were not available, or if usemarket finds the return was otherwise the customer's fault.</li>
          <li><strong>The vendor</strong> pays if usemarket finds the vendor caused the return, for example with a wrong, incomplete or unfit order.</li>
          <li><strong>usemarket</strong> pays if nobody was at fault.</li>
          <li><strong>No fee is paid</strong> if the rider caused the return. In that case, the rider does not earn a return fee.</li>
        </ul>
        <p>Where the reason is not clear from the delivery record, usemarket's operations team will review the evidence and decide who caused the return. You can contact support to dispute a decision.</p>
        <p><strong>5.5 How customers pay return fees.</strong> You authorise usemarket to take return fees you owe from your usemarket wallet balance. If your balance is not enough, the remaining amount stays owed. It will be taken from your wallet when money is next added, including through a wallet top-up. We may restrict new orders until any return fee you owe has been paid.</p>
        <p><strong>5.6 Returned goods when the customer was unavailable.</strong> If an order is returned because you could not be reached or were not available:</p>
        <ul>
          <li><strong>Perishable goods</strong> (for example cooked food and fresh produce) cannot be resold, so the price of the goods and the delivery fee are not refunded.</li>
          <li><strong>Non-perishable goods</strong> are held by the vendor for 3 days. During that time, you may ask for the order to be delivered again by paying the full delivery fee again, plus any return fee you still owe. If you don't ask within 3 days, the order may be cancelled under the vendor's terms.</li>
        </ul>
        <p>Your rights for faulty, wrong or missing goods are not affected.</p>
        <p><strong>5.7 Vendor return fees.</strong> You authorise usemarket to take return fees that you, as a vendor, owe from your available order earnings. If your available earnings are not enough, the remaining amount stays owed and is taken from future earnings as they become available. When a rider returns an order to you, you must accept it and confirm the return with your pickup code.</p>
        <p><strong>5.8 Rider pay for failed deliveries and returns.</strong> A rider who follows the failed-delivery steps receives the delivery fee for that order. They also receive the return fee when they return it to the vendor, unless the return was the rider's own fault. If one return trip covers several vendors, the return fee is split between those vendors' stops.</p>
      </section>

      <section id="conduct"><h2>6. Acceptable use</h2><p>You must use usemarket lawfully and honestly. You must not submit fraudulent orders, abuse refunds, redelivery or promotions, impersonate another person, interfere with delivery, harass or threaten a customer, vendor or rider, upload malware, scrape the platform, bypass security, manipulate ratings, sell prohibited goods or use the platform to facilitate crime.</p><p>We may refuse an order, remove content, restrict a feature or suspend an account where we reasonably believe these terms, safety requirements or applicable law have been breached.</p></section>

      <section id="content"><h2>7. Content, feedback and intellectual property</h2><p>usemarket and its licensors own the platform, software, branding, designs and content that we provide. You receive a limited, revocable, non-transferable permission to use them for their intended purpose.</p><p>You retain ownership of content you submit, but grant us a non-exclusive, worldwide, royalty-free licence to host, reproduce, adapt and display it as needed to operate, promote and improve the platform. You promise that you have the rights and permissions required for that content.</p></section>

      <section id="suspension"><h2>8. Suspension and termination</h2><p>You may stop using the platform at any time, subject to outstanding orders, payments, returns or return fees owed under section 5, or investigations. We may suspend or terminate access immediately for fraud, safety risks, non-payment, unlawful conduct, repeated service failures, inaccurate information or breach of these terms. We may also pause a service or city for operational, legal or security reasons.</p><p>Clauses intended to survive termination—including payment obligations, confidentiality, intellectual property, indemnities, liability limits and dispute provisions—will continue.</p></section>

      <section id="liability"><h2>9. Disclaimers, liability and indemnity</h2><p>We aim to provide a reliable service but do not promise that the platform, vendor inventory, delivery estimates or communications will always be uninterrupted, current, secure or error-free. We do not guarantee the quality, safety, legality or availability of a vendor's product except to the extent we expressly say otherwise.</p><p>To the maximum extent permitted by Nigerian law, usemarket is not liable for indirect, incidental, special or consequential loss, loss of profits or loss of data arising from use of the platform. Nothing in these terms excludes liability that cannot lawfully be excluded, including liability for fraud, wilful misconduct or applicable consumer rights.</p><p>You agree to compensate usemarket for losses, claims and reasonable costs caused by your breach of these terms, unlawful conduct, negligence or infringement of another person's rights.</p></section>

      <section id="disputes"><h2>10. Governing law and disputes</h2><p>These terms are governed by the laws of the Federal Republic of Nigeria. We encourage you to contact support first so we can investigate and resolve complaints. If a dispute cannot be resolved informally, it may be submitted to a court or other lawful dispute-resolution forum with jurisdiction in Nigeria.</p><p>We may update these terms when the platform, law or business changes. We will post the updated version and, where required, ask for renewed acceptance. If a change materially affects an active agreement, we will provide reasonable notice.</p><p>Questions and complaints: <a href="mailto:legal@usemarket.store">legal@usemarket.store</a> or <a href="mailto:support@usemarket.store">support@usemarket.store</a>.</p></section>
    </div></div>
  </LegalLayout>;
}
