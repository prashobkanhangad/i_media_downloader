"use client";

import { useQuery } from "@tanstack/react-query";
import { Download, Eye, Users } from "lucide-react";

import { AdminHeader } from "@/components/admin/admin-header";
import { BarListChart } from "@/components/admin/charts/bar-list-chart";
import { TimelineChart } from "@/components/admin/charts/timeline-chart";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminDashboard, fetchAdminTimeline } from "@/lib/admin/api";

export default function AdminOverviewPage() {
  const dashboardQuery = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: fetchAdminDashboard,
  });

  const timelineQuery = useQuery({
    queryKey: ["admin", "timeline"],
    queryFn: fetchAdminTimeline,
  });

  const stats = dashboardQuery.data;
  const timeline = timelineQuery.data ?? [];

  return (
    <>
      <AdminHeader
        title="Overview"
        description="Monitor traffic, downloads, and engagement at a glance."
      />
      <div className="flex-1 space-y-6 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardQuery.isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-28 rounded-xl" />
            ))
          ) : (
            <>
              <StatCard
                title="Total Visitors"
                value={stats?.visitors.total ?? 0}
                description="Page views in selected period"
                icon={Eye}
              />
              <StatCard
                title="Unique Visitors"
                value={stats?.visitors.unique ?? 0}
                description="Distinct visitors"
                icon={Users}
              />
              <StatCard
                title="Downloads"
                value={stats?.downloads.total ?? 0}
                description="Media downloads tracked"
                icon={Download}
              />
              <StatCard
                title="Conversion"
                value={
                  stats && stats.visitors.total > 0
                    ? `${((stats.downloads.total / stats.visitors.total) * 100).toFixed(1)}%`
                    : "0%"
                }
                description="Downloads per page view"
                icon={Download}
              />
            </>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="border-border/60 xl:col-span-2">
            <CardHeader>
              <CardTitle>Traffic Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {timelineQuery.isLoading ? (
                <Skeleton className="h-[300px] w-full rounded-xl" />
              ) : timeline.length > 0 ? (
                <TimelineChart data={timeline} />
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No timeline data yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardQuery.isLoading ? (
                <Skeleton className="h-[280px] w-full rounded-xl" />
              ) : stats?.topPages.length ? (
                <BarListChart data={stats.topPages} />
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No page data yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
