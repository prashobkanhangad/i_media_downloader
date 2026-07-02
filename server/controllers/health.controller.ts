import { HealthService } from "@/server/services/health.service";
import { successResponse } from "@/server/utils";

export class HealthController {
  static async get() {
    const result = await HealthService.check();
    return successResponse(result, "Service is healthy");
  }
}
