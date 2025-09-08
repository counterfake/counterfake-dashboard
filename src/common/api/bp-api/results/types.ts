import { z } from "zod";

import {
  getResultsParamsSchema,
  getResultsAnalysisParamsSchema,
  getResultsAnalysisMonthlyResponseSchema,
  getResultsResponseSchema,
  getResultsAnalysisMonthlyParamsSchema,
  getResultsAnalysisResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetResultsParams = z.infer<typeof getResultsParamsSchema>;
export type GetResultsAnalysisParams = z.infer<
  typeof getResultsAnalysisParamsSchema
>;
export type GetResultsAnalysisMonthlyParams = z.infer<
  typeof getResultsAnalysisMonthlyParamsSchema
>;

// --------------------------
// Response Types
// --------------------------
export type GetResultsResponse = z.infer<typeof getResultsResponseSchema>;
export type GetResultsAnalysisResponse = z.infer<
  typeof getResultsAnalysisResponseSchema
>;
export type GetResultsAnalysisMonthlyResponse = z.infer<
  typeof getResultsAnalysisMonthlyResponseSchema
>;
