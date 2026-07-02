export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-download-instagram-reels",
    title: "How to Download Instagram Reels in HD Quality",
    description:
      "A step-by-step guide to saving Instagram Reels to your device using our free online downloader.",
    datePublished: "2025-06-15",
    readTime: "4 min read",
  },
  {
    slug: "save-instagram-stories",
    title: "How to Save Instagram Stories Before They Expire",
    description:
      "Learn how to download Instagram stories from public accounts quickly and easily.",
    datePublished: "2025-06-01",
    readTime: "3 min read",
  },
  {
    slug: "instagram-photo-download-guide",
    title: "Complete Guide to Downloading Instagram Photos",
    description:
      "Everything you need to know about saving Instagram images in full resolution.",
    datePublished: "2025-05-20",
    readTime: "5 min read",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
