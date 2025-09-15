import { z } from "zod";

export const BrandsQuerySchema = z.object({
  groupBrandId: z.string(),
  page: z.number(),
  limit: z.number(),
});

export const BrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  groupBrandId: z.number(),
});

export const BrandsSchema = z.object({
  brands: z.array(BrandSchema),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  totalBrands: z.number(),
});
