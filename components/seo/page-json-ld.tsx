import { JsonLd } from "@/components/seo/json-ld";
import {
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
  type SeoPageKey,
} from "@/lib/seo";
import { getSeoPage } from "@/lib/seo/pages";

interface PageJsonLdProps {
  pageKey: SeoPageKey;
  breadcrumbs?: { name: string; path: string }[];
}

export function PageJsonLd({ pageKey, breadcrumbs }: PageJsonLdProps) {
  const page = getSeoPage(pageKey);

  const schemas: Record<string, unknown>[] = [
    getWebPageJsonLd(pageKey, page.title, page.description, page.path),
  ];

  if (breadcrumbs?.length) {
    schemas.push(getBreadcrumbJsonLd(breadcrumbs));
  }

  return <JsonLd data={schemas} />;
}
