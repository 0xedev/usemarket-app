import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "../LegalLayout";

export const metadata: Metadata = {
  title: "Rider terms",
  description:
    "Read usemarket's rider terms for eligibility, delivery duties, safety, handovers, earnings, tips and account conduct.",
  alternates: { canonical: "/terms/riders" },
  openGraph: {
    type: "website",
    siteName: "usemarket",
    locale: "en_NG",
    url: "/terms/riders",
    title: "usemarket Rider Terms",
    description:
      "Terms for rider eligibility, safe delivery work, handovers, earnings and tips on usemarket.",
  },
  twitter: {
    card: "summary",
    title: "usemarket Rider Terms",
    description:
      "Terms for rider eligibility, safe delivery work, handovers, earnings and tips on usemarket.",
  },
};

const sections = [["#eligibility", "Eligibility"], ["#deliveries", "Delivery duties"], ["#safety", "Safety"], ["#handover", "Cash, PIN and returns"], ["#earnings", "Earnings and tips"], ["#insurance", "Insurance and taxes"], ["#conduct", "Conduct"], ["#status", "Independent contractor"]] as Array<[string, string]>;

export default function RiderTermsPage() {
  return <LegalLayout kicker="Rider agreement" title="Deliver with clarity" intro="These Rider Terms apply when you register for, accept or complete delivery work through usemarket. They are designed to make expectations, safety and earnings clear." index={sections}>
    <div className="legal-grid"><div><nav className="legal-index"><Link href="/terms">General terms</Link><Link href="/terms/customers">Customer terms</Link><Link href="/terms/vendors">Vendor agreement</Link></nav></div><div className="legal-content">
      <div className="legal-note"><p>Safety comes first. You may decline or stop a delivery that is unsafe, unlawful or materially different from the accepted job. Contact rider support immediately so we can document and resolve it.</p></div>
      <section id="eligibility"><h2>1. Eligibility and documents</h2><p>You must be at least 18 and provide accurate identity, phone, bank, vehicle and emergency-contact information. Before activation and during your time on the platform, you must maintain any required identity document, driving licence, vehicle registration, roadworthiness evidence, third-party insurance, permits and other lawful requirements for your vehicle and location.</p><p>We may conduct verification, background or safety checks where lawful. You must not let another person use your rider account, vehicle credentials or equipment.</p></section>
      <section id="deliveries"><h2>2. Accepting and completing deliveries</h2><p>Review the pickup, delivery area, estimated earnings, special instructions and any cash or PIN requirement before accepting. Once accepted, travel lawfully to the vendor, verify the order, keep the package secure, follow the route and provide accurate status updates.</p><p>Do not open, consume, exchange, resell or tamper with a package. Report a vendor closure, missing item, damaged package, wrong order, failed pickup, unsafe route, customer issue or reassignment through the rider tools instead of improvising an off-platform solution.</p></section>
      <section id="safety"><h2>3. Safety and lawful conduct</h2><p>Obey traffic rules, use required protective equipment, do not use a phone in a way that makes riding unsafe, and never ride under the influence of alcohol or drugs. Do not speed or make illegal stops to meet an estimate. You may pause availability or decline work if you are tired, unwell, your vehicle is unsafe or the conditions are dangerous.</p><p>Protect customer and vendor information. Do not photograph, share or use addresses, phone numbers, order contents or location data for any purpose outside the delivery. Report accidents, threats, theft, harassment or emergencies immediately to emergency services where necessary and then to usemarket.</p></section>
      <section id="handover"><h2>4. Cash, PINs, handover and returns</h2><p>Collect cash only when the order explicitly requires it, count it in the customer's presence and record it accurately. Never request an unofficial fee. Ask for the delivery PIN only at the correct handover and do not mark an order complete without the required proof.</p><p>If delivery fails, keep the package safe, follow the return or redelivery instructions and obtain server-confirmed return or completion evidence. You must not abandon, discard or privately keep an order. Any cash, package or equipment reconciliation must be completed within the stated time.</p></section>
      <section id="earnings"><h2>5. Earnings, adjustments and tips</h2><p>The rider app will show the applicable delivery earnings, incentives, adjustments and any customer-funded amount before or after completion, depending on the job type. Earnings can be corrected for cancellations, fraud, duplicate records, cash variance or a customer refund after investigation.</p><p>Rider tips are 100% allocated to the rider, subject only to payment-provider corrections, lawful deductions, chargebacks or mistaken payments. We will explain material holds, reversals or adjustments and provide a route to dispute them.</p></section>
      <section id="insurance"><h2>6. Insurance, costs and taxes</h2><p>You are responsible for maintaining legally required vehicle and personal cover unless a separate written usemarket programme expressly provides otherwise. You are responsible for fuel, maintenance, data, licences, taxes and other operating costs associated with your chosen delivery method.</p><p>If usemarket offers an accident, equipment or other benefit, its scope, eligibility, exclusions and claim process will be stated separately. It does not replace legally required insurance.</p></section>
      <section id="conduct"><h2>7. Misconduct and account action</h2><p>Fraud, theft, package tampering, harassment, discrimination, threats, unsafe driving, false completion, cash diversion, location spoofing, account sharing, off-platform solicitation or retaliation against a customer, vendor or support worker is prohibited.</p><p>We may temporarily pause an account while investigating a safety, fraud or payment issue. We may permanently remove access for serious or repeated misconduct, subject to applicable law and any dispute process communicated to you.</p></section>
      <section id="status"><h2>8. Independent contractor relationship</h2><p>Unless you and usemarket sign a separate written employment agreement, you provide delivery services as an independent contractor or independent service provider. You choose when to make yourself available, may decline work before acceptance, and are responsible for your own business, tax, equipment and legal obligations.</p><p>Nothing in these terms creates employment, partnership, agency, exclusivity or a guaranteed minimum number of deliveries. You must not represent that you can bind usemarket, a vendor or a customer.</p></section>
    </div></div>
  </LegalLayout>;
}
