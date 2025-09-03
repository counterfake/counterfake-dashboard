import { authTokensSchema, userSchema } from "@/common/types/auth";

import { API_ENDPOINTS } from "@/common/lib/config/api";

import { HttpClient } from "@/common/lib/api/http-client";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { ErrorHandler } from "@/common/lib/utils/error-handler";

import { baseApiClient } from "@/common/lib/api/api-client";

import { userService } from "./user.service";

import {
  type LoginCredentials,
  type LoginResponse,
  type RefreshTokenRequest,
  type RefreshTokenResponse,
  type ResetPasswordRequest,
  type SelectedCompanyRequest,
  type SetPasswordRequest,
} from "../types/user-auth.types";

import { loginCredentialsSchema } from "../schemas/user-auth.schemas";

export class UserAuthService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  // Context key for error handler
  private getContextKey(functionKey: string) {
    return `${this.constructor.name}.${functionKey}`;
  }

  async login(credentials: LoginCredentials) {
    try {
      // Credentials validation
      const validatedCredentials = loginCredentialsSchema.parse(credentials);

      // API call
      const response = await baseApiClient.post<LoginResponse>(
        this.endpoints.login,
        validatedCredentials,
        { throwOnError: true }
      );

      // Token validation
      const validatedTokens = authTokensSchema.parse({
        accessToken: response.data?.access_token,
        refreshToken: response.data?.refresh_token,
        expiresIn: Number(response.data?.expires_in),
        fetchedAt: Date.now(),
      });

      useAuthStore.getState().setTokens(validatedTokens);

      // Fetch and save user data to store
      const userResponse = await userService.fetchUser(true);

      return { success: userResponse.success };
    } catch (error) {
      const appError = ErrorHandler.handle(
        error,
        this.getContextKey(this.login.name)
      );

      useAuthStore.getState().clear();

      return { success: false, error: appError };
    }
  }

  async updatePassword(data: SetPasswordRequest) {
    return baseApiClient.post(this.endpoints.setPassword, data);
  }

  async resetPassword(data: ResetPasswordRequest) {
    return baseApiClient.post(this.endpoints.resetPassword, data);
  }

  async updateSelectedCompany(data: SelectedCompanyRequest) {
    return baseApiClient.post(this.endpoints.selectedCompany, data);
  }

  async refreshToken() {
    const refreshTokenValue = useAuthStore.getState().tokens?.refreshToken;

    if (!refreshTokenValue) {
      return HttpClient.errorResult(
        new Error("Refresh token not found"),
        this.getContextKey(this.refreshToken.name)
      );
    }

    const response = await baseApiClient.post<
      RefreshTokenResponse,
      RefreshTokenRequest
    >(this.endpoints.refresh, {
      token: refreshTokenValue,
    });

    if (!response.success) {
      return HttpClient.errorResult(
        response.error,
        this.getContextKey(this.refreshToken.name)
      );
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
        this.getContextKey(this.refreshToken.name)
      );
    }

    useAuthStore.getState().setTokens(validatedTokens.data);

    return response;
  }

  async logout() {
    const response = await baseApiClient.post(this.endpoints.logout);

    useAuthStore.getState().clear();

    return response;
  }

  async isAuthenticated() {
    const response = baseApiClient.post(this.endpoints.authenticated);

    return response;
  }
}

export const userAuthService = new UserAuthService();
