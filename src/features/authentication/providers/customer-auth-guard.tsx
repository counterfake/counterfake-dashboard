"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { ROUTES } from "@/common/lib/config/routes";

import LoadingPage from "@/common/components/pages/loading-page";

import { useCustomerRefreshToken } from "../hooks/use-customer-auth";

import { customerAuthService } from "../services/customer-auth.service";

interface CustomerAuthGuardProps {
  children: React.ReactNode;
}

export default function CustomerAuthGuard({
  children,
}: CustomerAuthGuardProps) {
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  const {
    currentDashboard,
    getSessionExpiry,
    clear: clearAuth,
  } = useAuthStore();

  const refreshToken = useCustomerRefreshToken();

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
      const isAuthenticatedResponse =
        await customerAuthService.isAuthenticated();

      if (!isAuthenticatedResponse.success) {
        const refreshTokenResponse = await refreshToken.mutateAsync();

        if (!refreshTokenResponse?.success) {
          clearAuth();
          setIsLoading(true);
          router.push(ROUTES.USER_DASHBOARD_SIGN_IN);
          return;
        }
      }

      const timeUntilRefresh = getSessionExpiry();

      // Refresh Timer Setup
      if (timeUntilRefresh > 0) {
        refreshTimer = setTimeout(async () => {
          const refreshTokenResponse = await refreshToken.mutateAsync();

          if (!refreshTokenResponse?.success) {
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
