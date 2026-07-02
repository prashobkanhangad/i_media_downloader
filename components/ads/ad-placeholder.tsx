import type { AdPlacement } from "@/lib/ads/config";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  label: string;
  placement?: AdPlacement;
  className?: string;
  vertical?: boolean;
}

const placementSizes: Record<AdPlacement, string> = {
  display: "min-h-[120px]",
  horizontal: "min-h-[90px]",
  inArticle: "min-h-[250px]",
  inFeed: "min-h-[200px]",
  sidebar: "min-h-[280px]",
};

export function AdPlaceholder({
  label,
  placement = "display",
  className,
  vertical = false,
}: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-4 py-6 text-center",
        placementSizes[placement],
        vertical && "min-h-[280px]",
        className,
      )}
      aria-hidden
    >
      <div className="space-y-1">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Ad Space
        </p>
        <p className="text-xs text-muted-foreground/80">{label}</p>
      </div>
    </div>
  );
}
