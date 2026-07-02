import Link from "next/link";
import { Download } from "lucide-react";

import { siteConfig } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 transition-opacity hover:opacity-80",
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-105">
        <Download className="h-4 w-4 text-white" />
      </span>
      <span className="hidden text-lg font-semibold tracking-tight sm:inline">
        {siteConfig.name}
      </span>
    </Link>
  );
}
