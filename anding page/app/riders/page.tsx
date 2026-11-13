import { InformationPage } from "../_components/InformationPage";
import { getInfoPage } from "../../lib/content";
import { pageMetadata } from "../../lib/site";

const page = getInfoPage("/riders");
export const metadata = pageMetadata(page.path, "Join as a Delivery Rider", page.description);
export default function Page() { return <InformationPage page={page} />; }
