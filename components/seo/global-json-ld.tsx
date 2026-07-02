import { JsonLd } from "@/components/seo/json-ld";
import {
  getOrganizationJsonLd,
  getWebApplicationJsonLd,
  getWebSiteJsonLd,
} from "@/lib/seo/json-ld";

export function GlobalJsonLd() {
  return (
    <JsonLd
      data={[
        getOrganizationJsonLd(),
        getWebSiteJsonLd(),
        getWebApplicationJsonLd(),
      ]}
    />
  );
}
