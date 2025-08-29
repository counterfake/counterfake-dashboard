"use client";

import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/lib/config/routes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/primitives/sidebar";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { DashboardSidebarNavigation } from "./dashboard-sidebar-navigation";
import { DashboardSidebarFooter } from "./dashboard-sidebar-footer";

import { SIDEBAR_CONFIG } from "../../config/sidebar";

interface DashboardSidebarProps {
  appName: string;
  brandName: string;
  appVersion: string;
}

export function DashboardSidebar({
  appName,
  brandName,
  appVersion,
}: DashboardSidebarProps) {
  const router = useRouter();
  const currentPage = usePathname();

  const handleLogout = () => {
    router.push(ROUTES.USER_DASHBOARD_LOGOUT);
  };

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="p-0">
        <DashboardSidebarHeader appName={appName} brandName={brandName} />
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation */}
        <DashboardSidebarNavigation
          currentPage={currentPage}
          navigations={SIDEBAR_CONFIG.NAVIGATIONS}
        />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <DashboardSidebarFooter
          appVersion={appVersion}
          currentLanguage={"English"}
          onLogout={handleLogout}
          onLanguageChange={() => {}}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
