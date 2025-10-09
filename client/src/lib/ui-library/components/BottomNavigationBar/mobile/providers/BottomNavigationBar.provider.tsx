import { createContext, useContext } from 'react';
import type { BottomNavigationBarContext, BottomNavigationBarProps, NavItem } from '../types';
import { useI18nMerge } from '../hooks';
import { useBottomNavigationBar } from '../hooks';

const BottomNavigationBarCtx = createContext<BottomNavigationBarContext | undefined>(undefined);

export const useBottomNavigationBarContext = () => {
  const context = useContext(BottomNavigationBarCtx);
  if (!context) {
    throw new Error('useBottomNavigationBarContext must be used within BottomNavigationBarProvider');
  }
  return context;
};

interface ProviderProps extends BottomNavigationBarProps {
  children: React.ReactNode;
}

export const BottomNavigationBarProvider = (props: ProviderProps) => {
  const { children, langOverride, i18nOrder = 'local-first', items = [] } = props;
  
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  const { selectedId, onItemClick } = useBottomNavigationBar(props);

  const value: BottomNavigationBarContext = {
    t,
    lang,
    items,
    selectedId,
    onItemClick,
  };

  return (
    <BottomNavigationBarCtx.Provider value={value}>
      {children}
    </BottomNavigationBarCtx.Provider>
  );
};
