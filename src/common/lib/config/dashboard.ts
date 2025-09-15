import { DashboardType } from "@/common/types/auth";

import { ROUTES } from "./routes";

export const DASHBOARD_CONFIG = {
  admin: {
    ROOT_PATH: ROUTES.ADMIN_DASHBOARD,
    INDEX_PATH: ROUTES.ADMIN_DASHBOARD,
  },
  customer: {
    ROOT_PATH: ROUTES.USER_DASHBOARD,
    INDEX_PATH: ROUTES.USER_DASHBOARD,
  },
} as const satisfies Record<
  DashboardType,
  { ROOT_PATH: string; INDEX_PATH: string }
>;
