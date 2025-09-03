import { z } from "zod";

export const getProfileByIdParamsSchema = z.object({
  fields: z.string().optional(),
  brand: z.string().or(z.number()).optional(),
  expand_relations: z.string().optional(),
});

export type GetProfileByIdParams = z.infer<typeof getProfileByIdParamsSchema>;

export const getProfileByIdResponseSchema = z.object({
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

export type GetProfileByIdResponse = z.infer<
  typeof getProfileByIdResponseSchema
>;
