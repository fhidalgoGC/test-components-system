import { useState, useCallback, useMemo } from 'react';
import type { SidebarLayoutProps } from '../types/SidebarLayout.types';
import { SidebarLayoutContext } from '../hooks/useSidebarLayout.hook';
import styles from '../css/SidebarLayout.module.scss';

export function SidebarLayoutView({
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
  
  const contextValue = useMemo(() => ({
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
