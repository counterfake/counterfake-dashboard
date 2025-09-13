import { scrollIntoView } from "@/common/lib/utils/scroll-into-view";

import { useSearchParams } from "@/common/hooks/use-search-params";

export function useProductsPagePagination() {
  const searchParams = useSearchParams();

  // Pagination parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  // Event handlers for pagination
  const handleLimitChange = (newLimit: number) => {
    searchParams.set("limit", newLimit.toString());
  };

  const setCurrentPage = (page: number) => {
    scrollIntoView("products-grid");
    searchParams.set("page", page.toString());
  };

  return {
    // State
    currentPage,
    limit,

    // Actions
    handleLimitChange,
    setCurrentPage,
  };
}
