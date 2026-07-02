import { UrlDownloadSection } from "@/components/download/url-download-section";
import { AdBanner } from "@/components/ads/ad-banner";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import type { SeoPageKey } from "@/lib/seo/pages";
import { getSeoPage } from "@/lib/seo/pages";
import { cn } from "@/lib/utils";

interface SeoDownloaderPageProps {
  pageKey: SeoPageKey;
  heading?: string;
  subheading?: string;
  className?: string;
}

export function SeoDownloaderPage({
  pageKey,
  heading,
  subheading,
  className,
}: SeoDownloaderPageProps) {
  const page = getSeoPage(pageKey);
  const title = heading ?? page.title.split("—")[0]?.trim() ?? page.title;
  const description = subheading ?? page.description;

  const breadcrumbs =
    pageKey === "home"
      ? undefined
      : [
          { name: "Home", path: "/" },
          { name: title, path: page.path },
        ];

  return (
    <>
      <PageJsonLd pageKey={pageKey} breadcrumbs={breadcrumbs} />
      <section
        className={cn(
          "container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16",
          className,
        )}
      >
        {pageKey !== "home" && (
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: title, href: page.path },
            ]}
            className="mb-8"
          />
        )}

        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        </header>

        <AdBanner slotKey="downloaderTop" className="mb-8" />

        <UrlDownloadSection variant="hero" showIdleResult />

        <AdBanner slotKey="downloaderBottom" className="mt-8" />
      </section>
    </>
  );
}
