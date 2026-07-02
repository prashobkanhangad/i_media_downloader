"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { NavbarLogo } from "@/components/layout/navbar-logo";
import { ThemeSwitcher } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { navbarLinks, type NavLink } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { appleEase } from "@/utils/animation";

interface NavbarProps {
  links?: NavLink[];
  className?: string;
}

function isLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ links = navbarLinks, className }: NavbarProps) {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition({ threshold: 8 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        className,
      )}
    >
      <div
        className={cn(
          "border-b transition-all duration-300",
          isScrolled
            ? "border-white/15 bg-white/70 shadow-sm shadow-black/[0.03] backdrop-blur-xl dark:border-white/10 dark:bg-black/60 dark:shadow-black/20"
            : "border-transparent bg-white/40 backdrop-blur-md dark:bg-black/30",
        )}
      >
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
          <NavbarLogo />

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {links.map((link) => {
              const active = isLinkActive(pathname, link.href);

              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "rounded-xl px-3.5 text-sm font-medium",
                    active && "bg-white/50 text-foreground dark:bg-white/10",
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeSwitcher />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40 lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: appleEase }}
              className={cn(
                "absolute top-full right-0 left-0 z-50 border-b lg:hidden",
                "border-white/15 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/80",
              )}
            >
              <ul className="container mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
                {links.map((link, index) => {
                  const active = isLinkActive(pathname, link.href);

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.04,
                        ease: appleEase,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-white/60 text-foreground dark:bg-white/10"
                            : "text-muted-foreground hover:bg-white/40 hover:text-foreground dark:hover:bg-white/5",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
