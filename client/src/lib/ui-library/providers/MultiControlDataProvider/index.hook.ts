import { createContext, useContext, useMemo } from 'react';
import type { ControlDataContextValue } from '../ControlDataProvider/index.types';
import type { MultiControlDataContextValue } from './index.types';

export const MultiControlDataContext = createContext<MultiControlDataContextValue | undefined>(undefined);

export function useMultiControlData<TData = unknown>(sourceKey: string): ControlDataContextValue<TData> {
  const context = useContext(MultiControlDataContext);
  if (!context) {
    throw new Error('useMultiControlData must be used within a MultiControlDataProvider');
  }
  return context.getSource<TData>(sourceKey);
}

export function useMultiControlDataSources(): string[] {
  const context = useContext(MultiControlDataContext);
  if (!context) {
    throw new Error('useMultiControlDataSources must be used within a MultiControlDataProvider');
  }
  return context.getSources();
}
