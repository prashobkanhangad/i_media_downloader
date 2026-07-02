import type { HealthData } from "@/server/types/health";
import { getAppVersion } from "@/server/utils/helpers";

const serverStartTime = Date.now();

export class HealthService {
  static async check(): Promise<HealthData> {
    return {
      status: "ok",
      uptime: Math.floor((Date.now() - serverStartTime) / 1000),
      timestamp: new Date().toISOString(),
      version: getAppVersion(),
    };
  }
}
