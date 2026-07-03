"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";

import type { BlogHeading } from "@/types/blog";
import { cn } from "@/lib/utils";

interface TocProps {
  headings: BlogHeading[];
  className?: string;
}

export function TOC({ headings, className }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const items = headings.filter((heading) => heading.level <= 3);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const heading of items) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      <div className="mb-3 flex items-center gap-2">
        <ListTree className="h-4 w-4 text-violet-500" />
        <p className="text-sm font-semibold tracking-tight">On this page</p>
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block rounded-lg px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
                activeId === heading.id &&
                  "bg-violet-500/10 font-medium text-violet-700 dark:text-violet-300",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
