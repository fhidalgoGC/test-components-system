import { createContext, useState, useCallback } from 'react';
import { Loading } from '../../../components/Loading';
import type { LoadingContextValue, LoadingProviderProps, LoadingConfig } from '../types';

export const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({
  children,
  defaultOverlay = 'transparent',
  defaultSize = 'lg',
  defaultLabel,
}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<LoadingConfig>({
    overlay: defaultOverlay,
    size: defaultSize,
    label: defaultLabel,
  });

  const show = useCallback((overrides?: LoadingConfig) => {
    if (overrides) {
      setConfig(prev => ({
        ...prev,
        ...overrides,
      }));
    }
    setIsLoading(true);
  }, []);

  const hide = useCallback(() => {
    setIsLoading(false);
  }, []);

  const contextValue: LoadingContextValue = {
    isLoading,
    show,
    hide,
    config,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {isLoading && (
        <Loading
          state="loading"
          overlay={config.overlay}
          coverage="fullscreen"
          size={config.size}
          label={config.label}
        />
      )}
    </LoadingContext.Provider>
  );
}
