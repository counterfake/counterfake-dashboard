import { baseApiClient } from "@/common/lib/api/api-client";
import { HttpClient } from "@/common/lib/api/http-client";

import {
  BpBrandsApi,
  type GetBrandsResponse,
} from "@/common/api/bp-api/brands";
import {
  BpGroupBrandApi,
  type GetGroupBrandsResponse,
} from "@/common/api/bp-api/group-brand";
import { BpAuthApi } from "@/common/api/bp-api/auth";
import { userSchema } from "@/common/types/auth";

export class CustomerService {
  private readonly bpAuthApi: BpAuthApi;
  private readonly bpBrandsApi: BpBrandsApi;
  private readonly bpGroupBrandsApi: BpGroupBrandApi;

  constructor() {
    this.bpAuthApi = new BpAuthApi(baseApiClient);
    this.bpBrandsApi = new BpBrandsApi(baseApiClient);
    this.bpGroupBrandsApi = new BpGroupBrandApi(baseApiClient);
  }

  // Context key for error handler
  private getContextKey(functionKey: string) {
    return `${this.constructor.name}.${functionKey}`;
  }

  public async fetchCurrentCustomer() {
    const functionName = this.fetchCurrentCustomer.name;

    const customerResponse = await this.bpAuthApi.whoami();

    if (!customerResponse.success)
      return HttpClient.errorResult(
        customerResponse.error,
        this.getContextKey(functionName)
      );

    const currentCustomer = customerResponse.data?.firebase_user;

    const groupBrandsResponse = await this.bpGroupBrandsApi.getGroupBrands({
      page_size: 150,
    });
    const brandsResponse = await this.bpBrandsApi.getBrands({
      page_size: 150,
      fields: "id,brand_name,brand_slug,group",
    });

    if (!groupBrandsResponse.success || !brandsResponse.success)
      return HttpClient.errorResult(
        groupBrandsResponse.error || brandsResponse.error,
        this.getContextKey(this.getCustomerBrandResult.name)
      );

    const groupBrands = groupBrandsResponse?.data?.results || [];
    const brands = brandsResponse?.data?.results || [];

    const userBrandResult = this.getCustomerBrandResult({
      userBrandName: currentCustomer?.selectedCompany?.brand_name,
      userBrandId: currentCustomer?.selectedCompany?.id,
      groupBrands,
      brands,
    });

    if (!userBrandResult?.brandId || !userBrandResult?.brandSlug) {
      return HttpClient.errorResult(
        new Error("Brand not found"),
        this.getContextKey(functionName)
      );
    }

    const validatedCustomer = userSchema.safeParse({
      id: currentCustomer?.uid, // Give firebase uid as id
      username: currentCustomer?.displayName,
      role: currentCustomer?.roles,
      brand: {
        name: currentCustomer?.selectedCompany?.brand_name,
        id: userBrandResult.brandId,
        slug: userBrandResult.brandSlug,
        isGroupBrand: userBrandResult.isGroupBrand,
        subBrands: userBrandResult.subBrands,
      },
    });

    if (!validatedCustomer.success)
      return HttpClient.errorResult(
        validatedCustomer.error,
        this.getContextKey(functionName)
      );

    return HttpClient.successResult(validatedCustomer.data);
  }

  private getCustomerBrandResult(data: {
    userBrandName?: string;
    userBrandId?: number;
    groupBrands: GetGroupBrandsResponse["results"];
    brands: GetBrandsResponse["results"];
  }) {
    const { userBrandName, userBrandId, groupBrands, brands } = data;

    /**
     * check if the selected brand is a group brand
     */
    const groupBrand = groupBrands?.find(
      (brand) =>
        brand?.name?.toLocaleLowerCase() === userBrandName?.toLocaleLowerCase()
    );

    let currentBrandId: string | null = null;
    let currentBrandSlug: string | null = null;
    let subBrands: number[] | null = null;

    if (groupBrand) {
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

    return {
      isGroupBrand: !!groupBrand,
      brandId: currentBrandId,
      brandSlug: currentBrandSlug,
      subBrands,
    };
  }
}

export const customerService = new CustomerService();
