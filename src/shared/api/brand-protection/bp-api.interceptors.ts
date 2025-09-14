import { AxiosError, AxiosRequestConfig } from "axios";

import { PAGE_ROUTES } from "@/shared/routes/page-routes";

import { getSession, refreshTokens, removeSession } from "./bp-api.auth";
import { bpApi } from "./bp-api.instance";

export function setupInterceptors() {
  bpApi.client.interceptors.request.use(
    (config) => {
      // TODO (IMPORTANT): Once the project is fully transitioned to feature-sliced ​​design, remove this logic from here.
      // ! This logic has been added here temporarily.
      const oldVersionAuthStorage = localStorage.getItem(
        "auth-storage" // This is the auth storage key in /src/common/lib/stores/auth-store.ts
      ) as string;

      const session = getSession();

      let token;

      if (session.accessToken) {
        token = session.accessToken;
      } else if (oldVersionAuthStorage) {
        const oldVersionTokens = JSON.parse(oldVersionAuthStorage) as {
          state: {
            tokens: {
              accessToken: string;
            };
          };
        };

        token = oldVersionTokens.state.tokens.accessToken;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  bpApi.client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status === 401 ||
        (error.response?.status === 403 && !originalRequest._retry)
      ) {
        originalRequest._retry = true;

        // Try to refresh token
        const newToken = await refreshTokens();

        if (!newToken.success && !originalRequest.headers) {
          // Clear auth store
          removeSession();

          if (typeof window !== "undefined") {
            window.location.href = `${PAGE_ROUTES.UNAUTHORIZED}?reason=refresh-token-failed`;
          }

          return Promise.reject(newToken);
        }

        const authorization = `Bearer ${newToken}`;

        originalRequest.headers.Authorization = authorization;
        bpApi.client.defaults.headers.common.Authorization = authorization;

        return bpApi.client(originalRequest);
      }

      return Promise.reject(error);
    }
  );
}
