import { useMemo } from 'react';
import type { SidebarLayoutMobileProps } from '../types/SidebarLayout.mobile.types';
import { SidebarLayoutContext } from '../../web/hooks/useSidebarLayout.hook';
import styles from '../css/SidebarLayout.mobile.module.scss';

const noop = () => {};

export function SidebarLayoutMobileView({
  toolbarContent,
  children,
  toolbarHeight,
  className,
  mainPaddingX,
  mainPaddingY,
}: SidebarLayoutMobileProps) {
  const contextValue = useMemo(() => ({
    collapsed: true,
    setCollapsed: noop,
    toggleCollapse: noop,
    sidebarWidth: 0 as number | 'auto',
  }), []);

  return (
    <SidebarLayoutContext.Provider value={contextValue}>
      <div className={`${styles.layoutContainer} ${className || ''}`}>
        <div
          className={styles.toolbar}
          style={{ height: toolbarHeight ?? 'auto' }}
        >
          {toolbarContent}
        </div>

        <div className={styles.main}>
          <div
            className={styles.mainContent}
            style={{
              ...(mainPaddingX !== undefined && { paddingLeft: mainPaddingX, paddingRight: mainPaddingX }),
              ...(mainPaddingY !== undefined && { paddingTop: mainPaddingY, paddingBottom: mainPaddingY }),
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </SidebarLayoutContext.Provider>
  );
}
