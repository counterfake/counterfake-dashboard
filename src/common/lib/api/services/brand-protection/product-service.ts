import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetProductByIdParams,
  type GetProductsParams,
  type GetProductsResponse,
  type Product,
  getProductByIdParamsSchema,
  getProductsParamsSchema,
} from "@/common/types/brand-protection/product";

import { HttpClient } from "../../http-client";

export class ProductService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getProducts(params: GetProductsParams) {
    return this.httpClient.get<GetProductsResponse>(this.endpoints.products, {
      params,
      validationSchemas: {
        params: getProductsParamsSchema,
      },
    });
  }

  async getProductById(id: string, params?: GetProductByIdParams) {
    if (!id) {
      return HttpClient.errorResult(
        new Error("Product id is required"),
        "ProductService.getProductById"
      );
    }

    return this.httpClient.get<Product>(`${this.endpoints.products}/${id}`, {
      params,
      validationSchemas: {
        params: getProductByIdParamsSchema,
      },
    });
  }
}
