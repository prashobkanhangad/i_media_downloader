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
  getAllCategorySlugs,
  getBlogsByCategory,
  getCategories,
  getCategoryBySlug,
  getRecentBlogs,
  paginateBlogs,
} from "@/lib/blog";
import { createCategoryMetadata } from "@/lib/blog/seo";
import { getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo/json-ld";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);
  if (!categoryData) return {};
  return createCategoryMetadata(categoryData.name, categoryData.slug);
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) notFound();

  const page = Number(pageParam ?? "1");
  const posts = paginateBlogs(getBlogsByCategory(category), page);

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd(
            "blog",
            `${categoryData.name} Articles`,
            `Articles in the ${categoryData.name} category.`,
            `/blog/category/${category}`,
          ),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: categoryData.name, path: `/blog/category/${category}` },
          ]),
        ]}
      />

      <section className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <BlogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: categoryData.name, href: `/blog/category/${category}` },
          ]}
        />

        <header className="max-w-3xl">
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
            Category
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {categoryData.name}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {categoryData.count} article{categoryData.count === 1 ? "" : "s"}
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
                title="No articles in this category"
                description="Check back later for new posts."
              />
            )}

            <BlogPagination
              page={posts.page}
              totalPages={posts.totalPages}
              basePath={`/blog/category/${category}`}
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
