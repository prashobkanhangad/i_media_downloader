import { SeoDownloaderPage } from "@/components/seo/seo-downloader-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("stories");

export default function StoriesPage() {
  return (
    <SeoDownloaderPage
      pageKey="stories"
      heading="Instagram Story Downloader"
      subheading="Download Instagram stories before they disappear. Save story videos and photos from public accounts."
    />
  );
}
