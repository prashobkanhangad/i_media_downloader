import { adminController } from "@/server/controllers/admin.controller";
import { handleRoute } from "@/server/utils";

export async function POST(request: Request) {
  return handleRoute(() => adminController.login(request));
}

export async function DELETE() {
  return handleRoute(() => adminController.logout());
}
