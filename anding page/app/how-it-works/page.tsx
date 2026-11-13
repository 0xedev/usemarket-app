import { InformationPage } from "../_components/InformationPage";
import { getInfoPage } from "../../lib/content";
import { pageMetadata } from "../../lib/site";

const page = getInfoPage("/how-it-works");
export const metadata = pageMetadata(page.path, "How to Order Food & Groceries", page.description);
export default function Page() { return <InformationPage page={page} />; }
