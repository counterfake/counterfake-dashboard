import {
  SellerProfileLegalTakedownStatus,
  SellerProfileSoftNoticeStatus,
} from "../model";

export interface SellerProfileQueryParams {
  brandId?: string;
}

export interface OnlineTakedownCaseListQueryParams {
  brands: number[];
  page: number;
  limit: number;
  softNoticeStatus: SellerProfileSoftNoticeStatus;
}
export interface LegalTakedownCaseListQueryParams {
  brands: number[];
  page: number;
  limit: number;
  legalTakedownStatus: SellerProfileLegalTakedownStatus;
}
