import { Spinner } from "@/components/loading/spinner";
import { cn } from "@/lib/utils";

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({
  message = "Loading...",
  className,
}: PageLoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-4 py-20",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
