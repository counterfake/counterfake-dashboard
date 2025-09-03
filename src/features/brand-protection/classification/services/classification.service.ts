import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";
import { baseApiClient } from "@/common/lib/api/api-client";

import {
  type GetClassesParams,
  type GetClassesResponse,
  type GetParentClassesParams,
  type GetParentClassesResponse,
  type ParentClass,
} from "../types/classification.types";
import {
  getClassesParamsSchema,
  getParentClassesParamsSchema,
} from "../schemas/classification.schemas";

/**
 * Brand Protection Classification Service
 */
export class ClassificationService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  async getClasses(params: GetClassesParams) {
    return baseApiClient.get<GetClassesResponse>(this.endpoints.classes, {
      params,
      validationSchemas: {
        params: getClassesParamsSchema,
      },
    });
  }

  async getParentClasses(params: GetParentClassesParams) {
    return baseApiClient.get<GetParentClassesResponse>(
      this.endpoints.parentClasses,
      {
        params,
        validationSchemas: {
          params: getParentClassesParamsSchema,
        },
      }
    );
  }

  async getParentClassById(id: string) {
    if (!id) {
      return HttpClient.errorResult(
        new Error("Parent class id is required"),
        "ClassificationService.getParentClassById"
      );
    }

    return baseApiClient.get<ParentClass>(
      this.endpoints.parentClasses + "/" + id
    );
  }
}

export const classificationService = new ClassificationService();
