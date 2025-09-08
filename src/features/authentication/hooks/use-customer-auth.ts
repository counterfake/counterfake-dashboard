import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { customerAuthService } from "../services/customer-auth.service";
import { ROUTES } from "@/common/lib/config/routes";

export function useCustomerLogin() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) => {
      return customerAuthService.login(credentials);
    },
    onSuccess: (response) => {
      authStore.setTokens(response.data);
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
    onSuccess: (response) => {
      authStore.setTokens(response.data);
    },
  });
}
