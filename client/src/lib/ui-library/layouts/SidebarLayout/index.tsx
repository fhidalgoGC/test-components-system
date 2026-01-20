import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { SidebarLayoutProps, SidebarLayoutContextValue } from './SidebarLayout.types';
import styles from './SidebarLayout.module.scss';

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(null);

export function useSidebarLayout() {
  const context = useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error('useSidebarLayout must be used within SidebarLayout');
  }
  return context;
}

export function useOptionalSidebarLayout() {
  return useContext(SidebarLayoutContext);
}

export function SidebarLayout({
  sidebarContent,
  toolbarContent,
  children,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapseChange,
  sidebarExpandedWidth = 260,
  sidebarCollapsedWidth = 70,
  toolbarHeight = 60,
  className,
}: SidebarLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;
  
  const setCollapsed = useCallback((value: boolean) => {
    if (!isControlled) {
      setInternalCollapsed(value);
    }
    onCollapseChange?.(value);
  }, [isControlled, onCollapseChange]);
  
  const toggleCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);
  
  const sidebarWidth = collapsed ? sidebarCollapsedWidth : sidebarExpandedWidth;
  
  const contextValue = useMemo<SidebarLayoutContextValue>(() => ({
    collapsed,
    setCollapsed,
    toggleCollapse,
    sidebarWidth,
  }), [collapsed, setCollapsed, toggleCollapse, sidebarWidth]);
  
  return (
    <SidebarLayoutContext.Provider value={contextValue}>
      <div className={`${styles.layoutContainer} ${className || ''}`}>
        <div 
          className={styles.sidebar}
          style={{ width: sidebarWidth }}
        >
          {sidebarContent}
        </div>
        
        <div className={styles.rightSection}>
          <div 
            className={styles.toolbar}
            style={{ height: toolbarHeight }}
          >
            {toolbarContent}
          </div>
          
          <div className={styles.main}>
            {children}
          </div>
        </div>
      </div>
    </SidebarLayoutContext.Provider>
  );
}

export type { SidebarLayoutProps, SidebarLayoutContextValue } from './SidebarLayout.types';
