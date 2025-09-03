import {
  // Schemas
  loginCredentialsSchema,

  // Types
  type LoginCredentials,
  type LoginResponse,
  type RefreshTokenRequest,
  type RefreshTokenResponse,
  type ResetPasswordRequest,
  type SelectedCompanyRequest,
  type SetPasswordRequest,
  type UserResponse,
} from "@/common/types/brand-protection/auth";
import { authTokensSchema, userSchema } from "@/common/types/auth";

import { API_ENDPOINTS } from "@/common/lib/config/api";

import { HttpClient } from "@/common/lib/api/http-client";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { ErrorHandler } from "@/common/lib/utils/error-handler";

import { BrandService } from "./brand-service";
import { GroupBrandService } from "./group-brand-service";

export class AuthService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  private brandService: BrandService;
  private groupBrandService: GroupBrandService;

  constructor(private httpClient: HttpClient) {
    this.brandService = new BrandService(this.httpClient);
    this.groupBrandService = new GroupBrandService(this.httpClient);
  }

  async login(credentials: LoginCredentials) {
    try {
      // Credentials validation
      const validatedCredentials = loginCredentialsSchema.parse(credentials);

      // API call
      const response = await this.httpClient.post<LoginResponse>(
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

      const userUpdateResponse = await this.updateUser();

      if (!userUpdateResponse.success) throw userUpdateResponse.error;

      return { success: true };
    } catch (error) {
      const appError = ErrorHandler.handle(error, "BpAuthService.login");

      useAuthStore.getState().clear();

      return { success: false, error: appError };
    }
  }

  /**
   * This function is used to update the user data in the store.
   * It is used when the user data is updated in the store.
   * */
  async updateUser() {
    try {
      const userResponse = await this.whoami();

      if (!userResponse.success) throw userResponse.error;

      const user = userResponse.data?.firebase_user;

      const userBrandData = await this.getUserBrandData(
        user?.selectedCompany?.brand_name, // brand name
        user?.selectedCompany.id // brand id
      );

      const validatedUser = userSchema.parse({
        id: user?.id,
        username: user?.displayName,
        role: user?.roles,
        brand: {
          name: user?.selectedCompany.brand_name,
          id: userBrandData.brandId,
          slug: user?.selectedCompany.brand_name,
          isGroupBrand: userBrandData?.isGroupBrand,
          subBrands: userBrandData?.subBrands,
          accessibleBrands: userBrandData?.accessibleBrands,
        },
      });

      useAuthStore.getState().setUser(validatedUser);

      return { success: true };
    } catch (error) {
      const appError = ErrorHandler.handle(error, "BpAuthService.updateUser");

      useAuthStore.getState().clear();

      return { success: false, error: appError };
    }
  }

  async whoami() {
    return this.httpClient.post<UserResponse>(this.endpoints.whoami);
  }

  async updatePassword(data: SetPasswordRequest) {
    return this.httpClient.post(this.endpoints.setPassword, data);
  }

  async resetPassword(data: ResetPasswordRequest) {
    return this.httpClient.post(this.endpoints.resetPassword, data);
  }

  async updateSelectedCompany(data: SelectedCompanyRequest) {
    return this.httpClient.post(this.endpoints.selectedCompany, data);
  }

  async refreshToken() {
    const refreshTokenValue = useAuthStore.getState().tokens?.refreshToken;

    if (!refreshTokenValue) {
      return HttpClient.errorResult(
        new Error("Refresh token not found"),
        "AuthService.refreshToken"
      );
    }

    const response = await this.httpClient.post<
      RefreshTokenResponse,
      RefreshTokenRequest
    >(this.endpoints.refresh, {
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

  async logout() {
    const response = await this.httpClient.post(this.endpoints.logout);

    useAuthStore.getState().clear();

    return response;
  }

  private async getUserBrandData(
    brandName?: string,
    brandId?: number,
    accessibleBrands?: { brands: number[]; groupBrands: number[] }
  ) {
    const groupBrandsResponse = await this.groupBrandService.getGroupBrands({
      page_size: 150,
    });
    const brandsResponse = await this.brandService.getBrands({
      page_size: 150,
      fields: "id,brand_name,brand_slug,group",
    });

    if (!groupBrandsResponse.success) throw groupBrandsResponse.error;
    if (!brandsResponse.success) throw brandsResponse.error;

    const groupBrands = groupBrandsResponse?.data?.results || [];
    const brands = brandsResponse?.data?.results || [];

    /**
     * check if the selected brand is a group brand
     */
    const isGroupBrand = groupBrands?.some(
      (brand) => brand?.name === brandName
    );

    let currentBrandId: string | null = null;
    let currentBrandSlug: string | null = null;
    let subBrands: number[] | null = null;

    if (isGroupBrand) {
      // find selected group brand data
      const groupBrand = groupBrands?.find(
        (brand) => brand?.name === brandName
      );

      /**
       * if the selected brand is a group brand, set the child brands
       * of the group brand as strings. In this way, it provides easy
       * use without the need for type conversion in api requests related to the brand.
       */
      const childBrandIds: number[] = brands
        // find and filter child brands matching parent brand
        .filter((childBrand) => childBrand?.group === groupBrand?.id)
        // give the ids of child brands as an array
        .map((childBrand) => childBrand?.id);

      currentBrandId = childBrandIds.join(",");
      currentBrandSlug = groupBrand?.slug || null;
      subBrands = childBrandIds;
    } else {
      // if the selected brand is not a group brand, set the selected brand directly
      const brand = brands?.find((item) => item?.brand_name === brandName);
      currentBrandId = String(brandId);
      currentBrandSlug = brand?.brand_slug || null;
    }

    // Handle accessible group brands
    const accessibleGroupBrandsData = groupBrands
      ?.filter((groupBrand) =>
        accessibleBrands?.groupBrands?.some(
          (accessibleGroupBrandId) => accessibleGroupBrandId === groupBrand?.id
        )
      )
      ?.map((groupBrand) => ({
        id: groupBrand?.id,
        name: groupBrand?.name,
      }));

    // Handle accessible brands
    const accessibleBrandsData = brands
      ?.filter((brand) =>
        accessibleBrands?.brands?.some(
          (accessibleBrandId) => accessibleBrandId === brand?.id
        )
      )
      ?.map((brand) => ({
        id: brand?.id,
        name: brand?.brand_name,
      }));

    return {
      isGroupBrand,
      brandId: currentBrandId,
      brandSlug: currentBrandSlug,
      subBrands,
      accessibleBrands: [...accessibleBrandsData, ...accessibleGroupBrandsData],
    };
  }
}
