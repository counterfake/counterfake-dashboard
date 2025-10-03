export enum SellerCaseStatus {
  INITIATED = "initiated",
  EXPERT_REVIEW = "expert_review", 
  MEDIATION = "mediation",
  COMPENSATION_RECEIVED = "compensation_received",
  CLOSED = "closed"
}

export interface SellerCase {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  platform: string;
  status: SellerCaseStatus;
  reportDate: string;
  lastUpdated: string;
  caseNumber: string;
  description: string;
  reportedBy: string;
  compensationAmount?: number;
  evidenceCount: number;
  priority: "low" | "medium" | "high";
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
  status?: SellerCaseStatus;
  page?: number;
  limit?: number;
  search?: string;
}
