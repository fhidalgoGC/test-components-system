import { useIsMobile } from '../../hooks';
import { FloatingMenu as FloatingMenuWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { FloatingMenuProps } from './web/types';

export const FloatingMenu = <T,>(props: FloatingMenuProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="FloatingMenu" />;
  }

  return <FloatingMenuWeb {...props} />;
};

export type { 
  FloatingMenuProps, 
  FloatingMenuItem, 
  FloatingMenuLayout, 
  FloatingMenuItemConfig,
  WidthMode,
  HeightMode,
  ScrollMode
} from './web/types';
