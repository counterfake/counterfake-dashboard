"use client";

import React, { Suspense } from "react";

import { ROUTES } from "@/common/lib/config/routes";

// Common Components
import Pagination from "@/common/components/ui/navigation/pagination";
import AppliedFilters from "@/common/components/ui/data-display/applied-filters";

// Dashboard Features
import DashboardPageWrapper from "@/features/user-dashboard/components/layout/dashboard-page-wrapper";

// Product Features
import {
  ProductGrid,
  ProductListSidebar,
  ProductListToolbar,
} from "@/features/products";

// Page Internal Logic
import { useProductsPageQuery } from "./_hooks/use-products-page-query";
import { useProductsPageData } from "./_hooks/use-products-page-data";

function ProductsPage() {
  const queryLogic = useProductsPageQuery();
  const dataLogic = useProductsPageData({
    queries: queryLogic.queries,
  });

  return (
    <DashboardPageWrapper
      title="Products Data Analytics"
      description="Advanced analytics dashboard showing product detection and risk analysis"
      breadcrumbs={[
        {
          label: "Dashboard",
          href: ROUTES.USER_DASHBOARD,
        },
        {
          label: "Products",
          current: true,
        },
      ]}
    >
      <div className="space-y-6 fade-in">
        <ProductListToolbar
          onLimitChange={queryLogic.handleLimitChange}
          limit={Number(queryLogic.queries.limit)}
          initialValue={{
            searchByName: queryLogic.queries.searchByName,
            searchByURL: queryLogic.queries.searchByURL,
          }}
          onSearchByNameApply={(value) => queryLogic.updateSearchByName(value)}
          onSearchByURLApply={(value) => queryLogic.updateSearchByURL(value)}
          onSearchByNameClear={() => queryLogic.updateSearchByName("")}
          onSearchByURLClear={() => queryLogic.updateSearchByURL("")}
        />

        <AppliedFilters
          filters={dataLogic.getAppliedFilters(queryLogic.queries)}
          onClear={queryLogic.resetAllQueries}
          clearButtonLabel="Reset to Default"
        />

        <div className="flex gap-4 relative" id="products-grid">
          <div className="flex-shrink-0 sticky top-6 h-full">
            <ProductListSidebar
              onClearFilters={queryLogic.clearFilters}
              onApplyFilters={(values) => {
                queryLogic.updateFilters(
                  dataLogic.formatQueriesForQuery(values)
                );
              }}
              onChangeStatus={queryLogic.updateStatus}
              onChangePlatform={queryLogic.updatePlatform}
              initialValues={dataLogic.formatQueries(queryLogic.queries)}
              filterOptions={dataLogic.filterOptions}
            />
          </div>
          <div className="flex-1 space-y-6">
            <ProductGrid
              isLoading={dataLogic.productsResponse?.isLoading}
              isError={
                !!dataLogic.productsResponse?.isError &&
                dataLogic.productsResponse?.error?.response?.status !== 404
              }
              isEmpty={
                dataLogic.products.length === 0 ||
                dataLogic.productsResponse?.error?.response?.status === 404
              }
              products={dataLogic.products}
            />

            <Pagination
              currentPage={Number(queryLogic.queries.currentPage)}
              totalPages={dataLogic.totalPages}
              onPageChange={queryLogic.setCurrentPage}
              showInfo
              totalItems={dataLogic.productsResponse?.data?.totalProducts}
              itemsPerPage={Number(queryLogic.queries.limit)}
            />
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}

/**
 * Please wrap ProductsPage with Suspense to prevent suspense build error
 * ref: https://github.com/vercel/next.js/discussions/61654
 */
export default function ProductsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
