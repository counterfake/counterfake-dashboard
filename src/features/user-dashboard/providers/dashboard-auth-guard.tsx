"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/common/lib/stores/auth-store";
import { ROUTES } from "@/common/lib/config/routes";

import { useUserRefreshToken } from "../hooks/use-user-auth";

import { userAuthService } from "../services/user-auth.service";
import LoadingPage from "@/common/components/pages/loading-page";

interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

export default function DashboardAuthGuard({
  children,
}: DashboardAuthGuardProps) {
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  const {
    currentDashboard,
    getSessionExpiry,
    clear: clearAuth,
  } = useAuthStore();

  const refreshToken = useUserRefreshToken();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  // Initial auth check and token refresh setup
  useEffect(() => {
    if (!hasHydrated) {
      setIsLoading(true);
      return;
    }

    let refreshTimer: NodeJS.Timeout;

    const initializeAuth = async () => {
      const isAuthenticatedResponse = await userAuthService.isAuthenticated();

      if (!isAuthenticatedResponse.success) {
        const refreshTokenResponse = await refreshToken?.mutateAsync();

        if (!refreshTokenResponse.success) {
          clearAuth();
          setIsLoading(false);
          router.push(ROUTES.USER_DASHBOARD_SIGN_IN);
          return;
        }
      }

      const timeUntilRefresh = getSessionExpiry();

      if (timeUntilRefresh > 0) {
        refreshTimer = setTimeout(async () => {
          const refreshTokenResponse = await refreshToken?.mutateAsync();

          if (!refreshTokenResponse.success) {
            clearAuth();
            router.push(ROUTES.UNAUTHORIZED);
            return;
          }
        }, timeUntilRefresh);
      }

      setIsLoading(false);
    };

    initializeAuth();

    return () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    };
  }, [hasHydrated, currentDashboard]);

  // Hydration tamamlanmadıysa loading göster
  if (!hasHydrated || isLoading) {
    return <LoadingPage />;
  }

  return children;
}
