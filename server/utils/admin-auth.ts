import { ApiException } from "@/server/utils/api-error";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function getAdminApiKey(): string | null {
  return process.env.ANALYTICS_API_KEY ?? null;
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};

  return header.split(";").reduce<Record<string, string>>((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (key) acc[key] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

export function verifyAdminRequest(request: Request): void {
  const apiKey = getAdminApiKey();
  if (!apiKey) {
    throw new ApiException("Admin API key not configured", 503);
  }

  const cookies = parseCookies(request.headers.get("cookie"));
  const session = cookies[ADMIN_SESSION_COOKIE];
  const headerKey =
    request.headers.get("x-api-key") ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (session !== apiKey && headerKey !== apiKey) {
    throw new ApiException("Unauthorized", 401);
  }
}
