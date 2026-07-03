import { getAllBlogs } from "@/lib/blog";
import { buildRssFeed } from "@/lib/blog/seo";

export async function GET() {
  const feed = buildRssFeed(getAllBlogs());

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
