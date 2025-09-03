import { z } from "zod";

export const getGroupBrandsParamsSchema = z.object({
  page_size: z.number().optional(),
});

export type GetGroupBrandsParams = z.infer<typeof getGroupBrandsParamsSchema>;

export const groupBrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export type GroupBrand = z.infer<typeof groupBrandSchema>;

export const getGroupBrandsResponseSchema = z.object({
  results: z.array(groupBrandSchema),
});

export type GetGroupBrandsResponse = z.infer<
  typeof getGroupBrandsResponseSchema
>;
