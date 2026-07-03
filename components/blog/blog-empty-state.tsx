import { FileText } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";

interface BlogEmptyStateProps {
  title?: string;
  description?: string;
}

export function BlogEmptyState({
  title = "No articles yet",
  description = "Blog posts will appear here once MDX content is added to content/blog/.",
}: BlogEmptyStateProps) {
  return (
    <GlassCard className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
        <FileText className="h-6 w-6" />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </GlassCard>
  );
}
