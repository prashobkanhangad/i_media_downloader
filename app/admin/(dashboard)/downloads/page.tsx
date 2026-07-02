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
import { fetchAdminEvents } from "@/lib/admin/api";
import { DEFAULT_PAGE_SIZE } from "@/lib/admin/constants";

export default function AdminDownloadsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "downloads", page, search],
    queryFn: () =>
      fetchAdminEvents({
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        search: search || undefined,
        type: "download",
      }),
  });

  return (
    <>
      <AdminHeader
        title="Downloads"
        description="Browse and search all tracked download events."
        actions={
          <SearchInput
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search path, country, referrer..."
          />
        }
      />
      <div className="flex-1 space-y-4 overflow-auto p-4 sm:p-6 lg:p-8">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Download Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Media</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: 5 }).map((__, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : data?.items.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {new Date(event.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate font-medium">
                          {event.path}
                        </TableCell>
                        <TableCell>{event.country ?? "—"}</TableCell>
                        <TableCell>
                          <Badge variant="default">{event.device}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate">
                          {String(event.metadata.mediaType ?? "unknown")}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>

            {!isLoading && data?.items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No downloads found.
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
