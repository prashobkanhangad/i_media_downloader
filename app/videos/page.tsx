import { SeoDownloaderPage } from "@/components/seo/seo-downloader-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("videos");

export default function VideosPage() {
  return (
    <SeoDownloaderPage
      pageKey="videos"
      heading="Instagram Video Downloader"
      subheading="Download videos from Instagram posts and IGTV in the highest available quality. Works on all devices."
    />
  );
}
