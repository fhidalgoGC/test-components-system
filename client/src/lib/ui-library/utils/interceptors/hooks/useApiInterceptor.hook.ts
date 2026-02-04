import { useMemo, useCallback, useState } from 'react';
import { createApiInterceptor } from '../ApiInterceptor';
import type {
  ApiInterceptorConfig,
  ApiInterceptorInstance,
  QueryParams,
  FilterRule,
  SortRule,
  PaginationConfig,
  InterceptedResponse,
  InterceptedError,
} from '../types';

export interface UseApiInterceptorOptions {
  config: ApiInterceptorConfig;
}

export interface UseApiInterceptorReturn {
  api: ApiInterceptorInstance;
  loading: boolean;
  error: InterceptedError | null;
  clearError: () => void;
  buildFilters: (...filters: FilterRule[]) => FilterRule[];
  buildSort: (...sorts: SortRule[]) => SortRule[];
  buildPagination: (page: number, pageSize: number) => PaginationConfig;
  buildParams: (options: {
    filters?: FilterRule[];
    sort?: SortRule[];
    pagination?: PaginationConfig;
    search?: string;
    searchFields?: string[];
  }) => QueryParams;
}

export function useApiInterceptor(
  options: UseApiInterceptorOptions
): UseApiInterceptorReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<InterceptedError | null>(null);

  const api = useMemo(() => {
    const instance = createApiInterceptor(options.config);

    const wrapMethod = <T>(
      method: (...args: any[]) => Promise<InterceptedResponse<T>>
    ) => {
      return async (...args: any[]): Promise<InterceptedResponse<T>> => {
        setLoading(true);
        setError(null);
        try {
          const result = await method(...args);
          return result;
        } catch (err) {
          setError(err as InterceptedError);
          throw err;
        } finally {
          setLoading(false);
        }
      };
    };

    return {
      ...instance,
      get: wrapMethod(instance.get) as ApiInterceptorInstance['get'],
      post: wrapMethod(instance.post) as ApiInterceptorInstance['post'],
      put: wrapMethod(instance.put) as ApiInterceptorInstance['put'],
      patch: wrapMethod(instance.patch) as ApiInterceptorInstance['patch'],
      delete: wrapMethod(instance.delete) as ApiInterceptorInstance['delete'],
      request: wrapMethod(instance.request) as ApiInterceptorInstance['request'],
    } as ApiInterceptorInstance;
  }, [options.config]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const buildFilters = useCallback((...filters: FilterRule[]): FilterRule[] => {
    return filters.filter(f => f.value !== undefined && f.value !== null && f.value !== '');
  }, []);

  const buildSort = useCallback((...sorts: SortRule[]): SortRule[] => {
    return sorts;
  }, []);

  const buildPagination = useCallback((page: number, pageSize: number): PaginationConfig => {
    return { page, pageSize };
  }, []);

  const buildParams = useCallback((options: {
    filters?: FilterRule[];
    sort?: SortRule[];
    pagination?: PaginationConfig;
    search?: string;
    searchFields?: string[];
  }): QueryParams => {
    return {
      filters: options.filters?.filter(f => 
        f.value !== undefined && f.value !== null && f.value !== ''
      ),
      sort: options.sort,
      pagination: options.pagination,
      search: options.search,
      searchFields: options.searchFields,
    };
  }, []);

  return {
    api,
    loading,
    error,
    clearError,
    buildFilters,
    buildSort,
    buildPagination,
    buildParams,
  };
}
