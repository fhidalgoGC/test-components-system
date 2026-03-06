import type { SidebarLayoutMobileProps } from '../types/SidebarLayout.mobile.types';
import styles from '../css/SidebarLayout.mobile.module.scss';

export function SidebarLayoutMobileView({
  toolbarContent,
  children,
  toolbarHeight,
  className,
  mainPaddingX,
  mainPaddingY,
}: SidebarLayoutMobileProps) {
  return (
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
  );
}
