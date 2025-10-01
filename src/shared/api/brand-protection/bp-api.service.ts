import { bpApi } from "./bp-api.instance";
import { BP_API_ENDPOINTS } from "./bp-api.config";
import {
  RefreshTokenResponseDto,
  RefreshTokenRequestDto,
  BrandsQueryDto,
  BrandsResponseDto,
  GroupBrandsResponseDto,
  GroupBrandsQueryDto,
  UpdateSelectedCompanyRequestDto,
  GetProfileByIdParams,
  GetProfileByIdResponse,
  ProductsQueryDto,
  ProductsResponseDto,
  ProductDto,
  UpdateProfileRequestDto,
} from "./bp-api.types";
import {
  RefreshTokenRequestDtoSchema,
  RefreshTokenResponseDtoSchema,
  BrandsQueryDtoSchema,
  BrandsResponseDtoSchema,
  GroupBrandsQueryDtoSchema,
  GroupBrandsResponseDtoSchema,
  UpdateSelectedCompanyRequestDtoSchema,
  GetProfileByIdParamsSchema,
  GetProfileByIdResponseSchema,
  ProductsQueryDtoSchema,
  ProductsResponseDtoSchema,
  ProductResponseDtoSchema,
  UpdateProfileRequestDtoSchema,
} from "./bp-api.schemas";

// --------------------------
// Auth Services => /auth
// --------------------------
export const refreshToken = (data: RefreshTokenRequestDto) => {
  return bpApi.post<RefreshTokenResponseDto>(BP_API_ENDPOINTS.refresh, data, {
    validationSchemas: {
      data: RefreshTokenRequestDtoSchema,
      responseData: RefreshTokenResponseDtoSchema,
    },
  });
};

export const updateSelectedCompany = (
  data: UpdateSelectedCompanyRequestDto
) => {
  return bpApi.post(BP_API_ENDPOINTS.selectedCompany, data, {
    validationSchemas: {
      data: UpdateSelectedCompanyRequestDtoSchema,
    },
  });
};

// --------------------------
// Brands Services => /brands
// --------------------------
export const getBrands = (params: BrandsQueryDto) => {
  return bpApi.get<BrandsResponseDto>(BP_API_ENDPOINTS.brands, {
    params,
    validationSchemas: {
      params: BrandsQueryDtoSchema,
      responseData: BrandsResponseDtoSchema,
    },
  });
};

// --------------------------
// Group Brand Services => /group-brand
// --------------------------
export const getGroupBrands = (params: GroupBrandsQueryDto) => {
  return bpApi.get<GroupBrandsResponseDto>(BP_API_ENDPOINTS.groupBrands, {
    params,
    validationSchemas: {
      params: GroupBrandsQueryDtoSchema,
      responseData: GroupBrandsResponseDtoSchema,
    },
  });
};

// --------------------------
// Profile Services => /profile
// --------------------------
export const getProfileById = async (
  id: number,
  params: GetProfileByIdParams
) => {
  const response = await bpApi.get<GetProfileByIdResponse>(
    `${BP_API_ENDPOINTS.profiles}/${id}`,
    {
      params,
      validationSchemas: {
        params: GetProfileByIdParamsSchema,
        responseData: GetProfileByIdResponseSchema,
      },
    }
  );

  if (!response.success) throw new Error(response.error.message);

  return response.data;
};

export const updateProfile = async (
  id: number,
  data: UpdateProfileRequestDto
) => {
  const response = await bpApi.patch(
    `${BP_API_ENDPOINTS.profiles}/${id}`,
    data,
    {
      validationSchemas: {
        data: UpdateProfileRequestDtoSchema,
      },
    }
  );

  if (!response.success) throw new Error(response.error.message);

  return response.data;
};

// --------------------------
// Products Services => /products
// --------------------------
export const getProductById = async (id: string) => {
  const response = await bpApi.get<ProductDto>(
    `${BP_API_ENDPOINTS.products}/${id}`,
    {
      validationSchemas: {
        responseData: ProductResponseDtoSchema,
      },
    }
  );

  if (!response.success) throw new Error(response.error.message);

  return response.data;
};

export const getProducts = async (params: ProductsQueryDto) => {
  const response = await bpApi.get<ProductsResponseDto>(
    BP_API_ENDPOINTS.products,
    {
      params,
      validationSchemas: {
        params: ProductsQueryDtoSchema,
        responseData: ProductsResponseDtoSchema,
      },
    }
  );

  if (!response.success) throw new Error(response.error.message);

  return response.data;
};
