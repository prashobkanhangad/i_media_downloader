import Link from "next/link";
import { Download } from "lucide-react";

import { FooterLinkColumn } from "@/components/layout/footer-link-column";
import { FooterSocialLinks } from "@/components/layout/footer-social-links";
import { Button } from "@/components/ui/button";
import {
  footerLinkGroups,
  footerSocialLinks,
  type FooterLinkGroup,
  type SocialLink,
} from "@/lib/footer";
import { siteConfig } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

interface FooterProps {
  linkGroups?: FooterLinkGroup[];
  socialLinks?: SocialLink[];
  className?: string;
}

export function Footer({
  linkGroups = footerLinkGroups,
  socialLinks = footerSocialLinks,
  className,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative border-t border-white/10 bg-white/30 backdrop-blur-xl",
        "dark:border-white/5 dark:bg-black/20",
        className,
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-105">
                <Download className="h-4 w-4 text-white" />
              </span>
              <span className="text-xl font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <Button asChild className="mt-6 rounded-2xl" size="sm">
              <Link href="/">
                <Download className="h-4 w-4" />
                Start Downloading
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 sm:col-span-2 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3 lg:gap-8">
            {linkGroups.map((group) => (
              <FooterLinkColumn key={group.title} group={group} />
            ))}
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <FooterSocialLinks links={socialLinks} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row dark:border-white/5">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-center text-xs text-muted-foreground sm:text-right">
            This tool is not affiliated with Instagram or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
