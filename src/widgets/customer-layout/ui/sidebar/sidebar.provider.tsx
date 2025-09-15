import { SidebarProvider } from "@/shared/ui/primitives/sidebar";

import { CUSTOMER_LAYOUT_CONFIG } from "../../customer-layout.config";

interface CustomerSidebarProviderProps {
  children: React.ReactNode;
}

export function CustomerSidebarProvider({
  children,
}: CustomerSidebarProviderProps) {
  return (
    <SidebarProvider
      sidebarWidth={CUSTOMER_LAYOUT_CONFIG.SIDEBAR.WIDTH}
      sidebarWidthMobile={CUSTOMER_LAYOUT_CONFIG.SIDEBAR.WIDTH_MOBILE}
      sidebarWidthIcon={CUSTOMER_LAYOUT_CONFIG.SIDEBAR.WIDTH_ICON}
    >
      {children}
    </SidebarProvider>
  );
}
