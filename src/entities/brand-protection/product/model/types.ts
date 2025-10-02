export enum ProductStatus {
  Risky = 1,
  NotRisky = 0,
  BrandDecision = 11,
  SecondHand = 2,
  OnHold = 5,
  ParallelImport = 7,
  BrandMonitor = 9,
  ThirdParty = 12,
}

export enum ProductReportStatusId {
  New = 0,
  Clustered = 1,
  Reported = 2,
  TestReceived = 3,
  ReportRequested = 4,
  Removed = 5,
  Reopened = 6,
  Notified = 7,
  Ready = 8,
}

export type Product = {
  id: number;
  name: string;
  images: string[];
  status: ProductStatus;
  url: string;
  brandName: string;
  pricing: {
    originalPrice: number;
    discountedPrice: number;
    currency: string;
  };
};
