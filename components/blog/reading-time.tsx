import { Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";

interface ReadingTimeProps {
  minutes: number;
  label?: string;
  className?: string;
}

export function ReadingTime({ minutes, label, className }: ReadingTimeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Clock3 className="h-3.5 w-3.5" aria-hidden />
      <span>{label ?? `${minutes} min read`}</span>
    </span>
  );
}
