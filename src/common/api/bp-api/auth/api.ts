/**
 * Brand Protection Auth Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type {
  LoginResponse,
  RefreshTokenResponse,
  RefreshTokenParams,
  LoginParams,
  SetPasswordParams,
  ResetPasswordParams,
  SelectedCompanyParams,
  WhoamiResponse,
} from "./types";

export class BpAuthApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async login(data: LoginParams) {
    return this.apiClient.post<LoginResponse>(this.endpoints.login, data);
  }

  async updatePassword(data: SetPasswordParams) {
    return this.apiClient.post(this.endpoints.setPassword, data);
  }

  async resetPassword(data: ResetPasswordParams) {
    return this.apiClient.post(this.endpoints.resetPassword, data);
  }

  async updateSelectedCompany(data: SelectedCompanyParams) {
    return this.apiClient.post(this.endpoints.selectedCompany, data);
  }

  async whoami() {
    return this.apiClient.post<WhoamiResponse>(this.endpoints.whoami);
  }

  async refreshToken(data: RefreshTokenParams) {
    return this.apiClient.post<RefreshTokenResponse>(
      this.endpoints.refresh,
      data
    );
  }

  async logout() {
    return this.apiClient.post(this.endpoints.logout);
  }

  async isAuthenticated() {
    return this.apiClient.post(this.endpoints.authenticated);
  }
}
