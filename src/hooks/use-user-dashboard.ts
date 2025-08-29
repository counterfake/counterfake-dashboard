import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { DASHBOARD_CONFIG } from "@/lib/config/dashboard";
import { ROUTES } from "@/lib/config/routes";

import { type LoginCredentials } from "@/types/brand-protection/auth";

import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { useAuthStore } from "@/lib/stores/auth-store";

const authService = bpApiClient.authService;

export function useUserLogin() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return authService.login(credentials);
    },
    onSettled: (response) => {
      if (response?.success) {
        router.push(DASHBOARD_CONFIG.user.ROOT_PATH);
        authStore.setCurrentDashboard("user");
      }
    },
  });
}

/**
 * @param redirectToSignIn - default: `true` - Whether to redirect to the sign-in page after logout
 */
export function useUserLogout(redirectToSignIn: boolean = true) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },
    onSettled: () => {
      if (redirectToSignIn) {
        router.push(ROUTES.USER_DASHBOARD_SIGN_IN);
      }
    },
    retry: false,
  });
}

export function useUserRefreshToken() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return authService.refreshToken();
    },
    onSettled: (response) => {
      if (response?.error) {
        authStore.clear();
        router.push("/auth/sign-in");
      }
    },
  });
}

export function useUserUpdateUser() {
  return useMutation({
    mutationFn: () => {
      return authService.updateUser();
    },
  });
}
