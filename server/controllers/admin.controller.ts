import type { IAnalyticsService } from "@/server/interfaces/analytics.interface";
import { getAnalyticsService } from "@/server/container";
import {
  ADMIN_SESSION_COOKIE,
  getAdminApiKey,
  verifyAdminRequest,
} from "@/server/utils/admin-auth";
import { parseJsonBody, successResponse } from "@/server/utils";
import { ApiException } from "@/server/utils/api-error";
import { dashboardQuerySchema } from "@/server/validators/analytics.validator";
import {
  adminLoginSchema,
  paginatedQuerySchema,
} from "@/server/validators/admin.validator";

function parseDateQuery(searchParams: URLSearchParams) {
  return {
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
  };
}

function toDashboardQuery(query: ReturnType<typeof parseDateQuery>) {
  const parsed = dashboardQuerySchema.parse(query);
  return {
    from: parsed.from ? new Date(parsed.from) : undefined,
    to: parsed.to ? new Date(parsed.to) : undefined,
    limit: parsed.limit,
  };
}

function toPaginatedQuery(searchParams: URLSearchParams) {
  const parsed = paginatedQuerySchema.parse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
    type: searchParams.get("type") ?? undefined,
  });

  return {
    page: parsed.page,
    pageSize: parsed.pageSize,
    search: parsed.search,
    type: parsed.type,
    from: parsed.from ? new Date(parsed.from) : undefined,
    to: parsed.to ? new Date(parsed.to) : undefined,
  };
}

export class AdminController {
  constructor(
    private readonly analyticsService: IAnalyticsService = getAnalyticsService(),
  ) {}

  async login(request: Request) {
    const body = await parseJsonBody(request);
    const { apiKey } = adminLoginSchema.parse(body);
    const expected = getAdminApiKey();

    if (!expected) {
      throw new ApiException("Admin API key not configured", 503);
    }

    if (apiKey !== expected) {
      throw new ApiException("Invalid API key", 401);
    }

    const response = successResponse(
      { authenticated: true },
      "Login successful",
    );
    response.cookies.set(ADMIN_SESSION_COOKIE, apiKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  async logout() {
    const response = successResponse({ authenticated: false }, "Logged out");
    response.cookies.set(ADMIN_SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  async getDashboard(request: Request) {
    verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const stats = await this.analyticsService.getDashboard(
      toDashboardQuery(parseDateQuery(searchParams)),
    );
    return successResponse(stats, "Dashboard stats retrieved");
  }

  async getTimeline(request: Request) {
    verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const timeline = await this.analyticsService.getTimeline(
      toDashboardQuery(parseDateQuery(searchParams)),
    );
    return successResponse(timeline, "Timeline retrieved");
  }

  async getEvents(request: Request) {
    verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const events = await this.analyticsService.listEvents(
      toPaginatedQuery(searchParams),
    );
    return successResponse(events, "Events retrieved");
  }

  async getUsers(request: Request) {
    verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const users = await this.analyticsService.listUsers(
      toPaginatedQuery(searchParams),
    );
    return successResponse(users, "Users retrieved");
  }
}

export const adminController = new AdminController();
