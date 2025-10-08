export enum SellerProfileCategory {
  RISKY = 1,
  SECOND = 2,
  PARALLEL = 3,
  IGNORED = 4,
  THIRD = 5,
  NEW = 6,
  BRANDABUSE = 7,
  OFFICIAL = 8,
  REPORTED = 9,
}

export enum SellerProfileSoftNoticeStatus {
  INITIATED = 0,
  PRODUCTS_CLOSED = 1,
  SELLER_CLOSED = 2,
}

export enum SellerProfileLegalTakedownStatus {
  INITIATED = 0,
  EXPERT_REVIEW = 1,
  IN_MEDIATION = 2,
  CASE_CLOSED = 3,
}

export interface SellerProfile {
  id: number;
  name: string;
  brands: Array<{ name: string }>;

  address: string;
  email: string;
  mersisNumber: string;
  phoneNumber: string;
  taxNumber: string;

  aiAnalysisSummary: string;

  // Insights
  isClosed: boolean;
  category: SellerProfileCategory;
  platformCount: number;

  platforms: Array<{ id: number; name: string; iconLink: string }>;
  sellers: Array<{
    id: number;
    name: string;
    avatarUrl: string;
    rating: number;
    url: string;
    isClosed: boolean;
    platform: {
      id: number;
      name: string;
      iconLink: string;
    };
  }>;
  stats: {
    riskyProductCount: {
      [brandId: string]: number;
    };
    closedProductCount: {
      [brandId: string]: number;
    };
    productCountPlatformDispersion: {
      [brandId: string]: {
        [platform: string]: number;
      };
    };
  };

  softNoticeStatus: SellerProfileSoftNoticeStatus;
  legalTakedownStatus: SellerProfileLegalTakedownStatus;
}
