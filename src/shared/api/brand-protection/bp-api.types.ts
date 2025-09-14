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
