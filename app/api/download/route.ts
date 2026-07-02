import { downloadController } from "@/server/controllers/download.controller";
import { handleRoute } from "@/server/utils";

export async function POST(request: Request) {
  return handleRoute(() => downloadController.post(request));
}
