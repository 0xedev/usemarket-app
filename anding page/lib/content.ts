export type InfoSection = { title: string; paragraphs: string[]; links?: [string, string][] };
export type InfoPage = {
  path: string; label: string; title: string; description: string; intro: string;
  eyebrow: string; sections: InfoSection[];
};

export const FAQs = [
  { question: "What is usemarket?", answer: "usemarket is a Nigerian local commerce platform operated by USEMARKET LTD. Customers order food, groceries, pharmacy essentials and everyday goods from nearby vendors, and riders deliver the orders. The slogan is market without stress." },
  { question: "Where does usemarket deliver?", answer: "usemarket serves Ibadan in Oyo State, Akure in Ondo State, and Sango Ota in Ogun State. Enter your delivery address in the customer app to check the shops and delivery options available for your location. Coverage depends on the address and participating vendors." },
  { question: "How do I order from usemarket?", answer: "Download the usemarket customer app from Google Play, set your delivery address, choose a shop, add your items and review checkout. You can also start an order through the official usemarket WhatsApp chat linked on this website." },
  { question: "Can I order on WhatsApp without downloading the app?", answer: "Yes. Open the official WhatsApp ordering link on this website and send your shopping list. Provide the delivery details requested in the chat and review the order details before confirming." },
  { question: "What can I buy on usemarket?", answer: "You can shop foodstuff, groceries, prepared meals, pharmacy essentials and everyday household goods from participating local vendors. Products and stock vary by shop and delivery address." },
  { question: "How much does delivery cost?", answer: "Check the charges shown for your order before confirming it. Delivery charges and available options depend on the order and delivery location. This website does not quote a single delivery price for every address." },
  { question: "How long does a delivery take?", answer: "Delivery timing depends on the shop, preparation, delivery distance and rider availability. Check the current estimate for your order. usemarket does not promise one fixed delivery time for every order." },
  { question: "How do I become a usemarket vendor?", answer: "Download the usemarket vendor app from Google Play, create your vendor account and complete the requested shop and verification details. Review the vendor terms and current commercial terms before accepting orders." },
  { question: "How do I join usemarket as a rider?", answer: "Download the usemarket rider app from Google Play and complete the account, document and verification steps requested in the app. Review the rider terms. Delivery availability depends on your approved account and operating area." },
  { question: "How can I get help with an order?", answer: "Email support@usemarket.store with your order reference, the issue and any useful details. Read the customer terms for cancellations, refunds and failed deliveries. Never send your password, OTP or full card details." },
];

