"use client";

import React, { Suspense } from "react";

import { ROUTES } from "@/lib/config/routes";

// Logic Imports
import { useProductsListPagination } from "@/features/products/product-list/hooks/use-products-list-pagination";
import { useProductsListFilters } from "@/features/products/product-list/hooks/use-products-list-filters";
import { useProductsListData } from "@/features/products/product-list/hooks/use-products-list-data";
import { useProductListLayout } from "@/features/products/product-list/hooks/use-product-list-layout";

// Components
import DashboardPageWrapper from "@/features/user-dashboard/components/dashboard-page-wrapper";

import ProductListSection from "@/features/products/product-list/components/products-page-sections/product-list-section";
import ProductListToolbar from "@/features/products/product-list/components/product-list-toolbar";
import ProductFilters from "@/features/products/product-list/components/product-filters";
import AppliedFilters from "@/features/products/product-list/components/applied-filters";

import Pagination from "@/components/ui/navigation/pagination";

function ProductsPage() {
  const paginationLogic = useProductsListPagination();
  const filterLogic = useProductsListFilters();
  const dataLogic = useProductsListData({
    filters: filterLogic.filters,
    currentPage: paginationLogic.currentPage,
    limit: paginationLogic.limit,
  });
  const layoutLogic = useProductListLayout();

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
          onSearchApply={filterLogic.handleSearchApply}
          onSearchClear={filterLogic.handleSearchClear}
          onLimitChange={paginationLogic.handleLimitChange}
          onFilterOpen={filterLogic.handleFilterOpen}
          onLayoutChange={layoutLogic.updateProductGridLayout}
          currentLayout={layoutLogic.productGridLayout}
          initialValues={filterLogic.filters}
          filterOpen={filterLogic.filterOpen}
        />

        <AppliedFilters
          appliedFilters={filterLogic.getAppliedFiltersDisplay(
            dataLogic.filterOptions
          )}
        />

        {filterLogic.filterOpen && (
          <ProductFilters
            initialFilters={filterLogic.getInitialFiltersForForm()}
            filterOptions={dataLogic.filterOptions}
            onClear={filterLogic.handleClearFilters}
            onApply={filterLogic.handleApplyFilters as any}
          />
        )}

        <ProductListSection
          isLoading={dataLogic.productsResponse?.isLoading}
          isError={!!dataLogic.productsResponse?.isError}
          products={dataLogic.products}
          layout={layoutLogic.productGridLayout}
        />

        <Pagination
          currentPage={paginationLogic.currentPage}
          totalPages={dataLogic.totalPages}
          onPageChange={paginationLogic.setCurrentPage}
          showInfo={true}
          totalItems={
            dataLogic.productsResponse?.data?.data_count ||
            dataLogic.products.length
          }
          itemsPerPage={paginationLogic.limit}
        />
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
