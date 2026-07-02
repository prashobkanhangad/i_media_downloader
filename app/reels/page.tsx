import { SeoDownloaderPage } from "@/components/seo/seo-downloader-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("reels");

export default function ReelsPage() {
  return (
    <SeoDownloaderPage
      pageKey="reels"
      heading="Instagram Reels Downloader"
      subheading="Paste any Instagram Reel link below and download it in HD quality — free, fast, and no login required."
    />
  );
}
