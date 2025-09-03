"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { DASHBOARD_CONFIG } from "@/common/lib/config/dashboard";

import LoadingWrapper from "@/common/components/layout/loading-wrapper";
import { AUTH_CONFIG } from "@/common/lib/config/auth";

interface AuthRouteGuardProps {
  children: React.ReactNode;
}

export const AuthRouterProvider = ({ children }: AuthRouteGuardProps) => {
  const { currentDashboard } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  // Handle routes
  useEffect(() => {
    if (!hasHydrated) {
      setIsLoading(true);
      return;
    }

    const isPublicRoute = AUTH_CONFIG.PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route)
    );

    if (isPublicRoute) {
      setIsLoading(false);
      return;
    }

    // Keep loading if redirection is needed
    if (
      currentDashboard === "user" &&
      !pathname.startsWith(DASHBOARD_CONFIG.user.ROOT_PATH)
    ) {
      setIsLoading(true);
      router.push(DASHBOARD_CONFIG.user.INDEX_PATH);
      return;
    }

    // Keep loading if redirection is needed
    if (
      currentDashboard === "admin" &&
      !pathname.startsWith(DASHBOARD_CONFIG.admin.ROOT_PATH)
    ) {
      setIsLoading(true);
      router.push(DASHBOARD_CONFIG.admin.INDEX_PATH);
      return;
    }

    // Only close loading if no redirection is needed
    setIsLoading(false);
  }, [hasHydrated, currentDashboard, pathname, router]);

  return (
    <LoadingWrapper isLoading={isLoading || !hasHydrated}>
      {children}
    </LoadingWrapper>
  );
};
