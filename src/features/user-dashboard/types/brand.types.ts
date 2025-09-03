import { z } from "zod";

import {
  brandSchema,
  getBrandsParamsSchema,
  getBrandsResponseSchema,
  getGroupBrandsParamsSchema,
  groupBrandSchema,
  getGroupBrandsResponseSchema,
} from "../schemas/brand.schemas";

export type GetBrandsParams = z.infer<typeof getBrandsParamsSchema>;

export type Brand = z.infer<typeof brandSchema>;

export type GetBrandsResponse = z.infer<typeof getBrandsResponseSchema>;

export type GetGroupBrandsParams = z.infer<typeof getGroupBrandsParamsSchema>;

export type GroupBrand = z.infer<typeof groupBrandSchema>;

export type GetGroupBrandsResponse = z.infer<
  typeof getGroupBrandsResponseSchema
>;
