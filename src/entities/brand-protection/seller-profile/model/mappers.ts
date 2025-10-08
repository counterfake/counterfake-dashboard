import { GetProfileByIdResponse } from "@/shared/api/brand-protection/bp-api.types";

import {
  SellerProfile,
  SellerProfileCategory,
  SellerProfileLegalTakedownStatus,
  SellerProfileSoftNoticeStatus,
} from "./types";

export const mapDtoToSellerProfilePlatform = (
  platformDto: GetProfileByIdResponse["platforms"][number]
): SellerProfile["platforms"][number] => {
  return {
    id: platformDto?.id,
    name: platformDto?.name,
    iconLink: platformDto?.icon_link,
  };
};

export const mapDtoToSellerProfileSeller = (
  sellerDto: GetProfileByIdResponse["sellers"][number]
): SellerProfile["sellers"][number] => {
  let platform: SellerProfile["sellers"][number]["platform"] = null;

  if (typeof sellerDto?.platform === "object") {
    platform = {
      id: sellerDto?.platform?.id,
      name: sellerDto?.platform?.name,
      iconLink: sellerDto?.platform?.icon_link,
    };
  }

  return {
    id: sellerDto?.id,
    name: sellerDto?.name,
    avatarUrl: sellerDto?.picture_url,
    rating: sellerDto?.rating,
    url: sellerDto?.url,
    isClosed: sellerDto?.is_closed,
    platform,
  };
};

export const mapDtoToSellerProfileRiskyProductCount = (
  statsDto: GetProfileByIdResponse["stats"]
): SellerProfile["stats"]["riskyProductCount"] => {
  let result: SellerProfile["stats"]["riskyProductCount"] = {};

  for (const brandId in statsDto.category_dispersion) {
    Object.assign(result, {
      [brandId]: statsDto.category_dispersion[brandId]?.RISKY || 0,
    });
  }

  return result;
};

export const mapDtoToSellerProfileClosedProductCount = (
  statsDto: GetProfileByIdResponse["stats"]
): SellerProfile["stats"]["closedProductCount"] => {
  let result: SellerProfile["stats"]["closedProductCount"] = {};

  for (const brandId in statsDto.closed_product_count) {
    const closedProductCountCategoryDispersion =
      statsDto.closed_product_count[brandId];

    Object.assign(result, {
      // Collect all closed product counts for each category
      [brandId]: Object.values(closedProductCountCategoryDispersion).reduce(
        (acc, count) => acc + count,
        0
      ),
    });
  }

  return result;
};

export const mapDtoToSellerProfile = (
  profileDto: GetProfileByIdResponse
): SellerProfile => {
  let brands: SellerProfile["brands"] = [];

  profileDto?.brands?.forEach((brand) => {
    if (typeof brand === "object") {
      brands.push({
        name: brand?.brand_name,
      });
    }
  });

  return {
    id: profileDto?.id,
    name: profileDto?.universal_name,
    brands,

    address: profileDto?.address,
    email: profileDto?.email,
    mersisNumber: profileDto?.mersis_number,
    phoneNumber: profileDto?.phone_number,
    taxNumber: profileDto?.tax_number,

    aiAnalysisSummary: profileDto?.ai_results?.summary,

    isClosed: profileDto?.is_closed,
    category: profileDto?.category as SellerProfileCategory,

    platformCount: profileDto?.platforms.length,
    platforms: profileDto?.platforms.map(mapDtoToSellerProfilePlatform),
    sellers: profileDto?.sellers.map(mapDtoToSellerProfileSeller),
    stats: {
      riskyProductCount: mapDtoToSellerProfileRiskyProductCount(
        profileDto?.stats
      ),
      closedProductCount: mapDtoToSellerProfileClosedProductCount(
        profileDto?.stats
      ),
      productCountPlatformDispersion: profileDto?.stats?.product_counts,
    },

    softNoticeStatus:
      profileDto?.soft_notice as SellerProfileSoftNoticeStatus | null,
    legalTakedownStatus:
      profileDto?.legal_takedown as SellerProfileLegalTakedownStatus | null,
  };
};
