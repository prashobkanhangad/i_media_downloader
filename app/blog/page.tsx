import Link from "next/link";

import { AdBanner } from "@/components/ads/ad-banner";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { GlassCard } from "@/components/ui/glass-card";
import { blogPosts } from "@/lib/seo/blog-posts";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getBlogJsonLd, getWebPageJsonLd } from "@/lib/seo/json-ld";
import { getSeoPage } from "@/lib/seo/pages";

export const metadata = createPageMetadata("blog");

export default function BlogPage() {
  const page = getSeoPage("blog");

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd("blog", page.title, page.description, page.path),
          getBlogJsonLd(),
        ]}
      />
      <section className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
          className="mb-8"
        />

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tips, guides, and updates for downloading Instagram content.
          </p>
        </header>

        <AdBanner slotKey="blogList" className="mb-8" />

        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <GlassCard
                  hover
                  className="block transition-transform hover:scale-[1.01]"
                >
                  <time
                    dateTime={post.datePublished}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {new Date(post.datePublished).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {post.readTime}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </GlassCard>
              </Link>
              {index < blogPosts.length - 1 && index % 2 === 1 ? (
                <AdBanner slotKey="blogList" className="mt-4" compact />
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
