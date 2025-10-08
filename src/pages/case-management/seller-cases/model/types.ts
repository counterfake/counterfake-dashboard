import {
  SellerProfileSoftNoticeStatus,
  SellerProfileLegalTakedownStatus,
} from "@/entities/brand-protection/seller-profile/model/types";

export type SellerCaseActionType = "online" | "legal";

export interface SellerCase {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  platforms: string[];
  actionType: SellerCaseActionType;
  softNoticeStatus?: SellerProfileSoftNoticeStatus;
  legalTakedownStatus?: SellerProfileLegalTakedownStatus;
  reportDate: string;
  lastUpdated: string;
  caseNumber: string;
  description: string;
  reportedBy: string;
  compensationAmount?: number;
  evidenceCount: number;
  tags: string[];
}

export interface SellerCaseStats {
  totalCases: number;
  openCases: number;
  closedCases: number;
  inMediationCases: number;
  compensationReceived: number;
}

export interface SellerCaseListResponse {
  items: SellerCase[];
  total: number;
  pages: number;
  currentPage: number;
}

export interface SellerCaseListParams {
  actionType?: SellerCaseActionType;
  softNoticeStatus?: SellerProfileSoftNoticeStatus;
  legalTakedownStatus?: SellerProfileLegalTakedownStatus;
  page?: number;
  limit?: number;
  search?: string;
}
