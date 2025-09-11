import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";
import { ROUTES } from "@/common/lib/config/routes";

import { customerAuthService } from "../services/customer-auth.service";

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
  return useMutation({
    mutationFn: () => {
      return customerAuthService.logout();
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
    },
  });
}
