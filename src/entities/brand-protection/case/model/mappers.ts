import {
  PlatformReportMailDto,
  ListPlatformReportMailResponseDto,
} from "@/shared/api/brand-protection/bp-api.types";
import {
  ProductCaseListItem,
  ProductCaseList,
  ProductCaseStatus,
  ProductCase,
} from "./types";
import { absoluteImageUrl } from "@/common/lib/utils/absolute-image-url";

export const mapDtoToProductCaseProduct = (
  dto: PlatformReportMailDto
): ProductCase["products"] => {
  const products = Array.isArray(dto.products) ? dto.products : [];

  return {
    limit: dto.page_size,
    page: dto.page_number,
    pages: dto.page_count,
    total: dto.data_count,
    items: products.map((item) => ({
      id: item.id,
      name: item.title_text,
      url: item.url,
      image: absoluteImageUrl(item.images[0].path),
      brandName: item?.brand?.brand_name,
      sellerName: item?.seller?.name,
      pricing: {
        currency: item?.currency,
        originalPrice: item?.realPrice > 0 ? item?.realPrice : undefined,
      },
    })),
  };
};

export const mapDtoToProductCase = (
  dto: PlatformReportMailDto
): ProductCase => {
  return {
    id: dto.id,
    platformName: dto.platform,
    status: dto.category as ProductCaseStatus,
    brands: dto.brands,
    marketAsNotified: dto.marked_as_notified,
    target: dto.target,
    sender: dto.sender,
    reportCount: dto.report_count,
    products: mapDtoToProductCaseProduct(dto),
  };
};

export const mapDtoToProductCaseListItem = (
  dto: PlatformReportMailDto
): ProductCaseListItem => {
  return {
    id: dto.id,
    platformName: dto.platform,
    status: dto.category as ProductCaseStatus,
    brands: dto.brands,
    marketAsNotified: dto.marked_as_notified,
    target: dto.target,
    sender: dto.sender,
    reportCount: dto.report_count,
    createdAt: dto.created_at,
  };
};

export const mapDtoToProductCaseList = (
  dto: ListPlatformReportMailResponseDto
): ProductCaseList => {
  return {
    limit: dto.page_size,
    page: dto.page_number,
    pages: dto.page_count,
    total: dto.data_count,
    items: dto.results.map((item) => mapDtoToProductCaseListItem(item)),
  };
};
