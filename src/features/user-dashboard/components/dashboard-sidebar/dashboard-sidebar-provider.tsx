import { SidebarProvider } from "@/components/ui/primitives/sidebar";

import { SIDEBAR_CONFIG } from "../../config/sidebar";

interface DashboardSidebarProviderProps {
  children: React.ReactNode;
}

export function DashboardSidebarProvider({
  children,
}: DashboardSidebarProviderProps) {
  return (
    <SidebarProvider
      sidebarWidth={SIDEBAR_CONFIG.WIDTH}
      sidebarWidthMobile={SIDEBAR_CONFIG.WIDTH_MOBILE}
      sidebarWidthIcon={SIDEBAR_CONFIG.WIDTH_ICON}
    >
      {children}
    </SidebarProvider>
  );
}
