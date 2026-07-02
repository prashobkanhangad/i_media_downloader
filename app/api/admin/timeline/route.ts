import { adminController } from "@/server/controllers/admin.controller";
import { handleRoute } from "@/server/utils";

export async function GET(request: Request) {
  return handleRoute(() => adminController.getTimeline(request));
}
