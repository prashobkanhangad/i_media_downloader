import { SeoDownloaderPage } from "@/components/seo/seo-downloader-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("photos");

export default function PhotosPage() {
  return (
    <SeoDownloaderPage
      pageKey="photos"
      heading="Instagram Photo Downloader"
      subheading="Save Instagram photos and images in full resolution. Paste a post link to download instantly."
    />
  );
}
