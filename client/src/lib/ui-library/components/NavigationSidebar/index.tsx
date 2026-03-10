import { useIsMobile } from '../../hooks';
import { NavigationSidebar as NavigationSidebarWeb } from './web';
import { NavigationSidebarMobile } from './mobile';
import type { NavigationSidebarProps } from './shared/types';
import type { NavigationSidebarMobileProps } from './mobile';

export const NavigationSidebar = (props: NavigationSidebarProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    const mobileProps = props as NavigationSidebarMobileProps;
    return <NavigationSidebarMobile {...mobileProps} />;
  }

  return <NavigationSidebarWeb {...props} />;
};

export { useNavigationSidebarController } from './shared/hooks';
export type {
  NavigationSidebarProps,
  NavigationItem,
  NavigationSubItem,
  NavigationSidebarContext,
  NavigationSidebarController,
} from './shared/types';
export type { NavigationSidebarMobileProps } from './mobile';
