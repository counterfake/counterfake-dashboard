import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";
import { ROUTES } from "@/common/lib/config/routes";

import { customerAuthService } from "../services/customer-auth.service";
import {
  removeSession,
  updateSession,
} from "@/shared/api/brand-protection/bp-api.auth";

export function useCustomerLogin() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      authStore.clear(); // Clear previous tokens for security or invalidation

      return customerAuthService.login(credentials);
    },
    onSettled: (response) => {
      if (!response.success) {
        authStore.clear();
        return;
      }

      authStore.setTokens(response.data.tokens);
      authStore.setUser(response.data.user);
      authStore.setCurrentDashboard("customer");
      router.push(ROUTES.USER_DASHBOARD);
    },
  });
}

export function useCustomerLogout() {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: () => {
      return customerAuthService.logout();
    },
    onSuccess: () => {
      authStore.clear();
      // TODO: Remove this logic from here and re-engineer this structure for feature-sliced ​​design.
      removeSession();
    },
    retry: false,
  });
}

export function useCustomerRefreshToken() {
  const authStore = useAuthStore();
  const refreshToken = authStore.tokens?.refreshToken;

  return useMutation({
    mutationFn: () => {
      return customerAuthService.refreshToken(refreshToken);
    },
    onSettled: (response) => {
      if (!response.success) return;

      authStore.setTokens(response.data);

      // TODO (IMPORTANT): Remove this logic from here and re-engineer this structure for feature-sliced ​​design.
      updateSession({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      });
    },
  });
}
