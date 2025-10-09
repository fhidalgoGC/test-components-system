import { createContext, useContext, useEffect, useRef } from 'react';
import type { BottomNavigationBarContext, BottomNavigationBarProps, NavItem } from '../types';
import { useI18nMerge } from '../hooks';
import { useBottomNavigationBar } from '../hooks';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { environment } from '../../../../enviorments/enviroment';

const BottomNavigationBarCtx = createContext<BottomNavigationBarContext | undefined>(undefined);

function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext ? { environment: configContext.environment } : null;
}

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
  const { children, langOverride, i18nOrder = 'local-first', items = [], disabledIds = [], onError } = props;
  
  const optionalConfig = useOptionalConfig();
  const prevDisabledIdsRef = useRef<string[]>([]);
  
  // Apply cascade: props → ConfigProvider → environment defaults
  const finalTriggerOnMount =
    props.triggerOnMount ??
    optionalConfig?.environment.BOTTOM_NAV_CONFIG?.TRIGGER_ON_MOUNT ??
    environment.BOTTOM_NAV_CONFIG.TRIGGER_ON_MOUNT;
  
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  const { selectedId, onItemClick } = useBottomNavigationBar({
    ...props,
    triggerOnMount: finalTriggerOnMount,
  });

  // Detect when trying to disable the currently selected item
  useEffect(() => {
    if (!selectedId || !onError) return;

    const newlyDisabledIds = disabledIds.filter(id => !prevDisabledIdsRef.current.includes(id));
    
    if (newlyDisabledIds.includes(selectedId)) {
      onError({
        type: 'disable-selected-item',
        itemId: selectedId,
        message: `Cannot disable the currently selected item: ${selectedId}`,
      });
    }

    prevDisabledIdsRef.current = disabledIds;
  }, [disabledIds, selectedId, onError]);

  const value: BottomNavigationBarContext = {
    t,
    lang,
    items,
    selectedId,
    disabledIds,
    onItemClick,
  };

  return (
    <BottomNavigationBarCtx.Provider value={value}>
      {children}
    </BottomNavigationBarCtx.Provider>
  );
};
