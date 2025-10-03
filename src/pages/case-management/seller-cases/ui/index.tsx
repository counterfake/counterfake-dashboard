"use client";

import React, { useState } from "react";
import { CustomerPageWrapper } from "@/widgets/customer-page-layout/customer-page-layout.ui";
import { SellerCaseStatus } from "../model";
import { useSellerCaseList, useSellerCaseStats } from "../model";

// UI Components
import { StatsCards } from "./stats-cards";
import { StatusFilter } from "./status-filter";
import { CaseCard } from "./case-card";
import { CasesPagination } from "./pagination";
import { CasesEmptyState } from "./empty-state";
import { CasesLoadingSkeleton } from "./loading-skeleton";

export function SellerCasesPage() {
  const [selectedStatus, setSelectedStatus] = useState<SellerCaseStatus | undefined>(undefined);
  const [casePage, setCasePage] = useState(1);

  const { sellerCases, isLoading: casesLoading, error: casesError } = useSellerCaseList({
    status: selectedStatus,
    limit: 6,
    page: casePage,
  });

  const { stats, isLoading: statsLoading, error: statsError } = useSellerCaseStats();

  const handleStatusChange = (status: SellerCaseStatus | undefined) => {
    setSelectedStatus(status);
    setCasePage(1);
  };

  const hasFilters = selectedStatus !== undefined;

  return (
    <CustomerPageWrapper
      title="Seller Cases"
      description="Track and manage cases related to sellers across all platforms. Monitor investigation progress, mediation status, and compensation received."
      breadcrumbs={[
        {
          label: "Case Management",
        },
        {
          label: "Seller Cases",
          current: true,
        },
      ]}
    >
      <div className="space-y-8">
        {/* Statistics Cards */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <StatsCards stats={stats} isLoading={statsLoading} />
        </section>

        {/* Filters */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cases</h2>
            <div className="text-sm text-muted-foreground">
              {sellerCases?.total} {sellerCases?.total === 1 ? 'case' : 'cases'} found
            </div>
          </div>
          <StatusFilter 
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
        </section>

        {/* Cases Content */}
        <section>
          {casesLoading ? (
            <CasesLoadingSkeleton />
          ) : casesError ? (
            <div className="text-center py-8">
              <p className="text-destructive">Error loading cases: {casesError}</p>
            </div>
          ) : sellerCases && sellerCases.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {sellerCases.items.map((sellerCase) => (
                  <CaseCard key={sellerCase.id} sellerCase={sellerCase} />
                ))}
              </div>

              {/* Pagination */}
              {sellerCases.pages > 1 && (
                <div className="flex justify-center mt-8">
                  <CasesPagination
                    currentPage={casePage}
                    totalPages={sellerCases.pages}
                    onPageChange={setCasePage}
                  />
                </div>
              )}
            </>
          ) : (
            <CasesEmptyState hasFilters={hasFilters} />
          )}
        </section>
      </div>
    </CustomerPageWrapper>
  );
}
