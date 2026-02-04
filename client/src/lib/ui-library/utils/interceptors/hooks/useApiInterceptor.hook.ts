import { useMemo, useCallback, useState, useRef } from 'react';
import { createApiInterceptor } from '../ApiInterceptor';
import type {
  ApiInterceptorConfig,
  ApiInterceptorInstance,
  QueryParams,
  InterceptedResponse,
  InterceptedError,
} from '../types';

export interface UseApiInterceptorOptions {
  config: ApiInterceptorConfig;
}

export interface UseApiInterceptorReturn {
  api: ApiInterceptorInstance;
  loading: boolean;
  pendingRequests: number;
  error: InterceptedError | null;
  clearError: () => void;
}

export function useApiInterceptor(
  options: UseApiInterceptorOptions
): UseApiInterceptorReturn {
  const [pendingRequests, setPendingRequests] = useState(0);
  const [error, setError] = useState<InterceptedError | null>(null);
  const requestCountRef = useRef(0);

  const api = useMemo(() => {
    const instance = createApiInterceptor(options.config);

    const wrapMethod = <T>(
      method: (...args: any[]) => Promise<InterceptedResponse<T>>
    ) => {
      return async (...args: any[]): Promise<InterceptedResponse<T>> => {
        requestCountRef.current += 1;
        setPendingRequests(requestCountRef.current);
        try {
          const result = await method(...args);
          return result;
        } catch (err) {
          setError(err as InterceptedError);
          throw err;
        } finally {
          requestCountRef.current -= 1;
          setPendingRequests(requestCountRef.current);
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

  const loading = pendingRequests > 0;

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    api,
    loading,
    pendingRequests,
    error,
    clearError,
  };
}
