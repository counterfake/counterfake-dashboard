import { useUserConfigStore } from "@/common/lib/stores/user-config-store";

export function useProductListLayout() {
  const { productGridLayout, updateProductGridLayout } = useUserConfigStore();

  return {
    // State
    productGridLayout,

    // Actions
    updateProductGridLayout,
  };
}
