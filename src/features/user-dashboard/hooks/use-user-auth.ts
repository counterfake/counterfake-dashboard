import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { DASHBOARD_CONFIG } from "@/common/lib/config/dashboard";
import { ROUTES } from "@/common/lib/config/routes";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { userAuthService } from "../services/user-auth.service";
import { LoginCredentials } from "../types/user-auth.types";

export function useUserLogin() {
  const authStore = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return userAuthService.login(credentials);
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
      return userAuthService.logout();
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
  return useMutation({
    mutationFn: () => {
      return userAuthService.refreshToken();
    },
  });
}
