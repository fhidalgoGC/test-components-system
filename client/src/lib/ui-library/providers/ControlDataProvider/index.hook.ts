import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type {
  ControlDataState,
  StateKey,
  StateTransformer,
  MapParamsAdapter,
  FetchFunction,
  ControlDataContextValue,
} from './index.types';

export const ControlDataContext = createContext<ControlDataContextValue<unknown> | undefined>(undefined);

export function useControlDataContext<TData = unknown>(): ControlDataContextValue<TData> {
  const context = useContext(ControlDataContext);
  if (!context) {
    throw new Error('useControlDataContext must be used within a ControlDataProvider');
  }
  return context as ControlDataContextValue<TData>;
}

const DEFAULT_STATE: ControlDataState = {};

export function useControlData<TParams = unknown, TResponse = unknown>(
  fetchFn: FetchFunction<TParams, TResponse>,
  mapParams: MapParamsAdapter<TParams>,
  initialState?: Partial<ControlDataState>,
  debounceMs: number = 400
): ControlDataContextValue<TResponse> {
  const [state, setState] = useState<ControlDataState>({
    ...DEFAULT_STATE,
    ...initialState,
  });

  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = mapParams(state);
      const response = await fetchFn(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [state, fetchFn, mapParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadData();
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      loadData();
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [state, loadData, debounceMs]);

  const applyToState = useCallback(<T = unknown, R = unknown>(
    key: StateKey,
    transformer: StateTransformer<T, R>,
    rawData: T
  ) => {
    setState((prev) => {
      const previousValue = prev[key] as R | undefined;
      const newValue = transformer(rawData, previousValue);
      return {
        ...prev,
        [key]: newValue,
      };
    });
  }, []);

  const resetState = useCallback(() => {
    setState({ ...DEFAULT_STATE });
  }, []);

  const reload = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    state,
    applyToState,
    resetState,
    reload,
  };
}
