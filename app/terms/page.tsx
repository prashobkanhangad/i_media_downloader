import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/lib/legal/content";
import { createPageMetadata } from "@/lib/seo/metadata";

const page = getLegalPage("terms");

export const metadata = createPageMetadata("terms", undefined, {
  path: page.path,
});

export default function TermsPage() {
  return <LegalPage page={page} />;
}
