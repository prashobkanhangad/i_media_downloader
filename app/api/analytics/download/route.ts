import { analyticsController } from "@/server/controllers/analytics.controller";
import { handleRoute } from "@/server/utils";

export async function POST(request: Request) {
  return handleRoute(() => analyticsController.trackDownload(request));
}
