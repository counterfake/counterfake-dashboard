import { z } from "zod";

import {
  getProductsParamsSchema,
  productSchema,
  getProductsResponseSchema,
  getProductByIdParamsSchema,
} from "../schemas/product.schemas";

export type GetProductsParams = z.infer<typeof getProductsParamsSchema>;

export type Product = z.infer<typeof productSchema>;

export type GetProductsResponse = z.infer<typeof getProductsResponseSchema>;

export type GetProductByIdParams = z.infer<typeof getProductByIdParamsSchema>;
