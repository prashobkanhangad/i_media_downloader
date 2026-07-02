import { analyticsController } from "@/server/controllers/analytics.controller";
import { handleRoute } from "@/server/utils";

export async function GET(request: Request) {
  return handleRoute(() => analyticsController.getDashboard(request));
}
