import { z } from "zod";

import { getProductByIdResponseSchema } from "../products/schemas";

// --------------------------
// Params Schemas
// --------------------------
export const getResultsParamsSchema = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
  brand: z.string().optional(),
  fields: z.string().optional(),
  product_count: z.string().optional(),
  report: z.string().optional(),
  category: z.string().optional(),
  expand_relations: z.string().optional(),
  url: z.string().optional().nullable(),
  platform: z.string().optional(),
  parent_product: z.string().optional(),
  category_reasons: z.string().optional(),
  search: z.string().optional().nullable(),
  order_by: z
    .enum(["fake_score", "price_actualPrice", "reported_at"])
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const getResultsAnalysisParamsSchema = z.object({
  brand: z.string().optional(),
  parent_product: z.string().optional(),
  category: z.string().optional(),
  report: z.string().optional(),
  platform: z.string().optional(),
  profile: z.string().optional(),
  product_count: z.string().optional(),
  search: z.string().optional(),
});

export const getResultsAnalysisMonthlyParamsSchema = z.object({
  brand: z.string().optional(),
  limit: z.number().optional(),
  sortByMonth: z.boolean().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

// --------------------------
// Response Schemas
// --------------------------
export const getResultsResponseSchema = z.object({
  data_count: z.number(),
  page_count: z.number(),
  page_number: z.number(),
  page_size: z.number(),
  results: z.array(getProductByIdResponseSchema),
});

export const getResultsAnalysisResponseSchema = z.object({
  active_platform_count: z.number(),
  average_price: z.number(),
  count: z.number(),
  in_scope_platform_count: z.number(),
  platform_analysis: z.array(
    z.object({ id: z.number(), name: z.string(), value: z.number() })
  ),
  platform_count: z.number(),
  seller_analysis: z.array(
    z.object({ profile_id: z.number(), name: z.string(), value: z.number() })
  ),
  total_price: z.number(),
  total_recall: z.number(),
  total_related_products_count: z.number(),
  total_seller_count: z.number(),
});

export const getResultsAnalysisMonthlyResponseSchema = z.array(
  z.object({
    closed_product_count: z.number(),
    closed_product_ratio: z.number(),
    closed_seller_count: z.number(),
    closed_seller_ratio: z.number(),
    month: z.string(),
    risky_product_count: z.number(),
    risky_seller_count: z.number(),
  })
);
