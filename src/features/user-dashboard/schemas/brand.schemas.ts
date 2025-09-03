import { z } from "zod";

export const getBrandsParamsSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
  group: z.string().optional(),
  fields: z.string().optional(),
  expand_relations: z.string().optional(),
});

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

export const getBrandsResponseSchema = z.object({
  results: z.array(brandSchema),
  total: z.number(),
});

export const getGroupBrandsParamsSchema = z.object({
  page_size: z.number().optional(),
});

export const groupBrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export const getGroupBrandsResponseSchema = z.object({
  results: z.array(groupBrandSchema),
});
