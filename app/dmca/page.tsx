import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/lib/legal/content";
import { createPageMetadata } from "@/lib/seo/metadata";

const page = getLegalPage("dmca");

export const metadata = createPageMetadata("dmca", undefined, {
  path: page.path,
});

export default function DmcaPage() {
  return <LegalPage page={page} />;
}
