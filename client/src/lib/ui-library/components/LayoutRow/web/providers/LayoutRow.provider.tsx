import { createContext, useContext, useState } from 'react';
import type { LayoutRowContext } from '../types';
import { useI18nMerge } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { LAYOUTROW_CONFIG as environment } from './../environment';

const LayoutRowCtx = createContext<LayoutRowContext | undefined>(undefined);

// Hook to safely access ConfigProvider (optional)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

export const useLayoutRowContext = () => {
  const context = useContext(LayoutRowCtx);
  if (!context) {
    throw new Error('useLayoutRowContext must be used within LayoutRowProvider');
  }
  return context;
};

export const LayoutRowProvider = ({ 
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
    optionalConfig?.environment?.LAYOUTROW_CONFIG?.SOME_VALUE ??  // 2️⃣ ConfigProvider
    environment.SOME_VALUE;                                                // 3️⃣ Internal environment (fallback)
  */

  const value: LayoutRowContext = {
    t,
    lang,
  };

  return (
    <LayoutRowCtx.Provider value={value}>
      {children}
    </LayoutRowCtx.Provider>
  );
};
