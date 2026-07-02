"use client";

import type { ReactNode } from "react";

import { AdSidebar } from "@/components/ads/ad-sidebar";
import { useShowAdPlacements } from "@/hooks/use-ads-enabled";
import { cn } from "@/lib/utils";

interface HomePageAdLayoutProps {
  children: ReactNode;
  className?: string;
}

function SidebarColumn({
  side,
  className,
}: {
  side: "left" | "right";
  className?: string;
}) {
  const showPlacements = useShowAdPlacements();
  const isLeft = side === "left";
  const primaryKey = isLeft ? "homeLeft" : "homeRight";
  const secondaryKey = isLeft ? "homeLeftSecondary" : "homeRightSecondary";

  if (!showPlacements) return null;

  return (
    <aside
      className={cn(
        "hidden w-full shrink-0 md:block md:w-[120px] lg:w-[140px] xl:w-[160px] 2xl:w-[200px]",
        className,
      )}
      aria-label={isLeft ? "Left sidebar ads" : "Right sidebar ads"}
    >
      <div className="sticky top-24 space-y-6">
        <AdSidebar slotKey={primaryKey} />
        <AdSidebar slotKey={secondaryKey} />
      </div>
    </aside>
  );
}

export function HomePageAdLayout({
  children,
  className,
}: HomePageAdLayoutProps) {
  const showPlacements = useShowAdPlacements();

  if (!showPlacements) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-[minmax(0,120px)_minmax(0,1fr)_minmax(0,120px)] lg:grid-cols-[minmax(0,160px)_minmax(0,1fr)_minmax(0,160px)] lg:gap-8 xl:grid-cols-[minmax(0,180px)_minmax(0,1fr)_minmax(0,180px)] 2xl:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,220px)]",
        className,
      )}
    >
      <SidebarColumn side="left" />
      <div className="min-w-0">{children}</div>
      <SidebarColumn side="right" />
    </div>
  );
}
