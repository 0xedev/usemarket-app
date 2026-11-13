import { InformationPage } from "../_components/InformationPage";
import { getInfoPage } from "../../lib/content";
import { pageMetadata } from "../../lib/site";

const page = getInfoPage("/delivery-areas");
export const metadata = pageMetadata(page.path, "Delivery in Ibadan, Akure & Sango Ota", page.description);
export default function Page() { return <InformationPage page={page} />; }
