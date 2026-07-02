import Link from "next/link";
import { notFound } from "next/navigation";

import { AdBanner } from "@/components/ads/ad-banner";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { GlassCard } from "@/components/ui/glass-card";
import { blogPosts, getBlogPost } from "@/lib/seo/blog-posts";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getBlogPostingJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site-config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return createPageMetadata("blog", {
    title: post.title,
    description: post.description,
    alternates: { canonical: getSiteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      publishedTime: post.datePublished,
      title: post.title,
      description: post.description,
      url: getSiteUrl(`/blog/${post.slug}`),
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          getBlogPostingJsonLd(post),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
          className="mb-8"
        />

        <header className="mb-8">
          <time
            dateTime={post.datePublished}
            className="text-sm text-muted-foreground"
          >
            {new Date(post.datePublished).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readTime}
          </time>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {post.description}
          </p>
        </header>

        <AdBanner slotKey="blogPost" className="mb-8" />

        <GlassCard className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Full article content coming soon. In the meantime, use our{" "}
            <Link
              href="/"
              className="text-primary underline-offset-4 hover:underline"
            >
              free Instagram downloader
            </Link>{" "}
            to save reels, videos, photos, and stories.
          </p>
        </GlassCard>

        <AdBanner slotKey="blogPost" className="mt-8" />

        <div className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}
