import type {
  DashboardStats,
  EventListItem,
  PaginatedResult,
  TimelineItem,
  UserListItem,
} from "@/server/types/analytics";

interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const json = (await response.json()) as
    ApiSuccess<T> | { success: false; error: string };

  if (!response.ok || !json.success) {
    throw new Error("error" in json ? json.error : "Request failed");
  }

  return json.data;
}

export function fetchAdminDashboard() {
  return adminFetch<DashboardStats>("/api/admin/dashboard");
}

export function fetchAdminTimeline() {
  return adminFetch<TimelineItem[]>("/api/admin/timeline");
}

export function fetchAdminEvents(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: "download" | "page_view";
}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params.search) searchParams.set("search", params.search);
  if (params.type) searchParams.set("type", params.type);

  const query = searchParams.toString();
  return adminFetch<PaginatedResult<EventListItem>>(
    `/api/admin/events${query ? `?${query}` : ""}`,
  );
}

export function fetchAdminUsers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params.search) searchParams.set("search", params.search);

  const query = searchParams.toString();
  return adminFetch<PaginatedResult<UserListItem>>(
    `/api/admin/users${query ? `?${query}` : ""}`,
  );
}

export async function adminLogin(apiKey: string) {
  return adminFetch<{ authenticated: boolean }>("/api/admin/auth", {
    method: "POST",
    body: JSON.stringify({ apiKey }),
  });
}

export async function adminLogout() {
  return adminFetch<{ authenticated: boolean }>("/api/admin/auth", {
    method: "DELETE",
  });
}
