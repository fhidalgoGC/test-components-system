import { createContext, useContext, useState } from 'react';
import type { LayoutColumnContext } from '../types';
import { useI18nMerge } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { LAYOUTCOLUMN_CONFIG as environment } from './../environment';

const LayoutColumnCtx = createContext<LayoutColumnContext | undefined>(undefined);

// Hook to safely access ConfigProvider (optional)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

export const useLayoutColumnContext = () => {
  const context = useContext(LayoutColumnCtx);
  if (!context) {
    throw new Error('useLayoutColumnContext must be used within LayoutColumnProvider');
  }
  return context;
};

export const LayoutColumnProvider = ({ 
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
    optionalConfig?.environment?.LAYOUTCOLUMN_CONFIG?.SOME_VALUE ??  // 2️⃣ ConfigProvider
    environment.SOME_VALUE;                                                // 3️⃣ Internal environment (fallback)
  */

  const value: LayoutColumnContext = {
    t,
    lang,
  };

  return (
    <LayoutColumnCtx.Provider value={value}>
      {children}
    </LayoutColumnCtx.Provider>
  );
};
