import Link from "next/link";

import type { FooterLinkGroup } from "@/lib/footer";
import { cn } from "@/lib/utils";

interface FooterLinkGroupProps {
  group: FooterLinkGroup;
  className?: string;
}

export function FooterLinkColumn({ group, className }: FooterLinkGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-semibold tracking-wide text-foreground">
        {group.title}
      </h3>
      <ul className="space-y-3">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
