"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/stores/auth-store";

import { AUTH_CONFIG } from "@/lib/config/auth";
import { ROUTES } from "@/lib/config/routes";
import { DASHBOARD_CONFIG } from "@/lib/config/dashboard";

import { cn } from "@/lib/utils/ui";

import {
  useUserLogout,
  useUserRefreshToken,
  useUserUpdateUser,
} from "@/hooks/use-user-dashboard";

import LoadingPage from "@/features/authentication/pages/loading-page";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { tokens, currentDashboard, user, hasValidSession, getSessionExpiry } =
    useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Call hooks unconditionally
  const userDashboardRefreshToken = useUserRefreshToken();
  const userDashboardLogout = useUserLogout();
  const userDashboardUpdateUser = useUserUpdateUser();

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = hasValidSession();

  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  const dashboardActions = {
    user: {
      refreshToken: userDashboardRefreshToken,
      logout: userDashboardLogout,
      updateUser: userDashboardUpdateUser,
    },
    admin: {
      refreshToken: userDashboardRefreshToken,
      logout: userDashboardLogout,
      updateUser: userDashboardUpdateUser,
    },
  } as const;

  const currentDashboardActions = currentDashboard
    ? dashboardActions[currentDashboard]
    : null;

  useEffect(() => {
    if (!hasHydrated) return;

    async function handleRoutes() {
      const isPublicRoute = AUTH_CONFIG.PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route)
      );

      if (isPublicRoute) {
        setIsLoading(false);
        return;
      }

      const isAuthRoute = AUTH_CONFIG.AUTH_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route)
      );

      if (isAuthRoute && !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      // Redirect authenticated users away from auth pages
      if (isAuthenticated && isAuthRoute && currentDashboard) {
        router.push(DASHBOARD_CONFIG[currentDashboard].ROOT_PATH);
        return;
      }

      // Check if route is protected
      const isProtectedRoute = AUTH_CONFIG.PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
      );

      // Redirect unauthenticated users from protected routes
      if (!isAuthenticated && isProtectedRoute) {
        router.push(ROUTES.UNAUTHORIZED);
        return;
      }

      if (pathname === "/" && !isAuthenticated) {
        router.push(ROUTES.USER_DASHBOARD_SIGN_IN);
        return;
      }

      if (pathname === "/" && isAuthenticated && currentDashboard) {
        router.push(DASHBOARD_CONFIG[currentDashboard].ROOT_PATH);
        return;
      }

      setIsLoading(false);
    }

    handleRoutes();
  }, [
    tokens,
    currentDashboard,
    pathname,
    router,
    hasHydrated,
    isAuthenticated,
    user,
  ]);

  // Auto-refresh tokens before they expire
  useEffect(() => {
    if (!tokens || !currentDashboard) return;

    const handleTokenExpiry = async () => {
      const timeBuffer = 5 * 60 * 1000; // 5 minutes
      const timeUntilRefresh = getSessionExpiry() - timeBuffer;

      if (timeUntilRefresh > 0) {
        // await currentDashboardActions?.updateUser?.mutateAsync();

        const refreshTimer = setTimeout(async () => {
          try {
            await currentDashboardActions?.refreshToken?.mutateAsync();
          } catch {
            console.log("refreshToken error");
            await currentDashboardActions?.logout?.mutateAsync();
          }
        }, timeUntilRefresh);

        return () => clearTimeout(refreshTimer);
      }
    };

    handleTokenExpiry();
  }, [tokens, currentDashboard]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center will-change-[opacity] transition-opacity duration-300 ease-in-out",
          isLoading ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <LoadingPage />
      </div>
      {children}
    </>
  );
};
