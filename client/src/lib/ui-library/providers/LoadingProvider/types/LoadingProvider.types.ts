import type { ReactNode } from 'react';
import type { LoadingOverlay, LoadingSize } from '../../../components/Loading/web/types/Loading.type';

export interface LoadingConfig {
  overlay?: LoadingOverlay;
  size?: LoadingSize;
  label?: string;
}

export interface LoadingContextValue {
  isLoading: boolean;
  show: (config?: LoadingConfig) => void;
  hide: () => void;
  config: LoadingConfig;
}

export interface LoadingProviderProps {
  children: ReactNode;
  defaultOverlay?: LoadingOverlay;
  defaultSize?: LoadingSize;
  defaultLabel?: string;
}
