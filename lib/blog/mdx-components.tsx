import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { slugify } from "@/lib/blog/utils";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-10 scroll-mt-24 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, children, ...props }) => {
    const text = String(children);
    return (
      <h2
        id={slugify(text)}
        className={cn(
          "mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ className, children, ...props }) => {
    const text = String(children);
    return (
      <h3
        id={slugify(text)}
        className={cn(
          "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ className, children, ...props }) => {
    const text = String(children);
    return (
      <h4
        id={slugify(text)}
        className={cn(
          "mt-6 scroll-mt-24 text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({ className, ...props }) => (
    <p
      className={cn("mt-4 leading-7 text-muted-foreground", className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => (
    <Link
      href={href ?? "#"}
      className={cn(
        "font-medium text-foreground underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "mt-4 list-disc space-y-2 pl-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "mt-4 list-decimal space-y-2 pl-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 border-violet-500/40 pl-4 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-2xl border border-border/60 bg-muted/40 p-4 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-8 border-border/60", className)} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("mt-6 rounded-2xl border border-border/50", className)}
      alt={alt ?? ""}
      loading="lazy"
      {...props}
    />
  ),
};
