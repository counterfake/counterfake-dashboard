import { LayoutDashboard, Package, Users, Settings } from "lucide-react";

export interface SidebarConfig {
  WIDTH: string;
  WIDTH_MOBILE: string;
  WIDTH_ICON: string;
  NAVIGATIONS: readonly {
    readonly id: string;
    readonly label: string;
    readonly icon: React.ElementType;
    readonly href: string;
  }[];
}

export const SIDEBAR_CONFIG = {
  WIDTH: "300px",
  WIDTH_MOBILE: "18rem",
  WIDTH_ICON: "3rem",
  NAVIGATIONS: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
    },
    // {
    //   id: "sellers",
    //   label: "Sellers",
    //   icon: Users,
    //   href: "/dashboard/sellers",
    // },
    // {
    //   id: "design-system",
    //   label: "Design System",
    //   icon: Settings,
    //   href: "/design-system",
    // },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ],
} as const satisfies SidebarConfig;
