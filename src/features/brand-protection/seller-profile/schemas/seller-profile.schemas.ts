import { z } from "zod";

export const sellerSchema = z.object({
  comments: z.array(z.any()),
  created_at: z.string(),
  deleted_at: z.string(),
  description: z.string(),
  external_id: z.any(),
  id: z.number(),
  is_closed: z.boolean(),
  name: z.string(),
  picture_url: z.string(),
  profile: z.object({
    address: z.string(),
    category: z.number(),
    created_at: z.string(),
    deleted_at: z.string(),
    email: z.string(),
    id: z.number(),
    is_closed: z.boolean(),
    mersis_number: z.string(),
    phone_number: z.string(),
    platforms: z.string(),
    stats: z.string(),
    tax_number: z.string(),
    universal_name: z.string(),
    updated_at: z.string(),
  }),
  rating: z.string().or(z.number()),
  seller_slug: z.string(),
  updated_at: z.string(),
  url: z.string(),
  category: z.number(),
});

export const getSellersTopFakesParamsSchema = z.object({
  brand: z.string().optional(),
});

export const getSellersTopFakesResponseSchema = z.array(
  z.object({
    address: z.string(),
    brands: z.number().array(),
    category: z.number(),
    created_at: z.string(),
    deleted_at: z.string(),
    email: z.string(),
    fake_product_count: z.number(),
    fake_risk: z.number(),
    id: z.number(),
    mersis_number: z.string(),
    phone_number: z.string(),
    platforms: z.array(z.string()),
    product_count: z.number(),
    sellers: z.number().array(),
    stats: z.any(),
    tax_number: z.string(),
    universal_name: z.string(),
    updated_at: z.string(),
    is_closed: z.boolean(),
    profile_id: z.number(),
  })
);

export const getSellerProfileByIdParamsSchema = z.object({
  fields: z.string().optional(),
  brand: z.string().or(z.number()).optional(),
  expand_relations: z.string().optional(),
});

export const getSellerProfileByIdResponseSchema = z.object({
  address: z.string(),
  brands: z
    .array(
      z.object({
        id: z.number(),
        brand_slug: z.string(),
        brand_name: z.string(),
        reference_id: z.number(),
        official_classes: z.array(z.any()),
        group: z.any(),
        in_scope: z.boolean(),
      })
    )
    .or(z.number().array()),
  category: z.number(),
  created_at: z.string(),
  email: z.string(),
  id: z.number(),
  is_closed: z.boolean(),
  mersis_number: z.string(),
  phone_number: z.string(),
  platforms: z.any(), // TODO: Define type
  sellers: z.any(), // TODO: Define type
  stats: z.any(), // TODO: Define type
  tax_number: z.string(),
  universal_name: z.string(),
  updated_at: z.string(),
  ai_results: z.any(),
});
