import { LandingPage } from "@/features/home";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <PageJsonLd pageKey="home" />
      <LandingPage />
    </>
  );
}
