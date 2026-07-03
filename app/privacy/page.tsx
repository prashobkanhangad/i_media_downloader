import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/lib/legal/content";
import { createPageMetadata } from "@/lib/seo/metadata";

const page = getLegalPage("privacy");

export const metadata = createPageMetadata("privacy", undefined, {
  path: page.path,
});

export default function PrivacyPage() {
  return <LegalPage page={page} />;
}
