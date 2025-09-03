import { baseApiClient } from "@/common/lib/api/api-client";
import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";
import { useAuthStore } from "@/common/lib/stores/auth-store";

import { userSchema } from "@/common/types/auth";

import { brandService } from "./brand.service";

import { WhoamiResponse } from "../types/user.types";

export class UserService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  // Context key for error handler
  private getContextKey(functionKey: string) {
    return `${this.constructor.name}.${functionKey}`;
  }

  public async fetchUser(saveToStore = true) {
    const userResponse = await baseApiClient.post<WhoamiResponse>(
      this.endpoints.whoami
    );

    if (!userResponse.success)
      return HttpClient.errorResult(
        userResponse.error,
        this.getContextKey(this.fetchUser.name)
      );

    const user = userResponse.data?.firebase_user;

    console.log({
      brandName: user?.selectedCompany?.brand_name,
      brandId: user?.selectedCompany?.id,
    });

    const userBrandResult = await this.getUserBrandResult(
      user?.selectedCompany?.brand_name,
      user?.selectedCompany?.id
    );

    if (!userBrandResult.success)
      return HttpClient.errorResult(
        userBrandResult.error,
        this.getContextKey(this.fetchUser.name)
      );

    console.log(userBrandResult.data);

    const validatedUser = userSchema.safeParse({
      id: user?.id,
      username: user?.displayName,
      role: user?.roles,
      brand: {
        name: user?.selectedCompany?.brand_name,
        id: userBrandResult.data?.brandId,
        slug: userBrandResult.data?.brandSlug,
        isGroupBrand: userBrandResult.data?.isGroupBrand,
        subBrands: userBrandResult.data?.subBrands,
      },
    });

    if (!validatedUser.success)
      return HttpClient.errorResult(
        validatedUser.error,
        this.getContextKey(this.fetchUser.name)
      );

    if (saveToStore) {
      useAuthStore.getState().setUser(validatedUser.data);
    }

    return HttpClient.successResult(validatedUser.data);
  }

  private async getUserBrandResult(
    userBrandName?: string,
    userBrandId?: number
  ) {
    const groupBrandsResponse = await brandService.getGroupBrands({
      page_size: 150,
    });
    const brandsResponse = await brandService.getBrands({
      page_size: 150,
      fields: "id,brand_name,brand_slug,group",
    });

    if (!groupBrandsResponse.success || !brandsResponse.success)
      return HttpClient.errorResult(
        groupBrandsResponse.error || brandsResponse.error,
        this.getContextKey(this.getUserBrandResult.name)
      );

    const groupBrands = groupBrandsResponse?.data?.results || [];
    const brands = brandsResponse?.data?.results || [];

    /**
     * check if the selected brand is a group brand
     */
    const isGroupBrand = groupBrands?.some(
      (brand) => brand?.name === userBrandName
    );

    let currentBrandId: string | null = null;
    let currentBrandSlug: string | null = null;
    let subBrands: number[] | null = null;

    if (isGroupBrand) {
      // find selected group brand data
      const groupBrand = groupBrands?.find(
        (brand) => brand?.name === userBrandName
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
      const brand = brands?.find(
        (item) =>
          item?.brand_name?.toLocaleLowerCase() ===
          userBrandName?.toLocaleLowerCase()
      );
      currentBrandId = String(userBrandId);
      currentBrandSlug = brand?.brand_slug || null;
    }

    return HttpClient.successResult({
      isGroupBrand,
      brandId: currentBrandId,
      brandSlug: currentBrandSlug,
      subBrands,
    });
  }
}

export const userService = new UserService();
