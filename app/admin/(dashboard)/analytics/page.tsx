"use client";

import { useQuery } from "@tanstack/react-query";

import { AdminHeader } from "@/components/admin/admin-header";
import { BarListChart } from "@/components/admin/charts/bar-list-chart";
import { DonutChart } from "@/components/admin/charts/donut-chart";
import { TimelineChart } from "@/components/admin/charts/timeline-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminDashboard, fetchAdminTimeline } from "@/lib/admin/api";

export default function AdminAnalyticsPage() {
  const dashboardQuery = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: fetchAdminDashboard,
  });

  const timelineQuery = useQuery({
    queryKey: ["admin", "timeline"],
    queryFn: fetchAdminTimeline,
  });

  const stats = dashboardQuery.data;

  return (
    <>
      <AdminHeader
        title="Analytics"
        description="Detailed breakdowns by device, country, and referrer."
      />
      <div className="flex-1 space-y-6 overflow-auto p-4 sm:p-6 lg:p-8">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Activity Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {timelineQuery.isLoading ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : timelineQuery.data?.length ? (
              <TimelineChart data={timelineQuery.data} />
            ) : (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No analytics data yet.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Devices</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardQuery.isLoading ? (
                <Skeleton className="mx-auto h-[280px] w-full rounded-xl" />
              ) : stats?.devices.length ? (
                <DonutChart data={stats.devices} />
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No device data.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Countries</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardQuery.isLoading ? (
                <Skeleton className="h-[280px] w-full rounded-xl" />
              ) : stats?.countries.length ? (
                <BarListChart data={stats.countries} />
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No country data.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60 lg:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle>Referrers</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardQuery.isLoading ? (
                <Skeleton className="h-[280px] w-full rounded-xl" />
              ) : stats?.referrers.length ? (
                <BarListChart data={stats.referrers} />
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  No referrer data.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
