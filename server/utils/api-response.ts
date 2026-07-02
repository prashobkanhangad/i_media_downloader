import { NextResponse } from "next/server";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/server/types/api";

export function successResponse<T>(
  data: T,
  message = "",
  status = 200,
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function errorResponse(
  error: string,
  status = 400,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error }, { status });
}
