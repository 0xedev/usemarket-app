import { InformationPage } from "../_components/InformationPage";
import { getInfoPage } from "../../lib/content";
import { pageMetadata } from "../../lib/site";

const page = getInfoPage("/faq");
export const metadata = pageMetadata(page.path, "Food, Grocery & Delivery FAQs", page.description);
export default function Page() { return <InformationPage page={page} />; }
