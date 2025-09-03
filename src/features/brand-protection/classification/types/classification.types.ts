import { z } from "zod";

import {
  getClassesParamsSchema,
  classSchema,
  getClassesResponseSchema,
  getParentClassesParamsSchema,
  parentClassSchema,
  getParentClassesResponseSchema,
} from "../schemas/classification.schemas";

export type GetClassesParams = z.infer<typeof getClassesParamsSchema>;

export type Class = z.infer<typeof classSchema>;

export type GetClassesResponse = z.infer<typeof getClassesResponseSchema>;

export type GetParentClassesParams = z.infer<
  typeof getParentClassesParamsSchema
>;

export type ParentClass = z.infer<typeof parentClassSchema>;

export type GetParentClassesResponse = z.infer<
  typeof getParentClassesResponseSchema
>;
