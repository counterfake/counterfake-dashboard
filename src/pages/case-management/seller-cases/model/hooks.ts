import { useState, useMemo } from "react";
import { SellerCase, SellerCaseListParams, SellerCaseListResponse, SellerCaseStats } from "./types";
import { mockSellerCases, mockSellerCaseStats } from "./mock-data";

export function useSellerCaseList(params: SellerCaseListParams = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sellerCases = useMemo<SellerCaseListResponse>(() => {
    let filteredCases = mockSellerCases;

    // Filter by status
    if (params.status) {
      filteredCases = filteredCases.filter(case_ => case_.status === params.status);
    }

    // Filter by search term
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredCases = filteredCases.filter(case_ => 
        case_.sellerName.toLowerCase().includes(searchTerm) ||
        case_.caseNumber.toLowerCase().includes(searchTerm) ||
        case_.description.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const limit = params.limit || 10;
    const page = params.page || 1;
    const totalPages = Math.ceil(filteredCases.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCases = filteredCases.slice(startIndex, endIndex);

    return {
      items: paginatedCases,
      total: filteredCases.length,
      pages: totalPages,
      currentPage: page
    };
  }, [params.status, params.search, params.page, params.limit]);

  return {
    sellerCases,
    isLoading,
    error
  };
}

export function useSellerCaseStats() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    stats: mockSellerCaseStats,
    isLoading,
    error
  };
}
