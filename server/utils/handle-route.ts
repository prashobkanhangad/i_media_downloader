import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { ApiException } from "@/server/utils/api-error";
import { errorResponse } from "@/server/utils/api-response";

type RouteHandler = () => Promise<NextResponse>;

export async function handleRoute(
  handler: RouteHandler,
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof ApiException) {
      return errorResponse(error.message, error.status);
    }

    if (error instanceof ZodError) {
      const message = error.issues[0]?.message ?? "Validation failed";
      return errorResponse(message, 400);
    }

    console.error("[API Error]", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function parseJsonBody<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new ApiException("Invalid JSON body", 400);
  }
}
