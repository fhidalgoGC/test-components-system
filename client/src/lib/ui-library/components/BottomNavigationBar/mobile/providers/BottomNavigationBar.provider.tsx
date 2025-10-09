import { createContext, useContext, useState } from 'react';
import type { BottomNavigationBarContext } from '../types';
import { useI18nMerge } from '../hooks';

const BottomNavigationBarCtx = createContext<BottomNavigationBarContext | undefined>(undefined);

export const useBottomNavigationBarContext = () => {
  const context = useContext(BottomNavigationBarCtx);
  if (!context) {
    throw new Error('useBottomNavigationBarContext must be used within BottomNavigationBarProvider');
  }
  return context;
};

export const BottomNavigationBarProvider = ({ 
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

  const value: BottomNavigationBarContext = {
    t,
    lang,
  };

  return (
    <BottomNavigationBarCtx.Provider value={value}>
      {children}
    </BottomNavigationBarCtx.Provider>
  );
};
