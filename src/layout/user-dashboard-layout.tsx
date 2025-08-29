"use client";

import {
  DashboardSidebar,
  DashboardSidebarProvider,
} from "@/features/user-dashboard/components/dashboard-sidebar";

import { useVersion } from "@/hooks/use-version";
import { GENERAL_CONFIG } from "@/lib/config/general";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const version = useVersion();
  const { user } = useAuthStore();

  return (
    <DashboardSidebarProvider>
      <DashboardSidebar
        appName={GENERAL_CONFIG.APP_NAME}
        brandName={user?.brand.name || "-"}
        appVersion={version ?? "-"}
      />
      <main className="p-4 w-full max-w-6xl mx-auto">{children}</main>
    </DashboardSidebarProvider>
  );
}
