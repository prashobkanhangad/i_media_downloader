import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPostMeta } from "@/types/blog";

interface FeaturedBlogProps {
  post: BlogPostMeta;
}

export function FeaturedBlog({ post }: FeaturedBlogProps) {
  return <BlogCard post={post} featured />;
}

interface FeaturedArticleProps {
  post: BlogPostMeta | null;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  if (!post) return null;

  return (
    <section aria-label="Featured article" className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Featured
        </h2>
      </div>
      <FeaturedBlog post={post} />
    </section>
  );
}
