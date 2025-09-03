import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetClassesParams,
  type GetClassesResponse,
  type GetParentClassesParams,
  type GetParentClassesResponse,
  type ParentClass,
  getClassesParamsSchema,
  getParentClassesParamsSchema,
} from "@/common/types/brand-protection/classification";

import { HttpClient } from "../../http-client";

export class ClassificationService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getClasses(params: GetClassesParams) {
    return this.httpClient.get<GetClassesResponse>(this.endpoints.classes, {
      params,
      validationSchemas: {
        params: getClassesParamsSchema,
      },
    });
  }

  async getParentClasses(params: GetParentClassesParams) {
    return this.httpClient.get<GetParentClassesResponse>(
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
        "Parent class id is required",
        "ClassificationService.getParentClassById"
      );
    }

    return this.httpClient.get<ParentClass>(
      this.endpoints.parentClasses + "/" + id
    );
  }
}
