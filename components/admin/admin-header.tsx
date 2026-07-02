"use client";

import type { ReactNode } from "react";

import { AdminMobileNav } from "@/components/admin/admin-sidebar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AdminMobileNav />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {description ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
