import { NextResponse } from "next/server";

import { downloadController } from "@/server/controllers/download.controller";
import { handleRoute } from "@/server/utils";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const response = await downloadController.getFile(request);
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  });
}
