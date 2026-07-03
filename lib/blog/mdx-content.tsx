import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/lib/blog/mdx-components";
import { cn } from "@/lib/utils";

interface BlogMdxContentProps {
  source: string;
  className?: string;
}

export function BlogMdxContent({ source, className }: BlogMdxContentProps) {
  return (
    <div className={cn("blog-content", className)}>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
          },
        }}
      />
    </div>
  );
}
