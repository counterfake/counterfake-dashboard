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

export const GroupBrandsResponseDtoSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
});

// --------------------------
// Platform
// --------------------------
export const PlatformSchema = z.object({
  contact_mail: z.string(),
  created_at: z.string(),
  deleted_at: z.string().nullable(),
  description: z.string(),
  forced_category: z.any(),
  forced_brand: z.any(),
  icon_link: z.string(),
  id: z.number(),
  in_scope: z.boolean(),
  is_second_hand_platform: z.boolean(),
  is_secure: z.boolean(),
  links: z
    .array(
      z.object({
        brand: z.string(),
        id: z.number(),
        link: z.string(),
        platform: z.number(),
      })
    )
    .optional(),
  name: z.string(),
  updated_at: z.string(),
});

// --------------------------
// Seller
// --------------------------
export const SellerSchema = z.object({
  comments: z.array(z.any()),
  complaints: z.array(z.any()),
  complaints_scraped_at: z.string().nullable(),
  created_at: z.string(),
  deleted_at: z.string().nullable(),
  description: z.string(),
  details: z.any(),
  external_id: z.string(),
  id: z.number(),
  is_closed: z.boolean(),
  is_embedded: z.boolean(),
  is_official: z.boolean(),
  name: z.string(),
  picture_url: z.string(),
  platform: z.union([z.number(), PlatformSchema]).optional(),
  profile: z.number().optional(),
  rating: z.number(),
  scraped_at: z.string().nullable(),
  seller_slug: z.string(),
  updated_at: z.string(),
  url: z.string(),
});

// --------------------------
// Profile
// --------------------------
export const GetProfileByIdParamsSchema = z.object({
  fields: z.string().optional(),
  brand: z.string().or(z.number()).optional(),
  expand_relations: z.string().optional(),
});

export const GetProfileByIdResponseSchema = z.object({
  address: z.string().optional(),
  brands: z.array(
    z.union([
      z.object({
        id: z.number(),
        brand_slug: z.string(),
        brand_name: z.string(),
        reference_id: z.number(),
        official_classes: z.array(z.any()).optional(),
        group: z.any().optional(),
        in_scope: z.boolean().optional(),
      }),
      z.number(),
    ])
  ),
  category: z.number().optional(),
  created_at: z.string().optional(),
  email: z.string().optional(),
  id: z.number().optional(),
  is_closed: z.boolean().optional(),
  mersis_number: z.string().optional(),
  phone_number: z.string().optional(),
  platforms: z.array(PlatformSchema).optional(),
  sellers: z.array(SellerSchema).optional(),
  stats: z
    .object({
      category_dispersion: z.record(
        z.string(),
        z.record(
          z.enum([
            "BRAND_ABUSE",
            "BRAND_DECISION",
            "DESIGN",
            "IMAGE_CLONE",
            "IRRELEVANT",
            "NOT_RISKY",
            "ON_HOLDS",
            "PARALLEL_IMPORT",
            "RISKY",
            "SECOND_HAND",
            "THIRD_PARTY",
          ]),
          z.number()
        )
      ),
      closed_product_count: z.record(
        z.string(),
        z.record(
          z.enum([
            "BRAND_ABUSE_FIXED",
            "EXTERNAL_ENDPOINTS",
            "INACTIVE",
            "OUT_OF_STOCK",
            "PLATFORM_CLOSED",
            "REDIRECTED_URL",
            "SELLER_CLOSED",
            "USER_CHOICE",
          ]),
          z.number()
        )
      ),
      product_counts: z.record(z.string(), z.record(z.string(), z.number())),
    })
    .optional(),
  tax_number: z.string().optional(),
  universal_name: z.string().optional(),
  updated_at: z.string().optional(),
  ai_results: z
    .object({
      summary: z.string().optional(),
    })
    .optional(),
});

export const UpdateProfileRequestDtoSchema = z.object({
  category: z.number().optional(),
});

