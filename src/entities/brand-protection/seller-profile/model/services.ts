import { AlertCircle, XCircle, Tag } from "lucide-react";

import { SellerProfileCategory, SellerProfile } from "./types";

export const sellerProfileService = {
  getCategoryLabel: (category: SellerProfileCategory): string => {
    switch (category) {
      case SellerProfileCategory.RISKY:
        return "Risky";
      case SellerProfileCategory.SECOND:
        return "Second";
      case SellerProfileCategory.PARALLEL:
        return "Parallel";
      case SellerProfileCategory.IGNORED:
        return "Ignored";
      case SellerProfileCategory.THIRD:
        return "Third";
      case SellerProfileCategory.NEW:
        return "New";
      case SellerProfileCategory.BRANDABUSE:
        return "Brand Abuse";
      case SellerProfileCategory.OFFICIAL:
        return "Official";
      case SellerProfileCategory.REPORTED:
        return "Reported";
      default:
        return "";
    }
  },
  getCategoryIcon: (category: SellerProfileCategory) => {
    switch (category) {
      case SellerProfileCategory.RISKY:
        return AlertCircle;
      case SellerProfileCategory.SECOND:
        return Tag;
      case SellerProfileCategory.PARALLEL:
        return Tag;
      case SellerProfileCategory.IGNORED:
        return XCircle;
      case SellerProfileCategory.THIRD:
        return Tag;
      case SellerProfileCategory.NEW:
        return Tag;
      case SellerProfileCategory.BRANDABUSE:
        return Tag;
      case SellerProfileCategory.OFFICIAL:
        return Tag;
      case SellerProfileCategory.REPORTED:
        return Tag;
      default:
        return AlertCircle;
    }
  },
  getCategoryVariant: (category: SellerProfileCategory) => {
    switch (category) {
      case SellerProfileCategory.RISKY:
        return "destructiveSoft";
      case SellerProfileCategory.SECOND:
        return "warningSoft";
      case SellerProfileCategory.PARALLEL:
        return "infoSoft";
      case SellerProfileCategory.IGNORED:
        return "default";
      case SellerProfileCategory.THIRD:
        return "default";
      case SellerProfileCategory.NEW:
        return "infoSoft";
      case SellerProfileCategory.BRANDABUSE:
        return "destructiveSoft";
      case SellerProfileCategory.OFFICIAL:
        return "successSoft";
      case SellerProfileCategory.REPORTED:
        return "default";
      default:
        return "default";
    }
  },
  getProductCountByBrand: (
    sellerProfile: SellerProfile,
    brandIds: number[]
  ) => {
    // Extract count objects
    const platformDispersion =
      sellerProfile?.stats?.productCountPlatformDispersion;
    const closedProductCount = sellerProfile?.stats?.closedProductCount;
    const riskyProductCount = sellerProfile?.stats?.riskyProductCount;

    return brandIds.reduce(
      (acc, brandId) => {
        // Total count
        if (platformDispersion?.[brandId]) {
          acc.total += Object.values(platformDispersion[brandId]).reduce(
            (sum, count) => sum + count,
            0
          );
        }

        // Closed count
        acc.closed += closedProductCount?.[brandId] || 0;

        // Risky count
        acc.risky += riskyProductCount?.[brandId] || 0;

        return acc;
      },
      { total: 0, closed: 0, risky: 0 }
    );
  },
};
