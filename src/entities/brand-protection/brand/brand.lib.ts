import {
  BrandsResponseDto,
  GroupBrandsResponseDto,
} from "@/shared/api/brand-protection/bp-api.types";
import { Brands, GroupBrand } from "./brand.types";

export function transformBrandsDtoToBrands(
  brandsDto: BrandsResponseDto
): Brands {
  const brands = brandsDto.results.map((brand) => ({
    id: brand?.id,
    name: brand?.brand_name,
    groupBrandId: brand?.group,
  }));

  return {
    brands,
    page: brandsDto.page_number,
    limit: brandsDto.page_size,
    totalPages: brandsDto.page_count,
    totalBrands: brandsDto.data_count,
  };
}

export function transformGroupBrandsDtoToBrands(
  groupBrandsDto: GroupBrandsResponseDto
): GroupBrand[] {
  return groupBrandsDto?.results?.map((brand) => ({
    id: brand.id,
    name: brand.name,
  }));
}
