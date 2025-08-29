import { z } from "zod";

export const getBrandsParamsSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
  group: z.string().optional(),
  fields: z.string().optional(),
  expand_relations: z.string().optional(),
});

export type GetBrandsParams = z.infer<typeof getBrandsParamsSchema>;

export const brandSchema = z.object({
  id: z.number(),
  brand_name: z.string(),
  brand_slug: z.string(),
  reference_id: z.number(),
  parent_classes: z.number().array(),
  official_classes: z.number().array(),
  group: z.number().optional(),
  in_scope: z.boolean(),
  keywords: z.string(),
});

export type Brand = z.infer<typeof brandSchema>;

export const getBrandsResponseSchema = z.object({
  results: z.array(brandSchema),
  total: z.number(),
});

export type GetBrandsResponse = z.infer<typeof getBrandsResponseSchema>;
