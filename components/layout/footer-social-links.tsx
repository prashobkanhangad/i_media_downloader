import Link from "next/link";

import type { SocialLink } from "@/lib/footer";
import { cn } from "@/lib/utils";

interface FooterSocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export function FooterSocialLinks({
  links,
  className,
}: FooterSocialLinksProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-semibold tracking-wide text-foreground">
        Follow Us
      </h3>
      <div className="flex flex-wrap gap-2">
        {links.map((social) => {
          const Icon = social.icon;

          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                "border border-white/20 bg-white/30 text-muted-foreground backdrop-blur-sm",
                "transition-all hover:border-white/30 hover:bg-white/50 hover:text-foreground",
                "dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 dark:hover:bg-white/10",
              )}
            >
              <Icon className="h-4 w-4" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
