import { AppError } from "@/shared/lib/error-handler";

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
  GetPlatformReportMailQueryDto,
  PlatformReportMailDto,
  ListPlatformReportMailQueryDto,
  ListPlatformReportMailResponseDto,
  CreatePlatformReportMailRequestDto,
  UpdateProductRequestDto,
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
  PlatformReportMailDtoSchema,
  GetPlatformReportMailQueryDtoSchema,
  ListPlatformReportMailQueryDtoSchema,
  ListPlatformReportMailResponseDtoSchema,
  CreatePlatformReportMailRequestDtoSchema,
  UpdateProductRequestDtoSchema,
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
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

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

  if (!response.success) throw new AppError(response.error);

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
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

  return response.data;
};

export const getProducts = async (params: ProductsQueryDto) => {
  const response = await bpApi.get<ProductsResponseDto>(
    BP_API_ENDPOINTS.products,
    {
      params,
      validationSchemas: {
        // params: ProductsQueryDtoSchema,
        // responseData: ProductsResponseDtoSchema,
      },
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

  return response.data;
};

export const updateProduct = async (
  id: number,
  data: UpdateProductRequestDto
) => {
  const response = await bpApi.patch(
    `${BP_API_ENDPOINTS.products}/${id}`,
    data,
    {
      validationSchemas: {
        data: UpdateProductRequestDtoSchema,
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

  return response.success;
};

// --------------------------
// Platform Report Mail Services => /platform_report_mail
// --------------------------
export const getPlatformReportMail = async (
  id: number,
  params: GetPlatformReportMailQueryDto
) => {
  const response = await bpApi.get<PlatformReportMailDto>(
    `${BP_API_ENDPOINTS.platformReportMail}/${id}`,
    {
      params,
      validationSchemas: {
        params: GetPlatformReportMailQueryDtoSchema,
        responseData: PlatformReportMailDtoSchema,
      },
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

  return response.data;
};

export const getPlatformReportMails = async (
  params: ListPlatformReportMailQueryDto
) => {
  const response = await bpApi.get<ListPlatformReportMailResponseDto>(
    `${BP_API_ENDPOINTS.platformReportMail}`,
    {
      params,
      validationSchemas: {
        params: ListPlatformReportMailQueryDtoSchema,
        responseData: ListPlatformReportMailResponseDtoSchema,
      },
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

  return response.data;
};

export const createPlatformReportMail = async (
  data: CreatePlatformReportMailRequestDto
) => {
  const response = await bpApi.post<ListPlatformReportMailResponseDto>(
    BP_API_ENDPOINTS.platformReportMail,
    data,
    {
      validationSchemas: {
        data: CreatePlatformReportMailRequestDtoSchema,
      },
    }
  );

  if (!response.success) throw new AppError(response.error);

  return response.success;
};
