import { FaqSection } from "@/features/home/components/faq-section";
import { AdBanner } from "@/components/ads/ad-banner";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/features/home/data/landing-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getFaqPageJsonLd, getWebPageJsonLd } from "@/lib/seo/json-ld";
import { getSeoPage } from "@/lib/seo/pages";

export const metadata = createPageMetadata("faq");

export default function FaqPage() {
  const page = getSeoPage("faq");

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd("faq", page.title, page.description, page.path),
          getFaqPageJsonLd(faqs),
        ]}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/faq" },
          ]}
          className="mb-4"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        <AdBanner slotKey="faq" />
      </div>
      <FaqSection />
      <div className="container mx-auto px-4 pb-8 sm:px-6">
        <AdBanner slotKey="faq" />
      </div>
    </>
  );
}
