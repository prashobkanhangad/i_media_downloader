import Link from "next/link";
import { notFound } from "next/navigation";

import { AdBanner } from "@/components/ads/ad-banner";
import {
  AuthorCard,
  BlogBreadcrumb,
  BlogPostNavigation,
  BlogSidebar,
  ReadingTime,
  RelatedPosts,
  ShareButtons,
  TagBadge,
} from "@/components/blog";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAdjacentBlogs,
  getAllBlogSlugs,
  getBlogBySlug,
  getCategories,
  getRecentBlogs,
  getRelatedBlogs,
} from "@/lib/blog";
import { BlogMdxContent as MdxRenderer } from "@/lib/blog/mdx-content";
import { createBlogPostMetadata } from "@/lib/blog/seo";
import { formatBlogDate, slugify } from "@/lib/blog/utils";
import {
  getBlogPostingJsonLd,
  getBreadcrumbJsonLd,
  getFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site-config";
import { GlassCard } from "@/components/ui/glass-card";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return createBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedBlogs(slug);
  const recentPosts = getRecentBlogs().filter((item) => item.slug !== slug);
  const categories = getCategories();
  const adjacent = getAdjacentBlogs(slug);
  const canonicalUrl = getSiteUrl(`/blog/${post.slug}`);

  const jsonLd: Record<string, unknown>[] = [
    getBlogPostingJsonLd(post),
    getBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  if (post.faq?.length) {
    jsonLd.push(getFaqPageJsonLd(post.faq));
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <article className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <BlogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <header className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link
                  href={`/blog/category/${slugify(post.category)}`}
                  className="font-medium text-violet-600 hover:underline dark:text-violet-400"
                >
                  {post.category}
                </Link>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                <span aria-hidden>·</span>
                <ReadingTime
                  minutes={post.readingMinutes}
                  label={post.readingTime}
                />
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </header>

            <AdBanner slotKey="blogPost" className="mt-8" />

            <GlassCard className="mt-8 p-6 sm:p-8">
              <MdxRenderer source={post.content} />
            </GlassCard>

            <div className="mt-8">
              <AuthorCard author={post.author} />
            </div>

            <div className="mt-8">
              <ShareButtons url={canonicalUrl} title={post.title} />
            </div>

            <AdBanner slotKey="blogPost" className="mt-8" />

            <BlogPostNavigation adjacent={adjacent} className="mt-10" />

            <RelatedPosts posts={relatedPosts} className="mt-12" />
          </div>

          <BlogSidebar
            recentPosts={recentPosts}
            categories={categories}
            headings={post.headings}
            className="lg:sticky lg:top-24"
          />
        </div>
      </article>
    </>
  );
}
