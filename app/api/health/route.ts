import { HealthController } from "@/server/controllers/health.controller";
import { handleRoute } from "@/server/utils";

export async function GET() {
  return handleRoute(() => HealthController.get());
}
