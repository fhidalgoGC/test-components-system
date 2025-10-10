import { createContext, useContext } from 'react';
import type { HeterogeneousListProps } from '../types';
import { useI18nMerge } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { HETEROGENEOUS_LIST_CONFIG as environment } from './../environment';

interface HeterogeneousListContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}

const HeterogeneousListCtx = createContext<HeterogeneousListContext | undefined>(undefined);

// Hook to safely access ConfigProvider (optional)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

export const useHeterogeneousListContext = () => {
  const context = useContext(HeterogeneousListCtx);
  if (!context) {
    throw new Error('useHeterogeneousListContext must be used within HeterogeneousListProvider');
  }
  return context;
};

interface HeterogeneousListProviderProps {
  children: React.ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export const HeterogeneousListProvider = ({ 
  children,
  langOverride,
  i18nOrder = 'local-first'
}: HeterogeneousListProviderProps) => {
  const optionalConfig = useOptionalConfig();
  
  // Apply cascade priority for configuration
  // const finalPageSize =
  //   optionalConfig?.environment?.HETEROGENEOUS_LIST_CONFIG?.DEFAULT_PAGE_SIZE ??
  //   environment.DEFAULT_PAGE_SIZE;

  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });

  const value: HeterogeneousListContext = {
    t,
    lang,
  };

  return (
    <HeterogeneousListCtx.Provider value={value}>
      {children}
    </HeterogeneousListCtx.Provider>
  );
};
