import { z } from "zod";

import {
  AuthTokensSchema,
  RefreshTokenRequestDtoSchema,
  RefreshTokenResponseDtoSchema,
  UpdateSelectedCompanyRequestDtoSchema,
  BrandsQueryDtoSchema,
  BrandsResponseDtoSchema,
  GroupBrandsQueryDtoSchema,
  GroupBrandsResponseDtoSchema,
  GetProfileByIdParamsSchema,
  GetProfileByIdResponseSchema,
  SellerSchema,
  PlatformSchema,
  ProductsQueryDtoSchema,
  ProductsResponseDtoSchema,
  ProductResponseDtoSchema,
  UpdateProfileRequestDtoSchema,
} from "./bp-api.schemas";

// --------------------------
// Auth
// --------------------------
export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export type RefreshTokenRequestDto = z.infer<
  typeof RefreshTokenRequestDtoSchema
>;
export type RefreshTokenResponseDto = z.infer<
  typeof RefreshTokenResponseDtoSchema
>;

export type UpdateSelectedCompanyRequestDto = z.infer<
  typeof UpdateSelectedCompanyRequestDtoSchema
>;

// --------------------------
// Brands
// --------------------------
export type BrandsQueryDto = z.infer<typeof BrandsQueryDtoSchema>;
export type BrandsResponseDto = z.infer<typeof BrandsResponseDtoSchema>;

// --------------------------
// Group Brands
// --------------------------
export type GroupBrandsQueryDto = z.infer<typeof GroupBrandsQueryDtoSchema>;
export type GroupBrandsResponseDto = z.infer<
  typeof GroupBrandsResponseDtoSchema
>;

// --------------------------
// Platform
// --------------------------
export type Platform = z.infer<typeof PlatformSchema>;

// --------------------------
// Seller
// --------------------------
export type Seller = z.infer<typeof SellerSchema>;

// --------------------------
// Profile
// --------------------------
export type GetProfileByIdParams = z.infer<typeof GetProfileByIdParamsSchema>;
export type GetProfileByIdResponse = z.infer<
  typeof GetProfileByIdResponseSchema
>;

export type UpdateProfileRequestDto = z.infer<
  typeof UpdateProfileRequestDtoSchema
>;

// --------------------------
// Products
// --------------------------
export type ProductDto = z.infer<typeof ProductResponseDtoSchema>;
export type ProductsQueryDto = z.infer<typeof ProductsQueryDtoSchema>;
export type ProductsResponseDto = z.infer<typeof ProductsResponseDtoSchema>;
