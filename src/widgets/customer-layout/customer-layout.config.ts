import {
  LayoutDashboard,
  MessageCircle,
  Package,
  Settings,
} from "lucide-react";

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ElementType;
  readonly href?: string;
  readonly items?: readonly {
    readonly id: string;
    readonly label: string;
    readonly href: string;
  }[];
}

export interface CustomerLayoutConfig {
  SIDEBAR: {
    WIDTH: string;
    WIDTH_MOBILE: string;
    WIDTH_ICON: string;
    NAVIGATIONS: readonly NavigationItem[];
  };
}

export const CUSTOMER_LAYOUT_CONFIG = {
  SIDEBAR: {
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
      {
        id: "case-management",
        label: "Case Management",
        icon: Package,
        items: [
          {
            id: "product-cases",
            label: "Product Cases",
            href: "/dashboard/case-management/product-cases",
          },
          {
            id: "seller-cases",
            label: "Seller Cases",
            href: "/dashboard/case-management/seller-cases",
          },
        ],
      },
      {
        id: "ai-chat",
        label: "AI Chat",
        icon: MessageCircle,
        href: "/dashboard/chat",
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
      },
    ],
  },
} as const satisfies CustomerLayoutConfig;
