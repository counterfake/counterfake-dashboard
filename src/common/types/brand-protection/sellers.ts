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

export type Seller = z.infer<typeof sellerSchema>;

export const getSellersTopFakesParamsSchema = z.object({
  brand: z.string().optional(),
});

export type GetSellersTopFakesParams = z.infer<
  typeof getSellersTopFakesParamsSchema
>;

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

export type GetSellersTopFakesResponse = z.infer<
  typeof getSellersTopFakesResponseSchema
>;
