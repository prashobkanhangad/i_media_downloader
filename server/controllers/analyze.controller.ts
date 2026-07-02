import { AnalyzeService } from "@/server/services/analyze.service";
import { parseJsonBody, successResponse } from "@/server/utils";
import { analyzeRequestSchema } from "@/server/validators/analyze.validator";

export class AnalyzeController {
  constructor(private readonly analyzeService = new AnalyzeService()) {}

  async post(request: Request) {
    const body = await parseJsonBody(request);
    const { url } = analyzeRequestSchema.parse(body);
    const result = await this.analyzeService.analyze({ url });

    return successResponse(result, "URL analyzed successfully");
  }
}

export const analyzeController = new AnalyzeController();
