import {
  AlertCircle,
  XCircle,
  Tag,
  Scale,
  PackageX,
  Store,
  CheckCircle2,
  MessageCircleWarning,
} from "lucide-react";

import {
  SellerProfileCategory,
  SellerProfile,
  SellerProfileSoftNoticeStatus,
  SellerProfileLegalTakedownStatus,
} from "./types";

export const sellerProfileService = {
  getSoftNoticeInfo: (softNoticeStatus: SellerProfileSoftNoticeStatus) => {
    switch (softNoticeStatus) {
      case SellerProfileSoftNoticeStatus.INITIATED:
        return {
          label: "Initiated",
          variant: "warningSoft",
          icon: AlertCircle,
        };
      case SellerProfileSoftNoticeStatus.PRODUCTS_CLOSED:
        return {
          label: "Products Closed",
          variant: "successSoft",
          icon: PackageX,
        };
      case SellerProfileSoftNoticeStatus.SELLER_CLOSED:
        return {
          label: "Seller Closed",
          variant: "successSoft",
          icon: Store,
        };
      default:
        return {
          label: "",
          variant: "default",
          icon: AlertCircle,
        };
    }
  },
  getLegalTakedownInfo: (
    legalTakedownStatus: SellerProfileLegalTakedownStatus
  ) => {
    switch (legalTakedownStatus) {
      case SellerProfileLegalTakedownStatus.INITIATED:
        return {
          label: "Initiated",
          variant: "warningSoft",
          icon: Scale,
        };
      case SellerProfileLegalTakedownStatus.EXPERT_REVIEW:
        return {
          label: "Expert Review",
          variant: "infoSoft",
          icon: Scale,
        };
      case SellerProfileLegalTakedownStatus.IN_MEDIATION:
        return {
          label: "In Mediation",
          variant: "infoSoft",
          icon: Scale,
        };
      case SellerProfileLegalTakedownStatus.CASE_CLOSED:
        return {
          label: "Case Closed",
          variant: "successSoft",
          icon: CheckCircle2,
        };
      default:
        return {
          label: "",
          variant: "default",
          icon: Scale,
        };
    }
  },
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
        return MessageCircleWarning;
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
        return "warningSoft";
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
