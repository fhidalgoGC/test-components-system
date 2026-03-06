import { SidebarLayoutView } from './web';
import { SidebarLayoutMobileView } from './mobile';
import { useIsMobile } from '../../hooks/useResponsive';
import type { SidebarLayoutProps } from './web/types';

export function SidebarLayout(props: SidebarLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <SidebarLayoutMobileView
        toolbarContent={props.toolbarContent}
        children={props.children}
        toolbarHeight={props.toolbarHeight}
        className={props.className}
        mainPaddingX={props.mainPaddingX}
        mainPaddingY={props.mainPaddingY}
      />
    );
  }

  return <SidebarLayoutView {...props} />;
}

export { useSidebarLayout, useOptionalSidebarLayout } from './web';
export type { SidebarLayoutProps, SidebarLayoutContextValue } from './web/types';
export type { SidebarLayoutMobileProps } from './mobile/types';
