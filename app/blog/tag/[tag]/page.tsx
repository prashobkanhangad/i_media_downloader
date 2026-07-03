import { notFound } from "next/navigation";

import {
  BlogBreadcrumb,
  BlogCard,
  BlogEmptyState,
  BlogPagination,
  BlogSidebar,
} from "@/components/blog";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAllTagSlugs,
  getBlogsByTag,
  getCategories,
  getRecentBlogs,
  getTagBySlug,
  paginateBlogs,
} from "@/lib/blog";
import { createTagMetadata } from "@/lib/blog/seo";
import { getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo/json-ld";

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const tagData = getTagBySlug(tag);
  if (!tagData) return {};
  return createTagMetadata(tagData.name, tagData.slug);
}

export default async function BlogTagPage({
  params,
  searchParams,
}: TagPageProps) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;
  const tagData = getTagBySlug(tag);

  if (!tagData) notFound();

  const page = Number(pageParam ?? "1");
  const posts = paginateBlogs(getBlogsByTag(tag), page);

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd(
            "blog",
            `#${tagData.name} Articles`,
            `Articles tagged with ${tagData.name}.`,
            `/blog/tag/${tag}`,
          ),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: `#${tagData.name}`, path: `/blog/tag/${tag}` },
          ]),
        ]}
      />

      <section className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <BlogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: `#${tagData.name}`, href: `/blog/tag/${tag}` },
          ]}
        />

        <header className="max-w-3xl">
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
            Tag
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            #{tagData.name}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {tagData.count} article{tagData.count === 1 ? "" : "s"}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            {posts.items.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {posts.items.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <BlogEmptyState
                title="No articles with this tag"
                description="Check back later for new posts."
              />
            )}

            <BlogPagination
              page={posts.page}
              totalPages={posts.totalPages}
              basePath={`/blog/tag/${tag}`}
              className="mt-10"
            />
          </div>

          <BlogSidebar
            recentPosts={getRecentBlogs()}
            categories={getCategories()}
            className="lg:sticky lg:top-24"
          />
        </div>
      </section>
    </>
  );
}
