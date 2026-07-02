import {
  BarChart3,
  Download,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/downloads", label: "Downloads", icon: Download },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export const DEFAULT_PAGE_SIZE = 10;