export const INFO_PAGES: InfoPage[] = [
  {
    path: "/about", label: "About usemarket", eyebrow: "Our market, online",
    title: "Local shopping. Local businesses. One usemarket.",
    description: "Meet usemarket, the Nigerian local commerce platform connecting shoppers, vendors and riders in Ibadan, Akure and Sango Ota. Operated by USEMARKET LTD.",
    intro: "usemarket is a Nigerian local commerce platform operated by USEMARKET LTD. We bring nearby shops, customers and delivery riders together so you can get everyday shopping delivered. Market without stress.",
    sections: [
      { title: "What we do", paragraphs: ["Customers shop foodstuff, groceries, hot meals, pharmacy essentials and everyday goods from participating local vendors. A rider collects the order and brings it to the customer's delivery address.", "The customer app is available on Google Play. Customers can also start an order through our official WhatsApp chat. Vendors and riders have separate Android apps for their work."], links: [["/how-it-works", "See how ordering works"]] },
      { title: "Built around the shops near you", paragraphs: ["usemarket is a marketplace connecting customers with local vendors; it is not one supermarket catalogue. Each shop manages what it sells. Product selection and availability depend on the vendors serving your address.", "Our service cities are Ibadan, Akure and Sango Ota. Enter your delivery address in the customer app to see the shops available to you."], links: [["/delivery-areas", "Check our delivery areas"]] },
      { title: "Three sides of one market", paragraphs: ["For customers, usemarket brings local shopping to the phone. For vendors, it provides a way to list products and receive orders. For riders, it provides delivery opportunities through the rider app.", "The price, delivery details and terms for a particular order should be reviewed before confirmation. Contact support if anything is unclear."], links: [["/vendors", "Sell on usemarket"], ["/riders", "Deliver with usemarket"]] },
      { title: "The company behind usemarket", paragraphs: ["usemarket is operated by USEMARKET LTD. Our business address is Area 1, Providence Estate, Eleyele, Ibadan, Oyo State, Nigeria.", "For customer support, contact support@usemarket.store. For legal questions, contact legal@usemarket.store. This website and the app links provided here are the starting points for finding our services."], links: [["/contact", "Contact usemarket"], ["/terms", "Read our terms"]] },
    ],
  },
  {
    path: "/how-it-works", label: "How it works", eyebrow: "From shop to doorstep",
    title: "How to order on usemarket.",
    description: "Learn how to order food, groceries and everyday goods on usemarket through the Android customer app or WhatsApp, from choosing a shop to delivery.",
    intro: "Order from nearby vendors in the usemarket customer app, or send your list through our official WhatsApp chat. Here is what to check before placing your order.",
    sections: [
      { title: "1. Start with your delivery address", paragraphs: ["Download the customer app using the Google Play link on this site. Set your delivery address so the app can show shops serving that location. A city name alone does not confirm that every address is covered.", "Check that your address and contact details are correct. These details help the rider find you and contact you about the delivery."], links: [["/delivery-areas", "See delivery coverage"]] },
      { title: "2. Choose your shop and items", paragraphs: ["Browse participating vendors and add the products you need. You may find foodstuff, groceries, prepared meals, pharmacy essentials and household goods, depending on the vendors near you.", "Check product descriptions, quantities and availability. Shops manage their own catalogues, so the items offered can differ between vendors."] },
      { title: "3. Review before you confirm", paragraphs: ["Review the items, quantities, delivery address, charges and available payment options shown for your order. Follow the payment and confirmation instructions in the app or official ordering conversation.", "Delivery estimates depend on preparation, distance and rider availability. Check the estimate for your order rather than assuming a fixed delivery time."], links: [["/terms/customers", "Read the customer terms"]] },
      { title: "4. Receive your delivery", paragraphs: ["The vendor prepares the order and a rider brings it to your delivery address. Keep your phone available for order and delivery updates.", "If you need help, contact support with your order reference. Cancellation, refund and failed-delivery rules are explained in the customer and general terms."], links: [["/contact", "Get order support"]] },
      { title: "Prefer WhatsApp? Send your list.", paragraphs: ["Use the official WhatsApp link on this website. Send what you need and provide the delivery details requested in the chat. Review the items and charges before confirming your order.", "Do not share your password, OTP or full card details in a message. If you are unsure whether a message is from usemarket, contact support@usemarket.store."], links: [["https://wa.me/message/JQ5GZ2TAK6JFA1", "Start an order on WhatsApp"]] },
    ],
  },
  {
    path: "/delivery-areas", label: "Delivery areas", eyebrow: "Close to home",
    title: "usemarket delivery in Ibadan, Akure and Sango Ota.",
    description: "Check usemarket service cities: Ibadan, Oyo State; Akure, Ondo State; and Sango Ota, Ogun State. Confirm address-level shop and delivery availability in the app.",
    intro: "usemarket serves three Nigerian cities: Ibadan, Akure and Sango Ota. Shops and delivery options depend on your exact address, so start by entering it in the customer app.",
    sections: [
      { title: "Ibadan, Oyo State", paragraphs: ["Order from participating local vendors serving your Ibadan address. Browse the customer app for foodstuff, groceries, meals and everyday essentials available near you.", "Our business address is Area 1, Providence Estate, Eleyele, Ibadan, Oyo State. This is a company contact address, not a promise that every shop offers collection there."] },
      { title: "Akure, Ondo State", paragraphs: ["Customers in Akure can use the customer app to find participating shops serving their location. Vendors receive orders through the vendor app, while riders handle local deliveries.", "Enter your delivery address to check current shop availability. Being in Akure does not mean every product or delivery option is available at every address."] },
      { title: "Sango Ota, Ogun State", paragraphs: ["usemarket also serves Sango Ota, sometimes written Sango-Ota or Ota. Select your delivery address to see participating vendors and the options offered for that location.", "Check the order's charges and delivery estimate before confirming. Availability depends on local vendors and delivery coverage."] },
      { title: "How to check your address", paragraphs: ["Open the customer app, enter your address and browse the available shops. If you prefer WhatsApp, share your shopping needs and delivery area through the official ordering link.", "If you cannot find a shop serving your address, contact support. This page does not imply nationwide coverage, full coverage of each state, or a guaranteed delivery time."], links: [["/how-it-works", "Start your first order"], ["/contact", "Ask about coverage"]] },
    ],
  },
  {
    path: "/vendors", label: "For vendors", eyebrow: "Keep your shop. Reach more people.",
    title: "Sell through the usemarket vendor app.",
    description: "Join usemarket as a local vendor in Ibadan, Akure or Sango Ota. Use the Android vendor app to list products, receive orders and manage your shop.",
    intro: "usemarket helps participating local vendors list what they sell and receive customer orders. Download the vendor app to start your shop onboarding.",
    sections: [
      { title: "Who the vendor app is for", paragraphs: ["The marketplace includes food vendors, local market sellers, supermarkets, frozen-food shops, pharmacies and everyday-goods stores. Customers see shops serving their delivery address.", "The vendor app is separate from the customer app. Use the vendor Google Play link below when setting up a shop."] },
      { title: "Set up your shop", paragraphs: ["Create your vendor account and complete the shop information and verification steps requested in the app. Supply accurate business, contact and location details.", "Complete any category-specific requirements requested during onboarding. For example, pharmacy onboarding requires appropriate licence verification. Submitting details does not by itself guarantee activation."], links: [["/terms/vendors", "Review vendor requirements and terms"]] },
      { title: "Build a catalogue customers can use", paragraphs: ["Add your products, clear names, prices, quantities and product pictures in the app. Keep your catalogue and availability up to date so customers can make informed choices.", "A useful catalogue describes what the customer will receive. Avoid listing unavailable items or using descriptions that do not match the product."] },
      { title: "Receive and prepare orders", paragraphs: ["New orders arrive through the vendor app. Follow the order instructions, prepare the items and hand them over for delivery according to the app's process.", "Use the app to follow orders and sales. Review the current commission, payment and settlement terms presented to your account; this page does not replace those commercial terms."], links: [["/contact", "Get help with vendor onboarding"], ["/delivery-areas", "See service cities"]] },
    ],
  },
  {
    path: "/riders", label: "For riders", eyebrow: "Your next delivery starts here",
    title: "Deliver with the usemarket rider app.",
    description: "Join usemarket as a delivery rider in Ibadan, Akure or Sango Ota. Learn about the Android rider app, onboarding, delivery offers and support.",
    intro: "The usemarket rider app connects approved riders with delivery opportunities in supported operating areas. Download the rider app and complete onboarding to get started.",
    sections: [
      { title: "Use the app made for riders", paragraphs: ["The rider app is separate from the customer and vendor apps. It is used for delivery offers and delivery work, rather than shopping or managing a vendor catalogue.", "usemarket's service cities are Ibadan, Akure and Sango Ota. Available work depends on your approved operating area and delivery demand; signing up is not a guarantee of a fixed number of jobs."] },
      { title: "Complete onboarding and verification", paragraphs: ["Create your rider account and submit the personal, vehicle and document information requested in the app. Follow the verification steps and keep your details current.", "Read the rider terms before taking delivery work. An account must meet the applicable requirements before it can receive deliveries."], links: [["/terms/riders", "Read the rider terms"]] },
      { title: "Check the offer, then deliver", paragraphs: ["Review the pickup point, delivery area and estimated earnings displayed for an offer before accepting it. Follow the pickup and handoff steps in the app.", "Keep your phone available during a delivery and follow the app's location instructions. If a pickup or delivery cannot be completed, use the support process rather than marking the job complete."] },
      { title: "Understand earnings and get help", paragraphs: ["Delivery earnings and tips are shown in the rider app. Review the current payout and delivery terms that apply to your account. This page does not promise a fixed income.", "For an account, onboarding or delivery problem, email support@usemarket.store with the relevant reference and a clear description. Do not include your OTP or password."], links: [["/contact", "Contact rider support"], ["/terms", "Read failed-delivery and return rules"]] },
    ],
  },
  {
    path: "/faq", label: "Questions & answers", eyebrow: "A few things worth knowing",
    title: "Your usemarket questions, answered.",
    description: "Answers about usemarket delivery areas, food and grocery ordering, WhatsApp shopping, delivery charges, vendor onboarding, rider sign-up and customer support.",
    intro: "New to usemarket? Find answers about ordering, delivery and joining the platform below. The details shown for your order and the current terms remain the place to check specific charges and conditions.",
    sections: FAQs.map(({question, answer}) => ({title: question, paragraphs: [answer]})),
  },
  {
    path: "/contact", label: "Contact & support", eyebrow: "Let's sort it out",
    title: "Contact usemarket.",
    description: "Get usemarket customer, vendor and rider support at support@usemarket.store. Find the official WhatsApp ordering link and USEMARKET LTD's Ibadan business address.",
    intro: "For help with an order, a vendor shop or a rider account, email support@usemarket.store. Include the relevant reference and a short explanation so the team can identify the issue.",
    sections: [
      { title: "Help with an order", paragraphs: ["Include your order reference, what went wrong and any useful details. Never send your password, OTP or full card details. If an order is still in progress, check the current information in the app.", "For cancellations, refunds, failed deliveries or returns, read the customer and general terms. Sending a support request does not by itself confirm a refund or cancellation."], links: [["mailto:support@usemarket.store", "Email customer support"], ["/terms/customers", "Customer terms"], ["/terms", "General terms"]] },
      { title: "Vendor and rider support", paragraphs: ["For vendor onboarding, catalogue or order issues, explain the problem and include your shop or order reference where available. Riders should include the relevant delivery or account reference.", "Do not send identity documents to an unverified contact. Follow the document submission process requested by the official app."], links: [["/vendors", "Vendor onboarding guide"], ["/riders", "Rider onboarding guide"]] },
      { title: "Ordering on WhatsApp", paragraphs: ["Use the official link below to start a shopping conversation with usemarket. Send your shopping list and provide delivery details when requested.", "Check the order information before confirming. To verify an unexpected message or contact, email support@usemarket.store."], links: [["https://wa.me/message/JQ5GZ2TAK6JFA1", "Open official WhatsApp ordering"]] },
      { title: "Business and legal information", paragraphs: ["Operator: USEMARKET LTD. Business address: Area 1, Providence Estate, Eleyele, Ibadan, Oyo State, Nigeria.", "Legal contact: legal@usemarket.store. This is a business correspondence address; do not assume it is a customer collection point or a shop opening to walk-in visits."], links: [["mailto:legal@usemarket.store", "Email legal enquiries"], ["https://policy.usemarket.store", "Privacy policy"]] },
    ],
  },
];

export function getInfoPage(path: string): InfoPage {
  const page = INFO_PAGES.find(page => page.path === path);
  if (!page) throw new Error(`Unknown information page: ${path}`);
  return page;
}
