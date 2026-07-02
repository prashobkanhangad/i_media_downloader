"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { adminLogin } from "@/lib/admin/api";
import { toast } from "@/lib/toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await adminLogin(apiKey);
      toast.success("Welcome back");
      const from = searchParams.get("from") ?? "/admin";
      router.push(from);
      router.refresh();
    } catch {
      toast.error("Invalid API key");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/60">
        <CardHeader className="text-center">
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your analytics API key to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="API key"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              autoComplete="current-password"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
