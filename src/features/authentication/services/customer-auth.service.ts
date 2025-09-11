import { authTokensSchema } from "@/common/types/auth";

import { HttpClient } from "@/common/lib/api/http-client";

import { baseApiClient } from "@/common/lib/api/api-client";

import { BpAuthApi } from "@/common/api/bp-api/auth";

import { customerService } from "./customer.service";

export class CustomerAuthService {
  private readonly bpAuthApi: BpAuthApi;

  constructor() {
    this.bpAuthApi = new BpAuthApi(baseApiClient);
  }

  // Context key for error handler
  private getContextKey(functionKey: string) {
    return `${this.constructor.name}.${functionKey}`;
  }

  async login(credentials: { email: string; password: string }) {
    // API call
    const response = await this.bpAuthApi.login({
      username: credentials.email,
      password: credentials.password,
    });

    if (!response.success) {
      return HttpClient.errorResult(
        response.error,
        this.getContextKey(this.login.name)
      );
    }

    // Token validation
    const validatedTokens = authTokensSchema.safeParse({
      accessToken: response.data?.access_token,
      refreshToken: response.data?.refresh_token,
      expiresIn: Number(response.data?.expires_in),
      fetchedAt: Date.now(),
    });

    if (!validatedTokens.success) {
      return HttpClient.errorResult(
        validatedTokens.error,
        this.getContextKey(this.login.name)
      );
    }

    baseApiClient.setAuthorizationHeader(validatedTokens.data.accessToken);

    // Fetch and save user data to store
    const userResponse = await customerService.fetchCurrentCustomer();

    if (!userResponse.success) {
      return HttpClient.errorResult(
        userResponse.error,
        this.getContextKey(this.login.name)
      );
    }

    return HttpClient.successResult({
      tokens: validatedTokens.data,
      user: userResponse.data,
    });
  }

  async refreshToken(refreshTokenValue: string) {
    if (!refreshTokenValue) {
      return HttpClient.errorResult(
        new Error("Refresh token is not provided"),
        this.getContextKey(this.refreshToken.name)
      );
    }

    const response = await this.bpAuthApi.refreshToken({
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

    return HttpClient.successResult(validatedTokens.data);
  }

  async logout() {
    return this.bpAuthApi.logout();
  }

  async isAuthenticated() {
    return this.bpAuthApi.isAuthenticated();
  }
}

export const customerAuthService = new CustomerAuthService();
