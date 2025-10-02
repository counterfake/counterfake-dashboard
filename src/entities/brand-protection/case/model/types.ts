export enum ProductCaseStatus {
  IN_PROGRESS = 0,
  FAILED = 1,
  COMPLETED = 2,
}

export interface ProductCase {
  id: number;
  platformName: string;
  status: ProductCaseStatus;
  brands: string[];
  marketAsNotified: boolean;
  target: string;
  sender: string;
  reportCount: number;
  products: {
    limit: number;
    page: number;
    pages: number;
    total: number;
    items: Array<ProductCaseProduct>;
  };
}

export interface ProductCaseProduct {
  id: number;
  name: string;
  url: string;
  image: string;
  brandName: string;
  sellerName: string;
  pricing: {
    currency: string;
    originalPrice: number;
  };
}

export interface ProductCaseListItem {
  id: number;
  platformName: string;
  status: ProductCaseStatus;
  brands: string[];
  marketAsNotified: boolean;
  target: string;
  sender: string;
  reportCount: number;
}

export interface ProductCaseList {
  limit: number;
  page: number;
  pages: number;
  total: number;
  items: Array<ProductCaseListItem>;
}
