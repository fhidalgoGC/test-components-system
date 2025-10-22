import { createContext, useContext, useState } from 'react';
import type { CarouselContext } from '../types';
import { useI18nMerge } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { CAROUSEL_CONFIG as environment } from './../environment';

const CarouselCtx = createContext<CarouselContext | undefined>(undefined);

// Hook to safely access ConfigProvider (optional)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

export const useCarouselContext = () => {
  const context = useContext(CarouselCtx);
  if (!context) {
    throw new Error('useCarouselContext must be used within CarouselProvider');
  }
  return context;
};

export const CarouselProvider = ({ 
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
    optionalConfig?.environment?.CAROUSEL_CONFIG?.SOME_VALUE ??  // 2️⃣ ConfigProvider
    environment.SOME_VALUE;                                                // 3️⃣ Internal environment (fallback)
  */

  const value: CarouselContext = {
    t,
    lang,
  };

  return (
    <CarouselCtx.Provider value={value}>
      {children}
    </CarouselCtx.Provider>
  );
};
