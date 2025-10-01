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
