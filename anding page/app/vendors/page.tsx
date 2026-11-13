import { InformationPage } from "../_components/InformationPage";
import { getInfoPage } from "../../lib/content";
import { pageMetadata } from "../../lib/site";

const page = getInfoPage("/vendors");
export const metadata = pageMetadata(page.path, "Sell Online with the Vendor App", page.description);
export default function Page() { return <InformationPage page={page} />; }