// --------------------------
// Products
// --------------------------
export const ProductResponseDtoSchema = z.object({
  analyse_summary: z.string().optional(),
  brand: z
    .object({
      id: z.number(),
      brand_slug: z.string(),
      brand_name: z.string(),
      reference_id: z.number(),
    })
    .or(z.number())
    .optional(),
  category: z.number().optional(),
  category_image: z.number().optional(),
  category_regex: z.number().optional(),
  category_reasons: z
    .array(
      z.object({
        index: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  category_text: z.number().optional(),
  comments: z
    .array(
      z.object({
        id: z.number(),
        product: z.number(),
        text: z.string(),
      })
    )
    .optional(),
  created_at: z.string().optional(),
  currency: z.string().optional(),
  delete_reason: z.any().optional(),
  deleted_at: z.string().optional(),
  description_text: z.string().optional(),
  discountedPrice: z.number().optional(),
  fake_score: z.number().optional(),
  gender: z.any().optional(),
  id: z.number().optional(),
  images: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      path: z.string(),
    })
  ),
  is_child: z.boolean().optional(),
  is_closed: z.boolean().optional(),
  is_special_category: z.boolean().optional(),
  platform: PlatformSchema.optional(),
  price_actualPrice: z.number().optional(),
  price_cluster: z.number().optional(),
  price_isDiscounted: z.boolean().optional(),
  price_isOutlier: z.boolean().optional(),
  product_slug: z.string().optional(),
  rating: z.number().optional(),
  realPrice: z.number().optional(),
  related_product: z.number().optional(),
  report: z.number().optional(),
  report_updated_at: z.string().optional(),
  reported_at: z.string().optional(),
  sellers: SellerSchema.array().optional(),
  title_text: z.string().optional(),
  unique: z.string().optional(),
  updated_at: z.string().optional(),
  url: z.string().optional(),
  _category: z.number().optional(),
  price_discountedPrice: z.number().optional(),
  _price_discountedPrice: z.number().optional(),
  _price_priceCluster: z.number().optional(),
  _price_realPrice: z.number().optional(),
  _related_product: z.number().optional(),
  comments_keyword_exist: z.boolean().optional(),
  classification: z
    .object({
      index: z.number(),
      name: z.string(),
      parent: z.number(),
    })
    .optional(),
  commentsKeywordExist: z.boolean().optional(),
});

export const ProductsQueryDtoSchema = z.object({
  expand_relations: z.string(),
  page_number: z.number().optional(),
  page_size: z.number().optional(),
  brand: z.string().optional(),
  platform: z.number().optional(),
  profile: z.number().optional(),
  seller: z.number().optional(),
  fields: z.string().optional(),
  hidden_classes: z.boolean().optional(),
  category: z.number().optional(),
  search: z.string().optional(),
  is_closed: z.boolean().optional(),
  include_hidden_entities: z.boolean().optional(),
});

export const ProductsResponseDtoSchema = z.object({
  data_count: z.number(),
  page_count: z.number(),
  page_number: z.number(),
  page_size: z.number(),
  results: z.array(ProductResponseDtoSchema),
});

export const UpdateProductRequestDtoSchema = z.object({
  report: z.number(),
});

// --------------------------
// Platform Report Mail
// --------------------------
export const GetPlatformReportMailQueryDtoSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
  expand_relations: z.string().optional(),
  fields: z.string().optional(),
});

export const PlatformReportMailDtoSchema = z.object({
  brands: z.string().array(),
  category: z.number(),
  created_at: z.string(),
  id: z.number(),
  platform: z.string(),
  products: z.union([
    z.array(
      z.object({
        id: z.number(),
        report: z.number(),
        _category: z.number(),
        description_text: z.string(),
        images: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            path: z.string(),
          })
        ),
        price_actualPrice: z.number(),
        realPrice: z.number(),
        _related_product: z.number(),
        title_text: z.string(),
        url: z.string(),
        brand: z.object({
          id: z.number(),
          brand_name: z.string(),
          brand_slug: z.string(),
          reference_id: z.number(),
        }),
        seller: z.any(),
        currency: z.string(),
        reported_at: z.string().optional().nullable(),
        price_isOutlier: z.boolean(),
      })
    ),
    z.string(),
  ]),
  report_count: z.number(),
  sender: z.string(),
  target: z.string(),
  marked_as_notified: z.boolean().optional(),
  generated_at: z.string().optional(),
  page_count: z.number().optional(),
  page_number: z.number().optional(),
  page_size: z.number().optional(),
  data_count: z.number().optional(),
});

export const ListPlatformReportMailQueryDtoSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
  brands: z.string().optional(),
  platform: z.number().optional(),
  category: z.number().optional(),
  time: z.string().optional(),
  fields: z.string().optional(),
  expand_relations: z.string().optional(),
});

export const ListPlatformReportMailResponseDtoSchema = z.object({
  page_size: z.number(),
  page_count: z.number(),
  data_count: z.number(),
  page_number: z.number(),
  results: z.array(PlatformReportMailDtoSchema),
  generated_at: z.string(),
});

export const CreatePlatformReportMailRequestDtoSchema = z.object({
  platform: z.number(),
  brands: z.number().array(),
  sender: z.string(),
  products: z.string(),
});
