"use client";

import React, { Suspense } from "react";

import { ROUTES } from "@/common/lib/config/routes";

import { useCustomerConfigStore } from "@/features/user-dashboard/stores/customer-config.store";

// Common Components
import Pagination from "@/common/components/ui/navigation/pagination";
import AppliedFilters from "@/common/components/ui/data-display/applied-filters";

// Dashboard Features
import DashboardPageWrapper from "@/features/user-dashboard/components/layout/dashboard-page-wrapper";

// Product Features
import {
  ProductGrid,
  ProductListFilters,
  ProductListSearchArea,
  ProductListToolbar,
} from "@/features/products";

// Page Internal Logic
import { useProductsPagePagination } from "./_hooks/use-products-page-pagination";
import { useProductsPageFilters } from "./_hooks/use-products-page-filters";
import { useProductsPageData } from "./_hooks/use-products-page-data";

function ProductsPage() {
  const { productGridLayout, updateProductGridLayout } =
    useCustomerConfigStore();
  const paginationLogic = useProductsPagePagination();
  const filterLogic = useProductsPageFilters();
  const dataLogic = useProductsPageData({
    filters: filterLogic.filters,
    currentPage: paginationLogic.currentPage,
    limit: paginationLogic.limit,
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
        <ProductListSearchArea
          initialValue={{
            searchByName: filterLogic.filters.searchByName,
            searchByURL: filterLogic.filters.searchByURL,
          }}
          onSearchByNameApply={(value) =>
            filterLogic.updateFilters({ searchByName: value })
          }
          onSearchByURLApply={(value) =>
            filterLogic.updateFilters({ searchByURL: value })
          }
          onSearchByNameClear={() =>
            filterLogic.updateFilters({ searchByName: "" })
          }
          onSearchByURLClear={() =>
            filterLogic.updateFilters({ searchByURL: "" })
          }
        />

        <ProductListToolbar
          currentLayout={productGridLayout}
          filterOpen={filterLogic.filterOpen}
          onLayoutChange={updateProductGridLayout}
          onLimitChange={paginationLogic.handleLimitChange}
          onFilterOpen={filterLogic.handleFilterOpen}
        />

        <AppliedFilters
          filters={dataLogic.getAppliedFilters(filterLogic.filters)}
          onClear={filterLogic.clearFilters}
          clearButtonLabel="Reset to Default"
        />

        {filterLogic.filterOpen && (
          <ProductListFilters
            onClear={() =>
              filterLogic.updateFilters({
                category: "",
                platform: "",
                reason: "",
                reportStatus: "",
                status: "",
              })
            }
            onApply={(values) =>
              filterLogic.updateFilters(dataLogic.formatFilterState(values))
            }
            initialValues={dataLogic.formatFilters(filterLogic.filters)}
            filterOptions={dataLogic.filterOptions}
          />
        )}

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
          layout={productGridLayout}
        />

        <Pagination
          currentPage={paginationLogic.currentPage}
          totalPages={dataLogic.totalPages}
          onPageChange={paginationLogic.setCurrentPage}
          showInfo={true}
          totalItems={
            dataLogic.productsResponse?.data?.totalProducts ||
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
