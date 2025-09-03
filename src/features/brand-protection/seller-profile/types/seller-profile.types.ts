import { z } from "zod";

import {
  getSellerProfileByIdParamsSchema,
  getSellerProfileByIdResponseSchema,
  getSellersTopFakesParamsSchema,
  getSellersTopFakesResponseSchema,
  sellerSchema,
} from "../schemas/seller-profile.schemas";

export type GetSellerProfileByIdParams = z.infer<
  typeof getSellerProfileByIdParamsSchema
>;

export type GetSellerProfileByIdResponse = z.infer<
  typeof getSellerProfileByIdResponseSchema
>;

export type Seller = z.infer<typeof sellerSchema>;

export type GetSellersTopFakesParams = z.infer<
  typeof getSellersTopFakesParamsSchema
>;

export type GetSellersTopFakesResponse = z.infer<
  typeof getSellersTopFakesResponseSchema
>;
