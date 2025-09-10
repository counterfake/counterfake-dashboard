import { baseApiClient } from "@/common/lib/api/api-client";
import { HttpClient } from "@/common/lib/api/http-client";
import { absoluteImageUrl } from "@/common/lib/utils/absolute-image-url";

// API Layer Imports
import { BpProductsApi } from "@/common/api/bp-api/products";
import { BpResultsApi } from "@/common/api/bp-api/results";

// Internal Types
import {
  type TransformProductDataParam,
  type GetProductResultsParams,
  type ProductServiceInterface,
  Product,
} from "../types/products.types";
import { ProductStatusId } from "../types/product-status.types";

// Internal Services
import { ProductStatusService } from "./product-status.service";
import { ProductReportStatusService } from "./product-report-status.service";
import { ProductReportStatusId } from "../types/product-report-status.type";

/**
 * Product Service - Business Logic Layer
 *
 * @description
 * This service gets product data from the API layer and performs necessary transformations.
 * It contains only business logic, API requests are made in the API layer.
 */
export class ProductService implements ProductServiceInterface {
  // APIs
  private readonly productsApi: BpProductsApi;
  private readonly resultsApi: BpResultsApi;

  // Services
  private readonly productStatusService: ProductStatusService;
  private readonly productReportStatusService: ProductReportStatusService;

  // --------------------------
  // ! Main Constructor Function
  // --------------------------
  constructor() {
    // APIs
    this.productsApi = new BpProductsApi(baseApiClient);
    this.resultsApi = new BpResultsApi(baseApiClient);

    // Services
    this.productStatusService = new ProductStatusService();
    this.productReportStatusService = new ProductReportStatusService();
  }

  // --------------------------
  // Debugging
  // --------------------------
  private getContextKey(funcName: string) {
    return `${this.constructor.name}.${funcName}`;
  }

  // --------------------------
  // Business Logic
  // --------------------------
  public async getProductById(id: string) {
    if (!id) {
      return HttpClient.errorResult(
        new Error("Product id is required"),
        this.getContextKey(this.getProductById.name)
      );
    }

    const result = await this.productsApi.getProductById(id);

    if (!result.success) {
      return HttpClient.errorResult(
        result.error,
        this.getContextKey(this.getProductById.name)
      );
    }

    const transformedProduct = this.transformProduct(result.data);

    return HttpClient.successResult(transformedProduct);
  }

  public async getProductResults(params: GetProductResultsParams) {
    const result = await this.resultsApi.getResults({
      brand: params.brand,
      category: String(params.statusId),
      category_reasons: params.reasons,
      page_number: params.page,
      page_size: params.limit,
      platform: params.platformId,
      report: params.reportStatusIds,
      search: params.search,
      url: params.url,
      parent_product: params.category,
      product_count: "5",
      expand_relations: "seller.profile,platform,images,category_reasons,brand",
      fields:
        "brand,currency,_price_discountedPrice,_price_realPrice,id,images,platform,seller,title_text,url,_category,_related_product,price_actualPrice,category_reasons",
    });

    if (!result.success) {
      return HttpClient.errorResult(
        result.error,
        this.getContextKey(this.getProductResults.name)
      );
    }

    const transformedProducts = result.data.results.map((product) =>
      this.transformProduct(product)
    );

    return HttpClient.successResult({
      limit: result.data.page_size,
      page: result.data.page_number,
      totalPages: result.data.page_count,
      totalProducts: result.data.data_count,
      products: transformedProducts,
    });
  }

  public transformProduct(product: TransformProductDataParam): Product {
    const productStatus = this.productStatusService.getById(
      product._category as ProductStatusId
    );

    const productReportStatus = this.productReportStatusService.getById(
      product.report as ProductReportStatusId
    );

    const reasons = product.category_reasons?.map((reason) => reason?.name);

    let brandName: string | null = null;
    let brandId: number | null = null;

    if (typeof product.brand === "object") {
      brandName = product?.brand?.brand_name;
      brandId = product?.brand?.id;
    }

    return {
      id: product?.id,
      name: product?.title_text,
      price: product?.price_actualPrice,
      discountedPrice: product?.price_discountedPrice,
      currency: product?.currency,
      coverImage: absoluteImageUrl(product?.images?.[0]?.path),
      images: product?.images?.map((image) => absoluteImageUrl(image?.path)),
      platformName: product?.platform?.name,
      platformId: product?.platform?.id,
      sellerName: product?.seller?.name,
      sellerUrl: product?.seller?.url,
      reasons,
      brandName,
      brandId,
      url: product?.url,
      isRisky: product?.category === 1,
      statusId: productStatus?.id,
      status: productStatus?.label,
      reportStatusId: productReportStatus?.id,
      reportStatus: productReportStatus?.label,
    };
  }
}

export const productService = new ProductService();
