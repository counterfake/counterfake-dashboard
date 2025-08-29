// Route settings
export const ROUTES = {
  UNAUTHORIZED: "/unauthorized",

  // User dashboard routes
  USER_DASHBOARD: "/dashboard",
  USER_DASHBOARD_SIGN_IN: "/auth/sign-in",
  USER_DASHBOARD_SIGN_UP: "/auth/sign-up",
  USER_DASHBOARD_LOGOUT: "/dashboard/logout",
  USER_DASHBOARD_SELLERS: "/dashboard/sellers",
  USER_DASHBOARD_PRODUCTS: "/dashboard/products",

  // Admin dashboard routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_DASHBOARD_SIGN_IN: "/admin/auth/sign-in",
  ADMIN_DASHBOARD_LOGOUT: "/admin/logout",
} as const satisfies Record<string, string>;
