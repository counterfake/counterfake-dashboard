import { z } from "zod";

import {
  BrandSchema,
  BrandsQuerySchema,
  BrandsSchema,
  GroupBrandSchema,
} from "./brand.schemas";

export type BrandsQueryParams = z.infer<typeof BrandsQuerySchema>;

export type Brand = z.infer<typeof BrandSchema>;

export type Brands = z.infer<typeof BrandsSchema>;

export type GroupBrand = z.infer<typeof GroupBrandSchema>;
