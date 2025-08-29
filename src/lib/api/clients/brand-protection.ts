import { AxiosError, AxiosRequestConfig } from "axios";

import { ROUTES } from "@/lib/config/routes";
import { API_CONFIG } from "@/lib/config/api";

import { useAuthStore } from "@/lib/stores/auth-store";

// Services
import { AuthService } from "../services/brand-protection/auth-service";
import { ProductService } from "../services/brand-protection/product-service";
import { ResultService } from "../services/brand-protection/result-service";
import { BrandService } from "../services/brand-protection/brand-service";
import { GroupBrandService } from "../services/brand-protection/group-brand-service";
import { ProductCategoryService } from "../services/brand-protection/product-category-service";
import { ProductReportStatusService } from "../services/brand-protection/product-report-status-service";
import { CategoryReasonsService } from "../services/brand-protection/product-category-reason-service";
import { ClassificationService } from "../services/brand-protection/classification-service";
import { SellerService } from "../services/brand-protection/seller-service";
import { ProfileService } from "../services/brand-protection/profile-service";

import { HttpClient } from "../http-client";

/**
 * Brand Protection API Client
 */
export class BrandProtectionAPIClient extends HttpClient {
  // Services
  public readonly authService = new AuthService(this);
  public readonly productService = new ProductService(this);
  public readonly resultService = new ResultService(this);
  public readonly brandService = new BrandService(this);
  public readonly groupBrandService = new GroupBrandService(this);
  public readonly productCategoryService = new ProductCategoryService();
  public readonly productReportStatusService = new ProductReportStatusService();
  public readonly categoryReasonService = new CategoryReasonsService(this);
  public readonly classificationService = new ClassificationService(this);
  public readonly sellerService = new SellerService(this);
  public readonly profileService = new ProfileService(this);

  constructor() {
    super({
      baseURL: API_CONFIG.bpApi.baseURL,
      retries: 1,
      throwOnError: false,
    });

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

          try {
            // Try to refresh token
            const newToken = await this.authService.refreshToken();

            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              return this.client(originalRequest);
            }
          } catch (refreshError) {
            try {
              await this.authService.logout();

              if (typeof window !== "undefined") {
                window.location.href = ROUTES.UNAUTHORIZED;
              }
            } catch (logoutError) {
              console.error("Logout error", logoutError);
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export const bpApiClient = new BrandProtectionAPIClient();
