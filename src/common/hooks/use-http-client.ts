import {
  useMutation,
  useQuery,
  type UseQueryOptions,
  type UseMutationOptions,
  MutationFunctionContext,
} from "@tanstack/react-query";

import { type ApiResponse } from "@/common/types/api";
import { AppError } from "@/common/lib/utils/error-handler";

/**
 * useQuery hook compatible with ApiResponse structure
 *
 * Processes ApiResponse from HTTP client for React Query compatibility:
 * - Triggers React Query error state when success: false
 * - Returns data when success: true
 *
 * @example
 *
 * const { data, error, isLoading } = useApiQuery({
 *   queryKey: ['users'],
 *   queryFn: () => httpClient.get<User[]>('/users'),
 *   enabled: true,
 *   emptyData: [], // Initial data that doesn't affect loading states
 * });
 *
 * @description
 *
 * `error`: null if success: true
 *
 * `error`: AppError if success: false
 *
 * `data`: User[] type (only response.data part)
 *
 * `emptyData`: Initial data that is returned immediately without affecting isLoading/isFetching states
 */
export function useApiQuery<TData = unknown, TError = AppError>(
  options: Omit<UseQueryOptions<TData, TError>, "queryFn"> & {
    queryFn: () => Promise<ApiResponse<TData>>;
    emptyData?: TData;
  }
) {
  const { queryFn, emptyData, ...queryOptions } = options;

  const queryResult = useQuery<TData, TError>({
    ...queryOptions,
    queryFn: async () => {
      const response = await queryFn();

      // Throw error when ApiResponse.success: false
      if (!response.success) {
        throw response.error as TError;
      }

      return response.data as TData;
    },
  });

  if (queryResult.error) {
    throw queryResult.error;
  }

  // If emptyData is provided and no data is available yet, return emptyData
  // This doesn't affect loading states unlike placeholderData
  if (emptyData !== undefined && queryResult.data === undefined) {
    return {
      ...queryResult,
      data: emptyData,
    };
  }

  return queryResult;
}

/**
 * useMutation hook compatible with ApiResponse structure
 *
 * Processes ApiResponse from HTTP client for React Query compatibility:
 * - Triggers onError callback when success: false
 * - Triggers onSuccess callback when success: true
 *
 * @example
 *
 * const { mutate, isLoading, error } = useApiMutation({
 *   mutationFn: (credentials: LoginCredentials) => {
 *     return authService.login(credentials);
 *   },
 *   onSuccess: (data) => {
 *     // Only runs on success (success: true)
 *     // data will have proper TypeScript typing
 *     console.log('Login successful:', data);
 *   },
 *   onError: (error) => {
 *     // Only runs on error (success: false)
 *     console.log('Login error:', error);
 *   },
 * });
 */
export function useApiMutation<
  TData = unknown,
  TError = AppError,
  TVariables = void
>(
  options: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn"> & {
    mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>;
  }
) {
  const { mutationFn, ...mutationOptions } = options;

  return useMutation<TData, TError, TVariables>({
    ...mutationOptions,
    mutationFn: async (variables: TVariables) => {
      const response = await mutationFn(variables);

      // Throw error when ApiResponse.success: false
      if (!response.success) {
        throw response.error as TError;
      }

      return response.data as TData;
    },
  });
}

/**
 * Helper for mutation hook - performs response validation
 *
 * Maintains original ApiResponse structure and performs checks within onSettled.
 * Supports the response?.success pattern used in existing code.
 *
 * @example
 *
 * const { mutate } = useApiMutationWithSettled({
 *   mutationFn: (credentials: LoginCredentials) => {
 *     return authService.login(credentials);
 *   },
 *   onApiSuccess: (data, variables) => {
 *     // Runs when success: true
 *     router.push('/dashboard');
 *   },
 *   onApiError: (error, variables) => {
 *     // Runs when success: false
 *     showErrorToast(error.message);
 *   },
 * });
 */
export function useApiMutationWithSettled<
  TData = unknown,
  TError = AppError,
  TVariables = void
>(
  options: UseMutationOptions<ApiResponse<TData>, TError, TVariables> & {
    mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>;
    onApiSuccess?: (data: TData, variables: TVariables) => void;
    onApiError?: (error: AppError, variables: TVariables) => void;
  }
) {
  const {
    mutationFn,
    onApiSuccess,
    onApiError,
    onSettled,
    ...mutationOptions
  } = options;

  return useMutation<ApiResponse<TData>, TError, TVariables>({
    ...mutationOptions,
    mutationFn,
    onSettled: (
      response,
      error,
      variables,
      context: MutationFunctionContext
    ) => {
      if (response) {
        if (response.success && response.data) {
          onApiSuccess?.(response.data, variables);
        } else if (!response.success && response.error) {
          onApiError?.(response.error, variables);
        }
      }

      // Call original onSettled callback
      onSettled?.(response, error, variables, undefined, context);
    },
  });
}
