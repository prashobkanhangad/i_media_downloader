import { Suspense } from "react";

import { AdBanner } from "@/components/ads/ad-banner";
import {
  BlogBreadcrumb,
  BlogCard,
  BlogEmptyState,
  BlogPagination,
  BlogSidebar,
  FeaturedArticle,
  PopularArticles,
  SearchBar,
} from "@/components/blog";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAllBlogs,
  getCategories,
  getFeaturedBlogs,
  getPopularBlogs,
  getRecentBlogs,
  paginateBlogs,
  searchBlogs,
} from "@/lib/blog";
import { createBlogListingMetadata } from "@/lib/blog/seo";
import { getBlogJsonLd, getWebPageJsonLd } from "@/lib/seo/json-ld";
import { getSeoPage } from "@/lib/seo/pages";

export const metadata = createBlogListingMetadata();

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const query = params.q?.trim() ?? "";
  const pageConfig = getSeoPage("blog");

  const featuredPosts = getFeaturedBlogs();
  const featured = featuredPosts[0] ?? null;
  const popularPosts = getPopularBlogs().filter(
    (post) => post.slug !== featured?.slug,
  );

  const listing = query
    ? searchBlogs({ query, page })
    : paginateBlogs(
        getAllBlogs().filter((post) => post.slug !== featured?.slug),
        page,
      );

  const recentPosts = getRecentBlogs();
  const categories = getCategories();

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd(
            "blog",
            pageConfig.title,
            pageConfig.description,
            "/blog",
          ),
          getBlogJsonLd(),
        ]}
      />

      <section className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <BlogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />

        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tips, guides, and updates for downloading Instagram content.
          </p>
        </header>

        <div className="mt-8 max-w-xl">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <AdBanner slotKey="blogList" className="mt-8" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            {!query ? <FeaturedArticle post={featured} /> : null}
            {!query ? <PopularArticles posts={popularPosts} /> : null}

            {query ? (
              <p className="mb-6 text-sm text-muted-foreground">
                {listing.total} result{listing.total === 1 ? "" : "s"} for
                &quot;
                {query}&quot;
              </p>
            ) : null}

            {listing.items.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {listing.items.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <BlogEmptyState
                title={query ? "No matching articles" : "No articles yet"}
                description={
                  query
                    ? "Try a different search term or browse all articles."
                    : "Add MDX files to content/blog/ to publish your first article."
                }
              />
            )}

            <BlogPagination
              page={listing.page}
              totalPages={listing.totalPages}
              searchParams={{ q: query || undefined }}
              className="mt-10"
            />
          </div>

          <BlogSidebar
            recentPosts={recentPosts}
            categories={categories}
            className="lg:sticky lg:top-24"
          />
        </div>
      </section>
    </>
  );
}
