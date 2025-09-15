import { z } from "zod";

// --------------------------
// Auth
// --------------------------
export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  fetchedAt: z.number(),
});

export const RefreshTokenRequestDtoSchema = z.object({
  token: z.string(),
});

export const RefreshTokenResponseDtoSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.string(),
});

export const UpdateSelectedCompanyRequestDtoSchema = z.object({
  id: z.number(),
  brand_name: z.string(),
});

// --------------------------
// Brands
// --------------------------
export const BrandsQueryDtoSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
  group: z.string().optional(),
  fields: z.string().optional(),
  expand_relations: z.string().optional(),
});

export const BrandsResponseDtoSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      brand_name: z.string(),
      brand_slug: z.string(),
      reference_id: z.number(),
      parent_classes: z.number().array(),
      official_classes: z.number().array(),
      group: z.number().nullable(),
      in_scope: z.boolean(),
      keywords: z.string(),
    })
  ),
  data_count: z.number(),
  generated_at: z.string(),
  page_count: z.number(),
  page_number: z.number(),
  page_size: z.number(),
});

// --------------------------
// Group Brands
// --------------------------
export const GroupBrandsQueryDtoSchema = z.object({
  page_size: z.number().optional(),
});

// --------------------------
// Response Schemas
// --------------------------
export const GroupBrandsResponseDtoSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
});
