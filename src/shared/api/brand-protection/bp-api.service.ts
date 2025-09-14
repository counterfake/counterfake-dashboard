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
} from "./bp-api.types";
import {
  RefreshTokenRequestDtoSchema,
  RefreshTokenResponseDtoSchema,
  BrandsQueryDtoSchema,
  BrandsResponseDtoSchema,
  GroupBrandsQueryDtoSchema,
  GroupBrandsResponseDtoSchema,
  UpdateSelectedCompanyRequestDtoSchema,
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
