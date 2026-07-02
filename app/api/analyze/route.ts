import { analyzeController } from "@/server/controllers/analyze.controller";
import { handleRoute } from "@/server/utils";

export async function POST(request: Request) {
  return handleRoute(() => analyzeController.post(request));
}
