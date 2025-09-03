import { API_ENDPOINTS } from "@/common/lib/config/api";
import { baseApiClient } from "@/common/lib/api/api-client";
import { HttpClient } from "@/common/lib/api/http-client";

import {
  type GetProductByIdParams,
  type GetProductsParams,
  type GetProductsResponse,
  type Product,
} from "../types/product.types";
import {
  getProductByIdParamsSchema,
  getProductsParamsSchema,
} from "../schemas/product.schemas";

/**
 * Brand Protection Product Service
 */
export class ProductService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  async getProducts(params: GetProductsParams) {
    return baseApiClient.get<GetProductsResponse>(this.endpoints.products, {
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

    return baseApiClient.get<Product>(`${this.endpoints.products}/${id}`, {
      params,
      validationSchemas: {
        params: getProductByIdParamsSchema,
      },
    });
  }
}

export const productService = new ProductService();
