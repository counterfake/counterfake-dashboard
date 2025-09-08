import { z } from "zod";

// --------------------------
// Params Schemas
// --------------------------
export const getGroupBrandsParamsSchema = z.object({
  page_size: z.number().optional(),
});

// --------------------------
// Response Schemas
// --------------------------
export const getGroupBrandsResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
});
