import { baseApiClient } from "@/common/lib/api/api-client";
import { HttpClient } from "@/common/lib/api/http-client";
import { absoluteImageUrl } from "@/common/lib/utils/absolute-image-url";
import {
  calculateDaysSince,
  formatDateForUserLocale,
} from "@/common/lib/utils/date-helper";

// API Layer Imports
import {
  BpProductsApi,
  type GetProductByIdResponse,
} from "@/common/api/bp-api/products";
import { BpResultsApi } from "@/common/api/bp-api/results";

// Internal Types
import {
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

    const requiredFields: Array<keyof GetProductByIdResponse> = [
      "analyse_summary",
      "brand",
      "category_reasons",
      "classification",
      "created_at",
      "currency",
      "description_text",
      "id",
      "images",
      "fake_score",
      "platform",
      "price_actualPrice",
      "related_product",
      "report",
      "reported_at",
      "seller",
      "title_text",
      "url",
      "_category",
      "_related_product",
      "_price_priceCluster",
    ];

    const expandRelations = [
      "seller.profile",
      "platform",
      "images",
      "category_reasons",
      "brand",
      "classification",
    ];

    const result = await this.productsApi.getProductById(id, {
      fields: requiredFields.join(","),
      expand_relations: expandRelations.join(","),
    });

    if (!result.success) {
      return HttpClient.errorResult(
        result.error,
        this.getContextKey(this.getProductById.name)
      );
    }

    const transformedProduct = this.transformProductResponse(result.data);

    return HttpClient.successResult(transformedProduct);
  }

  public async getProductResults(params: GetProductResultsParams) {
    const requiredFields: Array<keyof GetProductByIdResponse> = [
      "analyse_summary",
      "brand",
      "category_reasons",
      "classification",
      "created_at",
      "currency",
      "description_text",
      "id",
      "images",
      "fake_score",
      "platform",
      "price_actualPrice",
      "related_product",
      "report",
      "reported_at",
      "seller",
      "title_text",
      "url",
      "_category",
      "_related_product",
    ];

    const expandRelations = [
      "seller.profile",
      "platform",
      "images",
      "category_reasons",
      "brand",
      "classification",
    ];

    const response = await this.resultsApi.getResults({
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
      expand_relations: expandRelations.join(","),
      fields: requiredFields.join(","),
    });

    if (!response.success) {
      return HttpClient.errorResult(
        response.error,
        this.getContextKey(this.getProductResults.name)
      );
    }

    // For the performance, we use for loop to store transformed products
    let transformedProducts: Product[] = [];

    if (!Array.isArray(response.data?.results)) {
      return HttpClient.errorResult(
        new Error("response.data.results is not an array"),
        this.getContextKey(this.getProductResults.name)
      );
    }

    for (let index = 0; index < response.data?.results?.length; index++) {
      const product = response.data?.results?.[index];

      transformedProducts.push(this.transformProductResponse(product));
    }

    return HttpClient.successResult({
      limit: response.data.page_size,
      page: response.data.page_number,
      totalPages: response.data.page_count,
      totalProducts: response.data.data_count,
      products: transformedProducts,
    });
  }

  public transformProductResponse(product: GetProductByIdResponse): Product {
    // Get product status
    const productStatus = this.productStatusService.getById(
      product?._category as ProductStatusId
    );

    // Get product report status
    const productReportStatus = this.productReportStatusService.getById(
      product?.report as ProductReportStatusId
    );

    // Get product reasons
    const reasons = product.category_reasons?.map((reason) => reason?.name);

    // Get brand name and id
    let brandName: string | null = null;
    let brandId: number | null = null;

    if (typeof product?.brand === "object") {
      brandName = product?.brand?.brand_name;
      brandId = product?.brand?.id;
    }

    // Handle ad price data
    let originalPrice: number | null = null;
    let discountedPrice: number | null = null;
    let discountPercentage: number | null = null;

    if (
      typeof product?.price_actualPrice === "number" &&
      product?.price_actualPrice > 0
    ) {
      originalPrice = product?.price_actualPrice;
    }

    if (
      typeof product?.price_discountedPrice === "number" &&
      product?.price_discountedPrice > 0
    ) {
      discountedPrice = product?.price_discountedPrice;

      discountPercentage = Math.round(
        (1 - originalPrice / discountedPrice) * 100
      );
    }

    // Handle sub category data
    if (typeof product?.classification !== "object")
      throw new Error("product.classification is not an object");

    const subCategory = {
      name: product?.classification?.name,
      id: product?.classification?.index,
      parentCategoryId: product?.classification?.parent,
    };

    // Handle fake score data
    let fakeScore = null;
    let fakeScoreProbability = null;

    if (typeof product?.fake_score === "number" && product?.fake_score > 0) {
      fakeScore = product?.fake_score;
      fakeScoreProbability = (fakeScore * 100).toFixed(1);
    }

    // Handle rating data
    let rating: number | null = null;

    if (typeof product?.rating === "number" && product?.rating > 0) {
      rating = product?.rating;
    }

    let isLowRating = false;

    if (rating) {
      isLowRating = rating < 60;
    }

    let priceCluster: number = 1;

    if (
      typeof product?._price_priceCluster === "number" &&
      product?._price_priceCluster > 0
    ) {
      priceCluster = product?._price_priceCluster;
    }

    return {
      id: product?.id,
      name: product?.title_text,
      coverImage: absoluteImageUrl(product?.images?.[0]?.path),
      images: product?.images?.map((image) => absoluteImageUrl(image?.path)),
      ad: {
        description: product?.description_text,
        originalPrice,
        discountedPrice,
        discountPercentage,
        currency: product?.currency,
        url: product?.url,
      },
      analysis: {
        analysisSummaryText: product?.analyse_summary,
        isRisky: product?._category === 1,
        fakeScore,
        fakeScoreProbability,
        statusId: productStatus?.id,
        status: productStatus?.label,
        reportStatusId: productReportStatus?.id,
        reportStatus: productReportStatus?.label,
        reportReasons: reasons,
        listedAt: formatDateForUserLocale(product?.created_at),
        reportedAt: formatDateForUserLocale(product?.reported_at),
        daysSinceListed: calculateDaysSince(product?.created_at),
        daysSinceReported: calculateDaysSince(product?.reported_at),
        isPriceOutlier:
          product?.price_isOutlier === undefined
            ? null
            : product?.price_isOutlier,
        priceCluster,
        rating,
        isLowRating,
      },
      brand: {
        name: brandName,
        id: brandId,
      },
      platform: {
        name: product?.platform?.name,
        id: product?.platform?.id,
        iconLink: product?.platform?.icon_link,
      },
      profile: {
        id: product?.seller?.profile?.id,
        name: product?.seller?.profile?.universal_name,
        isRisky: product?.seller?.profile?.category === 1,
      },
      seller: {
        name: product?.seller?.name,
        url: product?.seller?.url,
        id: product?.seller?.id,
        avatarUrl: product?.seller?.picture_url,
      },
      subCategory,
    };
  }
}

export const productService = new ProductService();
