import { bpApiClient } from "@/lib/api/clients/brand-protection";

const categoryService = bpApiClient.productCategoryService;

export function useCategories() {
  return categoryService.getAll();
}

export function useCategoryByKey(key: (typeof categoryService.keys)[number]) {
  return categoryService.getByKey(key);
}

export function useCategoryById(id: (typeof categoryService.ids)[number]) {
  return categoryService.getById(id);
}

export function useCategoryByIdMutation() {
  return categoryService.getById;
}
