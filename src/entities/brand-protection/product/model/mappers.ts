import {
  GetProductByIdResponse,
  GetProductsResponse,
} from "@/common/api/bp-api/products";
import { absoluteImageUrl } from "@/common/lib/utils/absolute-image-url";

import { Product } from "../model/types";

export const mapDtoToProductImage = (
  dto: GetProductByIdResponse["images"][number]
): string => {
  return absoluteImageUrl(dto.path);
};

export const mapDtoToProduct = (dto: GetProductByIdResponse): Product => {
  const brandName =
    typeof dto?.brand === "object" ? dto?.brand?.brand_name : "";

  return {
    id: dto?.id,
    name: dto?.title_text,
    images: dto?.images.map(mapDtoToProductImage),
    url: dto?.url,
    status: dto?._category,
    brandName: brandName,
    pricing: {
      originalPrice: dto?._price_realPrice > 0 ? dto?._price_realPrice : null,
      discountedPrice:
        dto?._price_discountedPrice > 0 ? dto?._price_discountedPrice : null,
      currency: dto?.currency,
    },
  };
};

export const mapDtoToProductList = (dto: GetProductsResponse) => {
  return {
    count: dto.data_count,
    page: dto.page_number,
    limit: dto.page_size,
    pages: dto.page_count,
    products: dto.results.map(mapDtoToProduct),
  };
};

export const mapDtoToClosedCount = (dto: GetProductsResponse) => {
  return dto.data_count;
};
export const mapDtoToRiskyCount = (dto: GetProductsResponse) => {
  return dto.data_count;
};
