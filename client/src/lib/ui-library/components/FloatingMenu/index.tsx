import { useIsMobile } from '../../hooks';
import { FloatingMenu as FloatingMenuWeb } from './web';
import { FloatingMenuMobileView } from './mobile';
import type { FloatingMenuProps } from './shared/types';

export const FloatingMenu = <T,>(props: FloatingMenuProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <FloatingMenuMobileView {...props} />;
  }

  return <FloatingMenuWeb {...props} />;
};

export { useFloatingMenu } from './shared/hooks';

export type { 
  FloatingMenuProps, 
  FloatingMenuItem, 
  FloatingMenuLayout, 
  FloatingMenuItemConfig,
  FloatingMenuSectionConfig,
  FloatingMenuSelectionStyle,
  FloatingMenuController,
  MenuPosition,
  WidthMode,
  HeightMode,
  ScrollMode,
  RenderType
} from './shared/types';
