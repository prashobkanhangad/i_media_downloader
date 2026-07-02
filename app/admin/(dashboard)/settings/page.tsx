"use client";

import { useRouter } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { adminLogout } from "@/lib/admin/api";
import { toast } from "@/lib/toast";

export default function AdminSettingsPage() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await adminLogout();
      toast.success("Logged out");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out");
    }
  }

  return (
    <>
      <AdminHeader
        title="Settings"
        description="Manage appearance and admin session."
      />
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Switch between light, dark, and system themes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeSwitcher />
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Session</CardTitle>
              <CardDescription>
                Sign out of the admin dashboard on this device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <Button variant="destructive" onClick={handleLogout}>
                Log out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
