import { z } from "zod";

import { sellerSchema } from "@/common/types/brand-protection/sellers";
import { categoryReasonSchema } from "@/common/types/brand-protection/category-reasons";

// --------------------------
// Params Schemas
// --------------------------
export const getProductsParamsSchema = z.object({
  expand_relations: z.boolean().or(z.string()).optional(),
  page_number: z.number().or(z.string()).optional(),
  page_size: z.number().or(z.string()).optional(),
  brand: z.string().optional(),
  platform: z.string().or(z.number()).optional(),
  profile: z.string().optional(),
  fields: z.string().optional(),
  hidden_classes: z.boolean().optional(),
  category: z.string().or(z.number()).optional(),
  search: z.string().optional(),
});

export const getProductByIdParamsSchema = z.object({
  expand_relations: z.string().optional(),
  fields: z.string().optional(),
});

// --------------------------
// Response Schemas
// --------------------------
export const getProductByIdResponseSchema = z.object({
  analyse_summary: z.string(),
  brand: z.union([
    z.number(),
    z.object({
      id: z.number(),
      brand_slug: z.string(),
      brand_name: z.string(),
      reference_id: z.number(),
    }),
  ]),
  category: z.number(),
  category_image: z.number(),
  category_regex: z.number(),
  category_reasons: z.array(categoryReasonSchema),
  category_text: z.number(),
  comments: z.any(), // TODO: Define type
  created_at: z.string(),
  currency: z.string(),
  delete_reason: z.any(),
  deleted_at: z.string(),
  description_text: z.string(),
  discountedPrice: z.number(),
  fake_score: z.number(),
  gender: z.any(),
  id: z.number(),
  images: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      path: z.string(),
      product: z.object({
        id: z.number(),
      }),
    })
  ),
  is_child: z.boolean(),
  is_closed: z.boolean(),
  is_special_category: z.boolean(),
  platform: z.object({
    id: z.number(),
    name: z.string(),
    in_scope: z.boolean(),
    icon_link: z.string(),
    description: z.string(),
    is_secure: z.boolean(),
    contact_mail: z.string(),
    updated_at: z.string(),
    created_at: z.string(),
    deleted_at: z.string(),
    is_second_hand_platform: z.boolean(),
    forced_category: z.any(),
    forced_brand: z.any(),
  }),
  price_actualPrice: z.number(),
  price_cluster: z.number(),
  price_isDiscounted: z.boolean(),
  price_isOutlier: z.boolean(),
  product_slug: z.string(),
  rating: z.number(),
  realPrice: z.number(),
  related_product: z.number(),
  report: z.number(),
  report_updated_at: z.string(),
  reported_at: z.string(),
  seller: sellerSchema,
  title_text: z.string(),
  unique: z.string(),
  updated_at: z.string(),
  url: z.string(),
  _category: z.number(),
  price_discountedPrice: z.number(),
  _price_discountedPrice: z.number(),
  _price_priceCluster: z.number(),
  _price_realPrice: z.number(),
  _related_product: z.number(),
  comments_keyword_exist: z.boolean(),
  classification: z
    .object({
      index: z.number(),
      name: z.string(),
      parent: z.number(),
    })
    .or(z.number()),
  commentsKeywordExist: z.boolean(),
});

export const getProductsResponseSchema = z.object({
  data_count: z.number(),
  page_count: z.number(),
  page_number: z.number(),
  page_size: z.number(),
  results: z.array(getProductByIdResponseSchema),
});
