import { createContext, useContext, useState } from 'react';
import type { ListContext } from '../types';
import { useI18nMerge } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { LIST_CONFIG as environment } from './../environment';

const ListCtx = createContext<ListContext | undefined>(undefined);

// Hook to safely access ConfigProvider (optional)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

export const useListContext = () => {
  const context = useContext(ListCtx);
  if (!context) {
    throw new Error('useListContext must be used within ListProvider');
  }
  return context;
};

export const ListProvider = ({ 
  children,
  langOverride,
  i18nOrder = 'local-first'
}: { 
  children: React.ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}) => {
  const [state, setState] = useState({});
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  
  // Access ConfigProvider if available
  const optionalConfig = useOptionalConfig();
  
  // Example: Apply cascade priority for a config value
  // Uncomment and customize as needed:
  /*
  const finalConfigValue =
    props.configProp ??                                                    // 1️⃣ Props (highest priority)
    optionalConfig?.environment?.LIST_CONFIG?.SOME_VALUE ??  // 2️⃣ ConfigProvider
    environment.SOME_VALUE;                                                // 3️⃣ Internal environment (fallback)
  */

  const value: ListContext = {
    t,
    lang,
  };

  return (
    <ListCtx.Provider value={value}>
      {children}
    </ListCtx.Provider>
  );
};
