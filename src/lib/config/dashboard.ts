import { DashboardType } from "@/types/auth";

import { ROUTES } from "./routes";

export const DASHBOARD_CONFIG = {
  admin: {
    ROOT_PATH: ROUTES.ADMIN_DASHBOARD,
    ALLOWED_ROLES: ["admin"],
  },
  user: {
    ROOT_PATH: ROUTES.USER_DASHBOARD,
    ALLOWED_ROLES: ["user"],
  },
} as const satisfies Record<
  DashboardType,
  { ROOT_PATH: string; ALLOWED_ROLES: string[] }
>;
