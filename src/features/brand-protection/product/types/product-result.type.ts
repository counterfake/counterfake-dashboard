import { z } from "zod";

import {
  getProductResultsParamsSchema,
  getProductResultsResponseSchema,
  getProductResultsAnalysisParamsSchema,
  getProductResultsAnalysisResponseSchema,
  getProductResultsAnalysisMonthlyParamsSchema,
  getProductResultsAnalysisMonthlyResponseSchema,
} from "../schemas/product-result.schemas";

export type GetProductResultsParams = z.infer<
  typeof getProductResultsParamsSchema
>;

export type GetProductResultsResponse = z.infer<
  typeof getProductResultsResponseSchema
>;

export type GetProductResultsAnalysisParams = z.infer<
  typeof getProductResultsAnalysisParamsSchema
>;

export type GetProductResultsAnalysisResponse = z.infer<
  typeof getProductResultsAnalysisResponseSchema
>;

export type GetProductResultsAnalysisMonthlyParams = z.infer<
  typeof getProductResultsAnalysisMonthlyParamsSchema
>;

export type GetProductResultsAnalysisMonthlyResponse = z.infer<
  typeof getProductResultsAnalysisMonthlyResponseSchema
>;
