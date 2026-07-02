"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { SearchInput } from "@/components/admin/search-input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminUsers } from "@/lib/admin/api";
import { DEFAULT_PAGE_SIZE } from "@/lib/admin/constants";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "users", page, search],
    queryFn: () =>
      fetchAdminUsers({
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        search: search || undefined,
      }),
  });

  return (
    <>
      <AdminHeader
        title="Users"
        description="Visitor activity grouped by unique visitor ID."
        actions={
          <SearchInput
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search visitor ID..."
          />
        }
      />
      <div className="flex-1 space-y-4 overflow-auto p-4 sm:p-6 lg:p-8">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Visitors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor ID</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: 6 }).map((__, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : data?.items.map((user) => (
                      <TableRow key={user.visitorId}>
                        <TableCell className="max-w-[180px] truncate font-mono text-xs">
                          {user.visitorId}
                        </TableCell>
                        <TableCell>{user.visits}</TableCell>
                        <TableCell>{user.downloads}</TableCell>
                        <TableCell>{user.country ?? "—"}</TableCell>
                        <TableCell>
                          <Badge variant="default">{user.device}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {new Date(user.lastSeen).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>

            {!isLoading && data?.items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No users found.
              </p>
            ) : null}

            {data ? (
              <DataTablePagination
                page={data.page}
                totalPages={data.totalPages}
                total={data.total}
                pageSize={data.pageSize}
                onPageChange={setPage}
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
