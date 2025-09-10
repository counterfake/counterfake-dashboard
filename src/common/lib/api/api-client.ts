import { AxiosError, AxiosRequestConfig } from "axios";

import { ROUTES } from "@/common/lib/config/routes";
import { API_CONFIG } from "@/common/lib/config/api";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { authTokensSchema } from "@/common/types/auth";

import { HttpClient } from "./http-client";
import { BpAuthApi } from "@/common/api/bp-api/auth";

/**
 * Base API Client
 */
export class BaseApiClient extends HttpClient {
  private authApi: BpAuthApi;

  constructor() {
    super({
      baseURL: API_CONFIG.bpApi.baseURL,
      throwOnError: false,
    });

    this.authApi = new BpAuthApi(this);

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = useAuthStore.getState().tokens?.accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
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
          const newToken = await this.refreshToken();

          if (!newToken.success && !originalRequest.headers) {
            // Clear auth store
            useAuthStore.getState().clear();

            if (typeof window !== "undefined") {
              window.location.href = `${ROUTES.UNAUTHORIZED}?reason=refresh-token-failed`;
            }

            return Promise.reject(newToken);
          }

          const authorization = `Bearer ${newToken}`;

          originalRequest.headers.Authorization = authorization;
          this.client.defaults.headers.common.Authorization = authorization;

          return this.client(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  public setAuthorizationHeader(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  public async refreshToken() {
    const refreshTokenValue = useAuthStore.getState().tokens?.refreshToken;

    if (!refreshTokenValue) {
      return HttpClient.errorResult(
        new Error("Refresh token not found"),
        "AuthService.refreshToken"
      );
    }

    const response = await this.authApi.refreshToken({
      token: refreshTokenValue,
    });

    if (!response.success) {
      // Return with the error result
      return response;
    }

    const validatedTokens = authTokensSchema.safeParse({
      accessToken: response.data?.access_token,
      refreshToken: response.data?.refresh_token,
      expiresIn: Number(response.data?.expires_in),
      fetchedAt: Date.now(),
    });

    if (!validatedTokens.success) {
      return HttpClient.errorResult(
        validatedTokens.error,
        "AuthService.refreshToken"
      );
    }

    useAuthStore.getState().setTokens(validatedTokens.data);

    return response;
  }
}

export const baseApiClient = new BaseApiClient();

export const productAnalysisApiClient = new HttpClient({
  baseURL: API_CONFIG.productAnalysisApi.baseURL,
});
