import { useMemo } from 'react';
import { ControlDataContext, useControlData } from './index.hook';
import type { ControlDataProviderProps, ControlDataContextValue } from './index.types';

export function ControlDataProvider<TParams = unknown, TResponse = unknown>({
  children,
  fetchFn,
  mapParams,
  defaultState,
  debounceMs = 400,
}: ControlDataProviderProps<TParams, TResponse>) {
  const controlData = useControlData<TParams, TResponse>(
    fetchFn,
    mapParams,
    defaultState,
    debounceMs
  );

  const value = useMemo<ControlDataContextValue<TResponse>>(
    () => controlData,
    [controlData]
  );

  return (
    <ControlDataContext.Provider value={value as ControlDataContextValue<unknown>}>
      {children}
    </ControlDataContext.Provider>
  );
}
