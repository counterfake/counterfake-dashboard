"use client";

import React, { useState } from "react";

import { CustomerPageWrapper } from "@/widgets/customer-page-layout/customer-page-layout.ui";

import { ProductCaseStatus } from "@/entities/brand-protection/case";

import { useProductCaseList } from "../model";

// UI Components
import { CaseCard } from "./case-card";
import { CaseStatusFilter } from "./case-status-filter";
import { CasesPagination } from "./cases-pagination";
import { CasesEmptyState } from "./cases-empty-state";
import { CasesErrorState } from "./cases-error-state";
import { PageSkeleton } from "./page-skeleton";

export function ProductCasesPage() {
  const [selectedStatus, setSelectedStatus] = useState<
    ProductCaseStatus | undefined
  >(undefined);
  const [casePage, setCasePage] = useState(1);

  const { productCases, isLoading, error } = useProductCaseList({
    status: selectedStatus,
    limit: 9,
    page: casePage,
  });

  const handleStatusChange = (status: ProductCaseStatus | undefined) => {
    setSelectedStatus(status);
    setCasePage(1);
  };

  return (
    <CustomerPageWrapper
      title="Product Cases"
      description="On this page, you can check the status of your product cases."
      breadcrumbs={[
        {
          label: "Case Management",
        },
        {
          label: "Product Cases",
          current: true,
        },
      ]}
    >
      <div className="space-y-6">
        {/* Status Filter */}
        <CaseStatusFilter onStatusChange={handleStatusChange} />

        {/* Cases Content */}
        {isLoading ? (
          <PageSkeleton />
        ) : error ? (
          <CasesErrorState error={error} />
        ) : productCases && productCases.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              {productCases.items.map((productCase) => (
                <CaseCard key={productCase.id} productCase={productCase} />
              ))}
            </div>

            {/* Pagination */}
            {productCases.pages > 1 && (
              <div className="flex justify-center mt-6">
                <CasesPagination
                  currentPage={casePage}
                  totalPages={productCases.pages}
                  onPageChange={setCasePage}
                />
              </div>
            )}
          </>
        ) : (
          <CasesEmptyState />
        )}
      </div>
    </CustomerPageWrapper>
  );
}
